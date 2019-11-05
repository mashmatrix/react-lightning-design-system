import React, { FieldsetHTMLAttributes } from 'react';
import { FormElementProps } from './FormElement';
export declare type CheckboxGroupProps = {
    className?: string;
    label?: string;
    required?: boolean;
    error?: FormElementProps['error'];
    name?: string;
    totalCols?: number;
    cols?: number;
    style?: object;
    onChange?: (e: React.FormEvent<HTMLFieldSetElement>, values: (string | number)[]) => void;
} & FieldsetHTMLAttributes<HTMLFieldSetElement>;
export declare class CheckboxGroup extends React.Component<CheckboxGroupProps> {
    static isFormElement: boolean;
    private nodes;
    constructor(props: Readonly<CheckboxGroupProps>);
    onChange(e: React.FormEvent<HTMLFieldSetElement>): void;
    renderControl(checkbox: any, i: number): React.DetailedReactHTMLElement<any, HTMLElement>;
    render(): JSX.Element;
}
