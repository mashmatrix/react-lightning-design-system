import React, { createContext, FC, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { FormElement } from './FormElement';

/**
 *
 */
export type FieldSetProps = {
  label?: string;
} & HTMLAttributes<HTMLFieldSetElement>;

/**
 *
 */
export function FieldSet({
  className,
  label,
  children,
  ...props
}: FieldSetProps) {
  const fsClassNames = classnames(className, 'slds-form_compound');
  return (
    <fieldset className={fsClassNames} {...props}>
      {label ? (
        <legend className='slds-form-element__label'>{label}</legend>
      ) : null}
      <div className='form-element__group'>{children}</div>
    </fieldset>
  );
}

FieldSet.isFormElement = true;

/**
 *
 */
export const FieldSetRowContext = createContext<{
  totalCols: number;
} | null>(null);

/**
 *
 */
type FieldSetRowProps = {
  className?: string;
  cols?: number;
};

/**
 *
 */
export const FieldSetRow: FC<FieldSetRowProps> = (props) => {
  const { className, cols, children } = props;
  const totalCols = cols || React.Children.count(children);
  const rowClassNames = classnames(className, 'slds-form-element__row');
  return (
    <FieldSetRowContext.Provider value={{ totalCols }}>
      <div className={rowClassNames}>
        {React.Children.map(children, (child) => {
          if (
            React.isValidElement(child) &&
            !(child.type as unknown as { isFormElement?: boolean })
              .isFormElement
          ) {
            return <FormElement>{child}</FormElement>;
          }
          return child;
        })}
      </div>
    </FieldSetRowContext.Provider>
  );
};

(FieldSetRow as unknown as { isFormElement: boolean }).isFormElement = true;

// FieldSet.Row = FieldSetRow;
