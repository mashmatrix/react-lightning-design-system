import React, { PropTypes } from 'react';
import classnames from 'classnames';


export default class RadioGroup extends React.Component {
  onControlChange(value, e) {
    if (this.props.onChange) {
      this.props.onChange(e, value);
    }
  }

  render() {
    const { className, label, totalCols, cols, style, onChange, children, ...props } = this.props;
    const grpClassNames = classnames(
      className,
      'slds-form-element',
      typeof totalCols === 'number' ? `slds-size--${cols||1}-of-${totalCols}` : null
    );
    const grpStyles = typeof totalCols === 'number' ? { display: 'inline-block', ...style } : style;
    return (
      <fieldset className={ grpClassNames } style={ grpStyles } { ...props } >
        <legend className='slds-form-element__label slds-form-element__label--top'>
          { label }
        </legend>
        <div className='slds-form-element__control'>
          { React.Children.map(children, this.renderControl.bind(this)) }
        </div>
      </fieldset>
    );
  }

  renderControl(radio) {
    return (
      this.props.name ?
      React.cloneElement(radio, { name: this.props.name, onChange: this.onControlChange.bind(this, radio.props.value) }) :
      radio
    );
  }

}

RadioGroup.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
};

RadioGroup.isFormElement = true;
