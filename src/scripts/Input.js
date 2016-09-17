import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import uuid from 'uuid';
import FormElement from './FormElement';


export default class Input extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    const value = e.target.value;
    if (this.props.onChange) {
      this.props.onChange(e, value);
    }
  }

  render() {
    const { id = `input-${uuid()}`, label, required, error, inputRef, ...props } = this.props;
    if (label || required || error) {
      const formElemProps = { id, label, required, error };
      return (
        <FormElement { ...formElemProps }>
          <Input { ...{ ...props, id } } />
        </FormElement>
      );
    }
    const { className, type, bare, value, defaultValue, ...pprops } = props;
    const inputClassNames = classnames(className, bare ? 'slds-input--bare' : 'slds-input');
    return (
      <input
        ref={ inputRef }
        className={ inputClassNames }
        id={ id }
        type={ type }
        onChange={ this.onChange }
        value={ value }
        defaultValue={ defaultValue }
        { ...pprops }
      />
    );
  }
}

Input.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: FormElement.propTypes.error,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  bare: PropTypes.bool,
  onChange: PropTypes.func,
  inputRef: PropTypes.func,
};
