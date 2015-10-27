import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { util } from 'react-lightning-design-system';

export default class Icon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.checkIconColor();
  }

  componentDidUpdate() {
    this.checkIconColor();
  }

  checkIconColor() {
    const { fillColor, category='utility', container } = this.props;
    if (fillColor === 'none' || category === 'doctype' || (!fillColor && category === 'utility')) {
      return;
    }
    const el = React.findDOMNode(container ? this.refs.iconContainer : this.refs.svgIcon);
    if (!el) { return; }
    const bgColorStyle = getComputedStyle(el)["background-color"];
    if (bgColorStyle === 'rgba(0, 0, 0, 0)') { // if no background color set to the icon
      this.setState({ iconColor: 'standard-default' });
    }
  }

  getIconColor(fillColor) {
    const { category='utility', icon } = this.props;
    return (
      this.state.iconColor ? this.state.iconColor :
      category === 'doctype' ? null :
      fillColor === 'none' ? null :
      fillColor ? fillColor :
      category === 'utility' ? null :
      category === 'custom' ? icon.replace(/^custom/, 'custom-') :
      category === 'action' && /^new_custom/.test(icon) ? icon.replace(/^new_custom/, 'custom-') :
      category + '-' + (icon || '').replace(/_/g, '-')
    );
  }

  render() {
    const { container, ...props } = this.props;
    if (container) {
      const { className, fillColor, ...pprops } = props;
      const iconColor = this.getIconColor(fillColor);
      const containerClassName = classnames(
        'slds-icon__container',
        container === 'circle' ? 'slds-icon__container--circle' : null,
        iconColor ? `slds-icon-${iconColor}` : null,
        className
      );
      return (
        <span className={ containerClassName } ref='iconContainer'>
          { this.renderSVG({ fillColor: iconColor, container, ...pprops }) }
        </span>
      );
    } else {
      return this.renderSVG(props);
    }
  }

  renderSVG({ className, category='utility', icon, size, align, fillColor, container, textColor='default', ...props }) {
    const iconColor = this.getIconColor(fillColor);
    const iconClassNames = classnames(
      {
        'slds-icon': !/slds\-button__icon/.test(className),
        [`slds-icon--${size}`]: /^(x-small|small|large)$/.test(size),
        [`slds-icon--${align}`]: /^(left|right)$/.test(align),
        [`slds-icon-text-${textColor}`]: /^(default|warning)$/.test(textColor) && !container && !iconColor,
        [`slds-icon-${iconColor}`]: !container && iconColor,
      },
      className
    );
    const useHtml = `<use xlink:href="${ util.getAssetRoot() }/icons/${category}-sprite/svg/symbols.svg#${icon}"></use>`;
    return (
      <svg className={ iconClassNames }
        aria-hidden={ true }
        dangerouslySetInnerHTML={ { __html: useHtml } }
        ref='svgIcon'
        { ...props }>
      </svg>
    );
  }
}

Icon.propTypes = {
  className: PropTypes.string,
  category: PropTypes.oneOf([ 'action', 'custom', 'doctype', 'standard', 'utility' ]),
  icon: PropTypes.string,
  container: PropTypes.oneOfType(
    PropTypes.bool,
    PropTypes.oneOf([ 'default', 'circle' ])
  ),
  color: PropTypes.string,
  textColor: PropTypes.oneOf([ 'default', 'warning' ]),
};
