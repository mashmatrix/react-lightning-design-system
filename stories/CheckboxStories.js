import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { text, boolean } from '@storybook/addon-knobs';
import { CheckboxGroup, Checkbox } from '../src/scripts';

storiesOf('Checkbox', module)
  .add('Controlled with knobs', withInfo('Checkbox controlled with knobs')(() => (
    <CheckboxGroup
      label={ text('label', 'Checkbox Group Label') }
      error={ text('error') }
      required={ boolean('required') }
      onChange={ action('change') }
    >
      <Checkbox label='Checkbox Label One' value='1' disabled={ boolean('disabled #1', false) } checked={ boolean('checked #1', false) } />
      <Checkbox label='Checkbox Label Two' value='2' disabled={ boolean('disabled #2', false) } checked={ boolean('checked #2', false) } />
    </CheckboxGroup>
  )))
  .add('Default', withInfo('Checkbox Textarea control')(() => (
    <CheckboxGroup label='Radio Group Label'>
      <Checkbox label='Checkbox Label One' value='1' checked />
      <Checkbox label='Checkbox Label Two' value='2' checked={ false } />
    </CheckboxGroup>
  )))
  .add('Required', withInfo('Checkbox control with required attribute')(() => (
    <CheckboxGroup label='Checkbox Group Label' required>
      <Checkbox label='Checkbox Label One' value='1' checked />
      <Checkbox label='Checkbox Label Two' value='2' />
    </CheckboxGroup>
  )))
  .add('Error', withInfo('Checkbox control with error message')(() => (
    <CheckboxGroup label='Checkbox Group Label' required error='This field is required'>
      <Checkbox label='Checkbox Label One' value='1' checked />
      <Checkbox label='Checkbox Label Two' value='2' />
    </CheckboxGroup>
  )))
  .add('Disabled', withInfo('Checkbox control with disabled status')(() => (
    <CheckboxGroup label='Checkbox Group Label'>
      <Checkbox label='Checkbox Label One' value='1' disabled />
      <Checkbox label='Checkbox Label Two' value='2' disabled />
    </CheckboxGroup>
  )))
;
