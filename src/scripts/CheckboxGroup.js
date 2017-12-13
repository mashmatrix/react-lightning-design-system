import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FormElement from './FormElement';


export default class CheckboxGroup extends React.Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.renderControl = this.renderControl.bind(this);
  }
  onChange(e) {
    if (this.props.onChange) {
      const values = [];
      React.Children.forEach(this.props.children, (check, i) => {
        const el = check.props.ref || this[`check${(i + 1)}`];
        const checkEl = el && el.querySelector('input[type=checkbox]');
        if (checkEl && checkEl.checked) {
          values.push(check.props.value);
        }
      });
      this.props.onChange(e, values);
    }
  }

  renderControl(checkbox, i) {
    const props = { grouped: true };
    if (checkbox.props.ref) {
      props.ref = checkbox.props.ref;
    } else {
      props.checkboxRef = node => (this[`check${(i + 1)}`] = node);
    }
    if (this.props.name) {
      props.name = this.props.name;
    }
    return React.cloneElement(checkbox, props);
  }

  render() {
    const {
      className, label, totalCols, cols, style, required, error, children, ...props
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

    delete props.onChange;
    return (
      <fieldset
        className={ grpClassNames }
        style={ grpStyles }
        onChange={ this.onChange }
        { ...props }
      >
        <legend className='slds-form-element__label slds-form-element__label--top'>
          { label }
          {
            required ?
              <abbr className='slds-required'>*</abbr> :
              undefined
          }
        </legend>
        <div
          className='slds-form-element__control'
        >
          { React.Children.map(children, this.renderControl) }
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

CheckboxGroup.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: FormElement.propTypes.error,
  name: PropTypes.string,
  totalCols: PropTypes.number,
  cols: PropTypes.number,
  onChange: PropTypes.func,
  children: PropTypes.node,
  /* eslint-disable react/forbid-prop-types */
  style: PropTypes.object,
};

CheckboxGroup.isFormElement = true;
