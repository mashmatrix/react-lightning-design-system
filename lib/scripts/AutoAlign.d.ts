import React from 'react';
import PropTypes from 'prop-types';
import { ComponentSettingsContext } from './ComponentSettings';
declare type Rect = {
    top: number;
    left: number;
    width: number;
    height: number;
};
export declare type AutoAlignOptions = {
    triggerSelector: string;
};
export declare type AutoAlignProps = {
    portalClassName?: string;
    portalStyle?: object;
    size?: 'small' | 'medium' | 'large';
    preventPortalize?: boolean;
} & Partial<InjectedProps>;
export declare type InjectedProps = {
    align: 'left' | 'right';
    vertAlign: 'top' | 'bottom';
};
export declare type AutoAlignState = {
    triggerRect: Rect;
    horizAlign: string;
    vertAlign: string;
};
/**
 *
 */
export declare function autoAlign(options: AutoAlignOptions): <TOriginalProps extends {}>(Cmp: React.ComponentType<TOriginalProps & InjectedProps>) => {
    new (props: Readonly<TOriginalProps & {
        portalClassName?: string | undefined;
        portalStyle?: object | undefined;
        size?: "small" | "medium" | "large" | undefined;
        preventPortalize?: boolean | undefined;
    } & Partial<InjectedProps>>): {
        pid: number | null;
        node: any;
        content: any;
        context: Pick<ComponentSettingsContext, "portalClassName" | "portalStyle">;
        state: AutoAlignState;
        requestRecalcAlignment: (...args: any) => void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        recalcAlignment: () => void;
        updateAlignment(triggerRect: Rect): void;
        render(): JSX.Element;
        setState<K extends "vertAlign" | "triggerRect" | "horizAlign">(state: AutoAlignState | ((prevState: Readonly<AutoAlignState>, props: Readonly<TOriginalProps & {
            portalClassName?: string | undefined;
            portalStyle?: object | undefined;
            size?: "small" | "medium" | "large" | undefined;
            preventPortalize?: boolean | undefined;
        } & Partial<InjectedProps>>) => AutoAlignState | Pick<AutoAlignState, K> | null) | Pick<AutoAlignState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<TOriginalProps & {
            portalClassName?: string | undefined;
            portalStyle?: object | undefined;
            size?: "small" | "medium" | "large" | undefined;
            preventPortalize?: boolean | undefined;
        } & Partial<InjectedProps>> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: TOriginalProps & {
        portalClassName?: string | undefined;
        portalStyle?: object | undefined;
        size?: "small" | "medium" | "large" | undefined;
        preventPortalize?: boolean | undefined;
    } & Partial<InjectedProps>, context?: any): {
        pid: number | null;
        node: any;
        content: any;
        context: Pick<ComponentSettingsContext, "portalClassName" | "portalStyle">;
        state: AutoAlignState;
        requestRecalcAlignment: (...args: any) => void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        recalcAlignment: () => void;
        updateAlignment(triggerRect: Rect): void;
        render(): JSX.Element;
        setState<K extends "vertAlign" | "triggerRect" | "horizAlign">(state: AutoAlignState | ((prevState: Readonly<AutoAlignState>, props: Readonly<TOriginalProps & {
            portalClassName?: string | undefined;
            portalStyle?: object | undefined;
            size?: "small" | "medium" | "large" | undefined;
            preventPortalize?: boolean | undefined;
        } & Partial<InjectedProps>>) => AutoAlignState | Pick<AutoAlignState, K> | null) | Pick<AutoAlignState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<TOriginalProps & {
            portalClassName?: string | undefined;
            portalStyle?: object | undefined;
            size?: "small" | "medium" | "large" | undefined;
            preventPortalize?: boolean | undefined;
        } & Partial<InjectedProps>> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    contextTypes: {
        portalClassName: PropTypes.Requireable<string>;
        portalStyle: PropTypes.Requireable<object>;
    };
    contextType?: React.Context<any> | undefined;
};
export {};
