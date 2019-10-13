import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { DateInput } from '../src/scripts';

storiesOf('DateInput', module)
  .add(
    'Controlled with knobs',
    () => (
      <DateInput
        label={text('label', 'Date Input Label')}
        error={text('error', '')}
        required={boolean('required', false)}
        value={text('value', '')}
        dateFormat={text('dateFormat', '')}
        includeTime={boolean('includeTime', false)}
        minDate={text('minDate', '')}
        maxDate={text('maxDate', '')}
        onBlur={action('blur')}
        onValueChange={action('valueChange')}
        onComplete={action('complete')}
      />
    ),
    { info: 'DateInput controlled with knobs' }
  )
  .add(
    'Default',
    () => (
      <DateInput
        label='Date Input Label'
        value='2016-04-13'
        onBlur={action('blur')}
        onValueChange={action('valueChange')}
        onComplete={action('complete')}
      />
    ),
    { info: 'Default date input control' }
  )
  .add(
    'Required',
    () => (
      <DateInput
        label='Date Input Label'
        value='2016-04-13'
        required
        onBlur={action('blur')}
        onValueChange={action('valueChange')}
        onComplete={action('complete')}
      />
    ),
    { info: 'Date input control with required attribute' }
  )
  .add(
    'Error',
    () => (
      <DateInput
        label='Date Input Label'
        value='2016-04-13'
        required
        error='This field is required'
        onBlur={action('blur')}
        onValueChange={action('valueChange')}
        onComplete={action('complete')}
      />
    ),
    { info: 'Date input control with error message' }
  )
  .add(
    'Disabled',
    () => (
      <DateInput
        label='Date Input Label'
        value='2016-04-13'
        disabled
        onBlur={action('blur')}
        onValueChange={action('valueChange')}
        onComplete={action('complete')}
      />
    ),
    { info: 'Date input control with disabled status' }
  )
  .add(
    'With date format',
    () => (
      <DateInput
        label='Date Input Label'
        value='2016-04-13'
        dateFormat='YYYY.MM.DD'
        onBlur={action('blur')}
        onValueChange={action('valueChange')}
        onComplete={action('complete')}
      />
    ),
    { info: 'Date input control with date format specified (YYYY.MM.DD)' }
  )
  .add(
    'With min/max date',
    () => (
      <DateInput
        label='Date Input Label'
        value='2016-04-13'
        minDate='2016-04-10'
        maxDate='2016-04-19'
        onBlur={action('blur')}
        onValueChange={action('valueChange')}
        onComplete={action('complete')}
      />
    ),
    { info: 'Date input control with minimum date boundary' }
  )
  .add(
    'Include time data',
    () => (
      <DateInput
        label='Date Input Label'
        value='2016-04-13T23:42:56+0900'
        dateFormat='YYYY/MM/DD HH:mm:ss'
        includeTime
        onBlur={action('blur')}
        onValueChange={action('valueChange')}
        onComplete={action('complete')}
      />
    ),
    { info: 'Date input control with time information' }
  );
