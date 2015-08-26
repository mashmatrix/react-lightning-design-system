import React, { PropTypes } from 'react';
import classnames from 'classnames';


export default class CheckboxGroup extends React.Component {

  render() {
    const { className, label, children, ...props } = this.props;
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

  renderControl(checkbox) {
    const props = { grouped: true };
    if (this.props.name) {
      props.name = this.props.name;
    }
    return React.cloneElement(checkbox, props);
  }

}

CheckboxGroup.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
};
