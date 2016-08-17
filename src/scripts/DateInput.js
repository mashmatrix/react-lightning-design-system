import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import moment from 'moment';
import uuid from 'uuid';
import FormElement from './FormElement';
import Input from './Input';
import Icon from './Icon';
import Datepicker from './Datepicker';

export default class DateInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: `form-element-${uuid()}`,
      opened: (props.defaultOpened || false),
    };
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
      const inputEl = ReactDOM.findDOMNode(this.refs.input);
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
    const inputEl = ReactDOM.findDOMNode(this.refs.input);
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
      value = moment(inputValue, this.props.dateFormat);
      if (value.isValid()) {
        value = value.format(this.getValueFormat());
      } else {
        value = '';
      }
    }
    this.setState({ value, inputValue: undefined });
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
    return (
      <div className='slds-input-has-icon slds-input-has-icon--right'>
        <Input
          ref='input'
          value={ inputValue }
          { ...props }
          onKeyDown={ this.onInputKeyDown.bind(this) }
          onChange={ this.onInputChange.bind(this) }
          onBlur={ this.onInputBlur.bind(this) }
        />
        <Icon
          icon='event'
          className='slds-input__icon'
          style={ { cursor: 'pointer' } }
          onClick={ this.onDateIconClick.bind(this) }
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
          autoFocus
          onSelect={ this.onDatepickerSelect.bind(this) }
          onBlur={ this.onDatepickerBlur.bind(this) }
          onClose={ this.onDatepickerClose.bind(this) }
        /> :
        <div />
    );
  }

  render() {
    const id = this.props.id || this.state.id;
    const {
      totalCols, cols, label, required, error,
      defaultValue, value,
      ...props,
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
    const dropdown = this.renderDropdown(
      mvalue.isValid() ? mvalue.format('YYYY-MM-DD') : undefined
    );
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
  defaultValue: PropTypes.string,
  defaultOpened: PropTypes.bool,
  dateFormat: PropTypes.string,
  includeTime: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  onComplete: PropTypes.func,
};

DateInput.isFormElement = true;
