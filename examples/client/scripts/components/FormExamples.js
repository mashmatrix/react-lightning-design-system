import React from 'react';
import {
  Button, Form, Input, Textarea, RadioGroup, Radio,
  CheckboxGroup, Checkbox, Select, Option,
  FieldSet
} from 'react-lightning-design-system';

const Row = FieldSet.Row;

export default class FormExamples extends React.Component {
  render() {
    const styles = { padding: '12px' };
    const headingClass = 'slds-p-top--large';
    return (
      <div>
        <h2 className={ headingClass }>Form Stacked</h2>
        <div style={ styles }>
          <Form>
            <Input label='Text Field #1' type='text' placeholder='Input text here' />
            <Input label='Number Field #1' type='number' placeholder='Input number here' />
            <Textarea label='Textarea #1' defaultValue='Default Text' placeholder='Input text here' />
            <RadioGroup label='Radio Group #1' name='radiogroup1'>
              <Radio label='Radio #1' value={ 1 } />
              <Radio label='Radio #2' value={ 2 } defaultChecked />
              <Radio label='Radio #3' value={ 3 } disabled />
            </RadioGroup>
            <CheckboxGroup label='Checkbox Group #1' name='checkgroup1'>
              <Checkbox label='Check #1' value={ 1 } />
              <Checkbox label='Check #2' value={ 2 } defaultChecked />
              <Checkbox label='Check #3' value={ 3 } disabled />
            </CheckboxGroup>
            <Select label='Select #1' value={ 2 }>
              <Option value={ 1 } label='Option #1' />
              <Option value={ 2 } >Option #2</Option>
              <Option value={ 3 } disabled >Option #3</Option>
            </Select>
          </Form>
        </div>
        <h2 className={ headingClass }>Form Horizontal</h2>
        <div style={ styles }>
          <Form type='horizontal'>
            <Input label='Text Field #1' type='text' placeholder='Input text here' />
            <Input label='Number Field #1' type='number' placeholder='Input number here' />
            <Textarea label='Textarea #1' defaultValue='Default Text' placeholder='Input text here' />
            <RadioGroup label='Radio Group #1' name='radiogroup1'>
              <Radio label='Radio #1' value={ 1 } />
              <Radio label='Radio #2' value={ 2 } defaultChecked />
              <Radio label='Radio #3' value={ 3 } disabled />
            </RadioGroup>
            <CheckboxGroup label='Checkbox Group #1' name='checkgroup1'>
              <Checkbox label='Check #1' value={ 1 } />
              <Checkbox label='Check #2' value={ 2 } defaultChecked />
              <Checkbox label='Check #3' value={ 3 } disabled />
            </CheckboxGroup>
            <Select label='Select #1' defaultValue={ 2 }>
              <Option value={ 1 } label='Option #1' />
              <Option value={ 2 } >Option #2</Option>
              <Option value={ 3 } disabled >Option #3</Option>
            </Select>
          </Form>
        </div>
        <h2 className={ headingClass }>Form Inline</h2>
        <div style={ styles }>
          <Form type='inline'>
            <Input label='Text Field #1' type='text' placeholder='Input text here' />
            <Input label='Number Field #1' type='number' placeholder='Input number here' />
            <Button type='brand'>Submit</Button>
          </Form>
        </div>
        <h2 className={ headingClass }>Form Compound</h2>
        <div style={ styles }>
          <Form>
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
        </div>
      </div>
    );
  }
}
