import React from 'react';
import { action } from '@storybook/addon-actions';
import { ButtonGroup, Button, DropdownButton, MenuItem } from '../src/scripts';
const darkBgStyle = {
  backgroundColor: '#16325c',
  padding: 4,
};
export default {
  title: 'ButtonGroup',
};
export const Default = {
  render: () => (
    <ButtonGroup>
      <Button type='neutral' onClick={action('click')}>
        Refresh
      </Button>
      <Button type='neutral' onClick={action('click')}>
        Edit
      </Button>
      <Button
        type='neutral'
        icon='download'
        iconAlign='left'
        onClick={action('click')}
      >
        Download
      </Button>
    </ButtonGroup>
  ),
  parameters: {
    info: 'Default grouped buttons',
  },
};
export const DefaultDisalbed = {
  render: () => (
    <ButtonGroup>
      <Button type='neutral' onClick={action('click')}>
        Refresh
      </Button>
      <Button type='neutral' onClick={action('click')}>
        Edit
      </Button>
      <Button
        type='neutral'
        disabled
        icon='download'
        iconAlign='left'
        onClick={action('click')}
      >
        Download
      </Button>
    </ButtonGroup>
  ),
  name: 'Default disalbed',
  parameters: {
    info: 'Grouped buttons with disabled button',
  },
};
export const More = {
  render: () => (
    <ButtonGroup>
      <Button type='neutral' onClick={action('click')}>
        Refresh
      </Button>
      <Button type='neutral' onClick={action('click')}>
        Edit
      </Button>
      <Button
        type='neutral'
        icon='download'
        iconAlign='left'
        onClick={action('click')}
      >
        Download
      </Button>
      <DropdownButton
        type='icon-border'
        menuAlign='right'
        onMenuSelect={action('menuSelect')}
      >
        <MenuItem eventKey={1}>Menu Item One</MenuItem>
        <MenuItem eventKey={2}>Menu Item Two</MenuItem>
        <MenuItem eventKey={3}>Menu Item Three</MenuItem>
      </DropdownButton>
    </ButtonGroup>
  ),
  parameters: {
    info: 'Grouped buttons with dropdown button in right',
  },
};
export const Inverse = {
  render: () => (
    <div style={darkBgStyle}>
      <ButtonGroup>
        <Button type='inverse' onClick={action('click')}>
          Refresh
        </Button>
        <Button type='inverse' onClick={action('click')}>
          Edit
        </Button>
        <Button
          type='inverse'
          icon='download'
          iconAlign='left'
          onClick={action('click')}
        >
          Download
        </Button>
        <DropdownButton
          type='icon-border-inverse'
          menuAlign='right'
          onMenuSelect={action('menuSelect')}
        >
          <MenuItem eventKey={1}>Menu Item One</MenuItem>
          <MenuItem eventKey={2}>Menu Item Two</MenuItem>
          <MenuItem eventKey={3}>Menu Item Three</MenuItem>
        </DropdownButton>
      </ButtonGroup>
    </div>
  ),
  parameters: {
    info: 'Grouped buttons with inversed color',
  },
};
