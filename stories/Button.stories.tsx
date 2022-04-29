import React from 'react';
import { Button } from '../src/scripts';
import {
  ComponentMeta,
  ComponentStoryObj,
  DecoratorFn,
} from '@storybook/react';

/**
 *
 */
const meta: ComponentMeta<typeof Button> = {
  title: 'Button',
  component: Button,
  argTypes: {
    onClick: { action: 'click' },
  },
};
export default meta;

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

const lightBgStyle = {
  backgroundColor: '#cccccc',
  padding: 4,
};

const lightBgDecorator: DecoratorFn = (Story) => (
  <div style={lightBgStyle}>
    <Story />
  </div>
);

/**
 *
 */
export const ControlledWithKnobs: ComponentStoryObj<typeof Button> = {
  render(args) {
    const type = args.type;
    const cntStyles =
      type === 'inverse' || type === 'icon-inverse'
        ? darkBgStyle
        : type === 'icon-border-filled'
        ? lightBgStyle
        : undefined;
    return cntStyles ? (
      <div style={cntStyles}>
        <Button {...args} />
      </div>
    ) : (
      <Button {...args} />
    );
  },
  name: 'Controlled with knobs',
  args: {
    label: 'Button',
  },
  parameters: {
    docs: {
      storyDescription: 'Button controlled with knobs',
    },
  },
};

/**
 *
 */
export const Reset: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Reset',
  },
  parameters: {
    docs: {
      storyDescription: 'Button with no type property assigned',
    },
  },
};

/**
 *
 */
export const Neutral: ComponentStoryObj<typeof Button> = {
  args: {
    type: 'neutral',
    children: 'Neutral',
  },
  parameters: {
    docs: {
      storyDescription: 'Neutral type button',
    },
  },
};

/**
 *
 */
export const NeutralDisabled: ComponentStoryObj<typeof Button> = {
  name: 'Neutral disabled',
  args: {
    type: 'neutral',
    disabled: true,
    children: 'Disabled Neutral',
  },
  parameters: {
    docs: {
      storyDescription: 'Neutral type button but disabled',
    },
  },
};

/**
 *
 */
export const Brand: ComponentStoryObj<typeof Button> = {
  args: {
    type: 'brand',
    children: 'Brand',
  },
  parameters: {
    docs: {
      storyDescription: 'Brand type button',
    },
  },
};

/**
 *
 */
export const BrandDisabled: ComponentStoryObj<typeof Button> = {
  name: 'Brand disabled',
  args: {
    type: 'brand',
    disabled: true,
    children: 'Disabled Brand',
  },
  parameters: {
    docs: {
      storyDescription: 'Brand type button but disabled',
    },
  },
};

/**
 *
 */
export const Destructive: ComponentStoryObj<typeof Button> = {
  args: {
    type: 'destructive',
    children: 'Destructive',
  },
  parameters: {
    docs: {
      storyDescription: 'Destructive type button',
    },
  },
};

/**
 *
 */
export const DestructiveDisabled: ComponentStoryObj<typeof Button> = {
  name: 'Destructive disabled',
  args: {
    type: 'destructive',
    disabled: true,
    children: 'Disabled Destructive',
  },
  parameters: {
    docs: {
      storyDescription: 'Destructive type button but disabled',
    },
  },
};

/**
 *
 */
export const NeutralWithLeftIcon: ComponentStoryObj<typeof Button> = {
  name: 'Neutral with left icon',
  args: {
    type: 'neutral',
    icon: 'download',
    iconAlign: 'left',
    children: 'Button Neutral',
  },
  parameters: {
    docs: {
      storyDescription: 'Neutral type button with download icon in left side',
    },
  },
};

/**
 *
 */
export const NeutralWithRightIcon: ComponentStoryObj<typeof Button> = {
  name: 'Neutral with right icon',
  args: {
    type: 'neutral',
    icon: 'down',
    iconAlign: 'right',
    children: 'Button Neutral',
  },
  parameters: {
    docs: {
      storyDescription: 'Neutral type button with down icon in right side',
    },
  },
};

/**
 *
 */
export const Inverse: ComponentStoryObj<typeof Button> = {
  args: {
    type: 'inverse',
    children: 'Inverse',
  },
  decorators: [darkBgDecorator],
  parameters: {
    docs: {
      storyDescription: 'Inverse type button in dark background',
    },
  },
};

/**
 *
 */
export const InverseDisabled: ComponentStoryObj<typeof Button> = {
  args: {
    type: 'inverse',
    disabled: true,
    children: 'Disabled Inverse',
  },
  decorators: [darkBgDecorator],
  parameters: {
    docs: {
      storyDescription: 'Inverse type button in dark background but disabled',
    },
  },
};

/**
 *
 */
export const ButtonIcon: ComponentStoryObj<typeof Button> = {
  args: {
    type: 'icon',
    icon: 'settings',
  },
  parameters: {
    docs: {
      storyDescription: 'Default button with icon',
    },
  },
};

/**
 *
 */
export const ButtonIconContainer: ComponentStoryObj<typeof Button> = {
  args: {
    type: 'icon-container',
    icon: 'settings',
  },
  parameters: {
    docs: {
      storyDescription: 'Button with icon in container',
    },
  },
};

/**
 *
 */
export const ButtonIconBorder: ComponentStoryObj<typeof Button> = {
  args: {
    type: 'icon-border',
    icon: 'settings',
  },
  parameters: {
    docs: {
      storyDescription: 'Button with icon of bordered',
    },
  },
};

/**
 *
 */
export const ButtonIconBorderAndFilled: ComponentStoryObj<typeof Button> = {
  name: 'Button Icon Border and Filled',
  args: {
    type: 'icon-border-filled',
    icon: 'settings',
  },
  decorators: [lightBgDecorator],
  parameters: {
    docs: {
      storyDescription: 'Button with icon of bordered and filled with white',
    },
  },
};

/**
 *
 */
export const ButtonIconInverse: ComponentStoryObj<typeof Button> = {
  args: {
    type: 'icon-inverse',
    icon: 'close',
  },
  decorators: [darkBgDecorator],
  parameters: {
    docs: {
      storyDescription: 'Button with icon in dark background',
    },
  },
};

/**
 *
 */
export const ButtonIconInverseInDarkBackground: ComponentStoryObj<
  typeof Button
> = {
  name: 'Button Icon Inverse in dark background',
  args: {
    type: 'icon-inverse',
    icon: 'close',
    disabled: true,
  },
  decorators: [darkBgDecorator],
  parameters: {
    docs: {
      storyDescription: 'Button with icon in dark background',
    },
  },
};
