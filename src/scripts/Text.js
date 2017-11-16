import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Text = ({ tag, category, type, align, truncate, section, children, className, ...props }) => {
  const textClassNames = classnames(
    {
      [`slds-text-${category}--${type}`]: type && category,
      [`slds-text-${category}`]: category && !type,
      'slds-truncate': truncate,
      [`slds-text-align--${align}`]: align,
      'slds-section-title--divider': section,
    },
    className
  );
  const Tag = tag || 'p';
  const pprops = Object.assign({}, props);
  delete pprops.trancate;
  return (
    <Tag {...pprops} className={textClassNames}>
      {children}
    </Tag>
  );
};

const TEXT_CATEGORIES = ['body', 'heading', 'title'];
const TEXT_BODY_TYPES = ['regular', 'small', 'caps'];
const TEXT_HEADING_TYPES = ['large', 'medium', 'label'];
const TEXT_TYPES = ['small'].concat(TEXT_BODY_TYPES, TEXT_HEADING_TYPES);
const TEXT_ALIGNS = ['left', 'center', 'right'];

Text.propTypes = {
  tag: PropTypes.string,
  category: PropTypes.oneOf(TEXT_CATEGORIES),
  type: PropTypes.oneOf(TEXT_TYPES),
  align: PropTypes.oneOf(TEXT_ALIGNS),
  className: PropTypes.string,
  children: PropTypes.node,
  truncate: PropTypes.bool,
  section: PropTypes.bool,
};

export default Text;
