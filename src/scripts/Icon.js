import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { util } from 'react-lightning-design-system';

export default class Icon extends React.Component {
  render() {
    const { className, icon, size, align, ...props } = this.props;
    const useHtml = `<use xlink:href="${ util.getAssetRoot() }/icons/utility-sprite/svg/symbols.svg#${icon}"></use>`;
    const iconClassNames = classnames(
      {
        'slds-icon': !/slds\-button__icon/.test(className),
        [`slds-icon--${size}`]: /^(x-small|small|large)$/.test(size),
        [`slds-icon--${align}`]: /^(left|right)$/.test(align),
      },
      className
    );
    return (
      <svg className={ iconClassNames }
        aria-hidden={ true }
        dangerouslySetInnerHTML={ { __html: useHtml } }
        { ...props }>
      </svg>
    );
  }
}

Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
};
