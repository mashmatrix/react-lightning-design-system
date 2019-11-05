import React, { Component } from 'react';
import { InjectedProps } from './AutoAlign';
import { FormElementProps } from './FormElement';
import { IconCategory } from './Icon';
/**
 *
 */
export declare type LookupEntry = {
    scope?: string;
    category?: IconCategory;
    icon: string;
    label: string;
    value: string;
    meta?: string;
};
export declare type LookupSelectionProps = {
    id?: string;
    selected?: LookupEntry;
    hidden?: boolean;
    onResetSelection?: (e?: any) => void;
    lookupSelectionRef?: (node: HTMLDivElement) => void;
};
/**
 *
 */
export declare class LookupSelection extends Component<LookupSelectionProps> {
    pill: HTMLElement | null;
    onKeyDown(e: any): void;
    renderPill(selected: LookupEntry): JSX.Element;
    render(): JSX.Element;
}
export declare type LookupScope = {
    label: string;
    value: string;
    icon: string;
};
export declare type LookupSearchProps = {
    id?: string;
    className?: string;
    hidden?: boolean;
    searchText?: string;
    scopes?: LookupScope[];
    targetScope?: any;
    iconAlign?: 'left' | 'right';
    disabled?: boolean;
    onKeyDown?: (e: any) => void;
    onBlur?: (e: any) => void;
    onChange?: (searchText: string) => void;
    onScopeMenuClick?: (e: any) => void;
    onScopeChange?: (value: string) => void;
    onPressDown?: () => void;
    onSubmit?: () => void;
    onComplete?: (cancel?: boolean) => void;
    lookupSearchRef?: (node: HTMLDivElement) => void;
};
/**
 *
 */
