import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { util } from 'react-lightning-design-system';

export default class Button extends React.Component {
  render() {
    const { className, type, size, icon, iconSize, iconAlign, selected, label, children, ...props } = this.props;
    const typeClassName = type && type !== 'icon-inverse' ? `slds-button--${type}` : null;
    const btnClassNames = classnames(
      className,
      'slds-button',
      typeClassName,
      {
        'slds-is-selected': selected,
        'slds-button--small': size === 'small' && !/^icon-/.test(type),
        'slds-button--icon-small': size === 'small' && /^icon-/.test(type),
      }
    );
    return (
      <button className={ btnClassNames } { ...props }>
        { icon && iconAlign !== 'right' ? this.renderIcon() : null }
        { children || label }
        { icon && iconAlign === 'right' ? this.renderIcon() : null }
        <span className='slds-assistive-text'>{ label }</span>
      </button>
    );
  }

  renderIcon() {
    const { icon, iconAlign, iconSize, type, inverse } = this.props;
    const useHtml = `<use xlink:href="${ util.getAssetRoot() }/icons/utility-sprite/svg/symbols.svg#${icon}"></use>`;
    const alignClassName = /^(left|right)$/.test(iconAlign) ? `slds-button__icon--${iconAlign}` : null;
    const sizeClassName = /^(x-small|small|large)$/.test(iconSize) ? `slds-button__icon--${iconSize}` : null;
    const inverseClassName = /\-?inverse$/.test(type) || inverse ? 'slds-button__icon--inverse' : null;
    const svgClassNames = classnames('slds-button__icon', alignClassName, sizeClassName, inverseClassName);
    return (
      <svg className={ svgClassNames }
        aria-hidden={ true }
        dangerouslySetInnerHTML={ { __html: useHtml } }>
      </svg>
    );
  }

}

const BUTTON_TYPES = [
  'neutral',
  'brand',
  'inverse',
  'icon-bare',
  'icon-container',
  'icon-inverse',
  'icon-border',
  'icon-border-filled'
];

const BUTTON_SIZES = [ 'small' ];

const ICON_SIZES = [ 'x-small', 'small', 'medium', 'large' ];

const ICON_ALIGNS = [ 'left', 'right' ];

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(BUTTON_TYPES),
  label: PropTypes.string,
  size: PropTypes.oneOf(BUTTON_SIZES),
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  iconSize: PropTypes.oneOf(ICON_SIZES),
  iconAlign: PropTypes.oneOf(ICON_ALIGNS),
  inverse: PropTypes.bool,
  selected: PropTypes.bool,
};
