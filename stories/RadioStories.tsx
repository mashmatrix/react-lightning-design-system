import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { RadioGroup, Radio } from '../src/scripts';

storiesOf('Radio', module)
  .add(
    'Controlled with knobs',
    () => (
      <RadioGroup
        label={text('label', 'Radio Group Label')}
        error={text('error', '')}
        required={boolean('required', false)}
        onChange={action('change')}
      >
        <Radio
          label='Radio Label One'
          value='1'
          disabled={boolean('disabled #1', false)}
          checked={text('value', '') === '1'}
        />
        <Radio
          label='Radio Label Two'
          value='2'
          disabled={boolean('disabled #2', false)}
          checked={text('value', '') === '2'}
        />
      </RadioGroup>
    ),
    { info: 'Radio Group controlled with knobs' }
  )
  .add(
    'Default',
    () => (
      <RadioGroup label='Radio Group Label'>
        <Radio label='Radio Label One' value='1' checked />
        <Radio label='Radio Label Two' value='2' />
      </RadioGroup>
    ),
    { info: 'Default Radio Group control' }
  )
  .add(
    'Required',
    () => (
      <RadioGroup label='Radio Group Label' required>
        <Radio label='Radio Label One' value='1' checked />
        <Radio label='Radio Label Two' value='2' />
      </RadioGroup>
    ),
    { info: 'Radio Group control with required attribute' }
  )
  .add(
    'Error',
    () => (
      <RadioGroup
        label='Radio Group Label'
        required
        error='This field is required'
      >
        <Radio label='Radio Label One' value='1' checked />
        <Radio label='Radio Label Two' value='2' />
      </RadioGroup>
    ),
    { info: 'Radio Group control with error message' }
  )
  .add(
    'Disabled',
    () => (
      <RadioGroup label='Radio Group Label'>
        <Radio label='Radio Label One' value='1' disabled />
        <Radio label='Radio Label Two' value='2' disabled />
      </RadioGroup>
    ),
    { info: 'Radio Group control with disabled status' }
  )
  .add(
    'Cols & totalCols',
    () => (
      <>
        <RadioGroup totalCols={3} cols={2} label='Radio Group Label 1'>
          <Radio label='Radio Label One' value='1' checked />
          <Radio label='Radio Label Two' value='2' />
        </RadioGroup>
        <RadioGroup totalCols={3} cols={1} label='Radio Group Label 2'>
          <Radio label='Radio Label One' value='1' checked />
          <Radio label='Radio Label Two' value='2' />
        </RadioGroup>
      </>
    ),
    { info: 'Radio Group control with `cols` and `totalCols`' }
  );
