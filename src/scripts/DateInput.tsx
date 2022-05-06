import React, {
  KeyboardEvent,
  ChangeEvent,
  FocusEvent,
  ComponentType,
  Ref,
  FC,
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import classnames from 'classnames';
import moment from 'moment';
import { autoAlign, InjectedProps } from './AutoAlign';
import { Button } from './Button';
import { FormElement } from './FormElement';
import { Input, InputProps } from './Input';
import { Datepicker, DatepickerProps } from './Datepicker';
import { uuid, isElInChildren } from './util';
import { ComponentSettingsContext } from './ComponentSettings';
import mergeRefs from 'react-merge-refs';
import { useControlledValue } from './hooks';

/**
 *
 */
type DatepickerDropdownProps = {
  className?: string;
  dateValue?: string;
  minDate?: string;
  maxDate?: string;
  extensionRenderer?: ComponentType<DatepickerProps>;
  elementRef?: Ref<HTMLDivElement>;
  onSelect?: (date: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onClose?: () => void;
} & InjectedProps;

/**
 *
 */
const DatepickerDropdown: FC<DatepickerDropdownProps> = (props) => {
  const {
    className,
    alignment,
    dateValue,
    minDate,
    maxDate,
    extensionRenderer,
    elementRef,
    onSelect,
    onBlur,
    onClose,
  } = props;
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const [vertAlign, align] = alignment;
  const datepickerClassNames = classnames(
    className,
    'slds-dropdown',
    align ? `slds-dropdown_${align}` : undefined,
    vertAlign ? `slds-dropdown_${vertAlign}` : undefined
  );
  const mergedRef = useMemo(
    () => (elementRef ? mergeRefs([nodeRef, elementRef]) : nodeRef),
    [elementRef]
  );
  return (
    <Datepicker
      elementRef={mergedRef}
      className={datepickerClassNames}
      selectedDate={dateValue}
      autoFocus
      minDate={minDate}
      maxDate={maxDate}
      extensionRenderer={extensionRenderer}
      onSelect={onSelect}
      onBlur={onBlur}
      onClose={onClose}
    />
  );
};

/**
 *
 */
const DatepickerDropdownPortal = autoAlign({
  triggerSelector: '.slds-dropdown-trigger',
  alignmentStyle: 'menu',
})(DatepickerDropdown);

/**
 *
 */
export type DateInputProps = {
  value?: string | null;
  defaultValue?: string | null;
  opened?: boolean;
  defaultOpened?: boolean;
  dateFormat?: string;
  includeTime?: boolean;
  minDate?: string;
  maxDate?: string;
  menuAlign?: 'left' | 'right';
  onBlur?: () => void;
  onValueChange?: (value: string | null, prevValue: string | null) => void;
  onComplete?: () => void;
  extensionRenderer?: ComponentType<DatepickerProps>;
} & Omit<InputProps, 'value' | 'defaultValue' | 'onBlur' | 'onValueChange'>;

/**
 *
 */
export const DateInput: FC<DateInputProps> = (props) => {
  const {
    id: id_,
    opened: opened_,
    defaultOpened,
    value: value_,
    defaultValue,
    dateFormat,
    includeTime,
    className,
    cols,
    label,
    required,
    error,
    menuAlign,
    minDate,
    maxDate,
    extensionRenderer,
    onChange,
    onValueChange,
    onKeyDown,
    onBlur,
    onComplete,
    ...rprops
  } = props;

  const [id] = useControlledValue(id_, `date-input-${uuid()}`);
  const [opened, setOpened] = useControlledValue(
    opened_,
    defaultOpened ?? false
  );
  const [value, setValue] = useControlledValue(value_, defaultValue ?? null);
  const valueFormat = includeTime ? 'YYYY-MM-DDTHH:mm:ss.SSSZ' : 'YYYY-MM-DD';
  const inputValueFormat = dateFormat || (includeTime ? 'L HH:mm' : 'L');
  const mvalue = moment(value ?? undefined, valueFormat);
  const [inputValue_, setInputValue] = useState<string | null>(null);
  const inputValue =
    inputValue_ != null
      ? inputValue_
      : value != null && mvalue.isValid()
      ? mvalue.format(inputValueFormat)
      : '';

  const nodeRef = useRef<HTMLDivElement | null>(null);
  const datepickerElRef = useRef<HTMLDivElement | null>(null);
  const inputElRef = useRef<HTMLInputElement | null>(null);

  const { getActiveElement } = useContext(ComponentSettingsContext);

  const setValueFromInput = useCallback(
    (inputValue: string) => {
      let newValue = value;
      if (!inputValue) {
        newValue = '';
      } else {
        const mvalue = moment(inputValue, inputValueFormat);
        if (mvalue.isValid()) {
          newValue = mvalue.format(valueFormat);
        } else {
          newValue = '';
        }
      }
      setValue(newValue);
      setInputValue(null);
    },
    [value, valueFormat, inputValueFormat, setValue, setInputValue]
  );

  const isFocusedInComponent = useCallback(() => {
    const targetEl = getActiveElement();
    return (
      isElInChildren(nodeRef.current, targetEl) ||
      isElInChildren(datepickerElRef.current, targetEl)
    );
  }, [getActiveElement]);

  const showDatepicker = useCallback(() => {
    let newValue = value;
    if (inputValue != null) {
      const mvalue = moment(inputValue, inputValueFormat);
      if (mvalue.isValid()) {
        newValue = mvalue.format(valueFormat);
      }
    }
    setOpened(true);
    setValue(newValue);
  }, [value, inputValue, inputValueFormat, valueFormat, setOpened, setValue]);

  const prevValueRef = useRef<typeof value>(value);
  useEffect(() => {
    onValueChange?.(value, prevValueRef.current);
    prevValueRef.current = value;
  }, [value, onValueChange]);

  const onDateIconClick = useCallback(() => {
    inputElRef.current?.focus();
    setTimeout(() => {
      showDatepicker();
    }, 10);
  }, [showDatepicker]);

  const onInputKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) {
        // return key
        e.preventDefault();
        e.stopPropagation();
        if (e.currentTarget.value !== undefined) {
          setValueFromInput(e.currentTarget.value);
        }
        if (onComplete) {
          setTimeout(() => {
            onComplete?.();
          }, 10);
        }
      } else if (e.keyCode === 40) {
        // down key
        showDatepicker();
        e.preventDefault();
        e.stopPropagation();
      }
      onKeyDown?.(e);
    },
    [setValueFromInput, showDatepicker, onComplete, onKeyDown]
  );

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setInputValue(inputValue);
      onChange?.(e);
    },
    [onChange]
  );

  const onInputBlur = useCallback(
    (e: FocusEvent<HTMLInputElement | HTMLButtonElement>) => {
      if (e.target.tagName.toLowerCase() === 'input') {
        setValueFromInput(e.target.value);
      }
      setTimeout(() => {
        if (!isFocusedInComponent()) {
          onBlur?.();
          onComplete?.();
        }
      }, 10);
    },
    [setValueFromInput, isFocusedInComponent, onBlur, onComplete]
  );

  const onDatepickerSelect = useCallback(
    (dvalue: string) => {
      const value = moment(dvalue).format(valueFormat);
      setValue(value);
      setInputValue(null);
      setTimeout(() => {
        setOpened(false);
        const inputEl = inputElRef.current;
        if (inputEl) {
          inputEl.focus();
          inputEl.select();
        }
        onComplete?.();
      }, 200);
    },
    [valueFormat, setValue, setOpened, onComplete]
  );

  const onDatepickerBlur = useCallback(() => {
    setOpened(false);
    setTimeout(() => {
      if (!isFocusedInComponent()) {
        onBlur?.();
        onComplete?.();
      }
    }, 500);
  }, [setOpened, isFocusedInComponent, onBlur, onComplete]);

  const onDatepickerClose = useCallback(() => {
    setOpened(false);
    const inputEl = inputElRef.current;
    if (inputEl) {
      inputEl.focus();
      inputEl.select();
    }
  }, [setOpened]);

  const formElemProps = { id, cols, label, required, error };
  return (
    <FormElement formElementRef={nodeRef} {...formElemProps}>
      <div className={classnames(className, 'slds-dropdown-trigger')}>
        <div className='slds-input-has-icon slds-input-has-icon_right'>
          <Input
            inputRef={inputElRef}
            {...rprops}
            id={id}
            value={inputValue}
            onKeyDown={onInputKeyDown}
            onChange={onInputChange}
            onBlur={onInputBlur}
          />
          <Button
            type='icon'
            icon='event'
            disabled={props.disabled}
            className='slds-input__icon slds-input__icon_right'
            tabIndex={-1}
            onClick={props.disabled ? undefined : onDateIconClick}
            onBlur={onInputBlur}
          />
        </div>
        {opened ? (
          <DatepickerDropdownPortal
            portalClassName={className}
            elementRef={datepickerElRef}
            dateValue={
              mvalue.isValid() ? mvalue.format('YYYY-MM-DD') : undefined
            }
            minDate={minDate}
            maxDate={maxDate}
            align={menuAlign}
            extensionRenderer={extensionRenderer}
            onBlur={onDatepickerBlur}
            onSelect={onDatepickerSelect}
            onClose={onDatepickerClose}
          />
        ) : undefined}
      </div>
    </FormElement>
  );
};

(DateInput as unknown as { isFormElement?: boolean }).isFormElement = true;
