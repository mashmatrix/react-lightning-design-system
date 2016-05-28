import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Tab = ({ className, active, children, ...props }) => {
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
};

Tab.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  active: PropTypes.bool,
  menu: PropTypes.element,
  menuItems: PropTypes.arrayOf(PropTypes.element),
  menuIcon: PropTypes.string,
  children: PropTypes.node,
};

export default Tab;
