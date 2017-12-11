import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { Tree, TreeNode } from '../src/scripts';


storiesOf('Tree', module)
  .add('Controlled with knobs', withInfo('Tree / TreeNode controlled with knobs')(() => (
    <Tree
      label={ text('label tree', 'Tree Example #1') }
      onNodeClick={ action('nodeClick') }
      onNodeToggle={ action('nodeToggle') }
      onNodeLabelClick={ action('nodeLabelClick') }
      toggleOnNodeClick={ boolean('toggleOnNodeClick') }
    >
      <TreeNode
        label={ text('label item #1', 'Item #1') }
        opened={ boolean('opened item #1', true) }
        selected={ boolean('selected item #1', true) }
        loading={ boolean('loading item #1') }
        leaf={ boolean('leaf item #1') }
      >
        <TreeNode
          label={ text('label item #1-1', 'Item #1-1') }
          opened={ boolean('opened item #1-1') }
          selected={ boolean('selected item #1-1') }
          loading={ boolean('loading item #1-1') }
          leaf={ boolean('leaf item #1-1', true) }
        />
        <TreeNode
          label={ text('label item #1-2', 'Item #1-2') }
          opened={ boolean('opened item #1-2') }
          selected={ boolean('selected item #1-2') }
          loading={ boolean('loading item #1-2') }
          leaf={ boolean('leaf item #1-2') }
        >
          <TreeNode
            label={ text('label item #1-2-1', 'Item #1-2-1') }
            opened={ boolean('opened item #1-2-1') }
            selected={ boolean('selected item #1-2-1') }
            loading={ boolean('loading item #1-2-1') }
            leaf={ boolean('leaf item #1-2-1', true) }
          />
          <TreeNode
            label={ text('label item #1-2-2', 'Item #1-2-2') }
            opened={ boolean('opened item #1-2-2') }
            selected={ boolean('selected item #1-2-2') }
            loading={ boolean('loading item #1-2-2') }
            leaf={ boolean('leaf item #1-2-2', true) }
          />
        </TreeNode>
        <TreeNode
          label={ text('label item #1-3', 'Item #1-3') }
          opened={ boolean('opened item #1-3') }
          selected={ boolean('selected item #1-3') }
          loading={ boolean('loading item #1-3') }
          leaf={ boolean('leaf item #1-3', true) }
        />
      </TreeNode>
      <TreeNode
        label={ text('label item #2', 'Item #2') }
        opened={ boolean('opened item #2') }
        selected={ boolean('selected item #2') }
        loading={ boolean('loading item #2') }
        leaf={ boolean('leaf item #2', true) }
      />
    </Tree>
  )))
;
