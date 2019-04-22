import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';

export type BadgeProps = {
  type?: 'default' | 'shade' | 'inverse';
  label?: string;
};

export const Badge: React.FC<BadgeProps & HTMLAttributes<HTMLSpanElement>> = ({
  type,
  label,
  ...props
}) => {
  const typeClassName = type ? `slds-theme--${type}` : null;
  const badgeClassNames = classnames('slds-badge', typeClassName);
  return (
    <span className={badgeClassNames} {...props}>
      {label || props.children}
    </span>
  );
};
