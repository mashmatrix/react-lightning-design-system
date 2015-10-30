import React, { PropTypes } from 'react';
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

  onInputChange(e) {
    const inputValue = e.target.value;
    this.setState({ inputValue });
  }

  onDatepickerSelect(date) {
    const value = date;
    const inputValue = moment(date).format(this.props.dateFormat);
    this.setState({ value, inputValue });
    setTimeout(() => {
      this.setState({ opened: false });
      React.findDOMNode(this.refs.input).focus();
    }, 200);
  }

  onDatepickerBlur() {
    this.setState({ opened: false });
  }

  onDatepickerClose() {
    this.setState({ opened: false });
    React.findDOMNode(this.refs.input).focus();
  }

  render() {
    const { label, ...props } = this.props;
    if (label) {
      return (
        <FormElement id={ props.id } label={ label }>
          <DateInput { ...props } />
        </FormElement>
      );
    }
    const { defaultValue, value, dateFormat, ...pprops } = props;
    const datepickerClassNames = classnames(
      'slds-dropdown',
      'slds-dropdown--left'
    );
    const dateValue =
      typeof value !== 'undefined' ? value :
      typeof this.state.value !== 'undefined' ? this.state.value :
      defaultValue;
    const inputValue =
      typeof this.state.inputValue !== 'undefined' ? this.state.inputValue :
      typeof dateValue !== 'undefined' ? moment(dateValue).format(dateFormat) :
      null;
    console.log('dateValue=', dateValue);
    return (
      <div className='slds-input-has-icon slds-input-has-icon--right'>
        <Input ref='input' value={ inputValue } { ...pprops }
          onKeyDown={ this.onInputKeyDown.bind(this) } onChange={ this.onInputChange.bind(this) }/>
        <Icon icon='event' className='slds-input__icon' style={ { cursor: 'pointer' } }
          onClick={ this.onDateIconClick.bind(this) } />
        {
          this.state.opened ?
          <Datepicker className={ datepickerClassNames } selectedDate={ dateValue } autoFocus={ true }
            onSelect={ this.onDatepickerSelect.bind(this) }
            onBlur={ this.onDatepickerBlur.bind(this) }
            onClose={ this.onDatepickerClose.bind(this) }
          /> :
          null
        }
      </div>
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
