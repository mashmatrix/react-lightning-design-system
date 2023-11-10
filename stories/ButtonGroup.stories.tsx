import React, { ComponentProps } from 'react';
import { ButtonGroup, Button, DropdownButton, MenuItem } from '../src/scripts';
import { Meta, StoryObj } from '@storybook/react';
import { containerDecorator } from './util';

/**
 *
 */
type StoryProps = ComponentProps<typeof ButtonGroup> & {
  button1_onClick: ComponentProps<typeof Button>['onClick'];
  button2_onClick: ComponentProps<typeof Button>['onClick'];
  button3_onClick: ComponentProps<typeof Button>['onClick'];
  menu_onMenuSelect: ComponentProps<typeof DropdownButton>['onMenuSelect'];
};

/**
 *
 */
const darkBgDecorator = containerDecorator({
  backgroundColor: '#16325c',
  padding: 4,
});

/**
 *
 */
const meta: Meta<StoryProps> = {
  title: 'ButtonGroup',
  component: ButtonGroup,
  argTypes: {
    button1_onClick: { action: 'button1_click' },
    button2_onClick: { action: 'button2_click' },
    button3_onClick: { action: 'button3_click' },
    menu_onMenuSelect: { action: 'menuSelect' },
  },
};
export default meta;

/**
 *
 */
export const Default: StoryObj<StoryProps> = {
  render: ({ button1_onClick, button2_onClick, button3_onClick, ...args }) => (
    <ButtonGroup {...args}>
      <Button type='neutral' onClick={button1_onClick}>
        Refresh
      </Button>
      <Button type='neutral' onClick={button2_onClick}>
        Edit
      </Button>
      <Button
        type='neutral'
        icon='download'
        iconAlign='left'
        onClick={button3_onClick}
      >
        Download
      </Button>
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      storyDescription: 'Default grouped buttons',
    },
  },
};

/**
 *
 */
export const DefaultDisabled: StoryObj<StoryProps> = {
  render: ({ button1_onClick, button2_onClick, button3_onClick, ...args }) => (
    <ButtonGroup {...args}>
      <Button type='neutral' onClick={button1_onClick}>
        Refresh
      </Button>
      <Button type='neutral' onClick={button2_onClick}>
        Edit
      </Button>
      <Button
        type='neutral'
        disabled
        icon='download'
        iconAlign='left'
        onClick={button3_onClick}
      >
        Download
      </Button>
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      storyDescription: 'Grouped buttons with disabled button',
    },
  },
};

/**
 *
 */
export const More: StoryObj<StoryProps> = {
  render: ({
    button1_onClick,
    button2_onClick,
    button3_onClick,
    menu_onMenuSelect,
    ...args
  }) => (
    <ButtonGroup {...args}>
      <Button type='neutral' onClick={button1_onClick}>
        Refresh
      </Button>
      <Button type='neutral' onClick={button2_onClick}>
        Edit
      </Button>
      <Button
        type='neutral'
        icon='download'
        iconAlign='left'
        onClick={button3_onClick}
      >
        Download
      </Button>
      <DropdownButton
        type='icon-border'
        menuAlign='right'
        onMenuSelect={menu_onMenuSelect}
      >
        <MenuItem eventKey={1}>Menu Item One</MenuItem>
        <MenuItem eventKey={2}>Menu Item Two</MenuItem>
        <MenuItem eventKey={3}>Menu Item Three</MenuItem>
      </DropdownButton>
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      storyDescription: 'Grouped buttons with dropdown button in right',
    },
  },
};

/**
 *
 */
export const Inverse: StoryObj<StoryProps> = {
  render: ({
    button1_onClick,
    button2_onClick,
    button3_onClick,
    menu_onMenuSelect,
    ...args
  }) => (
    <ButtonGroup {...args}>
      <Button type='inverse' onClick={button1_onClick}>
        Refresh
      </Button>
      <Button type='inverse' onClick={button2_onClick}>
        Edit
      </Button>
      <Button
        type='inverse'
        icon='download'
        iconAlign='left'
        onClick={button3_onClick}
      >
        Download
      </Button>
      <DropdownButton
        type='icon-border-inverse'
        menuAlign='right'
        onMenuSelect={menu_onMenuSelect}
      >
        <MenuItem eventKey={1}>Menu Item One</MenuItem>
        <MenuItem eventKey={2}>Menu Item Two</MenuItem>
        <MenuItem eventKey={3}>Menu Item Three</MenuItem>
      </DropdownButton>
    </ButtonGroup>
  ),
  decorators: [darkBgDecorator],
  parameters: {
    docs: {
      storyDescription: 'Grouped buttons with inversed color',
    },
  },
};
