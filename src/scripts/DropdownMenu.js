import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from './Icon';
import autoAlign from './AutoAlign';
import { PicklistItem } from './Picklist';

export const DropdownMenuHeader = ({ divider, className, children }) => {
  const menuHeaderClass = classnames(
    'slds-dropdown__header',
    { [`slds-has-divider--${divider}-space`]: divider },
    className
  );
  return (
    <div className={ menuHeaderClass }>
      <span className='slds-text-heading--label'>{ children }</span>
    </div>
  );
};

DropdownMenuHeader.propTypes = {
  className: PropTypes.string,
  divider: PropTypes.oneOf(['top', 'bottom']),
  children: PropTypes.node,
};

export const MenuHeader = DropdownMenuHeader;

export class DropdownMenuItem extends Component {
  onKeyDown(e, ...args) {
    if (e.keyCode === 13 || e.keyCode === 32) { // return or space
      e.preventDefault();
      e.stopPropagation();
      if (this.props.onClick) {
        this.props.onClick(e, ...args);
      }
    } else if (e.keyCode === 40 || e.keyCode === 38) {
      e.preventDefault();
      e.stopPropagation();
      const currentEl = e.target.parentElement;
      let itemEl = e.keyCode === 40 ? currentEl.nextSibling : currentEl.previousSibling;
      while (itemEl) {
        const anchorEl = itemEl.querySelector('.react-slds-menuitem[tabIndex]');
        if (anchorEl && !anchorEl.disabled) {
          anchorEl.focus();
          return;
        }
        itemEl = e.keyCode === 40 ? itemEl.nextSibling : itemEl.previousSibling;
      }
    }
  }

  onBlur(e) {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  onFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  render() {
    const {
      className, label, icon, iconRight, selected, disabled, divider, tabIndex = 0, onClick,
      children, ...props
    } = this.props;
    const menuItemClass = classnames(
      'slds-dropdown__item', {
        'slds-is-selected': selected,
        [`slds-has-divider--${divider}-space`]: divider,
      },
      className
    );
    return (
      <li className={ menuItemClass } disabled={ disabled }>
        <a
          className='slds-truncate react-slds-menuitem'
          role='menuitem'
          aria-disabled={ disabled }
          tabIndex={ disabled ? null : tabIndex }
          onClick={ disabled ? null : onClick }
          onKeyDown={ disabled ? null : this.onKeyDown.bind(this) }
          onBlur={ disabled ? null : this.onBlur.bind(this) }
          onFocus={ disabled ? null : this.onFocus.bind(this) }
          { ...props }
        >
          <p className='slds-truncate'>
            { icon ? <Icon icon={ icon } size='x-small' align='left' /> : null }
            { label || children }
          </p>
          { iconRight ? <Icon icon={ iconRight } size='x-small' align='right' /> : null }
        </a>
      </li>
    );
  }
}

DropdownMenuItem.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
  iconRight: PropTypes.string,
  disabled: PropTypes.bool,
  divider: PropTypes.oneOf(['top', 'bottom']),
  tabIndex: PropTypes.number,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  children: PropTypes.node,
};


export const MenuItem = DropdownMenuItem;


class DropdownMenu extends Component {
  onMenuItemBlur(e) {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  onMenuItemFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  onKeyDown(e) {
    if (e.keyCode === 27) { // ESC
      if (this.props.onMenuClose) {
        this.props.onMenuClose();
      }
    }
  }

  renderMenuItem(menuItem) {
    const { onClick, onBlur, onFocus, ...props } = menuItem.props;
    const onMenuItemClick = (...args) => {
      if (onClick) { onClick(...args); }
      if (this.props.onMenuItemClick) {
        this.props.onMenuItemClick(props, ...args);
      }
    };
    const onMenuItemFocus = (e) => {
      if (onFocus) { onFocus(e); }
      this.onMenuItemFocus(e);
    };
    const onMenuItemBlur = (e) => {
      if (onBlur) { onBlur(e); }
      this.onMenuItemBlur(e);
    };
    return React.cloneElement(menuItem, {
      onClick: onMenuItemClick,
      onBlur: onMenuItemBlur,
      onFocus: onMenuItemFocus,
    });
  }

  render() {
    const {
      className, align, vertAlign, size, header, nubbinTop, hoverPopup, children, style,
      dropdownMenuRef,
      onFocus, onBlur,
    } = this.props;
    const nubbin = nubbinTop ? 'auto' : this.props.nubbin;
    const nubbinPosition = nubbin === 'auto' ? `${vertAlign} ${align}` : nubbin;
    const dropdownClassNames = classnames(
      className,
      'slds-dropdown',
      `slds-dropdown--${align}`,
      `slds-dropdown--${vertAlign}`,
      size ? `slds-dropdown--${size}` : undefined,
      nubbinPosition ? `slds-nubbin_${nubbinPosition.replace(/\s+/g, '-')}` : undefined,
      { 'react-slds-no-hover-popup': !hoverPopup },
    );
    const handleDOMRef = (node) => {
      this.node = node;
      if (dropdownMenuRef) {
        dropdownMenuRef(node);
      }
    };
    return (
      <div
        className={ dropdownClassNames }
        ref={ handleDOMRef }
        style={ { outline: 'none', ...style } }
        onKeyDown={ this.onKeyDown.bind(this) }
        tabIndex='-1'
        onFocus={ onFocus }
        onBlur={ onBlur }
      >
        { header ? <MenuHeader>{ header }</MenuHeader> : null }
        <ul className='slds-dropdown__list' role='menu'>
          { React.Children.map(children, item => (
            item.type === MenuItem || item.type === PicklistItem ? this.renderMenuItem(item) : item
          )) }
        </ul>
      </div>
    );
  }

}


DropdownMenu.propTypes = {
  className: PropTypes.string,
  align: PropTypes.oneOf(['left', 'right']),
  vertAlign: PropTypes.oneOf(['top', 'bottom']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  header: PropTypes.string,
  nubbin: PropTypes.oneOf(['top', 'top left', 'top right', 'bottom', 'bottom left', 'bottom right', 'auto']),
  nubbinTop: PropTypes.bool, // for backward compatibility. use nubbin instead
  hoverPopup: PropTypes.bool,
  onMenuItemClick: PropTypes.func,
  onMenuClose: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  children: PropTypes.node,
  dropdownMenuRef: PropTypes.func,
  /* eslint-disable react/forbid-prop-types */
  style: PropTypes.object,
};

function preventPortalizeOnHoverPopup(Cmp) {
  // eslint-disable-next-line react/prop-types
  return props => <Cmp preventPortalize={ !!props.hoverPopup } { ...props } />;
}

export default preventPortalizeOnHoverPopup(autoAlign({
  triggerSelector: '.slds-dropdown-trigger',
})(DropdownMenu));
