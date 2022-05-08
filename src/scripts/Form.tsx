import React, { FC, FormHTMLAttributes } from 'react';
import classnames from 'classnames';
import { FormElement } from './FormElement';

/**
 *
 */
export type FormProps = {
  type?: 'stacked' | 'horizontal' | 'inline' | 'compound';
} & FormHTMLAttributes<HTMLFormElement>;

/**
 *
 */
export const Form: FC<FormProps> = (props) => {
  const { className, type = 'stacked', children, ...rprops } = props;
  const formClassNames = classnames(className, `slds-form_${type}`);
  return (
    <form className={formClassNames} {...rprops}>
      {React.Children.map(children, (child) => {
        if (
          React.isValidElement(child) &&
          !(child.type as unknown as { isFormElement?: boolean }).isFormElement
        ) {
          return <FormElement>{child}</FormElement>;
        }
        return child;
      })}
    </form>
  );
};
