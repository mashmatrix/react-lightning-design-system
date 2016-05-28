import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import uuid from 'uuid';
import FormElement from './FormElement';


export default class Textarea extends Component {
  constructor(props) {
    super(props);
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
    const { label, required, error, ...props } = this.props;
    if (label || required || error) {
      const formElemProps = { id, label, required, error };
      return (
        <FormElement { ...formElemProps }>
          <Textarea { ...{ ...props, id } } />
        </FormElement>
      );
    }
    const { className, ...pprops } = props;
    const taClassNames = classnames(className, 'slds-input');
    return (
      <textarea
        id={ id }
        className={ taClassNames }
        onChange={ this.onChange.bind(this) }
        { ...pprops }
      />
    );
  }
}

Textarea.propTypes = {
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
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
