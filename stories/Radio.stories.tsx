import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { RadioGroup, Radio } from '../src/scripts';

export default {
  title: 'Radio',
};

export const ControlledWithKnobs = () => (
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
);

ControlledWithKnobs.story = {
  name: 'Controlled with knobs',
  parameters: { info: 'Radio Group controlled with knobs' },
};

export const Default = () => (
  <RadioGroup label='Radio Group Label'>
    <Radio label='Radio Label One' value='1' checked />
    <Radio label='Radio Label Two' value='2' />
  </RadioGroup>
);

Default.story = {
  parameters: { info: 'Default Radio Group control' },
};

export const Required = () => (
  <RadioGroup label='Radio Group Label' required>
    <Radio label='Radio Label One' value='1' checked />
    <Radio label='Radio Label Two' value='2' />
  </RadioGroup>
);

Required.story = {
  parameters: { info: 'Radio Group control with required attribute' },
};

export const Error = () => (
  <RadioGroup label='Radio Group Label' required error='This field is required'>
    <Radio label='Radio Label One' value='1' checked />
    <Radio label='Radio Label Two' value='2' />
  </RadioGroup>
);

Error.story = {
  parameters: { info: 'Radio Group control with error message' },
};

export const Disabled = () => (
  <RadioGroup label='Radio Group Label'>
    <Radio label='Radio Label One' value='1' disabled />
    <Radio label='Radio Label Two' value='2' disabled />
  </RadioGroup>
);

Disabled.story = {
  parameters: { info: 'Radio Group control with disabled status' },
};

export const ColsTotalCols = () => (
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
);

ColsTotalCols.story = {
  name: 'Cols & totalCols',
  parameters: { info: 'Radio Group control with `cols` and `totalCols`' },
};
