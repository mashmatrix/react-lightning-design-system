import React, {
  SelectHTMLAttributes,
  OptionHTMLAttributes,
  useContext,
} from 'react';
import classnames from 'classnames';
import { FormElement, FormElementProps } from './FormElement';
import { FieldSetColumnContext } from './FieldSet';
import { useFormElementId } from './hooks';
import { createFC } from './common';

/**
 *
 */
export type SelectProps = {
  label?: string;
  required?: boolean;
  cols?: number;
  error?: FormElementProps['error'];
} & SelectHTMLAttributes<HTMLSelectElement>;

/**
 *
 */
export const Select = createFC<SelectProps, { isFormElement: boolean }>(
  (props) => {
    const { id: id_ } = props;
    const id = useFormElementId(id_, 'select');
    const { totalCols } = useContext(FieldSetColumnContext);
    const { label, required, error, cols, ...rprops } = props;
    if (label || required || error || totalCols || cols) {
      const formElemProps = { id, label, required, error, cols };
      return (
        <FormElement {...formElemProps}>
          <Select {...{ ...rprops, id }} />
        </FormElement>
      );
    }
    const { className, children, ...rprops2 } = rprops;
    const selectClassNames = classnames(className, 'slds-select');
    return (
      <select id={id} className={selectClassNames} {...rprops2}>
        {children}
      </select>
    );
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
