import React, { ComponentProps } from 'react';
import { DropdownButton } from '../src/scripts/DropdownButton';
import { MenuItem } from '../src/scripts';
import { Meta, StoryObj } from '@storybook/react';
import { buttonBgDecorator, containerDecorator } from './util';

/**
 *
 */
type StoryProps = ComponentProps<typeof DropdownButton> & {
  menuItems?: Array<ComponentProps<typeof MenuItem>>;
};

/**
 *
 */
const meta: Meta<StoryProps> = {
  title: 'DropdownButton',
  component: DropdownButton,
  argTypes: {
    onClick: { action: 'click' },
    onMenuSelect: { action: 'menuSelect' },
    onBlur: { action: 'blur' },
  },
  decorators: [buttonBgDecorator],
};
export default meta;

/**
 *
 */
export const ControlledWithKnobs: StoryObj<StoryProps> = {
  render: ({ menuItems = [], ...args }) => (
    <DropdownButton {...args}>
      <MenuItem {...menuItems[0]} />
      <MenuItem {...menuItems[1]} />
      <MenuItem {...menuItems[2]} />
      {menuItems[3] ? <MenuItem {...menuItems[3]} /> : undefined}
    </DropdownButton>
  ),
  name: 'Controlled with knobs',
  args: {
    label: 'Dropdown Button',
    iconAlign: 'left',
    menuItems: [
      {
        eventKey: '1',
        children: 'Menu Item One',
      },
      {
        eventKey: '2',
        children: 'Menu Item One',
      },
      {
        eventKey: '3',
        children: 'Menu Item One',
      },
    ],
  },
  parameters: {
    docs: {
      storyDescription: 'Dropdown button controlled with knobs',
    },
  },
};

/**
 *
 */
export const Default: StoryObj<StoryProps> = {
  render: ({ menuItems = [], ...args }) => (
    <DropdownButton {...args}>
      <MenuItem {...menuItems[0]} />
      <MenuItem {...menuItems[1]} />
      <MenuItem {...menuItems[2]} />
      {menuItems[3] ? <MenuItem {...menuItems[3]} /> : undefined}
    </DropdownButton>
  ),
  args: {
    label: 'Dropdown Button',
    menuItems: [
      {
        eventKey: 1,
        children: 'Menu Item One',
      },
      {
        eventKey: 2,
        disabled: true,
        children: 'Menu Item Two',
      },
      {
        eventKey: 3,
        children: 'Menu Item Three',
      },
      {
        eventKey: 4,
        divider: 'top',
        children: 'Menu Item Four',
      },
    ],
  },
  parameters: {
    docs: {
      storyDescription: 'Dropdown button with menu items',
    },
  },
};

/**
 *
 */
export const Neutral: StoryObj<StoryProps> = {
  ...Default,
  args: {
    ...Default.args,
    type: 'neutral',
  },
  parameters: {
    docs: {
      storyDescription: 'Neutral dropdown button',
    },
  },
};

/**
 *
 */
export const IconBare: StoryObj<StoryProps> = {
  ...Default,
  args: {
    ...Default.args,
    label: undefined,
    type: 'icon-bare',
    icon: 'settings',
  },
  parameters: {
    docs: {
      storyDescription: 'Icon bare dropdown button',
    },
  },
};

/**
 *
 */
export const IconMore: StoryObj<StoryProps> = {
  ...Default,
  args: {
    ...Default.args,
    label: undefined,
    type: 'icon-more',
    icon: 'settings',
  },
  parameters: {
    docs: {
      storyDescription: 'Icon and more dropdown button',
    },
  },
};

/**
 *
 */
export const LeftIcon: StoryObj<StoryProps> = {
  ...Default,
  name: 'Left icon',
  args: {
    type: 'icon-border',
    icon: 'down',
    menuItems: [
      {
        eventKey: 1,
        icon: 'check',
        children: 'Menu Item One',
      },
      {
        eventKey: 2,
        icon: 'none',
        children: 'Menu Item Two',
      },
      {
        eventKey: 3,
        icon: 'none',
        children: 'Menu Item Three',
      },
    ],
  },
  parameters: {
    docs: {
      storyDescription: 'Dropdown button with icon in left side of menu items',
    },
  },
};

/**
 *
 */
export const RightIcon: StoryObj<StoryProps> = {
  ...Default,
  name: 'Right icon',
  args: {
    type: 'icon-border',
    icon: 'down',
    menuItems: [
      {
        eventKey: 1,
        iconRight: 'table',
        children: 'Menu Item One',
      },
      {
        eventKey: 2,
        iconRight: 'kanban',
        children: 'Menu Item Two',
      },
      {
        eventKey: 3,
        iconRight: 'side_list',
        children: 'Menu Item Three',
      },
    ],
  },
  parameters: {
    docs: {
      storyDescription: 'Dropdown button with icon in right side of menu items',
    },
  },
};

/**
 *
 */
export const LeftRightIcon: StoryObj<StoryProps> = {
  ...Default,
  name: 'Left/Right icon',
  args: {
    type: 'icon-border',
    icon: 'down',
    menuItems: [
      {
        eventKey: 1,
        icon: 'check',
        iconRight: 'table',
        children: 'Menu Item One',
      },
      {
        eventKey: 2,
        icon: 'none',
        iconRight: 'kanban',
        children: 'Menu Item Two',
      },
      {
        eventKey: 3,
        icon: 'none',
        iconRight: 'side_list',
        children: 'Menu Item Three',
      },
    ],
  },
  parameters: {
    docs: {
      storyDescription:
        'Dropdown button with icon in left/right side of menu items',
    },
  },
};

/**
 *
 */
export const RightAlignedMenu: StoryObj<StoryProps> = {
  ...Default,
  name: 'Right aligned menu',
  args: {
    ...Default.args,
    label: undefined,
    type: 'icon-border',
    icon: 'down',
    menuAlign: 'right',
  },
  decorators: [containerDecorator({ paddingLeft: 200 })],
  parameters: {
    docs: {
      storyDescription: 'Dropdown',
    },
  },
};

/**
 *
 */
export const HoverPopup: StoryObj<StoryProps> = {
  ...Default,
  args: {
    ...Default.args,
    type: 'neutral',
    hoverPopup: true,
  },
  parameters: {
    docs: {
      storyDescription: 'Dropdown is rendered in hover event',
    },
  },
};

/**
 *
 */
export const NubbinInTop: StoryObj<StoryProps> = {
  ...Default,
  name: 'Nubbin in top',
  args: {
    ...Default.args,
    label: undefined,
    type: 'icon-container',
    icon: 'settings',
    nubbinTop: true,
  },
  decorators: [containerDecorator({ paddingLeft: 100 })],
  parameters: {
    docs: {
      storyDescription: 'Nubbin in top of the menu dropdown',
    },
  },
};
