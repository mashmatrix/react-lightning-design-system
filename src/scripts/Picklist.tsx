import React, {
  FC,
  CSSProperties,
  createContext,
  useContext,
  useRef,
  Ref,
  ReactNode,
  useId,
} from 'react';
import classnames from 'classnames';
import { FormElement, FormElementProps } from './FormElement';
import { Icon } from './Icon';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuProps,
} from './DropdownMenu';
import { isElInChildren } from './util';
import { ComponentSettingsContext } from './ComponentSettings';
import { useControlledValue, useEventCallback, useMergeRefs } from './hooks';
import { createFC } from './common';
import { Bivariant } from './typeUtils';

/**
 *
 */
type PicklistValue = string | number;

type PicklistValueType<Multi extends boolean | undefined> = Multi extends true
  ? Array<PicklistValue>
  : Multi extends false | undefined
  ? PicklistValue | null
  : Array<PicklistValue> | string | number | null;

/**
 *
 */
const PicklistContext = createContext<{
  values: PicklistValue[];
  multiSelect?: boolean;
  onSelect: (value: PicklistValue) => void;
  focusedValue?: PicklistValue;
  optionIdPrefix: string;
}>({
  values: [],
  onSelect: () => {
    // noop
  },
  optionIdPrefix: '',
});

/**
 *
 */
export type PicklistProps<MultiSelect extends boolean | undefined> = {
  id?: string;
  className?: string;
  label?: string;
  required?: boolean;
  multiSelect?: MultiSelect;
  error?: FormElementProps['error'];
  cols?: number;
  name?: string;
  value?: PicklistValueType<MultiSelect>;
  defaultValue?: PicklistValueType<MultiSelect>;
  selectedText?: string;
  optionsSelectedText?: string;
  opened?: boolean;
  defaultOpened?: boolean;
  disabled?: boolean;
  menuSize?: DropdownMenuProps['size'];
  menuStyle?: CSSProperties;
  tooltip?: ReactNode;
  tooltipIcon?: string;
  elementRef?: Ref<HTMLDivElement>;
  dropdownRef?: Ref<HTMLDivElement>;
  onValueChange?: Bivariant<
    (
      newValue: PicklistValueType<MultiSelect>,
      prevValue: PicklistValueType<MultiSelect>
    ) => void
  >;
  onSelect?: Bivariant<(value: PicklistValue) => void>;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onBlur?: () => void;
  onComplete?: () => void;
  children?: React.ReactNode;
};

/**
 *
 */
