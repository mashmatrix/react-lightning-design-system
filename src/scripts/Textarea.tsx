import React, { Component, TextareaHTMLAttributes } from 'react';
import classnames from 'classnames';
import { FormElement, FormElementProps } from './FormElement';
import { uuid } from './util';

export type TextareaProps = {
  id?: string;
  className?: string;
  label?: string;
  required?: boolean;
  error?: FormElementProps['error'];
  totalCols?: number;
  cols?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>, value: string) => void;
  textareaRef?: (...args: any[]) => any;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

type TextareaState = {
  id: string;
};

export class Textarea extends Component<TextareaProps, TextareaState> {
  static isFormElement = true;

  constructor(props: Readonly<TextareaProps>) {
    super(props);
    this.state = { id: `form-element-${uuid()}` };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { value } = e.target;
    if (this.props.onChange) {
      this.props.onChange(e, value);
    }
  }

  render() {
    const id = this.props.id || this.state.id;
    const { label, required, error, totalCols, cols, ...props } = this.props;
    if (label || required || error || totalCols || cols) {
      const formElemProps = { id, label, required, error, totalCols, cols };
      return (
        <FormElement {...formElemProps}>
          <Textarea {...{ ...props, id }} />
        </FormElement>
      );
    }
    const {
      className,
      textareaRef,
      onChange, // eslint-disable-line @typescript-eslint/no-unused-vars
      ...pprops
    } = props;
    const taClassNames = classnames(className, 'slds-input');
    return (
      <textarea
        id={id}
        ref={textareaRef}
        className={taClassNames}
        onChange={this.onChange}
        {...pprops}
      />
    );
  }
}
