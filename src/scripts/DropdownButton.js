import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Button from './Button';
import DropdownMenu from './DropdownMenu';
import { registerStyle } from './util';

export default class DropdownButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { opened: false };
    registerStyle('no-hover-popup', [
      [
        '.slds-dropdown-trigger:hover .slds-dropdown--menu.react-slds-no-hover-popup',
        '{ visibility: hidden; opacity: 0; }',
      ],
      [
        '.slds-dropdown-trigger.react-slds-dropdown-opened .slds-dropdown--menu',
        '{ visibility: visible !important; opacity: 1 !important; }',
      ],
    ]);
  }

  onBlur() {
    setTimeout(() => {
      if (!this.isFocusedInComponent()) {
        this.setState({ opened: false });
        if (this.props.onBlur) {
          this.props.onBlur();
        }
      }
    }, 10);
  }

  onKeyDown(e) {
    if (e.keyCode === 40) { // down
      e.preventDefault();
      e.stopPropagation();
      if (!this.state.opened) {
        this.setState({ opened: true });
        setTimeout(() => {
          this.focusToTargetItemEl();
        }, 20);
      } else {
        this.focusToTargetItemEl();
      }
    } else if (e.keyCode === 27) { // ESC
      e.preventDefault();
      e.stopPropagation();
      this.setState({ opened: false });
    }
  }

  onTriggerClick(...args) {
    if (!this.props.hoverPopup) {
      this.setState({ opened: !this.state.opened });
    }
    if (this.props.onClick) {
      this.props.onClick(...args);
    }
  }

  onMenuItemClick(...args) {
    if (!this.props.hoverPopup) {
      setTimeout(() => {
        const triggerElem = ReactDOM.findDOMNode(this.refs.trigger);
        if (triggerElem) triggerElem.focus();
        this.setState({ opened: false });
      }, 10);
    }
    if (this.props.onMenuItemClick) {
      this.props.onMenuItemClick(...args);
    }
  }

  onMenuClose() {
    const triggerElem = ReactDOM.findDOMNode(this.refs.trigger);
    triggerElem.focus();
    this.setState({ opened: false });
  }

  isFocusedInComponent() {
    const rootEl = ReactDOM.findDOMNode(this);
    let targetEl = document.activeElement;
    while (targetEl && targetEl !== rootEl) {
      targetEl = targetEl.parentNode;
    }
    return !!targetEl;
  }

  focusToTargetItemEl() {
    const dropdownEl = ReactDOM.findDOMNode(this.refs.dropdown);
    const firstItemEl =
      dropdownEl.querySelector('.slds-is-selected > .react-slds-menuitem[tabIndex]') ||
      dropdownEl.querySelector('.react-slds-menuitem[tabIndex]');
    if (firstItemEl) {
      firstItemEl.focus();
    }
  }

  renderButton({ grouped, isFirstInGroup, isLastInGroup, ...props }) {
    if (grouped) {
      const noneStyle = { display: 'none' };
      return (
        <div className='slds-button-group'>
          { isFirstInGroup ? null : <button className='slds-button' style={ noneStyle }></button> }
          <Button { ...props } aria-haspopup
            ref='trigger'
            onClick={ this.onTriggerClick.bind(this) }
            onKeyDown={ this.onKeyDown.bind(this) }
            onBlur={ this.onBlur.bind(this) }
          />
          { isLastInGroup ? null : <button className='slds-button' style={ noneStyle }></button> }
        </div>
      );
    }

    return (
      <Button { ...props } aria-haspopup
        ref='trigger'
        onClick={ this.onTriggerClick.bind(this) }
        onKeyDown={ this.onKeyDown.bind(this) }
        onBlur={ this.onBlur.bind(this) }
      />
    );
  }

  render() {
    const { className, menuAlign = 'left', menuSize, nubbinTop, hoverPopup, menuHeader, type, label, children, ...props } = this.props;
    let { icon } = this.props;
    const dropdownClassNames = classnames(
      className,
      'slds-dropdown-trigger',
      { 'react-slds-dropdown-opened': this.state.opened }
    );
    let iconMore = null;
    if (!label && !icon) {
      icon = 'down';
    }
    if (label || type === 'icon-more') {
      iconMore = 'down';
    }
    return (
      <div className={ dropdownClassNames }>
        { this.renderButton({ type, label, icon, iconMore, ...props }) }
        <DropdownMenu align={ menuAlign } header={ menuHeader } size={ menuSize }
          nubbinTop={ nubbinTop } hoverPopup={ hoverPopup }
          ref='dropdown'
          onMenuItemClick={ this.onMenuItemClick.bind(this) }
          onMenuClose={ this.onMenuClose.bind(this) }
          onBlur={ this.onBlur.bind(this) }
        >
          { children }
        </DropdownMenu>
      </div>
    );
  }

}

DropdownButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.string,
  menuAlign: PropTypes.oneOf(['left', 'center', 'right']),
  menuSize: PropTypes.oneOf(['small', 'medium', 'large']),
  menuHeader: PropTypes.string,
  nubbinTop: PropTypes.bool,
  hoverPopup: PropTypes.bool,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onMenuItemClick: PropTypes.func,
  grouped: PropTypes.bool,
  isFirstInGroup: PropTypes.bool,
  isLastInGroup: PropTypes.bool,
  children: PropTypes.node,
};
