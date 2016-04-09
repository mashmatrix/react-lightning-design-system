import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { registerStyle } from './util';


export default class FormElement extends React.Component {

  constructor(props) {
    super(props);
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
    const { className, label, required, error, totalCols, cols = 1, children } = props;
    const errorMessage =
      error ?
      (typeof error === 'string' ? error :
       typeof error === 'object' ? error.message :
       undefined) :
      undefined;
    if (typeof totalCols === 'number') {
      const labelClassNames = classnames(
        'slds-form-element__control',
        `slds-size--${cols}-of-${totalCols}`,
        className
      );
      return (
        <label className={ labelClassNames }>
          {
            label ?
            <legend className='slds-form-element__label'>
              { label }
              {
                required ?
                <abbr className='slds-required'>*</abbr> :
                undefined
              }
            </legend> :
            undefined
          }
          { children }
          {
            errorMessage ?
            <span className='slds-form-element__help'>{ errorMessage }</span> :
            undefined
          }
        </label>
      );
    }
    const formElementClassNames = classnames(
      'slds-form-element',
      { 'slds-has-error': error }
    );
    const ctrlClassNames = classnames('slds-form-element__control', className);
    return (
      <div className={ formElementClassNames }>
        {
          label ?
          <label className='slds-form-element__label' htmlFor={ props.id }>
            { label }
            {
              required ?
              <abbr className='slds-required'>*</abbr> :
              undefined
            }
          </label> :
          undefined
        }
        <div className={ ctrlClassNames }>
          { children }
          {
            errorMessage ?
            <span className='slds-form-element__help'>{ errorMessage }</span> :
            undefined
          }
        </div>
      </div>
    );
  }

  render() {
    const { className, dropdown, ...props } = this.props;
    if (dropdown) {
      const elemClassNames = classnames('slds-form-element', className);
      return (
        <div className={ elemClassNames } style={ { position: 'static' } }>
          { this.renderFormElement(props) }
          <div className='slds-form-element__control react-slds-dropdown-wrapper'>
            { dropdown }
          </div>
        </div>
      );
    }
    return this.renderFormElement({ ...props, className });
  }

}

FormElement.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.shape({
      message: PropTypes.string,
    }),
  ]),
  cols: PropTypes.number,
  totalCols: PropTypes.number,
  dropdown: PropTypes.element,
  children: PropTypes.element,
};

FormElement.isFormElement = true;
