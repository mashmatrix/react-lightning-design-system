import React from 'react';
import { storiesOf } from '@storybook/react';
import { MediaObject, util } from '../src/scripts';

const image1 = (
  <img
    src={ `${util.getAssetRoot()}/images/avatar1.jpg` }
    style={{ height: 100 }}
    alt='Placeholder'
  />
);
const image2 = (
  <img
    src={ `${util.getAssetRoot()}/images/avatar2.jpg` }
    style={{ height: 100 }}
    alt='Placeholder'
  />
);

const mediaText = `Sit nulla est ex deserunt exercitation anim occaecat.
Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.
Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis.`;

storiesOf('MediaObject', module)
  .addWithInfo('Figure', 'Media Object with figure in left', () => (
    <MediaObject figureLeft={ image1 }>
      <p>{ mediaText }</p>
    </MediaObject>
  ))
  .addWithInfo('Figure - Reverse', 'Media Object with figure in right', () => (
    <MediaObject figureRight={ image2 }>
      <p>{ mediaText }</p>
    </MediaObject>
  ))
  .addWithInfo('Figure - Both Side', 'Media Object with figure in left and right', () => (
    <MediaObject figureLeft={ image1 } figureRight={ image2 }>
      <p>{ mediaText }</p>
    </MediaObject>
  ))
;
