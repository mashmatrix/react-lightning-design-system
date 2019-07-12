import React, { Component } from 'react';
import classnames from 'classnames';
import { FormElement, FormElementProps } from './FormElement';
import { Icon } from './Icon';
import { Button } from './Button';
import DropdownMenu, { DropdownMenuItem } from './DropdownMenu';
import { uuid, isElInChildren } from './util';

export type PicklistProps = {
  id?: string;
  className?: string;
  label?: string;
  required?: boolean;
  multiSelect?: boolean;
  error?: FormElementProps['error'];
  totalCols?: number;
  cols?: number;
  name?: string;
  value?: string | number | (string | number)[];
  defaultValue?: string | number | (string | number)[];
  selectedText?: string;
  optionsSelectedText?: string;
  defaultOpened?: boolean;
  disabled?: boolean;
  menuSize?: string;
  menuStyle?: object;
  onChange?: (...args: any[]) => any;
  onValueChange?: (newValue?: any, prevValue?: any) => void;
  onSelect?: (...args: any[]) => any;
  onComplete?: (...args: any[]) => any;
  onKeyDown?: (...args: any[]) => any;
  onBlur?: (...args: any[]) => any;
};

export type PicklistState = {
  id: string;
  opened?: boolean;
  value: (string | number)[];
};

export class Picklist extends Component<PicklistProps, PicklistState> {
  static isFormElement = true;

  // eslint-disable-next-line react/sort-comp
  private node: HTMLDivElement | null;

  private picklistButton: HTMLButtonElement | null;

  private dropdown: HTMLDivElement | null;

  constructor(props: Readonly<PicklistProps>) {
    super(props);

    const { defaultValue = [] } = props;
    const initialValue = props.value || defaultValue;

    this.node = null;
    this.picklistButton = null;
    this.dropdown = null;

    this.state = {
      id: `form-element-${uuid()}`,
      opened: props.defaultOpened,
      value: Array.isArray(initialValue) ? initialValue : [initialValue],
    };
  }

  onClick = () => {
    this.setState((prevState) => ({ opened: !prevState.opened }));
    setTimeout(() => {
      this.focusToTargetItemEl();
    }, 10);
  };

  onPicklistItemClick = (item: any, e: any) => {
    const { multiSelect = false } = this.props;
    this.updateItemValue(item.value);

    if (this.props.onChange) {
      this.props.onChange(e, item.value);
    }
    if (this.props.onSelect) {
      this.props.onSelect(item);
    }
    if (!multiSelect) {
      // close if only single select
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
    if (picklistButtonEl) {
      picklistButtonEl.focus();
    }
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

  onKeydown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.keyCode === 40) {
      // down
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
    } else if (e.keyCode === 27) {
      // ESC
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

  setValue(newValue: (string | number)[]) {
    const { multiSelect = false, onValueChange } = this.props;
    const prevValue = this.getValue();
    this.setState({ value: newValue });

    // this is for controlled behavior
    if (onValueChange && prevValue !== newValue) {
      if (multiSelect) {
        onValueChange(newValue, prevValue);
      } else {
        onValueChange(
          newValue.length > 0 ? newValue[0] : undefined,
          prevValue.length > 0 ? prevValue[0] : undefined
        );
      }
    }
  }

  getSelectedItemLabel() {
    const selectedValues = this.getValue();

    // many items selected
    if (selectedValues.length > 1) {
      const { optionsSelectedText = '' } = this.props;
      return optionsSelectedText;
    }

    // one item
    if (selectedValues.length === 1) {
      const selectedValue = selectedValues[0];
      let selected = null;
      React.Children.forEach(this.props.children, (item: any) => {
        if (item.props.value === selectedValue) {
          selected = item.props.label || item.props.children;
        }
      });
      return selected || selectedValue;
    }

    // zero items
    const { selectedText = '' } = this.props;
    return selectedText;
  }

  updateItemValue(itemValue: any) {
    const { multiSelect = false } = this.props;

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
    return (
      isElInChildren(this.node, targetEl) ||
      isElInChildren(this.dropdown, targetEl)
    );
  }

  focusToTargetItemEl() {
    const dropdownEl = this.dropdown;
    if (!dropdownEl) {
      return;
    }
    const firstItemEl: HTMLAnchorElement | null =
      dropdownEl.querySelector(
        '.slds-is-selected > .react-slds-menuitem[tabIndex]'
      ) || dropdownEl.querySelector('.react-slds-menuitem[tabIndex]');
    if (firstItemEl) {
      firstItemEl.focus();
    }
  }

  renderPicklist(props: PicklistProps) {
    const { className, id, disabled, menuSize, menuStyle } = props;
    const picklistClassNames = classnames(
      className,
      'slds-picklist',
      'slds-dropdown-trigger'
    );
    return (
      <div className={picklistClassNames} aria-expanded={this.state.opened}>
        <Button
          id={id}
          buttonRef={(node) => (this.picklistButton = node)}
          className='slds-picklist__label'
          type='neutral'
          disabled={disabled}
          onClick={disabled ? undefined : this.onClick}
          onBlur={disabled ? undefined : this.onBlur}
          onKeyDown={disabled ? undefined : this.onKeydown}
        >
          <span className='slds-truncate'>
            {this.getSelectedItemLabel() || <span>&nbsp;</span>}
          </span>
          <Icon icon='down' />
        </Button>
        {this.renderDropdown(menuSize, menuStyle)}
      </div>
    );
  }

  renderDropdown(menuSize: string | undefined, menuStyle: object | undefined) {
    const { className, children } = this.props;
    return this.state.opened ? (
      <DropdownMenu
        portalClassName={classnames(className, 'slds-picklist')}
        dropdownMenuRef={(node: HTMLDivElement) => (this.dropdown = node)}
        size={menuSize}
        onMenuItemClick={this.onPicklistItemClick}
        onMenuClose={this.onPicklistClose}
        style={menuStyle}
        onBlur={this.onBlur}
      >
        {React.Children.map(children, this.renderPicklistItem)}
      </DropdownMenu>
    ) : (
      <div ref={(node) => (this.dropdown = node)} />
    );
  }

  renderPicklistItem = (item: any) => {
    const selected = this.getValue().indexOf(item.props.value) !== -1;
    const { onBlur } = this;
    return React.cloneElement(item, { selected, onBlur });
  };

  render() {
    const id = this.props.id || this.state.id;
    const { label, required, error, totalCols, cols, ...props } = this.props;
    const formElemProps = { id, label, required, error, totalCols, cols };
    return (
      <FormElement
        formElementRef={(node) => (this.node = node)}
        {...formElemProps}
      >
        {this.renderPicklist({ ...props, id })}
      </FormElement>
    );
  }
}

export type PicklistItemProps = {
  label?: string | number;
  selected?: boolean;
  disabled?: boolean;
  value?: string | number;
};

export const PicklistItem: React.FC<PicklistItemProps> = ({
  label,
  selected,
  disabled,
  children,
  ...props
}) => (
  <DropdownMenuItem
    icon={selected ? 'check' : 'none'}
    role='menuitemradio'
    selected={selected}
    disabled={disabled}
    {...props}
  >
    {label || children}
  </DropdownMenuItem>
);
