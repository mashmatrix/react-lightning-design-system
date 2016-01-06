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
      const triggerElem = ReactDOM.findDOMNode(this.refs.trigger);
      triggerElem.focus();
    }
    if (this.props.onClick) {
      this.props.onClick(...args);
    }
  }

  onMenuItemClick(...args) {
    if (!this.props.hoverPopup) {
      const triggerElem = ReactDOM.findDOMNode(this.refs.trigger);
      triggerElem.blur();
    }
    if (this.props.onMenuItemClick) {
      this.props.onMenuItemClick(...args);
    }
  }

  renderButton({ grouped, isFirstInGroup, isLastInGroup, ...props }) {
    if (grouped) {
      const noneStyle = { display: 'none' };
      return (
        <div className='slds-button-group'>
          { isFirstInGroup ? null : <button className='slds-button' style={ noneStyle }></button> }
          <Button onClick={ this.onTriggerClick.bind(this) } { ...props } aria-haspopup />
          { isLastInGroup ? null : <button className='slds-button' style={ noneStyle }></button> }
        </div>
      );
    }

    return <Button onClick={ this.onTriggerClick.bind(this) } { ...props } aria-haspopup />;
  }

  render() {
    const { className, menuAlign = 'left', menuSize, nubbinTop, hoverPopup, menuHeader, type, label, children, ...props } = this.props;
    let { icon } = this.props;
    const dropdownClassNames = classnames(className, 'slds-dropdown-trigger');
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
  onClick: PropTypes.func,
  onMenuItemClick: PropTypes.func,
  grouped: PropTypes.bool,
  isFirstInGroup: PropTypes.bool,
  isLastInGroup: PropTypes.bool,
  children: PropTypes.node,
};
