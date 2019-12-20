import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ButtonGroup, Button, DropdownButton, MenuItem } from '../src/scripts';

const darkBgStyle = { backgroundColor: '#16325c', padding: 4 };

const stories = storiesOf('ButtonGroup', module)
  .add('Default', () => (
    <ButtonGroup>
      <Button type='neutral' onClick={ action('click') }>Refresh</Button>
      <Button type='neutral' onClick={ action('click') }>Edit</Button>
      <Button type='neutral' icon='download' iconAlign='left' onClick={ action('click') }>
        Download
      </Button>
    </ButtonGroup>
  ), {
  info: 'Default grouped buttons'
})
  .add('Default disalbed', () => (
    <ButtonGroup>
      <Button type='neutral' onClick={ action('click') }>Refresh</Button>
      <Button type='neutral' onClick={ action('click') } >Edit</Button>
      <Button
        type='neutral'
        disabled
        icon='download' iconAlign='left'
        onClick={ action('click') }
      >
        Download
      </Button>
    </ButtonGroup>
  ), {
  info: 'Grouped buttons with disabled button'
})
  .add('More', () => (
    <ButtonGroup>
      <Button type='neutral' onClick={ action('click') }>Refresh</Button>
      <Button type='neutral' onClick={ action('click') }>Edit</Button>
      <Button type='neutral' icon='download' iconAlign='left' onClick={ action('click') }>
        Download
      </Button>
      <DropdownButton
        type='icon-border'
        menuAlign='right'
        onMenuItemClick={ action('menuItemClick') }
      >
        <MenuItem>Menu Item One</MenuItem>
        <MenuItem>Menu Item Two</MenuItem>
        <MenuItem>Menu Item Three</MenuItem>
      </DropdownButton>
    </ButtonGroup>
  ), {
  info: 'Grouped buttons with dropdown button in right'
})
  .add('Inverse', () => (
    <div style={ darkBgStyle }>
      <ButtonGroup>
        <Button type='inverse' onClick={ action('click') }>Refresh</Button>
        <Button type='inverse' onClick={ action('click') }>Edit</Button>
        <Button type='inverse' icon='download' iconAlign='left' onClick={ action('click') }>
          Download
        </Button>
        <DropdownButton
          type='icon-border-inverse'
          menuAlign='right'
          onMenuItemClick={ action('menuItemClick') }
        >
          <MenuItem>Menu Item One</MenuItem>
          <MenuItem>Menu Item Two</MenuItem>
          <MenuItem>Menu Item Three</MenuItem>
        </DropdownButton>
      </ButtonGroup>
    </div>
  ), {
  info: 'Grouped buttons with inversed color'
})

;

export default stories;
