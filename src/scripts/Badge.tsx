import React, { FC, HTMLAttributes } from 'react';
import classnames from 'classnames';

/**
 *
 */
export type BadgeProps = {
  type?: 'inverse' | 'lightest' | 'success' | 'warning' | 'error';
  label?: string;
} & HTMLAttributes<HTMLSpanElement>;

/**
 *
 */
export const Badge: FC<BadgeProps> = ({ type, label, ...props }) => {
  const typeClassName = /^(inverse|lightest)$/.test(type ?? '')
    ? `slds-badge_${type}`
    : null;
  const themeClassName = /^(success|warning|error)$/.test(type ?? '')
    ? `slds-theme_${type}`
    : null;
  const badgeClassNames = classnames(
    'slds-badge',
    typeClassName,
    themeClassName
  );
  return (
    <span className={badgeClassNames} {...props}>
      {label || props.children}
    </span>
  );
};
