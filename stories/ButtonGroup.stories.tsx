import React from 'react';
import { action } from '@storybook/addon-actions';
import { ButtonGroup, Button, DropdownButton, MenuItem } from '../src/scripts';

const darkBgStyle = { backgroundColor: '#16325c', padding: 4 };

export default {
  title: 'ButtonGroup',
};

export const Default = () => (
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
);

Default.story = {
  parameters: { info: 'Default grouped buttons' },
};

export const DefaultDisalbed = () => (
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
);

DefaultDisalbed.story = {
  name: 'Default disalbed',
  parameters: { info: 'Grouped buttons with disabled button' },
};

export const More = () => (
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
);

More.story = {
  parameters: { info: 'Grouped buttons with dropdown button in right' },
};

export const Inverse = () => (
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
);

Inverse.story = {
  parameters: { info: 'Grouped buttons with inversed color' },
};
