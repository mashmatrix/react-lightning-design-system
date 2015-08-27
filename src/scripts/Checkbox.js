import React, { PropTypes } from 'react';
import classnames from 'classnames';


export default class Checkbox extends React.Component {

  render() {
    const { grouped, ...props } = this.props;
    return (
      grouped ?
      this.renderCheckbox(props) :
      <div className='slds-form-element'>
        { this.renderCheckbox(props) }
      </div>
    );
  }

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

}

Checkbox.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  grouped: PropTypes.bool,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
};
