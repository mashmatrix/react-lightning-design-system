import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { Select, Option } from '../src/scripts';

storiesOf('Select', module)
  .add(
    'Controlled with knobs',
    () => (
      <Select
        label={text('label', 'Select Label')}
        error={text('error', '')}
        required={boolean('required', false)}
        value={text('value', '')}
        disabled={boolean('disabled', false)}
        onChange={action('change')}
        onBlur={action('blur')}
      >
        <Option label='Option One' value='1' />
        <Option label='Option Two' value='2' />
        <Option label='Option Three' value='3' />
      </Select>
    ),
    { info: 'Select controlled with knobs' }
  )
  .add(
    'Default',
    () => (
      <Select
        label='Select Label'
        onChange={action('change')}
        onBlur={action('blur')}
      >
        <Option label='Option One' value='1' />
        <Option label='Option Two' value='2' />
        <Option label='Option Three' value='3' />
      </Select>
    ),
    { info: 'Default Select control' }
  )
  .add(
    'Required',
    () => (
      <Select
        label='Select Label'
        required
        onChange={action('change')}
        onBlur={action('blur')}
      >
        <Option label='Option One' value='1' />
        <Option label='Option Two' value='2' />
        <Option label='Option Three' value='3' />
      </Select>
    ),
    { info: 'Select control with required attribute' }
  )
  .add(
    'Error',
    () => (
      <Select
        label='Select Label'
        required
        error='This field is required'
        onChange={action('change')}
        onBlur={action('blur')}
      >
        <Option label='Option One' value='1' />
        <Option label='Option Two' value='2' />
        <Option label='Option Three' value='3' />
      </Select>
    ),
    { info: 'Select control with error message' }
  )
  .add(
    'Disabled',
    () => (
      <Select
        label='Select Label'
        disabled
        onChange={action('change')}
        onBlur={action('blur')}
      >
        <Option label='Option One' value='1' />
        <Option label='Option Two' value='2' />
        <Option label='Option Three' value='3' />
      </Select>
    ),
    { info: 'Select control with disabled status' }
  );
