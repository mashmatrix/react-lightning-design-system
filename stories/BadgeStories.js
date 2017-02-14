import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { withKnobs } from '@kadira/storybook-addon-knobs';
import Badge from '../src/scripts/Badge';

storiesOf('Badge', module)
  .addDecorator(withKnobs)
  .addWithInfo('Default', 'Default badge', () => (
    <Badge onClick={ action('click') }>Badge Label</Badge>
  ))
;
