import React, { PropTypes } from 'react';
import classnames from 'classnames';
import FormElement from './FormElement';


export default class Input extends React.Component {

  onChange(e) {
    const value = e.target.value;
    const valid = this.validate(this.props, value);

    if (this.props.onChange) {
      this.props.onChange(e, value, valid);
    }
  }

  validate(props, value) {
    const inputValue = (value !== undefined) ? value : props.value;
    return ((inputValue !== null && inputValue.trim().length !== 0) ? true : false);
  }

  render() {
    const { label, required, validate, validationMessage, ...props } = this.props;
    const isValid = (validate === true) ? this.validate(this.props) : true;

    if (label) {
      return (
        <FormElement
          id={ props.id }
          label={ label }
          required={ required }
          valid={ isValid }
          validationMessage={ validationMessage }
        >
          <Input { ...props } />
        </FormElement>
      );
    }

    const { className, id, type, onChange, ...pprops } = props;
    const inputClassNames = classnames(className, 'slds-input');
    return (
      <input
        className={ inputClassNames }
        id={ id }
        type={ type }
        onChange={ this.onChange.bind(this) }
        { ...pprops }
      />
    );
  }
}

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  validate: PropTypes.bool,
  validationMessage: PropTypes.string,
};

Input.defaultProps = {
  validationMessage: 'This field is required',
};

Input.isFormElement = true;
