import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import uuid from 'uuid';
import FormElement from './FormElement';
import Text from './Text';


export default class Form extends Component {
  constructor() {
    super();

    this.renderFormElement = this.renderFormElement.bind(this);
  }
  renderFormElement(element) {
    if (element && !element.type.isFormElement) {
      const {
        id = `form-element-${uuid()}`, label, required, error, icon,
        totalCols, cols, iconAlign, readOnly, addonLeft, addonRight,
      } = element.props;
      const hasAddons = !!(addonLeft || addonRight);
      const hasIcon = !!icon;
      const formElemProps = {
        id,
        label,
        required,
        error,
        totalCols,
        cols,
        hasIcon,
        iconAlign,
        readOnly,
        hasAddons,
      };
      return (
        <FormElement { ...formElemProps }>
          {!addonLeft ? null :
            <Text
              tag='span'
              className={'slds-form-element__addon'}
              category='body'
              type='regular'
            >
              {addonLeft}
            </Text>
          }
          { React.cloneElement(element, {
            id,
            label: undefined,
            required: undefined,
            error: undefined,
            hasIcon: undefined,
            iconAlign: undefined,
            readOnly: undefined,
            addonLeft: undefined,
            addonRight: undefined,
            onlyRead: readOnly,
          }) }
          {!addonRight ? null :
            <Text
              tag='span'
              className={'slds-form-element__addon'}
              category='body'
              type='regular'
            >
              {addonRight}
            </Text>
          }
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
