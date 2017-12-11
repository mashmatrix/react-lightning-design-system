import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { Badge } from '../src/scripts';

storiesOf('Badge', module)
  .add('Default', withInfo('Default badge')(() => (
    <Badge onClick={ action('click') }>Badge Label</Badge>
  )))
;