export const Picklist: (<MultiSelect extends boolean | undefined>(
  props: PicklistProps<MultiSelect>
) => ReturnType<FC>) & { isFormElement: boolean } = createFC(
  (props) => {
    const {
      id: id_,
      className,
      value: value_,
      defaultValue,
      opened: opened_,
      defaultOpened,
      multiSelect,
      selectedText = '',
      optionsSelectedText = '',
      menuSize,
      menuStyle,
      disabled,
      label,
      required,
      error,
      cols,
      tooltip,
      tooltipIcon,
      elementRef: elementRef_,
      dropdownRef: dropdownRef_,
      onSelect,
      onComplete,
      onValueChange,
      onBlur: onBlur_,
      onKeyDown: onKeyDown_,
      children,
      ...rprops
    } = props;

    const fallbackId = useId();
    const id = id_ ?? fallbackId;
    const listboxId = `${id}-listbox`;

    const optionIdPrefix = `${useId()}-option`;

    const values_: PicklistValue[] | undefined =
      typeof value_ === 'undefined'
        ? undefined
        : value_ == null
        ? []
        : Array.isArray(value_)
        ? value_
        : [value_];
    const defaultValues: PicklistValue[] | undefined =
      typeof defaultValue === 'undefined'
        ? undefined
        : defaultValue == null
        ? []
        : Array.isArray(defaultValue)
        ? defaultValue
        : [defaultValue];

    const [values, setValues] = useControlledValue(
      values_,
      defaultValues ?? []
    );
    const [opened, setOpened] = useControlledValue(
      opened_,
      defaultOpened ?? false
    );
    const { getActiveElement } = useContext(ComponentSettingsContext);

    const elRef = useRef<HTMLDivElement | null>(null);
    const elementRef = useMergeRefs([elRef, elementRef_]);
    const comboboxElRef = useRef<HTMLDivElement | null>(null);
    const dropdownElRef = useRef<HTMLDivElement | null>(null);
    const dropdownRef = useMergeRefs([dropdownElRef, dropdownRef_]);

    const setPicklistValues = useEventCallback((newValues: PicklistValue[]) => {
      const prevValues = values;
      setValues(newValues);
      if (onValueChange && prevValues !== newValues) {
        if (multiSelect) {
          onValueChange(newValues, prevValues);
        } else {
          onValueChange(
            newValues.length > 0 ? newValues[0] : null,
            prevValues.length > 0 ? prevValues[0] : null
          );
        }
      }
    });

    const updateItemValue = useEventCallback((itemValue: PicklistValue) => {
      if (multiSelect) {
        const newValues = [...values];
        // toggle value
        if (newValues.indexOf(itemValue) === -1) {
          // add value to array
          newValues.push(itemValue);
        } else {
          // remove from array
          newValues.splice(newValues.indexOf(itemValue), 1);
        }
        setPicklistValues(newValues);
      } else {
        // set only one value
        setPicklistValues([itemValue]);
        setOpened(false);
        setTimeout(() => {
          comboboxElRef.current?.focus();
          onComplete?.();
        }, 10);
      }
    });

    const isFocusedInComponent = useEventCallback(() => {
      const targetEl = getActiveElement();
      return (
        isElInChildren(elRef.current, targetEl) ||
        isElInChildren(dropdownElRef.current, targetEl)
      );
    });

    const focusToTargetItemEl = useEventCallback(() => {
      const dropdownEl = dropdownElRef.current;
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
    });

    const onClick = useEventCallback(() => {
      if (!disabled) {
        setOpened((opened) => !opened);
      }
    });

    const onPicklistItemSelect = useEventCallback((value: PicklistValue) => {
      updateItemValue(value);
      onSelect?.(value);
    });

    const onBlur = useEventCallback(() => {
      setTimeout(() => {
        if (!isFocusedInComponent()) {
          setOpened(false);
          onBlur_?.();
          onComplete?.();
        }
      }, 10);
    });

    const onKeydown = useEventCallback((e: React.KeyboardEvent) => {
      if (e.keyCode === 40) {
        // down
        e.preventDefault();
        e.stopPropagation();
        if (!opened) {
          setOpened(true);
          setTimeout(() => {
            focusToTargetItemEl();
          }, 10);
        } else {
          focusToTargetItemEl();
        }
      } else if (e.keyCode === 27) {
        // ESC
        e.preventDefault();
        e.stopPropagation();
        setOpened(false);
        onComplete?.();
      }
      onKeyDown_?.(e);
    });

    function getSelectedItemLabel() {
      // many items selected
      if (values.length > 1) {
        return `${values.length} ${optionsSelectedText}`;
      }

      // one item
      if (values.length === 1) {
        const selectedValue = values[0];
        let selected = null;
        React.Children.forEach(children, (item) => {
          if (React.isValidElement(item)) {
            const { label, value, children } = item.props as PicklistItemProps;
            if (value === selectedValue) {
              selected = label || children;
            }
          }
        });
        return selected || selectedValue;
      }

      // zero items
      return selectedText;
    }

    const hasValue = values.length > 0;
    const containerClassNames = classnames(
      className,
      'slds-combobox_container',
      'slds-size_small'
    );
    const comboboxClassNames = classnames(
      'slds-combobox',
      'slds-dropdown-trigger',
      'slds-dropdown-trigger_click',
      {
        'slds-is-open': opened,
      }
    );
    const inputClassNames = classnames(
      'slds-input_faux',
      'slds-combobox__input',
      {
        'slds-has-focus': opened && !disabled,
        'slds-combobox__input-value': hasValue,
        'slds-is-disabled': disabled,
      }
    );

    const formElemProps = {
      id,
      label,
      required,
      error,
      cols,
      tooltip,
      tooltipIcon,
      elementRef,
    };

    const contextValue = {
      values,
      multiSelect,
      onSelect: onPicklistItemSelect,
      optionIdPrefix,
    };

    return (
      <FormElement {...formElemProps}>
        <div className={containerClassNames}>
          <div className={comboboxClassNames} ref={elementRef}>
            <div
              className='slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right'
              role='none'
            >
              <div
                ref={comboboxElRef}
                role='combobox'
                tabIndex={disabled ? -1 : 0}
                className={inputClassNames}
                aria-controls={listboxId}
                aria-expanded={opened}
                aria-haspopup='listbox'
                aria-disabled={disabled}
                onClick={onClick}
                onKeyDown={onKeydown}
                onBlur={onBlur}
                {...rprops}
              >
                <span className='slds-truncate'>{getSelectedItemLabel()}</span>
              </div>
              <span className='slds-icon_container slds-icon-utility-down slds-input__icon slds-input__icon_right'>
                <Icon
                  icon='down'
                  className='slds-icon slds-icon_x-small slds-icon-text-default'
                />
              </span>
            </div>
            {opened && (
              <DropdownMenu
                portalClassName={classnames(className, 'slds-picklist')}
                elementRef={dropdownRef}
                size={menuSize}
                style={menuStyle}
                onMenuSelect={onPicklistItemSelect}
                onMenuClose={() => {
                  setOpened(false);
                  onComplete?.();
                }}
                onBlur={onBlur}
              >
                <PicklistContext.Provider value={contextValue}>
                  {children}
                </PicklistContext.Provider>
              </DropdownMenu>
            )}
          </div>
        </div>
      </FormElement>
    );
  },
  { isFormElement: true }
);

/**
 *
 */
export type PicklistItemProps = {
  label?: React.ReactNode;
  value?: string | number;
  selected?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
};

/**
 *
 */
export const PicklistItem: FC<PicklistItemProps> = ({
  label,
  selected: selected_,
  value,
  disabled,
  children,
  ...props
}) => {
  const { values } = useContext(PicklistContext);
  const selected =
    selected_ ?? (value != null ? values.indexOf(value) >= 0 : false);

  return (
    <DropdownMenuItem
      icon={selected ? 'check' : 'none'}
      role='option'
      selected={selected}
      disabled={disabled}
      eventKey={value}
      {...props}
    >
      {label || children}
    </DropdownMenuItem>
  );
};
