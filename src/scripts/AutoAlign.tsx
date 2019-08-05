import React, { ComponentType } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RelativePortal from 'react-relative-portal';
import { ComponentSettingsContext } from './ComponentSettings';

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getViewportRect(): Rect {
  const { innerHeight: height = Infinity, innerWidth: width = Infinity } =
    window || {};
  return { top: 0, left: 0, width, height };
}

type Rect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

function getCenterPoint(rect: Rect) {
  return {
    x: rect.left + 0.5 * rect.width,
    y: rect.top + 0.5 * rect.height,
  };
}

function getPreferAlignment(rect: Rect) {
  const { x: rx, y: ry } = getCenterPoint(rect);
  const { x: vx, y: vy } = getCenterPoint(getViewportRect());
  return {
    h: rx < vx ? 'left' : 'right',
    v: ry < vy ? 'top' : 'bottom',
  };
}

function calcAlignmentRect(
  target: Rect,
  rect: { width: number; height: number },
  vertAlign: string,
  horizAlign: string
) {
  return {
    ...rect,
    top:
      vertAlign === 'top'
        ? target.top + target.height
        : vertAlign === 'bottom'
        ? target.top - rect.height
        : vertAlign === 'bottom-absolute'
        ? getViewportRect().height - rect.height
        : 0,
    left:
      horizAlign === 'left'
        ? target.left
        : horizAlign === 'right'
        ? target.left + target.width - rect.width
        : vertAlign === 'right-absolute'
        ? getViewportRect().width - rect.height
        : 0,
  };
}

function hasViewportIntersection({ top, left, width, height }: Rect) {
  const { width: viewportWidth, height: viewportHeight } = getViewportRect();
  return (
    top < 0 ||
    top + height > viewportHeight ||
    left < 0 ||
    left + width > viewportWidth
  );
}

function isEqualRect(aRect: Rect, bRect: Rect) {
  return (
    aRect.top === bRect.top &&
    aRect.left === bRect.left &&
    aRect.width === bRect.width &&
    aRect.height === bRect.height
  );
}

function throttle(func: Function, ms: number) {
  let last = 0;
  return (...args: any) => {
    const now = Date.now();
    if (last + ms < now) {
      func(...args);
      last = now;
    }
  };
}

function ignoreFirstCall(func: Function) {
  let called = false;
  return (...args: any) => {
    if (called) {
      func(...args);
    }
    called = true;
  };
}

export type AutoAlignOptions = {
  triggerSelector: string;
};

export type AutoAlignProps = {
  portalClassName: string;
  portalStyle: object;
  size: 'small' | 'medium' | 'large';
  preventPortalize: boolean;
} & Partial<InjectedProps>;

export type InjectedProps = {
  align: 'left' | 'right';
  vertAlign: 'top' | 'bottom';
};

export type AutoAlignState = {
  triggerRect: Rect;
  horizAlign: string;
  vertAlign: string;
};

/**
 *
 */
