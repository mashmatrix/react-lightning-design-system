import { Toggle } from '../src/scripts';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

/**
 *
 */
const meta: ComponentMeta<typeof Toggle> = {
  title: 'Toggle',
  component: Toggle,
  argTypes: {
    onChange: { action: 'change' },
  },
};
export default meta;

/**
 *
 */
export const ControlledWithKnobs: ComponentStoryObj<typeof Toggle> = {
  name: 'Controlled with knobs',
  args: {
    label: 'Toggle Label',
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle controlled with knobs',
      },
    },
  },
};

/**
 *
 */
export const Default: ComponentStoryObj<typeof Toggle> = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Toggle control',
      },
    },
  },
};

/**
 *
 */
export const Checked: ComponentStoryObj<typeof Toggle> = {
  args: {
    checked: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle control with checked status',
      },
    },
  },
};

/**
 *
 */
export const Disabled: ComponentStoryObj<typeof Toggle> = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle control with disabled status',
      },
    },
  },
};
