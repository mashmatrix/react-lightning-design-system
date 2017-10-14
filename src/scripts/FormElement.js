import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { registerStyle } from './util';


export default class FormElement extends React.Component {

  constructor() {
    super();
    this.registerDropdownStyle();
  }

  // new function that can be easily overrided
  registerDropdownStyle() {
    /* eslint-disable max-len */
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
        '{ position: relative; padding-top: 0.1px; margin-top: -0.1px; vertical-align: top; }',
      ],
      [
        '.react-slds-dropdown-form-element',
        '{ position: static; }',
      ],
      [
        '.slds-form--horizontal .slds-has-error .react-slds-dropdown-control-wrapper .slds-dropdown',
        '{ top: 0; }',
      ],
      [
        '.slds-modal .react-slds-dropdown-control-wrapper > .slds-form-element__control',
        '{ position: absolute; }',
      ],
      [
        '.slds-modal .react-slds-dropdown-control-wrapper > .slds-form-element__control > .slds-lookup__menu',
        '{ min-width: 20rem; }',
      ],
      [
        '.slds-input-has-icon--left-right .slds-input__icon--right',
        '{ left: auto; }',
      ],
    ]);
  }

  renderFormElement(props) {
    const { className, error, totalCols, cols = 1, formElementRef, children } = props;
    const formElementClassNames = classnames(
      'slds-form-element',
      {
        'slds-has-error': error,
        [`slds-size--${cols}-of-${totalCols}`]: typeof totalCols === 'number',
      },
      className
    );
    return (
      <div
        ref={ formElementRef }
        key='form-element'
        className={ formElementClassNames }
      >
        { children }
      </div>
    );
  }

  renderLabel() {
    const { id, label, required } = this.props;
    return (
      label ?
        <label
          key='form-element-label'
          className='slds-form-element__label'
          htmlFor={ id }
        >
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
    const { children, error } = props;
    const { readOnly } = this.props;
    const formElementControlClassNames = classnames(
      'slds-form-element__control',
      { 'slds-has-divider--bottom': readOnly },
    );
    return (
      <div key='form-element-control' className={formElementControlClassNames}>
        { children }
        { this.renderError(error) }
      </div>
    );
  }

  renderError(error) {
    const errorMessage =
      error ?
        (typeof error === 'string' ? error :
          typeof error === 'object' ? error.message :
            undefined) :
        undefined;
    return errorMessage ?
      <span key='slds-form-error' className='slds-form-element__help'>{ errorMessage }</span> :
        undefined;
  }

  render() {
    const {
      dropdown, className, totalCols, cols, error,
      children, style, ...props
    } = this.props;
    const labelElem = this.renderLabel();
    if (dropdown) {
      const controlElem = this.renderControl({ children });
      const formElemChildren = [labelElem, controlElem];
      const innerFormElem = this.renderFormElement({ ...props, children: formElemChildren });
      const outerControlElem = this.renderControl({ error, children: dropdown });
      const outerFormElemChildren = [
        innerFormElem,
        <div key='outer-form-element' className='react-slds-dropdown-control-wrapper' style={style}>
          { outerControlElem }
        </div>,
      ];
      const outerFormClassName = classnames('react-slds-dropdown-form-element', className);
      return this.renderFormElement({
        ...props,
        error,
        totalCols,
        cols,
        className: outerFormClassName,
        children: outerFormElemChildren,
      });
    }
    const controlElem = this.renderControl({ children, error });
    const formElemChildren = [labelElem, controlElem];
    return this.renderFormElement({
      ...props,
      className,
      error,
      totalCols,
      cols,
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
  readOnly: PropTypes.bool,
  cols: PropTypes.number,
  totalCols: PropTypes.number,
  dropdown: PropTypes.element,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  formElementRef: PropTypes.func,
  /* eslint-disable react/forbid-prop-types */
  style: PropTypes.object,
};

FormElement.isFormElement = true;
