import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RelativePortal from 'react-relative-portal';

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getViewportRect() {
  const { innerHeight: height = Infinity, innerWidth: width = Infinity } = window || {};
  return { top: 0, left: 0, width, height };
}

function getCenterPoint(rect) {
  return {
    x: rect.left + (0.5 * rect.width),
    y: rect.top + (0.5 * rect.height),
  };
}

function getPreferAlignment(rect) {
  const { x: rx, y: ry } = getCenterPoint(rect);
  const { x: vx, y: vy } = getCenterPoint(getViewportRect());
  return {
    h: (rx < vx ? 'left' : 'right'),
    v: (ry < vy ? 'top' : 'bottom'),
  };
}

function calcAlignmentRect(target, rect, vertAlign, horizAlign) {
  return {
    ...rect,
    top:
      vertAlign === 'top' ?
        target.top + target.height :
      vertAlign === 'bottom' ?
        target.top - rect.height :
      vertAlign === 'bottom-absolute' ?
        getViewportRect().height - rect.height :
        0,
    left:
      horizAlign === 'left' ?
        target.left :
      horizAlign === 'right' ?
        (target.left + target.width) - rect.width :
      vertAlign === 'right-absolute' ?
        getViewportRect().width - rect.height :
        0,
  };
}

function hasViewportIntersection({ top, left, width, height }) {
  const { width: viewportWidth, height: viewportHeight } = getViewportRect();
  return (
    top < 0 ||
    top + height > viewportHeight ||
    left < 0 ||
    left + width > viewportWidth
  );
}

function isEqualRect(aRect, bRect) {
  return (
    aRect.top === bRect.top &&
    aRect.left === bRect.left &&
    aRect.width === bRect.width &&
    aRect.height === bRect.height
  );
}

function throttle(func, ms) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (last + ms < now) {
      func(...args);
      last = now;
    }
  };
}

function ignoreFirstCall(func) {
  let called = false;
  return (...args) => {
    if (called) {
      func(...args);
    }
    called = true;
  };
}


/**
 *
 */
export default function autoAlign(options) {
  const { triggerSelector } = options;

  return Cmp => class extends React.Component {
    static propTypes = {
      portalClassName: PropTypes.string,
      portalStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
      size: PropTypes.oneOf(['small', 'medium', 'large']),
      align: PropTypes.oneOf(['left', 'right']),
      vertAlign: PropTypes.oneOf(['top', 'bottom']),
      preventPortalize: PropTypes.bool,
      children: PropTypes.node,
    }

    static contextTypes = {
      portalClassName: PropTypes.string,
      portalStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    }

    state = {
      triggerRect: { top: 0, left: 0, width: 0, height: 0 },
      horizAlign: 'left',
      vertAlign: 'top',
    }

    componentDidMount() {
      this.recalcAlignment();
    }

    componentWillUnmount() {
      this.pid = null;
      this.node = null;
      this.content = null;
    }

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
    }, 100)

    recalcAlignment = () => {
      if (this.node) {
        let targetEl = this.node;
        const matches = targetEl.matches || targetEl.matchesSelector || targetEl.msMatchesSelector;
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
        const oldTriggerRect = this.state.triggerRect;
        if (targetEl) {
          const { top, left, width, height } = targetEl.getBoundingClientRect();
          if (!isEqualRect(oldTriggerRect, { top, left, width, height })) {
            this.updateAlignment({ top, left, width, height });
          } else {
            this.updateAlignment(oldTriggerRect);
          }
        } else {
          this.updateAlignment(oldTriggerRect);
        }
      }
    }

    updateAlignment(triggerRect) {
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
          for (const hAlign of ['left', 'right', `${preferAlign.h}-absolute`]) {
            const aRect = calcAlignmentRect(triggerRect, { width, height }, vAlign, hAlign);
            if (!hasViewportIntersection(aRect)) {
              vertAlign = vAlign;
              horizAlign = hAlign;
              break;
            }
          }
          if (vertAlign !== null && horizAlign !== null) { break; }
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
        align = this.state.horizAlign,
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
        top: triggerTop, left: triggerLeft, width: triggerWidth, height: triggerHeight,
      } = triggerRect;
      const { width: viewportWidth, height: viewportHeight } = getViewportRect();
      const offsetTop =
        vertAlign === 'bottom' ? -triggerHeight :
        vertAlign === 'top-absolute' ? -(triggerTop + triggerHeight) :
        vertAlign === 'bottom-absolute' ? viewportHeight - (triggerTop + triggerHeight) :
        0;
      const offsetLeft =
        align === 'left-absolute' ? -triggerLeft :
        align === 'right-absolute' ? viewportWidth - (triggerLeft + triggerWidth) :
        0;
      const content = (
        <Cmp
          align={ align.split('-')[0] }
          vertAlign={ vertAlign.split('-')[0] }
          ref={ cmp => (this.content = cmp) }
          { ...pprops }
        >
          { children }
        </Cmp>
      );
      return (
        preventPortalize || process.env.NODE_ENV === 'test' ? content : (
          <div ref={ node => (this.node = node) }>
            <RelativePortal
              fullWidth
              left={ offsetLeft }
              right={ -offsetLeft }
              top={ offsetTop }
              onScroll={ ignoreFirstCall(this.requestRecalcAlignment) }
              component='div'
              className={ classnames(portalClassName, additionalPortalClassName) }
              style={ { ...portalStyle, ...additionalPortalStyle } }
            >
              { content }
            </RelativePortal>
          </div>
        )
      );
    }
  };
}
