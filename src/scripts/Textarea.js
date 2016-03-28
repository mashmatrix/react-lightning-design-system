import React, { PropTypes } from 'react';
import classnames from 'classnames';
import FormElement from './FormElement';


export default class Textarea extends React.Component {
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
          <Textarea { ...props } />
        </FormElement>
      );
    }
    const { className, id, onChange, ...pprops } = props;
    const taClassNames = classnames(className, 'slds-input');
    return (
      <textarea className={ taClassNames } id={ id }
        onChange={ this.onChange.bind(this) }
        { ...pprops }
      />
    );
  }

}

Textarea.propTypes = {
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
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
