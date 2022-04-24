import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { Toggle } from '../src/scripts';

export default {
  title: 'Toggle',
};

export const ControlledWithKnobs = () => (
  <Toggle
    label={text('label', 'Toggle Label')}
    required={boolean('required', false)}
    error={text('error', '')}
    checked={boolean('checked', false)}
    disabled={boolean('disabled', false)}
    onChange={action('change')}
  />
);

ControlledWithKnobs.story = {
  name: 'Controlled with knobs',
  parameters: { info: 'Toggle controlled with knobs' },
};

export const Default = () => <Toggle onChange={action('change')} />;

Default.story = {
  parameters: {
    info: 'Toggle control',
  },
};

export const Checked = () => <Toggle checked onChange={action('change')} />;

Checked.story = {
  parameters: {
    info: 'Toggle control with checked status',
  },
};

export const Disabled = () => <Toggle disabled onChange={action('change')} />;

Disabled.story = {
  parameters: {
    info: 'Toggle control with disabled status',
  },
};
