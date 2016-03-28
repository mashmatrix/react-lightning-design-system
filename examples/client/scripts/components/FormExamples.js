import React from 'react';
import {
  Button, Form, Input, Textarea, RadioGroup, Radio,
  CheckboxGroup, Checkbox, Select, Option,
  Picklist, PicklistItem,
  DateInput,
  FieldSet,
} from 'react-lightning-design-system';

const Row = FieldSet.Row;

export default class FormExamples extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      number: '',
      textarea: '',
      radiogroup: '',
      checkgroup: [],
      select: 2,
      picklist: 2,
      dateinput: '2015-12-24',
    };
  }

  onFieldChange(name, e, value) {
    console.log(name, value);
    this.setState({
      [name]: value,
      [`${name}Error`]:
        (!value || value.length === 0 || String(value) === '2' ?
         `${name} has an error in input` :
         undefined),
    });
  }

  render() {
    const styles = { padding: '12px' };
    return (
      <div>
        <h2 className='slds-m-vertical--medium'>Form Stacked</h2>
        <div style={ styles }>
          <Form>
            <Input label='Text Field #1' type='text' placeholder='Input text here' required />
            <Input label='Number Field #1' type='number' placeholder='Input number here' required />
            <Textarea label='Textarea #1' defaultValue='Default Text' placeholder='Input text here' required />
            <RadioGroup label='Radio Group #1' name='radiogroup1' required>
              <Radio label='Radio #1' value={ 1 } />
              <Radio label='Radio #2' value={ 2 } defaultChecked />
              <Radio label='Radio #3' value={ 3 } disabled />
            </RadioGroup>
            <CheckboxGroup label='Checkbox Group #1' name='checkgroup1' required>
              <Checkbox label='Check #1' value={ 1 } />
              <Checkbox label='Check #2' value={ 2 } defaultChecked />
              <Checkbox label='Check #3' value={ 3 } disabled />
            </CheckboxGroup>
            <Select label='Select #1' defaultValue={ 2 } required>
              <Option value={ 1 } label='Option #1' />
              <Option value={ 2 } >Option #2</Option>
              <Option value={ 3 } disabled >Option #3</Option>
            </Select>
            <Picklist label='Picklist #1' menuSize='large' required>
              <PicklistItem value={ 1 } label='Item #1' />
              <PicklistItem value={ 2 } >Item #2</PicklistItem>
              <PicklistItem value={ 3 } disabled >Item #3</PicklistItem>
              <PicklistItem value={ 4 }>Item #4</PicklistItem>
              <PicklistItem value={ 5 }>Item #5</PicklistItem>
            </Picklist>
            <DateInput label='DateInput #1' defaultValue='2015-12-24' defaultOpened={false} required />
          </Form>
        </div>

        <h2 className='slds-m-vertical--medium'>Form Horizontal</h2>
        <div style={ styles }>
          <Form type='horizontal'>
            <Input label='Text Field #1' value={ this.state.text } type='text' placeholder='Input text here'
              onChange={ this.onFieldChange.bind(this, 'text') }
              required error={ this.state.textError }
            />
            <Input label='Number Field #1' value={ this.state.number } type='number' placeholder='Input number here'
              onChange={ this.onFieldChange.bind(this, 'number') }
              required error={ this.state.numberError }
            />
            <Textarea label='Textarea #1' value={ this.state.textarea } placeholder='Input text here'
              onChange={ this.onFieldChange.bind(this, 'textarea') }
              required error={ this.state.textareaError }
            />
            <RadioGroup label='Radio Group #1' name='radiogroup1'
              onChange={ this.onFieldChange.bind(this, 'radiogroup') }
              required error={ this.state.radiogroupError }
            >
              <Radio label='Radio #1' value={ 1 } checked={ this.state.radiogroup === 1 } />
              <Radio label='Radio #2' value={ 2 } checked={ this.state.radiogroup === 2 } />
              <Radio label='Radio #3' value={ 3 } disabled />
            </RadioGroup>
            <CheckboxGroup label='Checkbox Group #1' name='checkgroup1'
              onChange={ this.onFieldChange.bind(this, 'checkgroup') }
              required error={ this.state.checkgroupError }
            >
              <Checkbox label='Check #1' value={ 1 } checked={ this.state.checkgroup.indexOf(1) >= 0 } />
              <Checkbox label='Check #2' value={ 2 } checked={ this.state.checkgroup.indexOf(2) >= 0 } />
              <Checkbox label='Check #3' value={ 3 } disabled />
            </CheckboxGroup>
            <Select label='Select #1' value={ this.state.select }
              onChange={ this.onFieldChange.bind(this, 'select') }
              required error={ this.state.selectError }
            >
              <Option value={ 1 } label='Option #1' />
              <Option value={ 2 } >Option #2</Option>
              <Option value={ 3 } disabled >Option #3</Option>
            </Select>
            <Picklist label='Picklist #1' menuSize='small' value={ this.state.picklist }
              onValueChange={ (value) => this.onFieldChange('picklist', {}, value) }
              required error={ this.state.picklistError }
            >
              { new Array(10).join('_').split('').map((a, i) => {
                return <PicklistItem key={ i + 1 } value={ i + 1 } label={ 'Item #' + (i + 1) } disabled={ i % 3 === 0 } />;
              })}
            </Picklist>
            <DateInput label='DateInput #1' value={ this.state.dateinput }
              onValueChange={ (value) => this.onFieldChange('dateinput', {}, value) }
              required error={ this.state.dateinputError }
            />
          </Form>
        </div>

        <h2 className='slds-m-vertical--medium'>Form Inline</h2>
        <div style={ styles }>
          <Form type='inline'>
            <Input label='Text Field #1' type='text' placeholder='Input text here' />
            <Input label='Number Field #1' type='number' placeholder='Input number here' />
            <Button type='brand'>Submit</Button>
          </Form>
        </div>

        <h2 className='slds-m-vertical--medium'>Form Combound</h2>
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
