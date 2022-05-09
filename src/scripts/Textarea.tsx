import React, {
  ChangeEvent,
  Ref,
  TextareaHTMLAttributes,
  useContext,
  useRef,
} from 'react';
import classnames from 'classnames';
import { FormElement, FormElementProps } from './FormElement';
import { FieldSetColumnContext } from './FieldSet';
import { useEventCallback, useFormElementId } from './hooks';
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
  onValueChange?: (value: string, prevValue?: string) => void;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 *
 */
export const Textarea = createFC<TextareaProps, { isFormElement: boolean }>(
  (props) => {
    const {
      id: id_,
      className,
      label,
      required,
      error,
      cols,
      elementRef,
      textareaRef,
      onChange: onChange_,
      onValueChange,
      ...rprops
    } = props;
    const prevValueRef = useRef<string>();
    const onChange = useEventCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange_?.(e);
      onValueChange?.(e.target.value, prevValueRef.current);
      prevValueRef.current = e.target.value;
    });
    const id = useFormElementId(id_, 'textarea');
    const { isFieldSetColumn } = useContext(FieldSetColumnContext);
    const taClassNames = classnames(className, 'slds-input');
    const textareaElem = (
      <textarea
        id={id}
        ref={textareaRef}
        className={taClassNames}
        {...rprops}
        onChange={onChange}
      />
    );
    if (isFieldSetColumn || label || required || error || cols) {
      const formElemProps = { id, label, required, error, cols, elementRef };
      return <FormElement {...formElemProps}>{textareaElem}</FormElement>;
    }
    return textareaElem;
  },
  { isFormElement: true }
);
