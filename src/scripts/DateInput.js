import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import moment from 'moment';
import uuid from 'uuid';
import FormElement from './FormElement';
import Input from './Input';
import Icon from './Icon';
import Datepicker from './Datepicker';
import onClickOutside from 'react-onclickoutside';

class DateInput extends Component {
  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
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

    this.inputRef = this.inputRef.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.onValueChange && prevState.value !== this.state.value) {
      this.props.onValueChange(this.state.value, prevState.value);
    }
  }

  onDateIconClick() {
    setTimeout(() => {
      if (this.props.inputFocused) {
        const inputEl = ReactDOM.findDOMNode(this.input);
        if (inputEl) {
          inputEl.focus();
        }
      }
      this.showDatepicker();
    }, 10);
  }

  onInputKeyDown(e) {
    if (e.keyCode === 13) { // return key
      this.onDatepickerClose();
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
    } else if (e.keyCode === 27) { // ESC
      this.onDatepickerClose();
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

  onDatepickerSelect(value) {
    this.setState({ value, inputValue: undefined });
    setTimeout(() => {
      this.setState({ opened: false });
      const inputEl = ReactDOM.findDOMNode(this.input);
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
    const inputEl = ReactDOM.findDOMNode(this.input);
    if (inputEl) {
      inputEl.focus();
      inputEl.select();
    }
  }

  setValueFromInput(inputValue) {
    let value = this.state.value;
    if (!inputValue) {
      value = '';
    } else {
      value = moment(inputValue, this.props.dateFormat);
      if (value.isValid()) {
        value = value.format('YYYY-MM-DD');
      } else {
        value = inputValue;
      }
    }
    this.setState({ value, inputValue: undefined });
  }

  inputRef(ref) {
    this.input = ref;
  }

  // provided by 'react-onclickoutside' HOC
  handleClickOutside() {
    if (!this.state.opened) {
      return;
    }
    this.onDatepickerClose();
  }

  isFocusedInComponent() {
    const rootEl = ReactDOM.findDOMNode(this);
    let targetEl = document.activeElement;
    while (targetEl && targetEl !== rootEl) {
      targetEl = targetEl.parentNode;
    }
    return !!targetEl;
  }

  showDatepicker() {
    let value = this.state.value;
    if (typeof this.state.inputValue !== 'undefined') {
      value = moment(this.state.inputValue, this.props.dateFormat);
      if (value.isValid()) {
        value = value.format('YYYY-MM-DD');
      } else {
        value = this.state.value;
      }
    }
    this.setState({ opened: !this.state.opened, value });
  }

  renderInput({ inputValue, ...props }) {
    const inputDateClassNames = classnames(
      'slds-input-has-icon',
      'slds-input-has-icon--right',
      props.className
    );
    const pprops = props;
    delete pprops.onValueChange;
    delete pprops.defaultOpened;
    delete pprops.inputFocused;
    delete pprops.disableOnClickOutside;
    delete pprops.enableOnClickOutside;
    delete pprops.outsideClickIgnoreClass;
    delete pprops.preventDefault;
    delete pprops.eventTypes;
    delete pprops.stopPropagation;

    return (
      <div className={inputDateClassNames}>
        <Input
          ref={this.inputRef}
          value={ inputValue }
          { ...props }
          onKeyDown={ this.onInputKeyDown }
          onChange={ this.onInputChange }
          onBlur={ this.onInputBlur }
          onClick={ this.onDateIconClick }
        />
        <Icon
          icon='event'
          className='slds-input__icon'
          style={ { cursor: 'pointer' } }
          onClick={ this.onDateIconClick }
        />
      </div>
    );
  }

  renderDropdown(dateValue) {
    const datepickerClassNames = classnames(
      'slds-dropdown',
      'slds-dropdown--left'
    );
    return (
      this.state.opened ?
        <Datepicker
          className={ datepickerClassNames }
          selectedDate={ dateValue }
          autoFocus={!this.props.inputFocused}
          onSelect={ this.onDatepickerSelect }
          onBlur={ this.onDatepickerBlur }
          onClose={ this.onDatepickerClose }
          disablePastDateSelection={this.props.disablePastDateSelection}
        /> :
        <div />
    );
  }

  render() {
    const id = this.props.id || this.state.id;
    const {
      totalCols, cols, label, required, error,
      defaultValue, value, dateFormat,
      ...props,
    } = this.props;
    const dateValue =
      typeof value !== 'undefined' ? value :
      typeof this.state.value !== 'undefined' ? this.state.value :
      defaultValue;
    const mvalue = moment(dateValue, 'YYYY-MM-DD');
    const inputValue =
      typeof this.state.inputValue !== 'undefined' ? this.state.inputValue :
      typeof dateValue !== 'undefined' ?
        (mvalue.isValid() ? mvalue.format(dateFormat) : dateValue) : undefined;
    const dropdown = this.renderDropdown(dateValue);
    const formElemProps = { id, totalCols, cols, label, required, error, dropdown };
    return (
      <FormElement { ...formElemProps }>
        { this.renderInput({ id, inputValue, ...props }) }
      </FormElement>
    );
  }
}

DateInput.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.shape({
      message: PropTypes.string,
    }),
  ]),
  totalCols: PropTypes.number,
  cols: PropTypes.number,
  value: PropTypes.string,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  defaultValue: PropTypes.string,
  defaultOpened: PropTypes.bool,
  dateFormat: PropTypes.string,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  onComplete: PropTypes.func,
  disablePastDateSelection: PropTypes.bool,
  inputFocused: PropTypes.bool,
};

DateInput.defaultProps = {
  dateFormat: 'L',
  inputFocused: false,
};

DateInput.isFormElement = true;

export default onClickOutside(DateInput);
