import React, {
  FC,
  CSSProperties,
  createContext,
  useContext,
  useRef,
  Ref,
  ReactNode,
  useId,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import classnames from 'classnames';
import { FormElement, FormElementProps } from './FormElement';
import { Icon } from './Icon';
import { DropdownMenuProps } from './DropdownMenu';
import { isElInChildren } from './util';
import { ComponentSettingsContext } from './ComponentSettings';
import { useControlledValue, useEventCallback, useMergeRefs } from './hooks';
import { createFC } from './common';
import { Bivariant } from './typeUtils';

/**
 * Recursively collect option values from PicklistItem components
 */
function collectOptionValues(children: unknown): PicklistValue[] {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return [];
    }

    const props = child.props;
    const isPropsObject = typeof props === 'object' && props !== null;

    if (!isPropsObject) {
      return [];
    }

    // Recursively check children for nested PicklistItems
    if (child.type !== PicklistItem) {
      return !('children' in props) ? [] : collectOptionValues(props.children);
    }

    // Check if this is specifically a PicklistItem component
    if (
      !('value' in props) ||
      (typeof props.value !== 'string' && typeof props.value !== 'number')
    ) {
      return [];
    }

    // Skip disabled items
    if ('disabled' in props && props.disabled === true) {
      return [];
    }

    return [props.value];
  }).flat();
}

/**
 * Recursively find selected item label from PicklistItem components
 */
