import React, { Component, ThHTMLAttributes, HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes } from 'react';
export declare type TableHeaderProps = {
    hasActions?: boolean;
    actionsPosition?: number;
    sortable?: boolean;
};
export declare class TableHeader extends Component<TableHeaderProps> {
    renderBaseHeaderRow(): React.DetailedReactHTMLElement<{
        className: string;
    }, HTMLElement>;
    render(): JSX.Element;
}
export declare class TableBody extends Component {
    renderRows(): React.DetailedReactHTMLElement<{
        className: string;
    }, HTMLElement>[];
    render(): JSX.Element;
}
export declare type TableRowProps = {
    selected?: boolean;
    style?: object;
} & HTMLAttributes<HTMLTableRowElement>;
export declare const TableRow: React.FC<TableRowProps>;
export declare type TableHeaderColumnProps = {
    className?: string;
    width?: string | number;
    sortable?: boolean;
    resizable?: boolean;
    sortDir?: string;
    sorted?: boolean;
    align?: 'left' | 'center' | 'right';
    onSort?: () => void;
} & ThHTMLAttributes<HTMLTableHeaderCellElement>;
export declare const TableHeaderColumn: React.FC<TableHeaderColumnProps>;
export declare type TableRowColumnProps = {
    className?: string;
    width?: string | number;
    truncate?: boolean;
} & TdHTMLAttributes<HTMLTableDataCellElement>;
export declare const TableRowColumn: React.FC<TableRowColumnProps>;
export declare const TableRowColumnActions: React.FC;
export declare type TableProps = {
    wrapperStyle?: object;
    className?: string;
    bordered?: boolean;
    verticalBorders?: boolean;
    noRowHover?: boolean;
    striped?: boolean;
    fixedLayout?: boolean;
    sortable?: boolean;
    autoWidth?: boolean;
} & TableHTMLAttributes<HTMLTableElement>;
export declare class Table extends Component<TableProps> {
    onScroll(): void;
    renderTableHeader(base: any): React.FunctionComponentElement<{
        sortable: boolean;
    }>;
    renderTableBody(base: any): any;
    render(): JSX.Element;
}
