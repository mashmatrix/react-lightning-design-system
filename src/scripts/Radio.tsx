import React, { InputHTMLAttributes } from 'react';
import classnames from 'classnames';

export type RadioProps = {
  label?: string;
  name?: string;
  value?: string | number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value'>;

export const Radio: React.FC<RadioProps> = ({
  className,
  label,
  name,
  value,
  ...props
}) => {
  const radioClassNames = classnames(className, 'slds-radio');
  return (
    <label className={radioClassNames}>
      <input type='radio' name={name} value={value} {...props} />
      <span className='slds-radio_faux' />
      <span className='slds-form-element__label'>{label}</span>
    </label>
  );
};
