import React, {
  FC,
  CSSProperties,
  createContext,
  useContext,
  useRef,
  Ref,
  ReactNode,
} from 'react';
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
const PicklistValuesContext = createContext<PicklistValue[]>([]);

/**
 *
 */
export type PicklistProps<MultiSelect extends boolean | undefined> = {
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
} & Omit<
  ButtonProps,
  'type' | 'value' | 'defaultValue' | 'onSelect' | 'onBlur' | 'onKeyDown'
>;

/**
 *
 */
export const Picklist: (<MultiSelect extends boolean | undefined>(
  props: PicklistProps<MultiSelect>
) => ReturnType<FC>) & { isFormElement: boolean } = createFC(
  (props) => {
    const {
      className,
      id,
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
    const buttonElRef = useRef<HTMLButtonElement | null>(null);
    const buttonRef = useMergeRefs([buttonElRef, buttonRef_]);
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
      setOpened((opened) => !opened);
      setTimeout(() => {
        focusToTargetItemEl();
      }, 10);
    });

    const onPicklistItemSelect = useEventCallback((value: PicklistValue) => {
      updateItemValue(value);
      onSelect?.(value);
      if (!multiSelect) {
        // close if only single select
        setTimeout(() => {
          setOpened(false);
          onComplete?.();
          buttonElRef.current?.focus();
        }, 200);
      }
    });

    const onPicklistClose = useEventCallback(() => {
      buttonElRef.current?.focus();
      setOpened(false);
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
        return optionsSelectedText;
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

    const picklistClassNames = classnames(
      className,
      'slds-picklist',
      'slds-dropdown-trigger'
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
    return (
      <FormElement {...formElemProps}>
        <div className={picklistClassNames} aria-expanded={opened}>
          <Button
            id={id}
            buttonRef={buttonRef}
            {...rprops}
            className='slds-picklist__label'
            style={{ justifyContent: 'normal' }}
            type='neutral'
            disabled={disabled}
            onClick={disabled ? undefined : onClick}
            onBlur={disabled ? undefined : onBlur}
            onKeyDown={disabled ? undefined : onKeydown}
          >
            <span className='slds-truncate'>
              {getSelectedItemLabel() || <span>&nbsp;</span>}
            </span>
            <Icon icon='down' />
          </Button>
          {opened ? (
            <DropdownMenu
              portalClassName={classnames(className, 'slds-picklist')}
              elementRef={dropdownRef}
              size={menuSize}
              style={menuStyle}
              onMenuSelect={onPicklistItemSelect}
              onMenuClose={onPicklistClose}
              onBlur={onBlur}
            >
              <PicklistValuesContext.Provider value={values}>
                {children}
              </PicklistValuesContext.Provider>
            </DropdownMenu>
          ) : (
            <div ref={dropdownElRef} />
          )}
        </div>
      </FormElement>
    );
  },
  { isFormElement: true }
);

/**
 *
 */
export type PicklistItemProps = DropdownMenuItemProps & {
  value?: string | number;
};

/**
 *
 */
export const PicklistItem: FC<PicklistItemProps> = ({
  label,
  selected: selected_,
  value,
  children,
  ...props
}) => {
  const values = useContext(PicklistValuesContext);
  const selected =
    selected_ ?? (value != null ? values.indexOf(value) >= 0 : false);
  return (
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
};
