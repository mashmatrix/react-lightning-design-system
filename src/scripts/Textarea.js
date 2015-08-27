import React, { PropTypes } from 'react';
import classnames from 'classnames';
import FormElement from './FormElement';


export default class Textarea extends FormElement {

  renderControl({ className, id, ...props }) {
    const taClassNames = classnames(className, 'slds-input');
    const taId = id || this.state.id;
    return (
      <textarea className={ taClassNames }
             id={ taId }
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
