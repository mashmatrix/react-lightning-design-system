import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { Picklist, PicklistItem } from '../src/scripts';

export default {
  title: 'Picklist',
};

export const ControlledWithKnobs = () => (
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
);

ControlledWithKnobs.story = {
  name: 'Controlled with knobs',
  parameters: { info: 'Picklist controlled with knobs' },
};

export const Default = () => (
  <Picklist
    label='Picklist Label'
    selectedText='Select item from here'
    onChange={action('change')}
    onValueChange={action('valueChange')}
    onSelect={action('select')}
    defaultOpened
  >
    <PicklistItem label='Picklist Item One' value='1' key='1' />
    <PicklistItem label='Picklist Item Two' value='2' key='2' />
    <PicklistItem label='Picklist Item Three' value='3' key='3' />
  </Picklist>
);

Default.story = {
  parameters: { info: 'Default Picklist control' },
};

export const Required = () => (
  <Picklist
    label='Picklist Label'
    required
    onChange={action('change')}
    onValueChange={action('valueChange')}
    onSelect={action('select')}
    defaultOpened
  >
    <PicklistItem label='Picklist Item One' value='1' key='1' />
    <PicklistItem label='Picklist Item Two' value='2' key='2' />
    <PicklistItem label='Picklist Item Three' value='3' key='3' />
  </Picklist>
);

Required.story = {
  parameters: { info: 'Picklist control with required attribute' },
};

export const Error = () => (
  <Picklist
    label='Picklist Label'
    required
    error='This field is required'
    onChange={action('change')}
    onValueChange={action('valueChange')}
    onSelect={action('select')}
    defaultOpened
  >
    <PicklistItem label='Picklist Item One' value='1' key='1' />
    <PicklistItem label='Picklist Item Two' value='2' key='2' />
    <PicklistItem label='Picklist Item Three' value='3' key='3' />
  </Picklist>
);

Error.story = {
  parameters: { info: 'Picklist control with error message' },
};

export const DisabledItems = () => (
  <Picklist
    label='Picklist Label'
    onChange={action('change')}
    onValueChange={action('valueChange')}
    onSelect={action('select')}
    defaultOpened
  >
    <PicklistItem label='Picklist Item One' value='1' key='1' disabled />
    <PicklistItem label='Picklist Item Two' value='2' key='2' disabled />
    <PicklistItem label='Picklist Item Three' value='3' key='3' disabled />
  </Picklist>
);

DisabledItems.story = {
  parameters: { info: 'Picklist with disabled items' },
};

export const Disabled = () => (
  <Picklist
    label='Picklist Label'
    onChange={action('change')}
    onValueChange={action('valueChange')}
    onSelect={action('select')}
    disabled
  >
    <PicklistItem label='Picklist Item One' value='1' key='1' />
    <PicklistItem label='Picklist Item Two' value='2' key='2' />
    <PicklistItem label='Picklist Item Three' value='3' key='3' />
  </Picklist>
);

Disabled.story = {
  parameters: { info: 'Picklist with disabled status' },
};

export const MenuSizeMedium = () => (
  <Picklist
    label='Picklist Label'
    selectedText='Select item from here'
    onChange={action('change')}
    onValueChange={action('valueChange')}
    onSelect={action('select')}
    defaultOpened
    menuSize='medium'
  >
    <PicklistItem label='Picklist Item One' value='1' key='1' />
    <PicklistItem label='Picklist Item Two' value='2' key='2' />
    <PicklistItem label='Picklist Item Three' value='3' key='3' />
  </Picklist>
);

MenuSizeMedium.story = {
  name: 'Menu Size - Medium',
  parameters: { info: 'Picklist with medium size menu' },
};

export const MenuSizeLarge = () => (
  <Picklist
    label='Picklist Label'
    selectedText='Select item from here'
    onChange={action('change')}
    onValueChange={action('valueChange')}
    onSelect={action('select')}
    defaultOpened
    menuSize='large'
  >
    <PicklistItem label='Picklist Item One' value='1' key='1' />
    <PicklistItem label='Picklist Item Two' value='2' key='2' />
    <PicklistItem label='Picklist Item Three' value='3' key='3' />
  </Picklist>
);

MenuSizeLarge.story = {
  name: 'Menu Size - Large',
  parameters: { info: 'Picklist with large size menu' },
};

export const SingleItemSelected = () => (
  <Picklist
    label='Picklist Label'
    value='1'
    onChange={action('change')}
    onValueChange={action('valueChange')}
    onSelect={action('select')}
    defaultOpened
  >
    <PicklistItem label='Picklist Item One' value='1' key='1' />
    <PicklistItem label='Picklist Item Two' value='2' key='2' />
    <PicklistItem label='Picklist Item Three' value='3' key='3' />
  </Picklist>
);

SingleItemSelected.story = {
  name: 'Single item selected',
  parameters: { info: 'Picklist with a single item value is specified' },
};

export const MultipleItemsSelected = () => (
  <Picklist
    label='Picklist Label'
    value={['1', '3']}
    optionsSelectedText='multiple items are selected'
    multiSelect
    onChange={action('change')}
    onValueChange={action('valueChange')}
    onSelect={action('select')}
    defaultOpened
  >
    <PicklistItem label='Picklist Item One' value='1' key='1' />
    <PicklistItem label='Picklist Item Two' value='2' key='2' />
    <PicklistItem label='Picklist Item Three' value='3' key='3' />
  </Picklist>
);

MultipleItemsSelected.story = {
  name: 'Multiple items selected',
  parameters: { info: 'Picklist with multiple item values are specified' },
};

export const DropdownScroll = () => (
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
      defaultOpened
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
);

DropdownScroll.story = {
  parameters: { info: 'Picklist control with many items' },
};
