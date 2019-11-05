import React, { Component, AnchorHTMLAttributes } from 'react';
import { InjectedProps } from './AutoAlign';
export declare type DropdownMenuHeaderProps = {
    className?: string;
    divider?: 'top' | 'bottom';
};
export declare const DropdownMenuHeader: React.FC<DropdownMenuHeaderProps>;
export declare const MenuHeader: React.FunctionComponent<DropdownMenuHeaderProps>;
export declare type DropdownMenuItemProps = {
    className?: string;
    label?: string;
    icon?: string;
    iconRight?: string;
    disabled?: boolean;
    divider?: 'top' | 'bottom';
    tabIndex?: number;
    selected?: boolean;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    onBlur?: (e: React.FocusEvent<HTMLAnchorElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLAnchorElement>) => void;
} & AnchorHTMLAttributes<HTMLAnchorElement>;
export declare class DropdownMenuItem extends Component<DropdownMenuItemProps> {
    onKeyDown(e: any): void;
    onBlur(e: React.FocusEvent<HTMLAnchorElement>): void;
    onFocus(e: React.FocusEvent<HTMLAnchorElement>): void;
    render(): JSX.Element;
}
export declare const MenuItem: typeof DropdownMenuItem;
export declare type DropdownMenuProps = {
    className?: string;
    size?: 'small' | 'medium' | 'large';
    header?: string;
    nubbin?: 'top' | 'top left' | 'top right' | 'bottom' | 'bottom left' | 'bottom right' | 'auto';
    nubbinTop?: boolean;
    hoverPopup?: boolean;
    onMenuItemClick?: (props: any, ...args: any[]) => void;
    onMenuClose?: () => void;
    onBlur?: (e: any) => void;
    onFocus?: (e: any) => void;
    dropdownMenuRef?: (node: HTMLDivElement) => void;
    style?: object;
};
export declare const DropdownMenu: React.FunctionComponent<DropdownMenuProps & {
    portalClassName?: string | undefined;
    portalStyle?: object | undefined;
    size?: "small" | "medium" | "large" | undefined;
    preventPortalize?: boolean | undefined;
} & Partial<InjectedProps>>;
