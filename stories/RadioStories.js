import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { withKnobs, text, boolean } from '@kadira/storybook-addon-knobs';
import { RadioGroup, Radio } from '../src/scripts';

storiesOf('Radio', module)
  .addDecorator(withKnobs)
  .addWithInfo('Controlled with knobs', 'Radio Group controlled with knobs', () => (
    <RadioGroup
      label={ text('label', 'Radio Group Label') }
      error={ text('error') }
      required={ boolean('required') }
      onChange={ action('change') }
    >
      <Radio label='Radio Label One' value='1' disabled={ boolean('disabled #1') } checked={ text('value') === '1' } />
      <Radio label='Radio Label Two' value='2' disabled={ boolean('disabled #2') } checked={ text('value') === '2' } />
    </RadioGroup>
  ))
  .addWithInfo('Default', 'Default Radio Group control', () => (
    <RadioGroup label='Radio Group Label'>
      <Radio label='Radio Label One' value='1' checked />
      <Radio label='Radio Label Two' value='2' />
    </RadioGroup>
  ))
  .addWithInfo('Required', 'Radio Group control with required attribute', () => (
    <RadioGroup label='Radio Group Label' required>
      <Radio label='Radio Label One' value='1' checked />
      <Radio label='Radio Label Two' value='2' />
    </RadioGroup>
  ))
  .addWithInfo('Error', 'Radio Group control with error message', () => (
    <RadioGroup label='Radio Group Label' required error='This field is required'>
      <Radio label='Radio Label One' value='1' checked />
      <Radio label='Radio Label Two' value='2' />
    </RadioGroup>
  ))
  .addWithInfo('Disabled', 'Radio Group control with disabled status', () => (
    <RadioGroup label='Radio Group Label'>
      <Radio label='Radio Label One' value='1' disabled />
      <Radio label='Radio Label Two' value='2' disabled />
    </RadioGroup>
  ))
;
