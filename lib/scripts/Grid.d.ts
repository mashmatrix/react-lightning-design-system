import React, { Component, ReactHTML } from 'react';
export declare type GridProps = {
    className?: string;
    tag?: keyof ReactHTML;
    frame?: boolean;
    vertical?: boolean;
} & React.HTMLAttributes<HTMLElement>;
export declare const Grid: React.FC<GridProps>;
export declare type ColProps = {
    className?: string;
    padded?: boolean | 'medium' | 'large';
    align?: 'top' | 'medium' | 'bottom';
    noFlex?: boolean;
    order?: number;
    orderSmall?: number;
    orderMedium?: number;
    orderLarge?: number;
    cols?: number;
    colsSmall?: number;
    colsMedium?: number;
    colsLarge?: number;
    totalCols?: number;
    totalColsSmall?: number;
    totalColsMedium?: number;
    totalColsLarge?: number;
} & React.HTMLAttributes<HTMLDivElement>;
export declare const Col: React.FC<ColProps>;
export declare type RowProps = {
    className?: string;
    align?: 'center' | 'space' | 'spread';
    nowrap?: boolean;
    nowrapSmall?: boolean;
    nowrapMedium?: boolean;
    nowrapLarge?: boolean;
    pullPadded?: boolean;
    cols?: number;
    colsSmall?: number;
    colsMedium?: number;
    colsLarge?: number;
} & React.HTMLAttributes<HTMLDivElement>;
export declare class Row extends Component<RowProps> {
    renderColumn(colProps: any, child: any): JSX.Element;
    render(): JSX.Element;
}
