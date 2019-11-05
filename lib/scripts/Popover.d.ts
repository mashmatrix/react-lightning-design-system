import React from 'react';
export declare const PopoverHeader: React.FC;
export declare type PopoverBodyProps = React.HTMLAttributes<HTMLDivElement>;
export declare const PopoverBody: React.FC<PopoverBodyProps>;
export declare type PopoverPosition = 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'left' | 'left-top' | 'left-bottom' | 'right' | 'right-top' | 'right-bottom';
export declare type PopoverTheme = 'info' | 'success' | 'warning' | 'error';
export declare type PopoverProps = {
    position?: PopoverPosition;
    hidden?: boolean;
    theme?: PopoverTheme;
    tooltip?: boolean;
    hover?: boolean;
    bodyStyle?: object;
    trigger?: () => any;
} & React.HTMLAttributes<HTMLDivElement>;
export declare type PopoverState = {
    hidden?: boolean;
};
export declare class Popover extends React.Component<PopoverProps, PopoverState> {
    private isMouseEntered;
    constructor(props: Readonly<PopoverProps>);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    documentClick(e: any): void;
    toggle(value: boolean): void;
    mouseEntered(): boolean;
    hidden(): boolean | undefined;
    render(): JSX.Element;
}
