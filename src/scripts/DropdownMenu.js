import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Icon from './Icon';


export class DropdownMenuItem extends React.Component {
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

  render() {
    const { className, icon, iconRight, selected, disabled, tabIndex=0, onClick, children, ...props } = this.props;
    const menuItemClass = classnames(
      'slds-dropdown__item',
      {
        'slds-is-selected': selected,
        'slds-has-icon': icon || iconRight,
        'slds-has-icon--left': icon,
        'slds-has-icon--right': iconRight,
      },
      className
    );
    return (
      <li className={ menuItemClass } disabled={ disabled }>
        <span className='slds-truncate react-slds-menuitem' role='menuitem' aria-disabled={ disabled } tabIndex={ disabled ? null : tabIndex }
           onClick={ disabled ? null : onClick } onKeyDown={ disabled ? null : this.onKeyDown.bind(this) }
           { ...props }
        >
          { icon ? <Icon icon={ icon } size='small' align='left' /> : null }
          { children }
          { iconRight ? <Icon icon={ iconRight } size='small' align='right' /> : null }
        </span>
      </li>
    );
  }
}

DropdownMenuItem.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  iconAlign: PropTypes.oneOf([ 'left', 'right' ]),
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};


export const MenuItem = DropdownMenuItem;


export default class DropdownMenu extends React.Component {

  render() {
    let { className, align='left', size, header, nubbinTop, hoverPopup, children, ...props } = this.props;
    const dropdownMenuClassNames = classnames(
      className,
      'slds-dropdown',
      'slds-dropdown--menu',
      `slds-dropdown--${align}`,
      {
        [`slds-dropdown--${size}`]: size,
        'slds-dropdown--nubbin-top': nubbinTop,
        'react-slds-no-hover-popup': !hoverPopup,
      }
    );
    return (
      <div className={ dropdownMenuClassNames }>
        {
          header ?
          <div className='slds-dropdown__header'>
            <span className='slds-text-heading--label'>{ header }</span>
          </div> :
          null
        }
        <ul className='slds-dropdown__list' role='menu'>
          { React.Children.map(children, this.renderMenuItem.bind(this)) }
        </ul>
      </div>
    );
  }

  renderMenuItem(menuItem) {
    const { onClick, ...props } = menuItem.props;
    const onMenuItemClick = (...args) => {
      if (onClick) {
        onClick(...args);
      }
      if (this.props.onMenuItemClick) {
        this.props.onMenuItemClick(props, ...args);
      }
    };
    return React.cloneElement(menuItem, { onClick: onMenuItemClick });
  }

}


DropdownMenu.propTypes = {
  className: PropTypes.string,
  align: PropTypes.oneOf([ 'left', 'center', 'right' ]),
  size: PropTypes.oneOf([ 'small', 'medium', 'large' ]),
  header: PropTypes.string,
  nubbinTop: PropTypes.bool,
  hoverPopup: PropTypes.bool,
  onMenuItemClick: PropTypes.func,
};
