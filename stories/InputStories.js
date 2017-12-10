import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { Input } from '../src/scripts';

storiesOf('Input', module)
  .addWithInfo('Controlled with knobs', 'Input controlled with knobs', () => {
    const iconOptions = {
      '': '(none)',
      search: 'search',
      clear: 'clear',
      warning: 'warning',
    };
    return (
      <Input
        label={ text('label', 'Input Label') }
        error={ text('error') }
        required={ boolean('required') }
        value={ text('value') }
        placeholder={ text('placeholder') }
        addonLeft={ text('addonLeft') }
        addonRight={ text('addonRight') }
        iconLeft={ select('iconLeft', iconOptions) }
        iconRight={ select('iconRight', iconOptions) }
        disabled={ boolean('disabled') }
        readOnly={ boolean('readOnly') }
        onChange={ action('change') }
        onBlur={ action('blur') }
      />
    );
  })
  .addWithInfo('Default', 'Default Input control', () => (
    <Input label='Input Label' placeholder='Placeholder Text' />
  ))
  .addWithInfo('With icon to the left', 'Input control with icon to the left', () => (
    <Input label='Input Label' placeholder='Placeholder Text' iconLeft='search' />
  ))
  .addWithInfo('With icon to the right', 'Input control with icon to the right', () => (
    <Input label='Input Label' placeholder='Placeholder Text' iconRight='search' />
  ))
  .addWithInfo('With icon to the left & right', 'Input control with icon to the left and right', () => (
    <Input label='Input Label' placeholder='Placeholder Text' iconLeft='search' iconRight='clear' />
  ))
  .addWithInfo('Required', 'Input control with required attribute', () => (
    <Input label='Input Label' placeholder='Placeholder Text' required />
  ))
  .addWithInfo('Error', 'Input control with error message', () => (
    <Input label='Input Label' placeholder='Placeholder Text' required error='This field is required' />
  ))
  .addWithInfo('Error with icon', 'Input control with error message and icon', () => (
    <Input
      label='Input Label'
      placeholder='Placeholder Text'
      required
      error='This field is required'
      iconLeft='warning'
    />
  ))
  .addWithInfo('Disabled', 'Input control with disabled status', () => (
    <Input label='Input Label' placeholder='Placeholder Text' disabled />
  ))
  .addWithInfo('Read only', 'Input control with readOnly status', () => (
    <Input label='Input Label' value='Read Only' readOnly />
  ))
  .addWithInfo('Read only (HTML)', 'Input control with readOnly status (passsed to HTML <input> element)', () => (
    <Input label='Input Label' value='Read Only' htmlReadOnly />
  ))
  .addWithInfo('With fixed text', 'Input control with fixed text to the left and right', () => (
    <Input label='Input Label' placeholder='Placeholder Text' addonLeft='$' addonRight='%' />
  ))
  .addWithInfo('Read only with fixed text', 'Input control with fixed text to the left and right and readOnly status', () => (
    <Input label='Input Label' value='Read Only' addonLeft='$' addonRight='%' readOnly />
  ))
;
