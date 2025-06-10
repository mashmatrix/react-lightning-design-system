import React, {
  createContext,
  HTMLAttributes,
  ReactNode,
  useMemo,
  useContext,
} from 'react';
import classnames from 'classnames';
import { FormTypeContext } from './Form';
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
    const type = useContext(FormTypeContext) ?? 'compound';

    const fsClassNames = classnames(
      className,
      'slds-form-element',
      `slds-form-element_${type}`
    );
    const legendClassNames = classnames(
      'slds-form-element__legend',
      'slds-form-element__label'
    );
    return (
      <fieldset className={fsClassNames} {...props}>
        {label ? <legend className={legendClassNames}>{label}</legend> : null}
        <div className='slds-form-element__control'>{children}</div>
      </fieldset>
    );
  },
  { isFormElement: true, Row: FieldSetRow }
);
