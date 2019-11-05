import React from 'react';
export declare type PathItemProps = {
    className?: string;
    eventKey?: any;
    type?: 'complete' | 'current' | 'incomplete';
    title?: string;
    completedTitle?: string;
    onSelect?: (itemKey: any) => void;
};
declare class PathItem extends React.Component<PathItemProps> {
    onItemClick(itemKey: any): void;
    render(): JSX.Element;
}
export declare type SalesPathProps = {
    className?: string;
    defaultActiveKey?: any;
    activeKey?: any;
    onSelect?: (itemKey: any) => void;
};
export declare type SalesPathState = {
    activeKey?: any;
};
export declare class SalesPath extends React.Component<SalesPathProps, SalesPathState> {
    static PathItem: typeof PathItem;
    constructor(props: Readonly<SalesPathProps>);
    onItemClick(itemKey: any): void;
    renderSalesPath(activeKey: any, paths: any): JSX.Element[];
    render(): JSX.Element;
}
export {};
