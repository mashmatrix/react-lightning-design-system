import React, { FC, InputHTMLAttributes, Ref, useId, useContext } from 'react';
import classnames from 'classnames';
import { RadioGroupContext, RadioValueType } from './RadioGroup';
import { useEventCallback } from './hooks';

/**
 *
 */
export type RadioProps = {
  label?: string;
  name?: string;
  value?: RadioValueType;
  inputRef?: Ref<HTMLInputElement>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value'>;

/**
 *
 */
export const Radio: FC<RadioProps> = ({
  id: id_,
  className,
  label,
  name,
  value,
  inputRef,
  onChange: onChange_,
  children,
  ...props
}) => {
  const {
    name: grpName,
    error,
    errorId,
    onValueChange,
  } = useContext(RadioGroupContext);

  const prefix = useId();
  const id = id_ ?? `${prefix}-id`;

  const onChange = useEventCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange_?.(e);
      if (value != null) {
        onValueChange?.(value);
      }
    }
  );
  const radioClassNames = classnames(className, 'slds-radio');
  return (
    <span className={radioClassNames}>
      <input
        ref={inputRef}
        type='radio'
        name={name ?? grpName}
        value={value}
        onChange={onChange}
        {...props}
        id={id}
        aria-describedby={error ? errorId : undefined}
      />
      <label className='slds-radio__label' htmlFor={id}>
        <span className='slds-radio_faux' />
        <span className='slds-form-element__label'>{label || children}</span>
      </label>
    </span>
  );
};
