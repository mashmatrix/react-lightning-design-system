import React, { Component, ReactHTML, HTMLAttributes } from 'react';
import { IconCategory } from './Icon';
export declare type PillProps = {
    className?: string;
    label?: string;
    truncate?: boolean;
    disabled?: boolean;
    tag?: keyof ReactHTML;
    icon?: {
        category?: IconCategory;
        icon?: string;
    };
    pillRef?: (node: HTMLElement) => void;
    onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onRemove?: (e: any) => void;
} & HTMLAttributes<HTMLSpanElement>;
export declare class Pill extends Component<PillProps> {
    onPillClick(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
    onPillRemove(e: any): void;
    onKeyDown(e: React.KeyboardEvent<HTMLElement>): void;
    render(): JSX.Element;
}
