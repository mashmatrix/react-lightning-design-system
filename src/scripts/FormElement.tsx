import React, {
  Ref,
  useContext,
  useMemo,
  ReactNode,
  CSSProperties,
  useRef,
  useCallback,
} from 'react';
import classnames from 'classnames';
import { FieldSetColumnContext } from './FieldSet';
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
  style?: CSSProperties;
  children?: ReactNode;
};

/**
 *
 */
export const FormElement = createFC<
  FormElementProps,
  { isFormElement: boolean }
>(
  (props) => {
    const {
      id,
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

    const controlElRef = useRef<HTMLDivElement>(null);

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

    const onClickLabel = useCallback(() => {
      if (controlElRef.current) {
        const inputEl = controlElRef.current.querySelector<HTMLElement>(
          'input,select,button'
        );
        inputEl?.focus();
      }
    }, []);

    const emptyCtx = useMemo(() => ({}), []);

    return (
      <FieldSetColumnContext.Provider value={emptyCtx}>
        <div ref={elementRef} className={formElementClassNames}>
          {label ? (
            <label
              className='slds-form-element__label'
              htmlFor={id}
              onClick={id ? undefined : onClickLabel}
            >
              {label}
              {required ? <abbr className='slds-required'>*</abbr> : undefined}
            </label>
          ) : null}
          <div ref={controlElRef} className={formElementControlClassNames}>
            {children}
            {dropdown}
            {errorMessage ? (
              <span className='slds-form-element__help'>{errorMessage}</span>
            ) : undefined}
          </div>
        </div>
      </FieldSetColumnContext.Provider>
    );
  },
  { isFormElement: true }
);
