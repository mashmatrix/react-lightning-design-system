import React, { Component, InputHTMLAttributes } from 'react';
import { FormElementProps } from './FormElement';
declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare type InputProps = {
    id?: string;
    className?: string;
    label?: string;
    required?: boolean;
    error?: FormElementProps['error'];
    totalCols?: number;
    cols?: number;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    bare?: boolean;
    symbolPattern?: string;
    readOnly?: boolean;
    htmlReadOnly?: boolean;
    iconLeft?: string | JSX.Element;
    iconRight?: string | JSX.Element;
    addonLeft?: string;
    addonRight?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    inputRef?: (node: HTMLInputElement) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;
export declare class Input extends Component<InputProps> {
    static isFormElement: boolean;
    constructor(props: Readonly<InputProps>);
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    onKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void;
    registerIconStyle(): void;
    renderAddon(content: string): JSX.Element;
    renderIcon(icon: any, align: 'left' | 'right'): JSX.Element;
    renderInput(props: InputProps): JSX.Element;
    render(): JSX.Element;
}
export {};
