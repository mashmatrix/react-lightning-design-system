import React, { Component } from 'react';
import { FormElementProps } from './FormElement';
export declare type PicklistProps = {
    id?: string;
    className?: string;
    label?: string;
    required?: boolean;
    multiSelect?: boolean;
    error?: FormElementProps['error'];
    totalCols?: number;
    cols?: number;
    name?: string;
    value?: string | number | (string | number)[];
    defaultValue?: string | number | (string | number)[];
    selectedText?: string;
    optionsSelectedText?: string;
    defaultOpened?: boolean;
    disabled?: boolean;
    menuSize?: string;
    menuStyle?: object;
    onChange?: (...args: any[]) => any;
    onValueChange?: (newValue?: any, prevValue?: any) => void;
    onSelect?: (...args: any[]) => any;
    onComplete?: (...args: any[]) => any;
    onKeyDown?: (...args: any[]) => any;
    onBlur?: (...args: any[]) => any;
};
export declare type PicklistState = {
    id: string;
    opened?: boolean;
    value: (string | number)[];
};
export declare class Picklist extends Component<PicklistProps, PicklistState> {
    static isFormElement: boolean;
    node: HTMLDivElement | null;
    picklistButton: HTMLButtonElement | null;
    dropdown: HTMLDivElement | null;
    constructor(props: Readonly<PicklistProps>);
    onClick: () => void;
    onPicklistItemClick: (item: any, e: any) => void;
    onPicklistClose: () => void;
    onBlur: () => void;
    onKeydown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
    getValue(): (string | number)[];
    setValue(newValue: (string | number)[]): void;
    getSelectedItemLabel(): string | number;
    updateItemValue(itemValue: any): void;
    isFocusedInComponent(): boolean;
    focusToTargetItemEl(): void;
    renderPicklist(props: PicklistProps): JSX.Element;
    renderDropdown(menuSize: any, menuStyle: object | undefined): JSX.Element;
    renderPicklistItem: (item: any) => React.DetailedReactHTMLElement<{
        selected: boolean;
        onBlur: () => void;
    }, HTMLElement>;
    render(): JSX.Element;
}
export declare type PicklistItemProps = {
    label?: string | number;
    selected?: boolean;
    disabled?: boolean;
    value?: string | number;
};
export declare const PicklistItem: React.FC<PicklistItemProps>;
