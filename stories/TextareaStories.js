import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { Textarea } from '../src/scripts';

storiesOf('Textarea', module)
  .add('Controlled with knobs', withInfo('Textarea controlled with knobs')(() => (
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
  )))
  .add('Default', withInfo('Default Textarea control')(() => (
    <Textarea label='Textarea Label' placeholder='Placeholder Text' />
  )))
  .add('Required', withInfo('Textarea control with required attribute')(() => (
    <Textarea label='Textarea Label' placeholder='Placeholder Text' required />
  )))
  .add('Error', withInfo('Textarea control with error message')(() => (
    <Textarea label='Textarea Label' placeholder='Placeholder Text' required error='This field is required' />
  )))
  .add('Disabled', withInfo('Textarea control with disabled status')(() => (
    <Textarea label='Textarea Label' placeholder='Placeholder Text' disabled />
  )))
  .add('Read only', withInfo('Textarea control with readOnly status')(() => (
    <Textarea label='Textarea Label' value='Read Only' readOnly />
  )))
  .add('Read only (HTML)', withInfo('Textarea control with readOnly status (passsed to HTML <textarea> element)')(() => (
    <Textarea label='Textarea Label' value='Read Only' htmlReadOnly />
  )))
;
