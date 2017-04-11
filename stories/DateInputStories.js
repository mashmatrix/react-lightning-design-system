import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { text, boolean } from '@kadira/storybook-addon-knobs';
import { DateInput } from '../src/scripts';

storiesOf('DateInput', module)
  .addWithInfo('Controlled with knobs', 'DateInput controlled with knobs', () => (
    <DateInput
      label={ text('label', 'Date Input Label') }
      error={ text('error') }
      required={ boolean('required') }
      value={ text('value') }
      dateFormat={ text('dateFormat') }
      includeTime={ boolean('includeTime') }
      minDate={ text('minDate') }
      maxDate={ text('maxDate') }
      onBlur={ action('blur') }
      onValueChange={ action('valueChange') }
      onComplete={ action('complete') }
    />
  ))
  .addWithInfo('Default', 'Default date input control', () => (
    <DateInput
      label='Date Input Label'
      value='2016-04-13'
      onBlur={ action('blur') }
      onValueChange={ action('valueChange') }
      onComplete={ action('complete') }
    />
  ))
  .addWithInfo('Required', 'Date input control with required attribute', () => (
    <DateInput
      label='Date Input Label'
      value='2016-04-13'
      required
      onBlur={ action('blur') }
      onValueChange={ action('valueChange') }
      onComplete={ action('complete') }
    />
  ))
  .addWithInfo('Error', 'Date input control with error message', () => (
    <DateInput
      label='Date Input Label'
      value='2016-04-13'
      required
      error='This field is required'
      onBlur={ action('blur') }
      onValueChange={ action('valueChange') }
      onComplete={ action('complete') }
    />
  ))
  .addWithInfo('Disabled', 'Date input control with disabled status', () => (
    <DateInput
      label='Date Input Label'
      value='2016-04-13'
      disabled
      onBlur={ action('blur') }
      onValueChange={ action('valueChange') }
      onComplete={ action('complete') }
    />
  ))
  .addWithInfo('With date format', 'Date input control with date format specified (YYYY.MM.DD)', () => (
    <DateInput
      label='Date Input Label'
      value='2016-04-13'
      dateFormat='YYYY.MM.DD'
      onBlur={ action('blur') }
      onValueChange={ action('valueChange') }
      onComplete={ action('complete') }
    />
  ))
  .addWithInfo('With min/max date', 'Date input control with minimum date boundary', () => (
    <DateInput
      label='Date Input Label'
      value='2016-04-13'
      minDate='2016-04-10'
      maxDate='2016-04-19'
      onBlur={ action('blur') }
      onValueChange={ action('valueChange') }
      onComplete={ action('complete') }
    />
  ))
  .addWithInfo('Include time data', 'Date input control with time information', () => (
    <DateInput
      label='Date Input Label'
      value='2016-04-13T23:42:56+0900'
      dateFormat='YYYY/MM/DD HH:mm:ss'
      includeTime
      onBlur={ action('blur') }
      onValueChange={ action('valueChange') }
      onComplete={ action('complete') }
    />
  ))
;
