import React from 'react';
import moment from 'moment';
import { storiesOf, action } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { Datepicker, Button } from '../src/scripts';

const TodayButtonExtensionRenderer = (props) => {
  const { onSelect } = props; // eslint-disable-line react/prop-types
  const today = moment().format('YYYY-MM-DD');
  return (
    <div style={{ padding: '4px', textAlign: 'center' }}>
      <Button
        className='slds-size--1-of-2'
        onClick={ () => onSelect(today) }
      >
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
  .addWithInfo('Controlled with knobs', 'DateInput controlled with knobs', () => (
    <div style={ datepickerWrapperStyle }>
      <Datepicker
        selectedDate={ text('selectedDate') }
        minDate={ text('minDate') }
        maxDate={ text('maxDate') }
        onSelect={ action('select') }
        onClose={ action('close') }
        onBlur={ action('blur') }
      />
    </div>
  ))
  .addWithInfo('Default', 'Default date input control', () => (
    <div style={ datepickerWrapperStyle }>
      <Datepicker
        selectedDate='2016-04-13'
        onSelect={ action('select') }
        onClose={ action('close') }
        onBlur={ action('blur') }
      />
    </div>
  ))
  .addWithInfo('Extension Rendering', 'Specify extension component in datepicker content', () => (
    <div style={ datepickerWrapperStyle }>
      <Datepicker
        selectedDate='2016-04-13'
        extensionRenderer={ TodayButtonExtensionRenderer }
        onSelect={ action('select') }
        onClose={ action('close') }
        onBlur={ action('blur') }
      />
    </div>
  ))
;
