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
    const { className, label, required, error, totalCols, ...pprops } = props;
    const inputId = props.id || this.state.id;
    if (typeof totalCols === 'number') {
      const labelClassNames = classnames('slds-form-element__control', className);
      return (
        <label className={ labelClassNames }>
          {
            label ?
            <legend className='slds-form-element__label'>{ label }</legend> :
            null
          }
          { this.props.children }
        </label>
      );
    }
    const formElementClassNames = classnames(
      'slds-form-element',
      {
        'slds-has-error': error,
        'is-required': required,
      }
    );
    const ctrlClassNames = classnames('slds-form-element__control', className);
    const errorMessage =
      error ?
      (typeof error === 'string' ? error :
       typeof error === 'object' ? error.message :
       undefined) :
      undefined;
    return (
      <div className={ formElementClassNames }>
        {
          label ?
          <label className='slds-form-element__label' htmlFor={ inputId }>{ label }</label> :
          null
        }
        <div className={ ctrlClassNames }>
          { this.props.children }
        </div>
        {
          errorMessage ?
          <span className='slds-form-element__help'>{ errorMessage }</span> :
          undefined
        }
      </div>
    );
  }

  render() {
    const { className, cols, dropdown, ...props } = this.props;
    const colNum = cols || 1;
    const colClassNames = classnames(
      typeof props.totalCols === 'number' ? `slds-size--${colNum}-of-${props.totalCols}` : null,
      className
    );
    if (dropdown) {
      const elemClassNames = classnames('slds-form-element', colClassNames);
      return (
        <div className={ elemClassNames } style={ { position: 'static' } }>
          { this.renderFormElement(props) }
          <div className='slds-form-element__control react-slds-dropdown-wrapper'>
            { dropdown }
          </div>
        </div>
      );
    }
    return this.renderFormElement({ ...props, className: colClassNames });
  }

}

FormElement.propTypes = {
  id: PropTypes.string,
  dropdown: PropTypes.element,
  className: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.shape({
      message: PropTypes.string,
    }),
  ]),
  cols: PropTypes.number,
  children: PropTypes.element,
};

FormElement.isFormElement = true;
