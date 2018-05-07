import React, { Component } from 'react';
import classnames from 'classnames';
import FormElement from './FormElement';
import PropTypes from 'prop-types';


export default class Checkbox extends Component {

  renderCheckbox() {
    const { className, label, ...props } = this.props;
    const checkClassNames = classnames(className, 'slds-checkbox');
    delete props.initialValue;
    delete props.onUpdate;
    delete props.valid;
    delete props.invalid;
    delete props.dirty;
    delete props.pristine;
    delete props.active;
    delete props.touched;
    delete props.visited;
    return (
      <label className={ checkClassNames }>
        <input type='checkbox' { ...props } />
        <span className='slds-checkbox--faux'></span>
        <span className='slds-form-element__label'>{ label }</span>
      </label>
    );
  }

  render() {
    const { grouped, required, error, totalCols, cols, ...props } = this.props;
    const formElemProps = { required, error, totalCols, cols };
    return (
      grouped ?
        this.renderCheckbox(props) :
        <FormElement { ...formElemProps }>
          { this.renderCheckbox(props) }
        </FormElement>
    );
  }

}

Checkbox.propTypes = {
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
  totalCols: PropTypes.number,
  cols: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.any,
  grouped: PropTypes.bool,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
};
