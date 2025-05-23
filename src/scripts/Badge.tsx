import React, { FC, HTMLAttributes } from 'react';
import classnames from 'classnames';

/**
 *
 */
export type BadgeProps = {
  type?: 'default' | 'shade' | 'inverse';
  label?: string;
} & HTMLAttributes<HTMLSpanElement>;

/**
 *
 */
export const Badge: FC<BadgeProps> = ({ type, label, ...props }) => {
  const typeClassName = type ? `slds-badge_${type}` : null;
  const badgeClassNames = classnames('slds-badge', typeClassName);
  return (
    <span className={badgeClassNames} {...props}>
      {label || props.children}
    </span>
  );
};
