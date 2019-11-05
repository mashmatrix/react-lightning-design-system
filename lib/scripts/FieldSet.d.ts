import React, { Component } from 'react';
export declare type FieldSetProps = {
    className?: string;
    label?: string;
    children?: React.ReactNode;
};
export declare function FieldSet({ className, label, children, ...props }: FieldSetProps): JSX.Element;
export declare namespace FieldSet {
    var isFormElement: boolean;
    var Row: typeof Row;
}
declare type RowProps = {
    className?: string;
    cols?: number;
};
declare class Row extends Component<RowProps> {
    static isFormElement: boolean;
    renderChild(totalCols: number, child: any): JSX.Element;
    render(): JSX.Element;
}
export {};
