import React from 'react';
export declare type FormElementProps = {
    id?: string;
    className?: string;
    label?: string;
    required?: boolean;
    error?: boolean | string | {
        message: string;
    };
    readOnly?: boolean;
    cols?: number;
    totalCols?: number;
    dropdown?: JSX.Element;
    formElementRef?: (node: HTMLDivElement) => void;
    style?: object;
};
export declare class FormElement extends React.Component<FormElementProps, {}> {
    static isFormElement: boolean;
    renderFormElement(props: any): JSX.Element;
    renderLabel(): JSX.Element | undefined;
    renderControl(props: {
        children: any;
        dropdown: any;
        error: any;
    }): JSX.Element;
    renderError(error: any): JSX.Element | undefined;
    render(): JSX.Element;
}
