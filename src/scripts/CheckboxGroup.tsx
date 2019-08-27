import React, { FieldsetHTMLAttributes } from 'react';
import classnames from 'classnames';
import { FormElementProps } from './FormElement';

export type CheckboxGroupProps = {
  className?: string;
  label?: string;
  required?: boolean;
  error?: FormElementProps['error'];
  name?: string;
  totalCols?: number;
  cols?: number;
  style?: object;
  onChange?: (
    e: React.FormEvent<HTMLFieldSetElement>,
    values: (string | number)[]
  ) => void;
} & FieldsetHTMLAttributes<HTMLFieldSetElement>;

export default class CheckboxGroup extends React.Component<CheckboxGroupProps> {
  // eslint-disable-next-line react/sort-comp
  [key: string]: any;

  static isFormElement = true;

  constructor(props: Readonly<CheckboxGroupProps>) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.renderControl = this.renderControl.bind(this);
  }

  onChange(e: React.FormEvent<HTMLFieldSetElement>) {
    if (this.props.onChange) {
      const values: (string | number)[] = [];
      React.Children.forEach(this.props.children, (check: any, i) => {
        const el = check.props.ref || this[`check${i + 1}`];
        const checkEl = el && el.querySelector('input[type=checkbox]');
        if (checkEl && checkEl.checked) {
          values.push(check.props.value);
        }
      });
      this.props.onChange(e, values);
    }
  }

  renderControl(checkbox: any, i: number) {
    const props: any = { grouped: true };
    if (checkbox.props.ref) {
      props.ref = checkbox.props.ref;
    } else {
      props.checkboxRef = (node: any) => (this[`check${i + 1}`] = node);
    }
    if (this.props.name) {
      props.name = this.props.name;
    }
    return React.cloneElement(checkbox, props);
  }

  render() {
    const {
      className,
      label,
      totalCols,
      cols,
      style,
      required,
      error,
      children,
      ...props
    } = this.props;
    const grpClassNames = classnames(
      className,
      'slds-form-element',
      {
        'slds-has-error': error,
        'slds-is-required': required,
      },
      typeof totalCols === 'number'
        ? `slds-size--${cols || 1}-of-${totalCols}`
        : null
    );
    const grpStyles =
      typeof totalCols === 'number'
        ? { display: 'inline-block', ...style }
        : style;
    const errorMessage = error
      ? typeof error === 'string'
        ? error
        : typeof error === 'object'
        ? error.message
        : undefined
      : undefined;

    delete props.onChange;
    return (
      <fieldset
        className={grpClassNames}
        style={grpStyles}
        onChange={this.onChange}
        {...props}
      >
        <legend className='slds-form-element__label slds-form-element__label--top'>
          {label}
          {required ? <abbr className='slds-required'>*</abbr> : undefined}
        </legend>
        <div className='slds-form-element__control'>
          {React.Children.map(children, this.renderControl)}
          {errorMessage ? (
            <div className='slds-form-element__help'>{errorMessage}</div>
          ) : (
            undefined
          )}
        </div>
      </fieldset>
    );
  }
}
