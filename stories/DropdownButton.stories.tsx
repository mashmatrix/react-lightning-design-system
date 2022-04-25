import React from 'react';
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

export default {
  title: 'DropdownButton',
};

export const ControlledWithKnobs = () => {
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
  const iconSize = select('iconSize', iconSizeOptions, '') as ButtonIconSize;
  const menuSizeOptions = {
    '(none)': '',
    small: 'small',
    medium: 'medium',
    large: 'large',
  };
  const menuSize = select('menuSize', menuSizeOptions, '') as DropdownMenuSize;
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
          eventKey='1'
          icon={select('menuitem icon', iconOptions, '')}
          iconRight={select('menuitem iconRight', iconOptions, '')}
          disabled={boolean('menuitem disabled', false)}
        >
          Menu Item One
        </MenuItem>
        <MenuItem
          eventKey='2'
          icon={select('menuitem icon', iconOptions, '')}
          iconRight={select('menuitem iconRight', iconOptions, '')}
          disabled={boolean('menuitem disabled', false)}
        >
          Menu Item Two
        </MenuItem>
        <MenuItem
          eventKey='3'
          icon={select('menuitem icon', iconOptions, '')}
          iconRight={select('menuitem iconRight', iconOptions, '')}
          disabled={boolean('menuitem disabled', false)}
        >
          Menu Item Three
        </MenuItem>
      </DropdownButton>
    </div>
  );
};

ControlledWithKnobs.story = {
  name: 'Controlled with knobs',
  parameters: { info: 'Dropdown button controlled with knobs' },
};

export const Default = () => (
  <DropdownButton label='Dropdown Button' onMenuSelect={action('menuSelect')}>
    <MenuItem eventKey={1}>Menu Item One</MenuItem>
    <MenuItem eventKey={2} disabled>
      Menu Item Two
    </MenuItem>
    <MenuItem eventKey={3}>Menu Item Three</MenuItem>
    <MenuItem eventKey={4} divider='top'>
      Menu Item Four
    </MenuItem>
  </DropdownButton>
);

Default.story = {
  parameters: { info: 'Dropdown button with menu items' },
};

export const Neutral = () => (
  <DropdownButton
    type='neutral'
    label='Dropdown Button'
    onMenuSelect={action('menuSelect')}
  >
    <MenuItem eventKey={1}>Menu Item One</MenuItem>
    <MenuItem eventKey={2} disabled>
      Menu Item Two
    </MenuItem>
    <MenuItem eventKey={3}>Menu Item Three</MenuItem>
    <MenuItem eventKey={4} divider='top'>
      Menu Item Four
    </MenuItem>
  </DropdownButton>
);

Neutral.story = {
  parameters: { info: 'Neutral dropdown button' },
};

export const IconBare = () => (
  <DropdownButton
    type='icon-bare'
    icon='settings'
    onMenuSelect={action('menuSelect')}
  >
    <MenuItem eventKey={1}>Menu Item One</MenuItem>
    <MenuItem eventKey={2} disabled>
      Menu Item Two
    </MenuItem>
    <MenuItem eventKey={3}>Menu Item Three</MenuItem>
    <MenuItem eventKey={4} divider='top'>
      Menu Item Four
    </MenuItem>
  </DropdownButton>
);

IconBare.story = {
  parameters: { info: 'Icon bare dropdown button' },
};

export const IconMore = () => (
  <DropdownButton
    type='icon-more'
    icon='settings'
    onMenuSelect={action('menuSelect')}
  >
    <MenuItem eventKey={1}>Menu Item One</MenuItem>
    <MenuItem eventKey={2} disabled>
      Menu Item Two
    </MenuItem>
    <MenuItem eventKey={3}>Menu Item Three</MenuItem>
    <MenuItem eventKey={4} divider='top'>
      Menu Item Four
    </MenuItem>
  </DropdownButton>
);

IconMore.story = {
  parameters: { info: 'Icon and more dropdown button' },
};

