import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FormElement from './FormElement';
import { uuid } from './util';


export default class Textarea extends Component {
  constructor() {
    super();
    this.state = { id: `form-element-${uuid()}` };

    this.onChange = this.onChange.bind(this);
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
          <Textarea { ...{ ...props, id } } />
        </FormElement>
      );
    }
    const { className, textareaRef, ...pprops } = props;
    const taClassNames = classnames(className, 'slds-input');
    return (
      <textarea
        id={ id }
        ref={ textareaRef }
        className={ taClassNames }
        onChange={ this.onChange }
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
  error: FormElement.propTypes.error,
  totalCols: PropTypes.number,
  cols: PropTypes.number,
  onChange: PropTypes.func,
  textareaRef: PropTypes.func,
};

Textarea.isFormElement = true;
