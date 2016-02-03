import React, { PropTypes } from 'react';
import classnames from 'classnames';
import FormElement from './FormElement';


export default class Textarea extends React.Component {

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
        <FormElement id={ props.id } label={ label } required={ required } valid={ isValid } validationMessage={ validationMessage }>
          <Textarea { ...props } />
        </FormElement>
      );
    }
    const { className, id, onChange, ...pprops } = props;
    const taClassNames = classnames(className, 'slds-input');
    return (
      <textarea
        className={ taClassNames } id={ id }
        onChange={ this.onChange.bind(this) }
        { ...pprops }
      />
    );
  }

}

Textarea.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  validate: PropTypes.bool,
  validationMessage: PropTypes.string,
};

Textarea.defaultProps = {
  validationMessage: 'This field is required',
};

Textarea.isFormElement = true;
