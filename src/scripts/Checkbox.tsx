import React, {
  FC,
  InputHTMLAttributes,
  Ref,
  useId,
  useContext,
  ReactNode,
} from 'react';
import classnames from 'classnames';
import { FormElement } from './FormElement';
import { CheckboxGroupContext, CheckboxValueType } from './CheckboxGroup';

/**
 *
 */
export type CheckboxProps = {
  label?: string;
  required?: boolean;
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
    id: id_,
    className,
    label,
    required,
    cols,
    tooltip,
    tooltipIcon,
    elementRef,
    inputRef,
    children,
    ...rprops
  } = props;

  const prefix = useId();
  const id = id_ ?? `${prefix}-id`;

  const { grouped, error, errorId } = useContext(CheckboxGroupContext);
  const formElemProps = {
    required,
    error,
    errorId,
    cols,
    tooltip,
    tooltipIcon,
    elementRef,
  };
  const checkClassNames = classnames(className, 'slds-checkbox');
  const check = (
    <div className={checkClassNames}>
      <input
        ref={inputRef}
        type='checkbox'
        {...rprops}
        id={id}
        aria-describedby={error ? errorId : undefined}
      />
      <label className='slds-checkbox__label' htmlFor={id}>
        <span className='slds-checkbox_faux' />
        <span className='slds-form-element__label'>{label || children}</span>
      </label>
    </div>
  );
  return grouped ? (
    check
  ) : (
    <FormElement {...formElemProps}>{check}</FormElement>
  );
};
