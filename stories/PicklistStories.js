import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { withKnobs, text, boolean } from '@kadira/storybook-addon-knobs';
import Picklist, { PicklistItem } from '../src/scripts/Picklist';

storiesOf('Picklist', module)
  .addDecorator(withKnobs)
  .addWithInfo('Controlled with knobs', 'Picklist controlled with knobs', () => (
    <Picklist
      label={ text('label', 'Picklist Label') }
      error={ text('error') }
      required={ boolean('required') }
      value={ text('value') }
      disabled={ boolean('disabled') }
      selectedText={ text('selectedText') }
      multiSelect={ boolean('multiSelect') }
      optionsSelectedText={ text('optionsSelectedText') }
      onSelect={ action('select') }
      onChange={ action('change') }
      onValueChange={ action('valueChange') }
      onBlur={ action('blur') }
    >
      <PicklistItem label='Picklsit Item One' value='1' disabled={ boolean('disabled #1') } />
      <PicklistItem label='Picklsit Item Two' value='2' disabled={ boolean('disabled #2') } />
      <PicklistItem label='Picklist Item Three' value='3' disabled={ boolean('disabled #3') } />
    </Picklist>
  ))
  .addWithInfo('Default', 'Default Picklist control', () => (
    <Picklist
      label='Picklist Label'
      selectedText='Select item from here'
      onChange={ action('change') }
      onValueChange={ action('valueChange') }
      onSelect={ action('select') }
    >
      <PicklistItem label='Picklsit Item One' value='1' />
      <PicklistItem label='Picklsit Item Two' value='2' />
      <PicklistItem label='Picklist Item Three' value='3' />
    </Picklist>
  ))
  .addWithInfo('Required', 'Picklist control with required attribute', () => (
    <Picklist
      label='Picklist Label'
      required
      onChange={ action('change') }
      onValueChange={ action('valueChange') }
      onSelect={ action('select') }
    >
      <PicklistItem label='Picklsit Item One' value='1' />
      <PicklistItem label='Picklsit Item Two' value='2' />
      <PicklistItem label='Picklist Item Three' value='3' />
    </Picklist>
  ))
  .addWithInfo('Error', 'Picklist control with error message', () => (
    <Picklist
      label='Picklist Label'
      required
      error='This field is required'
      onChange={ action('change') }
      onValueChange={ action('valueChange') }
      onSelect={ action('select') }
    >
      <PicklistItem label='Picklsit Item One' value='1' />
      <PicklistItem label='Picklsit Item Two' value='2' />
      <PicklistItem label='Picklist Item Three' value='3' />
    </Picklist>
  ))
  .addWithInfo('Disabled', 'Picklist with disabled items', () => (
    <Picklist
      label='Picklist Label'
      onChange={ action('change') }
      onValueChange={ action('valueChange') }
      onSelect={ action('select') }
    >
      <PicklistItem label='Picklsit Item One' value='1' disabled />
      <PicklistItem label='Picklsit Item Two' value='2' disabled />
      <PicklistItem label='Picklist Item Three' value='3' disabled />
    </Picklist>
  ))
  .addWithInfo('Single item selected', 'Picklist with a single item value is specified', () => (
    <Picklist
      label='Picklist Label'
      value='1'
      onChange={ action('change') }
      onValueChange={ action('valueChange') }
      onSelect={ action('select') }
    >
      <PicklistItem label='Picklsit Item One' value='1' />
      <PicklistItem label='Picklsit Item Two' value='2' />
      <PicklistItem label='Picklist Item Three' value='3' />
    </Picklist>
  ))
  .addWithInfo('Multiple items selected', 'Picklist with multiple item values are specified', () => (
    <Picklist
      label='Picklist Label'
      value={ ['1', '3'] }
      optionsSelectedText='multiple items are selected'
      multiSelect
      onChange={ action('change') }
      onValueChange={ action('valueChange') }
      onSelect={ action('select') }
    >
      <PicklistItem label='Picklsit Item One' value='1' />
      <PicklistItem label='Picklsit Item Two' value='2' />
      <PicklistItem label='Picklist Item Three' value='3' />
    </Picklist>
  ))
;
