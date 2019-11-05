import { Component, ReactNode } from 'react';
export declare type MediaObjectProps = {
    figureLeft?: ReactNode;
    figureRight?: ReactNode;
    figureCenter?: ReactNode;
};
export declare class MediaObject extends Component<MediaObjectProps, {}> {
    renderFigure(figure: ReactNode, className?: string): JSX.Element | null;
    render(): JSX.Element;
}
