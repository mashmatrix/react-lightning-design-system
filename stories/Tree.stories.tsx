import React from 'react';
import { Tree, TreeNode } from '../src/scripts';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

/**
 *
 */
const meta: ComponentMeta<typeof Tree> = {
  title: 'Tree',
  component: Tree,
  subcomponents: { TreeNode },
  argTypes: {
    onNodeClick: { action: 'nodeClick' },
    onNodeToggle: { action: 'nodeToggle' },
    onNodeLabelClick: { action: 'nodeLabelClick' },
  },
};
export default meta;

/**
 *
 */
export const ControlledWithKnobs: ComponentStoryObj<typeof Tree> = {
  render: (args) => (
    <Tree {...args}>
      <TreeNode label='Item #1' opened selected>
        <TreeNode label='Item #1-1' leaf />
        <TreeNode label='Item #1-2'>
          <TreeNode label='Item #1-2-1' leaf />
          <TreeNode label='Item #1-2-2' leaf />
        </TreeNode>
        <TreeNode label='Item #1-3' leaf />
      </TreeNode>
      <TreeNode label='Item #2' leaf />
    </Tree>
  ),
  name: 'Controlled with knobs',
  args: {
    label: 'Tree Example #1',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tree / TreeNode controlled with knobs',
      },
    },
  },
};
