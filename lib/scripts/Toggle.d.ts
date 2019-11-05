import { Component, InputHTMLAttributes } from 'react';
import { FormElementProps } from './FormElement';
export declare type ToggleProps = {
    className?: string;
    label?: string;
    required?: boolean;
    error?: FormElementProps['error'];
    totalCols?: number;
    cols?: number;
    name?: string;
    value?: string | number;
    checked?: boolean;
    defaultChecked?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;
export declare class Toggle extends Component<ToggleProps> {
    node: HTMLDivElement | null;
    renderToggle({ className, label, ...props }: ToggleProps): JSX.Element;
    render(): JSX.Element;
}