export declare class LookupSearch extends Component<LookupSearchProps> {
    input: HTMLInputElement | null;
    node: HTMLDivElement | null;
    constructor(props: Readonly<LookupSearchProps>);
    onLookupIconClick: () => void;
    onInputKeyDown: (e: any) => void;
    onInputChange: (e: any) => void;
    onInputBlur: (e: any) => void;
    onScopeMenuClick: (e: any) => void;
    onMenuItemClick: (scope: LookupScope) => void;
    handleLookupSearchRef: (node: HTMLDivElement) => void;
    isFocusedInComponent(): boolean;
    renderSearchInput(props: any): JSX.Element;
    renderScopeSelector({ scopes, targetScope: target, disabled }: any): JSX.Element;
    render(): JSX.Element;
}
export declare type LookupCandidateListProps = {
    data?: LookupEntry[];
    focus?: boolean;
    loading?: boolean;
    filter?: (entry: LookupEntry) => boolean;
    listRef?: (node: HTMLDivElement) => void;
    onSelect?: (entry: LookupEntry | null) => void;
    onBlur?: (e: React.FocusEvent<HTMLAnchorElement>) => void;
    header?: JSX.Element;
    footer?: JSX.Element;
} & InjectedProps;
export declare const LookupCandidateListPortal: {
    new (props: Readonly<{
        data?: LookupEntry[] | undefined;
        focus?: boolean | undefined;
        loading?: boolean | undefined;
        filter?: ((entry: LookupEntry) => boolean) | undefined;
        listRef?: ((node: HTMLDivElement) => void) | undefined;
        onSelect?: ((entry: LookupEntry | null) => void) | undefined;
        onBlur?: ((e: React.FocusEvent<HTMLAnchorElement>) => void) | undefined;
        header?: JSX.Element | undefined;
        footer?: JSX.Element | undefined;
    } & {
        portalClassName?: string | undefined;
        portalStyle?: object | undefined;
        size?: "small" | "medium" | "large" | undefined;
        preventPortalize?: boolean | undefined;
    } & Partial<InjectedProps>>): {
        pid: number | null;
        node: any;
        content: any;
        context: Pick<import("./ComponentSettings").ComponentSettingsContext, "portalClassName" | "portalStyle">;
        state: import("./AutoAlign").AutoAlignState;
        requestRecalcAlignment: (...args: any) => void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        recalcAlignment: () => void;
        updateAlignment(triggerRect: {
            top: number;
            left: number;
            width: number;
            height: number;
        }): void;
        render(): JSX.Element;
        setState<K extends "vertAlign" | "triggerRect" | "horizAlign">(state: import("./AutoAlign").AutoAlignState | ((prevState: Readonly<import("./AutoAlign").AutoAlignState>, props: Readonly<{
            data?: LookupEntry[] | undefined;
            focus?: boolean | undefined;
            loading?: boolean | undefined;
            filter?: ((entry: LookupEntry) => boolean) | undefined;
            listRef?: ((node: HTMLDivElement) => void) | undefined;
            onSelect?: ((entry: LookupEntry | null) => void) | undefined;
            onBlur?: ((e: React.FocusEvent<HTMLAnchorElement>) => void) | undefined;
            header?: JSX.Element | undefined;
            footer?: JSX.Element | undefined;
        } & {
            portalClassName?: string | undefined;
            portalStyle?: object | undefined;
            size?: "small" | "medium" | "large" | undefined;
            preventPortalize?: boolean | undefined;
        } & Partial<InjectedProps>>) => import("./AutoAlign").AutoAlignState | Pick<import("./AutoAlign").AutoAlignState, K> | null) | Pick<import("./AutoAlign").AutoAlignState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            data?: LookupEntry[] | undefined;
            focus?: boolean | undefined;
            loading?: boolean | undefined;
            filter?: ((entry: LookupEntry) => boolean) | undefined;
            listRef?: ((node: HTMLDivElement) => void) | undefined;
            onSelect?: ((entry: LookupEntry | null) => void) | undefined;
            onBlur?: ((e: React.FocusEvent<HTMLAnchorElement>) => void) | undefined;
            header?: JSX.Element | undefined;
            footer?: JSX.Element | undefined;
        } & {
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
    new (props: {
        data?: LookupEntry[] | undefined;
        focus?: boolean | undefined;
        loading?: boolean | undefined;
        filter?: ((entry: LookupEntry) => boolean) | undefined;
        listRef?: ((node: HTMLDivElement) => void) | undefined;
        onSelect?: ((entry: LookupEntry | null) => void) | undefined;
        onBlur?: ((e: React.FocusEvent<HTMLAnchorElement>) => void) | undefined;
        header?: JSX.Element | undefined;
        footer?: JSX.Element | undefined;
    } & {
        portalClassName?: string | undefined;
        portalStyle?: object | undefined;
        size?: "small" | "medium" | "large" | undefined;
        preventPortalize?: boolean | undefined;
    } & Partial<InjectedProps>, context?: any): {
        pid: number | null;
        node: any;
        content: any;
        context: Pick<import("./ComponentSettings").ComponentSettingsContext, "portalClassName" | "portalStyle">;
        state: import("./AutoAlign").AutoAlignState;
        requestRecalcAlignment: (...args: any) => void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        recalcAlignment: () => void;
        updateAlignment(triggerRect: {
            top: number;
            left: number;
            width: number;
            height: number;
        }): void;
        render(): JSX.Element;
        setState<K extends "vertAlign" | "triggerRect" | "horizAlign">(state: import("./AutoAlign").AutoAlignState | ((prevState: Readonly<import("./AutoAlign").AutoAlignState>, props: Readonly<{
            data?: LookupEntry[] | undefined;
            focus?: boolean | undefined;
            loading?: boolean | undefined;
            filter?: ((entry: LookupEntry) => boolean) | undefined;
            listRef?: ((node: HTMLDivElement) => void) | undefined;
            onSelect?: ((entry: LookupEntry | null) => void) | undefined;
            onBlur?: ((e: React.FocusEvent<HTMLAnchorElement>) => void) | undefined;
            header?: JSX.Element | undefined;
            footer?: JSX.Element | undefined;
        } & {
            portalClassName?: string | undefined;
            portalStyle?: object | undefined;
            size?: "small" | "medium" | "large" | undefined;
            preventPortalize?: boolean | undefined;
        } & Partial<InjectedProps>>) => import("./AutoAlign").AutoAlignState | Pick<import("./AutoAlign").AutoAlignState, K> | null) | Pick<import("./AutoAlign").AutoAlignState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            data?: LookupEntry[] | undefined;
            focus?: boolean | undefined;
            loading?: boolean | undefined;
            filter?: ((entry: LookupEntry) => boolean) | undefined;
            listRef?: ((node: HTMLDivElement) => void) | undefined;
            onSelect?: ((entry: LookupEntry | null) => void) | undefined;
            onBlur?: ((e: React.FocusEvent<HTMLAnchorElement>) => void) | undefined;
            header?: JSX.Element | undefined;
            footer?: JSX.Element | undefined;
        } & {
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
        portalClassName: import("prop-types").Requireable<string>;
        portalStyle: import("prop-types").Requireable<object>;
    };
    contextType?: React.Context<any> | undefined;
};
export declare type LookupProps = {
    id?: string;
    className?: string;
    label?: string;
    disabled?: boolean;
    required?: boolean;
    error?: FormElementProps['error'];
    iconAlign?: 'left' | 'right';
    value?: string;
    defaultValue?: string;
    selected?: LookupEntry | null;
    defaultSelected?: LookupEntry;
    opened?: boolean;
    defaultOpened?: boolean;
    searchText?: string;
    defaultSearchText?: string;
    loading?: boolean;
    data?: LookupEntry[];
    lookupFilter?: (entry: LookupEntry, searchText?: string, targetScope?: string) => boolean;
    listHeader?: JSX.Element;
    listFooter?: JSX.Element;
    scopes?: LookupScope[];
    targetScope?: string;
    defaultTargetScope?: string;
    totalCols?: number;
    cols?: number;
    onSearchTextChange?: (searchText: string) => void;
    onScopeMenuClick?: (e: any) => void;
    onScopeChange?: (targetScope: string) => void;
    onLookupRequest?: (searchText?: string) => void;
    onBlur?: () => void;
    onSelect?: (e: any) => void;
    onComplete?: (cancel?: boolean) => void;
};
export declare type LookupState = {
    id: string;
    selected?: LookupEntry | null;
    opened?: boolean;
    searchText?: string;
    targetScope?: string;
    focusFirstCandidate: boolean;
};
/**
 *
 */
export declare class Lookup extends Component<LookupProps, LookupState> {
    static isFormElement: boolean;
    node: HTMLDivElement | null;
    selection: HTMLDivElement | null;
    candidateList: HTMLDivElement | null;
    private search;
    constructor(props: Readonly<LookupProps>);
    onScopeMenuClick(e: any): void;
    onScopeChange(targetScope: string): void;
    onSearchTextChange(searchText: string): void;
    onLookupRequest(searchText?: string): void;
    onResetSelection(): void;
    onLookupItemSelect(selected: LookupEntry | null): void;
    onFocusFirstCandidate(): void;
    onBlur(): void;
    isFocusedInComponent(): boolean;
    render(): JSX.Element;
}
