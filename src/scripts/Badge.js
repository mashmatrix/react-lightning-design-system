import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default class Badge extends React.Component {
  render() {
    const { children, type, label } = this.props;
    const typeClassName = type ? `slds-theme--${type}` : null;
    const badgeClassNames = classnames(
      'slds-badge',
      typeClassName
    );
    return (
      <span className={ badgeClassNames }>
        { label || children }
      </span>
    );
  }
}

export const BADGE_TYPES = ['default', 'shade', 'inverse'];

Badge.propTypes = {
  type: PropTypes.oneOf(BADGE_TYPES),
  label: PropTypes.string,
  children: PropTypes.node,
};
