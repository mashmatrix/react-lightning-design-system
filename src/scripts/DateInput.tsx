import React, {
  Component,
  KeyboardEvent,
  ChangeEvent,
  FocusEvent,
} from 'react';
import classnames from 'classnames';
import moment from 'moment';
import { autoAlign, InjectedProps } from './AutoAlign';
import { Button } from './Button';
import { FormElement } from './FormElement';
import { Input, InputProps } from './Input';
import { Datepicker } from './Datepicker';
import { uuid, isElInChildren } from './util';

type DatepickerDropdownProps = {
  className?: string;
  dateValue?: string;
  minDate?: string;
  maxDate?: string;
  elementRef?: (node: HTMLDivElement) => void;
  extensionRenderer?: (...props: any[]) => JSX.Element;
  onSelect?: (date: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onClose?: () => void;
} & InjectedProps;

/**
 *
 */
class DatepickerDropdown extends Component<DatepickerDropdownProps> {
  node: HTMLDivElement | null = null;

  render() {
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
    } = this.props;
    const [vertAlign, align] = alignment;
    const datepickerClassNames = classnames(
      className,
      'slds-dropdown',
      align ? `slds-dropdown_${align}` : undefined,
      vertAlign ? `slds-dropdown_${vertAlign}` : undefined
    );
    const handleDOMRef = (node: HTMLDivElement) => {
      this.node = node;
      if (elementRef) {
        elementRef(node);
      }
    };
    return (
      <Datepicker
        elementRef={handleDOMRef}
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
  }
}

const DatepickerDropdownPortal = autoAlign({
  triggerSelector: '.slds-dropdown-trigger',
  alignmentStyle: 'menu',
})(DatepickerDropdown);

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
  extensionRenderer?: (...props: any[]) => JSX.Element;
} & Omit<InputProps, 'value' | 'defaultValue' | 'onBlur' | 'onValueChange'>;

type DateInputState = {
  id: string;
  opened: boolean;
  value: string | null;
  inputValue: string | null;
};
/**
 *
 */
export class DateInput extends Component<DateInputProps, DateInputState> {
  static isFormElement = true;

  node: HTMLDivElement | null = null;

  datepicker: HTMLDivElement | null = null;

  input: HTMLInputElement | null = null;

  constructor(props: Readonly<DateInputProps>) {
    super(props);
    this.state = {
      id: `form-element-${uuid()}`,
      opened:
        typeof props.opened !== 'undefined'
          ? props.opened
          : props.defaultOpened || false,
      value:
        typeof props.value !== 'undefined'
          ? props.value
          : props.defaultValue || null,
      inputValue: null,
    };

    this.onDateIconClick = this.onDateIconClick.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);

