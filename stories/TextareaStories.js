import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { text, boolean } from '@kadira/storybook-addon-knobs';
import { Textarea } from '../src/scripts';

storiesOf('Textarea', module)
  .addWithInfo('Controlled with knobs', 'Textarea controlled with knobs', () => (
    <Textarea
      label={ text('label', 'Textarea Label') }
      error={ text('error') }
      required={ boolean('required') }
      value={ text('value') }
      placeholder={ text('placeholder') }
      disabled={ boolean('disabled') }
      readOnly={ boolean('readOnly') }
      onChange={ action('change') }
      onBlur={ action('blur') }
    />
  ))
  .addWithInfo('Default', 'Default Textarea control', () => (
    <Textarea label='Textarea Label' placeholder='Placeholder Text' />
  ))
  .addWithInfo('Required', 'Textarea control with required attribute', () => (
    <Textarea label='Textarea Label' placeholder='Placeholder Text' required />
  ))
  .addWithInfo('Error', 'Textarea control with error message', () => (
    <Textarea label='Textarea Label' placeholder='Placeholder Text' required error='This field is required' />
  ))
  .addWithInfo('Disabled', 'Textarea control with disabled status', () => (
    <Textarea label='Textarea Label' placeholder='Placeholder Text' disabled />
  ))
  .addWithInfo('Read only', 'Textarea control with readOnly status', () => (
    <Textarea label='Textarea Label' value='Read Only' readOnly />
  ))
  .addWithInfo('Read only (HTML)', 'Textarea control with readOnly status (passsed to HTML <textarea> element)', () => (
    <Textarea label='Textarea Label' value='Read Only' htmlReadOnly />
  ))
;
