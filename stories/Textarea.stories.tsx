import { Textarea } from '../src/scripts';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

/**
 *
 */
const meta: ComponentMeta<typeof Textarea> = {
  title: 'Textarea',
  component: Textarea,
  argTypes: {
    onChange: { action: 'change' },
    onBlur: { action: 'blur' },
  },
};
export default meta;

/**
 *
 */
export const ControlledWithKnobs: ComponentStoryObj<typeof Textarea> = {
  name: 'Controlled with knobs',
  args: {
    label: 'Textarea Label',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea controlled with knobs',
      },
    },
  },
};

/**
 *
 */
export const Default: ComponentStoryObj<typeof Textarea> = {
  args: {
    label: 'Textarea Label',
    placeholder: 'Placeholder',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default Textarea control',
      },
    },
  },
};

/**
 *
 */
export const Required: ComponentStoryObj<typeof Textarea> = {
  args: {
    label: 'Textarea Label',
    placeholder: 'Placeholder',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea control with required attribute',
      },
    },
  },
};

/**
 *
 */
export const Error: ComponentStoryObj<typeof Textarea> = {
  args: {
    label: 'Textarea Label',
    placeholder: 'Placeholder',
    required: true,
    error: 'This field is required',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea control with error message',
      },
    },
  },
};

/**
 *
 */
export const Disabled: ComponentStoryObj<typeof Textarea> = {
  args: {
    label: 'Textarea Label',
    placeholder: 'Placeholder',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea control with disabled status',
      },
    },
  },
};

/**
 *
 */
export const ReadOnly: ComponentStoryObj<typeof Textarea> = {
  name: 'Read only',
  args: {
    label: 'Textarea Label',
    value: 'Read Only',
    readOnly: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea control with readOnly status',
      },
    },
  },
};
