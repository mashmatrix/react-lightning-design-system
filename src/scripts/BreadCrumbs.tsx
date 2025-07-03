import React, { FC, HTMLAttributes } from 'react';
import classnames from 'classnames';

/**
 *
 */
export type CrumbProps = HTMLAttributes<HTMLLIElement> & {
  href?: string;
};

/**
 *
 */
export const Crumb: FC<CrumbProps> = ({
  className,
  href,
  children,
  ...props
}) => {
  const text = children;
  const cClassName = classnames('slds-breadcrumb__item', className);

  return (
    <li {...props} className={cClassName}>
      <a href={href}>{text}</a>
    </li>
  );
};

/**
 *
 */
export type BreadCrumbsProps = HTMLAttributes<HTMLElement>;

/**
 *
 */
export const BreadCrumbs: FC<BreadCrumbsProps> = ({
  className,
  children,
  ...props
}) => {
  const oClassName = classnames(
    'slds-breadcrumb',
    'slds-list_horizontal',
    'slds-wrap',
    className
  );

  return (
    <nav {...props} role='navigation' aria-label='Breadcrumbs'>
      <ol className={oClassName}>{children}</ol>
    </nav>
  );
};
