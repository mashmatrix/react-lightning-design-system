import React, { Component } from 'react';
import { TextProps } from './Text';
import { GridProps } from './Grid';
export declare type PageHeaderDetailBodyProps = TextProps;
export declare const PageHeaderDetailBody: React.FC<PageHeaderDetailBodyProps>;
export declare type PageHeaderDetailLabelProps = TextProps;
export declare const PageHeaderDetailLabel: React.FC<PageHeaderDetailLabelProps>;
export declare type PageHeaderDetailItemProps = {
    label?: string;
} & React.LiHTMLAttributes<HTMLLIElement>;
export declare const PageHeaderDetailItem: React.FC<PageHeaderDetailItemProps>;
export declare type PageHeaderDetailProps = GridProps;
export declare const PageHeaderDetail: React.FC<GridProps>;
export declare type PageHeaderHeadingTitleProps = {
    className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;
export declare const PageHeaderHeadingTitle: React.FC<PageHeaderHeadingTitleProps>;
export declare type PageHeaderHeadingProps = {
    info?: string;
    legend?: string;
    title?: string | JSX.Element;
    breadCrumbs?: Array<JSX.Element>;
    leftActions?: JSX.Element;
    figure?: JSX.Element;
    rightActions?: JSX.Element | Array<JSX.Element>;
};
export declare class PageHeaderHeading extends Component<PageHeaderHeadingProps> {
    renderInfo(info: string): JSX.Element | null;
    renderWithMedia(figure: JSX.Element | undefined): JSX.Element;
    renderContent(): JSX.Element;
    render(): JSX.Element;
}
export declare type PageHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export declare const PageHeader: React.FC<PageHeaderProps>;
