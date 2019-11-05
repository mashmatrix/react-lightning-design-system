import React, { HTMLAttributes } from 'react';
export declare type SpinnerSize = 'small' | 'medium' | 'large';
export declare type SpinnerType = 'brand' | 'inverse';
export declare type SpinnerProps = {
    container?: boolean;
    className?: string;
    size?: SpinnerSize;
    type?: SpinnerType;
} & HTMLAttributes<HTMLDivElement>;
export declare class Spinner extends React.Component<SpinnerProps, {}> {
    constructor(props: Readonly<SpinnerProps>);
    renderSpinner(props: any): JSX.Element;
    render(): JSX.Element;
}
