import React, {
  createContext,
  FC,
  HTMLAttributes,
  useContext,
  useMemo,
} from 'react';
import classnames from 'classnames';
import { FieldSetColumnContext } from './FieldSet';

/**
 *
 */
export type RadioValueType = string | number;

/**
 *
 */
export const RadioGroupContext = createContext<{
  name?: string;
  onValueChange?: (value: RadioValueType) => void;
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
  onValueChange?: (value: RadioValueType) => void;
} & HTMLAttributes<HTMLFieldSetElement>;

/**
 *
 */
export const RadioGroup: FC<RadioGroupProps> = (props) => {
  const {
    className,
    label,
    required,
    error,
    cols,
    style,
    children,
    name,
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
    <fieldset className={grpClassNames} style={grpStyles} {...rprops}>
      <legend className='slds-form-element__label'>
        {label}
        {required ? <abbr className='slds-required'>*</abbr> : undefined}
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
};

(RadioGroup as unknown as { isFormElement?: boolean }).isFormElement = true;
