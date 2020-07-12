import React, { Component, TextareaHTMLAttributes } from 'react';
import classnames from 'classnames';
import { FormElement, FormElementProps } from './FormElement';
import { uuid } from './util';

export type TextareaProps = {
  label?: string;
  required?: boolean;
  error?: FormElementProps['error'];
  totalCols?: number;
  cols?: number;
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
    const { className, textareaRef, ...pprops } = props;
    const taClassNames = classnames(className, 'slds-input');
    return (
      <textarea
        id={id}
        ref={textareaRef}
        className={taClassNames}
        {...pprops}
      />
    );
  }
}
