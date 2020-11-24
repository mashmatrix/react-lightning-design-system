import React, { Component, ReactNode } from 'react';
import classNames from 'classnames';

export type MediaObjectProps = {
  figureLeft?: ReactNode;
  figureRight?: ReactNode;
  figureCenter?: ReactNode;
};

export class MediaObject extends Component<MediaObjectProps, {}> {
  renderFigure(figure: ReactNode, className?: string) {
    if (!figure) return null;
    return (
      <div className={classNames('slds-media__figure', className)}>
        {figure}
      </div>
    );
  }

  render() {
    const { figureLeft, figureRight, figureCenter, children } = this.props;
    const className = 'slds-media';
    return (
      <div className={className}>
        {this.renderFigure(figureCenter, 'slds-media__figure_stacked')}
        {this.renderFigure(figureLeft)}
        <div className='slds-media__body'>{children}</div>
        {this.renderFigure(figureRight, 'slds-media__figure_reverse')}
      </div>
    );
  }
}
