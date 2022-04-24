import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { Select, Option } from '../src/scripts';

export default {
  title: 'Select',
};

export const ControlledWithKnobs = () => (
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
);

ControlledWithKnobs.story = {
  name: 'Controlled with knobs',
  parameters: { info: 'Select controlled with knobs' },
};

export const Default = () => (
  <Select
    label='Select Label'
    onChange={action('change')}
    onBlur={action('blur')}
  >
    <Option label='Option One' value='1' />
    <Option label='Option Two' value='2' />
    <Option label='Option Three' value='3' />
  </Select>
);

Default.story = {
  parameters: { info: 'Default Select control' },
};

export const Required = () => (
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
);

Required.story = {
  parameters: { info: 'Select control with required attribute' },
};

export const Error = () => (
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
);

Error.story = {
  parameters: { info: 'Select control with error message' },
};

export const Disabled = () => (
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
);

Disabled.story = {
  parameters: { info: 'Select control with disabled status' },
};

export const MultipleDefault = () => (
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
);

MultipleDefault.story = {
  name: 'Multiple - Default',
  parameters: { info: 'Multiple Select control' },
};

export const MultipleRequired = () => (
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
);

MultipleRequired.story = {
  name: 'Multiple - Required',
  parameters: { info: 'Multiple Select control with required attribute' },
};

export const MultipleError = () => (
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
);

MultipleError.story = {
  name: 'Multiple - Error',
  parameters: { info: 'Multiple Select control with error message' },
};

export const MultipleDisabled = () => (
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
);

MultipleDisabled.story = {
  name: 'Multiple - Disabled',
  parameters: { info: 'Multiple Select control with disabled status' },
};
