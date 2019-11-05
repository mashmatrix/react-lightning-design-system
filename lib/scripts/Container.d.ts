import React, { HTMLAttributes } from 'react';
export declare type ContainerProps = {
    className: string;
    size: 'small' | 'medium' | 'large';
    align: 'left' | 'center' | 'right';
} & HTMLAttributes<HTMLDivElement>;
export declare const Container: React.FC<ContainerProps>;
