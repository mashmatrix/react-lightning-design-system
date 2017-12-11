import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { select, text, boolean } from '@storybook/addon-knobs';
import { Notification, Alert, Toast } from '../src/scripts';

storiesOf('Notification', module)
  .add('Controlled with knobs', withInfo('Notification controlled with knobs')(() => {
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
  }))
  .add('Alert - Default', withInfo('Default Alert')(() => (
    <Alert>This is default alert without close.</Alert>
  )))
  .add('Alert - Info', withInfo('Alert with info message and close button')(() => (
    <Alert icon='info' level='info' onClose={ action('close') }>
      This is <strong>info</strong> alert with icon and close button.
    </Alert>
  )))
  .add('Alert - Success', withInfo('Alert with success message and close button')(() => (
    <Alert icon='custom:custom19' level='success' onClose={ action('close') }>
      This is <strong>success</strong> alert with icon and close button.
    </Alert>
  )))
  .add('Alert - Warning', withInfo('Alert with warning message and close button')(() => (
    <Alert icon='warning' level='warning' onClose={ action('close') }>
      This is <strong>warning</strong> alert with icon and close button.
    </Alert>
  )))
  .add('Alert - Error', withInfo('Alert with error message and close button')(() => (
    <Alert icon='ban' level='error' onClose={ action('close') }>
      This is <strong>error</strong> alert with icon and close button.
    </Alert>
  )))
  .add('Toast - Default', withInfo('Default Toast')(() => (
    <Toast>This is default toast without close.</Toast>
  )))
  .add('Toast - Info', withInfo('Toast with info message and close button')(() => (
    <Toast icon='info' level='success' onClose={ action('close') }>
      This is <strong>success</strong> toast with icon and close button.
    </Toast>
  )))
  .add('Toast - Success', withInfo('Toast with success message and close button')(() => (
    <Toast icon='notification' level='success' onClose={ action('close') }>
      This is <strong>success</strong> toast with icon and close button.
    </Toast>
  )))
  .add('Toast - Warning', withInfo('Toast with warning message and close button')(() => (
    <Toast icon='warning' level='warning' onClose={ action('close') } alertTexture={ false }>
      This is <strong>warning</strong> toast with icon and close button.
    </Toast>
  )))
  .add('Toast - Error', withInfo('Toast with error message and close button')(() => (
    <Toast icon='warning' level='error' onClose={ action('close') } alertTexture={ false }>
      This is <strong>error</strong> toast with icon and close button.
    </Toast>
  )))
;
