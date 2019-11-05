import React, { HTMLAttributes } from 'react';
export declare type BadgeProps = {
    type?: 'default' | 'shade' | 'inverse';
    label?: string;
} & HTMLAttributes<HTMLSpanElement>;
export declare const Badge: React.FC<BadgeProps>;
