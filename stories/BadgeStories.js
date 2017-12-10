import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Badge } from '../src/scripts';

storiesOf('Badge', module)
  .addWithInfo('Default', 'Default badge', () => (
    <Badge onClick={ action('click') }>Badge Label</Badge>
  ))
;
