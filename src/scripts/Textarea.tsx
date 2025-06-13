import React, {
  useId,
  ChangeEvent,
  ReactNode,
  Ref,
  TextareaHTMLAttributes,
  useContext,
  useRef,
} from 'react';
import classnames from 'classnames';
import { Text } from './Text';
import { FormElement, FormElementProps } from './FormElement';
import { FieldSetColumnContext } from './FieldSet';
import { useEventCallback } from './hooks';
import { createFC } from './common';

/**
 *
 */
export type TextareaProps = {
  label?: string;
  required?: boolean;
  error?: FormElementProps['error'];
  cols?: number;
  tooltip?: ReactNode;
  tooltipIcon?: string;
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
      id,
      className,
      label,
      required,
      error,
      cols,
      tooltip,
      tooltipIcon,
      elementRef,
      textareaRef,
      onChange: onChange_,
      onValueChange,
      readOnly,
      ...rprops
    } = props;
    const prevValueRef = useRef<string>();
    const onChange = useEventCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange_?.(e);
      onValueChange?.(e.target.value, prevValueRef.current);
      prevValueRef.current = e.target.value;
    });
    const { isFieldSetColumn } = useContext(FieldSetColumnContext);
    const errorId = useId();
    const taClassNames = classnames(className, 'slds-textarea');
    const textareaElem = readOnly ? (
      <Text type='regular' category='body'>
        {rprops.value}
      </Text>
    ) : (
      <textarea
        id={id}
        ref={textareaRef}
        className={taClassNames}
        {...rprops}
        onChange={onChange}
        aria-describedby={error ? errorId : undefined}
      />
    );
    if (isFieldSetColumn || label || required || error || cols) {
      const formElemProps = {
        htmlFor: id,
        label,
        required,
        error,
        errorId,
        cols,
        tooltip,
        tooltipIcon,
        elementRef,
        readOnly,
      };
      return <FormElement {...formElemProps}>{textareaElem}</FormElement>;
    }
    return textareaElem;
  },
  { isFormElement: true }
);
