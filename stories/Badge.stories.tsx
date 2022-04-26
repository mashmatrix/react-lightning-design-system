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
export const Shade: ComponentStoryObj<typeof Badge> = {
  args: {
    type: 'shade',
    children: 'Badge Label',
  },
  parameters: {
    docs: {
      storyDescription: 'Badge with type: shade',
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
