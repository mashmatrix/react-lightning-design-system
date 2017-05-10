import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const Crumb = ({ className, href, children, ...props }) => {
  const text = children;
  const cClassName = classnames(
    'slds-list__item slds-text-heading--label',
    className
  );

  return (
    <li { ...props } className={ cClassName }>
      <a href={ href }>{ text }</a>
    </li>
  );
};

Crumb.propTypes = {
  href: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

const BreadCrumbs = ({ label, className, children, ...props }) => {
  const oClassName = classnames(
    'slds-breadcrumb slds-list--horizontal',
    className
  );

  return (
    <nav { ...props } role='navigation'>
      {label ?
        <p id='bread-crumb-label' className='slds-assistive-text'>{ label }</p> : null}
      <ol className={ oClassName } aria-labelledby='bread-crumb-label'>
        { children }
      </ol>
    </nav>
  );
};

BreadCrumbs.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default BreadCrumbs;
