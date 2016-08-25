import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import FormElement from './FormElement';
import ReactDOM from 'react-dom';


export default class Checkbox extends Component {
  componentWillReceiveProps(nextProps) {
    const input = ReactDOM.findDOMNode(this).getElementsByTagName('input')[0];
    if (nextProps.defaultChecked !== input.checked) {
      input.checked = nextProps.defaultChecked;
    }
  }

  renderCheckbox({ className, label, ...props }) {
    const checkClassNames = classnames(className, 'slds-checkbox');
    return (
      <label className={ checkClassNames }>
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
