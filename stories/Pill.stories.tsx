import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { Pill } from '../src/scripts';

export default {
  title: 'Pill',
};

export const ControlledWithKnobs = () => (
  <Pill
    label={text('label', 'Pill Label')}
    truncate={boolean('truncate', false)}
    disabled={boolean('disabled', false)}
    onClick={action('onclick')}
    onRemove={action('onRemove')}
  />
);

ControlledWithKnobs.story = {
  name: 'Controlled with knobs',
  parameters: { info: 'Pill controlled with knobs' },
};

export const WithIcon = () => (
  <Pill label='Pill Label' icon={{ category: 'standard', icon: 'account' }} />
);

WithIcon.story = {
  name: 'with icon',

  parameters: {
    info: 'Pill with icon',
  },
};

export const Disabled = () => <Pill label='Pill Label' disabled />;

Disabled.story = {
  name: 'disabled',

  parameters: {
    info: 'Pill with disabled status',
  },
};

export const Truncate = () => (
  <div style={{ width: '200px' }}>
    <div className='slds-pill_container'>
      <Pill
        label='Pill Label that is longer than the area that contains it'
        truncate
      />
    </div>
  </div>
);

Truncate.story = {
  name: 'truncate',

  parameters: {
    info: 'Pill with truncated label',
  },
};
