import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { registerStyle } from './util';


export default class FormElement extends React.Component {

  constructor(props) {
    super(props);
    registerStyle('dropdown', [
      [
        '.react-slds-dropdown-control-wrapper',
        '{ height: 0; }',
      ],
      [
        '.slds-has-error .react-slds-dropdown-control-wrapper',
        '{ height: auto; }',
      ],
      [
        '.react-slds-dropdown-control-wrapper > .slds-form-element__control',
        '{ position: relative; padding-top: 0.1px; margin-top: -0.1px }',
      ],
      [
        '.react-slds-dropdown-form-element',
        '{ position: static; }',
      ],
      [
        '.slds-form--horizontal .react-slds-dropdown-control-wrapper .slds-dropdown',
        '{ top: -1em; }',
      ],
      [
        '.slds-form--horizontal .react-slds-dropdown-control-wrapper .slds-lookup__menu',
        '{ top: -1em; }',
      ],
      [
        '.slds-form--horizontal .slds-has-error .react-slds-dropdown-control-wrapper .slds-dropdown',
        '{ top: 0; }',
      ],
      [
        '.slds-modal .react-slds-dropdown-control-wrapper > .slds-form-element__control',
        '{ position: absolute; }',
      ],
    ]);
  }

  renderFormElement(props) {
    const { className, error, totalCols, cols = 1, children } = props;
    const formElementClassNames = classnames(
      'slds-form-element',
      {
        'slds-has-error': error,
        [`slds-size--${cols}-of-${totalCols}`]: typeof totalCols === 'number',
      },
      className
    );
    return (
      <div key='form-elem' className={ formElementClassNames }>
        { children }
      </div>
    );
  }

  renderLabel() {
    const { id, label, required } = this.props;
    return (
      label ?
      <label key='form-label' className='slds-form-element__label' htmlFor={ id }>
        { label }
        {
          required ?
          <abbr className='slds-required'>*</abbr> :
          undefined
        }
      </label> :
      undefined
    );
  }

  renderControl(props) {
    const { error, children } = props;
    const errorMessage =
      error ?
      (typeof error === 'string' ? error :
       typeof error === 'object' ? error.message :
       undefined) :
      undefined;
    return (
      <div key='form-control' className='slds-form-element__control'>
        { children }
        {
          errorMessage ?
          <span className='slds-form-element__help'>{ errorMessage }</span> :
          undefined
        }
      </div>
    );
  }

  render() {
    const { dropdown, className, totalCols, cols, error, children, ...props } = this.props;
    const labelElem = this.renderLabel();
    if (dropdown) {
      const controlElem = this.renderControl({ children });
      const formElemChildren = [labelElem, controlElem];
      const innerFormElem = this.renderFormElement({ ...props, children: formElemChildren });
      const outerControlElem = this.renderControl({ error, children: dropdown });
      const outerFormElemChildren = [
        innerFormElem,
        <div key='outer-control-elem' className='react-slds-dropdown-control-wrapper'>{ outerControlElem }</div>,
      ];
      const outerFormClassName = classnames('react-slds-dropdown-form-element', className);
      return this.renderFormElement({
        ...props, error, totalCols, cols,
        className: outerFormClassName,
        children: outerFormElemChildren,
      });
    }
    const controlElem = this.renderControl({ children, error });
    const formElemChildren = [labelElem, controlElem];
    return this.renderFormElement({
      ...props, className, error, totalCols, cols,
      children: formElemChildren,
    });
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
