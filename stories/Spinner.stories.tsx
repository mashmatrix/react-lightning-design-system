import React from 'react';
import { Spinner } from '../src/scripts/Spinner';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { buildContainerDecorator } from './util';

/**
 *
 */
const containerStyle = {
  position: 'relative' as const,
  width: 100,
  height: 100,
  display: 'inline-block',
};
const inverseContainerStyle = Object.assign({}, containerStyle, {
  background: '#16325C',
});

/**
 *
 */
const meta: ComponentMeta<typeof Spinner> = {
  title: 'Spinner',
  component: Spinner,
};
export default meta;

/**
 *
 */
export const ControlledWithKnobs: ComponentStoryObj<typeof Spinner> = {
  name: 'Controlled with knobs',
  decorators: [
    buildContainerDecorator<{ type?: unknown }>(({ type }) =>
      type === 'inverse' ? inverseContainerStyle : containerStyle
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Spinner with knobs',
      },
    },
  },
};

/**
 *
 */
export const Default: ComponentStoryObj<typeof Spinner> = {
  render: (args) => (
    <div {...args}>
      <div style={containerStyle}>
        <Spinner size='small' {...args} />
      </div>
      <div style={containerStyle}>
        <Spinner size='medium' {...args} />
      </div>
      <div style={containerStyle}>
        <Spinner size='large' {...args} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default spinner with different sizes (small, medium, large)',
      },
    },
  },
};

/**
 *
 */
export const Brand: ComponentStoryObj<typeof Spinner> = {
  ...Default,
  args: {
    type: 'brand',
  },
  parameters: {
    docs: {
      description: {
        story: 'Brand spinner with different sizes (small, medium, large)',
      },
    },
  },
};

/**
 *
 */
export const Inverse: ComponentStoryObj<typeof Spinner> = {
  render: (args) => (
    <div>
      <div style={inverseContainerStyle}>
        <Spinner size='small' {...args} />
      </div>
      <div style={inverseContainerStyle}>
        <Spinner size='medium' {...args} />
      </div>
      <div style={inverseContainerStyle}>
        <Spinner size='large' {...args} />
      </div>
    </div>
  ),
  args: {
    type: 'inverse',
  },
  parameters: {
    docs: {
      description: {
        story: 'Inverse spinner with different sizes (small, medium, large)',
      },
    },
  },
};
