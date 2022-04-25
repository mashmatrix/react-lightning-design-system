import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { Pill } from '../src/scripts';
export default {
  title: 'Pill',
};
export const ControlledWithKnobs = {
  render: () => (
    <Pill
      label={text('label', 'Pill Label')}
      truncate={boolean('truncate', false)}
      disabled={boolean('disabled', false)}
      onClick={action('onclick')}
      onRemove={action('onRemove')}
    />
  ),
  name: 'Controlled with knobs',
  parameters: {
    info: 'Pill controlled with knobs',
  },
};
export const WithIcon = {
  render: () => (
    <Pill
      label='Pill Label'
      icon={{
        category: 'standard',
        icon: 'account',
      }}
    />
  ),
  name: 'with icon',
  parameters: {
    info: 'Pill with icon',
  },
};
export const Disabled = {
  render: () => <Pill label='Pill Label' disabled />,
  name: 'disabled',
  parameters: {
    info: 'Pill with disabled status',
  },
};
export const Truncate = {
  render: () => (
    <div
      style={{
        width: '200px',
      }}
    >
      <div className='slds-pill_container'>
        <Pill
          label='Pill Label that is longer than the area that contains it'
          truncate
        />
      </div>
    </div>
  ),
  name: 'truncate',
  parameters: {
    info: 'Pill with truncated label',
  },
};
