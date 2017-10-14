import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from './Icon';
import Spinner from './Spinner';

export default class Button extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    // Safari, FF to trigger focus event on click
    this.node.focus();
    const { onClick } = this.props;
    if (onClick) onClick(e);
  }

  renderIcon(iconSize, inv) {
    const { icon, iconAlign, type } = this.props;
    const inverse = inv || /\-?inverse$/.test(type);
    return <ButtonIcon icon={ icon } align={ iconAlign } size={ iconSize } inverse={ inverse } />;
  }

  renderIconMore() {
    const { iconMore, icon, iconAlign, label, children } = this.props;
    const adjoining = icon && (iconAlign === 'right' || !(label || children));
    const iconMoreSize = this.props.iconMoreSize || adjoining ? 'x-small' : 'small';
    return <ButtonIcon icon={ iconMore } align='right' size={ iconMoreSize } />;
  }

  render() {
    const {
      className, type, size, icon, iconAlign, iconMore, selected, alt, label, loading,
      iconSize, inverse, htmlType = 'button', children, buttonRef, ...props
    } = this.props;
    delete props.inverse;
    const typeClassName = type ? `slds-button--${type}` : null;
    const btnClassNames = classnames(
      className,
      'slds-button',
      typeClassName,
      {
        'slds-is-selected': selected,
        [`slds-button--${size}`]: size && !/^icon-/.test(type),
        [`slds-button--icon-${size}`]: /^(x-small|small)$/.test(size) && /^icon-/.test(type),
      }
    );

    delete props.component;
    delete props.items;

    return (
      <button
        ref={(node) => {
          this.node = node;
          if (buttonRef) buttonRef(node);
        }}
        className={ btnClassNames }
        type={ htmlType }
        { ...props }
        onClick={this.onClick}
      >
        { icon && iconAlign !== 'right' ? this.renderIcon(iconSize, inverse) : null }
        { children || label }
        { icon && iconAlign === 'right' ? this.renderIcon(iconSize, inverse) : null }
        { iconMore ? this.renderIconMore() : null }
        { alt ? <span className='slds-assistive-text'>{ alt }</span> : null }
        { loading ? <Spinner /> : null }
      </button>
    );
  }
}

export const BUTTON_TYPES = [
  'neutral',
  'brand',
  'destructive',
  'inverse',
  'icon-bare',
  'icon-container',
  'icon-inverse',
  'icon-more',
  'icon-border',
  'icon-border-filled',
];

const BUTTON_SIZES = ['x-small', 'small', 'medium', 'large'];

const ICON_SIZES = ['x-small', 'small', 'medium', 'large'];

const ICON_ALIGNS = ['left', 'right'];

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.node,
  alt: PropTypes.string,
  type: PropTypes.oneOf(BUTTON_TYPES),
  size: PropTypes.oneOf(BUTTON_SIZES),
  htmlType: PropTypes.string,
  selected: PropTypes.bool,
  inverse: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.string,
  iconSize: PropTypes.oneOf(ICON_SIZES),
  iconAlign: PropTypes.oneOf(ICON_ALIGNS),
  iconMore: PropTypes.string,
  iconMoreSize: PropTypes.oneOf(ICON_SIZES),
  children: PropTypes.node,
  onClick: PropTypes.func,
  buttonRef: PropTypes.func,
};


export const ButtonIcon = ({ icon, align, size, inverse, className, style, ...props }) => {
  const alignClassName = ICON_ALIGNS.indexOf(align) >= 0 ? `slds-button__icon--${align}` : null;
  const sizeClassName = ICON_SIZES.indexOf(size) >= 0 ? `slds-button__icon--${size}` : null;
  const inverseClassName = inverse ? 'slds-button__icon--inverse' : null;
  const iconClassNames = classnames('slds-button__icon', alignClassName, sizeClassName,
    inverseClassName, className);
  const iconStyle = { ...style, pointerEvents: 'none' };
  return (
    <Icon
      className={ iconClassNames } icon={ icon } textColor={ null } style={ iconStyle }
      { ...props }
    />
  );
};

ButtonIcon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  align: PropTypes.oneOf(['left', 'right']),
  size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
  inverse: PropTypes.bool,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
