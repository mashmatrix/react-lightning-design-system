import React, { PropTypes } from 'react';
import classnames from 'classnames';
import FormElement from './FormElement';
import Input from './Input';
import Icon from './Icon';
import Datepicker from './Datepicker';

export default class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { opened: false };
  }

  toggleDatepicker() {
    this.setState({ opened: !this.state.opened });
  }

  onDateIconKeyDown(e) {
    if (e.keyCode === 13 || e.keyCode === 32) { // return / space keyCode
      this.setState({ opened: true });
      e.preventDefault();
      e.stopPropagation();
    }
  }

  onInputKeyDown(e) {
    if (e.keyCode === 13 || e.keyCode === 40) { // return / down key
      this.setState({ opened: true });
      e.preventDefault();
      e.stopPropagation();
    }
  }

  onDatepickerSelect(date) {
    this.setState({ value: date, opened: false });
    React.findDOMNode(this.refs.input).focus();
  }

  onDatepickerClose() {
    this.setState({ opened: false });
  }

  render() {
    const { label, ...props } = this.props;
    if (label) {
      console.log('label=', label);
      return (
        <FormElement id={ props.id } label={ label }>
          <DateInput { ...props } />
        </FormElement>
      );
    }
    const { defaultValue, value, ...pprops } = props;
    const datepickerClassNames = classnames(
      'slds-dropdown',
      'slds-dropdown--left',
      this.state.opened ? 'slds-show' : 'slds-hide'
    );
    const dateValue =
      typeof value !== 'undefined' ? value :
      typeof this.state.value !== 'undefined' ? this.state.value :
      defaultValue;
    return (
      <div className='slds-input-has-icon slds-input-has-icon--right'>
        <Input ref='input' value={ dateValue } { ...pprops } onKeyDown={ this.onInputKeyDown.bind(this) }/>
        <Icon icon='event' className='slds-input__icon' onClick={ this.toggleDatepicker.bind(this) } onKeyDown={ this.onDateIconKeyDown.bind(this) }/>
        <Datepicker className={ datepickerClassNames } autoFocus={ true } selectedDate={ dateValue }
          onSelect={ this.onDatepickerSelect.bind(this) }
          onBlur={ this.onDatepickerClose.bind(this) }
          onClose={ this.onDatepickerClose.bind(this) }
        />
      </div>
    );
  }
}

DateInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
};
