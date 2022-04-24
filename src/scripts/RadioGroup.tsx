import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';

export type RadioGroupProps<ValueType extends string | number> = {
  label?: string;
  required?: boolean;
  error?: any; // FIXME: should be FormElementProps.error
  name?: string;
  totalCols?: number;
  cols?: number;
  onValueChange?: (value: ValueType) => void;
} & HTMLAttributes<HTMLFieldSetElement>;

export class RadioGroup<
  ValueType extends string | number
> extends React.Component<RadioGroupProps<ValueType>, {}> {
  static isFormElement = true;

  onControlChange(value: ValueType) {
    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  }

  renderControl = (radio: any) => {
    return this.props.name
      ? React.cloneElement(radio, {
          name: this.props.name,
          onChange: this.onControlChange.bind(this, radio.props.value),
        })
      : radio;
  };

  render() {
    const {
      className,
      label,
      required,
      error,
      totalCols,
      cols,
      style,
      children,
      onChange, // eslint-disable-line @typescript-eslint/no-unused-vars
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
        ? `slds-size_${cols || 1}-of-${totalCols}`
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

    return (
      <fieldset className={grpClassNames} style={grpStyles} {...props}>
        <legend className='slds-form-element__label'>
          {label}
          {required ? <abbr className='slds-required'>*</abbr> : undefined}
        </legend>
        <div className='slds-form-element__control'>
          {React.Children.map(children, this.renderControl)}
          {errorMessage ? (
            <div className='slds-form-element__help'>{errorMessage}</div>
          ) : undefined}
        </div>
      </fieldset>
    );
  }
}
