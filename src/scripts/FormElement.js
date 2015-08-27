import React, { PropTypes } from 'react';
import classnames from 'classnames';
import uuid from 'uuid';

export default class FormElement extends React.Component {

  constructor(props) {
    super(props);
    this.state = { id: props.id || 'form-element-' + uuid() };
  }

  render() {
    const { label, totalCols, cols, ...props } = this.props;
    const inputId = props.id || this.state.id;
    if (typeof totalCols === 'number') {
      const colNum = cols || 1;
      const ctrlClassNames = classnames(
        'slds-form-element__control', `slds-size--${colNum}-of-${totalCols}`
      );
      return (
        <label className={ ctrlClassNames }>
          {
            label ?
            <small className='slds-form-element__helper'>{ label }</small> :
            null
          }
          { this.props.children }
        </label>
      );
    } else {
      return (
        <div className='slds-form-element'>
          {
            label ?
            <label className='slds-form-element__label' htmlFor={ inputId }>{ label }</label> :
            null
          }
          <div className='slds-form-element__control'>
            { this.props.children }
          </div>
        </div>
      );
    }
  }

}

FormElement.isFormElement = true;
