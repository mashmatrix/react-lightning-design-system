import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { CheckboxGroup, Checkbox } from '../src/scripts';

export default {
  title: 'Checkbox',
};

export const ControlledWithKnobs = () => (
  <CheckboxGroup
    label={text('label', 'Checkbox Group Label')}
    error={text('error', '')}
    required={boolean('required', false)}
    onChange={action('change')}
  >
    <Checkbox
      label='Checkbox Label One'
      value='1'
      disabled={boolean('disabled #1', false)}
      checked={boolean('checked #1', false)}
    />
    <Checkbox
      label='Checkbox Label Two'
      value='2'
      disabled={boolean('disabled #2', false)}
      checked={boolean('checked #2', false)}
    />
  </CheckboxGroup>
);

ControlledWithKnobs.story = {
  name: 'Controlled with knobs',
  parameters: { info: 'Checkbox controlled with knobs' },
};

export const Default = () => (
  <CheckboxGroup label='Checkbox Group Label'>
    <Checkbox label='Checkbox Label One' value='1' checked />
    <Checkbox label='Checkbox Label Two' value='2' checked={false} />
  </CheckboxGroup>
);

Default.story = {
  parameters: { info: 'Checkbox Textarea control' },
};

export const Required = () => (
  <CheckboxGroup label='Checkbox Group Label' required>
    <Checkbox label='Checkbox Label One' value='1' checked />
    <Checkbox label='Checkbox Label Two' value='2' />
  </CheckboxGroup>
);

Required.story = {
  parameters: { info: 'Checkbox control with required attribute' },
};

export const Error = () => (
  <CheckboxGroup
    label='Checkbox Group Label'
    required
    error='This field is required'
  >
    <Checkbox label='Checkbox Label One' value='1' checked />
    <Checkbox label='Checkbox Label Two' value='2' />
  </CheckboxGroup>
);

Error.story = {
  parameters: { info: 'Checkbox control with error message' },
};

export const Disabled = () => (
  <CheckboxGroup label='Checkbox Group Label'>
    <Checkbox label='Checkbox Label One' value='1' disabled />
    <Checkbox label='Checkbox Label Two' value='2' disabled />
  </CheckboxGroup>
);

Disabled.story = {
  parameters: { info: 'Checkbox control with disabled status' },
};
