import React from 'react';
import classnames from 'classnames';

export default class Button extends React.Component {
  render() {
    const { className, type, inverse, icon, iconAlign, children, ...props } = this.props;
    const typeClassName = type !== 'icon-inverse' ? `slds-button--${type}` : null;
    const btnClassNames = classnames(
      className,
      'slds-button',
      typeClassName,
      { 'slds-button--inverse': inverse }
    );
    return (
      <button className={ btnClassNames } { ...props }>
        { icon ? this.renderIcon() : null }
        { children }
      </button>
    );
  }

  renderIcon() {
    const { icon, iconAlign, type } = this.props;
    const useHtml = `<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#${icon}"></use>`;
    const alignClassName = /^(left|right)$/.test(iconAlign) ? `slds-button__icon--${iconAlign}` : null;
    const inverseClassNames = { 'slds-button__icon--inverse': type === 'icon-inverse' };
    const svgClassNames = classnames('slds-button__icon', alignClassName, inverseClassNames);
    return (
      <svg className={ svgClassNames }
        aria-hidden={ true }
        dangerouslySetInnerHTML={ { __html: useHtml } }>
      </svg>
    );
  }
}
