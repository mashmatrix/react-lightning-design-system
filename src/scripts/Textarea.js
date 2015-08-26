import React, { PropTypes } from 'react';
import classnames from 'classnames';
import FormElement from './FormElement';


export default class Textarea extends FormElement {

  renderControl({ className, id, value, defaultValue, placeholder, ...props }) {
    const taClassNames = classnames(className, 'slds-input');
    const taValue = value || this.state.value || defaultValue;
    const taId = id || this.state.id;
    return (
      <textarea className={ taClassNames }
             id={ taId }
             defaultValue={ taValue }
             placeholder={ placeholder }
             { ...props }
      />
    );
  }

}

Textarea.propTypes = {
  className: PropTypes.string,
  value: PropTypes.text,
  defaultValue: PropTypes.text,
  placeholder: PropTypes.value,
};
