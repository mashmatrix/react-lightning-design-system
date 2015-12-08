import React, { PropTypes } from 'react';
import classnames from 'classnames';
import FormElement from './FormElement';
import Icon from './Icon';
import { default as DropdownMenu, DropdownMenuItem } from './DropdownMenu';


export default class Picklist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { opened: props.defaultOpened, value: props.defaultValue };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.onValueChange && prevState.value !== this.state.value) {
      this.props.onValueChange(this.state.value, prevState.value);
    }
  }

  onClick(e) {
    this.setState({ opened: !this.state.opened });
    setTimeout(() => {
      this.focusToTargetItemEl();
    }, 10);
  }

  focusToTargetItemEl() {
    let dropdownEl = React.findDOMNode(this.refs.dropdown);
    let firstItemEl =
      dropdownEl.querySelector('.slds-is-selected > .react-slds-menuitem[tabIndex]') ||
      dropdownEl.querySelector('.react-slds-menuitem[tabIndex]');
    if (firstItemEl) {
      firstItemEl.focus();
    }
  }

  isFocusedInComponent() {
    const rootEl = React.findDOMNode(this);
    let targetEl = document.activeElement;
    while (targetEl && targetEl !== rootEl) {
      targetEl = targetEl.parentNode;
    }
    return !!targetEl;
  }

  onPicklistItemClick(item, e) {
    this.setState({ value: item.value });
    if (this.props.onChange) {
      this.props.onChange(e, item.value);
    }
    if (this.props.onSelect) {
      this.props.onSelect(item);
    }
    setTimeout(() => {
      this.setState({ opened: false });
      if (this.props.onComplete) {
        this.props.onComplete();
      }
      const picklistButtonEl = React.findDOMNode(this.refs.picklistButton);
      if (picklistButtonEl) {
        picklistButtonEl.focus();
      }
    }, 200);
    e.preventDefault();
    e.stopPropagation();
  }

  onBlur() {
    setTimeout(() => {
      if (!this.isFocusedInComponent()) {
        this.setState({ opened: false });
        if (this.props.onBlur) {
          this.props.onBlur();
        }
        if (this.props.onComplete) {
          this.props.onComplete();
        }
      }
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
    const { totalCols, cols, label, ...props } = this.props;
    const dropdown = this.renderDropdown();
    const formElemProps = { id: props.id, totalCols, cols, label, dropdown };
    return (
      <FormElement { ...formElemProps }>
        { this.renderPicklist(props) }
      </FormElement>
    );
  }

  renderPicklist(props) {
    const { className, id, menuSize, children, ...pprops } = props;
    const picklistClassNames = classnames(className, 'slds-picklist');
    return (
      <div className={ picklistClassNames } aria-expanded={ this.state.opened }>
        <button id={ id } ref='picklistButton' className='slds-picklist__label slds-button slds-button--neutral'
          type='button' aria-haspopup={ true } { ...pprops }
          onClick={ this.onClick.bind(this) }
          onBlur={ this.onBlur.bind(this) }
          onKeyDown={ this.onKeydown.bind(this) }
        >
          <span className='slds-truncate'>{ this.getSelectedItemLabel() || <span>&nbsp;</span> }</span>
          <Icon icon='down' />
        </button>
      </div>
    );
  }

  renderDropdown() {
    const { menuSize, children } = this.props;
    return (
      this.state.opened ?
      <DropdownMenu ref='dropdown' size={ menuSize } onMenuItemClick={ this.onPicklistItemClick.bind(this) }>
        { React.Children.map(children, this.renderPicklistItem.bind(this)) }
      </DropdownMenu> :
      <div ref='dropdown' />
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
  defaultOpened: PropTypes.boolean,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  onSelect: PropTypes.func,
  onComplete: PropTypes.func,
};


Picklist.isFormElement = true;



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