export function autoAlign(options: AutoAlignOptions) {
  const { triggerSelector } = options;

  return <TOriginalProps extends {}>(
    Cmp: ComponentType<TOriginalProps & InjectedProps>
  ) => {
    type ResultProps = TOriginalProps & AutoAlignProps;

    return class extends React.Component<ResultProps, AutoAlignState> {
      private pid: number | null = null;

      /* eslint-disable react/sort-comp */
      private node: any;

      private content: any;
      /* eslint-enable react/sort-comp */

      context!: Pick<
        ComponentSettingsContext,
        'portalClassName' | 'portalStyle'
      >;

      static contextTypes = {
        portalClassName: PropTypes.string,
        portalStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
      };

      state: AutoAlignState = {
        triggerRect: { top: 0, left: 0, width: 0, height: 0 },
        horizAlign: 'left',
        vertAlign: 'top',
      };

      requestRecalcAlignment = throttle(async () => {
        const pid = (this.pid || 0) + 1;
        this.pid = pid;
        for (const ms of [0, 300, 400, 300, 200]) {
          await delay(ms);
          if (this.pid !== pid) {
            return;
          }
          this.recalcAlignment();
        }
        this.pid = 0;
      }, 100);

      componentDidMount() {
        this.recalcAlignment();
      }

      componentWillUnmount() {
        this.pid = null;
        this.node = null;
        this.content = null;
      }

      recalcAlignment = () => {
        if (this.node) {
          let targetEl = this.node;
          const matches =
            targetEl.matches ||
            targetEl.matchesSelector ||
            targetEl.msMatchesSelector;
          try {
            while (targetEl) {
              if (matches.call(targetEl, triggerSelector)) {
                break;
              }
              targetEl = targetEl.parentNode;
            }
          } catch (e) {
            targetEl = null;
          }
          // eslint-disable-next-line react/destructuring-assignment
          const oldTriggerRect = this.state.triggerRect;
          if (targetEl) {
            const {
              top,
              left,
              width,
              height,
            } = targetEl.getBoundingClientRect();
            if (!isEqualRect(oldTriggerRect, { top, left, width, height })) {
              this.updateAlignment({ top, left, width, height });
            } else {
              this.updateAlignment(oldTriggerRect);
            }
          } else {
            this.updateAlignment(oldTriggerRect);
          }
        }
      };

      updateAlignment(triggerRect: Rect) {
        if (this.content && this.content.node) {
          const {
            horizAlign: oldHorizAlign,
            vertAlign: oldVertAlign,
            triggerRect: oldTriggerRect,
          } = this.state;
          const { width, height } = this.content.node.getBoundingClientRect();
          let vertAlign = null;
          let horizAlign = null;
          const preferAlign = getPreferAlignment(triggerRect);
          for (const vAlign of ['top', 'bottom', `${preferAlign.v}-absolute`]) {
            for (const hAlign of [
              'left',
              'right',
              `${preferAlign.h}-absolute`,
            ]) {
              const aRect = calcAlignmentRect(
                triggerRect,
                { width, height },
                vAlign,
                hAlign
              );
              if (!hasViewportIntersection(aRect)) {
                vertAlign = vAlign;
                horizAlign = hAlign;
                break;
              }
            }
            if (vertAlign !== null && horizAlign !== null) {
              break;
            }
          }
          vertAlign = vertAlign || 'top-absolute';
          horizAlign = horizAlign || 'left-absolute';
          if (vertAlign !== oldVertAlign || horizAlign !== oldHorizAlign) {
            this.setState({ vertAlign, horizAlign, triggerRect });
          } else if (
            triggerRect.width !== oldTriggerRect.width ||
            triggerRect.height !== oldTriggerRect.height ||
            /absolute$/.test(vertAlign) ||
            /absolute$/.test(horizAlign)
          ) {
            this.setState({ triggerRect });
          }
        }
      }

      render() {
        const { triggerRect } = this.state;
        const {
          // eslint-disable-next-line react/destructuring-assignment
          align = this.state.horizAlign,
          // eslint-disable-next-line react/destructuring-assignment
          vertAlign = this.state.vertAlign,
          portalClassName: additionalPortalClassName,
          portalStyle: additionalPortalStyle = {},
          preventPortalize,
          children,
          ...pprops
        } = this.props;
        const {
          portalClassName = 'slds-scope',
          portalStyle = { position: 'absolute', top: 0, left: 0 },
        } = this.context;
        const {
          top: triggerTop,
          left: triggerLeft,
          width: triggerWidth,
          height: triggerHeight,
        } = triggerRect;
        const {
          width: viewportWidth,
          height: viewportHeight,
        } = getViewportRect();
        const offsetTop =
          vertAlign === 'bottom'
            ? -triggerHeight
            : vertAlign === 'top-absolute'
            ? -(triggerTop + triggerHeight)
            : vertAlign === 'bottom-absolute'
            ? viewportHeight - (triggerTop + triggerHeight)
            : 0;
        const offsetLeft =
          align === 'left-absolute'
            ? -triggerLeft
            : align === 'right-absolute'
            ? viewportWidth - (triggerLeft + triggerWidth)
            : 0;
        const content = (
          <Cmp
            align={align.split('-')[0] as InjectedProps['align']}
            vertAlign={vertAlign.split('-')[0] as InjectedProps['vertAlign']}
            ref={(cmp: any) => (this.content = cmp)}
            {...pprops as TOriginalProps}
          >
            {children}
          </Cmp>
        );
        return preventPortalize || process.env.NODE_ENV === 'test' ? (
          content
        ) : (
          <div ref={(node) => (this.node = node)}>
            <RelativePortal
              fullWidth
              left={offsetLeft}
              right={-offsetLeft}
              top={offsetTop}
              onScroll={ignoreFirstCall(this.requestRecalcAlignment)}
              component='div'
              className={classnames(portalClassName, additionalPortalClassName)}
              style={{ ...portalStyle, ...additionalPortalStyle }}
            >
              {content}
            </RelativePortal>
          </div>
        );
      }
    };
  };
}
