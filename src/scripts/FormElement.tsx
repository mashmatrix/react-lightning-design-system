import React, { Ref, createContext, useContext, useMemo } from 'react';
import classnames from 'classnames';
import { FieldSetColumnContext } from './FieldSet';
import { useFormElementId } from './hooks';
import { createFC } from './common';

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
  elementRef?: Ref<HTMLDivElement>;
  style?: object;
};

/**
 *
 */
export const FormElementContext = createContext<{ id?: string }>({});

/**
 *
 */
export const FormElement = createFC<
  FormElementProps,
  { isFormElement: boolean }
>(
  (props) => {
    const {
      id: id_,
      className,
      cols = 1,
      elementRef,
      label,
      required,
      error,
      dropdown,
      children,
      readOnly,
    } = props;

    const id = useFormElementId(id_);

    const { totalCols } = useContext(FieldSetColumnContext);

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
      typeof totalCols === 'number'
        ? `slds-size_${cols}-of-${totalCols}`
        : null,
      className
    );

    const formElemCtx = useMemo(() => ({ id }), [id]);
    const emptyCtx = useMemo(() => ({}), []);

    return (
      <FormElementContext.Provider value={formElemCtx}>
        <FieldSetColumnContext.Provider value={emptyCtx}>
          <div ref={elementRef} className={formElementClassNames}>
            {label ? (
              <label className='slds-form-element__label' htmlFor={id}>
                {label}
                {required ? (
                  <abbr className='slds-required'>*</abbr>
                ) : undefined}
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
        </FieldSetColumnContext.Provider>
      </FormElementContext.Provider>
    );
  },
  { isFormElement: true }
);
