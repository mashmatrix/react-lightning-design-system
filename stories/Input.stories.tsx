import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean, select } from '@storybook/addon-knobs';
import { Input } from '../src/scripts';
export default {
  title: 'Input',
};
export const ControlledWithKnobs = {
  render: () => {
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
  },
  name: 'Controlled with knobs',
  parameters: {
    info: 'Input controlled with knobs',
  },
};
export const Default = {
  render: () => <Input label='Input Label' placeholder='Placeholder Text' />,
  parameters: {
    info: 'Default Input control',
  },
};
export const WithIconToTheLeft = {
  render: () => (
    <Input
      label='Input Label'
      placeholder='Placeholder Text'
      iconLeft='search'
    />
  ),
  name: 'With icon to the left',
  parameters: {
    info: 'Input control with icon to the left',
  },
};
export const WithIconToTheRight = {
  render: () => (
    <Input
      label='Input Label'
      placeholder='Placeholder Text'
      iconRight='search'
    />
  ),
  name: 'With icon to the right',
  parameters: {
    info: 'Input control with icon to the right',
  },
};
export const WithIconToTheLeftRight = {
  render: () => (
    <Input
      label='Input Label'
      placeholder='Placeholder Text'
      iconLeft='search'
      iconRight='clear'
    />
  ),
  name: 'With icon to the left & right',
  parameters: {
    info: 'Input control with icon to the left and right',
  },
};
export const Required = {
  render: () => (
    <Input label='Input Label' placeholder='Placeholder Text' required />
  ),
  parameters: {
    info: 'Input control with required attribute',
  },
};
export const Error = {
  render: () => (
    <Input
      label='Input Label'
      placeholder='Placeholder Text'
      required
      error='This field is required'
    />
  ),
  parameters: {
    info: 'Input control with error message',
  },
};
export const ErrorWithIcon = {
  render: () => (
    <Input
      label='Input Label'
      placeholder='Placeholder Text'
      required
      error='This field is required'
      iconLeft='warning'
    />
  ),
  name: 'Error with icon',
  parameters: {
    info: 'Input control with error message and icon',
  },
};
export const Disabled = {
  render: () => (
    <Input label='Input Label' placeholder='Placeholder Text' disabled />
  ),
  parameters: {
    info: 'Input control with disabled status',
  },
};
export const ReadOnly = {
  render: () => <Input label='Input Label' value='Read Only' readOnly />,
  name: 'Read only',
  parameters: {
    info: 'Input control with readOnly status',
  },
};
export const ReadOnlyHtml = {
  render: () => <Input label='Input Label' value='Read Only' htmlReadOnly />,
  name: 'Read only (HTML)',
  parameters: {
    info: 'Input control with readOnly status (passsed to HTML <input> element)',
  },
};
export const Bare = {
  render: () => (
    <Input label='Input Label' placeholder='Placeholder Text' bare />
  ),
  parameters: {
    info: 'Input control with bare status',
  },
};
export const WithFixedText = {
  render: () => (
    <Input
      label='Input Label'
      placeholder='Placeholder Text'
      addonLeft='$'
      addonRight='%'
    />
  ),
  name: 'With fixed text',
  parameters: {
    info: 'Input control with fixed text to the left and right',
  },
};
export const ReadOnlyWithFixedText = {
  render: () => (
    <Input
      label='Input Label'
      value='Read Only'
      addonLeft='$'
      addonRight='%'
      readOnly
    />
  ),
  name: 'Read only with fixed text',
  parameters: {
    info: 'Input control with fixed text to the left and right and readOnly status',
  },
};
