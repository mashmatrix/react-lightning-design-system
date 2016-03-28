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
    const { label, required, error, ...props } = this.props;
    if (label || required || error) {
      return (
        <FormElement id={ props.id } label={ label } required={ required } error={ error }>
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
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.shape({
      message: PropTypes.string,
    }),
  ]),
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export class Option extends React.Component {
  render() {
    return <option { ...this.props } />;
  }
}
