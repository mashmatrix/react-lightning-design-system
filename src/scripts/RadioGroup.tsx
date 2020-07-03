import React from 'react';
import classnames from 'classnames';

export type RadioGroupProps = {
  className?: string;
  label?: string;
  required?: boolean;
  error?: any; // FIXME: should be FormElementProps.error
  name?: string;
  onChange?: (e: any, value: any) => void;
  totalCols?: number;
  cols?: number;
  style?: object;
};

export class RadioGroup extends React.Component<RadioGroupProps, {}> {
  static isFormElement = true;

  constructor(props: Readonly<RadioGroupProps>) {
    super(props);
    this.renderControl = this.renderControl.bind(this);
  }

  onControlChange(value: any, e: any) {
    if (this.props.onChange) {
      this.props.onChange(e, value);
    }
  }

  renderControl(radio: any) {
    return this.props.name
      ? React.cloneElement(radio, {
          name: this.props.name,
          onChange: this.onControlChange.bind(this, radio.props.value),
        })
      : radio;
  }

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

    return (
      <fieldset className={grpClassNames} style={grpStyles} {...props}>
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
