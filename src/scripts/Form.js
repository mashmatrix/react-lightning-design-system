import React, { PropTypes } from 'react';
import classnames from 'classnames';
import FormElement from './FormElement';


export default class Form extends React.Component {
  render() {
    const { className, type, children, ...props } = this.props;
    const formClassNames = classnames(className, `slds-form--${type}`);
    return (
      <form className={ formClassNames } { ...props }>
        { React.Children.map(children, this.renderFormElement.bind(this)) }
      </form>
    );
  }

  renderFormElement(element) {
    const klass = element.type;
    if (!klass.isFormElement) {
      const { label, ...props } = element.props;
      return (
        <FormElement label={ label } { ...props }>
          { React.cloneElement(element, { label: null }) }
        </FormElement>
      );
    } else {
      return element;
    }
  }
}

const FORM_TYPES = [ 'stacked', 'horizontal', 'inline' ];

Form.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(FORM_TYPES),
};

Form.defaultProps = {
  type: 'stacked'
};
