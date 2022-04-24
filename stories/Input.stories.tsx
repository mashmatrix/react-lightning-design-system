import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean, select } from '@storybook/addon-knobs';
import { Input } from '../src/scripts';

export default {
  title: 'Input',
};

export const ControlledWithKnobs = () => {
  const iconOptions = {
    '(none)': '',
    search: 'search',
    clear: 'clear',
    warning: 'warning',
  };
  return (
    <Input
      label={text('label', 'Input Label')}
      error={text('error', '')}
      required={boolean('required', false)}
      value={text('value', '')}
      placeholder={text('placeholder', '')}
      addonLeft={text('addonLeft', '')}
      addonRight={text('addonRight', '')}
      iconLeft={select('iconLeft', iconOptions, '')}
      iconRight={select('iconRight', iconOptions, '')}
      disabled={boolean('disabled', false)}
      readOnly={boolean('readOnly', false)}
      onChange={action('change')}
      onBlur={action('blur')}
    />
  );
};

ControlledWithKnobs.story = {
  name: 'Controlled with knobs',
  parameters: { info: 'Input controlled with knobs' },
};

export const Default = () => (
  <Input label='Input Label' placeholder='Placeholder Text' />
);

Default.story = {
  parameters: { info: 'Default Input control' },
};

export const WithIconToTheLeft = () => (
  <Input label='Input Label' placeholder='Placeholder Text' iconLeft='search' />
);

WithIconToTheLeft.story = {
  name: 'With icon to the left',
  parameters: { info: 'Input control with icon to the left' },
};

export const WithIconToTheRight = () => (
  <Input
    label='Input Label'
    placeholder='Placeholder Text'
    iconRight='search'
  />
);

WithIconToTheRight.story = {
  name: 'With icon to the right',
  parameters: { info: 'Input control with icon to the right' },
};

export const WithIconToTheLeftRight = () => (
  <Input
    label='Input Label'
    placeholder='Placeholder Text'
    iconLeft='search'
    iconRight='clear'
  />
);

WithIconToTheLeftRight.story = {
  name: 'With icon to the left & right',
  parameters: { info: 'Input control with icon to the left and right' },
};

export const Required = () => (
  <Input label='Input Label' placeholder='Placeholder Text' required />
);

Required.story = {
  parameters: { info: 'Input control with required attribute' },
};

export const Error = () => (
  <Input
    label='Input Label'
    placeholder='Placeholder Text'
    required
    error='This field is required'
  />
);

Error.story = {
  parameters: { info: 'Input control with error message' },
};

export const ErrorWithIcon = () => (
  <Input
    label='Input Label'
    placeholder='Placeholder Text'
    required
    error='This field is required'
    iconLeft='warning'
  />
);

ErrorWithIcon.story = {
  name: 'Error with icon',
  parameters: { info: 'Input control with error message and icon' },
};

export const Disabled = () => (
  <Input label='Input Label' placeholder='Placeholder Text' disabled />
);

Disabled.story = {
  parameters: { info: 'Input control with disabled status' },
};

export const ReadOnly = () => (
  <Input label='Input Label' value='Read Only' readOnly />
);

ReadOnly.story = {
  name: 'Read only',
  parameters: { info: 'Input control with readOnly status' },
};

export const ReadOnlyHtml = () => (
  <Input label='Input Label' value='Read Only' htmlReadOnly />
);

ReadOnlyHtml.story = {
  name: 'Read only (HTML)',

  parameters: {
    info: 'Input control with readOnly status (passsed to HTML <input> element)',
  },
};

export const Bare = () => (
  <Input label='Input Label' placeholder='Placeholder Text' bare />
);

Bare.story = {
  parameters: { info: 'Input control with bare status' },
};

export const WithFixedText = () => (
  <Input
    label='Input Label'
    placeholder='Placeholder Text'
    addonLeft='$'
    addonRight='%'
  />
);

WithFixedText.story = {
  name: 'With fixed text',
  parameters: { info: 'Input control with fixed text to the left and right' },
};

export const ReadOnlyWithFixedText = () => (
  <Input
    label='Input Label'
    value='Read Only'
    addonLeft='$'
    addonRight='%'
    readOnly
  />
);

ReadOnlyWithFixedText.story = {
  name: 'Read only with fixed text',

  parameters: {
    info: 'Input control with fixed text to the left and right and readOnly status',
  },
};
