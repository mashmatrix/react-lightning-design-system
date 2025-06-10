import React, {
  FC,
  InputHTMLAttributes,
  Ref,
  useContext,
  ReactNode,
} from 'react';
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
  tooltip?: ReactNode;
  tooltipIcon?: string;
  elementRef?: Ref<HTMLDivElement>;
  inputRef?: Ref<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>;

/**
 *
 */
export const Checkbox: FC<CheckboxProps> = (props) => {
  const {
    type, // eslint-disable-line @typescript-eslint/no-unused-vars
    className,
    label,
    required,
    error,
    cols,
    tooltip,
    tooltipIcon,
    elementRef,
    inputRef,
    children,
    ...rprops
  } = props;
  const { grouped } = useContext(CheckboxGroupContext);
  const formElemProps = {
    required,
    error,
    cols,
    tooltip,
    tooltipIcon,
    elementRef,
  };
  const checkClassNames = classnames(className, 'slds-checkbox');
  const check = (
    <label className={checkClassNames}>
      <input ref={inputRef} type='checkbox' {...rprops} />
      <span className='slds-checkbox_faux' />
      <span className='slds-form-element__label'>{label || children}</span>
    </label>
  );
  return grouped ? (
    check
  ) : (
    <FormElement {...formElemProps}>{check}</FormElement>
  );
};
