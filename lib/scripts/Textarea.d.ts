import React, { Component, TextareaHTMLAttributes } from 'react';
import { FormElementProps } from './FormElement';
export declare type TextareaProps = {
    id?: string;
    className?: string;
    label?: string;
    required?: boolean;
    error?: FormElementProps['error'];
    totalCols?: number;
    cols?: number;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>, value: string) => void;
    textareaRef?: (...args: any[]) => any;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;
declare type TextareaState = {
    id: string;
};
export declare class Textarea extends Component<TextareaProps, TextareaState> {
    static isFormElement: boolean;
    constructor(props: Readonly<TextareaProps>);
    onChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
    render(): JSX.Element;
}
export {};
