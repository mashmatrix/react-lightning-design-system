import React, { Component } from 'react';
export declare type TreeNodeProps = {
    className?: string;
    label?: string;
    toggleOnNodeClick?: boolean;
    defaultOpened?: boolean;
    opened?: boolean;
    selected?: boolean;
    leaf?: boolean;
    loading?: boolean;
    level?: number;
    onClick?: (e: React.MouseEvent, props: any) => void;
    onToggle?: (e: React.MouseEvent, props: any) => void;
    onNodeToggle?: (e: React.MouseEvent, props: any) => void;
    onNodeLabelClick?: (e: React.MouseEvent, props: any) => void;
    onLabelClick?: (e: React.MouseEvent, props: any) => void;
    onNodeClick?: (e: React.MouseEvent, props: any) => void;
    itemRender?: (props: any) => void;
};
declare type TreeNodeState = {
    opened?: boolean;
};
export declare class TreeNode extends Component<TreeNodeProps, TreeNodeState> {
    constructor(props: Readonly<TreeNodeProps>);
    onToggle(e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>): void;
    onLabelClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
    onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
    renderTreeItem(itemProps: any): JSX.Element;
    renderChildNode(level: number, tnode: any): React.FunctionComponentElement<{
        level: number;
        onNodeClick: (e: React.MouseEvent<Element, MouseEvent>, props: any) => void;
        onNodeToggle: (e: React.MouseEvent<Element, MouseEvent>, props: any) => void;
        onNodeLabelClick: (e: React.MouseEvent<Element, MouseEvent>, props: any) => void;
        toggleOnNodeClick: boolean;
    }>;
    render(): JSX.Element;
}
export {};
