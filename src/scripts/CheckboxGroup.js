import React, { PropTypes } from 'react';
import classnames from 'classnames';


export default class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: this.getInitValues(),
    };
  }

  onControlChange(value, checked, e) {
    let values = this.state.values;
    if (checked) {
      values = values.concat(value);
    } else {
      values.splice(values.indexOf(value), 1);
    }

    this.setState({ values });

    if (this.props.onChange) {
      this.props.onChange(e, values);
    }
  }

  getInitValues() {
    const values = [];
    React.Children.forEach(this.props.children, (check) => {
      const { checked, value } = check.props;
      if (checked) values.push(value);
    });
    return values;
  }

  renderControl(checkbox) {
    const props = {
      grouped: true,
    };

    if (this.props.name) {
      props.name = this.props.name;
    }

    const { values } = this.state;
    props.checked = values.indexOf(checkbox.props.value) !== -1;

    props.onChange = this.onControlChange.bind(this, checkbox.props.value, !props.checked);
    return React.cloneElement(checkbox, props);
  }

  render() {
    const { className, label, totalCols, cols, style, required, error, onChange, children, ...props } = this.props;
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
        <div className='slds-form-element__control' ref='controls'>
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

CheckboxGroup.propTypes = {
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
  totalCols: PropTypes.number,
  style: PropTypes.object,
  cols: PropTypes.number,
  onChange: PropTypes.func,
  children: PropTypes.node,
};

CheckboxGroup.isFormElement = true;
