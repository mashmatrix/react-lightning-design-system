import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import moment from 'moment';
import FormElement from './FormElement';
import Input from './Input';
import Icon from './Icon';
import Datepicker from './Datepicker';

export default class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { opened: false };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.onChange && prevState.value !== this.state.value) {
      this.props.onChange({}, this.state.value);
    }
  }

  onDateIconClick() {
    setTimeout(() => {
      this.showDatepicker();
    }, 10);
  }


  onInputKeyDown(e) {
    if (e.keyCode === 13 || e.keyCode === 40) { // return / down key
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
  }

  onInputBlur(e) {
    const inputValue = e.target.value;
    let value = this.state.value;
    if (!inputValue) {
      value = '';
    } else {
      value = moment(inputValue, this.props.dateFormat);
      if (value.isValid()) {
        value = value.format('YYYY-MM-DD');
      } else {
        value = '';
      }
    }
    this.setState({ value, inputValue: undefined });
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
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
    this.setState({ opened: true, value });
  }

  onDatepickerSelect(date) {
    this.setState({ value: date, inputValue: undefined });
    setTimeout(() => {
      this.setState({ opened: false });
      ReactDOM.findDOMNode(this.refs.input).focus();
    }, 200);
  }

  onDatepickerBlur() {
    this.setState({ opened: false });
  }

  onDatepickerClose() {
    this.setState({ opened: false });
    ReactDOM.findDOMNode(this.refs.input).focus();
  }

  render() {
    const { totalCols, cols, label, defaultValue, value, dateFormat, onChange, onKeyDown, onBlur, ...props } = this.props;
    const dateValue =
      typeof value !== 'undefined' ? value :
      typeof this.state.value !== 'undefined' ? this.state.value :
      defaultValue;
    const mvalue = moment(dateValue, 'YYYY-MM-DD');
    const inputValue =
      typeof this.state.inputValue !== 'undefined' ? this.state.inputValue :
      typeof dateValue !== 'undefined' && mvalue.isValid() ? mvalue.format(dateFormat) :
      null;
    const dropdown = this.renderDropdown(dateValue);
    const formElemProps = { id: props.id, totalCols, cols, label, dropdown };
    return (
      <FormElement { ...formElemProps }>
        { this.renderInput({ inputValue, ...props }) }
      </FormElement>
    );
  }

  renderInput({ inputValue, ...props }) {
    return (
      <div className='slds-input-has-icon slds-input-has-icon--right'>
        <Input ref='input' value={ inputValue } { ...props }
          onKeyDown={ this.onInputKeyDown.bind(this) }
          onChange={ this.onInputChange.bind(this) }
          onBlur={ this.onInputBlur.bind(this) }
        />
        <Icon icon='event' className='slds-input__icon' style={ { cursor: 'pointer' } }
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
      <Datepicker className={ datepickerClassNames } selectedDate={ dateValue } autoFocus={ true }
        onSelect={ this.onDatepickerSelect.bind(this) }
        onBlur={ this.onDatepickerBlur.bind(this) }
        onClose={ this.onDatepickerClose.bind(this) }
      /> :
      <div />
    );
  }
}

DateInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  dateFormat: PropTypes.string,
};

DateInput.defaultProps = {
  dateFormat: 'L'
};

DateInput.isFormElement = true;
