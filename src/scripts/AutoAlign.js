import React from 'react';
import PropTypes from 'prop-types';
import RelativePortal from 'react-relative-portal';

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function calcAlignmentRect(target, rect, vertAlign, horizAlign) {
  return {
    ...rect,
    top:
      vertAlign === 'top' ?
        target.top + target.height :
      vertAlign === 'bottom' ?
        target.top - rect.height :
        0,
    left:
      horizAlign === 'left' ?
        target.left :
      horizAlign === 'right' ?
        (target.left + target.width) - rect.width :
        0,
  };
}

function hasViewportIntersection({ top, left, width, height }) {
  const { innerHeight = Infinity, innerWidth = Infinity } = window || {};
  return (
    top < 0 ||
    top + height > innerHeight ||
    left < 0 ||
    left + width > innerWidth
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

/**
 *
 */
export default function autoAlign(options) {
  const { triggerSelector } = options;

  return Cmp => class extends React.Component {
    static propTypes = {
      className: PropTypes.string,
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

    requestRecalcAlignment = async () => {
      const pid = (this.pid || 0) + 1;
      this.pid = pid;
      for (const ms of [0, 400, 800, 800]) {
        await delay(ms);
        if (this.pid !== pid) {
          return;
        }
        this.recalcAlignment();
      }
      this.pid = 0;
    }

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
        for (const vAlign of ['top', 'bottom', 'absolute']) {
          for (const hAlign of ['left', 'right', 'absolute']) {
            const aRect = calcAlignmentRect(triggerRect, { width, height }, vAlign, hAlign);
            if (!hasViewportIntersection(aRect)) {
              vertAlign = vAlign;
              horizAlign = hAlign;
              break;
            }
          }
          if (vertAlign !== null && horizAlign !== null) { break; }
        }
        vertAlign = vertAlign || 'absolute';
        horizAlign = horizAlign || 'absolute';
        if (vertAlign !== oldVertAlign || horizAlign !== oldHorizAlign) {
          this.setState({ vertAlign, horizAlign, triggerRect });
        } else if (!isEqualRect(oldTriggerRect, triggerRect)) {
          this.setState({ triggerRect });
        }
      }
    }

    render() {
      const { triggerRect } = this.state;
      const {
        align = this.state.horizAlign,
        vertAlign = this.state.vertAlign,
        preventPortalize,
        children,
        ...pprops
      } = this.props;
      const {
        portalClassName,
        portalStyle,
      } = this.context;
      const offsetTop =
        vertAlign === 'bottom' ? -triggerRect.height :
        vertAlign === 'absolute' ? -(triggerRect.top + triggerRect.height) :
        0;
      const offsetLeft =
        align === 'right' ? triggerRect.width :
        align === 'absolute' ? -triggerRect.left :
        0;
      const content = (
        <Cmp
          align={ align === 'absolute' ? 'left' : align }
          vertAlign={ vertAlign === 'absolute' ? 'top' : vertAlign }
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
              right={ 0 }
              top={ offsetTop }
              onScroll={ this.requestRecalcAlignment }
              component='div'
              className={ portalClassName }
              style={ portalStyle }
            >
              { content }
            </RelativePortal>
          </div>
        )
      );
    }
  };
}
