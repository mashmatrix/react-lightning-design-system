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
}>({
  values: [],
  onSelect: () => {
    // noop
  },
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

    // Get option values from children
    const getOptionValues = useCallback(() => {
      const optionValues: PicklistValue[] = [];
      React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) {
          return;
        }

        const props: unknown = child.props;
        const isPropsObject = typeof props === 'object' && props !== null;

        if (
          isPropsObject &&
          'value' in props &&
          (typeof props.value === 'string' || typeof props.value === 'number')
        ) {
          optionValues.push(props.value);
        }
      });
      return optionValues;
    }, [children]);

    // Get next option value for keyboard navigation
    const getNextValue = useCallback(
      (currentValue?: PicklistValue) => {
        const optionValues = getOptionValues();
        if (optionValues.length === 0) return undefined;

        if (!currentValue) return optionValues[0];

        const currentIndex = optionValues.indexOf(currentValue);
        return optionValues[currentIndex + 1] || optionValues[0]; // wrap around
      },
      [getOptionValues]
    );

    // Get previous option value for keyboard navigation
    const getPrevValue = useCallback(
      (currentValue?: PicklistValue) => {
        const optionValues = getOptionValues();
        if (optionValues.length === 0) return undefined;

        if (!currentValue) return optionValues[optionValues.length - 1];

        const currentIndex = optionValues.indexOf(currentValue);
        return (
          optionValues[currentIndex - 1] ||
          optionValues[optionValues.length - 1]
        ); // wrap around
      },
      [getOptionValues]
    );

    // Scroll focused element into view
    const scrollFocusedElementIntoView = useEventCallback(
      (nextFocusedValue: PicklistValue | undefined) => {
        if (!nextFocusedValue || !dropdownElRef.current) {
          return;
        }

        const dropdownContainer = dropdownElRef.current;
        const targetElement = dropdownContainer.querySelector(
          `#option-${nextFocusedValue}`
        );

        if (!(targetElement instanceof HTMLElement)) {
          return;
        }

        // Calculate element position within container
        const elementTopPosition = targetElement.offsetTop;
        const elementBottomPosition =
          elementTopPosition + targetElement.offsetHeight;

        // Calculate currently visible area
        const currentScrollPosition = dropdownContainer.scrollTop;
        const visibleAreaHeight = dropdownContainer.clientHeight;
        const visibleAreaTop = currentScrollPosition;
        const visibleAreaBottom = currentScrollPosition + visibleAreaHeight;

        // Check if element is outside the visible area
        const isAbove = elementTopPosition < visibleAreaTop;
        const isBelow = elementBottomPosition > visibleAreaBottom;

        // Scroll only if element is not currently visible
        if (isAbove || isBelow) {
          targetElement.scrollIntoView({
            block: 'center',
          });
        }
      }
    );

    // Set initial focus when dropdown opens
    useEffect(() => {
      if (opened && !focusedValue) {
        // Focus on first selected value or first option
        const initialFocus =
          values.length > 0 ? values[0] : getOptionValues()[0];
        setFocusedValue(initialFocus);
        scrollFocusedElementIntoView(initialFocus);
      } else if (!opened) {
        // Reset focus when dropdown closes
        setFocusedValue(undefined);
      }
    }, [
      opened,
      values,
      getOptionValues,
      focusedValue,
      scrollFocusedElementIntoView,
    ]);

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
                aria-labelledby={label ? id : undefined}
                aria-controls={listboxId}
                aria-expanded={opened}
                aria-haspopup='listbox'
                aria-disabled={disabled}
                aria-activedescendant={
                  focusedValue ? `option-${focusedValue}` : undefined
                }
                onClick={onClick}
                onKeyDown={onKeyDown}
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
}) => {
  const { values, multiSelect, onSelect, focusedValue } =
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
        id={value ? `option-${value}` : undefined}
        className={itemClassNames}
        role='option'
        aria-selected={selected}
        aria-checked={multiSelect ? selected : undefined}
        aria-disabled={disabled}
        onClick={onClick}
      >
        <span className='slds-media__figure slds-listbox__option-icon'>
          {selected && (
            <span className='slds-icon_container slds-icon-utility-check slds-current-color'>
              <Icon icon='check' className='slds-icon slds-icon_x-small' />
            </span>
          )}
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
