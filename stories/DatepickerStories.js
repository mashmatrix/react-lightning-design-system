import React from 'react';
import moment from 'moment';
import { storiesOf, action } from '@kadira/storybook';
import { withKnobs, text } from '@kadira/storybook-addon-knobs';
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

storiesOf('Datepicker', module)
  .addDecorator(withKnobs)
  .addWithInfo('Controlled with knobs', 'DateInput controlled with knobs', () => (
    <Datepicker
      selectedDate={ text('selectedDate') }
      minDate={ text('minDate') }
      maxDate={ text('maxDate') }
      onSelect={ action('select') }
      onClose={ action('close') }
      onBlur={ action('blur') }
    />
  ))
  .addWithInfo('Default', 'Default date input control', () => (
    <Datepicker
      selectedDate='2016-04-13'
      onSelect={ action('select') }
      onClose={ action('close') }
      onBlur={ action('blur') }
    />
  ))
  .addWithInfo('Extension Rendering', 'Specify extension component in datepicker content', () => (
    <Datepicker
      selectedDate='2016-04-13'
      extensionRenderer={ TodayButtonExtensionRenderer }
      onSelect={ action('select') }
      onClose={ action('close') }
      onBlur={ action('blur') }
    />
  ))
;
