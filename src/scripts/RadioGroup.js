import React, { PropTypes } from 'react';
import classnames from 'classnames';


export default class RadioGroup extends React.Component {

  render() {
    const { className, name, label, children, ...props } = this.props;
    const grpClassNames = classnames(className, 'slds-form-element');
    return (
      <fieldset className={ grpClassNames }>
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
      React.cloneElement(radio, { name: this.props.name }) :
      radio
    );
  }

}

RadioGroup.propTypes = {
  className: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
};
