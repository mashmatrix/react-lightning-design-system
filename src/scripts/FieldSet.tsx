import React, {
  createContext,
  HTMLAttributes,
  ReactNode,
  useMemo,
} from 'react';
import classnames from 'classnames';
import { FormElement } from './FormElement';
import { createFC } from './common';

/**
 *
 */
export const FieldSetColumnContext = createContext<{
  isFieldSetColumn?: boolean;
  totalCols?: number;
}>({});

/**
 *
 */
type FieldSetRowProps = {
  className?: string;
  cols?: number;
  children?: ReactNode;
};

/**
 *
 */
export const FieldSetRow = createFC<
  FieldSetRowProps,
  { isFormElement: boolean }
>(
  (props) => {
    const { className, cols, children } = props;
    const totalCols = cols || React.Children.count(children);
    const ctx = useMemo(
      () => ({ isFieldSetColumn: true, totalCols }),
      [totalCols]
    );
    const rowClassNames = classnames(className, 'slds-form-element__row');
    return (
      <FieldSetColumnContext.Provider value={ctx}>
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
      </FieldSetColumnContext.Provider>
    );
  },
  { isFormElement: true }
);

/**
 *
 */
export type FieldSetProps = {
  label?: string;
} & HTMLAttributes<HTMLFieldSetElement>;

/**
 *
 */
export const FieldSet = createFC<
  FieldSetProps,
  { isFormElement: boolean; Row: typeof FieldSetRow }
>(
  ({ className, label, children, ...props }) => {
    const fsClassNames = classnames(className, 'slds-form_compound');
    return (
      <fieldset className={fsClassNames} {...props}>
        {label ? (
          <legend className='slds-form-element__label'>{label}</legend>
        ) : null}
        <div className='form-element__group'>{children}</div>
      </fieldset>
    );
  },
  { isFormElement: true, Row: FieldSetRow }
);
