import React, { Component } from 'react';
declare type Date = {
    year: number;
    month: number;
    date: number;
    value: string;
};
declare type Calendar = {
    year: number;
    month: number;
    weeks: Date[][];
    minDate?: Date;
    maxDate?: Date;
};
export declare type DatepickerProps = {
    className?: string;
    selectedDate?: string;
    autoFocus?: boolean;
    minDate?: string;
    maxDate?: string;
    extensionRenderer?: (...props: any[]) => JSX.Element;
    elementRef?: (node: HTMLDivElement) => void;
    onSelect?: (date: string) => void;
    onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
    onClose?: () => void;
};
export declare type DatepickerState = {
    focusDate?: boolean;
    targetDate?: string;
};
export declare class Datepicker extends Component<DatepickerProps, DatepickerState> {
    node: HTMLDivElement | null;
    month: HTMLTableElement | null;
    constructor(props: Readonly<DatepickerProps>);
    componentDidMount(): void;
    componentDidUpdate(): void;
    onDateKeyDown(date: string, e: React.KeyboardEvent<HTMLSpanElement>): void;
    onDateClick(date: string): void;
    onDateFocus(date: string): void;
    onYearChange(e: React.ChangeEvent<HTMLSelectElement>): void;
    onMonthChange(month: number): void;
    onBlur(e: React.FocusEvent<HTMLDivElement>): void;
    onKeyDown(e: React.KeyboardEvent<HTMLDivElement>): void;
    focusDate(date: string | undefined): void;
    isFocusedInComponent(): boolean;
    renderFilter(cal: Calendar): JSX.Element;
    renderMonth(cal: Calendar, selectedDate: string | undefined, today: string): JSX.Element;
    renderDate(cal: Calendar, selectedDate: string | undefined, today: string, d: Date, i: number): JSX.Element;
    render(): JSX.Element;
}
export {};
