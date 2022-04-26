import React from 'react';
import { action } from '@storybook/addon-actions';
import { BreadCrumbs, Crumb } from '../src/scripts';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

/**
 *
 */
const meta: ComponentMeta<typeof BreadCrumbs> = {
  title: 'BreadCrumbs',
  component: BreadCrumbs,
};
export default meta;

/**
 *
 */
export const Default: ComponentStoryObj<typeof BreadCrumbs> = {
  render(args) {
    return (
      <BreadCrumbs {...args}>
        <Crumb onClick={action('crumb1#click')}>Parent Entity</Crumb>
        <Crumb onClick={action('crumb2#click')}>Parent Record Name</Crumb>
      </BreadCrumbs>
    );
  },
  parameters: {
    docs: {
      storyDescription: 'Default BreadCrumbs',
    },
  },
};
