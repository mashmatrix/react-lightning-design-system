import React, { ComponentProps } from 'react';
import {
  Modal,
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
import { Meta, StoryObj } from '@storybook/react';

/**
 *
 */
const {
  Header: ModalHeader,
  Content: ModalContent,
  Footer: ModalFooter,
} = Modal;

type StoryProps = ComponentProps<typeof Modal> & {
  childProps: {
    header?: ComponentProps<typeof ModalHeader>;
    content?: ComponentProps<typeof ModalContent>;
    footer?: ComponentProps<typeof ModalFooter>;
  };
};

/**
 *
 */
const LOOKUP_DATA = [
  {
    label: 'Account',
    value: '1',
    icon: 'standard:account',
  },
  {
    label: 'Contact',
    value: '2',
    icon: 'standard:contact',
  },
  {
    label: 'Opportunity',
    value: '3',
    icon: 'standard:opportunity',
  },
];

const modalContent = (
  <>
    <p>
      Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco
      deserunt aute id consequat veniam incididunt duis in sint irure nisi.
      Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse
      quis. Cillum sunt ad dolore quis aute consequat ipsum magna exercitation
      reprehenderit magna. Tempor cupidatat consequat elit dolor adipisicing.
    </p>
    <p>
      Dolor eiusmod sunt ex incididunt cillum quis nostrud velit duis sit
      officia. Lorem aliqua enim laboris do dolor eiusmod officia. Mollit
      incididunt nisi consectetur esse laborum eiusmod pariatur proident.
      Eiusmod et adipisicing culpa deserunt nostrud ad veniam nulla aute est.
      Labore esse esse cupidatat amet velit id elit consequat minim ullamco
      mollit enim excepteur ea.
    </p>
  </>
);

const footerButtons = (
  <>
    <Button type='neutral' label='Cancel' />
    <Button type='brand' label='Done' />
  </>
);

/**
 *
 */
const meta: Meta<StoryProps> = {
  title: 'Modal',
  component: Modal,
  subcomponents: { ModalHeader, ModalContent, ModalFooter },
  argTypes: {
    onHide: { action: 'hide' },
  },
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 600,
    },
  },
};
export default meta;

/**
 *
 */
export const ControlledWithKnobs: StoryObj<StoryProps> = {
  render: ({ childProps: { header, footer, content }, ...args }) => {
    return (
      <Modal {...args}>
        {header ? <ModalHeader {...header} /> : []}
        <ModalContent {...content} />
        {footer ? <ModalFooter {...footer} /> : []}
      </Modal>
    );
  },
  name: 'Controlled with knobs',
  args: {
    opened: true,
    childProps: {
      header: {},
      content: {
        className: 'slds-var-p-around_small',
        children: modalContent,
      },
      footer: {
        children: footerButtons,
      },
    },
  },
  parameters: {
    docs: {
      storyDescription: 'Modal controlled with knobs',
    },
    screenshot: {
      delay: 500,
    },
  },
};

/**
 *
 */
export const Default: StoryObj<StoryProps> = {
  ...ControlledWithKnobs,
  name: 'Default',
  args: {
    opened: true,
    closeButton: true,
    childProps: {
      header: {
        title: 'Default Modal',
      },
      content: {
        className: 'slds-var-p-around_small',
        children: modalContent,
      },
      footer: {
        children: footerButtons,
      },
    },
  },
  parameters: {
    docs: {
      storyDescription: 'Default size modal dialog',
    },
  },
};

/**
 *
 */
export const Large: StoryObj<StoryProps> = {
  ...Default,
  name: 'Large',
  args: {
    opened: true,
    closeButton: true,
    size: 'large',
    childProps: {
      header: {
        title: 'Large Size Modal',
      },
      content: {
        className: 'slds-var-p-around_small',
        children: modalContent,
      },
      footer: {
        children: footerButtons,
      },
    },
  },
  parameters: {
    docs: {
      storyDescription: 'Large size modal dialog',
    },
  },
};

/**
 *
 */
export const WithTagline: StoryObj<StoryProps> = {
  ...Default,
  name: 'With tagline',
  args: {
    opened: true,
    closeButton: true,
    childProps: {
      header: {
        title: 'Modal with tagline',
        tagline: 'This is a tagline',
      },
      content: {
        className: 'slds-var-p-around_small',
        children: modalContent,
      },
      footer: {
        children: footerButtons,
      },
    },
  },
  parameters: {
    docs: {
      storyDescription: 'Modal dialog with tagline',
    },
  },
};

/**
 *
 */
export const FooterDirectional: StoryObj<StoryProps> = {
  ...Default,
  name: 'Footer directional',
  args: {
    opened: true,
    closeButton: true,
    childProps: {
      header: {
        title: 'Modal with directional footer',
      },
      content: {
        className: 'slds-var-p-around_small',
        children: modalContent,
      },
      footer: {
        directional: true,
        children: footerButtons,
      },
    },
  },
  parameters: {
    docs: {
      storyDescription: 'Modal dialog with directional footer',
    },
  },
};

/**
 *
 */
export const FormElements: StoryObj<StoryProps> = {
  ...Default,
  name: 'Form elements',
  args: {
    opened: true,
    closeButton: true,
    childProps: {
      header: {
        title: 'Modal Form',
      },
      content: {
        className: 'slds-var-p-around_small',
        children: (
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
                      key={i}
                    />
                  ))}
              </Picklist>
              <Lookup label='Lookup' data={LOOKUP_DATA} />
            </Row>
          </Form>
        ),
      },
      footer: {
        children: footerButtons,
      },
    },
  },
  parameters: {
    docs: {
      storyDescription: 'Modal with form elements in the content',
    },
  },
};
