import React, {
  SelectHTMLAttributes,
  OptionHTMLAttributes,
  Ref,
  useContext,
  useRef,
  ChangeEvent,
} from 'react';
import classnames from 'classnames';
import { FormElement, FormElementProps } from './FormElement';
import { FieldSetColumnContext } from './FieldSet';
import { useEventCallback, useFormElementId } from './hooks';
import { createFC } from './common';

/**
 *
 */
export type SelectProps = {
  label?: string;
  required?: boolean;
  cols?: number;
  error?: FormElementProps['error'];
  elementRef?: Ref<HTMLDivElement>;
  selectRef?: Ref<HTMLSelectElement>;
  onValueChange?: (value: string, prevValue?: string) => void;
} & SelectHTMLAttributes<HTMLSelectElement>;

/**
 *
 */
export const Select = createFC<SelectProps, { isFormElement: boolean }>(
  (props) => {
    const {
      id: id_,
      className,
      label,
      required,
      error,
      cols,
      elementRef,
      selectRef,
      children,
      onChange: onChange_,
      onValueChange,
      ...rprops
    } = props;
    const id = useFormElementId(id_, 'select');
    const { isFieldSetColumn } = useContext(FieldSetColumnContext);
    const prevValueRef = useRef<string>();
    const onChange = useEventCallback((e: ChangeEvent<HTMLSelectElement>) => {
      onChange_?.(e);
      onValueChange?.(e.target.value, prevValueRef.current);
      prevValueRef.current = e.target.value;
    });
    const selectClassNames = classnames(className, 'slds-select');
    const selectElem = (
      <select
        ref={selectRef}
        id={id}
        className={selectClassNames}
        onChange={onChange}
        {...rprops}
      >
        {children}
      </select>
    );
    if (isFieldSetColumn || label || required || error || cols) {
      const formElemProps = { id, label, required, error, cols, elementRef };
      return <FormElement {...formElemProps}>{selectElem}</FormElement>;
    }
    return selectElem;
  },
  { isFormElement: true }
);

/**
 *
 */
export type OptionProps = OptionHTMLAttributes<HTMLOptionElement>;

/**
 *
 */
export const Option: React.FC<OptionProps> = (props) => {
  const { label, children, ...rprops } = props;
  return <option {...rprops}>{label || children}</option>;
};
