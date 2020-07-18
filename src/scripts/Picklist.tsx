import React, { Component, CSSProperties, KeyboardEvent } from 'react';
import classnames from 'classnames';
import { FormElement, FormElementProps } from './FormElement';
import { Icon } from './Icon';
import { Button, ButtonProps } from './Button';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuItemProps,
  DropdownMenuProps,
} from './DropdownMenu';
import { uuid, isElInChildren } from './util';

type PicklistValueType<
  ValueType extends string | number,
  Multi extends boolean | undefined
> = Multi extends true
  ? ValueType[]
  : Multi extends false | undefined
  ? ValueType | null
  : ValueType | ValueType[] | null;

export type PicklistProps<
  ValueType extends string | number,
  MultiSelect extends boolean | undefined
> = {
  label?: string;
  required?: boolean;
  multiSelect?: MultiSelect;
  error?: FormElementProps['error'];
  totalCols?: number;
  cols?: number;
  name?: string;
  value?: PicklistValueType<ValueType, MultiSelect>;
  defaultValue?: PicklistValueType<ValueType, MultiSelect>;
  selectedText?: string;
  optionsSelectedText?: string;
  opened?: boolean;
  defaultOpened?: boolean;
  disabled?: boolean;
  menuSize?: DropdownMenuProps<any>['size'];
  menuStyle?: CSSProperties;
  onValueChange?: (
    newValue: PicklistValueType<ValueType, MultiSelect>,
    prevValue: PicklistValueType<ValueType, MultiSelect>
  ) => void;
  onSelect?: (value: ValueType) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void;
  onBlur?: () => void;
  onComplete?: () => void;
} & Omit<
  ButtonProps,
  'type' | 'value' | 'defaultValue' | 'onSelect' | 'onBlur' | 'onKeyDown'
>;

export type PicklistState<ValueType> = {
  id: string;
  opened?: boolean;
  values: ValueType[];
};

export class Picklist<
  ValueType extends string | number,
  MultiSelect extends boolean | undefined
> extends Component<
  PicklistProps<ValueType, MultiSelect>,
  PicklistState<ValueType>
> {
  static isFormElement = true;

  node: HTMLDivElement | null = null;

  picklistButton: HTMLButtonElement | null = null;

  dropdown: HTMLDivElement | null = null;

  constructor(props: Readonly<PicklistProps<ValueType, MultiSelect>>) {
    super(props);

    const { value, defaultValue, opened, defaultOpened } = props;
    const initialValue = typeof value !== 'undefined' ? value : defaultValue;

    this.state = {
      id: `form-element-${uuid()}`,
      opened: typeof opened !== 'undefined' ? opened : defaultOpened,
      values:
        initialValue == null
          ? []
          : Array.isArray(initialValue)
          ? initialValue
          : ([initialValue] as ValueType[]),
    };
  }

  onClick = () => {
    this.setState((prevState) => ({ opened: !prevState.opened }));
    setTimeout(() => {
      this.focusToTargetItemEl();
    }, 10);
  };

  onPicklistItemSelect = (val: string | number) => {
    const value = val as ValueType;
    const { multiSelect = false } = this.props;
    this.updateItemValue(value);

    if (this.props.onSelect) {
      this.props.onSelect(value);
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

  onKeydown = (e: KeyboardEvent<HTMLButtonElement>) => {
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

  getValues(): ValueType[] {
    const { value } = this.props;
    // for controlled behavior, returning value from props
    if (typeof value !== 'undefined') {
      return value === null
        ? []
        : Array.isArray(value)
        ? value
        : ([value] as ValueType[]);
    }
    // for uncontrolled - value from state
    return this.state.values;
  }

  setValues(newValues: ValueType[]) {
    type PV = PicklistValueType<ValueType, MultiSelect>;

    const { multiSelect = false, onValueChange } = this.props;
    const prevValues = this.getValues();
    this.setState({ values: newValues });

    // this is for controlled behavior
    if (onValueChange && prevValues !== newValues) {
      if (multiSelect) {
        onValueChange(newValues as PV, prevValues as PV);
      } else {
        onValueChange(
          (newValues.length > 0 ? newValues[0] : null) as PV,
          (prevValues.length > 0 ? prevValues[0] : null) as PV
        );
      }
    }
  }

  getSelectedItemLabel() {
    const selectedValues = this.getValues();

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

  updateItemValue(itemValue: ValueType) {
    const { multiSelect = false } = this.props;

    if (multiSelect) {
      const newValues = this.getValues().slice();

      // toggle value
      if (newValues.indexOf(itemValue) === -1) {
        // add value to array
        newValues.push(itemValue);
      } else {
        // remove from array
        newValues.splice(newValues.indexOf(itemValue), 1);
      }
      this.setValues(newValues);
    } else {
      // set only one value
      this.setValues([itemValue]);
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

  renderPicklist(props: PicklistProps<ValueType, MultiSelect>) {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
      className,
      id,
      disabled,
      menuSize,
      menuStyle,
      value,
      defaultValue,
      opened,
      defaultOpened,
      selectedText,
      multiSelect,
      optionsSelectedText,
      onSelect,
      onValueChange,
      onComplete,
      ...rprops
    } = props;
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const picklistClassNames = classnames(
      className,
      'slds-picklist',
      'slds-dropdown-trigger'
    );
    const isOpened = typeof opened !== 'undefined' ? opened : this.state.opened;
    return (
      <div className={picklistClassNames} aria-expanded={isOpened}>
        <Button
          id={id}
          buttonRef={(node) => (this.picklistButton = node)}
          className='slds-picklist__label'
          type='neutral'
          disabled={disabled}
          onClick={disabled ? undefined : this.onClick}
          onBlur={disabled ? undefined : this.onBlur}
          onKeyDown={disabled ? undefined : this.onKeydown}
          {...rprops}
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

  renderDropdown(
    menuSize: PicklistProps<ValueType, MultiSelect>['menuSize'],
    menuStyle: PicklistProps<ValueType, MultiSelect>['menuStyle']
  ) {
    const { className, opened, children } = this.props;
    const isOpened = typeof opened !== 'undefined' ? opened : this.state.opened;
    return isOpened ? (
      <DropdownMenu
        portalClassName={classnames(className, 'slds-picklist')}
        dropdownMenuRef={(node: HTMLDivElement) => (this.dropdown = node)}
        size={menuSize}
        style={menuStyle}
        onMenuSelect={this.onPicklistItemSelect}
        onMenuClose={this.onPicklistClose}
        onBlur={this.onBlur}
      >
        {React.Children.map(children, this.renderPicklistItem)}
      </DropdownMenu>
    ) : (
      <div ref={(node) => (this.dropdown = node)} />
    );
  }

  renderPicklistItem = (item: any) => {
    const selected = this.getValues().indexOf(item.props.value) !== -1;
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

export type PicklistItemProps = DropdownMenuItemProps & {
  selected?: boolean;
  disabled?: boolean;
  value?: string | number;
};

export const PicklistItem: React.FC<PicklistItemProps> = ({
  label,
  selected,
  value,
  children,
  ...props
}) => (
  <DropdownMenuItem
    icon={selected ? 'check' : 'none'}
    role='menuitemradio'
    selected={selected}
    eventKey={value}
    {...props}
  >
    {label || children}
  </DropdownMenuItem>
);
