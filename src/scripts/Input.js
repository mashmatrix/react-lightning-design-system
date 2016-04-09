import React, { PropTypes } from 'react';
import classnames from 'classnames';
import uuid from 'uuid';
import FormElement from './FormElement';


export default class Input extends React.Component {
  onChange(e) {
    const value = e.target.value;
    if (this.props.onChange) {
      this.props.onChange(e, value);
    }
  }

  render() {
    const { id = `input-${uuid()}`, label, required, error, ...props } = this.props;
    if (label || required || error) {
      const formElemProps = { id, label, required, error };
      return (
        <FormElement { ...formElemProps }>
          <Input { ...{ ...props, id } } />
        </FormElement>
      );
    }
    const { className, type, onChange, ...pprops } = props;
    const inputClassNames = classnames(className, 'slds-input');
    return (
      <input className={ inputClassNames }
        id={ id }
        type={ type }
        onChange={ this.onChange.bind(this) }
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
