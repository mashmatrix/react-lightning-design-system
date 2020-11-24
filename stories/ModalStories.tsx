import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, select, boolean } from '@storybook/addon-knobs';
import {
  Modal,
  ModalSize,
  Button,
  Form,
  FieldSet,
  FieldSetRow as Row,
  Input,
  DateInput,
  Picklist,
  PicklistItem,
  Lookup,
} from '../src/scripts';

const { Header, Content, Footer } = Modal;

const LOOKUP_DATA = [
  { label: 'Account', value: '1', icon: 'standard:account' },
  { label: 'Contact', value: '2', icon: 'standard:contact' },
  { label: 'Opportunity', value: '3', icon: 'standard:opportunity' },
];

storiesOf('Modal', module)
  .add(
    'Controlled with knobs',
    () => {
      // NOTE: Converting empty string to undefined
      // because we can't assign undefined to options directly
      // ref. https://github.com/storybookjs/storybook/issues/4487
      const sizeOptions = {
        '(none)': '',
        large: 'large',
      };
      const size = (select('size', sizeOptions, '') || undefined) as ModalSize;
      return (
        <Modal
          opened={boolean('opened', true)}
          size={size}
          onHide={action('hide')}
        >
          {boolean('header', true) ? (
            <Header
              title={text('header title', '')}
              closeButton={boolean('header closeButton', false)}
            />
          ) : (
            []
          )}
          <Content>
            <div className='slds-p-around--small'>
              <p>
                Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
                ullamco deserunt aute id consequat veniam incididunt duis in
                sint irure nisi. Mollit officia cillum Lorem ullamco minim
                nostrud elit officia tempor esse quis. Cillum sunt ad dolore
                quis aute consequat ipsum magna exercitation reprehenderit
                magna. Tempor cupidatat consequat elit dolor adipisicing.
              </p>
              <p>
                Dolor eiusmod sunt ex incididunt cillum quis nostrud velit duis
                sit officia. Lorem aliqua enim laboris do dolor eiusmod officia.
                Mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                proident. Eiusmod et adipisicing culpa deserunt nostrud ad
                veniam nulla aute est. Labore esse esse cupidatat amet velit id
                elit consequat minim ullamco mollit enim excepteur ea.
              </p>
            </div>
          </Content>
          {boolean('footer', true) ? (
            <Footer directional={boolean('footer directional', false)}>
              <Button type='neutral' label='Cancel' />
              <Button type='brand' label='Done' />
            </Footer>
          ) : (
            []
          )}
        </Modal>
      );
    },
    {
      info: {
        text: 'Modal controlled with knobs',
        inline: false,
      },
    }
  )
  .add(
    'Default',
    () => (
      <Modal opened onHide={action('hide')}>
        <Header title='Default Modal' closeButton />
        <Content className='slds-p-around--small'>
          <p>
            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
            ullamco deserunt aute id consequat veniam incididunt duis in sint
            irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
            officia tempor esse quis. Cillum sunt ad dolore quis aute consequat
            ipsum magna exercitation reprehenderit magna. Tempor cupidatat
            consequat elit dolor adipisicing.
          </p>
          <p>
            Dolor eiusmod sunt ex incididunt cillum quis nostrud velit duis sit
            officia. Lorem aliqua enim laboris do dolor eiusmod officia. Mollit
            incididunt nisi consectetur esse laborum eiusmod pariatur proident.
            Eiusmod et adipisicing culpa deserunt nostrud ad veniam nulla aute
            est. Labore esse esse cupidatat amet velit id elit consequat minim
            ullamco mollit enim excepteur ea.
          </p>
        </Content>
        <Footer>
          <Button type='neutral' label='Cancel' />
          <Button type='brand' label='Done' />
        </Footer>
      </Modal>
    ),
    {
      info: {
        text: 'Default size modal dialog',
        inline: false,
      },
    }
  )
  .add(
    'Large',
    () => (
      <Modal opened size='large' onHide={action('hide')}>
        <Header title='Large Size Modal' closeButton />
        <Content className='slds-p-around--small'>
          <p>
            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
            ullamco deserunt aute id consequat veniam incididunt duis in sint
            irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
            officia tempor esse quis. Cillum sunt ad dolore quis aute consequat
            ipsum magna exercitation reprehenderit magna. Tempor cupidatat
            consequat elit dolor adipisicing.
          </p>
          <p>
            Dolor eiusmod sunt ex incididunt cillum quis nostrud velit duis sit
            officia. Lorem aliqua enim laboris do dolor eiusmod officia. Mollit
            incididunt nisi consectetur esse laborum eiusmod pariatur proident.
            Eiusmod et adipisicing culpa deserunt nostrud ad veniam nulla aute
            est. Labore esse esse cupidatat amet velit id elit consequat minim
            ullamco mollit enim excepteur ea.
          </p>
        </Content>
        <Footer>
          <Button type='neutral' label='Cancel' />
          <Button type='brand' label='Done' />
        </Footer>
      </Modal>
    ),
    {
      info: {
        text: 'Large size modal dialog',
        inline: false,
      },
    }
  )
  .add(
    'With tagline',
    () => (
      <Modal opened onHide={action('hide')}>
        <Header
          title='Modal with tagline'
          tagline='This is a tagline'
          closeButton
        />
        <Content className='slds-p-around--small'>
          <p>
            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
            ullamco deserunt aute id consequat veniam incididunt duis in sint
            irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
            officia tempor esse quis. Cillum sunt ad dolore quis aute consequat
            ipsum magna exercitation reprehenderit magna. Tempor cupidatat
            consequat elit dolor adipisicing.
          </p>
          <p>
            Dolor eiusmod sunt ex incididunt cillum quis nostrud velit duis sit
            officia. Lorem aliqua enim laboris do dolor eiusmod officia. Mollit
            incididunt nisi consectetur esse laborum eiusmod pariatur proident.
            Eiusmod et adipisicing culpa deserunt nostrud ad veniam nulla aute
            est. Labore esse esse cupidatat amet velit id elit consequat minim
            ullamco mollit enim excepteur ea.
          </p>
        </Content>
        <Footer>
          <Button type='neutral' label='Cancel' />
          <Button type='brand' label='Done' />
        </Footer>
      </Modal>
    ),
    {
      info: {
        text: 'Modal dialog with tagline',
        inline: false,
      },
    }
  )
  .add(
    'Footer directional',
    () => (
      <Modal opened onHide={action('hide')}>
        <Header title='Modal with directional footer' closeButton />
        <Content className='slds-p-around--small'>
          <p>
            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
            ullamco deserunt aute id consequat veniam incididunt duis in sint
            irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
            officia tempor esse quis. Cillum sunt ad dolore quis aute consequat
            ipsum magna exercitation reprehenderit magna. Tempor cupidatat
            consequat elit dolor adipisicing.
          </p>
          <p>
            Dolor eiusmod sunt ex incididunt cillum quis nostrud velit duis sit
            officia. Lorem aliqua enim laboris do dolor eiusmod officia. Mollit
            incididunt nisi consectetur esse laborum eiusmod pariatur proident.
            Eiusmod et adipisicing culpa deserunt nostrud ad veniam nulla aute
            est. Labore esse esse cupidatat amet velit id elit consequat minim
            ullamco mollit enim excepteur ea.
          </p>
        </Content>
        <Footer directional>
          <Button type='neutral' label='Cancel' />
          <Button type='brand' label='Done' />
        </Footer>
      </Modal>
    ),
    {
      info: {
        text: 'Modal dialog with directional footer',
        inline: false,
      },
    }
  )
  .add(
    'Form elements',
    () => (
      <Modal opened onHide={action('hide')}>
        <Header title='Modal Form' closeButton />
        <Content className='slds-p-around--small'>
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
                {new Array(10)
                  .join('_')
                  .split('')
                  .map((a, i) => (
                    <PicklistItem
                      value={i + 1}
                      label={`Item #${i + 1}`}
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                    />
                  ))}
              </Picklist>
              <Lookup label='Lookup' data={LOOKUP_DATA} />
            </Row>
          </Form>
        </Content>
        <Footer>
          <Button type='neutral' label='Cancel' />
          <Button type='brand' label='Done' />
        </Footer>
      </Modal>
    ),
    {
      info: {
        text: 'Modal with form elements in the content',
        inline: false,
      },
    }
  );
