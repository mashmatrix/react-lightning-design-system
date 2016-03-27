import React, { PropTypes } from 'react';
import classnames from 'classnames';
import FormElement from './FormElement';


export default class Select extends React.Component {
  onChange(e) {
    const value = e.target.value;
    if (this.props.onChange) {
      this.props.onChange(e, value);
    }
  }

  render() {
    const { label, valid, required, ...props } = this.props;
    if (label) {
      const formElemProps = { id: props.id, label, valid, required };
      return (
        <FormElement { ...formElemProps }>
          <Select { ...props } />
        </FormElement>
      );
    }
    const { className, id, children, onChange, ...pprops } = props;
    const selectClassNames = classnames(className, 'slds-select');
    return (
      <select className={ selectClassNames } id={ id }
        onChange={ this.onChange.bind(this) }
        { ...pprops }
      >
        { children }
      </select>
    );
  }

}

Select.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  valid: PropTypes.bool,
};

export class Option extends React.Component {
  render() {
    return <option { ...this.props } />;
  }
}
