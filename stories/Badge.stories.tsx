import { Badge } from '../src/scripts';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

/**
 *
 */
const meta: ComponentMeta<typeof Badge> = {
  title: 'Badge',
  component: Badge,
  argTypes: {
    onClick: { action: 'click' },
  },
};
export default meta;

/**
 *
 */
export const Default: ComponentStoryObj<typeof Badge> = {
  args: {
    children: 'Badge Label',
  },
  parameters: {
    docs: {
      storyDescription: 'Default badge',
    },
  },
};

/**
 *
 */
export const Inverse: ComponentStoryObj<typeof Badge> = {
  args: {
    type: 'inverse',
    children: 'Badge Label',
  },
  parameters: {
    docs: {
      storyDescription: 'Badge with type: inverse',
    },
  },
};

/**
 *
 */
export const Lightest: ComponentStoryObj<typeof Badge> = {
  args: {
    type: 'lightest',
    children: 'Badge Label',
  },
  parameters: {
    docs: {
      storyDescription: 'Badge with type: lightest',
    },
  },
};

/**
 *
 */
export const Success: ComponentStoryObj<typeof Badge> = {
  args: {
    type: 'success',
    children: 'Badge Label',
  },
  parameters: {
    docs: {
      storyDescription: 'Badge with type: success',
    },
  },
};

/**
 *
 */
export const Warning: ComponentStoryObj<typeof Badge> = {
  args: {
    type: 'warning',
    children: 'Badge Label',
  },
  parameters: {
    docs: {
      storyDescription: 'Badge with type: warning',
    },
  },
};

/**
 *
 */
export const Error: ComponentStoryObj<typeof Badge> = {
  args: {
    type: 'error',
    children: 'Badge Label',
  },
  parameters: {
    docs: {
      storyDescription: 'Badge with type: error',
    },
  },
};
