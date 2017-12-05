import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { text, boolean } from '@kadira/storybook-addon-knobs';
import { Toggle } from '../src/scripts';

storiesOf('Toggle', module)
  .addWithInfo('Controlled with knobs', 'Toggle controlled with knobs', () => (
    <Toggle
      label={ text('label', 'Toggle Label') }
      required={ boolean('required') }
      error={ text('error') }
      checked={ boolean('checked') }
      disabled={ boolean('disabled') }
      onChange={ action('change') }
    />
  ))
  .addWithInfo('Default', 'Toggle control', () => (
    <Toggle onChange={ action('change') } />
  ))
  .addWithInfo('Checked', 'Toggle control with checked status', () => (
    <Toggle checked onChange={ action('change') } />
  ))
  .addWithInfo('Disabled', 'Toggle control with disabled status', () => (
    <Toggle disabled onChange={ action('change') } />
  ))
  .addWithInfo('Status', 'Toggle control with status of Off/On', () => (
    <Toggle onChange={ action('change') } statusOff='Off' statusOn='On' />
  ))
;
