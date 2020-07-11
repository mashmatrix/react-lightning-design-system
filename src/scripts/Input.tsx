import React, { Component, InputHTMLAttributes } from 'react';
import classnames from 'classnames';
import keycoder from 'keycoder';
import { Icon } from './Icon';
import { FormElement, FormElementProps } from './FormElement';
import { Text } from './Text';
import { uuid, registerStyle } from './util';

export type InputProps = {
  id?: string;
  className?: string;
  label?: string;
  required?: boolean;
  error?: FormElementProps['error'];
  totalCols?: number;
  cols?: number;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  bare?: boolean;
  symbolPattern?: string;
  readOnly?: boolean;
  htmlReadOnly?: boolean;
  iconLeft?: string | JSX.Element;
  iconRight?: string | JSX.Element;
  addonLeft?: string;
  addonRight?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef?: (node: HTMLInputElement) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

export class Input extends Component<InputProps> {
  static isFormElement = true;

  constructor(props: Readonly<InputProps>) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.registerIconStyle();
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if (this.props.onChange) {
      this.props.onChange(e, value);
    }
  }

  onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const { symbolPattern, onKeyDown } = this.props;
    if (symbolPattern) {
      const { keyCode, shiftKey } = e;
      const value = keycoder.toCharacter(keyCode, shiftKey);
      if (value && !value.match(new RegExp(symbolPattern))) {
        e.preventDefault();
        return;
      }
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  }

  registerIconStyle() {
    registerStyle('input-icons', [
      // fix styles of double-iconed input
      [
        '.slds-input-has-icon--left-right .slds-input__icon--right',
        '{ left: auto; }',
      ],
    ]);
  }

  renderAddon(content: string) {
    return (
      <Text
        tag='span'
        className='slds-form-element__addon'
        category='body'
        type='regular'
      >
        {content}
      </Text>
    );
  }

  renderIcon(icon: any, align: 'left' | 'right') {
    return React.isValidElement(icon) ? (
      icon
    ) : (
      <Icon
        icon={icon}
        className={classnames(
          'slds-input__icon',
          `slds-input__icon--${align}`,
          'slds-icon-text-default'
        )}
      />
    );
  }

  renderInput(props: InputProps) {
    const {
      id,
      readOnly,
      className,
      inputRef,
      type,
      bare,
      value,
      defaultValue,
      htmlReadOnly,
      ...pprops
    } = props;
    const inputClassNames = classnames(
      className,
      bare ? 'slds-input--bare' : 'slds-input'
    );
    return readOnly ? (
      <Text
        type='regular'
        category='body'
        className='slds-form-element__static'
        id={id}
      >
        {value}
      </Text>
    ) : (
      <input
        ref={inputRef}
        className={inputClassNames}
        id={id}
        type={type}
        value={value}
        defaultValue={defaultValue}
        readOnly={htmlReadOnly}
        {...pprops}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
      />
    );
  }

  render() {
    const {
      id = `input-${uuid()}`,
      label,
      required,
      error,
      readOnly,
      totalCols,
      cols,
      ...props
    } = this.props;
    if (label || required || error || totalCols || cols) {
      const formElemProps = {
        id,
        label,
        required,
        error,
        readOnly,
        totalCols,
        cols,
      };
      return (
        <FormElement {...formElemProps}>
          <Input {...{ id, readOnly, ...props }} />
        </FormElement>
      );
    }
    const { iconLeft, iconRight, addonLeft, addonRight, ...pprops } = props;
    const inputProps = { ...pprops, id, readOnly };
    if (iconLeft || iconRight || addonLeft || addonRight) {
      const wrapperClassName = classnames(
        'slds-form-element__control',
        { 'slds-input-has-icon': iconLeft || iconRight },
        { 'slds-input-has-icon--left-right': iconLeft && iconRight },
        { 'slds-input-has-icon--left': iconLeft },
        { 'slds-input-has-icon--right': iconRight },
        { 'slds-input-has-fixed-addon': addonLeft || addonRight }
      );
      return (
        <div className={wrapperClassName}>
          {addonLeft ? this.renderAddon(addonLeft) : undefined}
          {iconLeft ? this.renderIcon(iconLeft, 'left') : undefined}
          {this.renderInput(inputProps)}
          {iconRight ? this.renderIcon(iconRight, 'right') : undefined}
          {addonRight ? this.renderAddon(addonRight) : undefined}
        </div>
      );
    }
    return this.renderInput(inputProps);
  }
}
