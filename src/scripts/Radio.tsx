import React, { InputHTMLAttributes } from 'react';
import classnames from 'classnames';

export type RadioProps = {
  className?: string;
  label?: string;
  name?: string;
  value?: string | number;
  checked?: boolean;
  defaultChecked?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Radio: React.FC<RadioProps> = ({
  className,
  label,
  name,
  value,
  checked,
  defaultChecked,
  ...props
}) => {
  const radioClassNames = classnames(className, 'slds-radio');
  return (
    <label className={radioClassNames}>
      <input
        type='radio'
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        {...props}
      />
      <span className='slds-radio--faux' />
      <span className='slds-form-element__label'>{label}</span>
    </label>
  );
};
