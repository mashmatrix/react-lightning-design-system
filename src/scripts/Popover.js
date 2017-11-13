import React from 'react';
import classnames from 'classnames';
import PropTypes from './propTypesImport';

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

const Popover = ({ children, arrow, theme, className, htmlAttr, hidden, id, role }) => (
  <div
    id={id}
    className={classnames(
      className,
      'slds-popover',
      {
        [`slds-nubbin--${arrow}`]: !!arrow,
        [`slds-theme--${theme}`]: !!theme,
        'slds-hide': !!hidden,
      }
    )}
    role={role || 'dialog'}
    {...htmlAttr}
  >
    <div className='slds-popover__body'>
      {children}
    </div>
  </div>
);


Popover.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  arrow: PropTypes.oneOf(ARROW_ALIGNMENTS),
  theme: PropTypes.oneOf(['info', 'error', 'warning', 'success']),
  role: PropTypes.oneOf(['tooltip', 'dialog']),
  htmlAttr: PropTypes.object,
  className: PropTypes.string,
  hidden: PropTypes.bool,
};

export default Popover;
