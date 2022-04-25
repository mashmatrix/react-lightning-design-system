import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { Select, Option } from '../src/scripts';
export default {
  title: 'Select',
};
export const ControlledWithKnobs = {
  render: () => (
    <Select
      label={text('label', 'Select Label')}
      error={text('error', '')}
      required={boolean('required', false)}
      value={text('value', '')}
      disabled={boolean('disabled', false)}
      onChange={action('change')}
      onBlur={action('blur')}
    >
      <Option label='Option One' value='1' />
      <Option label='Option Two' value='2' />
      <Option label='Option Three' value='3' />
    </Select>
  ),
  name: 'Controlled with knobs',
  parameters: {
    info: 'Select controlled with knobs',
  },
};
export const Default = {
  render: () => (
    <Select
      label='Select Label'
      onChange={action('change')}
      onBlur={action('blur')}
    >
      <Option label='Option One' value='1' />
      <Option label='Option Two' value='2' />
      <Option label='Option Three' value='3' />
    </Select>
  ),
  parameters: {
    info: 'Default Select control',
  },
};
export const Required = {
  render: () => (
    <Select
      label='Select Label'
      required
      onChange={action('change')}
      onBlur={action('blur')}
    >
      <Option label='Option One' value='1' />
      <Option label='Option Two' value='2' />
      <Option label='Option Three' value='3' />
    </Select>
  ),
  parameters: {
    info: 'Select control with required attribute',
  },
};
export const Error = {
  render: () => (
    <Select
      label='Select Label'
      required
      error='This field is required'
      onChange={action('change')}
      onBlur={action('blur')}
    >
      <Option label='Option One' value='1' />
      <Option label='Option Two' value='2' />
      <Option label='Option Three' value='3' />
    </Select>
  ),
  parameters: {
    info: 'Select control with error message',
  },
};
export const Disabled = {
  render: () => (
    <Select
      label='Select Label'
      disabled
      onChange={action('change')}
      onBlur={action('blur')}
    >
      <Option label='Option One' value='1' />
      <Option label='Option Two' value='2' />
      <Option label='Option Three' value='3' />
    </Select>
  ),
  parameters: {
    info: 'Select control with disabled status',
  },
};
export const MultipleDefault = {
  render: () => (
    <Select
      label='Select Label'
      onChange={action('change')}
      onBlur={action('blur')}
      value={['2', '3']}
      multiple
    >
      <Option label='Option One' value='1' />
      <Option label='Option Two' value='2' />
      <Option label='Option Three' value='3' />
    </Select>
  ),
  name: 'Multiple - Default',
  parameters: {
    info: 'Multiple Select control',
  },
};
export const MultipleRequired = {
  render: () => (
    <Select
      label='Select Label'
      required
      onChange={action('change')}
      onBlur={action('blur')}
      multiple
    >
      <Option label='Option One' value='1' />
      <Option label='Option Two' value='2' />
      <Option label='Option Three' value='3' />
    </Select>
  ),
  name: 'Multiple - Required',
  parameters: {
    info: 'Multiple Select control with required attribute',
  },
};
export const MultipleError = {
  render: () => (
    <Select
      label='Select Label'
      required
      error='This field is required'
      onChange={action('change')}
      onBlur={action('blur')}
      multiple
    >
      <Option label='Option One' value='1' />
      <Option label='Option Two' value='2' />
      <Option label='Option Three' value='3' />
    </Select>
  ),
  name: 'Multiple - Error',
  parameters: {
    info: 'Multiple Select control with error message',
  },
};
export const MultipleDisabled = {
  render: () => (
    <Select
      label='Select Label'
      disabled
      onChange={action('change')}
      onBlur={action('blur')}
      value={['2', '3']}
      multiple
    >
      <Option label='Option One' value='1' />
      <Option label='Option Two' value='2' />
      <Option label='Option Three' value='3' />
    </Select>
  ),
  name: 'Multiple - Disabled',
  parameters: {
    info: 'Multiple Select control with disabled status',
  },
};
