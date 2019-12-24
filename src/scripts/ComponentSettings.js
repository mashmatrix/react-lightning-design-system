import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 */
export default class ComponentSettings extends React.Component {
  /* eslint-disable no-undef */
  static propTypes = {
    assetRoot: PropTypes.string,
    portalClassName: PropTypes.string,
    portalStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    children: PropTypes.node,
  }

  static childContextTypes = {
    assetRoot: PropTypes.string,
    portalClassName: PropTypes.string,
    portalStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }
  /* eslint-enable no-undef */

  getChildContext() {
    const { assetRoot, portalClassName, portalStyle } = this.props;
    return { assetRoot, portalClassName, portalStyle };
  }

  render() {
    return this.props.children;
  }
}
