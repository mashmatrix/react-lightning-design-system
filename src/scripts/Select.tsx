import React, {
  Component,
  SelectHTMLAttributes,
  OptionHTMLAttributes,
} from 'react';
import classnames from 'classnames';
import { FormElement, FormElementProps } from './FormElement';
import { uuid } from './util';

export type SelectProps = {
  label?: string;
  required?: boolean;
  totalCols?: number;
  cols?: number;
  error?: FormElementProps['error'];
} & SelectHTMLAttributes<HTMLSelectElement>;

export type SelectState = {
  id: string;
};

export class Select extends Component<SelectProps, SelectState> {
  static isFormElement = true;

  constructor(props: Readonly<SelectProps>) {
    super(props);
    this.state = { id: `form-element-${uuid()}` };
  }

  render() {
    const id = this.props.id || this.state.id;
    const { label, required, error, totalCols, cols, ...props } = this.props;
    if (label || required || error || totalCols || cols) {
      const formElemProps = { id, label, required, error, totalCols, cols };
      return (
        <FormElement {...formElemProps}>
          <Select {...{ ...props, id }} />
        </FormElement>
      );
    }
    const { className, children, ...rprops } = props;
    const selectClassNames = classnames(className, 'slds-select');
    return (
      <select id={id} className={selectClassNames} {...rprops}>
        {children}
      </select>
    );
  }
}

export type OptionProps = OptionHTMLAttributes<HTMLOptionElement>;

export const Option: React.FC<OptionProps> = (props) => {
  const { label, children, ...pprops } = props;
  return <option {...pprops}>{label || children}</option>;
};
