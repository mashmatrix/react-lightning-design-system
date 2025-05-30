import React, {
  SelectHTMLAttributes,
  OptionHTMLAttributes,
  Ref,
  useContext,
  useRef,
  ChangeEvent,
  FC,
  ReactNode,
} from 'react';
import classnames from 'classnames';
import { FormElement, FormElementProps } from './FormElement';
import { FieldSetColumnContext } from './FieldSet';
import { useEventCallback } from './hooks';
import { createFC } from './common';

/**
 *
 */
export type SelectProps = {
  label?: string;
  required?: boolean;
  cols?: number;
  error?: FormElementProps['error'];
  tooltip?: ReactNode;
  tooltipIcon?: string;
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
      id,
      className,
      label,
      required,
      error,
      cols,
      tooltip,
      tooltipIcon,
      elementRef,
      selectRef,
      children,
      onChange: onChange_,
      onValueChange,
      ...rprops
    } = props;
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
      const formElemProps = {
        controlId: id,
        label,
        required,
        error,
        cols,
        tooltip,
        tooltipIcon,
        elementRef,
      };
      return (
        <FormElement {...formElemProps}>
          {rprops.multiple ? (
            selectElem
          ) : (
            <div className='slds-select_container'>{selectElem}</div>
          )}
        </FormElement>
      );
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
export const Option: FC<OptionProps> = (props) => {
  const { label, children, ...rprops } = props;
  return <option {...rprops}>{label || children}</option>;
};
