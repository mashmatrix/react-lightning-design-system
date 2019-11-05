import { Component, InputHTMLAttributes } from 'react';
import { FormElementProps } from './FormElement';
export declare type CheckboxProps = {
    className?: string;
    label?: string;
    required?: boolean;
    error?: FormElementProps['error'];
    totalCols?: number;
    cols?: number;
    grouped?: boolean;
    name?: string;
    value?: string | number;
    checked?: boolean;
    defaultChecked?: boolean;
    checkboxRef?: (node: HTMLLabelElement | null) => void;
} & InputHTMLAttributes<HTMLInputElement>;
export declare class Checkbox extends Component<CheckboxProps> {
    node: HTMLDivElement | HTMLLabelElement | null;
    componentWillReceiveProps(nextProps: Readonly<CheckboxProps>): void;
    renderCheckbox({ className, label, checkboxRef, ...props }: CheckboxProps): JSX.Element;
    render(): JSX.Element;
}
