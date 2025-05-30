import React, { ChangeEvent, InputHTMLAttributes, Ref } from 'react';
import classnames from 'classnames';
import { FormElement, FormElementProps } from './FormElement';
import { useEventCallback } from './hooks';
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
  onValueChange?: (checked: boolean) => void;
} & InputHTMLAttributes<HTMLInputElement>;

/**
 *
 */
export const Toggle = createFC<ToggleProps, { isFormElement: boolean }>(
  (props) => {
    const {
      id,
      className,
      label,
      required,
      error,
      cols,
      elementRef,
      inputRef,
      onChange: onChange_,
      onValueChange,
      ...rprops
    } = props;
    const onChange = useEventCallback((e: ChangeEvent<HTMLInputElement>) => {
      onChange_?.(e);
      onValueChange?.(e.target.checked);
    });
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
          onChange={onChange}
        />
        <span className='slds-checkbox_faux_container'>
          <span className='slds-checkbox_faux' />
          <span className='slds-checkbox_on'>Enabled</span>
          <span className='slds-checkbox_off'>Disabled</span>
        </span>
      </label>
    );
    const formElemProps = {
      controlId: id,
      label,
      required,
      error,
      cols,
      elementRef,
    };
    return <FormElement {...formElemProps}>{toggle}</FormElement>;
  },
  { isFormElement: true }
);
