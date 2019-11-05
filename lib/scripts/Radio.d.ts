import React, { InputHTMLAttributes } from 'react';
export declare type RadioProps = {
    className?: string;
    label?: string;
    name?: string;
    value?: string | number;
    checked?: boolean;
    defaultChecked?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;
export declare const Radio: React.FC<RadioProps>;
