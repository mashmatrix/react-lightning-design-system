import React, { InputHTMLAttributes, useCallback, useContext } from 'react';
import classnames from 'classnames';
import { RadioGroupContext, RadioValueType } from './RadioGroup';

/**
 *
 */
export type RadioProps = {
  label?: string;
  name?: string;
  value?: RadioValueType;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value'>;

/**
 *
 */
export const Radio: React.FC<RadioProps> = ({
  className,
  label,
  name,
  value,
  onChange: onChange_,
  ...props
}) => {
  const { name: grpName, onValueChange } = useContext(RadioGroupContext);
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange_?.(e);
      if (value != null) {
        onValueChange?.(value);
      }
    },
    [onValueChange, onChange_, value]
  );
  const radioClassNames = classnames(className, 'slds-radio');
  return (
    <label className={radioClassNames}>
      <input
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
