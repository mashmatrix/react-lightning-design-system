import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from './Button';
import DropdownMenu from './DropdownMenu';
import { registerStyle, isElInChildren, offset } from './util';

export default class DropdownButton extends Component {
  constructor() {
    super();
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
        if (this.props.onClick) {
          this.props.onClick(e);
        }
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
      this.setState({ opened: !this.state.opened }, () => {
        if (this.state.opened) {
          Object.assign(this.dropdown.style, this.getStyles().dropdownOffset);
        }
      });
    }
    if (this.props.onClick) {
      this.props.onClick(...args);
    }
  }

  onMenuItemClick(...args) {
    if (!this.props.hoverPopup) {
      setTimeout(() => {
        const triggerElem = this.trigger;
        if (triggerElem) triggerElem.focus();
        this.setState({ opened: false });
      }, 10);
    }
    if (this.props.onMenuItemClick) {
      this.props.onMenuItemClick(...args);
    }
  }

  onMenuClose() {
    this.trigger.focus();
    this.setState({ opened: false });
  }

  getStyles() {
    const triggerOffset = offset(this.trigger);
    const dropdownOffset = offset(this.dropdown);
    const triggerPadding = 5;
    const nubbinHeight = 8;
    const top = -1 *
      (dropdownOffset.top - triggerOffset.top - this.trigger.offsetHeight - triggerPadding);
    return {
      dropdownOffset: {
        marginTop: `${top + (this.props.nubbinTop ? nubbinHeight : 0)}px`,
      },
    };
  }

  isFocusedInComponent() {
    return isElInChildren(this.node, document.activeElement);
  }

  focusToTargetItemEl() {
    const dropdownEl = this.dropdown;
    const firstItemEl =
      dropdownEl.querySelector('.slds-is-selected > .react-slds-menuitem[tabIndex]') ||
      dropdownEl.querySelector('.react-slds-menuitem[tabIndex]');
    if (firstItemEl) {
      firstItemEl.focus();
    }
  }

  renderButton({ grouped, isFirstInGroup, isLastInGroup, ...props }) {
    const pprops = props;
    delete pprops.onMenuItemClick;
    const button = (
      <Button
        { ...pprops }
        aria-haspopup
        buttonRef={node => (this.trigger = node)}
        onClick={ this.onTriggerClick.bind(this) }
        onKeyDown={ this.onKeyDown.bind(this) }
        onBlur={ this.onBlur.bind(this) }
      />
    );

    if (grouped) {
      const noneStyle = { display: 'none' };
      return (
        <div className='slds-button-group'>
          { isFirstInGroup ? null : <button className='slds-button' style={ noneStyle } /> }
          { button }
          { isLastInGroup ? null : <button className='slds-button' style={ noneStyle } /> }
        </div>
      );
    }

    return button;
  }

  render() {
    const {
      className, menuAlign = 'left', menuSize, nubbinTop, hoverPopup, menuHeader, type,
      label, children, style, menuStyle, ...props
      } = this.props;
    let { icon } = this.props;
    const dropdownClassNames = classnames(
      className,
      'slds-dropdown-trigger',
      {
        'slds-button-space-left': !props.grouped,
        'react-slds-dropdown-opened': this.state.opened,
      }
    );
    let iconMore = null;
    if (!label && !icon) {
      icon = 'down';
    }
    if (label || type === 'icon-more') {
      iconMore = 'down';
    }

    return (
      <div className={ dropdownClassNames } style={style} ref={node => (this.node = node)}>
        { this.renderButton({ type, label, icon, iconMore, ...props }) }
        { this.state.opened || hoverPopup ?
          <DropdownMenu
            align={ menuAlign }
            header={ menuHeader }
            size={ menuSize }
            nubbinTop={ nubbinTop }
            hoverPopup={ hoverPopup }
            dropdownMenuRef={node => (this.dropdown = node)}
            onMenuItemClick={ this.onMenuItemClick.bind(this) }
            onMenuClose={ this.onMenuClose.bind(this) }
            onBlur={ this.onBlur.bind(this) }
            style={ Object.assign(
              { transition: 'none' },
              menuStyle) }
          >
            { children }
          </DropdownMenu> : null }
      </div>
    );
  }

}

DropdownButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.node,
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
  /* eslint-disable react/forbid-prop-types */
  style: PropTypes.object,
  menuStyle: PropTypes.object,
};
