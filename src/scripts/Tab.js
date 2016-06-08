import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default class Tab extends React.Component {
  render() {
    const { className, active, title, eventKey, menu, menuItems, menuIcon, children, ...props } = this.props;
    const tabClassNames = classnames(
      className,
      'slds-tabs__content',
      `slds-${active ? 'show' : 'hide'}`
    );
    return (
      <div className={ tabClassNames } role='tabpanel' { ...props }>
        { children }
      </div>
    );
  }
}

Tab.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  title: PropTypes.string,
  eventKey: PropTypes.any,
  menu: PropTypes.element,
  menuItems: PropTypes.arrayOf(PropTypes.element),
  menuIcon: PropTypes.string,
  children: PropTypes.node,
};
