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
    const { onChange: onChange_, onValueChange } = props;
    const prevValueRef = useRef<string>();
    const onChange = useEventCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange_?.(e);
      onValueChange?.(e.target.value, prevValueRef.current);
      prevValueRef.current = e.target.value;
    });
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
          <Textarea {...{ ...rprops, id, onChange }} />
        </FormElement>
      );
    }
    const {
      className,
      textareaRef,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onChange: _unused_1,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onValueChange: _unused_2,
      ...rprops2
    } = rprops;
    const taClassNames = classnames(className, 'slds-input');
    return (
      <textarea
        id={id}
        ref={textareaRef}
        className={taClassNames}
        {...rprops2}
        onChange={onChange}
      />
    );
  },
  { isFormElement: true }
);
