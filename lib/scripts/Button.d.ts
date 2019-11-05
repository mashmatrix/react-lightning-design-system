import React, { Component, ReactNode, ButtonHTMLAttributes } from 'react';
declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare type ButtonType = 'neutral' | 'brand' | 'destructive' | 'inverse' | 'icon' | 'icon-bare' | 'icon-container' | 'icon-inverse' | 'icon-more' | 'icon-border' | 'icon-border-filled' | 'icon-border-inverse';
declare const ICON_SIZES: readonly ["x-small", "small", "medium", "large"];
declare const ICON_ALIGNS: readonly ["left", "right"];
export declare type ButtonSize = 'x-small' | 'small' | 'medium' | 'large';
export declare type ButtonIconSize = typeof ICON_SIZES[number];
export declare type ButtonIconAlign = typeof ICON_ALIGNS[number];
export declare type ButtonIconMoreSize = 'x-small' | 'small' | 'medium' | 'large';
export declare type ButtonProps = {
    className?: string;
    label?: ReactNode;
    alt?: string;
    type?: ButtonType;
    size?: ButtonSize;
    htmlType?: 'button' | 'submit' | 'reset';
    selected?: boolean;
    inverse?: boolean;
    loading?: boolean;
    icon?: string;
    iconSize?: ButtonIconSize;
    iconAlign?: ButtonIconAlign;
    iconMore?: string;
    iconMoreSize?: ButtonIconMoreSize;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    buttonRef?: (node: HTMLButtonElement) => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;
export declare class Button extends Component<ButtonProps, {}> {
    node: HTMLButtonElement | null;
    constructor(props: Readonly<ButtonProps>);
    onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
    renderIcon(iconSize: ButtonProps['iconSize'], inv: ButtonProps['inverse']): JSX.Element;
    renderIconMore(): JSX.Element;
    render(): JSX.Element;
}
export declare type ButtonIconProps = {
    className?: string;
    icon: string;
    align?: ButtonIconAlign;
    size?: ButtonIconSize;
    inverse?: boolean;
    style?: object;
};
export declare const ButtonIcon: React.FC<ButtonIconProps>;
export {};
