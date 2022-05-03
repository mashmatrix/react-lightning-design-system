import React, { ComponentProps } from 'react';
import { RadioGroup, Radio } from '../src/scripts';
import { Meta, StoryObj } from '@storybook/react';

/**
 *
 */
type StoryProps = ComponentProps<typeof RadioGroup> & {
  radiogroup1?: ComponentProps<typeof RadioGroup>;
  radiogroup2?: ComponentProps<typeof RadioGroup>;
  radio1?: ComponentProps<typeof Radio>;
  radio2?: ComponentProps<typeof Radio>;
};

/**
 *
 */
const meta: Meta<StoryProps> = {
  title: 'Radio',
  component: RadioGroup,
  subcomponents: { Radio },
  argTypes: {
    onChange: { action: 'change' },
  },
};
export default meta;

/**
 *
 */
export const ControlledWithKnobs: StoryObj<StoryProps> = {
  render: ({ radio1, radio2, ...args }) => (
    <RadioGroup {...args}>
      <Radio {...radio1} />
      <Radio {...radio2} />
    </RadioGroup>
  ),
  name: 'Controlled with knobs',
  args: {
    radio1: {
      label: 'Radio Label One',
      value: '1',
    },
    radio2: {
      label: 'Radio Label Two',
      value: '2',
    },
    label: 'Radio Group Label',
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio Group controlled with knobs',
      },
    },
  },
};

/**
 *
 */
export const Default: StoryObj<StoryProps> = {
  render: (args) => (
    <RadioGroup {...args}>
      <Radio label='Radio Label One' value='1' checked />
      <Radio label='Radio Label Two' value='2' />
    </RadioGroup>
  ),
  args: {
    label: 'Radio Group Label',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default Radio Group control',
      },
    },
  },
};

/**
 *
 */
export const Required: StoryObj<StoryProps> = {
  ...Default,
  args: {
    label: 'Radio Group Label',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio Group control with required attribute',
      },
    },
  },
};

/**
 *
 */
export const Error: StoryObj<StoryProps> = {
  ...Default,
  args: {
    label: 'Radio Group Label',
    required: true,
    error: 'This field is required',
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio Group control with error message',
      },
    },
  },
};

/**
 *
 */
export const Disabled: StoryObj<StoryProps> = {
  render: (args) => (
    <RadioGroup {...args}>
      <Radio label='Radio Label One' value='1' disabled />
      <Radio label='Radio Label Two' value='2' disabled />
    </RadioGroup>
  ),
  args: {
    label: 'Radio Group Label',
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio Group control with disabled status',
      },
    },
  },
};

/**
 *
 */
export const ColsTotalCols: StoryObj<StoryProps> = {
  render: ({ radiogroup1, radiogroup2 }) => (
    <>
      <RadioGroup {...radiogroup1}>
        <Radio label='Radio Label One' value='1' checked />
        <Radio label='Radio Label Two' value='2' />
      </RadioGroup>
      <RadioGroup {...radiogroup2}>
        <Radio label='Radio Label One' value='1' checked />
        <Radio label='Radio Label Two' value='2' />
      </RadioGroup>
    </>
  ),
  name: 'Cols & totalCols',
  args: {
    radiogroup1: {
      totalCols: 3,
      cols: 2,
      label: 'Radio Group Label 1',
    },
    radiogroup2: {
      totalCols: 3,
      cols: 1,
      label: 'Radio Group Label 2',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio Group control with `cols` and `totalCols`',
      },
    },
  },
};
