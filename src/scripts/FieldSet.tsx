import React, { Component } from 'react';
import classnames from 'classnames';
import { FormElement } from './FormElement';
import { uuid } from './util';

export type FieldSetProps = {
  className?: string;
  label?: string;
};

export const FieldSet: React.FC<FieldSetProps> = ({
  className,
  label,
  children,
  ...props
}) => {
  const fsClassNames = classnames(className, 'slds-form--compound');
  return (
    <fieldset className={fsClassNames} {...props}>
      {label ? (
        <legend className='slds-form-element__label'>{label}</legend>
      ) : null}
      <div className='form-element__group'>{children}</div>
    </fieldset>
  );
};

(FieldSet as any).isFormElement = true;

type RowProps = {
  className?: string;
  cols?: number;
};

class Row extends Component<RowProps> {
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

(FieldSet as any).Row = Row;
