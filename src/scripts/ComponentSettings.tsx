import React, { createContext } from 'react';

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
export class ComponentSettings extends React.PureComponent<
  ComponentSettingsProps
> {
  render() {
    const { assetRoot, portalClassName, portalStyle, children } = this.props;
    return (
      <ComponentSettingsContext.Provider
        value={{ assetRoot, portalClassName, portalStyle }}
      >
        {children}
      </ComponentSettingsContext.Provider>
    );
  }
}
