import React from 'react';
import classnames from 'classnames';

interface Props {
  type?: 'default' | 'shade' | 'inverse';
  label?: string;
  children: React.ReactNode;
}

const Badge = ({ children, type, label, ...props }: Props) => {
  const typeClassName = type ? `slds-theme--${type}` : null;
  const badgeClassNames = classnames('slds-badge', typeClassName);
  return (
    <span className={badgeClassNames} {...props}>
      {label || children}
    </span>
  );
};

export default Badge;
