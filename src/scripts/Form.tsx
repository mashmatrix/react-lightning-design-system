import React, { Component, FormHTMLAttributes } from 'react';
import classnames from 'classnames';
import { FormElement } from './FormElement';
import { uuid } from './util';

export type FormProps = {
  type?: 'stacked' | 'horizontal' | 'inline' | 'compound';
} & FormHTMLAttributes<HTMLFormElement>;

export class Form extends Component<FormProps, {}> {
  static defaultProps: Pick<FormProps, 'type'> = {
    type: 'stacked',
  };

  constructor(props: Readonly<FormProps>) {
    super(props);

    this.renderFormElement = this.renderFormElement.bind(this);
  }

  renderFormElement(element: any) {
    if (element && !element.type.isFormElement) {
      const { id = `form-element-${uuid()}` } = element.props;
      const formElemProps = { id };
      return (
        <FormElement {...formElemProps}>
          {React.cloneElement(element, { id })}
        </FormElement>
      );
    }
    return element;
  }

  render() {
    const { className, type, children, ...props } = this.props;
    const formClassNames = classnames(className, `slds-form_${type}`);
    return (
      <form className={formClassNames} {...props}>
        {React.Children.map(children, this.renderFormElement)}
      </form>
    );
  }
}
