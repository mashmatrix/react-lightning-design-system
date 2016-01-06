import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';


export default class CheckboxGroup extends React.Component {
  onChange(e) {
    if (this.props.onChange) {
      const values = [];
      React.Children.forEach(this.props.children, (check, i) => {
        const ref = check.props.ref || 'check' + (i + 1);
        const el = ReactDOM.findDOMNode(this.refs[ref]);
        const checkEl = el.querySelector('input[type=checkbox]');
        if (checkEl && checkEl.checked) {
          values.push(check.props.value);
        }
      });
      this.props.onChange(e, values);
    }
  }

  renderControl(checkbox, i) {
    const props = { grouped: true, ref: checkbox.props.ref || 'check' + (i + 1) };
    if (this.props.name) {
      props.name = this.props.name;
    }
    return React.cloneElement(checkbox, props);
  }

  render() {
    const { className, label, totalCols, cols, style, onChange, children, ...props } = this.props;
    const grpClassNames = classnames(
      className,
      'slds-form-element',
      typeof totalCols === 'number' ? `slds-size--${cols || 1}-of-${totalCols}` : null
    );
    const grpStyles = typeof totalCols === 'number' ? { display: 'inline-block', ...style } : style;
    return (
      <fieldset className={ grpClassNames } style={ grpStyles } onChange={ this.onChange.bind(this) } { ...props } >
        <legend className='slds-form-element__label slds-form-element__label--top'>
          { label }
        </legend>
        <div className='slds-form-element__control' ref='controls'>
          { React.Children.map(children, this.renderControl.bind(this)) }
        </div>
      </fieldset>
    );
  }

}

CheckboxGroup.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  totalCols: PropTypes.number,
  style: PropTypes.object,
  cols: PropTypes.number,
  onChange: PropTypes.func,
  children: PropTypes.node,
};

CheckboxGroup.isFormElement = true;
