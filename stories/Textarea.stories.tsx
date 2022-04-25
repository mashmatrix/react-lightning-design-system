import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { Textarea } from '../src/scripts';
export default {
  title: 'Textarea',
};
export const ControlledWithKnobs = {
  render: () => (
    <Textarea
      label={text('label', 'Textarea Label')}
      error={text('error', '')}
      required={boolean('required', false)}
      value={text('value', '')}
      placeholder={text('placeholder', '')}
      disabled={boolean('disabled', false)}
      readOnly={boolean('readOnly', false)}
      onChange={action('change')}
      onBlur={action('blur')}
    />
  ),
  name: 'Controlled with knobs',
  parameters: {
    info: 'Textarea controlled with knobs',
  },
};
export const Default = {
  render: () => (
    <Textarea label='Textarea Label' placeholder='Placeholder Text' />
  ),
  parameters: {
    info: 'Default Textarea control',
  },
};
export const Required = {
  render: () => (
    <Textarea label='Textarea Label' placeholder='Placeholder Text' required />
  ),
  parameters: {
    info: 'Textarea control with required attribute',
  },
};
export const Error = {
  render: () => (
    <Textarea
      label='Textarea Label'
      placeholder='Placeholder Text'
      required
      error='This field is required'
    />
  ),
  parameters: {
    info: 'Textarea control with error message',
  },
};
export const Disabled = {
  render: () => (
    <Textarea label='Textarea Label' placeholder='Placeholder Text' disabled />
  ),
  parameters: {
    info: 'Textarea control with disabled status',
  },
};
export const ReadOnly = {
  render: () => <Textarea label='Textarea Label' value='Read Only' readOnly />,
  name: 'Read only',
  parameters: {
    info: 'Textarea control with readOnly status',
  },
};
