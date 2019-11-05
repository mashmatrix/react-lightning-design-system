import React, { Component } from 'react';
export declare type ModalHeaderProps = {
    className?: string;
    title?: string;
    tagline?: string;
    closeButton?: boolean;
    onClose?: () => void;
};
export declare class ModalHeader extends Component<ModalHeaderProps> {
    constructor(props: Readonly<ModalHeaderProps>);
    onClose(): void;
    render(): JSX.Element;
}
export declare type ModalContentProps = {
    className?: string;
};
export declare const ModalContent: React.FC<ModalContentProps>;
export declare type ModalFooterProps = {
    className?: string;
    directional?: boolean;
};
export declare const ModalFooter: React.FC<ModalFooterProps>;
export declare type ModalSize = 'large';
export declare type ModalProps = {
    className?: string;
    size?: ModalSize;
    opened?: boolean;
    containerStyle?: object;
    onHide?: () => void;
};
export declare class Modal extends Component<ModalProps> {
    static Header: typeof ModalHeader;
    static Content: React.FunctionComponent<ModalContentProps>;
    static Footer: React.FunctionComponent<ModalFooterProps>;
    constructor(props: Readonly<ModalProps>);
    hide(): void;
    renderChildComponent(comp: any): any;
    render(): JSX.Element;
}
