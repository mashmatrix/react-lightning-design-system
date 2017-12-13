import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { text, boolean } from '@storybook/addon-knobs';
import { Picklist, PicklistItem } from '../src/scripts';

storiesOf('Picklist', module)
  .add('Controlled with knobs', withInfo('Picklist controlled with knobs')(() => (
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
      <PicklistItem label='Picklist Item One' value='1' disabled={ boolean('disabled #1') } />
      <PicklistItem label='Picklist Item Two' value='2' disabled={ boolean('disabled #2') } />
      <PicklistItem label='Picklist Item Three' value='3' disabled={ boolean('disabled #3') } />
    </Picklist>
  )))
  .add('Default', withInfo('Default Picklist control')(() => (
    <Picklist
      label='Picklist Label'
      selectedText='Select item from here'
      onChange={ action('change') }
      onValueChange={ action('valueChange') }
      onSelect={ action('select') }
    >
      <PicklistItem label='Picklist Item One' value='1' key='1' />
      <PicklistItem label='Picklist Item Two' value='2' key='2' />
      <PicklistItem label='Picklist Item Three' value='3' key='3' />
    </Picklist>
  )))
  .add('Required', withInfo('Picklist control with required attribute')(() => (
    <Picklist
      label='Picklist Label'
      required
      onChange={ action('change') }
      onValueChange={ action('valueChange') }
      onSelect={ action('select') }
    >
      <PicklistItem label='Picklist Item One' value='1' key='1' />
      <PicklistItem label='Picklist Item Two' value='2' key='2' />
      <PicklistItem label='Picklist Item Three' value='3' key='3' />
    </Picklist>
  )))
  .add('Error', withInfo('Picklist control with error message')(() => (
    <Picklist
      label='Picklist Label'
      required
      error='This field is required'
      onChange={ action('change') }
      onValueChange={ action('valueChange') }
      onSelect={ action('select') }
    >
      <PicklistItem label='Picklist Item One' value='1' key='1' />
      <PicklistItem label='Picklist Item Two' value='2' key='2' />
      <PicklistItem label='Picklist Item Three' value='3' key='3' />
    </Picklist>
  )))
  .add('Disabled', withInfo('Picklist with disabled items')(() => (
    <Picklist
      label='Picklist Label'
      onChange={ action('change') }
      onValueChange={ action('valueChange') }
      onSelect={ action('select') }
    >
      <PicklistItem label='Picklist Item One' value='1' key='1' disabled />
      <PicklistItem label='Picklist Item Two' value='2' key='2' disabled />
      <PicklistItem label='Picklist Item Three' value='3' key='3' disabled />
    </Picklist>
  )))
  .add('Single item selected', withInfo('Picklist with a single item value is specified')(() => (
    <Picklist
      label='Picklist Label'
      value='1'
      onChange={ action('change') }
      onValueChange={ action('valueChange') }
      onSelect={ action('select') }
    >
      <PicklistItem label='Picklist Item One' value='1' key='1' />
      <PicklistItem label='Picklist Item Two' value='2' key='2' />
      <PicklistItem label='Picklist Item Three' value='3' key='3' />
    </Picklist>
  )))
  .add('Multiple items selected', withInfo('Picklist with multiple item values are specified')(() => (
    <Picklist
      label='Picklist Label'
      value={ ['1', '3'] }
      optionsSelectedText='multiple items are selected'
      multiSelect
      onChange={ action('change') }
      onValueChange={ action('valueChange') }
      onSelect={ action('select') }
    >
      <PicklistItem label='Picklist Item One' value='1' key='1' />
      <PicklistItem label='Picklist Item Two' value='2' key='2' />
      <PicklistItem label='Picklist Item Three' value='3' key='3' />
    </Picklist>
  )))
  .add('Dropdown Scroll', withInfo('Picklist control with many items')(() => (
    <div tabIndex='-1'>
      <Picklist
        label='Picklist Label'
        selectedText='Select item from here'
        onChange={ action('change') }
        onValueChange={ action('valueChange') }
        onSelect={ action('select') }
        onBlur={ action('blur') }
        onComplete={ action('complete') }
        menuSize='small'
        menuStyle={ { maxHeight: '20rem', overflowY: 'auto' } }
      >
        {
          Array.from(Array(20)).map((_, i) => (
            <PicklistItem label={ `Picklist Item #${i + 1}` } value={ String(i + 1) } key={ String(i + 1) } />
          ))
        }
      </Picklist>
    </div>
  )))
;
