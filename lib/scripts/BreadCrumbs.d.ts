import React, { HTMLAttributes } from 'react';
export declare type CrumbProps = {
    className?: string;
    href?: string;
} & HTMLAttributes<HTMLLIElement>;
export declare const Crumb: React.FC<CrumbProps>;
export declare type BreadCrumbsProps = {
    label?: string;
    className?: string;
} & HTMLAttributes<HTMLElement>;
export declare const BreadCrumbs: React.FC<BreadCrumbsProps>;
