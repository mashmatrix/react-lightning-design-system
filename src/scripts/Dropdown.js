import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RelativePortal from 'react-relative-portal';

function detectViewportIntersection({ top, left, width, height }) {
  const { innerHeight = Infinity, innerWidth = Infinity } = window || {};
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
export default class Dropdown extends React.Component {
  constructor() {
    super();
    this.state = {
      triggerHeight: 0,
      triggerWidth: 0,
      horizAlign: 'left',
      vertAlign: 'top',
    };
  }

  componentDidMount() {
    this.updateTrigger();
    this.updateAlignment();
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
      while (targetEl) {
        if (/(^|\s)slds-dropdown-trigger(\s|$)/.test(targetEl.className)) {
          break;
        }
        targetEl = targetEl.parentNode;
      }
      if (targetEl) {
        const { width, height } = targetEl.getBoundingClientRect();
        if (this.state.triggerWidth !== width || this.state.triggerHeight !== height) {
          this.setState({ triggerWidth: width, triggerHeight: height });
        }
      }
    }
  }

  requestUpdateAlignment() {
    console.log('requestUpdateAlignment');
    setTimeout(() => this.updateAlignment(), 10);
  }

  updateAlignment() {
    if (this.dropdown) {
      const { horizAlign, vertAlign, triggerWidth, triggerHeight } = this.state;
      const { top, left, width, height } = this.dropdown.getBoundingClientRect();
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
      children,
    } = this.props;
    const offsetTop = vertAlign === 'bottom' ? -triggerHeight : 0;
    const offsetLeft = align === 'right' ? triggerWidth : 0;
    const dropdownClassNames = classnames(
      'slds-dropdown',
      `slds-dropdown--${align}`,
      `slds-dropdown--${vertAlign}`,
    );
    return (
      <div ref={ node => (this.node = node) }>
        <RelativePortal
          left={ offsetLeft }
          top={ offsetTop }
          onScroll={ () => this.requestUpdateAlignment() }
        >
          <div
            ref={ node => (this.dropdown = node) }
            className={ dropdownClassNames }
          >
            { children }
          </div>
        </RelativePortal>
      </div>
    );
  }
}

Dropdown.propTypes = {
  align: PropTypes.oneOf(['left', 'right']),
  vertAlign: PropTypes.oneOf(['top', 'bottom']),
  children: PropTypes.node,
};
