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
    const { label, valid, required, ...props } = this.props;
    if (label) {
      const formElemProps = { id: props.id, label, valid, required };
      return (
        <FormElement { ...formElemProps }>
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
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  valid: PropTypes.bool
};
