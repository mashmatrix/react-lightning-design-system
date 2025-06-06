import React, {
  KeyboardEvent,
  ChangeEvent,
  FocusEvent,
  ComponentType,
  Ref,
  FC,
  useRef,
  useState,
  useContext,
  ReactNode,
} from 'react';
import classnames from 'classnames';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Button } from './Button';
import { FormElement } from './FormElement';
import { Input, InputProps } from './Input';
import { Datepicker, DatepickerProps } from './Datepicker';
import { ComponentSettingsContext } from './ComponentSettings';
import { AutoAlign, AutoAlignInjectedProps, AutoAlignProps } from './AutoAlign';
import { isElInChildren } from './util';
import { useControlledValue, useEventCallback, useMergeRefs } from './hooks';
import { createFC } from './common';

/**
 *
 */
dayjs.extend(localizedFormat);

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
};

/**
 *
 */
const DatepickerDropdownInner: FC<
  DatepickerDropdownProps & AutoAlignInjectedProps
> = (props) => {
  const {
    className,
    alignment,
    dateValue,
    minDate,
    maxDate,
    extensionRenderer,
    elementRef: elementRef_,
    autoAlignContentRef,
    onSelect,
    onBlur,
    onClose,
  } = props;
  const elRef = useRef<HTMLDivElement | null>(null);
  const elementRef = useMergeRefs([elRef, autoAlignContentRef, elementRef_]);
  const [vertAlign, align] = alignment;
  const datepickerClassNames = classnames(
    className,
    'slds-dropdown',
    align ? `slds-dropdown_${align}` : undefined,
    vertAlign ? `slds-dropdown_${vertAlign}` : undefined
  );
  return (
    <Datepicker
      elementRef={elementRef}
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
const DatepickerDropdown: FC<
  DatepickerDropdownProps & Pick<AutoAlignProps, 'portalClassName' | 'align'>
> = ({ portalClassName, align, ...props }) => (
  <AutoAlign
    triggerSelector='.slds-dropdown-trigger'
    alignmentStyle='menu'
    portalClassName={portalClassName}
    align={align}
  >
    {(injectedProps) => (
      <DatepickerDropdownInner {...props} {...injectedProps} />
    )}
  </AutoAlign>
);

/**
 *
 */
export type DateInputProps = {
  value?: string | null;
  defaultValue?: string | null;
  opened?: boolean;
  defaultOpened?: boolean;
  dateFormat?: string;
  parsingFormats?: string[];
  includeTime?: boolean;
  minDate?: string;
  maxDate?: string;
  menuAlign?: 'left' | 'right';
  tooltip?: ReactNode;
  tooltipIcon?: string;
  elementRef?: Ref<HTMLDivElement>;
  datepickerRef?: Ref<HTMLDivElement>;
  onBlur?: () => void;
  onValueChange?: (value: string | null, prevValue: string | null) => void;
  onComplete?: () => void;
  extensionRenderer?: ComponentType<DatepickerProps>;
} & Omit<InputProps, 'value' | 'defaultValue' | 'onBlur' | 'onValueChange'>;

/**
 *
 */
export const DateInput = createFC<DateInputProps, { isFormElement: boolean }>(
  (props) => {
    const {
      id,
      opened: opened_,
      defaultOpened,
      value: value_,
      defaultValue,
      dateFormat,
      parsingFormats: parsingFormats_,
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
      tooltip,
      tooltipIcon,
      elementRef: elementRef_,
      inputRef: inputRef_,
      datepickerRef: datepickerRef_,
      onChange,
      onValueChange,
      onKeyDown,
      onBlur,
      onComplete,
      ...rprops
    } = props;

    const [opened, setOpened] = useControlledValue(
      opened_,
      defaultOpened ?? false
    );
    const [value, setValue] = useControlledValue(value_, defaultValue ?? null);
    const valueFormat = includeTime ? 'YYYY-MM-DDTHH:mm:ss.SSSZ' : 'YYYY-MM-DD';
    const inputValueFormat = dateFormat || (includeTime ? 'L HH:mm' : 'L');
    const parsingFormats = parsingFormats_ ?? [inputValueFormat];
    const dvalue = dayjs(value ?? undefined, valueFormat);
    const [inputValue_, setInputValue] = useState<string | null>(null);
    const inputValue =
      inputValue_ != null
        ? inputValue_
        : value != null && dvalue.isValid()
        ? dvalue.format(inputValueFormat)
        : '';

    const elRef = useRef<HTMLDivElement | null>(null);
    const elementRef = useMergeRefs([elRef, elementRef_]);
    const inputElRef = useRef<HTMLInputElement | null>(null);
    const inputRef = useMergeRefs([inputElRef, inputRef_]);
    const datepickerElRef = useRef<HTMLDivElement | null>(null);
    const datepickerRef = useMergeRefs([datepickerElRef, datepickerRef_]);

    const { getActiveElement } = useContext(ComponentSettingsContext);

    const onChangeValue = useEventCallback((newValue: string | null) => {
      if (newValue !== value) {
        onValueChange?.(newValue, value);
        setValue(newValue);
      }
    });

    const setValueFromInput = useEventCallback((inputValue: string) => {
      let newValue = value;
      if (!inputValue) {
        newValue = '';
      } else {
        const dvalue = dayjs(inputValue, parsingFormats);
        if (dvalue.isValid()) {
          newValue = dvalue.format(valueFormat);
        } else {
          newValue = '';
        }
      }
      onChangeValue(newValue);
      setInputValue(null);
    });

    const isFocusedInComponent = useEventCallback(() => {
      const targetEl = getActiveElement();
      return (
        isElInChildren(elRef.current, targetEl) ||
        isElInChildren(datepickerElRef.current, targetEl)
      );
    });

    const showDatepicker = useEventCallback(() => {
      let newValue = value;
      if (inputValue != null) {
        const dvalue = dayjs(inputValue, parsingFormats);
        if (dvalue.isValid()) {
          newValue = dvalue.format(valueFormat);
        }
      }
      setOpened(true);
      onChangeValue(newValue);
    });

    const onDateIconClick = useEventCallback(() => {
      inputElRef.current?.focus();
      setTimeout(() => {
        showDatepicker();
      }, 10);
    });

    const onInputKeyDown = useEventCallback(
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
      }
    );

    const onInputChange = useEventCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setInputValue(inputValue);
        onChange?.(e);
      }
    );

    const onInputBlur = useEventCallback(
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
      }
    );

    const onDatepickerSelect = useEventCallback((dvalue: string) => {
      const value = dayjs(dvalue).format(valueFormat);
      onChangeValue(value);
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
    });

    const onDatepickerBlur = useEventCallback(() => {
      setOpened(false);
      setTimeout(() => {
        if (!isFocusedInComponent()) {
          onBlur?.();
          onComplete?.();
        }
      }, 500);
    });

    const onDatepickerClose = useEventCallback(() => {
      setOpened(false);
      const inputEl = inputElRef.current;
      if (inputEl) {
        inputEl.focus();
        inputEl.select();
      }
    });

    const formElemProps = {
      id,
      cols,
      label,
      required,
      error,
      tooltip,
      tooltipIcon,
      elementRef,
    };
    return (
      <FormElement {...formElemProps}>
        <div className={classnames(className, 'slds-dropdown-trigger')}>
          <div className='slds-input-has-icon slds-input-has-icon_right'>
            <Input
              inputRef={inputRef}
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
            <DatepickerDropdown
              portalClassName={className}
              elementRef={datepickerRef}
              dateValue={
                dvalue.isValid() ? dvalue.format('YYYY-MM-DD') : undefined
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
  },
  { isFormElement: true }
);
