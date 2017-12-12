import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


export default class FormElement extends React.Component {

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
    const { children, dropdown, error } = props;
    const { readOnly } = this.props;
    const formElementControlClassNames = classnames(
      'slds-form-element__control',
      { 'slds-has-divider--bottom': readOnly },
    );
    return (
      <div key='form-element-control' className={formElementControlClassNames}>
        { children }
        { dropdown }
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
    const controlElem = this.renderControl({ children, dropdown, error });
    const formElemChildren = [labelElem, controlElem];
    return this.renderFormElement({
      ...props,
      className,
      error,
      totalCols,
      cols,
      style,
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
