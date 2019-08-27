import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';
import { Notification, Alert, Toast, IconSize } from '../src/scripts';
import {
  NotificationType,
  NotificationLevel,
} from '../src/scripts/Notification';

storiesOf('Notification', module)
  .add(
    'Controlled with knobs',
    () => {
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
    { info: 'Notification controlled with knobs' }
  )
  .add(
    'Alert - Default',
    () => <Alert>This is default alert without close.</Alert>,
    { info: 'Default Alert' }
  )
  .add(
    'Alert - Info',
    () => (
      <Alert icon='info' level='info' onClose={action('close')}>
        This is <strong>info</strong> alert with icon and close button.
      </Alert>
    ),
    { info: 'Alert with info message and close button' }
  )
  .add(
    'Alert - Success',
    () => (
      <Alert icon='custom:custom19' level='success' onClose={action('close')}>
        This is <strong>success</strong> alert with icon and close button.
      </Alert>
    ),
    { info: 'Alert with success message and close button' }
  )
  .add(
    'Alert - Warning',
    () => (
      <Alert icon='warning' level='warning' onClose={action('close')}>
        This is <strong>warning</strong> alert with icon and close button.
      </Alert>
    ),
    { info: 'Alert with warning message and close button' }
  )
  .add(
    'Alert - Error',
    () => (
      <Alert icon='ban' level='error' onClose={action('close')}>
        This is <strong>error</strong> alert with icon and close button.
      </Alert>
    ),
    { info: 'Alert with error message and close button' }
  )
  .add(
    'Toast - Default',
    () => <Toast>This is default toast without close.</Toast>,
    { info: 'Default Toast' }
  )
  .add(
    'Toast - Info',
    () => (
      <Toast icon='info' level='success' onClose={action('close')}>
        This is <strong>success</strong> toast with icon and close button.
      </Toast>
    ),
    { info: 'Toast with info message and close button' }
  )
  .add(
    'Toast - Success',
    () => (
      <Toast icon='notification' level='success' onClose={action('close')}>
        This is <strong>success</strong> toast with icon and close button.
      </Toast>
    ),
    { info: 'Toast with success message and close button' }
  )
  .add(
    'Toast - Warning',
    () => (
      <Toast
        icon='warning'
        level='warning'
        onClose={action('close')}
        alertTexture={false}
      >
        This is <strong>warning</strong> toast with icon and close button.
      </Toast>
    ),
    { info: 'Toast with warning message and close button' }
  )
  .add(
    'Toast - Error',
    () => (
      <Toast
        icon='warning'
        level='error'
        onClose={action('close')}
        alertTexture={false}
      >
        This is <strong>error</strong> toast with icon and close button.
      </Toast>
    ),
    { info: 'Toast with error message and close button' }
  );
