import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from './propTypesImport';
import Icon from './Icon';
import { registerStyle } from './util';

export default class Button extends Component {
  constructor(props) {
    super(props);
    registerStyle('button', [
      [
        '.slds-button__icon--medium2',
        '{ width: 1.1rem; height: 1.1rem; }',
      ],
      [
        '.slds-button__icon--x-small2',
        '{ width: 0.67rem; height: 0.67rem; }',
      ],
    ]);
  }

  renderIcon() {
    const { icon, iconAlign, iconSize, type } = this.props;
    let { inverse } = this.props;
    inverse = inverse || /\-?inverse$/.test(type);
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
      className, type, size, icon, iconAlign, iconMore, selected, alt, label,
      htmlType = 'button', children, ...props,
    } = this.props;
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
    const pprops = props;
    delete pprops.inverse;
    delete pprops.iconSize;
    return (
      <button className={ btnClassNames } type={ htmlType } { ...pprops }>
        { icon && iconAlign !== 'right' ? this.renderIcon() : null }
        { children || label }
        { icon && iconAlign === 'right' ? this.renderIcon() : null }
        { iconMore ? this.renderIconMore() : null }
        { alt ? <span className='slds-assistive-text'>{ alt }</span> : null }
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

const ICON_SIZES = ['x-small', 'x-small2', 'small', 'medium', 'medium2', 'large'];

const ICON_ALIGNMENTS = ['left', 'right'];

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.node,
  alt: PropTypes.string,
  type: PropTypes.oneOf(BUTTON_TYPES),
  size: PropTypes.oneOf(BUTTON_SIZES),
  htmlType: PropTypes.string,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  inverse: PropTypes.bool,
  icon: PropTypes.string,
  iconSize: PropTypes.oneOf(ICON_SIZES),
  iconAlign: PropTypes.oneOf(ICON_ALIGNMENTS),
  iconMore: PropTypes.string,
  iconMoreSize: PropTypes.oneOf(ICON_SIZES),
  children: PropTypes.node,
};


export const ButtonIcon = ({ icon, align, size, inverse, className, ...props }) => {
  const alignClassName = ICON_ALIGNMENTS.indexOf(align) >= 0 ? `slds-button__icon--${align}` : null;
  const sizeClassName = ICON_SIZES.indexOf(size) >= 0 ? `slds-button__icon--${size}` : null;
  const inverseClassName = inverse ? 'slds-button__icon--inverse' : null;
  const iconClassNames = classnames('slds-button__icon', alignClassName, sizeClassName,
    inverseClassName, className);
  return <Icon className={ iconClassNames } icon={ icon } textColor={ null } { ...props } />;
};

ButtonIcon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  align: PropTypes.oneOf(ICON_ALIGNMENTS),
  size: PropTypes.oneOf(ICON_SIZES),
  inverse: PropTypes.bool,
};
