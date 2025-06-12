import React from 'react';
import { Select, Option } from '../src/scripts';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

/**
 *
 */
const meta: ComponentMeta<typeof Select> = {
  title: 'Select',
  component: Select,
  subcomponents: { Option },
  argTypes: {
    onChange: { action: 'change' },
    onValueChange: { action: 'valueChange' },
    onBlur: { action: 'blur' },
  },
};
export default meta;

/**
 *
 */
export const ControlledWithKnobs: ComponentStoryObj<typeof Select> = {
  render: (args) => (
    <Select {...args}>
      <Option label='Option One' value='1' />
      <Option label='Option Two' value='2' />
      <Option label='Option Three' value='3' />
    </Select>
  ),
  name: 'Controlled with knobs',
  args: {
    label: 'Select Label',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select controlled with knobs',
      },
    },
  },
};

/**
 *
 */
export const Default: ComponentStoryObj<typeof Select> = {
  ...ControlledWithKnobs,
  name: 'Default',
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default Select control',
      },
    },
  },
};

/**
 *
 */
export const Required: ComponentStoryObj<typeof Select> = {
  ...Default,
  name: 'Required',
  args: {
    label: 'Select Label',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Select control with required attribute',
      },
    },
  },
};

/**
 *
 */
export const Error: ComponentStoryObj<typeof Select> = {
  ...Default,
  name: 'Error',
  args: {
    label: 'Select Label',
    required: true,
    error: 'This field is required',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select control with error message',
      },
    },
  },
};

/**
 *
 */
export const Disabled: ComponentStoryObj<typeof Select> = {
  ...Default,
  name: 'Disabled',
  args: {
    label: 'Select Label',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Select control with disabled status',
      },
    },
  },
};

/**
 *
 */
export const MultipleDefault: ComponentStoryObj<typeof Select> = {
  ...Default,
  name: 'Multiple - Default',
  args: {
    label: 'Select Label',
    value: ['2', '3'],
    multiple: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple Select control',
      },
    },
  },
};

/**
 *
 */
export const MultipleRequired: ComponentStoryObj<typeof Select> = {
  ...Default,
  name: 'Multiple - Required',
  args: {
    label: 'Select Label',
    required: true,
    multiple: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple Select control with required attribute',
      },
    },
  },
};

/**
 *
 */
export const MultipleError: ComponentStoryObj<typeof Select> = {
  ...Default,
  name: 'Multiple - Error',
  args: {
    label: 'Select Label',
    required: true,
    error: 'This field is required',
    multiple: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple Select control with error message',
      },
    },
  },
};

/**
 *
 */
export const MultipleDisabled: ComponentStoryObj<typeof Select> = {
  ...Default,
  name: 'Multiple - Disabled',
  args: {
    label: 'Select Label',
    disabled: true,
    value: ['2', '3'],
    multiple: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple Select control with disabled status',
      },
    },
  },
};

/**
 *
 */
export const WithTooltip: ComponentStoryObj<typeof Select> = {
  ...Default,
  name: 'With tooltip',
  args: {
    label: 'Select Label',
    tooltip: 'Tooltip Text',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select control with tooltip',
      },
    },
  },
};
