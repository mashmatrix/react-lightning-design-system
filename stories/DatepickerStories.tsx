import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { Datepicker, Button } from '../src/scripts';

const TodayButtonExtensionRenderer = (props: any) => {
  const { onSelect } = props;
  const today = moment().format('YYYY-MM-DD');
  return (
    <div style={{ padding: '4px', textAlign: 'center' }}>
      <Button className='slds-size--1-of-2' onClick={() => onSelect(today)}>
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

storiesOf('Datepicker', module)
  .add(
    'Controlled with knobs',
    () => (
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
    { info: 'DateInput controlled with knobs' }
  )
  .add(
    'Default',
    () => (
      <div style={datepickerWrapperStyle}>
        <Datepicker
          selectedDate='2016-04-13'
          onSelect={action('select')}
          onClose={action('close')}
          onBlur={action('blur')}
        />
      </div>
    ),
    { info: 'Default date input control' }
  )
  .add(
    'Extension Rendering',
    () => (
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
    { info: 'Specify extension component in datepicker content' }
  );
