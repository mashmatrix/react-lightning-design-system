import React from 'react';
import PropTypes from './propTypesImport';
import classnames from 'classnames';

const Badge = ({ children, type, label }) => {
  const typeClassName = type ? `slds-theme--${type}` : null;
  const badgeClassNames = classnames(
    'slds-badge',
    typeClassName
  );
  return (
    <span className={ badgeClassNames }>
      { label || children }
    </span>
  );
};

const BADGE_TYPES = ['default', 'shade', 'inverse'];

Badge.propTypes = {
  type: PropTypes.oneOf(BADGE_TYPES),
  label: PropTypes.string,
  children: PropTypes.node,
};

export default Badge;
