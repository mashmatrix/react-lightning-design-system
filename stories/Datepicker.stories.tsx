import React from 'react';
import moment from 'moment';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { Datepicker, Button } from '../src/scripts';

const TodayButtonExtensionRenderer = (props: any) => {
  const { onSelect } = props;
  const today = moment().format('YYYY-MM-DD');
  return (
    <div
      style={{
        padding: '4px',
        textAlign: 'center',
      }}
    >
      <Button className='slds-size_1-of-2' onClick={() => onSelect(today)}>
        Today
      </Button>
    </div>
  );
};

const datepickerWrapperStyle = {
  padding: 8,
  width: 350,
  borderRadius: 4,
  boxShadow: '0 0 4px gray',
};
export default {
  title: 'Datepicker',
};
export const ControlledWithKnobs = {
  render: () => (
    <div style={datepickerWrapperStyle}>
      <Datepicker
        selectedDate={text('selectedDate', '')}
        minDate={text('minDate', '')}
        maxDate={text('maxDate', '')}
        onSelect={action('select')}
        onClose={action('close')}
        onBlur={action('blur')}
      />
    </div>
  ),
  name: 'Controlled with knobs',
  parameters: {
    info: 'DateInput controlled with knobs',
  },
};
export const Default = {
  render: () => (
    <div style={datepickerWrapperStyle}>
      <Datepicker
        selectedDate='2016-04-13'
        onSelect={action('select')}
        onClose={action('close')}
        onBlur={action('blur')}
      />
    </div>
  ),
  parameters: {
    info: 'Default date input control',
  },
};
export const WithMinDate = {
  render: () => (
    <div style={datepickerWrapperStyle}>
      <Datepicker
        selectedDate='2016-04-13'
        onSelect={action('select')}
        onClose={action('close')}
        onBlur={action('blur')}
        minDate='2016-04-05'
      />
    </div>
  ),
  name: 'With min date',
  parameters: {
    info: 'Date input with min date',
  },
};
export const WithMaxDate = {
  render: () => (
    <div style={datepickerWrapperStyle}>
      <Datepicker
        selectedDate='2016-04-13'
        onSelect={action('select')}
        onClose={action('close')}
        onBlur={action('blur')}
        maxDate='2016-04-20'
      />
    </div>
  ),
  name: 'With max date',
  parameters: {
    info: 'Date input with max date',
  },
};
export const ExtensionRendering = {
  render: () => (
    <div style={datepickerWrapperStyle}>
      <Datepicker
        selectedDate='2016-04-13'
        extensionRenderer={TodayButtonExtensionRenderer}
        onSelect={action('select')}
        onClose={action('close')}
        onBlur={action('blur')}
      />
    </div>
  ),
  parameters: {
    info: 'Specify extension component in datepicker content',
  },
};
