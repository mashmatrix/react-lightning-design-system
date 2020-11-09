import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';

export type BadgeProps = {
  type?: 'default' | 'shade' | 'inverse';
  label?: string;
} & HTMLAttributes<HTMLSpanElement>;

export const Badge: React.FC<BadgeProps> = ({ type, label, ...props }) => {
  const typeClassName = type ? `slds-theme_${type}` : null;
  const badgeClassNames = classnames('slds-badge', typeClassName);
  return (
    <span className={badgeClassNames} {...props}>
      {label || props.children}
    </span>
  );
};
