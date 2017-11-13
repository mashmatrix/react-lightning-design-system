import React from 'react';
import classnames from 'classnames';
import PropTypes from './propTypesImport';


export default class RadioGroup extends React.Component {
  onControlChange(value, e) {
    if (this.props.onChange) {
      this.props.onChange(e, value);
    }
  }

  renderControl(radio) {
    return (
      this.props.name ?
        React.cloneElement(radio, {
          name: this.props.name,
          onChange: this.onControlChange.bind(this, radio.props.value),
        }) :
        radio
    );
  }

  render() {
    const {
      className, label, required, error, totalCols, cols, style, children, ...props,
    } = this.props;
    const grpClassNames = classnames(
      className,
      'slds-form-element',
      {
        'slds-has-error': error,
        'slds-is-required': required,
      },
      typeof totalCols === 'number' ? `slds-size--${cols || 1}-of-${totalCols}` : null
    );
    const grpStyles = typeof totalCols === 'number' ? { display: 'inline-block', ...style } : style;
    const errorMessage =
      error ?
      (typeof error === 'string' ? error :
       typeof error === 'object' ? error.message :
       undefined) :
      undefined;
    return (
      <fieldset className={ grpClassNames } style={ grpStyles } { ...props } >
        <legend className='slds-form-element__label slds-form-element__label--top'>
          { label }
          {
            required ?
              <abbr className='slds-required'>*</abbr> :
              undefined
          }
        </legend>
        <div className='slds-form-element__control'>
          { React.Children.map(children, this.renderControl.bind(this)) }
          {
            errorMessage ?
              <div className='slds-form-element__help'>{ errorMessage }</div> :
              undefined
          }
        </div>
      </fieldset>
    );
  }

}

RadioGroup.propTypes = {
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
  onChange: PropTypes.func,
  totalCols: PropTypes.number,
  cols: PropTypes.number,
  style: PropTypes.object,
  children: PropTypes.node,
};

RadioGroup.isFormElement = true;
