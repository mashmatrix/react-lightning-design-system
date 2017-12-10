import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { select, text, boolean } from '@storybook/addon-knobs';
import { Notification, Alert, Toast } from '../src/scripts';

storiesOf('Notification', module)
  .addWithInfo('Controlled with knobs', 'Notification controlled with knobs', () => {
    const typeOptions = {
      alert: 'alert',
      toast: 'toast',
    };
    const icon = text('icon');
    const iconSize = select('iconSize', {
      '': '(none)',
      'x-small': 'x-small',
      small: 'small',
      medium: 'medium',
      large: 'large',
    });
    const level = select('level', {
      '': '(none)',
      info: 'info',
      success: 'success',
      warning: 'warning',
      error: 'error',
    });
    const type = select('type', typeOptions, 'alert');
    const notificationText = text('notificationText', 'This is notification text.');
    const alertTexture = boolean('alertTexture', true);
    return (
      <Notification
        type={ type } level={ level }
        icon={ icon } iconSize={ iconSize }
        alertTexture={ alertTexture }
        onClose={ action('close') }
      >
        { notificationText }
      </Notification>
    );
  })
  .addWithInfo('Alert - Default', 'Default Alert', () => (
    <Alert>This is default alert without close.</Alert>
  ))
  .addWithInfo('Alert - Info', 'Alert with info message and close button', () => (
    <Alert icon='info' level='info' onClose={ action('close') }>
      This is <strong>info</strong> alert with icon and close button.
    </Alert>
  ))
  .addWithInfo('Alert - Success', 'Alert with success message and close button', () => (
    <Alert icon='custom:custom19' level='success' onClose={ action('close') }>
      This is <strong>success</strong> alert with icon and close button.
    </Alert>
  ))
  .addWithInfo('Alert - Warning', 'Alert with warning message and close button', () => (
    <Alert icon='warning' level='warning' onClose={ action('close') }>
      This is <strong>warning</strong> alert with icon and close button.
    </Alert>
  ))
  .addWithInfo('Alert - Error', 'Alert with error message and close button', () => (
    <Alert icon='ban' level='error' onClose={ action('close') }>
      This is <strong>error</strong> alert with icon and close button.
    </Alert>
  ))
  .addWithInfo('Toast - Default', 'Default Toast', () => (
    <Toast>This is default toast without close.</Toast>
  ))
  .addWithInfo('Toast - Info', 'Toast with info message and close button', () => (
    <Toast icon='info' level='success' onClose={ action('close') }>
      This is <strong>success</strong> toast with icon and close button.
    </Toast>
  ))
  .addWithInfo('Toast - Success', 'Toast with success message and close button', () => (
    <Toast icon='notification' level='success' onClose={ action('close') }>
      This is <strong>success</strong> toast with icon and close button.
    </Toast>
  ))
  .addWithInfo('Toast - Warning', 'Toast with warning message and close button', () => (
    <Toast icon='warning' level='warning' onClose={ action('close') } alertTexture={ false }>
      This is <strong>warning</strong> toast with icon and close button.
    </Toast>
  ))
  .addWithInfo('Toast - Error', 'Toast with error message and close button', () => (
    <Toast icon='warning' level='error' onClose={ action('close') } alertTexture={ false }>
      This is <strong>error</strong> toast with icon and close button.
    </Toast>
  ))
;
