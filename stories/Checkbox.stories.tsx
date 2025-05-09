import React, { ComponentProps } from 'react';
import { CheckboxGroup, Checkbox } from '../src/scripts';
import { Meta, StoryObj } from '@storybook/react';

/**
 *
 */
type StoryProps = ComponentProps<typeof CheckboxGroup> & {
  checkbox1: ComponentProps<typeof Checkbox>;
} & {
  checkbox2: ComponentProps<typeof Checkbox>;
};

/**
 *
 */
const meta: Meta<StoryProps> = {
  title: 'Checkbox',
  component: CheckboxGroup,
  argTypes: {
    onValueChange: { action: 'valueChange' },
  },
};
export default meta;

/**
 *
 */
export const ControlledWithKnobs: StoryObj<StoryProps> = {
  render: ({ checkbox1, checkbox2, ...args }) => (
    <CheckboxGroup {...args}>
      <Checkbox {...checkbox1} />
      <Checkbox {...checkbox2} />
    </CheckboxGroup>
  ),
  name: 'Controlled with knobs',
  args: {
    label: 'Checkbox Group Label',
    checkbox1: {
      label: 'Checkbox Label One',
      value: '1',
      disabled: false,
      checked: false,
    },
    checkbox2: {
      label: 'Checkbox Label Two',
      value: '2',
      disabled: false,
      checked: false,
    },
  },
  parameters: {
    docs: {
      storyDescription: 'Checkbox controlled with knobs',
    },
  },
};

/**
 *
 */
export const Default: StoryObj<StoryProps> = {
  render: ({ checkbox1, checkbox2, ...args }) => (
    <CheckboxGroup {...args}>
      <Checkbox {...checkbox1} />
      <Checkbox {...checkbox2} />
    </CheckboxGroup>
  ),
  args: {
    label: 'Checkbox Group Label',
    checkbox1: {
      label: 'Checkbox Label One',
      value: '1',
      checked: true,
    },
    checkbox2: {
      label: 'Checkbox Label Two',
      value: '2',
      checked: false,
    },
  },
  parameters: {
    docs: {
      storyDescription: 'Checkbox Textarea control',
    },
  },
};

/**
 *
 */
export const Required: StoryObj<StoryProps> = {
  render: ({ checkbox1, checkbox2, ...args }) => (
    <CheckboxGroup {...args}>
      <Checkbox {...checkbox1} />
      <Checkbox {...checkbox2} />
    </CheckboxGroup>
  ),
  args: {
    label: 'Checkbox Group Label',
    required: true,
    checkbox1: {
      label: 'Checkbox Label One',
      value: '1',
      checked: true,
    },
    checkbox2: {
      label: 'Checkbox Label Two',
      value: '2',
    },
  },
  parameters: {
    docs: {
      storyDescription: 'Checkbox control with required attribute',
    },
  },
};

/**
 *
 */
export const Error: StoryObj<StoryProps> = {
  render: ({ checkbox1, checkbox2, ...args }) => (
    <CheckboxGroup {...args}>
      <Checkbox {...checkbox1} />
      <Checkbox {...checkbox2} />
    </CheckboxGroup>
  ),
  args: {
    label: 'Checkbox Group Label',
    required: true,
    error: 'This field is required',
    checkbox1: {
      label: 'Checkbox Label One',
      value: '1',
      checked: true,
    },
    checkbox2: {
      label: 'Checkbox Label Two',
      value: '2',
    },
  },
  parameters: {
    docs: {
      storyDescription: 'Checkbox control with error message',
    },
  },
};

/**
 *
 */
export const Disabled: StoryObj<StoryProps> = {
  render: ({ checkbox1, checkbox2, ...args }) => (
    <CheckboxGroup {...args}>
      <Checkbox {...checkbox1} />
      <Checkbox {...checkbox2} />
    </CheckboxGroup>
  ),
  args: {
    label: 'Checkbox Group Label',
    checkbox1: {
      label: 'Checkbox Label One',
      value: '1',
      disabled: true,
    },
    checkbox2: {
      label: 'Checkbox Label Two',
      value: '2',
      disabled: true,
    },
  },
  parameters: {
    docs: {
      storyDescription: 'Checkbox control with disabled status',
    },
  },
};

/**
 *
 */
export const WithTooltip: StoryObj<StoryProps> = {
  render: ({ checkbox1, checkbox2, ...args }) => (
    <CheckboxGroup {...args}>
      <Checkbox {...checkbox1} />
      <Checkbox {...checkbox2} />
    </CheckboxGroup>
  ),
  name: 'With tooltip',
  args: {
    label: 'Checkbox Group Label',
    tooltip: 'Tooltip Text',
    checkbox1: {
      label: 'Checkbox Label One',
      value: '1',
    },
    checkbox2: {
      label: 'Checkbox Label Two',
      value: '2',
    },
  },
  parameters: {
    docs: {
      storyDescription: 'Checkbox group with tooltip',
    },
  },
};
