import React, { ComponentProps } from 'react';
import { BreadCrumbs, Crumb } from '../src/scripts';
import { Meta, StoryObj } from '@storybook/react';

type StoryProps = ComponentProps<typeof BreadCrumbs> & {
  crumb1: ComponentProps<typeof Crumb>;
  crumb1_onClick: ComponentProps<typeof Crumb>['onClick'];
} & {
  crumb2: ComponentProps<typeof Crumb>;
  crumb2_onClick: ComponentProps<typeof Crumb>['onClick'];
};

/**
 *
 */
const meta: Meta<StoryProps> = {
  title: 'BreadCrumbs',
  component: BreadCrumbs,
  argTypes: {
    crumb1_onClick: { action: 'crumb1_click' },
    crumb2_onClick: { action: 'crumb2_click' },
  },
};
export default meta;

/**
 *
 */
export const Default: StoryObj<StoryProps> = {
  render: ({ crumb1, crumb2, crumb1_onClick, crumb2_onClick, ...args }) => (
    <BreadCrumbs {...args}>
      <Crumb onClick={crumb1_onClick} {...crumb1} />
      <Crumb onClick={crumb2_onClick} {...crumb2} />
    </BreadCrumbs>
  ),
  args: {
    crumb1: {
      children: 'Parent Entity',
    },
    crumb2: {
      children: 'Parent Record Name',
    },
  },
  parameters: {
    docs: {
      storyDescription: 'Default BreadCrumbs',
    },
  },
};
