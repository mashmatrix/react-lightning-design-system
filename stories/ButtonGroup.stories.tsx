import React, { ComponentProps } from 'react';
import { ButtonGroup, Button, DropdownButton, MenuItem } from '../src/scripts';
import { Meta, StoryObj, DecoratorFn } from '@storybook/react';

/**
 *
 */
const darkBgStyle = {
  backgroundColor: '#16325c',
  padding: 4,
};

const darkBgDecorator: DecoratorFn = (Story) => (
  <div style={darkBgStyle}>
    <Story />
  </div>
);

/**
 *
 */
type StoryProps = ComponentProps<typeof ButtonGroup> &
  Pick<ComponentProps<typeof Button>, 'onClick'> &
  Pick<ComponentProps<typeof DropdownButton>, 'onMenuSelect'>;

/**
 *
 */
const meta: Meta<StoryProps> = {
  title: 'ButtonGroup',
  component: ButtonGroup,
  argTypes: {
    onClick: { action: 'click' },
    onMenuSelect: { action: 'menuSelect' },
  },
};
export default meta;

/**
 *
 */
export const Default: StoryObj<StoryProps> = {
  render: ({ onClick, ...args }) => (
    <ButtonGroup {...args}>
      <Button type='neutral' onClick={onClick}>
        Refresh
      </Button>
      <Button type='neutral' onClick={onClick}>
        Edit
      </Button>
      <Button type='neutral' icon='download' iconAlign='left' onClick={onClick}>
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
  render: ({ onClick, ...args }) => (
    <ButtonGroup {...args}>
      <Button type='neutral' onClick={onClick}>
        Refresh
      </Button>
      <Button type='neutral' onClick={onClick}>
        Edit
      </Button>
      <Button
        type='neutral'
        disabled
        icon='download'
        iconAlign='left'
        onClick={onClick}
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
  render: ({ onClick, onMenuSelect, ...args }) => (
    <ButtonGroup {...args}>
      <Button type='neutral' onClick={onClick}>
        Refresh
      </Button>
      <Button type='neutral' onClick={onClick}>
        Edit
      </Button>
      <Button type='neutral' icon='download' iconAlign='left' onClick={onClick}>
        Download
      </Button>
      <DropdownButton
        type='icon-border'
        menuAlign='right'
        onMenuSelect={onMenuSelect}
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
  render: ({ onClick, onMenuSelect, ...args }) => (
    <ButtonGroup {...args}>
      <Button type='inverse' onClick={onClick}>
        Refresh
      </Button>
      <Button type='inverse' onClick={onClick}>
        Edit
      </Button>
      <Button type='inverse' icon='download' iconAlign='left' onClick={onClick}>
        Download
      </Button>
      <DropdownButton
        type='icon-border-inverse'
        menuAlign='right'
        onMenuSelect={onMenuSelect}
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
