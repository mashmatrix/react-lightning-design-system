import React, { PropTypes } from 'react';
import classnames from 'classnames';
import FormElement from './FormElement';


export default class Checkbox extends React.Component {

  renderCheckbox({ className, label, ...props }) {
    const checkClassNames = classnames(className, 'slds-checkbox');
    return (
      <label className={ checkClassNames }>
        <input type='checkbox' { ...props } />
        <span className='slds-checkbox--faux'></span>
        <span className='slds-form-element__label'>{ label }</span>
      </label>
    );
  }

  render() {
    const { grouped, required, error, ...props } = this.props;
    return (
      grouped ?
      this.renderCheckbox(props) :
      <FormElement required={ required } error={ error }>
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
  name: PropTypes.string,
  value: PropTypes.any,
  grouped: PropTypes.bool,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
};
