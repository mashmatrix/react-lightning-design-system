import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { withKnobs, text, boolean } from '@kadira/storybook-addon-knobs';
import Select, { Option } from '../src/scripts/Select';

storiesOf('Select', module)
  .addDecorator(withKnobs)
  .addWithInfo('Controlled with knobs', 'Select controlled with knobs', () => (
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
  ))
  .addWithInfo('Default', 'Default Select control', () => (
    <Select
      label='Select Label'
      onChange={ action('change') }
      onBlur={ action('blur') }
    >
      <Option label='Option One' value='1' />
      <Option label='Option Two' value='2' />
      <Option label='Option Three' value='3' />
    </Select>
  ))
  .addWithInfo('Required', 'Select control with required attribute', () => (
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
  ))
  .addWithInfo('Error', 'Select control with error message', () => (
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
  ))
  .addWithInfo('Disabled', 'Select control with disabled status', () => (
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
  ))
;
