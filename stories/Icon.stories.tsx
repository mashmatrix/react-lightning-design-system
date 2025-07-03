import React, { ComponentProps, FC, ReactNode } from 'react';
import { Icon } from '../src/scripts/Icon';
import { Meta, StoryObj } from '@storybook/react';

/**
 *
 */
const ListEntry: FC<{ title: string; children?: ReactNode }> = ({
  children,
  title,
}) => (
  <li
    className='slds-p-around_small'
    style={{
      float: 'left',
      padding: '1.5rem',
      textAlign: 'center',
      width: '10rem',
      height: '5rem',
    }}
  >
    <figure>
      {children}
      <figcaption>{title}</figcaption>
    </figure>
  </li>
);

type StoryProps = ComponentProps<typeof Icon> & {
  xxsmall_onClick?: ComponentProps<typeof Icon>['onClick'];
  xsmall_onClick?: ComponentProps<typeof Icon>['onClick'];
  small_onClick?: ComponentProps<typeof Icon>['onClick'];
  medium_onClick?: ComponentProps<typeof Icon>['onClick'];
  large_onClick?: ComponentProps<typeof Icon>['onClick'];
  icons?: ComponentProps<typeof Icon>[];
};

/**
 *
 */
const meta: Meta<StoryProps> = {
  title: 'Icon',
  component: Icon,
  argTypes: {
    onClick: { action: 'click' },
  },
};
export default meta;

/**
 *
 */
export const ControlledWithKnobs: StoryObj<ComponentProps<typeof Icon>> = {
  name: 'Controlled with knobs',
  args: {
    category: 'standard',
    size: 'medium',
    icon: 'account',
  },
  parameters: {
    docs: {
      storyDescription: 'Icon controlled with knobs',
    },
  },
};

/**
 *
 */
export const Sizes: StoryObj<StoryProps> = {
  render: ({
    xxsmall_onClick,
    xsmall_onClick,
    small_onClick,
    medium_onClick,
    large_onClick,
  }) => (
    <div>
      <Icon icon='standard:case' size='xx-small' onClick={xxsmall_onClick} />
      <span className='slds-p-right_small' />
      <Icon icon='standard:case' size='x-small' onClick={xsmall_onClick} />
      <span className='slds-p-right_small' />
      <Icon icon='standard:case' size='small' onClick={small_onClick} />
      <span className='slds-p-right_small' />
      <Icon icon='standard:case' size='medium' onClick={medium_onClick} />
      <span className='slds-p-right_small' />
      <Icon icon='standard:case' size='large' onClick={large_onClick} />
    </div>
  ),
  argTypes: {
    xxsmall_onClick: { action: 'xx-small:click' },
    xsmall_onClick: { action: 'x-small:click' },
    small_onClick: { action: 'small:click' },
    medium_onClick: { action: 'medium:click' },
    large_onClick: { action: 'large:click' },
  },
  parameters: {
    docs: {
      storyDescription:
        'Icon with different size (xx-small, x-small, small, medium, large)',
    },
  },
};

/**
 *
 */
export const StandardIcons: StoryObj<StoryProps> = {
  render: ({ icons }) => (
    <ul className='slds-clearfix'>
      {icons?.map((icon, i) => (
        <ListEntry key={i} title={icon.icon}>
          <Icon {...icon} />
        </ListEntry>
      ))}
    </ul>
  ),
  args: {
    icons: Icon.ICONS.STANDARD_ICONS.map((icon) => ({
      icon,
      category: 'standard',
    })),
  },
  parameters: {
    docs: {
      storyDescription: 'Icons in standard category',
    },
  },
};

/**
 *
 */
export const CustomIcons: StoryObj<StoryProps> = {
  ...StandardIcons,
  args: {
    icons: Icon.ICONS.CUSTOM_ICONS.map((icon) => ({
      icon,
      category: 'custom',
    })),
  },
  parameters: {
    docs: {
      storyDescription: 'Icons in custom category',
    },
  },
};

/**
 *
 */
export const ActionIcons: StoryObj<StoryProps> = {
  ...StandardIcons,
  args: {
    icons: Icon.ICONS.ACTION_ICONS.map((icon) => ({
      icon,
      category: 'action',
      circleContainer: true,
      size: 'small',
    })),
  },
  parameters: {
    docs: {
      storyDescription: 'Icons in action category',
    },
  },
};

/**
 *
 */
export const DoctypeIcons: StoryObj<StoryProps> = {
  ...StandardIcons,
  args: {
    icons: Icon.ICONS.DOCTYPE_ICONS.map((icon) => ({
      icon,
      category: 'doctype',
    })),
  },
  parameters: {
    docs: {
      storyDescription: 'Icons in doctype category',
    },
  },
};

/**
 *
 */
export const UtilityIcons: StoryObj<StoryProps> = {
  ...StandardIcons,
  args: {
    icons: Icon.ICONS.UTILITY_ICONS.map((icon) => ({
      icon,
      category: 'utility',
    })),
  },
  parameters: {
    docs: {
      storyDescription: 'Icons in utility category',
    },
  },
};
