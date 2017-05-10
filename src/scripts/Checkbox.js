import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FormElement from './FormElement';


export default class Checkbox extends Component {
  componentWillReceiveProps(nextProps) {
    const input = this.node.getElementsByTagName('input')[0];
    if (nextProps.defaultChecked !== input.checked) {
      input.checked = nextProps.defaultChecked;
    }
  }

  renderCheckbox({ className, label, checkboxRef, ...props }) {
    const checkClassNames = classnames(className, 'slds-checkbox');
    return (
      <label
        ref={(node) => {
          this.node = node;
          if (checkboxRef) checkboxRef(node);
        }}
        className={ checkClassNames }
      >
        <input type='checkbox' { ...props } />
        <span className='slds-checkbox--faux' />
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
          <FormElement
            formElementRef={node => (this.node = node)}
            { ...formElemProps }
          >
            { this.renderCheckbox(props) }
          </FormElement>
    );
  }

}

Checkbox.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: FormElement.propTypes.error,
  totalCols: PropTypes.number,
  cols: PropTypes.number,
  grouped: PropTypes.bool,
  checkboxRef: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
};