function findSelectedItemLabel(
  children: unknown,
  selectedValue: PicklistValue
): React.ReactNode | null {
  return (
    React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return null;
      }

      const props = child.props;
      const isPropsObject = typeof props === 'object' && props !== null;

      if (!isPropsObject) {
        return null;
      }

      // Recursively check children for nested PicklistItems
      if (child.type !== PicklistItem) {
        return !('children' in props)
          ? null
          : findSelectedItemLabel(props.children, selectedValue);
      }

      // Check if this is specifically a PicklistItem component
      if (!('value' in props) || props.value !== selectedValue) {
        return null;
      }

      // Skip disabled items
      if ('disabled' in props && props.disabled === true) {
        return null;
      }

      // Safely access label and children properties with proper type checking
      const label = 'label' in props ? props.label : undefined;
      const itemChildren = 'children' in props ? props.children : undefined;

      // Simple type check for React.ReactNode values
      const labelValue =
        typeof label === 'string' ||
        typeof label === 'number' ||
        React.isValidElement(label)
          ? label
          : undefined;
      const childrenValue =
        typeof itemChildren === 'string' ||
        typeof itemChildren === 'number' ||
        React.isValidElement(itemChildren) ||
        Array.isArray(itemChildren)
          ? itemChildren
          : undefined;

      return labelValue || childrenValue;
    }).find((result) => result !== null) ?? null
  );
}

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
  buttonRef?: Ref<HTMLDivElement>;
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
      buttonRef: buttonRef_,
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
    const [focusedValue, setFocusedValue] = useState<
      PicklistValue | undefined
    >();

    const { getActiveElement } = useContext(ComponentSettingsContext);

    // Memoized option values - recursively collected from PicklistItem components (excluding disabled items)
    const optionValues = useMemo(() => {
      return collectOptionValues(children);
    }, [children]);

    // Get next option value for keyboard navigation
    const getNextValue = useCallback(
      (currentValue?: PicklistValue) => {
        if (optionValues.length === 0) return undefined;

        if (!currentValue) return optionValues[0];

        const currentIndex = optionValues.indexOf(currentValue);
        return optionValues[
          Math.min(currentIndex + 1, optionValues.length - 1)
        ]; // not wrap around
      },
      [optionValues]
    );

    // Get previous option value for keyboard navigation
    const getPrevValue = useCallback(
      (currentValue?: PicklistValue) => {
        if (optionValues.length === 0) return undefined;

        if (!currentValue) return optionValues[optionValues.length - 1];

        const currentIndex = optionValues.indexOf(currentValue);
        return optionValues[Math.max(currentIndex - 1, 0)]; // not wrap around
      },
      [optionValues]
    );

    // Scroll focused element into view
    const scrollFocusedElementIntoView = useEventCallback(
      (nextFocusedValue: PicklistValue | undefined) => {
        if (!nextFocusedValue || !dropdownElRef.current) {
          return;
        }

        const dropdownContainer = dropdownElRef.current;
        const targetElement = dropdownContainer.querySelector(
          `#${CSS.escape(optionIdPrefix)}-${nextFocusedValue}`
        );

        if (!(targetElement instanceof HTMLElement)) {
          return;
        }

        targetElement.focus();
      }
    );

    // Set initial focus when dropdown opens
    useEffect(() => {
      if (opened && !focusedValue) {
        // Focus on first selected value or first option
        const initialFocus = values.length > 0 ? values[0] : optionValues[0];
        setFocusedValue(initialFocus);
        scrollFocusedElementIntoView(initialFocus);
      } else if (!opened) {
        // Reset focus when dropdown closes
        setFocusedValue(undefined);
      }
    }, [
      opened,
      values,
      optionValues,
      focusedValue,
      scrollFocusedElementIntoView,
    ]);

    const elRef = useRef<HTMLDivElement | null>(null);
    const elementRef = useMergeRefs([elRef, elementRef_]);
    const comboboxElRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useMergeRefs([comboboxElRef, buttonRef_]);
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

    const onKeyDown = useEventCallback((e: React.KeyboardEvent) => {
      if (e.keyCode === 40) {
        // down
        e.preventDefault();
        e.stopPropagation();
        if (!opened) {
          setOpened(true);
        } else {
          // Navigate to next option
          const nextValue = getNextValue(focusedValue);
          setFocusedValue(nextValue);
          scrollFocusedElementIntoView(nextValue);
        }
      } else if (e.keyCode === 38) {
        // up
        e.preventDefault();
        e.stopPropagation();
        if (!opened) {
          setOpened(true);
        } else {
          // Navigate to previous option
          const prevValue = getPrevValue(focusedValue);
          setFocusedValue(prevValue);
          scrollFocusedElementIntoView(prevValue);
        }
      } else if (e.keyCode === 9) {
        // Tab or Shift+Tab
        if (opened) {
          e.preventDefault();
          e.stopPropagation();
          const currentIndex = focusedValue
            ? optionValues.indexOf(focusedValue)
            : -1;

          if (e.shiftKey) {
            // Shift+Tab - Navigate to previous option or close if at first
            if (currentIndex <= 0) {
              // At first option or no focus, close the picklist
              setOpened(false);
              onComplete?.();
            } else {
              const prevValue = getPrevValue(focusedValue);
              setFocusedValue(prevValue);
              scrollFocusedElementIntoView(prevValue);
            }
          } else {
            // Tab - Navigate to next option or close if at last
            if (currentIndex >= optionValues.length - 1) {
              // At last option, close the picklist
              setOpened(false);
              onComplete?.();
            } else {
              const nextValue = getNextValue(focusedValue);
              setFocusedValue(nextValue);
              scrollFocusedElementIntoView(nextValue);
            }
          }
        }
      } else if (e.keyCode === 27) {
        // ESC
        e.preventDefault();
        e.stopPropagation();
        setOpened(false);
        onComplete?.();
      } else if (e.keyCode === 13 || e.keyCode === 32) {
        // Enter or Space
        e.preventDefault();
        e.stopPropagation();
        if (opened && focusedValue != null) {
          // Select focused option
          onPicklistItemSelect(focusedValue);
        } else {
          setOpened((opened) => !opened);
        }
      }
      onKeyDown_?.(e);
    });

    // Memoized selected item label - displays count for multiple selections, label for single selection, or placeholder text
    const selectedItemLabel = useMemo(() => {
      // many items selected
      if (values.length > 1) {
        return `${values.length} ${optionsSelectedText}`;
      }

      // one item
      if (values.length === 1) {
        const selectedValue = values[0];
        const selected = findSelectedItemLabel(children, selectedValue);
        return selected || selectedValue;
      }

      // zero items
      return selectedText;
    }, [values, optionsSelectedText, selectedText, children]);

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
    const dropdownClassNames = classnames(
      'slds-dropdown',
      'slds-dropdown_length-5',
      menuSize ? `slds-dropdown_${menuSize}` : 'slds-dropdown_fluid'
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
      focusedValue,
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
                ref={buttonRef}
                role='combobox'
                tabIndex={disabled ? -1 : 0}
                className={inputClassNames}
                aria-controls={listboxId}
                aria-expanded={opened}
                aria-haspopup='listbox'
                aria-disabled={disabled}
                aria-activedescendant={
                  focusedValue ? `${optionIdPrefix}-${focusedValue}` : undefined
                }
                onClick={onClick}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                {...rprops}
              >
                <span className='slds-truncate'>{selectedItemLabel}</span>
              </div>
              <Icon
                containerClassName='slds-input__icon slds-input__icon_right'
                category='utility'
                icon='down'
                size='x-small'
                textColor='default'
              />
            </div>
            {opened && (
              <div
                id={listboxId}
                className={dropdownClassNames}
                role='listbox'
                aria-label='Options'
                tabIndex={0}
                aria-busy={false}
                ref={dropdownRef}
                style={{ ...menuStyle, left: 0, transform: 'translate(0)' }}
              >
                <ul
                  className='slds-listbox slds-listbox_vertical'
                  role='presentation'
                  onKeyDown={onKeyDown}
                  onBlur={onBlur}
                >
                  <PicklistContext.Provider value={contextValue}>
                    {children}
                  </PicklistContext.Provider>
                </ul>
              </div>
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
  icon?: string;
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
  icon,
  children,
}) => {
  const { values, multiSelect, onSelect, focusedValue, optionIdPrefix } =
    useContext(PicklistContext);
  const selected =
    selected_ ?? (value != null ? values.indexOf(value) >= 0 : false);
  const isFocused = focusedValue === value;

  const onClick = useEventCallback(() => {
    if (!disabled && value != null) {
      onSelect(value);
    }
  });

  const itemClassNames = classnames(
    'slds-media',
    'slds-listbox__option',
    'slds-listbox__option_plain',
    'slds-media_small',
    {
      'slds-is-selected': selected,
      'slds-has-focus': isFocused,
    }
  );

  return (
    <li role='presentation' className='slds-listbox__item'>
      <div
        id={value ? `${optionIdPrefix}-${value}` : undefined}
        className={itemClassNames}
        role='option'
        aria-selected={selected}
        aria-checked={multiSelect ? selected : undefined}
        aria-disabled={disabled}
        tabIndex={disabled ? undefined : 0}
        onClick={onClick}
      >
        <span className='slds-media__figure slds-listbox__option-icon'>
          {icon ? (
            <Icon
              category='utility'
              icon={icon}
              size='x-small'
              textColor='currentColor'
            />
          ) : selected ? (
            <Icon
              category='utility'
              icon='check'
              size='x-small'
              textColor='currentColor'
            />
          ) : null}
        </span>
        <span className='slds-media__body'>
          <span className='slds-truncate' title={String(label || children)}>
            {label || children}
          </span>
        </span>
      </div>
    </li>
  );
};
