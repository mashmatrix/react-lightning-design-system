import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { Toggle } from '../src/scripts';

storiesOf('Toggle', module)
  .add('Controlled with knobs', withInfo('Toggle controlled with knobs')(() => (
    <Toggle
      label={ text('label', 'Toggle Label') }
      required={ boolean('required') }
      error={ text('error') }
      checked={ boolean('checked') }
      disabled={ boolean('disabled') }
      onChange={ action('change') }
    />
  )))
  .add('Default', withInfo('Toggle control')(() => (
    <Toggle onChange={ action('change') } />
  )))
  .add('Checked', withInfo('Toggle control with checked status')(() => (
    <Toggle checked onChange={ action('change') } />
  )))
  .add('Disabled', withInfo('Toggle control with disabled status')(() => (
    <Toggle disabled onChange={ action('change') } />
  )))
;
