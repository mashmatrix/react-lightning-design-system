import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean, select } from '@storybook/addon-knobs';
import {
  DropdownButton,
  DropdownMenuSize,
  DropdownMenuAlign,
} from '../src/scripts/DropdownButton';
import {
  MenuItem,
  ButtonType,
  ButtonIconAlign,
  ButtonIconSize,
  ButtonSize,
} from '../src/scripts';

const darkBgStyle = { backgroundColor: '#16325c', padding: 4 };
const lightBgStyle = { backgroundColor: '#cccccc', padding: 4 };

const stories = storiesOf('DropdownButton', module)
  .add(
    'Controlled with knobs',
    () => {
      const typeOptions = {
        '(none)': '',
        neutral: 'neutral',
        brand: 'brand',
        destructive: 'destructive',
        'icon-bare': 'icon-bare',
        'icon-more': 'icon-more',
        'icon-container': 'icon-container',
        'icon-border': 'icon-border',
        'icon-border-filled': 'icon-border-filled',
        'icon-border-inverse': 'icon-border-inverse',
        inverse: 'inverse',
        'icon-inverse': 'icon-inverse',
      };
      const type = select('type', typeOptions, '') as ButtonType;
      const sizeOptions = {
        '(none)': '',
        'x-small': 'x-small',
        small: 'small',
        medium: 'medium',
        large: 'large',
      };
      const size = select('size', sizeOptions, '') as ButtonSize;

      const label = text('label', 'Dropdown Button');
      const iconOptions = {
        '(none)': '',
        download: 'download',
        down: 'down',
        task: 'task',
        settings: 'settings',
        close: 'close',
        check: 'check',
        none: 'none',
      };
      const icon = select('icon', iconOptions, '');
      const iconAlignOptions = { '(none)': '', left: 'left', right: 'right' };
      const iconAlign = select(
        'iconAlign',
        iconAlignOptions,
        'left'
      ) as ButtonIconAlign;
      const iconSizeOptions = {
        '(none)': '',
        'x-small': 'x-small',
        small: 'small',
        medium: 'medium',
        large: 'large',
      };
      const iconSize = select(
        'iconSize',
        iconSizeOptions,
        ''
      ) as ButtonIconSize;
      const menuSizeOptions = {
        '(none)': '',
        small: 'small',
        medium: 'medium',
        large: 'large',
      };
      const menuSize = select(
        'menuSize',
        menuSizeOptions,
        ''
      ) as DropdownMenuSize;
      const menuAlignOptions = {
        '(none)': '',
        left: 'left',
        center: 'center',
        right: 'right',
      };
      const menuAlign = select(
        'menuAlign',
        menuAlignOptions,
        ''
      ) as DropdownMenuAlign;
      const disabled = boolean('disabled', false);
      const hoverPopup = boolean('hoverPopup', false);
      const nubbinTop = boolean('nubbinTop', false);
      const cntStyles =
        type === 'inverse' ||
        type === 'icon-inverse' ||
        type === 'icon-border-inverse'
          ? darkBgStyle
          : type === 'icon-border-filled'
          ? lightBgStyle
          : {};
      return (
        <div style={cntStyles}>
          <DropdownButton
            type={type}
            size={size}
            label={label}
            icon={icon}
            iconAlign={iconAlign}
            iconSize={iconSize}
            menuSize={menuSize}
            menuAlign={menuAlign}
            disabled={disabled}
            hoverPopup={hoverPopup}
            nubbinTop={nubbinTop}
            onClick={action('click')}
            onMenuSelect={action('menuSelect')}
          >
            <MenuItem
              menuKey='1'
              icon={select('menuitem icon', iconOptions, '')}
              iconRight={select('menuitem iconRight', iconOptions, '')}
              disabled={boolean('menuitem disabled', false)}
            >
              Menu Item One
            </MenuItem>
            <MenuItem
              menuKey='2'
              icon={select('menuitem icon', iconOptions, '')}
              iconRight={select('menuitem iconRight', iconOptions, '')}
              disabled={boolean('menuitem disabled', false)}
            >
              Menu Item Two
            </MenuItem>
            <MenuItem
              menuKey='3'
              icon={select('menuitem icon', iconOptions, '')}
              iconRight={select('menuitem iconRight', iconOptions, '')}
              disabled={boolean('menuitem disabled', false)}
            >
              Menu Item Three
            </MenuItem>
          </DropdownButton>
        </div>
      );
    },
    { info: 'Dropdown button controlled with knobs' }
  )
  .add(
    'Default',
    () => (
      <DropdownButton
        label='Dropdown Button'
        onMenuSelect={action('menuSelect')}
      >
        <MenuItem menuKey={1}>Menu Item One</MenuItem>
        <MenuItem menuKey={2} disabled>
          Menu Item Two
        </MenuItem>
        <MenuItem menuKey={3}>Menu Item Three</MenuItem>
        <MenuItem menuKey={4} divider='top'>
          Menu Item Four
        </MenuItem>
      </DropdownButton>
    ),
    { info: 'Dropdown button with menu items' }
  )
  .add(
    'Neutral',
    () => (
      <DropdownButton
        type='neutral'
        label='Dropdown Button'
        onMenuSelect={action('menuSelect')}
      >
        <MenuItem menuKey={1}>Menu Item One</MenuItem>
        <MenuItem menuKey={2} disabled>
          Menu Item Two
        </MenuItem>
        <MenuItem menuKey={3}>Menu Item Three</MenuItem>
        <MenuItem menuKey={4} divider='top'>
          Menu Item Four
        </MenuItem>
      </DropdownButton>
    ),
    { info: 'Neutral dropdown button' }
  )
  .add(
    'Icon Bare',
    () => (
      <DropdownButton
        type='icon-bare'
        icon='settings'
        onMenuSelect={action('menuSelect')}
      >
        <MenuItem menuKey={1}>Menu Item One</MenuItem>
        <MenuItem menuKey={2} disabled>
          Menu Item Two
        </MenuItem>
        <MenuItem menuKey={3}>Menu Item Three</MenuItem>
        <MenuItem menuKey={4} divider='top'>
          Menu Item Four
        </MenuItem>
      </DropdownButton>
    ),
    { info: 'Icon bare dropdown button' }
  )
  .add(
    'Icon More',
    () => (
      <DropdownButton
        type='icon-more'
        icon='settings'
        onMenuSelect={action('menuSelect')}
      >
        <MenuItem menuKey={1}>Menu Item One</MenuItem>
        <MenuItem menuKey={2} disabled>
          Menu Item Two
        </MenuItem>
        <MenuItem menuKey={3}>Menu Item Three</MenuItem>
        <MenuItem menuKey={4} divider='top'>
          Menu Item Four
        </MenuItem>
      </DropdownButton>
    ),
    { info: 'Icon and more dropdown button' }
  )
  .add(
    'Left icon',
    () => (
      <DropdownButton
        type='icon-border'
        icon='down'
        onMenuSelect={action('menuSelect')}
      >
        <MenuItem menuKey={1} icon='check'>
          Menu Item One
        </MenuItem>
        <MenuItem menuKey={2} icon='none'>
          Menu Item Two
        </MenuItem>
        <MenuItem menuKey={3} icon='none'>
          Menu Item Three
        </MenuItem>
      </DropdownButton>
    ),
    { info: 'Dropdown button with icon in left side of menu items' }
  )
  .add(
    'Right icon',
    () => (
      <DropdownButton
        type='icon-border'
        icon='down'
        onMenuSelect={action('menuSelect')}
      >
        <MenuItem menuKey={1} iconRight='table'>
          Menu Item One
        </MenuItem>
        <MenuItem menuKey={2} iconRight='kanban'>
          Menu Item Two
        </MenuItem>
        <MenuItem menuKey={3} iconRight='side_list'>
          Menu Item Three
        </MenuItem>
      </DropdownButton>
    ),
    { info: 'Dropdown button with icon in right side of menu items' }
  )
  .add(
    'Left/Right icon',
    () => (
      <DropdownButton
        type='icon-border'
        icon='down'
        onMenuSelect={action('menuSelect')}
      >
        <MenuItem menuKey={1} icon='check' iconRight='table'>
          Menu Item One
        </MenuItem>
        <MenuItem menuKey={2} icon='none' iconRight='kanban'>
          Menu Item Two
        </MenuItem>
        <MenuItem menuKey={3} icon='none' iconRight='side_list'>
          Menu Item Three
        </MenuItem>
      </DropdownButton>
    ),
    { info: 'Dropdown button with icon in left/right side of menu items' }
  )
  .add(
    'Right aligned menu',
    () => (
      <div style={{ paddingLeft: 200 }}>
        <DropdownButton
          type='icon-border'
          icon='down'
          menuAlign='right'
          onMenuSelect={action('menuSelect')}
        >
          <MenuItem menuKey={1}>Menu Item One</MenuItem>
          <MenuItem menuKey={2} disabled>
            Menu Item Two
          </MenuItem>
          <MenuItem menuKey={3}>Menu Item Three</MenuItem>
          <MenuItem menuKey={4} divider='top'>
            Menu Item Four
          </MenuItem>
        </DropdownButton>
      </div>
    ),
    { info: 'Dropdown' }
  )
  .add(
    'Hover Popup',
    () => (
      <DropdownButton
        type='neutral'
        label='Dropdown Button'
        hoverPopup
        onMenuSelect={action('menuSelect')}
      >
        <MenuItem menuKey={1}>Menu Item One</MenuItem>
        <MenuItem menuKey={2} disabled>
          Menu Item Two
        </MenuItem>
        <MenuItem menuKey={3}>Menu Item Three</MenuItem>
        <MenuItem menuKey={4} divider='top'>
          Menu Item Four
        </MenuItem>
      </DropdownButton>
    ),
    { info: 'Dropdown is rendered in hover event' }
  )
  .add(
    'Nubbin in top',
    () => (
      <div style={{ paddingLeft: 100 }}>
        <DropdownButton
          type='icon-container'
          icon='settings'
          nubbinTop
          onMenuSelect={action('menuSelect')}
        >
          <MenuItem menuKey={1}>Menu Item One</MenuItem>
          <MenuItem menuKey={2} disabled>
            Menu Item Two
          </MenuItem>
          <MenuItem menuKey={3}>Menu Item Three</MenuItem>
          <MenuItem menuKey={4} divider='top'>
            Menu Item Four
          </MenuItem>
        </DropdownButton>
      </div>
    ),
    { info: 'Nubbin in top of the menu dropdown' }
  );
export default stories;