export const LeftIcon = () => (
  <DropdownButton
    type='icon-border'
    icon='down'
    onMenuSelect={action('menuSelect')}
  >
    <MenuItem eventKey={1} icon='check'>
      Menu Item One
    </MenuItem>
    <MenuItem eventKey={2} icon='none'>
      Menu Item Two
    </MenuItem>
    <MenuItem eventKey={3} icon='none'>
      Menu Item Three
    </MenuItem>
  </DropdownButton>
);

LeftIcon.story = {
  name: 'Left icon',
  parameters: { info: 'Dropdown button with icon in left side of menu items' },
};

export const RightIcon = () => (
  <DropdownButton
    type='icon-border'
    icon='down'
    onMenuSelect={action('menuSelect')}
  >
    <MenuItem eventKey={1} iconRight='table'>
      Menu Item One
    </MenuItem>
    <MenuItem eventKey={2} iconRight='kanban'>
      Menu Item Two
    </MenuItem>
    <MenuItem eventKey={3} iconRight='side_list'>
      Menu Item Three
    </MenuItem>
  </DropdownButton>
);

RightIcon.story = {
  name: 'Right icon',
  parameters: { info: 'Dropdown button with icon in right side of menu items' },
};

export const LeftRightIcon = () => (
  <DropdownButton
    type='icon-border'
    icon='down'
    onMenuSelect={action('menuSelect')}
  >
    <MenuItem eventKey={1} icon='check' iconRight='table'>
      Menu Item One
    </MenuItem>
    <MenuItem eventKey={2} icon='none' iconRight='kanban'>
      Menu Item Two
    </MenuItem>
    <MenuItem eventKey={3} icon='none' iconRight='side_list'>
      Menu Item Three
    </MenuItem>
  </DropdownButton>
);

LeftRightIcon.story = {
  name: 'Left/Right icon',
  parameters: {
    info: 'Dropdown button with icon in left/right side of menu items',
  },
};

export const RightAlignedMenu = () => (
  <div style={{ paddingLeft: 200 }}>
    <DropdownButton
      type='icon-border'
      icon='down'
      menuAlign='right'
      onMenuSelect={action('menuSelect')}
    >
      <MenuItem eventKey={1}>Menu Item One</MenuItem>
      <MenuItem eventKey={2} disabled>
        Menu Item Two
      </MenuItem>
      <MenuItem eventKey={3}>Menu Item Three</MenuItem>
      <MenuItem eventKey={4} divider='top'>
        Menu Item Four
      </MenuItem>
    </DropdownButton>
  </div>
);

RightAlignedMenu.story = {
  name: 'Right aligned menu',
  parameters: { info: 'Dropdown' },
};

export const HoverPopup = () => (
  <DropdownButton
    type='neutral'
    label='Dropdown Button'
    hoverPopup
    onMenuSelect={action('menuSelect')}
  >
    <MenuItem eventKey={1}>Menu Item One</MenuItem>
    <MenuItem eventKey={2} disabled>
      Menu Item Two
    </MenuItem>
    <MenuItem eventKey={3}>Menu Item Three</MenuItem>
    <MenuItem eventKey={4} divider='top'>
      Menu Item Four
    </MenuItem>
  </DropdownButton>
);

HoverPopup.story = {
  parameters: { info: 'Dropdown is rendered in hover event' },
};

export const NubbinInTop = () => (
  <div style={{ paddingLeft: 100 }}>
    <DropdownButton
      type='icon-container'
      icon='settings'
      nubbinTop
      onMenuSelect={action('menuSelect')}
    >
      <MenuItem eventKey={1}>Menu Item One</MenuItem>
      <MenuItem eventKey={2} disabled>
        Menu Item Two
      </MenuItem>
      <MenuItem eventKey={3}>Menu Item Three</MenuItem>
      <MenuItem eventKey={4} divider='top'>
        Menu Item Four
      </MenuItem>
    </DropdownButton>
  </div>
);

NubbinInTop.story = {
  name: 'Nubbin in top',
  parameters: { info: 'Nubbin in top of the menu dropdown' },
};
