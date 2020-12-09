import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Badge } from '../src/scripts';

storiesOf('Badge', module)
  .add('Default', () => <Badge onClick={action('click')}>Badge Label</Badge>, {
    info: 'Default badge',
  })
  .add(
    'Shade',
    () => (
      <Badge type='shade' onClick={action('click')}>
        Badge Label
      </Badge>
    ),
    {
      info: 'Badge with type: shade',
    }
  )
  .add(
    'Inverse',
    () => (
      <Badge type='inverse' onClick={action('click')}>
        Badge Label
      </Badge>
    ),
    {
      info: 'Badge with type: inverse',
    }
  );
