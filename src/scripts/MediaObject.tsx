import React, { FC, HTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';

/**
 *
 */
export type MediaObjectProps = {
  figureLeft?: ReactNode;
  figureRight?: ReactNode;
  isVerticalCenter?: boolean;
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

/**
 *
 */
export const MediaObject: FC<MediaObjectProps> = (props) => {
  const {
    className,
    figureLeft,
    figureRight,
    isVerticalCenter,
    children,
    ...rprops
  } = props;
  const mediaClassNames = classnames(
    'slds-media',
    { 'slds-media_center': isVerticalCenter },
    className
  );
  return (
    <div className={mediaClassNames} {...rprops}>
      {figureLeft ? (
        <div className='slds-media__figure'>{figureLeft}</div>
      ) : undefined}
      <div className='slds-media__body'>{children}</div>
      {figureRight ? (
        <div className='slds-media__figure slds-media__figure_reverse'>
          {figureRight}
        </div>
      ) : undefined}
    </div>
  );
};
