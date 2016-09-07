import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { cleanProps } from './util';

const Tab = ({ className, active, children, ...props }) => {
  const pprops = cleanProps(props, Tab.propTypes);
  delete pprops.title;

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
