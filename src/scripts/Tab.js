import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Tab = ({ className, active, children, ...props }) => {
  const pprops = props;
  delete pprops.title;
  delete pprops.eventKey;

  const tabClassNames = classnames(
    className,
    'slds-tabs__content',
    `slds-${active ? 'show' : 'hide'}`
  );
  return (
    <div className={ tabClassNames } role='tabpanel' { ...pprops }>
      { children }
    </div>
  );
};


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

export default Tab;
