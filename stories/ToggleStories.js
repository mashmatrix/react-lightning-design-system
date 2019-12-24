import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { Toggle } from '../src/scripts';

storiesOf('Toggle', module)
  .add('Controlled with knobs', () => (
    <Toggle
      label={ text('label', 'Toggle Label') }
      required={ boolean('required') }
      error={ text('error') }
      checked={ boolean('checked') }
      disabled={ boolean('disabled') }
      onChange={ action('change') }
    />
  ), {
    info: 'Toggle controlled with knobs',
  })
  .add('Default', () => (
    <Toggle onChange={ action('change') } />
  ), {
    info: 'Toggle control',
  })
  .add('Checked', () => (
    <Toggle checked onChange={ action('change') } />
  ), {
    info: 'Toggle control with checked status',
  })
  .add('Disabled', () => (
    <Toggle disabled onChange={ action('change') } />
  ), {
    info: 'Toggle control with disabled status',
  })
;
