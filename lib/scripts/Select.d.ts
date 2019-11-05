import React, { Component } from 'react';
import { FormElementProps } from './FormElement';
declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare type SelectProps = {
    id?: string;
    className?: string;
    label?: string;
    required?: boolean;
    totalCols?: number;
    cols?: number;
    error?: FormElementProps['error'];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>, value: string) => void;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'>;
export declare type SelectState = {
    id: string;
};
export declare class Select extends Component<SelectProps, SelectState> {
    static isFormElement: boolean;
    constructor(props: Readonly<SelectProps>);
    onChange(e: React.ChangeEvent<HTMLSelectElement>): void;
    render(): JSX.Element;
}
export declare type OptionProps = {
    label?: string | number;
} & Omit<React.OptionHTMLAttributes<HTMLOptionElement>, 'label'>;
export declare const Option: React.FC<OptionProps>;
export {};
