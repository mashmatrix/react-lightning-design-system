import React, { createContext, FC } from 'react';

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
const ComponentSettings_: FC<ComponentSettingsProps> = (props) => {
  const {
    assetRoot,
    portalClassName,
    portalStyle,
    getActiveElement = getDocumentActiveElement,
    children,
  } = props;
  return (
    <ComponentSettingsContext.Provider
      value={{ assetRoot, portalClassName, portalStyle, getActiveElement }}
    >
      {children}
    </ComponentSettingsContext.Provider>
  );
};

export const ComponentSettings = React.memo(ComponentSettings_);
