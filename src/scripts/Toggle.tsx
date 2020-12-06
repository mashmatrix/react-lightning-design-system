import React, { Component, InputHTMLAttributes } from 'react';
import classnames from 'classnames';
import { FormElement, FormElementProps } from './FormElement';

export type ToggleProps = {
  label?: string;
  required?: boolean;
  error?: FormElementProps['error'];
  totalCols?: number;
  cols?: number;
  name?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export class Toggle extends Component<ToggleProps> {
  node: HTMLDivElement | null = null;

  renderToggle({ className, label, ...props }: ToggleProps) {
    const toggleClassNames = classnames(
      className,
      'slds-checkbox_toggle slds-grid'
    );
    return (
      <label className={toggleClassNames}>
        <span className='slds-form-element__label slds-m-bottom_none'>
          {label}
        </span>
        <input
          name='checkbox'
          type='checkbox'
          aria-describedby='toggle-desc'
          {...props}
        />
        <span className='slds-checkbox_faux_container' aria-live='assertive'>
          <span className='slds-checkbox_faux' />
          <span className='slds-checkbox_on'>Enabled</span>
          <span className='slds-checkbox_off'>Disabled</span>
        </span>
      </label>
    );
  }

  render() {
    const { required, error, totalCols, cols, ...props } = this.props;
    const formElemProps = { required, error, totalCols, cols };
    return (
      <FormElement
        formElementRef={(node) => (this.node = node)}
        {...formElemProps}
      >
        {this.renderToggle(props)}
      </FormElement>
    );
  }
}
