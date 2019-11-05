import React from 'react';
import PropTypes from 'prop-types';
export declare type ComponentSettingsProps = {
    assetRoot?: string;
    portalClassName?: string;
    portalStyle?: object;
};
export declare type ComponentSettingsContext = {
    assetRoot?: string;
    portalClassName?: string;
    portalStyle?: object;
};
/**
 *
 */
export declare class ComponentSettings extends React.Component<ComponentSettingsProps, {}> {
    static childContextTypes: {
        assetRoot: PropTypes.Requireable<string>;
        portalClassName: PropTypes.Requireable<string>;
        portalStyle: PropTypes.Requireable<object>;
    };
    getChildContext(): ComponentSettingsContext;
    render(): React.ReactNode;
}
