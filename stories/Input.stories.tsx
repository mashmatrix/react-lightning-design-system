import { Input } from '../src/scripts';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

/**
 *
 */
const meta: ComponentMeta<typeof Input> = {
  title: 'Input',
  component: Input,
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
export const ControlledWithKnobs: ComponentStoryObj<typeof Input> = {
  name: 'Controlled with knobs',
  args: {
    label: 'Input Label',
  },
  parameters: {
    docs: {
      storyDescription: 'Input controlled with knobs',
    },
  },
};

/**
 *
 */
export const Default: ComponentStoryObj<typeof Input> = {
  args: {
    label: 'Input Label',
    placeholder: 'Placeholder Text',
  },
  parameters: {
    docs: {
      storyDescription: 'Default Input control',
    },
  },
};

/**
 *
 */
export const WithIconToTheLeft: ComponentStoryObj<typeof Input> = {
  name: 'With icon to the left',
  args: {
    label: 'Input Label',
    placeholder: 'Placeholder Text',
    iconLeft: 'search',
  },
  parameters: {
    docs: {
      storyDescription: 'Input control with icon to the left',
    },
  },
};

/**
 *
 */
export const WithIconToTheRight: ComponentStoryObj<typeof Input> = {
  name: 'With icon to the right',
  args: {
    label: 'Input Label',
    placeholder: 'Placeholder Text',
    iconRight: 'search',
  },
  parameters: {
    docs: {
      storyDescription: 'Input control with icon to the right',
    },
  },
};

/**
 *
 */
export const WithIconToTheLeftRight: ComponentStoryObj<typeof Input> = {
  name: 'With icon to the left & right',
  args: {
    label: 'Input Label',
    placeholder: 'Placeholder Text',
    iconLeft: 'search',
    iconRight: 'clear',
  },
  parameters: {
    docs: {
      storyDescription: 'Input control with icon to the left and right',
    },
  },
};

/**
 *
 */
export const Required: ComponentStoryObj<typeof Input> = {
  args: {
    label: 'Input Label',
    placeholder: 'Placeholder Text',
    required: true,
  },
  parameters: {
    docs: {
      storyDescription: 'Input control with required attribute',
    },
  },
};

/**
 *
 */
export const Error: ComponentStoryObj<typeof Input> = {
  args: {
    label: 'Input Label',
    placeholder: 'Placeholder Text',
    required: true,
    error: 'This field is required',
  },
  parameters: {
    docs: {
      storyDescription: 'Input control with error message',
    },
  },
};

/**
 *
 */
export const ErrorWithIcon: ComponentStoryObj<typeof Input> = {
  name: 'Error with icon',
  args: {
    label: 'Input Label',
    placeholder: 'Placeholder Text',
    required: true,
    error: 'This field is required',
    iconLeft: 'warning',
  },
  parameters: {
    docs: {
      storyDescription: 'Input control with error message and icon',
    },
  },
};

/**
 *
 */
export const Disabled: ComponentStoryObj<typeof Input> = {
  args: {
    label: 'Input Label',
    placeholder: 'Placeholder Text',
    disabled: true,
  },
  parameters: {
    docs: {
      storyDescription: 'Input control with disabled status',
    },
  },
};

/**
 *
 */
export const ReadOnly: ComponentStoryObj<typeof Input> = {
  name: 'Read only',
  args: {
    label: 'Input Label',
    value: 'Read Only',
    readOnly: true,
  },
  parameters: {
    docs: {
      storyDescription: 'Input control with readOnly status',
    },
  },
};

/**
 *
 */
export const ReadOnlyHtml: ComponentStoryObj<typeof Input> = {
  name: 'Read only (HTML)',
  args: {
    label: 'Input Label',
    value: 'Read Only',
    htmlReadOnly: true,
  },
  parameters: {
    docs: {
      storyDescription:
        'Input control with readOnly status (passsed to HTML &lt;input&gt; element)',
    },
  },
};

/**
 *
 */
export const Bare: ComponentStoryObj<typeof Input> = {
  args: {
    label: 'Input Label',
    placeholder: 'Placeholder Text',
    bare: true,
  },
  parameters: {
    docs: {
      storyDescription: 'Input control with bare status',
    },
  },
};

/**
 *
 */
export const WithFixedText: ComponentStoryObj<typeof Input> = {
  name: 'With fixed text',
  args: {
    label: 'Input Label',
    placeholder: 'Placeholder Text',
    addonLeft: '$',
    addonRight: '%',
  },
  parameters: {
    docs: {
      storyDescription: 'Input control with fixed text to the left and right',
    },
  },
};

/**
 *
 */
export const ReadOnlyWithFixedText: ComponentStoryObj<typeof Input> = {
  name: 'Read only with fixed text',
  args: {
    label: 'Input Label',
    value: 'Read Only',
    addonLeft: '$',
    addonRight: '%',
    readOnly: true,
  },
  parameters: {
    docs: {
      storyDescription:
        'Input control with fixed text to the left and right and readOnly status',
    },
  },
};
