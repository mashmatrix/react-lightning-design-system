import React from 'react';
import { Pill } from '../src/scripts';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

/**
 *
 */
const meta: ComponentMeta<typeof Pill> = {
  title: 'Pill',
  component: Pill,
  argTypes: {
    onClick: { action: 'click' },
    onRemove: { action: 'remove' },
  },
};
export default meta;

/**
 *
 */
export const ControlledWithKnobs: ComponentStoryObj<typeof Pill> = {
  name: 'Controlled with knobs',
  args: {
    label: 'Pill Label',
    title: 'Full Label of the Pill',
  },
  parameters: {
    info: 'Pill controlled with knobs',
  },
};

/**
 *
 */
export const WithIcon: ComponentStoryObj<typeof Pill> = {
  name: 'with icon',
  args: {
    label: 'Pill Label',
    icon: {
      category: 'standard',
      icon: 'account',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Pill with icon',
      },
    },
  },
};

/**
 *
 */
export const Disabled: ComponentStoryObj<typeof Pill> = {
  name: 'disabled',
  args: {
    label: 'Pill Label',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Pill with disabled status',
      },
    },
  },
};

/**
 *
 */
export const Truncate: ComponentStoryObj<typeof Pill> = {
  name: 'truncate',
  args: {
    label: 'Pill Label that is longer than the area that contains it',
    truncate: true,
  },
  decorators: [
    (story) => (
      <div style={{ width: 200 }}>
        <div className='slds-pill_container'>{story()}</div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Pill with truncated label',
      },
    },
  },
};
