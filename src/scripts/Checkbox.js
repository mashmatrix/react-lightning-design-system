import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import FormElement from './FormElement';


export default class Checkbox extends Component {
  componentWillReceiveProps(nextProps) {
    const input = this.node.getElementsByTagName('input')[0];
    if (nextProps.defaultChecked !== input.checked) {
      input.checked = nextProps.defaultChecked;
    }
  }

  renderCheckbox({ className, label, ...props }) {
    const checkClassNames = classnames(className, 'slds-checkbox');
    return (
      <label ref={node => (this.node = node)} className={ checkClassNames }>
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
          ref={node => (this.node = node)}
          { ...formElemProps }
        >
          { this.renderCheckbox(props) }
        </FormElement>
    );
  }

}

Checkbox.propTypes = {
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
  grouped: PropTypes.bool,
};
