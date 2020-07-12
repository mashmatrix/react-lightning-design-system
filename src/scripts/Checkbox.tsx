import React, { Component, InputHTMLAttributes } from 'react';
import classnames from 'classnames';
import { FormElement, FormElementProps } from './FormElement';

export type CheckboxProps = {
  label?: string;
  required?: boolean;
  error?: FormElementProps['error'];
  totalCols?: number;
  cols?: number;
  grouped?: boolean;
  name?: string;
  value?: string | number;
  checked?: boolean;
  defaultChecked?: boolean;
  checkboxRef?: (node: HTMLLabelElement | null) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export class Checkbox extends Component<CheckboxProps> {
  node: HTMLDivElement | HTMLLabelElement | null = null;

  componentWillReceiveProps(nextProps: Readonly<CheckboxProps>) {
    if (this.node) {
      const input = this.node.getElementsByTagName('input')[0];
      if (
        nextProps.defaultChecked !== undefined &&
        nextProps.defaultChecked !== input.checked
      ) {
        input.checked = nextProps.defaultChecked;
      }
    }
  }

  renderCheckbox({ className, label, checkboxRef, ...props }: CheckboxProps) {
    const checkClassNames = classnames(className, 'slds-checkbox');
    return (
      <label
        ref={(node) => {
          this.node = node;
          if (checkboxRef) checkboxRef(node);
        }}
        className={checkClassNames}
      >
        <input type='checkbox' {...props} />
        <span className='slds-checkbox--faux' />
        <span className='slds-form-element__label'>{label}</span>
      </label>
    );
  }

  render() {
    const { grouped, required, error, totalCols, cols, ...props } = this.props;
    const formElemProps = { required, error, totalCols, cols };
    return grouped ? (
      this.renderCheckbox(props)
    ) : (
      <FormElement
        formElementRef={(node) => (this.node = node)}
        {...formElemProps}
      >
        {this.renderCheckbox(props)}
      </FormElement>
    );
  }
}
