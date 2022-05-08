import React, { InputHTMLAttributes, Ref } from 'react';
import classnames from 'classnames';
import { FormElement, FormElementProps } from './FormElement';
import { useFormElementId } from './hooks';
import { createFC } from './common';

/**
 *
 */
export type ToggleProps = {
  label?: string;
  required?: boolean;
  error?: FormElementProps['error'];
  cols?: number;
  name?: string;
  elementRef?: Ref<HTMLDivElement>;
  inputRef?: Ref<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>;

/**
 *
 */
export const Toggle = createFC<ToggleProps, { isFormElement: boolean }>(
  (props) => {
    const {
      id: id_,
      className,
      label,
      required,
      error,
      cols,
      elementRef,
      inputRef,
      ...rprops
    } = props;
    const id = useFormElementId(id_, 'toggle');
    const toggleClassNames = classnames(
      className,
      'slds-checkbox_toggle slds-grid'
    );
    const toggle = (
      <label className={toggleClassNames}>
        <input
          ref={inputRef}
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
    const formElemProps = { id, label, required, error, cols, elementRef };
    return <FormElement {...formElemProps}>{toggle}</FormElement>;
  },
  { isFormElement: true }
);
