import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import uuid from 'uuid';
import keycoder from 'keycoder';

import FormElement from './FormElement';
import Icon from './Icon';
import Text from './Text';


export default class Input extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    const value = e.target.value;
    if (this.props.onChange) {
      this.props.onChange(e, value);
    }
  }
  onKeyDown(e) {
    const { symbolPattern } = this.props;
    if (!symbolPattern) return;

    const { keyCode, shiftKey } = e;
    const value = keycoder.toCharacter(keyCode, shiftKey);

    if (value && !value.match(new RegExp(symbolPattern))) e.preventDefault();
  }

  render() {
    const {
      id = `input-${uuid()}`, label, required, error, inputRef, onlyRead,
      icon, iconAlign = 'left', readOnly, addonLeft, addonRight, ...props
    } = this.props;
    const hasAddons = !!(addonLeft || addonRight);
    const hasIcon = !!icon;
    if (label || required || error || hasIcon || readOnly || hasAddons) {
      const formElemProps = { id, label, required, error, hasIcon, iconAlign, readOnly, hasAddons };
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
          { icon ?
            React.isValidElement(icon) ?
              icon :
                <Icon
                  icon={icon.icon}
                  className='slds-input__icon'
                />
            : null
          }
          <Input { ...{ ...props, id, onlyRead: readOnly } } />
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
    const { className, type, bare, value, defaultValue, ...pprops } = props;
    const inputClassNames = classnames(className, bare ? 'slds-input--bare' : 'slds-input');
    delete pprops.symbolPattern;
    delete pprops.hasAddons;
    delete pprops.hasIcon;
    return onlyRead ?
      <Text
        type='regular'
        category='body'
        className={'slds-form-element__static'}
        { ...{ id } }
      >
        {props.value}
      </Text>
      :
        <input
          ref={ inputRef }
          className={ inputClassNames }
          id={ id }
          type={ type }
          value={ value }
          defaultValue={ defaultValue }
          { ...pprops }
          onChange={ this.onChange }
          onKeyDown={ this.onKeyDown.bind(this) }
        />;
  }
}

Input.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: FormElement.propTypes.error,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  bare: PropTypes.bool,
  onChange: PropTypes.func,
  inputRef: PropTypes.func,
  symbolPattern: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  iconAlign: PropTypes.string,
  readOnly: PropTypes.bool,
  onlyRead: PropTypes.bool,
  addonLeft: PropTypes.string,
  addonRight: PropTypes.string,
};
