import React, { Component, HTMLAttributes, ReactNode } from 'react';
import { DropdownButtonProps } from './DropdownButton';
export declare type TabContentProps = {
    className?: string;
    active?: boolean;
} & HTMLAttributes<HTMLDivElement>;
export declare type TabMenuProps = DropdownButtonProps;
declare type EventKey = string | number;
export declare type TabType = 'default' | 'scoped';
export declare type TabItemRendererProps = {
    type?: TabType;
    title?: string;
    menu?: JSX.Element;
    menuItems?: JSX.Element[];
    menuIcon?: string;
    eventKey?: EventKey;
    activeKey?: EventKey;
    activeTabRef?: (node: HTMLAnchorElement) => void;
    onTabClick?: (eventKey: EventKey | undefined) => void;
    onTabKeyDown?: (eventKey: EventKey | undefined, e: React.KeyboardEvent<HTMLAnchorElement>) => void;
    [key: string]: any;
};
export declare type TabItemProps = {
    tabItemRenderer?: (props: TabItemRendererProps) => JSX.Element;
} & TabItemRendererProps;
export declare type TabNavProps = {
    type?: TabType;
    activeKey?: EventKey;
    tabs?: ReactNode;
    activeTabRef?: (node: HTMLAnchorElement) => void;
    onTabClick?: (eventKey?: EventKey) => void;
    onTabKeyDown?: (eventKey: EventKey | undefined, e: React.KeyboardEvent<HTMLAnchorElement>) => void;
};
export declare type TabProps = {
    className?: string;
    eventKey?: EventKey;
    activeKey?: EventKey;
} & TabItemProps;
/**
 *
 */
export declare const Tab: React.FC<TabProps>;
export declare type TabsProps = {
    className?: string;
    type?: TabType;
    defaultActiveKey?: EventKey;
    activeKey?: EventKey;
    onSelect: (tabKey: EventKey | undefined) => void;
};
export declare type TabsState = {
    focusTab?: boolean;
    activeKey?: EventKey;
};
/**
 *
 */
export declare class Tabs extends Component<TabsProps, TabsState> {
    activeTab: HTMLAnchorElement | null;
    constructor(props: Readonly<TabsProps>);
    componentDidUpdate(): void;
    onTabClick: (tabKey: string | number | undefined) => void;
    onTabKeyDown: (tabKey: string | number | undefined, e: React.KeyboardEvent<HTMLAnchorElement>) => void;
    render(): JSX.Element;
}
export {};
