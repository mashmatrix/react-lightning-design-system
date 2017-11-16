import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FormElement from './FormElement';
import { uuid } from './util';

export default class Form extends Component {
  constructor() {
    super();

    this.renderFormElement = this.renderFormElement.bind(this);
  }
  renderFormElement(element) {
    if (element && !element.type.isFormElement) {
      const { id = `form-element-${uuid()}` } = element.props;
      const formElemProps = { id };
      return (
        <FormElement { ...formElemProps }>
          { React.cloneElement(element, { id }) }
        </FormElement>
      );
    }
    return element;
  }

  render() {
    const { className, type, children, ...props } = this.props;
    const formClassNames = classnames(className, `slds-form--${type}`);
    return (
      <form className={ formClassNames } { ...props }>
        { React.Children.map(children, this.renderFormElement) }
      </form>
    );
  }
}

const FORM_TYPES = ['stacked', 'horizontal', 'inline', 'compound'];

Form.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(FORM_TYPES),
  children: PropTypes.node,
};

Form.defaultProps = {
  type: 'stacked',
};
