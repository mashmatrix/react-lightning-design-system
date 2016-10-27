import React, { Component } from 'react';
import {
  Form, Input,
  Checkbox,
  Icon,
} from 'react-lightning-design-system';

export default class FormExamples extends Component {
  constructor() {
    super();
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
    this.setState({ [name]: value });
  }

  render() {
    const styles = { padding: '12px' };
    const required = this.state.isRequired;
    const error = this.state.hasError && 'The input has an error';
    /* eslint-disable max-len, react/jsx-first-prop-new-line */
    return (
      <div>
        <h2 className='slds-m-vertical--medium'>Inputs</h2>
        <div style={ styles }>
          <Checkbox label='Required ?' checked={ this.state.isRequired } onClick={ () => this.setState({ isRequired: !this.state.isRequired }) } />
          <Checkbox label='Error ?' checked={ this.state.hasError } onClick={ () => this.setState({ hasError: !this.state.hasError }) } />
        </div>
        <h2 className='slds-m-vertical--medium'>Input</h2>
        <div style={ styles }>
          <Form>
            <Input
              label='Input default'
              type='text'
              placeholder='Input text here'
              required={ required }
              error={ error }
            />
            <Input
              label='Input with icon'
              type='text'
              placeholder='Input text here'
              required={ required }
              error={ error }
              iconAlign='left'
              icon={
                <Icon
                  icon='search'
                  className='slds-input__icon'
                />
              }
            />
            <Input
              label='Input with icon right'
              type='text'
              placeholder='Input text here'
              required={ required }
              error={ error }
              iconAlign='right'
              icon={{ icon: 'search' }}
            />
            <Input
              label='Input read only'
              readOnly
              value={'Read Only'}
            />
            <Input
              label='Input with addons'
              type='text'
              placeholder='Input text here'
              required={ required }
              error={ error }
              addonLeft='$'
              addonRight='%'
            />
            <Input
              label='Input read only with addons'
              readOnly
              value={'Read Only'}
              addonLeft='$'
              addonRight='%'
            />
          </Form>
        </div>
      </div>
    );
  }
}
