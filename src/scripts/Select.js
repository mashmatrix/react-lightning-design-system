import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FormElement from './FormElement';
import { uuid } from './util';


export default class Select extends Component {
  constructor() {
    super();
    this.state = { id: `form-element-${uuid()}` };
  }

  onChange(e) {
    const value = e.target.value;
    if (this.props.onChange) {
      this.props.onChange(e, value);
    }
  }

  render() {
    const id = this.props.id || this.state.id;
    const { label, required, error, totalCols, cols, ...props } = this.props;
    if (label || required || error || totalCols || cols) {
      const formElemProps = { id, label, required, error, totalCols, cols };
      return (
        <FormElement { ...formElemProps }>
          <Select { ...{ ...props, id } } />
        </FormElement>
      );
    }
    const { className, children, ...pprops } = props;
    delete pprops.onChange;
    const selectClassNames = classnames(className, 'slds-select');
    return (
      <select
        id={ id }
        className={ selectClassNames }
        onChange={ this.onChange.bind(this) }
        { ...pprops }
      >
        { children }
      </select>
    );
  }

}

Select.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  totalCols: PropTypes.number,
  cols: PropTypes.number,
  error: FormElement.propTypes.error,
  onChange: PropTypes.func,
};

Select.isFormElement = true;

export const Option = (props) => {
  const { label, children, ...pprops } = props;
  return (<option { ...pprops }>{ label || children }</option>);
};

Option.propTypes = {
  children: PropTypes.node,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};