    this.onDatepickerSelect = this.onDatepickerSelect.bind(this);
    this.onDatepickerBlur = this.onDatepickerBlur.bind(this);
    this.onDatepickerClose = this.onDatepickerClose.bind(this);
  }

  componentDidUpdate(prevProps: DateInputProps, prevState: DateInputState) {
    if (this.props.onValueChange && prevState.value !== this.state.value) {
      this.props.onValueChange(this.state.value, prevState.value);
    }
  }

  onDateIconClick() {
    setTimeout(() => {
      this.showDatepicker();
    }, 10);
  }

  onInputKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode === 13) {
      // return key
      e.preventDefault();
      e.stopPropagation();
      if (e.currentTarget.value !== undefined) {
        this.setValueFromInput(e.currentTarget.value);
      }
      if (this.props.onComplete) {
        setTimeout(() => {
          if (this.props.onComplete) {
            this.props.onComplete();
          }
        }, 10);
      }
    } else if (e.keyCode === 40) {
      // down key
      this.showDatepicker();
      e.preventDefault();
      e.stopPropagation();
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  }

  onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    this.setState({ inputValue });
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  onInputBlur(e: FocusEvent<HTMLInputElement | HTMLButtonElement>) {
    this.setValueFromInput(e.target.value);
    setTimeout(() => {
      if (!this.isFocusedInComponent()) {
        if (this.props.onBlur) {
          this.props.onBlur();
        }
        if (this.props.onComplete) {
          this.props.onComplete();
        }
      }
    }, 10);
  }

  onDatepickerSelect(dvalue: string) {
    const value = moment(dvalue).format(this.getValueFormat());
    this.setState({ value, inputValue: null });
    setTimeout(() => {
      this.setState({ opened: false });
      const inputEl = this.input;
      if (inputEl) {
        inputEl.focus();
        inputEl.select();
      }
      if (this.props.onComplete) {
        this.props.onComplete();
      }
    }, 200);
  }

  onDatepickerBlur() {
    this.setState({ opened: false });
    setTimeout(() => {
      if (!this.isFocusedInComponent()) {
        if (this.props.onBlur) {
          this.props.onBlur();
        }
        if (this.props.onComplete) {
          this.props.onComplete();
        }
      }
    }, 10);
  }

  onDatepickerClose() {
    this.setState({ opened: false });
    const inputEl = this.input;
    if (inputEl) {
      inputEl.focus();
      inputEl.select();
    }
  }

  getValueFormat() {
    return this.props.includeTime ? 'YYYY-MM-DDTHH:mm:ss.SSSZ' : 'YYYY-MM-DD';
  }

  getInputValueFormat() {
    return this.props.dateFormat || (this.props.includeTime ? 'L HH:mm' : 'L');
  }

  setValueFromInput(inputValue: string) {
    let { value } = this.state;
    if (!inputValue) {
      value = '';
    } else {
      const mvalue = moment(inputValue, this.getInputValueFormat());
      if (mvalue.isValid()) {
        value = mvalue.format(this.getValueFormat());
      } else {
        value = '';
      }
    }
    this.setState({ value, inputValue: null });
  }

  isFocusedInComponent() {
    const targetEl = document.activeElement;
    return (
      isElInChildren(this.node, targetEl) ||
      isElInChildren(this.datepicker, targetEl)
    );
  }

  showDatepicker() {
    let { value } = this.state;
    if (this.state.inputValue != null) {
      const mvalue = moment(this.state.inputValue, this.getInputValueFormat());
      if (mvalue.isValid()) {
        value = mvalue.format(this.getValueFormat());
      } else {
        // eslint-disable-next-line prefer-destructuring
        value = this.state.value;
      }
    }
    this.setState({ opened: true, value });
  }

  renderInput({
    inputValue,
    ...props
  }: { inputValue: string | undefined } & InputProps) {
    return (
      <div className='slds-input-has-icon slds-input-has-icon_right'>
        <Input
          inputRef={(node) => (this.input = node)}
          {...props}
          value={inputValue}
          onKeyDown={this.onInputKeyDown}
          onChange={this.onInputChange}
          onBlur={this.onInputBlur}
        />
        <Button
          type='icon'
          icon='event'
          disabled={props.disabled}
          className='slds-input__icon slds-input__icon_right'
          tabIndex={-1}
          onClick={props.disabled ? undefined : this.onDateIconClick}
          onBlur={this.onInputBlur}
        />
      </div>
    );
  }

  render() {
    const id = this.props.id || this.state.id;
    const {
      className,
      totalCols,
      cols,
      label,
      required,
      error,
      value,
      menuAlign,
      minDate,
      maxDate,
      opened,
      extensionRenderer,
      /* eslint-disable @typescript-eslint/no-unused-vars */
      dateFormat,
      defaultValue,
      defaultOpened,
      includeTime,
      onComplete,
      onValueChange,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...props
    } = this.props;
    const dateValue = typeof value !== 'undefined' ? value : this.state.value;
    const mvalue = moment(dateValue || undefined, this.getValueFormat());
    const inputValue =
      this.state.inputValue != null
        ? this.state.inputValue
        : dateValue != null && mvalue.isValid()
        ? mvalue.format(this.getInputValueFormat())
        : undefined;
    const isOpened = typeof opened !== 'undefined' ? opened : this.state.opened;
    const formElemProps = { id, totalCols, cols, label, required, error };
    return (
      <FormElement
        formElementRef={(node) => (this.node = node)}
        {...formElemProps}
      >
        <div className={classnames(className, 'slds-dropdown-trigger')}>
          {this.renderInput({ id, inputValue, ...props })}
          {isOpened ? (
            <DatepickerDropdownPortal
              portalClassName={className}
              elementRef={(node: HTMLDivElement) => (this.datepicker = node)}
              dateValue={
                mvalue.isValid() ? mvalue.format('YYYY-MM-DD') : undefined
              }
              minDate={minDate}
              maxDate={maxDate}
              align={menuAlign}
              extensionRenderer={extensionRenderer}
              onBlur={this.onDatepickerBlur}
              onSelect={this.onDatepickerSelect}
              onClose={this.onDatepickerClose}
            />
          ) : (
            undefined
          )}
        </div>
      </FormElement>
    );
  }
}
