import React, {
  HTMLAttributes,
  Ref,
  createContext,
  useContext,
  useMemo,
} from 'react';
import classnames from 'classnames';
import { FieldSetColumnContext } from './FieldSet';
import { createFC } from './common';
import { Bivariant } from './typeUtils';

/**
 *
 */
export type RadioValueType = string | number;

/**
 *
 */
export const RadioGroupContext = createContext<{
  name?: string;
  onValueChange?: Bivariant<(value: RadioValueType) => void>;
}>({});

/**
 *
 */
export type RadioGroupProps = {
  label?: string;
  required?: boolean;
  error?: boolean | string | { message: string };
  name?: string;
  cols?: number;
  elementRef?: Ref<HTMLFieldSetElement>;
  onValueChange?: Bivariant<(value: RadioValueType) => void>;
} & HTMLAttributes<HTMLFieldSetElement>;

/**
 *
 */
export const RadioGroup = createFC<RadioGroupProps, { isFormElement: boolean }>(
  (props) => {
    const {
      className,
      label,
      required,
      error,
      cols,
      style,
      children,
      name,
      elementRef,
      onValueChange,
      ...rprops
    } = props;
    const { totalCols } = useContext(FieldSetColumnContext);
    const grpClassNames = classnames(
      className,
      'slds-form-element',
      {
        'slds-has-error': error,
        'slds-is-required': required,
      },
      typeof totalCols === 'number'
        ? `slds-size_${cols || 1}-of-${totalCols}`
        : null
    );
    const grpStyles =
      typeof totalCols === 'number'
        ? { display: 'inline-block', ...style }
        : style;
    const errorMessage = error
      ? typeof error === 'string'
        ? error
        : typeof error === 'object'
        ? error.message
        : undefined
      : undefined;
    const grpCtx = useMemo(
      () => ({ name, onValueChange }),
      [name, onValueChange]
    );

    return (
      <fieldset
        ref={elementRef}
        className={grpClassNames}
        style={grpStyles}
        {...rprops}
      >
        <legend className='slds-form-element__label'>
          {required ? (
            <abbr className='slds-required' title='required'>
              *
            </abbr>
          ) : undefined}
          {label}
        </legend>
        <div className='slds-form-element__control'>
          <RadioGroupContext.Provider value={grpCtx}>
            {children}
            {errorMessage ? (
              <div className='slds-form-element__help'>{errorMessage}</div>
            ) : undefined}
          </RadioGroupContext.Provider>
        </div>
      </fieldset>
    );
  },
  { isFormElement: true }
);
