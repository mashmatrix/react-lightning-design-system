import React, { MouseEvent, HTMLAttributes, EventHandler, FC } from 'react';
import classnames from 'classnames';
import { Button } from './Button';
import { Icon, IconSize } from './Icon';

const NOTIFICATION_TYPES = ['alert', 'toast'] as const;

const NOTIFICATION_LEVELS = ['info', 'success', 'warning', 'error'] as const;

export type NotificationType = (typeof NOTIFICATION_TYPES)[number];
export type NotificationLevel = (typeof NOTIFICATION_LEVELS)[number];

export type NotificationProps = {
  type?: NotificationType;
  level?: NotificationLevel;
  alt?: string;
  icon?: string;
  iconSize?: IconSize;
  alertTexture?: boolean;
  onClose?: EventHandler<MouseEvent<HTMLButtonElement>>;
} & HTMLAttributes<HTMLDivElement>;

export const Notification: FC<NotificationProps> = (props) => {
  const {
    className,
    type,
    level,
    alt,
    alertTexture = true,
    icon,
    iconSize = 'small',
    onClose,
    children,
    ...pprops
  } = props;
  const typeClassName =
    type && NOTIFICATION_TYPES.indexOf(type) >= 0
      ? `slds-notify_${type}`
      : null;
  const levelClassName =
    level && NOTIFICATION_LEVELS.indexOf(level) >= 0
      ? `slds-theme_${level}`
      : null;
  const alertClassNames = classnames(
    className,
    'slds-notify',
    typeClassName,
    levelClassName,
    alertTexture ? 'slds-theme_alert-texture' : null
  );

  const iconEl = icon ? (
    <Icon
      className={
        type === 'toast' ? 'slds-m-right_small' : 'slds-m-right_x-small'
      }
      icon={icon}
      size={iconSize}
      fillColor='none'
      textColor={level === 'warning' ? 'default' : null}
    />
  ) : undefined;

  return (
    <div className={alertClassNames} role='alert' {...pprops}>
      {alt ? <span className='slds-assistive-text'>{alt}</span> : undefined}
      {onClose ? (
        <Button
          className='slds-notify__close'
          type='icon-inverse'
          icon='close'
          iconSize={type === 'toast' ? 'large' : 'small'}
          alt='Close'
          onClick={onClose}
        />
      ) : undefined}
      {type === 'toast' ? (
        <div className='slds-notify__content slds-grid'>
          {iconEl}
          <div className='slds-col slds-align-middle'>
            <h2 className='slds-text-heading_small'>{children}</h2>
          </div>
        </div>
      ) : (
        <h2>
          {iconEl}
          {children}
        </h2>
      )}
    </div>
  );
};

export type AlertProps = Omit<NotificationProps, 'type'>;
export const Alert: FC<AlertProps> = (props) => (
  <Notification {...props} type='alert' />
);

export type ToastProps = Omit<NotificationProps, 'type'>;
export const Toast: FC<ToastProps> = (props) => (
  <Notification {...props} type='toast' />
);
