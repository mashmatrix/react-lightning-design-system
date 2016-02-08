import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import svg4everybody from 'svg4everybody';
import util from './util';

svg4everybody();

export default class Icon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.checkIconColor();
    const svgEl = ReactDOM.findDOMNode(this.refs.svgIcon);
    svgEl.setAttribute('focusable', this.props.tabIndex >= 0);
  }

  componentDidUpdate() {
    this.checkIconColor();
  }

  getIconColor(fillColor, category, icon) {
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

  checkIconColor() {
    const { fillColor, category = 'utility', container } = this.props;
    if (fillColor === 'none' || category === 'doctype' || (!fillColor && category === 'utility')) {
      return;
    }
    const el = ReactDOM.findDOMNode(container ? this.refs.iconContainer : this.refs.svgIcon);
    if (!el) { return; }
    const bgColorStyle = getComputedStyle(el)['background-color'];
    if (/^(transparent|rgba\(0,\s*0,\s*0,\s*0\))$/.test(bgColorStyle)) { // if no background color set to the icon
      this.setState({ iconColor: 'standard-default' });
    }
  }

  renderSVG({ className, category = 'utility', icon, size, align, fillColor, container, textColor = 'default', ...props }) {
    const iconColor = this.getIconColor(fillColor, category, icon);
    const iconClassNames = classnames(
      {
        'slds-icon': !/slds\-button__icon/.test(className),
        [`slds-icon--${size}`]: /^(x-small|small|large)$/.test(size),
        [`slds-icon--${align}`]: /^(left|right)$/.test(align),
        [`slds-icon-text-${textColor}`]: /^(default|warning|error)$/.test(textColor) && !container && !iconColor,
        [`slds-icon-${iconColor}`]: !container && iconColor,
      },
      className
    );
    const useHtml = `<use xlink:href="${ util.getAssetRoot() }/icons/${category}-sprite/svg/symbols.svg#${icon}"></use>`;
    return (
      <svg className={ iconClassNames }
        aria-hidden
        dangerouslySetInnerHTML={ { __html: useHtml } }
        ref='svgIcon'
        {...props}
      />
    );
  }

  render() {
    const { container, ...props } = this.props;
    let { category, icon } = props;

    if (icon.indexOf(':') > 0) {
      [category, icon] = icon.split(':');
    }
    if (container) {
      const { className, fillColor, ...pprops } = props;
      const iconColor = this.getIconColor(fillColor, category, icon);
      const containerClassName = classnames(
        'slds-icon__container',
        container === 'circle' ? 'slds-icon__container--circle' : null,
        iconColor ? `slds-icon-${iconColor}` : null,
        className
      );
      return (
        <span className={ containerClassName } ref='iconContainer'>
          { this.renderSVG({ category, icon, fillColor: iconColor, container, ...pprops }) }
        </span>
      );
    }

    return this.renderSVG({ ...props, category, icon });
  }
}

Icon.propTypes = {
  className: PropTypes.string,
  category: PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
  icon: PropTypes.string,
  container: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['default', 'circle']),
  ]),
  color: PropTypes.string,
  textColor: PropTypes.oneOf(['default', 'warning', 'error']),
  tabIndex: PropTypes.number,
  fillColor: PropTypes.string,
};
