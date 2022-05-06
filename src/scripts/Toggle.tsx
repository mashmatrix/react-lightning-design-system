import React, { FC, InputHTMLAttributes, useRef } from 'react';
import classnames from 'classnames';
import { FormElement, FormElementProps } from './FormElement';
import { useFormElementId } from './hooks';

/**
 *
 */
export type ToggleProps = {
  label?: string;
  required?: boolean;
  error?: FormElementProps['error'];
  cols?: number;
  name?: string;
} & InputHTMLAttributes<HTMLInputElement>;

/**
 *
 */
export const Toggle: FC<ToggleProps> = (props) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const { id: id_, className, label, required, error, cols, ...rprops } = props;
  const id = useFormElementId(id_, 'toggle');
  const toggleClassNames = classnames(
    className,
    'slds-checkbox_toggle slds-grid'
  );
  const toggle = (
    <label className={toggleClassNames}>
      <input
        id={id}
        name='checkbox'
        type='checkbox'
        aria-describedby='toggle-desc'
        {...rprops}
      />
      <span className='slds-checkbox_faux_container' aria-live='assertive'>
        <span className='slds-checkbox_faux' />
        <span className='slds-checkbox_on'>Enabled</span>
        <span className='slds-checkbox_off'>Disabled</span>
      </span>
    </label>
  );
  const formElemProps = { id, label, required, error, cols };
  return (
    <FormElement formElementRef={nodeRef} {...formElemProps}>
      {toggle}
    </FormElement>
  );
};

(Toggle as unknown as { isFormElement?: boolean }).isFormElement = true;
