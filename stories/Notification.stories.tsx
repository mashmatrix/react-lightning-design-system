import React from 'react';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';
import { Notification, Alert, Toast, IconSize } from '../src/scripts';
import {
  NotificationType,
  NotificationLevel,
} from '../src/scripts/Notification';
export default {
  title: 'Notification',
};
export const ControlledWithKnobs = {
  render: () => {
    const typeOptions = {
      alert: 'alert',
      toast: 'toast',
    };
    const icon = text('icon', '');
    const iconSize = select(
      'iconSize',
      {
        '(none)': '',
        'x-small': 'x-small',
        small: 'small',
        medium: 'medium',
        large: 'large',
      },
      ''
    ) as IconSize;
    const level = select(
      'level',
      {
        '(none)': '',
        info: 'info',
        success: 'success',
        warning: 'warning',
        error: 'error',
      },
      ''
    ) as NotificationLevel;
    const type = select('type', typeOptions, 'alert') as NotificationType;
    const notificationText = text(
      'notificationText',
      'This is notification text.'
    );
    const alertTexture = boolean('alertTexture', true);
    return (
      <Notification
        type={type}
        level={level}
        icon={icon}
        iconSize={iconSize}
        alertTexture={alertTexture}
        onClose={action('close')}
      >
        {notificationText}
      </Notification>
    );
  },
  name: 'Controlled with knobs',
  parameters: {
    info: 'Notification controlled with knobs',
  },
};
export const AlertDefault = {
  render: () => <Alert>This is default alert without close.</Alert>,
  name: 'Alert - Default',
  parameters: {
    info: 'Default Alert',
  },
};
export const AlertInfo = {
  render: () => (
    <Alert icon='info' level='info' onClose={action('close')}>
      This is <strong>info</strong> alert with icon and close button.
    </Alert>
  ),
  name: 'Alert - Info',
  parameters: {
    info: 'Alert with info message and close button',
  },
};
export const AlertSuccess = {
  render: () => (
    <Alert icon='custom:custom19' level='success' onClose={action('close')}>
      This is <strong>success</strong> alert with icon and close button.
    </Alert>
  ),
  name: 'Alert - Success',
  parameters: {
    info: 'Alert with success message and close button',
  },
};
export const AlertWarning = {
  render: () => (
    <Alert icon='warning' level='warning' onClose={action('close')}>
      This is <strong>warning</strong> alert with icon and close button.
    </Alert>
  ),
  name: 'Alert - Warning',
  parameters: {
    info: 'Alert with warning message and close button',
  },
};
export const AlertError = {
  render: () => (
    <Alert icon='ban' level='error' onClose={action('close')}>
      This is <strong>error</strong> alert with icon and close button.
    </Alert>
  ),
  name: 'Alert - Error',
  parameters: {
    info: 'Alert with error message and close button',
  },
};
export const ToastDefault = {
  render: () => <Toast>This is default toast without close.</Toast>,
  name: 'Toast - Default',
  parameters: {
    info: 'Default Toast',
  },
};
export const ToastInfo = {
  render: () => (
    <Toast icon='info' level='info' onClose={action('close')}>
      This is <strong>info</strong> toast with icon and close button.
    </Toast>
  ),
  name: 'Toast - Info',
  parameters: {
    info: 'Toast with info message and close button',
  },
};
export const ToastSuccess = {
  render: () => (
    <Toast icon='notification' level='success' onClose={action('close')}>
      This is <strong>success</strong> toast with icon and close button.
    </Toast>
  ),
  name: 'Toast - Success',
  parameters: {
    info: 'Toast with success message and close button',
  },
};
export const ToastWarning = {
  render: () => (
    <Toast
      icon='warning'
      level='warning'
      onClose={action('close')}
      alertTexture={false}
    >
      This is <strong>warning</strong> toast with icon and close button.
    </Toast>
  ),
  name: 'Toast - Warning',
  parameters: {
    info: 'Toast with warning message and close button',
  },
};
export const ToastError = {
  render: () => (
    <Toast
      icon='warning'
      level='error'
      onClose={action('close')}
      alertTexture={false}
    >
      This is <strong>error</strong> toast with icon and close button.
    </Toast>
  ),
  name: 'Toast - Error',
  parameters: {
    info: 'Toast with error message and close button',
  },
};
