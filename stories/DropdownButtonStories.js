import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { text, boolean, select } from '@storybook/addon-knobs';
import { DropdownButton, MenuItem } from '../src/scripts';

const darkBgStyle = { backgroundColor: '#16325c', padding: 4 };
const lightBgStyle = { backgroundColor: '#cccccc', padding: 4 };

const stories = storiesOf('DropdownButton', module)
  .add('Controlled with knobs', withInfo('Dropdown button controlled with knobs')(() => {
    const typeOptions = {
      '': '(none)',
      neutral: 'neutral',
      brand: 'brand',
      destructive: 'destructive',
      'icon-bare': 'icon-bare',
      'icon-more': 'icon-more',
      'icon-container': 'icon-container',
      'icon-border': 'icon-border',
      'icon-border-filled': 'icon-border-filled',
      inverse: 'inverse',
      'icon-inverse': 'icon-inverse',
    };
    const type = select('type', typeOptions);
    const sizeOptions = {
      '': '(none)',
      'x-small': 'x-small',
      small: 'small',
      medium: 'medium',
      large: 'large',
    };
    const size = select('size', sizeOptions);
    const label = text('label', 'Dropdown Button');
    const iconOptions = {
      '': '(none)',
      download: 'download',
      down: 'down',
      task: 'task',
      settings: 'settings',
      close: 'close',
      check: 'check',
      none: 'none',
    };
    const icon = select('icon', iconOptions);
    const iconAlignOptions = { '': '(none)', left: 'left', right: 'right' };
    const iconAlign = select('iconAlign', iconAlignOptions, 'left');
    const iconSizeOptions = {
      '': '(none)',
      'x-small': 'x-small',
      small: 'small',
      medium: 'medium',
      large: 'large',
    };
    const iconSize = select('iconSize', iconSizeOptions);
    const menuSizeOptions = {
      '': '(none)',
      small: 'small',
      medium: 'medium',
      large: 'large',
    };
    const menuSize = select('menuSize', menuSizeOptions);
    const menuAlignOptions = {
      '': '(none)',
      left: 'left',
      center: 'center',
      right: 'right',
    };
    const menuAlign = select('menuAlign', menuAlignOptions);
    const disabled = boolean('disabled', false);
    const hoverPopup = boolean('hoverPopup', false);
    const nubbinTop = boolean('nubbinTop', false);
    const cntStyles =
      type === 'inverse' || type === 'icon-inverse' ? darkBgStyle :
      type === 'icon-border-filled' ? lightBgStyle :
      {};
    return (
      <div style={ cntStyles }>
        <DropdownButton
          type={ type }
          size={ size }
          label={ label }
          icon={ icon }
          iconAlign={ iconAlign }
          iconSize={ iconSize }
          menuSize={ menuSize }
          menuAlign={ menuAlign }
          disabled={ disabled }
          hoverPopup={ hoverPopup }
          nubbinTop={ nubbinTop }
          onClick={ action('click') }
          onMenuItemClick={ action('menuItemClick') }
        >
          <MenuItem
            icon={ select('menuitem icon', iconOptions) }
            iconRight={ select('menuitem iconRight', iconOptions) }
            disabled={ boolean('menuitem disabled') }
          >
            Menu Item One
          </MenuItem>
          <MenuItem
            icon={ select('menuitem icon', iconOptions) }
            iconRight={ select('menuitem iconRight', iconOptions) }
            disabled={ boolean('menuitem disabled') }
          >
            Menu Item Two
          </MenuItem>
          <MenuItem
            icon={ select('menuitem icon', iconOptions) }
            iconRight={ select('menuitem iconRight', iconOptions) }
            disabled={ boolean('menuitem disabled') }
          >
            Menu Item Three
          </MenuItem>
        </DropdownButton>
      </div>
    );
  }))
  .add('Default', withInfo('Dropdown button with menu items')(() => (
    <DropdownButton
      label='Dropdown Button'
      onMenuItemClick={ action('menuItemClick') }
    >
      <MenuItem>Menu Item One</MenuItem>
      <MenuItem disabled>Menu Item Two</MenuItem>
      <MenuItem>Menu Item Three</MenuItem>
      <MenuItem divider='top'>Menu Item Four</MenuItem>
    </DropdownButton>
  )))
  .add('Neutral', withInfo('Neutral dropdown button')(() => (
    <DropdownButton
      type='neutral'
      label='Dropdown Button'
      onMenuItemClick={ action('menuItemClick') }
    >
      <MenuItem>Menu Item One</MenuItem>
      <MenuItem disabled>Menu Item Two</MenuItem>
      <MenuItem>Menu Item Three</MenuItem>
      <MenuItem divider='top'>Menu Item Four</MenuItem>
    </DropdownButton>
  )))
  .add('Icon Bare', withInfo('Icon bare dropdown button')(() => (
    <DropdownButton
      type='icon-bare'
      icon='settings'
      onMenuItemClick={ action('menuItemClick') }
    >
      <MenuItem>Menu Item One</MenuItem>
      <MenuItem disabled>Menu Item Two</MenuItem>
      <MenuItem>Menu Item Three</MenuItem>
      <MenuItem divider='top'>Menu Item Four</MenuItem>
    </DropdownButton>
  )))
  .add('Icon More', withInfo('Icon and more dropdown button')(() => (
    <DropdownButton
      type='icon-more'
      icon='settings'
      onMenuItemClick={ action('menuItemClick') }
    >
      <MenuItem>Menu Item One</MenuItem>
      <MenuItem disabled>Menu Item Two</MenuItem>
      <MenuItem>Menu Item Three</MenuItem>
      <MenuItem divider='top'>Menu Item Four</MenuItem>
    </DropdownButton>
  )))
  .add('Left icon', withInfo('Dropdown button with icon in left side of menu items')(() => (
    <DropdownButton
      type='icon-border'
      icon='down'
      onMenuItemClick={ action('menuItemClick') }
    >
      <MenuItem icon='check'>Menu Item One</MenuItem>
      <MenuItem icon='none'>Menu Item Two</MenuItem>
      <MenuItem icon='none'>Menu Item Three</MenuItem>
    </DropdownButton>
  )))
  .add('Right icon', withInfo('Dropdown button with icon in right side of menu items')(() => (
    <DropdownButton
      type='icon-border'
      icon='down'
      onMenuItemClick={ action('menuItemClick') }
    >
      <MenuItem iconRight='table'>Menu Item One</MenuItem>
      <MenuItem iconRight='kanban'>Menu Item Two</MenuItem>
      <MenuItem iconRight='side_list'>Menu Item Three</MenuItem>
    </DropdownButton>
  )))
  .add('Left/Right icon', withInfo('Dropdown button with icon in left/right side of menu items')(() => (
    <DropdownButton
      type='icon-border'
      icon='down'
      onMenuItemClick={ action('menuItemClick') }
    >
      <MenuItem icon='check' iconRight='table'>Menu Item One</MenuItem>
      <MenuItem icon='none' iconRight='kanban'>Menu Item Two</MenuItem>
      <MenuItem icon='none' iconRight='side_list'>Menu Item Three</MenuItem>
    </DropdownButton>
  )))
  .add('Right aligned menu', withInfo('Dropdown')(() => (
    <div style={ { paddingLeft: 200 } }>
      <DropdownButton
        type='icon-border'
        icon='down'
        menuAlign='right'
        onMenuItemClick={ action('menuItemClick') }
      >
        <MenuItem>Menu Item One</MenuItem>
        <MenuItem disabled>Menu Item Two</MenuItem>
        <MenuItem>Menu Item Three</MenuItem>
        <MenuItem divider='top'>Menu Item Four</MenuItem>
      </DropdownButton>
    </div>
  )))
  .add('Hover Popup', withInfo('Dropdown is rendered in hover event')(() => (
    <DropdownButton
      type='neutral'
      label='Dropdown Button'
      hoverPopup
      onMenuItemClick={ action('menuItemClick') }
    >
      <MenuItem>Menu Item One</MenuItem>
      <MenuItem disabled>Menu Item Two</MenuItem>
      <MenuItem>Menu Item Three</MenuItem>
      <MenuItem divider='top'>Menu Item Four</MenuItem>
    </DropdownButton>
  )))
  .add('Nubbin in top', withInfo('Nubbin in top of the menu dropdown')(() => (
    <div style={ { paddingLeft: 100 } }>
      <DropdownButton
        type='icon-container'
        icon='settings'
        nubbinTop
        onMenuItemClick={ action('menuItemClick') }
      >
        <MenuItem>Menu Item One</MenuItem>
        <MenuItem disabled>Menu Item Two</MenuItem>
        <MenuItem>Menu Item Three</MenuItem>
        <MenuItem divider='top'>Menu Item Four</MenuItem>
      </DropdownButton>
    </div>
  )))
;

export default stories;
