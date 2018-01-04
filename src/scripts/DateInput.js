import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import autoAlign from './AutoAlign';
import FormElement from './FormElement';
import Input from './Input';
import Icon from './Icon';
import Datepicker from './Datepicker';
import { uuid, isElInChildren, registerStyle } from './util';


/**
 *
 */
class DatepickerDropdown extends Component {
  static propTypes = {
    className: PropTypes.string,
    align: PropTypes.oneOf(['left', 'right']),
    vertAlign: PropTypes.oneOf(['top', 'bottom']),
    dateValue: PropTypes.string,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    elementRef: PropTypes.func,
    extensionRenderer: PropTypes.func,
    onSelect: PropTypes.func,
    onBlur: PropTypes.func,
    onClose: PropTypes.func,
  }

  render() {
    const {
      className, align, vertAlign, dateValue, minDate, maxDate, extensionRenderer,
      elementRef,
      onSelect, onBlur, onClose,
    } = this.props;
    const datepickerClassNames = classnames(
      className,
      'slds-dropdown',
      align ? `slds-dropdown--${align}` : undefined,
      vertAlign ? `slds-dropdown--${vertAlign}` : undefined,
    );
    const handleDOMRef = (node) => {
      this.node = node;
      if (elementRef) { elementRef(node); }
    };
    return (
      <Datepicker
        elementRef={ handleDOMRef }
        className={ datepickerClassNames }
        selectedDate={ dateValue }
        autoFocus
        minDate={ minDate }
        maxDate={ maxDate }
        extensionRenderer={ extensionRenderer }
        onSelect={ onSelect }
        onBlur={ onBlur }
        onClose={ onClose }
      />
    );
  }
}

const DatepickerDropdownPortal = autoAlign({
  triggerSelector: '.slds-dropdown-trigger',
})(DatepickerDropdown);

/**
 *
 */
export default class DateInput extends Component {
  constructor(props) {
    super();
    this.state = {
      id: `form-element-${uuid()}`,
      opened: (props.defaultOpened || false),
    };

    this.onDateIconClick = this.onDateIconClick.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);

    this.onDatepickerSelect = this.onDatepickerSelect.bind(this);
    this.onDatepickerBlur = this.onDatepickerBlur.bind(this);
    this.onDatepickerClose = this.onDatepickerClose.bind(this);

    registerStyle('dateinput', [
      [
        '.slds-has-error .slds-datepicker .slds-select',
        '{ border: 1px solid #d8dde6; box-shadow: none; }',
      ],
    ]);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.onValueChange && prevState.value !== this.state.value) {
      this.props.onValueChange(this.state.value, prevState.value);
    }
  }

  onDateIconClick() {
    setTimeout(() => {
      this.showDatepicker();
    }, 10);
  }

  onInputKeyDown(e) {
    if (e.keyCode === 13) { // return key
      e.preventDefault();
      e.stopPropagation();
      this.setValueFromInput(e.target.value);
      if (this.props.onComplete) {
        setTimeout(() => {
          this.props.onComplete();
        }, 10);
      }
    } else if (e.keyCode === 40) { // down key
      this.showDatepicker();
      e.preventDefault();
      e.stopPropagation();
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  }

  onInputChange(e) {
    const inputValue = e.target.value;
    this.setState({ inputValue });
    if (this.props.onChange) {
      this.props.onChange(e, inputValue);
    }
  }

  onInputBlur(e) {
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

  onDatepickerSelect(dvalue) {
    const value = moment(dvalue).format(this.getValueFormat());
    this.setState({ value, inputValue: undefined });
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

  setValueFromInput(inputValue) {
    let value = this.state.value;
    if (!inputValue) {
      value = '';
    } else {
      value = moment(inputValue, this.getInputValueFormat());
      if (value.isValid()) {
        value = value.format(this.getValueFormat());
      } else {
        value = '';
      }
    }
    this.setState({ value, inputValue: undefined });
  }

  isFocusedInComponent() {
    const targetEl = document.activeElement;
    return isElInChildren(this.node, targetEl) ||
      isElInChildren(this.datepicker, targetEl);
  }

  showDatepicker() {
    let value = this.state.value;
    if (typeof this.state.inputValue !== 'undefined') {
      value = moment(this.state.inputValue, this.getInputValueFormat());
      if (value.isValid()) {
        value = value.format(this.getValueFormat());
      } else {
        value = this.state.value;
      }
    }
    this.setState({ opened: true, value });
  }

  renderInput({ inputValue, ...props }) {
    const pprops = props;
    delete pprops.onValueChange;
    return (
      <div className='slds-input-has-icon slds-input-has-icon--right'>
        <Input
          inputRef={node => (this.input = node)}
          value={ inputValue }
          { ...props }
          onKeyDown={ this.onInputKeyDown }
          onChange={ this.onInputChange }
          onBlur={ this.onInputBlur }
        />
        <span
          tabIndex={ -1 }
          style={ props.disabled ? undefined : { position: 'relative', cursor: 'pointer', outline: 'none' } }
          onClick={ props.disabled ? undefined : this.onDateIconClick }
          onBlur={ this.onInputBlur }
        >
          <Icon icon='event' className='slds-input__icon' />
        </span>
      </div>
    );
  }

  render() {
    const id = this.props.id || this.state.id;
    const {
      className, totalCols, cols, label, required, error,
      defaultValue, value, menuAlign,
      minDate, maxDate,
      extensionRenderer,
      ...props
    } = this.props;
    const dateValue =
      typeof value !== 'undefined' ? value :
        typeof this.state.value !== 'undefined' ? this.state.value :
          defaultValue;
    const mvalue = moment(dateValue, this.getValueFormat());
    const inputValue =
      typeof this.state.inputValue !== 'undefined' ?
        this.state.inputValue :
      typeof dateValue !== 'undefined' && mvalue.isValid() ?
        mvalue.format(this.getInputValueFormat()) :
          undefined;
    const formElemProps = { id, totalCols, cols, label, required, error };
    delete props.dateFormat;
    delete props.defaultOpened;
    delete props.includeTime;
    delete props.onComplete;
    return (
      <FormElement
        formElementRef={ node => (this.node = node) }
        { ...formElemProps }
      >
        <div className={ classnames(className, 'slds-dropdown-trigger') }>
          { this.renderInput({ id, inputValue, ...props }) }
          {
            this.state.opened ?
              <DatepickerDropdownPortal
                portalClassName={ className }
                elementRef={ node => (this.datepicker = node) }
                dateValue={ mvalue.isValid() ? mvalue.format('YYYY-MM-DD') : undefined }
                minDate={ minDate }
                maxDate={ maxDate }
                align={ menuAlign }
                extensionRenderer={ extensionRenderer }
                onBlur={ this.onDatepickerBlur }
                onSelect={ this.onDatepickerSelect }
                onClose={ this.onDatepickerClose }
              /> :
              undefined
          }
        </div>
      </FormElement>
    );
  }
}

const MENU_ALIGN = ['left', 'right'];

DateInput.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: FormElement.propTypes.error,
  totalCols: PropTypes.number,
  cols: PropTypes.number,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  defaultOpened: PropTypes.bool,
  dateFormat: PropTypes.string,
  includeTime: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  onComplete: PropTypes.func,
  menuAlign: PropTypes.oneOf(MENU_ALIGN),
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  extensionRenderer: PropTypes.func,
};

DateInput.isFormElement = true;
