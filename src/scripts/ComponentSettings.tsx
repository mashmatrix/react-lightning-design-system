import React, { createContext } from 'react';

export type ComponentSettingsProps = {
  assetRoot?: string;
  portalClassName?: string;
  portalStyle?: object;
  getActiveElement?: () => HTMLElement | null;
};

function getDocumentActiveElement() {
  return document.activeElement as HTMLElement | null;
}

export const ComponentSettingsContext = createContext<
  ComponentSettingsProps &
    Required<Pick<ComponentSettingsProps, 'getActiveElement'>>
>({ getActiveElement: getDocumentActiveElement });

/**
 *
 */
export class ComponentSettings extends React.PureComponent<ComponentSettingsProps> {
  render() {
    const {
      assetRoot,
      portalClassName,
      portalStyle,
      getActiveElement = getDocumentActiveElement,
      children,
    } = this.props;
    return (
      <ComponentSettingsContext.Provider
        value={{ assetRoot, portalClassName, portalStyle, getActiveElement }}
      >
        {children}
      </ComponentSettingsContext.Provider>
    );
  }
}
