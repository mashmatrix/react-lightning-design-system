import React from 'react';
import PropTypes from 'prop-types';

export type ComponentSettingsProps = {
  assetRoot?: string;
  portalClassName?: string;
  portalStyle?: object;
};

export type ComponentSettingsContext = {
  assetRoot?: string;
  portalClassName?: string;
  portalStyle?: object;
};

/**
 *
 */
export default class ComponentSettings extends React.Component<
  ComponentSettingsProps,
  {}
> {
  static childContextTypes = {
    assetRoot: PropTypes.string,
    portalClassName: PropTypes.string,
    portalStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  getChildContext(): ComponentSettingsContext {
    const { assetRoot, portalClassName, portalStyle } = this.props;
    return { assetRoot, portalClassName, portalStyle };
  }

  render() {
    return this.props.children;
  }
}
