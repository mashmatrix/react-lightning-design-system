import React from 'react';
import { Notification, Alert, Toast } from '../src/scripts';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

/**
 *
 */
const meta: ComponentMeta<typeof Notification> = {
  title: 'Notification',
  component: Notification,
  subcomponents: { Alert, Toast },
};
export default meta;

/**
 *
 */
export const ControlledWithKnobs: ComponentStoryObj<typeof Notification> = {
  name: 'Controlled with knobs',
  args: {
    type: 'alert',
    children: 'This is notification text.',
  },
  argTypes: {
    onClose: { action: 'close' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Notification controlled with knobs',
      },
    },
  },
};

/**
 *
 */
export const AlertDefault: ComponentStoryObj<typeof Alert> = {
  render: (args) => <Alert {...args} />,
  name: 'Alert - Default',
  args: {
    children: 'This is default alert without close.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default Alert',
      },
    },
  },
};

/**
 *
 */
export const AlertInfo: ComponentStoryObj<typeof Alert> = {
  ...AlertDefault,
  name: 'Alert - Info',
  args: {
    icon: 'info',
    level: 'info',
    children: (
      <>
        This is <strong>info</strong> alert with icon and close button.
      </>
    ),
  },
  argTypes: {
    onClose: { action: 'close' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert with info message and close button',
      },
    },
  },
};

/**
 *
 */
export const AlertSuccess: ComponentStoryObj<typeof Alert> = {
  ...AlertDefault,
  name: 'Alert - Success',
  args: {
    icon: 'custom:custom19',
    level: 'success',
    children: (
      <>
        This is <strong>success</strong> alert with icon and close button.
      </>
    ),
  },
  argTypes: {
    onClose: { action: 'close' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert with success message and close button',
      },
    },
  },
};

/**
 *
 */
export const AlertWarning: ComponentStoryObj<typeof Alert> = {
  ...AlertDefault,
  name: 'Alert - Warning',
  args: {
    icon: 'warning',
    level: 'warning',
    children: (
      <>
        This is <strong>warning</strong> alert with icon and close button.
      </>
    ),
  },
  argTypes: {
    onClose: { action: 'close' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert with warning message and close button',
      },
    },
  },
};

/**
 *
 */
export const AlertError: ComponentStoryObj<typeof Alert> = {
  ...AlertDefault,
  name: 'Alert - Error',
  args: {
    icon: 'ban',
    level: 'error',
    children: (
      <>
        This is <strong>error</strong> alert with icon and close button.
      </>
    ),
  },
  argTypes: {
    onClose: { action: 'close' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert with error message and close button',
      },
    },
  },
};

/**
 *
 */
export const ToastDefault: ComponentStoryObj<typeof Toast> = {
  render: (args) => <Toast {...args} />,
  name: 'Toast - Default',
  args: {
    children: 'This is default toast without close.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default Toast',
      },
    },
  },
};

/**
 *
 */
export const ToastInfo: ComponentStoryObj<typeof Toast> = {
  ...ToastDefault,
  name: 'Toast - Info',
  args: {
    icon: 'info',
    level: 'info',
    children: (
      <>
        This is <strong>info</strong> toast with icon and close button.
      </>
    ),
  },
  argTypes: {
    onClose: { action: 'close' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast with info message and close button',
      },
    },
  },
};

/**
 *
 */
export const ToastSuccess: ComponentStoryObj<typeof Toast> = {
  ...ToastDefault,
  name: 'Toast - Success',
  args: {
    icon: 'notification',
    level: 'success',
    children: (
      <>
        This is <strong>success</strong> toast with icon and close button.
      </>
    ),
  },
  argTypes: {
    onClose: { action: 'close' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast with success message and close button',
      },
    },
  },
};

/**
 *
 */
export const ToastWarning: ComponentStoryObj<typeof Toast> = {
  ...ToastDefault,
  name: 'Toast - Warning',
  args: {
    icon: 'warning',
    level: 'warning',
    children: (
      <>
        This is <strong>warning</strong> toast with icon and close button.
      </>
    ),
  },
  argTypes: {
    onClose: { action: 'close' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast with warning message and close button',
      },
    },
  },
};

/**
 *
 */
export const ToastError: ComponentStoryObj<typeof Toast> = {
  ...ToastDefault,
  name: 'Toast - Error',
  args: {
    icon: 'warning',
    level: 'error',
    children: (
      <>
        This is <strong>error</strong> toast with icon and close button.
      </>
    ),
  },
  argTypes: {
    onClose: { action: 'close' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast with error message and close button',
      },
    },
  },
};
