import React from 'react';
import classnames from 'classnames';

export type FormElementProps = {
  id?: string;
  className?: string;
  label?: string;
  required?: boolean;
  error?: boolean | string | { message: string };
  readOnly?: boolean;
  cols?: number;
  totalCols?: number;
  dropdown?: JSX.Element;
  formElementRef?: (node: HTMLDivElement) => void;
  style?: object;
};

export class FormElement extends React.Component<FormElementProps, {}> {
  static isFormElement = true;

  renderFormElement(props: any) {
    const {
      className,
      error,
      totalCols,
      cols = 1,
      formElementRef,
      children,
    } = props;
    const formElementClassNames = classnames(
      'slds-form-element',
      {
        'slds-has-error': error,
        [`slds-size_${cols}-of-${totalCols}`]: typeof totalCols === 'number',
      },
      className
    );
    return (
      <div
        ref={formElementRef}
        key='form-element'
        className={formElementClassNames}
      >
        {children}
      </div>
    );
  }

  renderLabel() {
    const { id, label, required } = this.props;
    return label ? (
      <label
        key='form-element-label'
        className='slds-form-element__label'
        htmlFor={id}
      >
        {label}
        {required ? <abbr className='slds-required'>*</abbr> : undefined}
      </label>
    ) : (
      undefined
    );
  }

  renderControl(props: { children: any; dropdown: any; error: any }) {
    const { children, dropdown, error } = props;
    const { readOnly } = this.props;
    const formElementControlClassNames = classnames(
      'slds-form-element__control',
      { 'slds-has-divider_bottom': readOnly }
    );
    return (
      <div key='form-element-control' className={formElementControlClassNames}>
        {children}
        {dropdown}
        {this.renderError(error)}
      </div>
    );
  }

  renderError(error: any) {
    const errorMessage = error
      ? typeof error === 'string'
        ? error
        : typeof error === 'object'
        ? error.message
        : undefined
      : undefined;
    return errorMessage ? (
      <span key='slds-form-error' className='slds-form-element__help'>
        {errorMessage}
      </span>
    ) : (
      undefined
    );
  }

  render() {
    const {
      dropdown,
      className,
      totalCols,
      cols,
      error,
      children,
      style,
      ...props
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
