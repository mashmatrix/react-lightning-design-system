import React, { Component } from 'react';

import {
  Modal,
  Form,
  Input,
  DateInput,
  Picklist,
  PicklistItem,
  FieldSet,
  Button,
  Lookup,
} from 'react-lightning-design-system';

const { Row } = FieldSet;
const { Header, Content, Footer } = Modal;

const LOOKUP_DATA = [
  { label: 'Account', value: '1', icon: 'standard:account' },
  { label: 'Contact', value: '2', icon: 'standard:contact' },
  { label: 'Opportunity', value: '3', icon: 'standard:opportunity' },
];

export default class ModalExamples extends Component {
  constructor() {
    super();
    this.state = {
      modal1: { opened: false },
      modal2: { opened: false },
      modal3: { opened: false },
    };
  }

  showModal(name) {
    this.setState({
      [name]: { ...this.state[name], opened: true },
    });
  }

  hideModal(name) {
    this.setState({
      [name]: { ...this.state[name], opened: false },
    });
  }

  render() {
    /* eslint-disable max-len, react/jsx-first-prop-new-line */
    const styles = { padding: '12px' };
    const hideModal1 = this.hideModal.bind(this, 'modal1');
    const hideModal2 = this.hideModal.bind(this, 'modal2');
    const hideModal3 = this.hideModal.bind(this, 'modal3');
    return (
      <div>
        <h2 className='slds-m-vertical--medium'>Modal</h2>
        <div style={ styles }>
          <Button type='neutral' onClick={ this.showModal.bind(this, 'modal1') }>Show Modal #1</Button>
          <Modal
            opened={ this.state.modal1.opened }
            onHide={ hideModal1 }
          >
            <Header title='Modal #1' closeButton />
            <Content style={ { padding: '1em' } }>
              <div>
                <p>
                  Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis. Cillum sunt ad dolore
                  quis aute consequat ipsum magna exercitation reprehenderit magna. Tempor cupidatat consequat elit dolor adipisicing.
                </p>
                <p>
                  Dolor eiusmod sunt ex incididunt cillum quis nostrud velit duis sit officia. Lorem aliqua enim laboris do dolor eiusmod officia. Mollit incididunt nisi consectetur esse laborum eiusmod pariatur proident. Eiusmod et adipisicing culpa deserunt
                  nostrud ad veniam nulla aute est. Labore esse esse cupidatat amet velit id elit consequat minim ullamco mollit enim excepteur ea.
                </p>
              </div>
            </Content>
            <Footer>
              <Button type='neutral' label='Cancel' onClick={ hideModal1 } />
              <Button type='brand' label='Done' onClick={ hideModal1 } />
            </Footer>
          </Modal>
        </div>
        <div style={ styles }>
          <Button type='neutral' onClick={ this.showModal.bind(this, 'modal2') }>Show Modal #2</Button>
          <Modal
            opened={ this.state.modal2.opened }
            size='large'
            onHide={ hideModal2 }
          >
            <Header title='Modal #2' closeButton />
            <Content style={ { padding: '1em' } }>
              <div>
                <p>
                  Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis. Cillum sunt ad dolore
                  quis aute consequat ipsum magna exercitation reprehenderit magna. Tempor cupidatat consequat elit dolor adipisicing.
                </p>
                <p>
                  Dolor eiusmod sunt ex incididunt cillum quis nostrud velit duis sit officia. Lorem aliqua enim laboris do dolor eiusmod officia. Mollit incididunt nisi consectetur esse laborum eiusmod pariatur proident. Eiusmod et adipisicing culpa deserunt
                  nostrud ad veniam nulla aute est. Labore esse esse cupidatat amet velit id elit consequat minim ullamco mollit enim excepteur ea.
                </p>
              </div>
            </Content>
            <Footer directional>
              <Button type='neutral' label='Cancel' onClick={ hideModal2 } />
              <Button type='brand' label='Done' onClick={ hideModal2 } />
            </Footer>
          </Modal>
        </div>
        <div style={ styles }>
          <Button type='neutral' onClick={ this.showModal.bind(this, 'modal3') }>Show Modal #3 (Form)</Button>
          <Modal
            opened={ this.state.modal3.opened }
            onHide={ hideModal3 }
            size='large'
          >
            <Header title='Modal #3' closeButton />
            <Content style={ { padding: '1em' } }>
              <Form type='compound'>
                <FieldSet label='Name'>
                  <Row>
                    <Input label='First Name' placeholder='First Name' />
                    <Input label='Last Name' placeholder='Last Name' />
                  </Row>
                </FieldSet>
                <FieldSet label='Date Range'>
                  <Row>
                    <DateInput label='Start' />
                    <DateInput label='End' />
                  </Row>
                </FieldSet>
                <Row>
                  <DateInput label='Closing Date' />
                </Row>
                <Row>
                  <Picklist label='Picklist #1' menuSize='medium'>
                    {
                      new Array(10).join('_').split('')
                        .map((a, i) => (
                          <PicklistItem value={ i + 1 } label={ `Item #${(i + 1)}` } key={ i } />
                        ))
                    }
                  </Picklist>
                  <Lookup label='Lookup' data={ LOOKUP_DATA } />
                </Row>
              </Form>
            </Content>
            <Footer directional>
              <Button type='neutral' label='Cancel' onClick={ hideModal3 } />
              <Button type='brand' label='Done' onClick={ hideModal3 } />
            </Footer>
          </Modal>
        </div>
      </div>
    );
  }
}
