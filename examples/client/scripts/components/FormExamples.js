import React from 'react';
import {
  Form, Input, Textarea, RadioGroup, Radio,
  CheckboxGroup, Checkbox
} from 'react-lightning-design-system';

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
              <Radio label='Radio #2' value={ 2 } checked />
              <Radio label='Radio #3' value={ 3 } disabled />
            </RadioGroup>
            <CheckboxGroup label='Checkbox Group #1' name='checkgroup1'>
              <Checkbox label='Check #1' value={ 1 } />
              <Checkbox label='Check #2' value={ 2 } checked />
              <Checkbox label='Check #3' value={ 3 } disabled />
            </CheckboxGroup>
          </Form>
        </div>
      </div>
    );
  }
}
