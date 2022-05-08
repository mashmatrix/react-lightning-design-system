import React, { Ref, TextareaHTMLAttributes, useContext } from 'react';
import classnames from 'classnames';
import { FormElement, FormElementProps } from './FormElement';
import { FieldSetColumnContext } from './FieldSet';
import { useFormElementId } from './hooks';
import { createFC } from './common';

/**
 *
 */
export type TextareaProps = {
  label?: string;
  required?: boolean;
  error?: FormElementProps['error'];
  cols?: number;
  elementRef?: Ref<HTMLDivElement>;
  textareaRef?: Ref<HTMLTextAreaElement>;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 *
 */
export const Textarea = createFC<TextareaProps, { isFormElement: boolean }>(
  (props) => {
    const {
      id: id_,
      label,
      required,
      error,
      cols,
      elementRef,
      ...rprops
    } = props;
    const id = useFormElementId(id_, 'textarea');
    const { totalCols } = useContext(FieldSetColumnContext);
    if (label || required || error || totalCols || cols) {
      const formElemProps = {
        id,
        label,
        required,
        error,
        cols,
        elementRef,
      };
      return (
        <FormElement {...formElemProps}>
          <Textarea {...{ ...rprops, id }} />
        </FormElement>
      );
    }
    const { className, textareaRef, ...rprops2 } = rprops;
    const taClassNames = classnames(className, 'slds-input');
    return (
      <textarea
        id={id}
        ref={textareaRef}
        className={taClassNames}
        {...rprops2}
      />
    );
  },
  { isFormElement: true }
);
