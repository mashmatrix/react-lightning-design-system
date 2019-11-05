import { Component } from 'react';
export declare type ButtonGroupProps = {
    className?: string;
};
export declare class ButtonGroup extends Component<ButtonGroupProps, {}> {
    constructor(props: Readonly<ButtonGroupProps>);
    renderButton(button: any, index: number): any;
    render(): JSX.Element;
}
