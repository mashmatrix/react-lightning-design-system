import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { Select, Option } from '../src/scripts';

storiesOf('Select', module)
  .add('Controlled with knobs', withInfo('Select controlled with knobs')(() => (
    <Select
      label={ text('label', 'Select Label') }
      error={ text('error') }
      required={ boolean('required') }
      value={ text('value') }
      disabled={ boolean('disabled') }
      onChange={ action('change') }
      onBlur={ action('blur') }
    >
      <Option label='Option One' value='1' />
      <Option label='Option Two' value='2' />
      <Option label='Option Three' value='3' />
    </Select>
  )))
  .add('Default', withInfo('Default Select control')(() => (
    <Select
      label='Select Label'
      onChange={ action('change') }
      onBlur={ action('blur') }
    >
      <Option label='Option One' value='1' />
      <Option label='Option Two' value='2' />
      <Option label='Option Three' value='3' />
    </Select>
  )))
  .add('Required', withInfo('Select control with required attribute')(() => (
    <Select
      label='Select Label'
      required
      onChange={ action('change') }
      onBlur={ action('blur') }
    >
      <Option label='Option One' value='1' />
      <Option label='Option Two' value='2' />
      <Option label='Option Three' value='3' />
    </Select>
  )))
  .add('Error', withInfo('Select control with error message')(() => (
    <Select
      label='Select Label'
      required
      error='This field is required'
      onChange={ action('change') }
      onBlur={ action('blur') }
    >
      <Option label='Option One' value='1' />
      <Option label='Option Two' value='2' />
      <Option label='Option Three' value='3' />
    </Select>
  )))
  .add('Disabled', withInfo('Select control with disabled status')(() => (
    <Select
      label='Select Label'
      disabled
      onChange={ action('change') }
      onBlur={ action('blur') }
    >
      <Option label='Option One' value='1' />
      <Option label='Option Two' value='2' />
      <Option label='Option Three' value='3' />
    </Select>
  )))
;
