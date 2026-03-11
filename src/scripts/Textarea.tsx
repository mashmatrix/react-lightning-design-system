import React, {
  useId,
  useEffect,
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
import { registerStyle } from './util';
import { useEventCallback } from './hooks';
import { createFC } from './common';

/**
 * A workaround for SLDS inconsistency against `Input` described in #513.
 *
 * Remove this style registration if SLDS addresses the inconsistency upstream.
 */
function useInitComponentStyle() {
  useEffect(() => {
    registerStyle('textarea-disabled', [
      [
        '.slds-textarea[disabled]',
        '.slds-textarea.slds-is-disabled',
        '{ color: var(--slds-g-color-neutral-base-50, #444444); }',
      ],
    ]);
  }, []);
}

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
  readOnly?: boolean;
  htmlReadOnly?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 *
 */
export const Textarea = createFC<TextareaProps, { isFormElement: boolean }>(
  (props) => {
    useInitComponentStyle();

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
      htmlReadOnly,
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
      <Text
        id={id}
        type='regular'
        category='body'
        className='slds-form-element__static'
      >
        {rprops.value}
      </Text>
    ) : (
      <textarea
        id={id}
        ref={textareaRef}
        className={taClassNames}
        readOnly={htmlReadOnly}
        {...rprops}
        onChange={onChange}
        aria-describedby={error ? errorId : undefined}
      />
    );
    if (isFieldSetColumn || label || required || error || cols) {
      const formElemProps = {
        controlId: id,
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
