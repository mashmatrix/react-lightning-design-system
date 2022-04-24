import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { Textarea } from '../src/scripts';

export default {
  title: 'Textarea',
};

export const ControlledWithKnobs = () => (
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
);

ControlledWithKnobs.story = {
  name: 'Controlled with knobs',
  parameters: { info: 'Textarea controlled with knobs' },
};

export const Default = () => (
  <Textarea label='Textarea Label' placeholder='Placeholder Text' />
);

Default.story = {
  parameters: { info: 'Default Textarea control' },
};

export const Required = () => (
  <Textarea label='Textarea Label' placeholder='Placeholder Text' required />
);

Required.story = {
  parameters: { info: 'Textarea control with required attribute' },
};

export const Error = () => (
  <Textarea
    label='Textarea Label'
    placeholder='Placeholder Text'
    required
    error='This field is required'
  />
);

Error.story = {
  parameters: { info: 'Textarea control with error message' },
};

export const Disabled = () => (
  <Textarea label='Textarea Label' placeholder='Placeholder Text' disabled />
);

Disabled.story = {
  parameters: { info: 'Textarea control with disabled status' },
};

export const ReadOnly = () => (
  <Textarea label='Textarea Label' value='Read Only' readOnly />
);

ReadOnly.story = {
  name: 'Read only',
  parameters: { info: 'Textarea control with readOnly status' },
};
