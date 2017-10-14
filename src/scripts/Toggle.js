import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import FormElement from './FormElement';

export default class Toggle extends Component {
  renderToggle({ className, label, ...props }) {
    const toggleClassNames = classnames(className, 'slds-checkbox--toggle slds-grid');
    return (
      <label className={ toggleClassNames }>
        <span className='slds-form-element__label slds-m-bottom--none'>{ label }</span>
        <input
          name='checkbox'
          type='checkbox'
          aria-describedby='toggle-desc'
          { ...props }
        />
        <span
          className='slds-checkbox--faux_container'
          aria-live='assertive'
        >
          <span className='slds-checkbox--faux' />
          <span className='slds-checkbox--on'>Enabled</span>
          <span className='slds-checkbox--off'>Disabled</span>
        </span>
      </label>
    );
  }

  render() {
    const { required, error, totalCols, cols, ...props } = this.props;
    const formElemProps = { required, error, totalCols, cols };
    return (
      <FormElement
        formElementRef={node => (this.node = node)}
        { ...formElemProps }
      >
        { this.renderToggle(props) }
      </FormElement>
    );
  }

}

Toggle.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: FormElement.propTypes.error,
  totalCols: PropTypes.number,
  cols: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
};
