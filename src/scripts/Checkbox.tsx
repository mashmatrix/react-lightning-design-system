import React, { FC, InputHTMLAttributes, Ref, useContext } from 'react';
import classnames from 'classnames';
import { FormElement, FormElementProps } from './FormElement';
import { CheckboxGroupContext, CheckboxValueType } from './CheckboxGroup';

/**
 *
 */
export type CheckboxProps = {
  label?: string;
  required?: boolean;
  error?: FormElementProps['error'];
  cols?: number;
  name?: string;
  value?: CheckboxValueType;
  checked?: boolean;
  defaultChecked?: boolean;
  checkboxRef?: Ref<HTMLLabelElement>;
} & InputHTMLAttributes<HTMLInputElement>;

/**
 *
 */
export const Checkbox: FC<CheckboxProps> = (props) => {
  const { className, label, required, error, cols, checkboxRef, ...rprops } =
    props;
  const { grouped } = useContext(CheckboxGroupContext);
  const formElemProps = { required, error, cols };
  const checkClassNames = classnames(className, 'slds-checkbox');
  const check = (
    <label ref={checkboxRef} className={checkClassNames}>
      <input type='checkbox' {...rprops} />
      <span className='slds-checkbox_faux' />
      <span className='slds-form-element__label'>{label}</span>
    </label>
  );
  return grouped ? (
    check
  ) : (
    <FormElement {...formElemProps}>{check}</FormElement>
  );
};
