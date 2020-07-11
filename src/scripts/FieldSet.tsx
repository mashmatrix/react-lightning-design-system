import React, { Component } from 'react';
import classnames from 'classnames';
import { FormElement } from './FormElement';
import { uuid } from './util';

export type FieldSetProps = {
  className?: string;
  label?: string;
  children?: React.ReactNode;
};

export function FieldSet({
  className,
  label,
  children,
  ...props
}: FieldSetProps) {
  const fsClassNames = classnames(className, 'slds-form--compound');
  return (
    <fieldset className={fsClassNames} {...props}>
      {label ? (
        <legend className='slds-form-element__label'>{label}</legend>
      ) : null}
      <div className='form-element__group'>{children}</div>
    </fieldset>
  );
}

FieldSet.isFormElement = true;

type FieldSetRowProps = {
  className?: string;
  cols?: number;
};

export class FieldSetRow extends Component<FieldSetRowProps> {
  static isFormElement = true;

  renderChild(totalCols: number, child: any) {
    if (child && !child.type.isFormElement) {
      const { id = `form-element-${uuid()}` } = child.props;
      const formElemProps = { id, totalCols, cols: 1 };
      return (
        <FormElement {...formElemProps}>
          {React.cloneElement(child, { id })}
        </FormElement>
      );
    }
    return React.cloneElement(child, { totalCols });
  }

  render() {
    const { className, cols, children } = this.props;
    const totalCols = cols || React.Children.count(children);
    const rowClassNames = classnames(className, 'slds-form-element__row');
    return (
      <div className={rowClassNames}>
        {React.Children.map(children, this.renderChild.bind(this, totalCols))}
      </div>
    );
  }
}

// FieldSet.Row = FieldSetRow;
