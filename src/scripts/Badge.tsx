import React from 'react';
import classnames from 'classnames';

export interface BadgeProps {
  type?: 'default' | 'shade' | 'inverse';
  label?: string;
  children: React.ReactNode;
}

export const Badge = ({ children, type, label, ...props }: BadgeProps) => {
  const typeClassName = type ? `slds-theme--${type}` : null;
  const badgeClassNames = classnames('slds-badge', typeClassName);
  return (
    <span className={badgeClassNames} {...props}>
      {label || children}
    </span>
  );
};
