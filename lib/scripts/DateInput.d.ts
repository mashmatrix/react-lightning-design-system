import React, { Component } from 'react';
import { InjectedProps } from './AutoAlign';
import { FormElementProps } from './FormElement';
import { InputProps } from './Input';
export declare type DatepickerDropdownProps = {
    className?: string;
    dateValue?: string;
    minDate?: string;
    maxDate?: string;
    elementRef?: (node: HTMLDivElement) => void;
    extensionRenderer?: (...props: any[]) => JSX.Element;
    onSelect?: (date: string) => void;
    onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
    onClose?: () => void;
} & InjectedProps;
export declare type DateInputProps = {
    id?: string;
    className?: string;
    label?: string;
    required?: boolean;
    error?: FormElementProps['error'];
    totalCols?: number;
    cols?: number;
    value?: string;
    defaultValue?: string;
    defaultOpened?: boolean;
    dateFormat?: string;
    includeTime?: boolean;
    minDate?: string;
    maxDate?: string;
    menuAlign?: 'left' | 'right';
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
    onValueChange?: (value: string | undefined, prevValue: string | undefined) => void;
    onComplete?: () => void;
    extensionRenderer?: (...props: any[]) => JSX.Element;
} & InputProps;
export declare type DateInputState = {
    id: string;
    opened: boolean;
    inputValue?: string;
    value?: string;
};
/**
 *
 */
export declare class DateInput extends Component<DateInputProps, DateInputState> {
    static isFormElement: boolean;
    node: HTMLDivElement | null;
    datepicker: HTMLDivElement | null;
    input: HTMLInputElement | null;
    constructor(props: Readonly<DateInputProps>);
    componentDidUpdate(prevProps: DateInputProps, prevState: DateInputState): void;
    onDateIconClick(): void;
    onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void;
    onInputChange(e: React.ChangeEvent<HTMLInputElement>): void;
    onInputBlur(e: React.FocusEvent<HTMLInputElement>): void;
    onDatepickerSelect(dvalue: string): void;
    onDatepickerBlur(): void;
    onDatepickerClose(): void;
    getValueFormat(): "YYYY-MM-DD" | "YYYY-MM-DDTHH:mm:ss.SSSZ";
    getInputValueFormat(): string;
    setValueFromInput(inputValue: string): void;
    isFocusedInComponent(): boolean;
    showDatepicker(): void;
    renderInput({ inputValue, ...props }: any): JSX.Element;
    render(): JSX.Element;
}
