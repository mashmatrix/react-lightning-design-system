import React from 'react';
import { SalesPath } from '../src/scripts';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

/**
 *
 */
const meta: ComponentMeta<typeof SalesPath> = {
  title: 'SalesPath',
  component: SalesPath,
  subcomponents: { SalesPathItem: SalesPath.PathItem },
  argTypes: {
    onSelect: { action: 'select' },
  },
};
export default meta;

/**
 *
 */
export const ControlledWithKnobs: ComponentStoryObj<typeof SalesPath> = {
  render: (args) => (
    <SalesPath {...args}>
      <SalesPath.PathItem eventKey='1' title='Contacted' />
      <SalesPath.PathItem eventKey='2' title='Open' />
      <SalesPath.PathItem eventKey='3' title='Unqualified' />
      <SalesPath.PathItem eventKey='4' title='Nurturing' />
      <SalesPath.PathItem eventKey='5' title='Closed' />
    </SalesPath>
  ),
  name: 'Controlled with knobs',
  args: {
    activeKey: '1',
  },
  argTypes: {
    activeKey: {
      control: {
        type: 'select',
        options: ['1', '2', '3', '4', '5'],
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Sales Path controlled with knobs',
      },
    },
  },
};

/**
 *
 */
export const Default: ComponentStoryObj<typeof SalesPath> = {
  ...ControlledWithKnobs,
  name: 'Default',
  args: {
    activeKey: '3',
  },
  parameters: {
    docs: {
      description: {
        story: 'Sales Path',
      },
    },
  },
};
