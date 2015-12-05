import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Button from './Button';
import DropdownMenu from './DropdownMenu';
import { registerStyle } from './util';

export default class DropdownButton extends React.Component {
  constructor(props) {
    super(props);
    registerStyle('no-hover-popup', [
      [
        '.slds-dropdown-trigger:hover .slds-dropdown--menu.react-slds-no-hover-popup',
        '{ visibility: hidden; opacity: 0; }',
      ],
      [
        '.slds-dropdown-trigger:focus .slds-dropdown--menu.react-slds-no-hover-popup',
        '{ visibility: visible !important; opacity: 1 !important; }',
      ],
    ]);
  }

  onTriggerClick(...args) {
    if (!this.props.hoverPopup) {
      let triggerElem = ReactDOM.findDOMNode(this.refs.trigger);
      triggerElem.focus();
    }
    if (this.props.onClick) {
      this.props.onClick(...args);
    }
  }

  onMenuItemClick(...args) {
    if (!this.props.hoverPopup) {
      let triggerElem = ReactDOM.findDOMNode(this.refs.trigger);
      triggerElem.blur();
    }
    if (this.props.onMenuItemClick) {
      this.props.onMenuItemClick(...args);
    }
  }

  render() {
    let { className, menuAlign='left', menuSize, nubbinTop, hoverPopup, menuHeader, type, icon, label, children, ...props } = this.props;
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
        <DropdownMenu align={ menuAlign } header={ menuHeader } size={ menuSize }
          nubbinTop={ nubbinTop } hoverPopup={ hoverPopup }
          onMenuItemClick={ this.onMenuItemClick.bind(this) }
        >
          { children }
        </DropdownMenu>
      </div>
    );
  }

  renderButton({ grouped, isFirstInGroup, isLastInGroup, onClick, ...props }) {
    if (grouped) {
      const noneStyle = { display: 'none' };
      return (
        <div className='slds-button-group'>
          { isFirstInGroup ? null : <button className='slds-button' style={ noneStyle }></button> }
          <Button onClick={ this.onTriggerClick.bind(this) } { ...props } aria-haspopup={ true } />
          { isLastInGroup ? null : <button className='slds-button' style={ noneStyle }></button> }
        </div>
      );
    } else {
      return <Button onClick={ this.onTriggerClick.bind(this) } { ...props } aria-haspopup={ true } />;
    }
  }

}

DropdownButton.propTypes = {
  className: PropTypes.string,
  menuAlign: PropTypes.oneOf(['left', 'center', 'right']),
  menuSize: PropTypes.oneOf(['small', 'medium', 'large']),
  menuHeader: PropTypes.string,
  nubbinTop: PropTypes.bool,
  hoverPopup: PropTypes.bool,
  onClick: PropTypes.func,
  onMenuItemClick: PropTypes.func,
  grouped: PropTypes.bool,
  isFirstInGroup: PropTypes.bool,
  isLastInGroup: PropTypes.bool,
};
