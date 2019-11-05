import { Component, SVGAttributes } from 'react';
import PropTypes from 'prop-types';
import { ComponentSettingsContext } from './ComponentSettings';
export declare type IconCategory = 'action' | 'custom' | 'doctype' | 'standard' | 'utility';
export declare type IconSize = 'x-small' | 'small' | 'medium' | 'large';
export declare type IconContainer = boolean | 'default' | 'circle';
export declare type IconTextColor = 'default' | 'warning' | 'error' | null;
export declare type IconProps = {
    className?: string;
    containerClassName?: string;
    category?: IconCategory;
    icon: string;
    size?: IconSize;
    align?: 'left' | 'right';
    container?: IconContainer;
    color?: string;
    textColor?: IconTextColor;
    tabIndex?: number;
    fillColor?: string;
};
export declare type IconState = {
    iconColor?: string;
};
export declare class Icon extends Component<IconProps & SVGAttributes<SVGElement>, IconState> {
    static contextTypes: {
        assetRoot: PropTypes.Requireable<string>;
    };
    static ICONS: {
        STANDARD_ICONS: string[];
        CUSTOM_ICONS: string[];
        ACTION_ICONS: string[];
        DOCTYPE_ICONS: string[];
        UTILITY_ICONS: string[];
    };
    context: Pick<ComponentSettingsContext, 'assetRoot'>;
    iconContainer: HTMLSpanElement | null;
    svgIcon: SVGElement | null;
    constructor(props: Readonly<IconProps & SVGAttributes<SVGElement>>);
    componentDidMount(): void;
    componentDidUpdate(): void;
    getIconColor(fillColor: string | undefined, category: string | undefined, icon: string): string | null;
    checkIconColor(): void;
    renderSVG({ className, category, icon, size, align, fillColor, container, textColor, style, assetRoot, ...props }: any): JSX.Element;
    render(): JSX.Element;
}
