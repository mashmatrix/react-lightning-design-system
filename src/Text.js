import React, { PropTypes } from 'react';

import classnames from 'classnames';

const Text = ({ tag, category, type, align, truncate, children, className, ...props }) => {
  const textClassNames = classnames(
    `slds-text-${category}--${type}`,
    truncate ? 'slds-truncate' : null,
    align ? `slds-text-align--${align}` : null,
    className
  );
  const Tag = tag || 'p';
  return (
    <Tag {...props} className={textClassNames}>
      {children}
    </Tag>
  );
};

const TEXT_CATEGORIES = ['body', 'heading'];
const TEXT_BODY_TYPES = ['regular', 'small'];
const TEXT_HEADING_TYPES = ['large', 'medium', 'label'];
const TEXT_TYPES = ['small'].concat(TEXT_BODY_TYPES, TEXT_HEADING_TYPES);
const TEXT_ALIGNS = ['left', 'center', 'right'];

Text.propTypes = {
  tag: PropTypes.string,
  category: PropTypes.oneOf(TEXT_CATEGORIES).isRequired,
  type: PropTypes.oneOf(TEXT_TYPES).isRequired,
  align: PropTypes.oneOf(TEXT_ALIGNS),
  className: PropTypes.string,
  children: PropTypes.node,
  truncate: PropTypes.bool,
};

export default Text;
