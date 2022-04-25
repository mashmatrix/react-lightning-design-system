import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean, select } from '@storybook/addon-knobs';
import { Button } from '../src/scripts';
import {
  ButtonType,
  ButtonSize,
  ButtonIconAlign,
  ButtonIconSize,
} from '../src/scripts/Button';
const darkBgStyle = {
  backgroundColor: '#16325c',
  padding: 4,
};
const lightBgStyle = {
  backgroundColor: '#cccccc',
  padding: 4,
};
export default {
  title: 'Button',
};
export const ControlledWithKnobs = {
  render: () => {
    const typeOptions = {
      '(none)': '',
      neutral: 'neutral',
      brand: 'brand',
      destructive: 'destructive',
      icon: 'icon',
      'icon-bare': 'icon-bare',
      'icon-container': 'icon-container',
      'icon-border': 'icon-border',
      'icon-border-filled': 'icon-border-filled',
      inverse: 'inverse',
      'icon-inverse': 'icon-inverse',
    };
    const type = select('type', typeOptions, '') as ButtonType;
    const sizeOptions = {
      '(none)': '',
      'x-small': 'x-small',
      small: 'small',
      medium: 'medium',
    };
    const size = select('size', sizeOptions, '') as ButtonSize;
    const label = text('label', 'Button');
    const iconOptions = {
      '(none)': '',
      download: 'download',
      down: 'down',
      task: 'task',
      settings: 'settings',
      close: 'close',
    };
    const icon = select('icon', iconOptions, '');
    const iconAlignOptions = {
      '(none)': '',
      left: 'left',
      right: 'right',
    };
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
    const disabled = boolean('disabled', false);
    const cntStyles =
      type === 'inverse' || type === 'icon-inverse'
        ? darkBgStyle
        : type === 'icon-border-filled'
        ? lightBgStyle
        : {};
    return (
      <div style={cntStyles}>
        <Button
          type={type}
          size={size}
          label={label}
          icon={icon}
          iconAlign={iconAlign}
          iconSize={iconSize}
          disabled={disabled}
          onClick={action('clicked')}
        />
      </div>
    );
  },
  name: 'Controlled with knobs',
  parameters: {
    info: 'Button controlled with knobs',
  },
};
export const Reset = {
  render: () => <Button onClick={action('clicked')}>Reset</Button>,
  parameters: {
    info: 'Button with no type property assigned',
  },
};
export const Neutral = {
  render: () => (
    <Button type='neutral' onClick={action('neutral clicked')}>
      Neutral
    </Button>
  ),
  parameters: {
    info: 'Neutral type button',
  },
};
export const NeutralDisabled = {
  render: () => (
    <Button type='neutral' disabled onClick={action('should not be clicked')}>
      Disabled Neutral
    </Button>
  ),
  name: 'Neutral disabled',
  parameters: {
    info: 'Neutral type button but disabled',
  },
};
export const Brand = {
  render: () => (
    <Button type='brand' onClick={action('brand clicked')}>
      Brand
    </Button>
  ),
  parameters: {
    info: 'Brand type button',
  },
};
export const BrandDisabled = {
  render: () => (
    <Button type='brand' disabled onClick={action('should not be clicked')}>
      Disabled Brand
    </Button>
  ),
  name: 'Brand disabled',
  parameters: {
    info: 'Brand type button but disabled',
  },
};
export const Destructive = {
  render: () => (
    <Button type='destructive' onClick={action('destructive clicked')}>
      Destructive
    </Button>
  ),
  parameters: {
    info: 'Destructive type button',
  },
};
export const DestructiveDisabled = {
  render: () => (
    <Button
      type='destructive'
      disabled
      onClick={action('should not be clicked')}
    >
      Disabled Destructive
    </Button>
  ),
  name: 'Destructive disabled',
  parameters: {
    info: 'Destructive type button but disabled',
  },
};
export const NeutralWithLeftIcon = {
  render: () => (
    <Button
      type='neutral'
      icon='download'
      iconAlign='left'
      onClick={action('neutral button icon left clicked')}
    >
      Button Neutral
    </Button>
  ),
  name: 'Neutral with left icon',
  parameters: {
    info: 'Neutral type button with download icon in left side',
  },
};
export const NeutralWithRightIcon = {
  render: () => (
    <Button
      type='neutral'
      icon='down'
      iconAlign='right'
      onClick={action('neutral button icon right clicked')}
    >
      Button Neutral
    </Button>
  ),
  name: 'Neutral with right icon',
  parameters: {
    info: 'Neutral type button with down icon in right side',
  },
};
export const Inverse = {
  render: () => (
    <div style={darkBgStyle}>
      <Button type='inverse' onClick={action('inverse button clicked')}>
        Inverse
      </Button>
    </div>
  ),
  parameters: {
    info: 'Inverse type button in dark background',
  },
};
export const InverseDisabled = {
  render: () => (
    <div style={darkBgStyle}>
      <Button type='inverse' disabled onClick={action('should not be clicked')}>
        Disabled Inverse
      </Button>
    </div>
  ),
  parameters: {
    info: 'Inverse type button in dark background but disabled',
  },
};
export const ButtonIcon = {
  render: () => (
    <Button
      type='icon'
      icon='settings'
      onClick={action('button icon clicked')}
    />
  ),
  parameters: {
    info: 'Default button with icon',
  },
};
export const ButtonIconContainer = {
  render: () => (
    <Button
      type='icon-container'
      icon='settings'
      onClick={action('button icon container button clicked')}
    />
  ),
  parameters: {
    info: 'Button with icon in container',
  },
};
export const ButtonIconBorder = {
  render: () => (
    <Button
      type='icon-border'
      icon='settings'
      onClick={action('button icon border clicked')}
    />
  ),
  parameters: {
    info: 'Button with icon of bordered',
  },
};
export const ButtonIconBorderAndFilled = {
  render: () => (
    <div style={lightBgStyle}>
      <Button
        type='icon-border-filled'
        icon='settings'
        onClick={action('button icon border and filled button clicked')}
      />
    </div>
  ),
  name: 'Button Icon Border and Filled',
  parameters: {
    info: 'Button with icon of bordered and filled with white',
  },
};
export const ButtonIconInverse = {
  render: () => (
    <div style={darkBgStyle}>
      <Button
        type='icon-inverse'
        icon='close'
        onClick={action('button icon inverse button clicked')}
      />
    </div>
  ),
  parameters: {
    info: 'Button with icon in dark background',
  },
};
export const ButtonIconInverseInDarkBackground = {
  render: () => (
    <div style={darkBgStyle}>
      <Button
        type='icon-inverse'
        icon='close'
        disabled
        onClick={action('should not be clicked')}
      />
    </div>
  ),
  name: 'Button Icon Inverse in dark background',
  parameters: {
    info: 'Button with icon in dark background',
  },
};
