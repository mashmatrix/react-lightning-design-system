import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { withKnobs } from '@kadira/storybook-addon-knobs';
import { ButtonGroup, Button, DropdownButton, MenuItem } from '../src/scripts';

const darkBgStyle = { backgroundColor: '#16325c', padding: 4 };

const stories = storiesOf('ButtonGroup', module)
  .addDecorator(withKnobs)
  .addWithInfo('Default', 'Default grouped buttons', () => (
    <ButtonGroup>
      <Button type='neutral' onClick={ action('click') }>Refresh</Button>
      <Button type='neutral' onClick={ action('click') }>Edit</Button>
      <Button type='neutral' icon='download' iconAlign='left' onClick={ action('click') }>
        Download
      </Button>
    </ButtonGroup>
  ))
  .addWithInfo('Default disalbed', 'Grouped buttons with disabled button', () => (
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
  ))
  .addWithInfo('More', 'Grouped buttons with dropdown button in right', () => (
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
  ))
  .addWithInfo('Inverse', 'Grouped buttons with inversed color', () => (
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
  ))

;

export default stories;
