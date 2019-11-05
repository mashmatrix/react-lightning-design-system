import React from 'react';
export declare type RadioGroupProps = {
    className?: string;
    label?: string;
    required?: boolean;
    error?: any;
    name?: string;
    onChange?: (e: any, value: any) => void;
    totalCols?: number;
    cols?: number;
    style?: object;
};
export declare class RadioGroup extends React.Component<RadioGroupProps, {}> {
    static isFormElement: boolean;
    constructor(props: Readonly<RadioGroupProps>);
    onControlChange(value: any, e: any): void;
    renderControl(radio: any): any;
    render(): JSX.Element;
}
