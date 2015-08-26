import React, { PropTypes } from 'react';
import classnames from 'classnames';
import FormElement from './FormElement';


export default class Input extends FormElement {

  renderControl({ className, id, type, value, defaultValue, placeholder, ...props }) {
    const inputClassNames = classnames(className, 'slds-input');
    const inputValue = value || this.state.value || defaultValue;
    const inputId = id || this.state.id;
    return (
      <input className={ inputClassNames }
             id={ inputId }
             type={ type }
             defaultValue={ inputValue }
             placeholder={ placeholder }
             { ...props }
      />
    );
  }

}

Input.propTypes = {
  className: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
};
