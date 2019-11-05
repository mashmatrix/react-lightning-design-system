import React, { ReactHTML, HTMLAttributes } from 'react';
export declare type TextProps = {
    tag?: keyof ReactHTML;
    category?: 'body' | 'heading' | 'title';
    type?: 'small' | 'regular' | 'medium' | 'large' | 'caps' | 'label';
    align?: 'left' | 'center' | 'right';
    className?: string;
    truncate?: boolean;
    section?: boolean;
} & HTMLAttributes<HTMLElement>;
export declare const Text: React.FC<TextProps>;
