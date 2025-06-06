import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import React from 'react';
import { MediaObject, util } from '../src/scripts';

/**
 *
 */
const image1 = (
  <img
    src={`${util.getAssetRoot()}/images/avatar1.jpg`}
    style={{
      height: 100,
    }}
    alt='Placeholder'
  />
);
const image2 = (
  <img
    src={`${util.getAssetRoot()}/images/avatar2.jpg`}
    style={{
      height: 100,
    }}
    alt='Placeholder'
  />
);
const mediaText = `Sit nulla est ex deserunt exercitation anim occaecat.
Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.
Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis.`;
const mediaContent = <p>{mediaText}</p>;

/**
 *
 */
const meta: ComponentMeta<typeof MediaObject> = {
  title: 'MediaObject',
  component: MediaObject,
};
export default meta;

/**
 *
 */
export const Figure: ComponentStoryObj<typeof MediaObject> = {
  args: {
    figureLeft: image1,
    children: mediaContent,
  },
  parameters: {
    info: 'Media Object with figure in left',
  },
};

/**
 *
 */
export const FigureCenter: ComponentStoryObj<typeof MediaObject> = {
  name: 'Figure (Center)',
  args: {
    figureLeft: image1,
    centered: true,
    children: mediaContent,
  },
  parameters: {
    info: 'Vertically centered Media Object with figure in left',
  },
};

/**
 *
 */
export const FigureReverse: ComponentStoryObj<typeof MediaObject> = {
  name: 'Figure - Reverse',
  args: {
    figureRight: image2,
    children: mediaContent,
  },
  parameters: {
    info: 'Media Object with figure in right',
  },
};

/**
 *
 */
export const FigureReverseCenter: ComponentStoryObj<typeof MediaObject> = {
  name: 'Figure - Reverse (Center)',
  args: {
    figureRight: image2,
    centered: true,
    children: mediaContent,
  },
  parameters: {
    info: 'Vertically centered Media Object with figure in right',
  },
};

/**
 *
 */
export const FigureBothSide: ComponentStoryObj<typeof MediaObject> = {
  name: 'Figure - Both Side',
  args: {
    figureLeft: image1,
    figureRight: image2,
    children: mediaContent,
  },
  parameters: {
    info: 'Media Object with figure in left and right',
  },
};

/**
 *
 */
export const FigureBothSideCenter: ComponentStoryObj<typeof MediaObject> = {
  name: 'Figure - Both Side (Center)',
  args: {
    figureLeft: image1,
    figureRight: image2,
    centered: true,
    children: mediaContent,
  },
  parameters: {
    info: 'Vertically centered Media Object with figure in left and right',
  },
};
