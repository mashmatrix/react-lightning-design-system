import React from 'react';
import PropTypes from 'prop-types';
import RelativePortal from 'react-relative-portal';

function detectViewportIntersection({ top, left, width, height }) {
  const { innerHeight = Infinity, innerWidth = Infinity } = window || {};
  console.log({ innerWidth, innerHeight })
  return {
    top: top < 0,
    bottom: top + height > innerHeight,
    left: left < 0,
    right: left + width > innerWidth,
  };
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

    state = {
      triggerHeight: 0,
      triggerWidth: 0,
      horizAlign: 'left',
      vertAlign: 'top',
    }

    componentDidMount() {
      this.updateTrigger();
    }

    componentDidUpdate(newProps, newState) {
      if (this.state.vertAlign === newState.vertAlign &&
          this.state.horizAlign === newState.horizAlign) {
        this.requestUpdateAlignment();
      }
    }

    updateTrigger() {
      if (this.node) {
        let targetEl = this.node;
        const matches = targetEl.matches || targetEl.matchesSelector || targetEl.msMatchesSelector;
        while (targetEl) {
          if (matches.call(targetEl, triggerSelector)) {
            break;
          }
          targetEl = targetEl.parentNode;
        }
        if (targetEl) {
          const { width, height } = targetEl.getBoundingClientRect();
          if (this.state.triggerWidth !== width || this.state.triggerHeight !== height) {
            this.setState({ triggerWidth: width, triggerHeight: height }, () => {
              this.updateAlignment();
            });
          }
        }
      }
    }

    requestUpdateAlignment() {
      setTimeout(() => this.updateAlignment(), 10);
    }

    updateAlignment() {
      if (this.content && this.content.node) {
        const { horizAlign, vertAlign, triggerWidth, triggerHeight } = this.state;
        const { top, left, width, height } = this.content.node.getBoundingClientRect();
        const rect = {
          top: top + (vertAlign === 'bottom' ? height + triggerHeight : 0),
          left: left + (horizAlign === 'right' ? width - triggerWidth : 0),
          width,
          height,
        };
        const { bottom, right } = detectViewportIntersection(rect);
        const newVertAlign = bottom ? 'bottom' : 'top';
        const newHorizAlign = right ? 'right' : 'left';
        if (newVertAlign !== vertAlign || newHorizAlign !== horizAlign) {
          this.setState({ vertAlign: newVertAlign, horizAlign: newHorizAlign });
        }
      }
    }

    render() {
      const { triggerHeight, triggerWidth } = this.state;
      const {
        align = this.state.horizAlign,
        vertAlign = this.state.vertAlign,
        preventPortalize,
        children,
        ...pprops
      } = this.props;
      const offsetTop = vertAlign === 'bottom' ? -triggerHeight : 0;
      const offsetLeft = align === 'right' ? triggerWidth : 0;
      const content = (
        <Cmp
          align={ align }
          vertAlign={ vertAlign }
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
              left={ offsetLeft }
              top={ offsetTop }
              onScroll={ () => this.requestUpdateAlignment() }
            >
              { content }
            </RelativePortal>
          </div>
        )
      );
    }
  };
}
