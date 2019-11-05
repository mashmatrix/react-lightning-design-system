import { Component, FormHTMLAttributes } from 'react';
export declare type FormProps = {
    className?: string;
    type?: 'stacked' | 'horizontal' | 'inline' | 'compound';
} & FormHTMLAttributes<HTMLFormElement>;
export declare class Form extends Component<FormProps, {}> {
    static defaultProps: Pick<FormProps, 'type'>;
    constructor(props: Readonly<FormProps>);
    renderFormElement(element: any): any;
    render(): JSX.Element;
}
