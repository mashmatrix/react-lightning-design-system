import React from 'react';
import { action } from '@storybook/addon-actions';
import { Badge } from '../src/scripts';

export default {
  title: 'Badge',
};

export const Default = () => (
  <Badge onClick={action('click')}>Badge Label</Badge>
);

Default.story = {
  parameters: {
    info: 'Default badge',
  },
};

export const Shade = () => (
  <Badge type='shade' onClick={action('click')}>
    Badge Label
  </Badge>
);

Shade.story = {
  parameters: {
    info: 'Badge with type: shade',
  },
};

export const Inverse = () => (
  <Badge type='inverse' onClick={action('click')}>
    Badge Label
  </Badge>
);

Inverse.story = {
  parameters: {
    info: 'Badge with type: inverse',
  },
};
