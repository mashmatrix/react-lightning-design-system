import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { Picklist, PicklistItem } from '../src/scripts';

storiesOf('Picklist', module)
  .add(
    'Controlled with knobs',
    () => (
      <Picklist
        label={text('label', 'Picklist Label')}
        error={text('error', '')}
        required={boolean('required', false)}
        value={text('value', '')}
        disabled={boolean('disabled', false)}
        selectedText={text('selectedText', '')}
        multiSelect={boolean('multiSelect', false)}
        optionsSelectedText={text('optionsSelectedText', '')}
        onSelect={action('select')}
        onChange={action('change')}
        onValueChange={action('valueChange')}
        onBlur={action('blur')}
      >
        <PicklistItem
          label='Picklist Item One'
          value='1'
          disabled={boolean('disabled #1', false)}
        />
        <PicklistItem
          label='Picklist Item Two'
          value='2'
          disabled={boolean('disabled #2', false)}
        />
        <PicklistItem
          label='Picklist Item Three'
          value='3'
          disabled={boolean('disabled #3', false)}
        />
      </Picklist>
    ),
    { info: 'Picklist controlled with knobs' }
  )
  .add(
    'Default',
    () => (
      <Picklist
        label='Picklist Label'
        selectedText='Select item from here'
        onChange={action('change')}
        onValueChange={action('valueChange')}
        onSelect={action('select')}
      >
        <PicklistItem label='Picklist Item One' value='1' key='1' />
        <PicklistItem label='Picklist Item Two' value='2' key='2' />
        <PicklistItem label='Picklist Item Three' value='3' key='3' />
      </Picklist>
    ),
    { info: 'Default Picklist control' }
  )
  .add(
    'Required',
    () => (
      <Picklist
        label='Picklist Label'
        required
        onChange={action('change')}
        onValueChange={action('valueChange')}
        onSelect={action('select')}
      >
        <PicklistItem label='Picklist Item One' value='1' key='1' />
        <PicklistItem label='Picklist Item Two' value='2' key='2' />
        <PicklistItem label='Picklist Item Three' value='3' key='3' />
      </Picklist>
    ),
    { info: 'Picklist control with required attribute' }
  )
  .add(
    'Error',
    () => (
      <Picklist
        label='Picklist Label'
        required
        error='This field is required'
        onChange={action('change')}
        onValueChange={action('valueChange')}
        onSelect={action('select')}
      >
        <PicklistItem label='Picklist Item One' value='1' key='1' />
        <PicklistItem label='Picklist Item Two' value='2' key='2' />
        <PicklistItem label='Picklist Item Three' value='3' key='3' />
      </Picklist>
    ),
    { info: 'Picklist control with error message' }
  )
  .add(
    'Disabled',
    () => (
      <Picklist
        label='Picklist Label'
        onChange={action('change')}
        onValueChange={action('valueChange')}
        onSelect={action('select')}
      >
        <PicklistItem label='Picklist Item One' value='1' key='1' disabled />
        <PicklistItem label='Picklist Item Two' value='2' key='2' disabled />
        <PicklistItem label='Picklist Item Three' value='3' key='3' disabled />
      </Picklist>
    ),
    { info: 'Picklist with disabled items' }
  )
  .add(
    'Single item selected',
    () => (
      <Picklist
        label='Picklist Label'
        value='1'
        onChange={action('change')}
        onValueChange={action('valueChange')}
        onSelect={action('select')}
      >
        <PicklistItem label='Picklist Item One' value='1' key='1' />
        <PicklistItem label='Picklist Item Two' value='2' key='2' />
        <PicklistItem label='Picklist Item Three' value='3' key='3' />
      </Picklist>
    ),
    { info: 'Picklist with a single item value is specified' }
  )
  .add(
    'Multiple items selected',
    () => (
      <Picklist
        label='Picklist Label'
        value={['1', '3']}
        optionsSelectedText='multiple items are selected'
        multiSelect
        onChange={action('change')}
        onValueChange={action('valueChange')}
        onSelect={action('select')}
      >
        <PicklistItem label='Picklist Item One' value='1' key='1' />
        <PicklistItem label='Picklist Item Two' value='2' key='2' />
        <PicklistItem label='Picklist Item Three' value='3' key='3' />
      </Picklist>
    ),
    { info: 'Picklist with multiple item values are specified' }
  )
  .add(
    'Dropdown Scroll',
    () => (
      <div tabIndex={-1}>
        <Picklist
          label='Picklist Label'
          selectedText='Select item from here'
          onChange={action('change')}
          onValueChange={action('valueChange')}
          onSelect={action('select')}
          onBlur={action('blur')}
          onComplete={action('complete')}
          menuSize='small'
          menuStyle={{ maxHeight: '20rem', overflowY: 'auto' }}
        >
          {Array.from(Array(20)).map((_, i) => (
            <PicklistItem
              label={`Picklist Item #${i + 1}`}
              value={String(i + 1)}
              key={String(i + 1)}
            />
          ))}
        </Picklist>
      </div>
    ),
    { info: 'Picklist control with many items' }
  );
