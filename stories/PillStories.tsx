import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { Pill } from '../src/scripts';

storiesOf('Pill', module)
  .add(
    'Controlled with knobs',
    () => (
      <Pill
        label={text('label', 'Pill Label')}
        truncate={boolean('truncate', false)}
        disabled={boolean('disabled', false)}
        onClick={action('onclick')}
        onRemove={action('onRemove')}
      />
    ),
    { info: 'Pill controlled with knobs' }
  )
  .add(
    'with icon',
    () => (
      <Pill
        label='Pill Label'
        icon={{ category: 'standard', icon: 'account' }}
      />
    ),
    {
      info: 'Pill with icon',
    }
  )
  .add('disabled', () => <Pill label='Pill Label' disabled />, {
    info: 'Pill with disabled status',
  })
  .add(
    'truncate',
    () => (
      <div style={{ width: '200px' }}>
        <div className='slds-pill_container'>
          <Pill
            label='Pill Label that is longer than the area that contains it'
            truncate
          />
        </div>
      </div>
    ),
    {
      info: 'Pill with truncated label',
    }
  );
