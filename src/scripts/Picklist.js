import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FormElement from './FormElement';
import Icon from './Icon';
import Button from './Button';
import { default as DropdownMenu, DropdownMenuItem } from './DropdownMenu';
import { uuid, isElInChildren } from './util';


export default class Picklist extends Component {
  constructor(props) {
    super(props);

    const initialValue = props.value || props.defaultValue;

    this.state = {
      id: `form-element-${uuid()}`,
      opened: props.defaultOpened,
      value: Array.isArray(initialValue) ? initialValue : [initialValue],
    };
  }

  onClick = () => {
    this.setState({ opened: !this.state.opened });
    setTimeout(() => {
      this.focusToTargetItemEl();
    }, 10);
  };

  onPicklistItemClick = (item, e) => {
    const { multiSelect } = this.props;
    this.updateItemValue(item.value);

    if (this.props.onChange) {
      this.props.onChange(e, item.value);
    }
    if (this.props.onSelect) {
      this.props.onSelect(item);
    }
    if (!multiSelect) {  // close if only single select
      setTimeout(() => {
        this.setState({ opened: false });
        if (this.props.onComplete) {
          this.props.onComplete();
        }
        const picklistButtonEl = this.picklistButton;
        if (picklistButtonEl) {
          picklistButtonEl.focus();
        }
      }, 200);
    }
    e.preventDefault();
    e.stopPropagation();
  };

  onPicklistClose = () => {
    const picklistButtonEl = this.picklistButton;
    picklistButtonEl.focus();
    this.setState({ opened: false });
  };

  onBlur = () => {
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
  };

  onKeydown = (e) => {
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
    } else if (e.keyCode === 27) { // ESC
      e.preventDefault();
      e.stopPropagation();
      this.setState({ opened: false });
      if (this.props.onComplete) {
        this.props.onComplete();
      }
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  };

  getValue() {
    const { value } = this.props;
    // for controlled behavior returning value from props
    if (value) {
      return Array.isArray(value) ? value : [value];
    }
    // for uncontrolled - value from state
    return this.state.value;
  }

  setValue(newValue) {
    const { multiSelect, onValueChange } = this.props;
    const prevValue = this.getValue();
    this.setState({ value: newValue });

    // this is for controlled behavior
    if (onValueChange && prevValue !== newValue) {
      if (multiSelect) {
        onValueChange(newValue, prevValue);
      } else {
        onValueChange(newValue.length > 0 ? newValue[0] : undefined,
          prevValue.length > 0 ? prevValue[0] : undefined);
      }
    }
  }

  getSelectedItemLabel() {
    const selectedValues = this.getValue();

    // many items selected
    if (selectedValues.length > 1) {
      return this.props.optionsSelectedText;
    }

    // one item
    if (selectedValues.length === 1) {
      const selectedValue = selectedValues[0];
      let selected = null;
      React.Children.forEach(this.props.children, (item) => {
        if (item.props.value === selectedValue) {
          selected = item.props.label || item.props.children;
        }
      });
      return selected || selectedValue;
    }

    // zero items
    return this.props.selectedText;
  }

  updateItemValue(itemValue) {
    const { multiSelect } = this.props;

    if (multiSelect) {
      const newValue = this.getValue().slice();

      // toggle value
      if (newValue.indexOf(itemValue) === -1) {
        // add value to array
        newValue.push(itemValue);
      } else {
        // remove from array
        newValue.splice(newValue.indexOf(itemValue), 1);
      }
      this.setValue(newValue);
    } else {
      // set only one value
      this.setValue([itemValue]);
    }
  }

  isFocusedInComponent() {
    const targetEl = document.activeElement;
    return isElInChildren(this.node, targetEl) || isElInChildren(this.dropdown, targetEl);
  }

  focusToTargetItemEl() {
    const dropdownEl = this.dropdown;
    if (!dropdownEl) { return; }
    const firstItemEl =
      dropdownEl.querySelector('.slds-is-selected > .react-slds-menuitem[tabIndex]') ||
      dropdownEl.querySelector('.react-slds-menuitem[tabIndex]');
    if (firstItemEl) {
      firstItemEl.focus();
    }
  }

  renderPicklist(props) {
    const { className, id, disabled, menuSize, menuStyle, ...pprops } = props;
    const picklistClassNames = classnames(className, 'slds-picklist', 'slds-dropdown-trigger');
    delete pprops.onValueChange;
    return (
      <div className={ picklistClassNames } aria-expanded={ this.state.opened }>
        <Button
          id={ id }
          buttonRef={ node => (this.picklistButton = node) }
          className='slds-picklist__label'
          type='neutral'
          disabled={ disabled }
          onClick={ !disabled && this.onClick }
          onBlur={ !disabled && this.onBlur }
          onKeyDown={ !disabled && this.onKeydown }
        >
          <span className='slds-truncate'>
            { this.getSelectedItemLabel() || <span>&nbsp;</span> }
          </span>
          <Icon icon='down' />
        </Button>
        { this.renderDropdown(menuSize, menuStyle) }
      </div>
    );
  }

  renderDropdown(menuSize, menuStyle) {
    const { className, children } = this.props;
    return (
      this.state.opened ?
        <DropdownMenu
          portalClassName={ classnames(className, 'slds-picklist') }
          dropdownMenuRef={ node => (this.dropdown = node) }
          size={ menuSize }
          onMenuItemClick={ this.onPicklistItemClick }
          onMenuClose={ this.onPicklistClose }
          style={ menuStyle }
          onBlur={ this.onBlur }
        >
          { React.Children.map(children, this.renderPicklistItem) }
        </DropdownMenu> :
          <div ref={ node => (this.dropdown = node) } />
    );
  }

  renderPicklistItem = (item) => {
    const selected = this.getValue().indexOf(item.props.value) !== -1;
    const onBlur = this.onBlur;
    return React.cloneElement(item, { selected, onBlur });
  };

  render() {
    const id = this.props.id || this.state.id;
    const { label, required, error, totalCols, cols, ...props } = this.props;
    const formElemProps = { id, label, required, error, totalCols, cols };
    return (
      <FormElement formElementRef={ node => (this.node = node) } { ...formElemProps }>
        { this.renderPicklist({ ...props, id }) }
      </FormElement>
    );
  }
}

Picklist.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  multiSelect: PropTypes.bool,
  error: FormElement.propTypes.error,
  totalCols: PropTypes.number,
  cols: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),
  ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),
  ]),
  selectedText: PropTypes.string,
  defaultOpened: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  onSelect: PropTypes.func,
  onComplete: PropTypes.func,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  menuSize: PropTypes.string,
  menuStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node,
  optionsSelectedText: PropTypes.string,
};

Picklist.defaultProps = {
  multiSelect: false,
  defaultValue: [],
  selectedText: '',
  optionsSelectedText: '',
};


Picklist.isFormElement = true;


export const PicklistItem = ({ label, selected, children, ...props }) => (
  <DropdownMenuItem
    icon={ selected ? 'check' : 'none' }
    role='menuitemradio' // eslint-disable-line
    selected={ selected }
    { ...props }
  >
    { label || children }
  </DropdownMenuItem>
);

PicklistItem.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  selected: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  children: PropTypes.node,
};
