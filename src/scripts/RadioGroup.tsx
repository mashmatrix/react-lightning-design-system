import React, {
  useId,
  HTMLAttributes,
  Ref,
  createContext,
  useContext,
  useMemo,
  ReactNode,
} from 'react';
import classnames from 'classnames';
import { FieldSetColumnContext } from './FieldSet';
import { TooltipContent } from './TooltipContent';
import { FormElementProps } from './FormElement';
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
  error?: FormElementProps['error'];
  errorId?: string;
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
  tooltip?: ReactNode;
  tooltipIcon?: string;
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
      tooltip,
      tooltipIcon,
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

    const errorId = useId();
    const grpCtx = useMemo(
      () => ({ name, error, errorId, onValueChange }),
      [name, error, errorId, onValueChange]
    );

    return (
      <fieldset
        ref={elementRef}
        className={grpClassNames}
        style={grpStyles}
        role='radiogroup'
        aria-required={required}
        {...rprops}
      >
        <legend className='slds-form-element__label'>
          {required ? (
            <abbr className='slds-required' title='required' aria-hidden='true'>
              *
            </abbr>
          ) : undefined}
          {label}
          {tooltip ? (
            <span className='slds-var-m-left_x-small'>
              <TooltipContent icon={tooltipIcon}>{tooltip}</TooltipContent>
            </span>
          ) : null}
        </legend>
        <div className='slds-form-element__control'>
          <RadioGroupContext.Provider value={grpCtx}>
            {children}
            {errorMessage ? (
              <div
                className='slds-form-element__help'
                id={error ? errorId : undefined}
              >
                {errorMessage}
              </div>
            ) : undefined}
          </RadioGroupContext.Provider>
        </div>
      </fieldset>
    );
  },
  { isFormElement: true }
);
