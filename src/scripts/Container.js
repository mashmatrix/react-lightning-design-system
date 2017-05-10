import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Container = ({ className, size, align, children, ...props }) => {
  const ctClassNames = classnames(
    className,
    `slds-container--${size || 'fluid'}`,
    align ? `slds-container--${align}` : null
  );
  return (
    <div className={ ctClassNames } { ...props } >
      { children }
    </div>
  );
};

const CONTAINER_SIZES = [
  'small',
  'medium',
  'large',
];

const CONTAINER_ALIGNS = [
  'left',
  'center',
  'right',
];

Container.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(CONTAINER_SIZES),
  align: PropTypes.oneOf(CONTAINER_ALIGNS),
  children: PropTypes.element,
};

export default Container;
