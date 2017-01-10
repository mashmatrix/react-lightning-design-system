import React, { PropTypes } from 'react';
import classnames from 'classnames';

const ARROW_ALIGNMENTS = [
  'left',
  'left-top',
  'left-bottom',
  'right',
  'right-top',
  'right-bottom',
  'top',
  'top-right',
  'top-left',
  'bottom',
  'bottom-right',
  'bottom-left',
];

const Popover = ({ children, arrow, theme, className, htmlAttr, hidden }) => {
  if (!hidden) {
    return (
      <div
        className={classnames(
          className,
          'slds-popover',
          {
            [`slds-nubbin--${arrow}`]: !!arrow,
            [`slds-theme--${theme}`]: !!theme,
          }
        )}
        role='dialog'
        {...htmlAttr}
      >
        <div className='slds-popover__body'>
          {children}
        </div>
      </div>
    );
  }
  return null;
};

Popover.propTypes = {
  children: PropTypes.node,
  arrow: PropTypes.oneOf(ARROW_ALIGNMENTS),
  theme: PropTypes.oneOf(['info', 'error', 'warning', 'success']),
  htmlAttr: PropTypes.object,
  className: PropTypes.string,
  hidden: PropTypes.bool,
};

export default Popover;
