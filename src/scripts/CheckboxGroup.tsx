import React, {
  createContext,
  FC,
  FieldsetHTMLAttributes,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react';
import classnames from 'classnames';
import { FormElementProps } from './FormElement';
import { FieldSetColumnContext } from './FieldSet';

/**
 *
 */
export type CheckboxValueType = string | number;

/**
 *
 */
export const CheckboxGroupContext = createContext<{ grouped?: boolean }>({});

/**
 *
 */
export type CheckboxGroupProps = {
  label?: string;
  required?: boolean;
  error?: FormElementProps['error'];
  name?: string;
  cols?: number;
  onValueChange?: (values: CheckboxValueType[]) => void;
} & FieldsetHTMLAttributes<HTMLFieldSetElement>;

/**
 *
 */
export const CheckboxGroup: FC<CheckboxGroupProps> = (props) => {
  const {
    className,
    label,
    cols,
    style,
    required,
    error,
    onValueChange,
    onChange: onChange_,
    children,
    ...rprops
  } = props;
  const { totalCols } = useContext(FieldSetColumnContext);
  const controlElRef = useRef<HTMLDivElement | null>(null);

  const onChange = useCallback(
    (e: React.FormEvent<HTMLFieldSetElement>) => {
      if (onValueChange) {
        const checkboxes =
          controlElRef.current?.querySelectorAll<HTMLInputElement>(
            'input[type=checkbox]'
          );
        if (!checkboxes) {
          return;
        }
        const values = [...checkboxes]
          .filter((checkbox) => checkbox.checked)
          .map((checkbox) => checkbox.value);
        onValueChange?.(values);
      }
      onChange_?.(e);
    },
    [onChange_, onValueChange]
  );

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
  const grpCtx = useMemo(() => ({ grouped: true }), []);

  return (
    <fieldset
      className={grpClassNames}
      style={grpStyles}
      {...rprops}
      onChange={onChange}
    >
      <legend className='slds-form-element__label'>
        {label}
        {required ? <abbr className='slds-required'>*</abbr> : undefined}
      </legend>
      <div className='slds-form-element__control' ref={controlElRef}>
        <CheckboxGroupContext.Provider value={grpCtx}>
          {children}
        </CheckboxGroupContext.Provider>
        {errorMessage ? (
          <div className='slds-form-element__help'>{errorMessage}</div>
        ) : undefined}
      </div>
    </fieldset>
  );
};

(CheckboxGroup as unknown as { isFormElement?: boolean }).isFormElement = true;
