import React, { createContext, FC, ReactNode } from 'react';

export type ComponentSettingsProps = {
  assetRoot?: string;
  portalClassName?: string;
  portalStyle?: object;
  getActiveElement?: () => HTMLElement | null;
  children?: ReactNode;
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
export const ComponentSettings: FC<ComponentSettingsProps> = (props) => {
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
