import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { Tree, TreeNode } from '../src/scripts';

export default {
  title: 'Tree',
};

export const ControlledWithKnobs = () => (
  <Tree
    label={text('label tree', 'Tree Example #1')}
    onNodeClick={action('nodeClick')}
    onNodeToggle={action('nodeToggle')}
    onNodeLabelClick={action('nodeLabelClick')}
    toggleOnNodeClick={boolean('toggleOnNodeClick', false)}
  >
    <TreeNode
      label={text('label item #1', 'Item #1')}
      opened={boolean('opened item #1', true)}
      selected={boolean('selected item #1', true)}
      loading={boolean('loading item #1', false)}
      leaf={boolean('leaf item #1', false)}
    >
      <TreeNode
        label={text('label item #1-1', 'Item #1-1')}
        opened={boolean('opened item #1-1', false)}
        selected={boolean('selected item #1-1', false)}
        loading={boolean('loading item #1-1', false)}
        leaf={boolean('leaf item #1-1', true)}
      />
      <TreeNode
        label={text('label item #1-2', 'Item #1-2')}
        opened={boolean('opened item #1-2', false)}
        selected={boolean('selected item #1-2', false)}
        loading={boolean('loading item #1-2', false)}
        leaf={boolean('leaf item #1-2', false)}
      >
        <TreeNode
          label={text('label item #1-2-1', 'Item #1-2-1')}
          opened={boolean('opened item #1-2-1', false)}
          selected={boolean('selected item #1-2-1', false)}
          loading={boolean('loading item #1-2-1', false)}
          leaf={boolean('leaf item #1-2-1', true)}
        />
        <TreeNode
          label={text('label item #1-2-2', 'Item #1-2-2')}
          opened={boolean('opened item #1-2-2', false)}
          selected={boolean('selected item #1-2-2', false)}
          loading={boolean('loading item #1-2-2', false)}
          leaf={boolean('leaf item #1-2-2', true)}
        />
      </TreeNode>
      <TreeNode
        label={text('label item #1-3', 'Item #1-3')}
        opened={boolean('opened item #1-3', false)}
        selected={boolean('selected item #1-3', false)}
        loading={boolean('loading item #1-3', false)}
        leaf={boolean('leaf item #1-3', true)}
      />
    </TreeNode>
    <TreeNode
      label={text('label item #2', 'Item #2')}
      opened={boolean('opened item #2', false)}
      selected={boolean('selected item #2', false)}
      loading={boolean('loading item #2', false)}
      leaf={boolean('leaf item #2', true)}
    />
  </Tree>
);

ControlledWithKnobs.story = {
  name: 'Controlled with knobs',
  parameters: { info: 'Tree / TreeNode controlled with knobs' },
};
