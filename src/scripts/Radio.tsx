import React, { InputHTMLAttributes, Ref, useContext } from 'react';
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
export const Radio: React.FC<RadioProps> = ({
  className,
  label,
  name,
  value,
  inputRef,
  onChange: onChange_,
  ...props
}) => {
  const { name: grpName, onValueChange } = useContext(RadioGroupContext);
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
    <label className={radioClassNames}>
      <input
        ref={inputRef}
        type='radio'
        name={name ?? grpName}
        value={value}
        onChange={onChange}
        {...props}
      />
      <span className='slds-radio_faux' />
      <span className='slds-form-element__label'>{label}</span>
    </label>
  );
};
