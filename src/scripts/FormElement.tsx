import React, { createContext, FC, Ref, useContext } from 'react';
import classnames from 'classnames';
import { FieldSetRowContext } from './FieldSet';
import { useFormElementId } from './hooks';

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
  dropdown?: JSX.Element;
  formElementRef?: Ref<HTMLDivElement>;
  style?: object;
};

/**
 *
 */
export const FormElementContext = createContext<{
  id: string;
} | null>(null);

/**
 *
 */
export const FormElement: FC<FormElementProps> = (props) => {
  const {
    id: id_,
    className,
    cols = 1,
    formElementRef,
    label,
    required,
    error,
    dropdown,
    children,
    readOnly,
  } = props;

  const id = useFormElementId(id_);

  const { totalCols } = useContext(FieldSetRowContext) ?? {};

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
    <FormElementContext.Provider value={{ id }}>
      <div ref={formElementRef} className={formElementClassNames}>
        {label ? (
          <label className='slds-form-element__label' htmlFor={id}>
            {label}
            {required ? <abbr className='slds-required'>*</abbr> : undefined}
          </label>
        ) : null}
        <div className={formElementControlClassNames}>
          {children}
          {dropdown}
          {errorMessage ? (
            <span className='slds-form-element__help'>{errorMessage}</span>
          ) : undefined}
        </div>
      </div>
    </FormElementContext.Provider>
  );
};

(FormElement as unknown as { isFormElement: boolean }).isFormElement = true;
