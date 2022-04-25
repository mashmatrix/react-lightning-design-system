import React from 'react';
import { action } from '@storybook/addon-actions';
import { Badge } from '../src/scripts';
export default {
  title: 'Badge',
};
export const Default = {
  render: () => <Badge onClick={action('click')}>Badge Label</Badge>,
  parameters: {
    info: 'Default badge',
  },
};
export const Shade = {
  render: () => (
    <Badge type='shade' onClick={action('click')}>
      Badge Label
    </Badge>
  ),
  parameters: {
    info: 'Badge with type: shade',
  },
};
export const Inverse = {
  render: () => (
    <Badge type='inverse' onClick={action('click')}>
      Badge Label
    </Badge>
  ),
  parameters: {
    info: 'Badge with type: inverse',
  },
};
