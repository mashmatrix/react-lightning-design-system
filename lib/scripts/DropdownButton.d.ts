import React, { Component } from 'react';
import { ButtonProps } from './Button';
export declare type DropdownMenuAlign = 'left' | 'right';
export declare type DropdownMenuSize = 'small' | 'medium' | 'large';
export declare type DropdownButtonProps = {
    className?: string;
    label?: React.ReactNode;
    menuAlign?: DropdownMenuAlign;
    menuSize?: DropdownMenuSize;
    menuHeader?: string;
    nubbinTop?: boolean;
    hoverPopup?: boolean;
    grouped?: boolean;
    isFirstInGroup?: boolean;
    isLastInGroup?: boolean;
    style?: object;
    menuStyle?: object;
    onBlur?: (...args: any[]) => any;
    onClick?: (...args: any[]) => any;
    onMenuItemClick?: (...args: any[]) => any;
} & ButtonProps;
declare type DropdownButtonState = {
    opened: boolean;
};
export declare class DropdownButton extends Component<DropdownButtonProps, DropdownButtonState> {
    node: HTMLDivElement | null;
    trigger: HTMLButtonElement | null;
    dropdown: HTMLDivElement | null;
    constructor(props: Readonly<DropdownButtonProps>);
    onBlur(): void;
    onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>): void;
    onTriggerClick(...args: any[]): void;
    onMenuItemClick(...args: any[]): void;
    onMenuClose(): void;
    isFocusedInComponent(): boolean;
    focusToTargetItemEl(): void;
    renderButton({ grouped, isFirstInGroup, isLastInGroup, ...props }: any): JSX.Element;
    render(): JSX.Element;
}
export {};
