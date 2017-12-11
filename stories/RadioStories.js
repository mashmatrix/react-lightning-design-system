import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { text, boolean } from '@storybook/addon-knobs';
import { RadioGroup, Radio } from '../src/scripts';

storiesOf('Radio', module)
  .add('Controlled with knobs', withInfo('Radio Group controlled with knobs')(() => (
    <RadioGroup
      label={ text('label', 'Radio Group Label') }
      error={ text('error') }
      required={ boolean('required') }
      onChange={ action('change') }
    >
      <Radio label='Radio Label One' value='1' disabled={ boolean('disabled #1') } checked={ text('value') === '1' } />
      <Radio label='Radio Label Two' value='2' disabled={ boolean('disabled #2') } checked={ text('value') === '2' } />
    </RadioGroup>
  )))
  .add('Default', withInfo('Default Radio Group control')(() => (
    <RadioGroup label='Radio Group Label'>
      <Radio label='Radio Label One' value='1' checked />
      <Radio label='Radio Label Two' value='2' />
    </RadioGroup>
  )))
  .add('Required', withInfo('Radio Group control with required attribute')(() => (
    <RadioGroup label='Radio Group Label' required>
      <Radio label='Radio Label One' value='1' checked />
      <Radio label='Radio Label Two' value='2' />
    </RadioGroup>
  )))
  .add('Error', withInfo('Radio Group control with error message')(() => (
    <RadioGroup label='Radio Group Label' required error='This field is required'>
      <Radio label='Radio Label One' value='1' checked />
      <Radio label='Radio Label Two' value='2' />
    </RadioGroup>
  )))
  .add('Disabled', withInfo('Radio Group control with disabled status')(() => (
    <RadioGroup label='Radio Group Label'>
      <Radio label='Radio Label One' value='1' disabled />
      <Radio label='Radio Label Two' value='2' disabled />
    </RadioGroup>
  )))
;
