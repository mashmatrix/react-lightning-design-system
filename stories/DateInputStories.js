import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { withKnobs, text, boolean, select } from '@kadira/storybook-addon-knobs';
import DateInput from '../src/scripts/DateInput';

storiesOf('DateInput', module)
  .addDecorator(withKnobs)
  .addWithInfo('Controlled with knobs', 'DateInput controlled with knobs', () => {
    return (
      <DateInput
        label={ text('label', 'Date Input') }
        value={ text('value') }
        error={ text('error') }
        dateFormat={ text('dateFormat') }
        includeTime={ boolean('includeTime') }
        minDate={ text('minDate') }
        maxDate={ text('maxDate') }
        onChange={ action('change') }
        onBlur={ action('blur') }
        onValueChange={ action('valueChange') }
        onComplete={ action('complete') }
      />
    );
  })
;
