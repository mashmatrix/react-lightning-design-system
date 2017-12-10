import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { Badge } from '../src/scripts';

storiesOf('Badge', module)
  .addWithInfo('Default', 'Default badge', () => (
    <Badge onClick={ action('click') }>Badge Label</Badge>
  ))
;
