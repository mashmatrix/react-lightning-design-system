import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { DateInput } from '../src/scripts';
export default {
  title: 'DateInput',
};
export const ControlledWithKnobs = {
  render: () => (
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
  name: 'Controlled with knobs',
  parameters: {
    info: 'DateInput controlled with knobs',
  },
};
export const Default = {
  render: () => (
    <DateInput
      label='Date Input Label'
      value='2016-04-13'
      defaultOpened
      onBlur={action('blur')}
      onValueChange={action('valueChange')}
      onComplete={action('complete')}
    />
  ),
  parameters: {
    info: 'Default date input control',
  },
};
export const Required = {
  render: () => (
    <DateInput
      label='Date Input Label'
      value='2016-04-13'
      defaultOpened
      required
      onBlur={action('blur')}
      onValueChange={action('valueChange')}
      onComplete={action('complete')}
    />
  ),
  parameters: {
    info: 'Date input control with required attribute',
  },
};
export const Error = {
  render: () => (
    <DateInput
      label='Date Input Label'
      value='2016-04-13'
      defaultOpened
      required
      error='This field is required'
      onBlur={action('blur')}
      onValueChange={action('valueChange')}
      onComplete={action('complete')}
    />
  ),
  parameters: {
    info: 'Date input control with error message',
  },
};
export const Disabled = {
  render: () => (
    <DateInput
      label='Date Input Label'
      value='2016-04-13'
      defaultOpened
      disabled
      onBlur={action('blur')}
      onValueChange={action('valueChange')}
      onComplete={action('complete')}
    />
  ),
  parameters: {
    info: 'Date input control with disabled status',
  },
};
export const WithDateFormat = {
  render: () => (
    <DateInput
      label='Date Input Label'
      value='2016-04-13'
      defaultOpened
      dateFormat='YYYY.MM.DD'
      onBlur={action('blur')}
      onValueChange={action('valueChange')}
      onComplete={action('complete')}
    />
  ),
  name: 'With date format',
  parameters: {
    info: 'Date input control with date format specified (YYYY.MM.DD)',
  },
};
export const WithMinMaxDate = {
  render: () => (
    <DateInput
      label='Date Input Label'
      value='2016-04-13'
      defaultOpened
      minDate='2016-04-10'
      maxDate='2016-04-19'
      onBlur={action('blur')}
      onValueChange={action('valueChange')}
      onComplete={action('complete')}
    />
  ),
  name: 'With min/max date',
  parameters: {
    info: 'Date input control with minimum date boundary',
  },
};
export const IncludeTimeData = {
  render: () => (
    <DateInput
      label='Date Input Label'
      value='2016-04-13T23:42:56+0900'
      defaultOpened
      dateFormat='YYYY/MM/DD HH:mm:ss'
      includeTime
      onBlur={action('blur')}
      onValueChange={action('valueChange')}
      onComplete={action('complete')}
    />
  ),
  name: 'Include time data',
  parameters: {
    info: 'Date input control with time information',
  },
};
