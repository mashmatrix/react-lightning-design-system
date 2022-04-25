import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { RadioGroup, Radio } from '../src/scripts';
export default {
  title: 'Radio',
};
export const ControlledWithKnobs = {
  render: () => (
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
  name: 'Controlled with knobs',
  parameters: {
    info: 'Radio Group controlled with knobs',
  },
};
export const Default = {
  render: () => (
    <RadioGroup label='Radio Group Label'>
      <Radio label='Radio Label One' value='1' checked />
      <Radio label='Radio Label Two' value='2' />
    </RadioGroup>
  ),
  parameters: {
    info: 'Default Radio Group control',
  },
};
export const Required = {
  render: () => (
    <RadioGroup label='Radio Group Label' required>
      <Radio label='Radio Label One' value='1' checked />
      <Radio label='Radio Label Two' value='2' />
    </RadioGroup>
  ),
  parameters: {
    info: 'Radio Group control with required attribute',
  },
};
export const Error = {
  render: () => (
    <RadioGroup
      label='Radio Group Label'
      required
      error='This field is required'
    >
      <Radio label='Radio Label One' value='1' checked />
      <Radio label='Radio Label Two' value='2' />
    </RadioGroup>
  ),
  parameters: {
    info: 'Radio Group control with error message',
  },
};
export const Disabled = {
  render: () => (
    <RadioGroup label='Radio Group Label'>
      <Radio label='Radio Label One' value='1' disabled />
      <Radio label='Radio Label Two' value='2' disabled />
    </RadioGroup>
  ),
  parameters: {
    info: 'Radio Group control with disabled status',
  },
};
export const ColsTotalCols = {
  render: () => (
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
  name: 'Cols & totalCols',
  parameters: {
    info: 'Radio Group control with `cols` and `totalCols`',
  },
};
