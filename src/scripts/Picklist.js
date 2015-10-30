import React, { PropTypes } from 'react';
import classnames from 'classnames';
import FormElement from './FormElement';
import Icon from './Icon';
import { default as DropdownMenu, DropdownMenuItem } from './DropdownMenu';


export default class Picklist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { opened: false, value: props.defaultValue };
  }

  onClick(e) {
    this.setState({ opened: !this.state.opened });
    setTimeout(() => {
      this.focusToTargetItemEl();
    }, 10);
  }

  focusToTargetItemEl() {
    let picklistEl = React.findDOMNode(this.refs.picklist);
    let firstItemEl =
      picklistEl.querySelector('.slds-is-selected > a[tabIndex]') ||
      picklistEl.querySelector('a[tabIndex]');
    if (firstItemEl) {
      firstItemEl.focus();
    }
  }

  onPicklistItemClick(item, e) {
    this.setState({ value: item.value });
    if (this.props.onSelect) {
      this.props.onSelect(item);
    }
    if (this.props.onChange) {
      this.props.onChange(e, item.value);
    }
    setTimeout(() => {
      this.setState({ opened: false });
      React.findDOMNode(this.refs.picklistButton).focus();
    }, 200);
    e.preventDefault();
    e.stopPropagation();
  }

  onBlur(e) {
    setTimeout(() => {
      let picklistEl = React.findDOMNode(this.refs.picklist);
      let el = document.activeElement;
      while (el) {
        if (el === picklistEl) { return; }
        el = el.parentElement;
      }
      this.setState({ opened: false });
    }, 10);
  }

  onKeydown(e) {
    if (e.keyCode === 40) { // down
      e.preventDefault();
      e.stopPropagation();
      if (!this.state.opened) {
        this.setState({ opened: true });
        setTimeout(() => {
          this.focusToTargetItemEl();
        }, 10);
      } else {
        this.focusToTargetItemEl();
      }
    }
  }

  getSelectedValue() {
    const { defaultValue, value } = this.props;
    return (
      typeof value !== 'undefined' ? value :
      typeof this.state.value !== 'undefined' ? this.state.value :
      defaultValue
    );
  }

  getSelectedItemLabel() {
    const selectedValue = this.getSelectedValue();
    let selected = null;
    React.Children.forEach(this.props.children, (item) => {
      if (item.props.value === selectedValue) {
        selected = item.props.label || item.props.children;
      }
    });
    return selected;
  }

  render() {
    const { label, ...props } = this.props;
    if (label) {
      return (
        <FormElement id={ props.id } label={ label }>
          <Picklist { ...props } />
        </FormElement>
      );
    }
    const { className, id, menuSize, children, ...pprops } = props;
    const picklistClassNames = classnames(className, 'slds-picklist');
    return (
      <div className={ picklistClassNames } aria-expanded={ this.state.opened } ref="picklist">
        <button id={ id } ref='picklistButton' className='slds-picklist__label slds-button slds-button--neutral'
          type='button' aria-haspopup={ true } { ...pprops }
          onClick={ this.onClick.bind(this) }
          onBlur={ this.onBlur.bind(this) }
          onKeyDown={ this.onKeydown.bind(this) }
        >
          <span className='slds-truncate'>{ this.getSelectedItemLabel() || <span>&nbsp;</span> }</span>
          <Icon icon='down' />
        </button>
        {
          this.state.opened ?
          <DropdownMenu size={ menuSize } onMenuItemClick={ this.onPicklistItemClick.bind(this) }>
            { React.Children.map(children, this.renderPicklistItem.bind(this)) }
          </DropdownMenu> :
          null
        }
      </div>
    );
  }

  renderPicklistItem(item) {
    const selected = item.props.value === this.getSelectedValue();
    const onBlur = this.onBlur.bind(this);
    return React.cloneElement(item, { selected, onBlur });
  }

}

Picklist.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
};



export class PicklistItem extends React.Component {

  render() {
    const { label, selected, value, children, ...props } = this.props;
    return (
      <DropdownMenuItem icon={ selected ? 'check' : 'none' } role='menuitemradio' selected={ selected } { ...props }>
        { label || children }
      </DropdownMenuItem>
    );
  }

}
