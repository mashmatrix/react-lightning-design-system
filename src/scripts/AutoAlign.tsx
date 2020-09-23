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

type Offset = {
  top: number;
  left: number;
};

type Rect = Offset & {
  width: number;
  height: number;
};

type VertAlign = 'top' | 'bottom' | 'top-absolute' | 'bottom-absolute';
type HorizAlign = 'left' | 'right' | 'left-absolute' | 'right-absolute';
type Align = VertAlign | HorizAlign;

export type RectangleAlignment = Readonly<[Align] | [Align, Align]>;

function calcAlignmentRect(
  target: Rect,
  rect: { width: number; height: number },
  alignment: RectangleAlignment
) {
  const [firstAlign, secondAlign] = alignment;
  return {
    ...rect,
    top:
      firstAlign === 'top-absolute' || secondAlign === 'top-absolute'
        ? 0
        : firstAlign === 'bottom-absolute' || secondAlign === 'bottom-absolute'
        ? getViewportRect().height - rect.height
        : firstAlign === 'top'
        ? target.top + target.height
        : firstAlign === 'bottom'
        ? target.top - rect.height
        : secondAlign === 'top'
        ? target.top
        : secondAlign === 'bottom'
        ? target.top + target.height - rect.height
        : // valign middle
          target.top + (target.height - rect.height) * 0.5,
    left:
      firstAlign === 'left-absolute' || secondAlign === 'left-absolute'
        ? 0
        : firstAlign === 'right-absolute' || secondAlign === 'right-absolute'
        ? getViewportRect().width - rect.width
        : firstAlign === 'left'
        ? target.left + target.width
        : firstAlign === 'right'
        ? target.left - rect.width
        : secondAlign === 'left'
        ? target.left
        : secondAlign === 'right'
        ? target.left + target.width - rect.width
        : // halign center
          target.left + (target.width - rect.width) * 0.5,
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

function isEqualRect(
  aRect: Rect | null | undefined,
  bRect: Rect | null | undefined
) {
  if (aRect === bRect) {
    return true;
  }
  if (!aRect || !bRect) {
    return false;
  }
  return (
    aRect.top === bRect.top &&
    aRect.left === bRect.left &&
    aRect.width === bRect.width &&
    aRect.height === bRect.height
  );
}

function getCenterPoint(rect: Rect) {
  return {
    x: rect.left + 0.5 * rect.width,
    y: rect.top + 0.5 * rect.height,
  };
}

function getPreferAlignment(rect?: Rect) {
  if (!rect) {
    return { v: 'top', h: 'left' };
  }
  const { x: rx, y: ry } = getCenterPoint(rect);
  const { x: vx, y: vy } = getCenterPoint(getViewportRect());
  return {
    h: rx < vx ? 'left' : 'right',
    v: ry < vy ? 'top' : 'bottom',
  };
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

function removeAbsoluteAlign(
  alignment: RectangleAlignment
): RectangleAlignment {
  return (alignment.map(
    (a) => a.replace(/-absolute$/, '') as Align
  ) as unknown) as RectangleAlignment;
}

export type AutoAlignOptions = {
  triggerSelector: string;
  alignmentStyle: 'menu' | 'popover';
};

export type AutoAlignProps = {
  portalClassName?: string;
  portalStyle?: object;
  size?: 'small' | 'medium' | 'large';
  preventPortalize?: boolean;
  align?: Align;
} & Partial<InjectedProps>;

export type InjectedProps = {
  alignment: RectangleAlignment;
};

export type AutoAlignState = {
  alignment: RectangleAlignment;
  rootNodeRect?: Rect;
  triggerNodeRect?: Rect;
};

function getPossibleAlignments(
  alignmentStyle: AutoAlignOptions['alignmentStyle'],
  align?: Align,
  target?: Rect
): RectangleAlignment[] {
  const { h, v } = getPreferAlignment(target);
  const alignments: RectangleAlignment[] = [
    ['top', 'left'],
    ['top', 'right'],
    ['top'],
    ['bottom', 'left'],
    ['bottom', 'right'],
    ['bottom'],
    ['left', 'top'],
    ['left', 'bottom'],
    ['left'],
    ['right', 'top'],
    ['right', 'bottom'],
    ['right'],
    ['top', `${h}-absolute` as Align],
    ['bottom', `${h}-absolute` as Align],
    ['left', `${v}-absolute` as Align],
    ['right', `${v}-absolute` as Align],
    [`${v}-absolute` as Align, 'left'],
    [`${v}-absolute` as Align, 'right'],
    [`${h}-absolute` as Align, 'top'],
    [`${h}-absolute` as Align, 'bottom'],
    [`${v}-absolute` as Align],
    [`${h}-absolute` as Align],
    [`${v}-absolute` as Align, `${h}-absolute` as Align],
  ];
  return alignments
    .filter(
      ([firstAlign, secondAlign]) =>
        !align || firstAlign === align || secondAlign === align
    )
    .filter(([firstAlign, secondAlign]) =>
      alignmentStyle === 'menu'
        ? secondAlign && /^(top|bottom)/.test(firstAlign)
        : true
    );
}

const EMPTY_RECT = { top: 0, left: 0, width: 0, height: 0 };

/**
 *
 */
export function autoAlign(options: AutoAlignOptions) {
  const { triggerSelector, alignmentStyle } = options;

  return <TOriginalProps extends {}>(
    Cmp: ComponentType<TOriginalProps & InjectedProps>
  ) => {
    type ResultProps = TOriginalProps & AutoAlignProps;

    return class extends React.Component<ResultProps, AutoAlignState> {
      pid: number | null = null;

      /* eslint-disable react/sort-comp */
      node: HTMLElement | null = null;

      content: any;
      /* eslint-enable react/sort-comp */

      context!: Pick<
        ComponentSettingsContext,
        'portalClassName' | 'portalStyle'
      >;

      static contextTypes = {
        portalClassName: PropTypes.string,
        portalStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
      };

      constructor(props: ResultProps) {
        super(props);
        this.state = {
          alignment: getPossibleAlignments(alignmentStyle, props.align)[0],
        };
      }

      componentDidMount() {
        this.requestRecalcAlignment();
      }

      componentWillUnmount() {
        this.pid = null;
        this.node = null;
        this.content = null;
      }

      // eslint-disable-next-line react/sort-comp
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

      recalcAlignment = () => {
        if (this.node) {
          let triggerEl: HTMLElement | null = this.node;
          const matches =
            triggerEl.matches ||
            (triggerEl as any).matchesSelector ||
            (triggerEl as any).msMatchesSelector;
          try {
            while (triggerEl) {
              if (matches.call(triggerEl, triggerSelector)) {
                break;
              }
              triggerEl = triggerEl.parentElement;
            }
          } catch (e) {
            triggerEl = null;
          }
          // eslint-disable-next-line react/destructuring-assignment
          const oldTriggerNodeRect = this.state.triggerNodeRect;
          if (triggerEl) {
            const {
              top,
              left,
              width,
              height,
            } = triggerEl.getBoundingClientRect();
            if (
              !isEqualRect(oldTriggerNodeRect, { top, left, width, height })
            ) {
              this.updateAlignment({ top, left, width, height });
            } else {
              this.updateAlignment(oldTriggerNodeRect);
            }
          } else {
            this.updateAlignment(oldTriggerNodeRect);
          }
        }
      };

      updateAlignment = (triggerNodeRect: Rect = EMPTY_RECT) => {
        const {
          triggerNodeRect: oldTriggerNodeRect,
          alignment: oldAlignment,
        } = this.state;
        const rootNodeRect = this.node
          ? this.node.getBoundingClientRect()
          : EMPTY_RECT;
        const { width: contentRectWidth, height: contentRectHeight } =
          this.content && this.content.node
            ? this.content.node.getBoundingClientRect()
            : EMPTY_RECT;
        let alignment = null;
        const possibleAlignments = getPossibleAlignments(
          alignmentStyle,
          this.props.align,
          triggerNodeRect
        );
        for (const align of possibleAlignments) {
          const aRect = calcAlignmentRect(
            triggerNodeRect,
            { width: contentRectWidth, height: contentRectHeight },
            align
          );
          if (!hasViewportIntersection(aRect)) {
            alignment = align;
            break;
          }
        }
        if (!alignment) {
          alignment = possibleAlignments[possibleAlignments.length - 1];
        }
        if (
          alignment[0] !== oldAlignment[0] ||
          alignment[1] !== oldAlignment[1]
        ) {
          this.setState({ alignment, triggerNodeRect, rootNodeRect });
        } else if (
          !oldTriggerNodeRect ||
          triggerNodeRect.width !== oldTriggerNodeRect.width ||
          triggerNodeRect.height !== oldTriggerNodeRect.height ||
          /absolute$/.test(oldAlignment[0]) ||
          /absolute$/.test(oldAlignment[1] || '')
        ) {
          this.setState({ triggerNodeRect, rootNodeRect });
        }
      };

      render() {
        const {
          triggerNodeRect = EMPTY_RECT,
          rootNodeRect = EMPTY_RECT,
        } = this.state;
        const {
          // eslint-disable-next-line react/destructuring-assignment
          alignment = this.state.alignment,
          // eslint-disable-next-line react/destructuring-assignment
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
        const { top, left } = calcAlignmentRect(
          triggerNodeRect,
          rootNodeRect,
          alignment
        );
        const offsetTop = top - rootNodeRect.top;
        const offsetLeft = left - rootNodeRect.left;
        const content = (
          <Cmp
            alignment={removeAbsoluteAlign(alignment)}
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
              {this.state.triggerNodeRect ? (
                content
              ) : (
                <div className='slds-hidden'>{content}</div>
              )}
            </RelativePortal>
          </div>
        );
      }
    };
  };
}
