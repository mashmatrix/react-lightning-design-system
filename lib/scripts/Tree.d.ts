import React, { Component, HTMLAttributes } from 'react';
export declare type TreeProps = {
    className?: string;
    label?: string;
    toggleOnNodeClick?: boolean;
    onNodeClick?: (...args: any[]) => any;
    onNodeToggle?: (...args: any[]) => any;
    onNodeLabelClick?: (...args: any[]) => any;
} & HTMLAttributes<HTMLDivElement>;
export declare class Tree extends Component<TreeProps, {}> {
    constructor(props: Readonly<TreeProps>);
    renderTreeNode(tnode: any): React.FunctionComponentElement<{
        level: number;
        onNodeClick: (...args: any[]) => any;
        onNodeToggle: (...args: any[]) => any;
        onNodeLabelClick: (...args: any[]) => any;
        toggleOnNodeClick: boolean;
    }>;
    render(): JSX.Element;
}
