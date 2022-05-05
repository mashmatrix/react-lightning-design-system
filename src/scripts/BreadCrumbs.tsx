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
  const cClassName = classnames(
    'slds-list__item slds-text-heading_label',
    className
  );

  return (
    <li {...props} className={cClassName}>
      <a href={href}>{text}</a>
    </li>
  );
};

/**
 *
 */
export type BreadCrumbsProps = {
  label?: string;
} & HTMLAttributes<HTMLElement>;

/**
 *
 */
export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({
  label,
  className,
  children,
  ...props
}) => {
  const oClassName = classnames(
    'slds-breadcrumb slds-list_horizontal',
    className
  );

  return (
    <nav {...props} role='navigation'>
      {label ? (
        <p id='bread-crumb-label' className='slds-assistive-text'>
          {label}
        </p>
      ) : null}
      <ol className={oClassName} aria-labelledby='bread-crumb-label'>
        {children}
      </ol>
    </nav>
  );
};
