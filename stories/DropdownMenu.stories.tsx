import React, { ComponentProps } from 'react';
import { DropdownMenu, DropdownMenuItem } from '../src/scripts/DropdownMenu';
import { Meta, StoryObj } from '@storybook/react';

/**
 *
 */
type StoryProps = ComponentProps<typeof DropdownMenu> & {
  menuItems?: Array<ComponentProps<typeof DropdownMenuItem>>;
};

/**
 *
 */
const meta: Meta<StoryProps> = {
  title: 'DropdownMenu',
  component: DropdownMenu,
  argTypes: {
    onMenuSelect: { action: 'menuSelect' },
    onMenuClose: { action: 'menuClose' },
  },
};
export default meta;

/**
 *
 */
export const ControlledWithKnobs: StoryObj<StoryProps> = {
  render: ({ menuItems = [], ...args }) => (
    <DropdownMenu {...args}>
      <DropdownMenuItem {...menuItems[0]} />
      <DropdownMenuItem {...menuItems[1]} />
      <DropdownMenuItem {...menuItems[2]} />
      {menuItems[3] ? <DropdownMenuItem {...menuItems[3]} /> : undefined}
    </DropdownMenu>
  ),
  name: 'Controlled with knobs',
  args: {
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
      storyDescription: 'Dropdown menu controlled with knobs',
    },
  },
};

/**
 *
 */
export const Default: StoryObj<StoryProps> = {
  render: ({ menuItems = [], ...args }) => (
    <DropdownMenu {...args}>
      <DropdownMenuItem {...menuItems[0]} />
      <DropdownMenuItem {...menuItems[1]} />
      <DropdownMenuItem {...menuItems[2]} />
      {menuItems[3] ? <DropdownMenuItem {...menuItems[3]} /> : undefined}
    </DropdownMenu>
  ),
  args: {
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
      storyDescription: 'Dropdown menu',
    },
  },
};

/**
 *
 */
export const WithSubmenu: StoryObj<StoryProps> = {
  ...Default,
  args: {
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
        submenuItems: [
          {
            eventKey: 31,
            key: 31,
            label: 'Menu Item Three - One',
            submenuItems: [
              {
                eventKey: 311,
                key: 311,
                label: 'Menu Item Three - One - One',
              },
              {
                eventKey: 312,
                key: 312,
                label: 'Menu Item Three - One - Two',
              },
              {
                eventKey: 313,
                key: 313,
                label: 'Menu Item Three - One - Three',
              },
            ],
          },
          {
            eventKey: 32,
            key: 32,
            label: 'Menu Item Three - Two',
            submenuItems: [
              {
                eventKey: 321,
                key: 321,
                label: 'Menu Item Three - Two - One',
              },
              {
                eventKey: 322,
                key: 322,
                label: 'Menu Item Three - Two - Two',
              },
              {
                eventKey: 323,
                key: 323,
                label: 'Menu Item Three - Two - Three',
              },
            ],
          },
        ],
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
      storyDescription: 'Dropdown menu with Submenu',
    },
  },
};
