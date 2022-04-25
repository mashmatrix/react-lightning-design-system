import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { Toggle } from '../src/scripts';
export default {
  title: 'Toggle',
};
export const ControlledWithKnobs = {
  render: () => (
    <Toggle
      label={text('label', 'Toggle Label')}
      required={boolean('required', false)}
      error={text('error', '')}
      checked={boolean('checked', false)}
      disabled={boolean('disabled', false)}
      onChange={action('change')}
    />
  ),
  name: 'Controlled with knobs',
  parameters: {
    info: 'Toggle controlled with knobs',
  },
};
export const Default = {
  render: () => <Toggle onChange={action('change')} />,
  parameters: {
    info: 'Toggle control',
  },
};
export const Checked = {
  render: () => <Toggle checked onChange={action('change')} />,
  parameters: {
    info: 'Toggle control with checked status',
  },
};
export const Disabled = {
  render: () => <Toggle disabled onChange={action('change')} />,
  parameters: {
    info: 'Toggle control with disabled status',
  },
};
