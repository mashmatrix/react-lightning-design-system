import React, { PropTypes } from 'react';
import classnames from 'classnames';
import uuid from 'uuid';
import { registerStyle } from './util';


export default class FormElement extends React.Component {

  constructor(props) {
    super(props);
    this.state = { id: props.id || 'form-element-' + uuid() };
    registerStyle('dropdown', [
      [
        '.react-slds-dropdown-wrapper',
        '{ position: relative; }',
      ],
      [
        '.slds-modal .react-slds-dropdown-wrapper',
        '{ position: absolute; }',
      ],
    ]);
  }

  renderFormElement(props) {
    const { className, label, valid, validationMessage, totalCols, ...pprops } = props;
    const inputId = props.id || this.state.id;
    if (typeof totalCols === 'number') {
      return (
        <label className={ className }>
          {
            label ?
            <small className='slds-form-element__helper'>{ label }</small> :
            null
          }
          { this.props.children }
        </label>
      );
    }

    const formElementClassName = classnames(
      'slds-form-element',
      'slds-has-error': !valid,
      'slds-is-required': !valid
    );

    const formElementValidationMessage = (!valid) 
      ? (<span className='slds-form-element__help'>This field is required</span>) 
      : null;

    return (
      <div className={ formElementClassName }>
        {
          label ?
          <label className='slds-form-element__label' htmlFor={ inputId }>{ label }</label> :
          null
        }
        <div className={ className }>
          { this.props.children }
        </div>

        { formElementValidationMessage }

      </div>
    );
  }

  render() {
    const { className, cols, dropdown, ...props } = this.props;
    const colNum = cols || 1;
    const ctrlClassNames = classnames(
      'slds-form-element__control',
      typeof props.totalCols === 'number' ? `slds-size--${colNum}-of-${props.totalCols}` : null,
      className
    );
    if (dropdown) {
      return (
        <div className={ ctrlClassNames } style={ { position: 'static' } }>
          { this.renderFormElement(props) }
          <div className='react-slds-dropdown-wrapper'>
            { dropdown }
          </div>
        </div>
      );
    }

    return this.renderFormElement({ className: ctrlClassNames, ...props });
  }

}

FormElement.propTypes = {
  id: PropTypes.string,
  dropdown: PropTypes.element,
  className: PropTypes.string,
  cols: PropTypes.number,
  children: PropTypes.element,
  valid: PropTypes.bool,
  validationMessage: PropTypes.string,
};

Form.defaultProps = {
  valid: true,
};

FormElement.isFormElement = true;

