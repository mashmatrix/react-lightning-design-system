import React, { FC } from 'react';
import classnames from 'classnames';

/**
 *
 */
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

/**
 *
 */
export const FormElement: FC<FormElementProps> = (props) => {
  const {
    className,
    totalCols,
    cols = 1,
    formElementRef,
    id,
    label,
    required,
    error,
    dropdown,
    children,
    readOnly,
  } = props;

  const errorMessage = error
    ? typeof error === 'string'
      ? error
      : typeof error === 'object'
      ? error.message
      : undefined
    : undefined;

  const formElementControlClassNames = classnames(
    'slds-form-element__control',
    { 'slds-has-divider_bottom': readOnly }
  );

  const formElementClassNames = classnames(
    'slds-form-element',
    error ? 'slds-has-error' : null,
    typeof totalCols === 'number' ? `slds-size_${cols}-of-${totalCols}` : null,
    className
  );

  return (
    <div
      ref={formElementRef}
      key='form-element'
      className={formElementClassNames}
    >
      {label ? (
        <label
          key='form-element-label'
          className='slds-form-element__label'
          htmlFor={id}
        >
          {label}
          {required ? <abbr className='slds-required'>*</abbr> : undefined}
        </label>
      ) : null}
      <div key='form-element-control' className={formElementControlClassNames}>
        {children}
        {dropdown}
        {errorMessage ? (
          <span key='slds-form-error' className='slds-form-element__help'>
            {errorMessage}
          </span>
        ) : undefined}
      </div>
    </div>
  );
};

(FormElement as unknown as { isFormElement: boolean }).isFormElement = true;
