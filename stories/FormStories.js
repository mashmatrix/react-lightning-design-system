import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import {
  Form, FieldSet,
  Input, Textarea,
  CheckboxGroup, Checkbox,
  RadioGroup, Radio,
  Select, Option,
  Picklist, PicklistItem,
  DateInput,
  Lookup,
  Button,
} from '../src/scripts';

const { Row } = FieldSet;

const LOOKUP_DATA = [
  { label: 'Account', value: '1', icon: 'standard:account' },
  { label: 'Contact', value: '2', icon: 'standard:contact' },
  { label: 'Opportunity', value: '3', icon: 'standard:opportunity' },
];

storiesOf('Form', module)
  .add('Horizontal Form', withInfo('Horizontal Form')(() => (
    <Form type='horizontal' onSubmit={ action('submit') }>
      <Input label='Text Input' />
      <Textarea label='Textarea Input' />
      <CheckboxGroup label='Checkbox Group Label'>
        <Checkbox label='All opportunities owned by you' />
        <Checkbox label='All contacts in the account owned by you' />
      </CheckboxGroup>
      <RadioGroup label='Radio Group Label' name='radiogroup1'>
        <Radio label='Lead Generation' />
        <Radio label='Education Leads' />
      </RadioGroup>
      <Select label='Select Label'>
        <Option value='1'>Option One</Option>
        <Option value='2'>Option Two</Option>
      </Select>
      <Picklist label='Picklist Label'>
        <PicklistItem value='1'>Picklist Item One</PicklistItem>
        <PicklistItem value='2'>Picklist Item Two</PicklistItem>
      </Picklist>
      <DateInput label='Date Input Label' />
      <Lookup label='Lookup Label' data={ LOOKUP_DATA } />
    </Form>
  )))
  .add('Stacked Form', withInfo('Stacked Form')(() => (
    <Form type='stacked' onSubmit={ action('submit') }>
      <Input label='Text Input' />
      <Textarea label='Textarea Input' />
      <CheckboxGroup label='Checkbox Group Label'>
        <Checkbox label='All opportunities owned by you' />
        <Checkbox label='All contacts in the account owned by you' />
      </CheckboxGroup>
      <RadioGroup label='Radio Group Label' name='radiogroup1'>
        <Radio label='Lead Generation' />
        <Radio label='Education Leads' />
      </RadioGroup>
      <Select label='Select Label'>
        <Option value='1'>Option One</Option>
        <Option value='2'>Option Two</Option>
      </Select>
      <Picklist label='Picklist Label'>
        <PicklistItem value='1'>Picklist Item One</PicklistItem>
        <PicklistItem value='2'>Picklist Item Two</PicklistItem>
      </Picklist>
      <DateInput label='Date Input Label' />
      <Lookup label='Lookup Label' data={ LOOKUP_DATA } />
    </Form>
  )))
  .add('Inline Form', withInfo('Inline Form')(() => (
    <Form type='inline' onSubmit={ action('submit') }>
      <Input label='Name' />
      <Input label='Email' />
      <Button type='brand'>Submit</Button>
    </Form>
  )))
  .add('Compound Form', withInfo('Stacked Form')(() => (
    <Form type='compound' onSubmit={ action('submit') }>
      <FieldSet label='Name'>
        <Row>
          <Input label='First Name' type='text' placeholder='Input first name here' />
          <Input label='Last Name' type='text' placeholder='Input last name here' />
        </Row>
      </FieldSet>
      <FieldSet label='Address'>
        <Row>
          <Textarea label='Street' rows='2' placeholder='Input street here' />
        </Row>
        <Row>
          <Input label='City' size='40' placeholder='Input city here' />
        </Row>
        <Row>
          <Select label='State' defaultValue={ 1 }>
            <Option value='CA'>California</Option>
            <Option value='OR'>Oregon</Option>
            <Option value='WA'>Washington</Option>
          </Select>
          <Input label='Postal Code' type='number' placeholder='00000' />
          <Select label='Country' defaultValue={ 1 }>
            <Option value='us'>United States</Option>
            <Option value='ca'>Canada</Option>
            <Option value='other' disabled >Others</Option>
          </Select>
        </Row>
        <Row>
          <Picklist label='Lead Source' menuSize='large'>
            <PicklistItem value={ 1 } label='Web' />
            <PicklistItem value={ 2 } >E-mail</PicklistItem>
            <PicklistItem value={ 3 } disabled >Webinar</PicklistItem>
            <PicklistItem value={ 4 }>Phone</PicklistItem>
            <PicklistItem value={ 5 }>Event</PicklistItem>
          </Picklist>
          <DateInput label='Contact Date' placeholder='YYYY/MM/DD' dateFormat='YYYY/MM/DD' />
        </Row>
        <Row cols={ 4 }>
          <Lookup label='Related Type' data={ LOOKUP_DATA } cols={ 3 } />
        </Row>
      </FieldSet>
      <FieldSet label='Other'>
        <Row>
          <RadioGroup label='Gender' name='gender'>
            <Radio label='Male' value={ 1 } />
            <Radio label='Female' value={ 2 } />
            <Radio label='Other' value={ 3 } />
          </RadioGroup>
          <CheckboxGroup label='Lead Source' name='leadSource'>
            <Checkbox label='Web' value={ 1 } />
            <Checkbox label='Email' value={ 2 } />
            <Checkbox label='Phone' value={ 3 } />
          </CheckboxGroup>
        </Row>
      </FieldSet>
    </Form>
  )))
;
