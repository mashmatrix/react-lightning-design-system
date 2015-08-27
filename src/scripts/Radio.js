import React, { PropTypes } from 'react';
import classnames from 'classnames';


export default class Radio extends React.Component {

  render() {
    const { className, label, ...props } = this.props;
    const radioClassNames = classnames(className, 'slds-radio');
    return (
      <label className={ radioClassNames }>
        <input type='radio' { ...props } />
        <span className='slds-radio--faux'></span>
        <span className='slds-form-element__label'>{ label }</span>
      </label>
    );
  }

}

Radio.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
};
