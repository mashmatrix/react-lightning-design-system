import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Button from './Button';


export class MenuItem extends React.Component {
  render() {
    const menuItemClass = classnames(
      'slds-dropdown__header',
      this.props.className
    );
    return (
      <a className={ menuItemClass } onClick={ this.props.onClick } role="menuitem">{ this.props.children }</a>
    );
  }
}

MenuItem.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};



let _hoverStyleOverwritten = false;

function overwriteHoverStyle() {
  let fixStyle = document.createElement('style');
  fixStyle.id = 'react-slds-cssfix-' + Math.random();
  fixStyle.appendChild(document.createTextNode(''));
  document.documentElement.appendChild(fixStyle);
  fixStyle.sheet.insertRule(
    '.slds-dropdown-trigger:hover .slds-dropdown--menu.react-slds-no-hover-popup { visibility: hidden; opacity: 0; }'
  );
  fixStyle.sheet.insertRule(
    '.slds-dropdown-trigger:focus .slds-dropdown--menu.react-slds-no-hover-popup { visibility: visible !important; opacity: 1 !important; }'
  );
  _hoverStyleOverwritten = true;
}


export default class DropdownButton extends React.Component {
  constructor(props) {
    super(props);
    if (!_hoverStyleOverwritten) { overwriteHoverStyle(); }
  }

  handleTriggerClick(...args) {
    if (!this.props.hoverPopup) {
      let triggerElem = React.findDOMNode(this.refs.trigger);
      triggerElem.focus();
    }
    if (this.props.onClick) {
      this.props.onClick(...args);
    }
  }

  handleMenuItemClick(...args) {
    if (!this.props.hoverPopup) {
      let triggerElem = React.findDOMNode(this.refs.trigger);
      triggerElem.blur();
    }
    if (this.props.onMenuItemClick) {
      this.props.onMenuItemClick(...args);
    }
  }

  render() {
    let { className, menuAlign='left', nubbinTop, hoverPopup, menuHeader, type, icon, label, children, ...props } = this.props;
    const dropdownClassNames = classnames(className, 'slds-dropdown-trigger');
    const dropdownMenuClassNames = classnames(
      'slds-dropdown',
      'slds-dropdown--menu',
      `slds-dropdown--${menuAlign}`,
      {
        'slds-dropdown--nubbin-top': nubbinTop,
        'react-slds-no-hover-popup': !hoverPopup,
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
      <div className={ dropdownClassNames } ref='trigger' tabIndex={ -1 }>
        { this.renderButton({ type, label, icon, iconMore, ...props }) }
        <div className={ dropdownMenuClassNames }>
          { menuHeader ? this.renderMenuHeader(menuHeader) : null }
          <ul className='slds-dropdown__list' role='menu'>
            { React.Children.map(children, this.renderMenuItem.bind(this)) }
          </ul>
        </div>
      </div>
    );
  }

  renderButton({ grouped, isFirstInGroup, isLastInGroup, onClick, ...props }) {
    if (grouped) {
      const noneStyle = { display: 'none' };
      return (
        <div className='slds-button-group'>
          { isFirstInGroup ? null : <button className='slds-button' style={ noneStyle }></button> }
          <Button onClick={ this.handleTriggerClick.bind(this) } { ...props } aria-haspopup={ true } />
          { isLastInGroup ? null : <button className='slds-button' style={ noneStyle }></button> }
        </div>
      );
    } else {
      return <Button onClick={ this.handleTriggerClick.bind(this) } { ...props } aria-haspopup={ true } />;
    }
  }

  renderMenuHeader(menuHeader) {
    return (
      <div className='slds-dropdown__header'>
        <span className='slds-text-heading--label'>{ menuHeader }</span>
      </div>
    );
  }

  renderMenuItem(menuItem) {
    const { onClick, ...props } = menuItem.props;
    const onMenuItemClick = (...args) => {
      if (onClick) { onClick(...args); }
      this.handleMenuItemClick(props, ...args);
    };
    return (
      <li className='slds-dropdown__item'>
        { React.cloneElement(menuItem, { onClick: onMenuItemClick }) }
      </li>
    );
  }

}

DropdownButton.propTypes = {
  className: PropTypes.string,
  menuAlign: PropTypes.string,
  nubbinTop: PropTypes.bool,
  hoverPopup: PropTypes.bool,
  menuHeader: PropTypes.string,
  onMenuItemClick: PropTypes.func,
  grouped: PropTypes.bool,
  isFirstInGroup: PropTypes.bool,
  isLastInGroup: PropTypes.bool,
};
