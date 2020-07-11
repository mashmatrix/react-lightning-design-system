import React from 'react';
import classnames from 'classnames';
import { Button } from './Button';
import { Icon, IconSize } from './Icon';

const NOTIFICATION_TYPES = ['alert', 'toast'] as const;

const NOTIFICATION_LEVELS = ['info', 'success', 'warning', 'error'] as const;

export type NotificationType = typeof NOTIFICATION_TYPES[number];
export type NotificationLevel = typeof NOTIFICATION_LEVELS[number];

export type NotificationProps = {
  type?: NotificationType;
  className?: string;
  level?: NotificationLevel;
  alt?: string;
  icon?: string;
  iconSize?: IconSize;
  alertTexture?: boolean;
  onClose?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export const Notification: React.FC<NotificationProps> = (props) => {
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
      ? `slds-notify--${type}`
      : null;
  const levelClassName =
    level && NOTIFICATION_LEVELS.indexOf(level) >= 0
      ? `slds-theme--${level}`
      : null;
  const alertClassNames = classnames(
    className,
    'slds-notify',
    typeClassName,
    levelClassName,
    alertTexture ? 'slds-theme--alert-texture' : null
  );

  const iconEl = icon ? (
    <Icon
      className={
        type === 'toast' ? 'slds-m-right--small' : 'slds-m-right--x-small'
      }
      icon={icon}
      size={iconSize}
      fillColor='none'
      textColor={level === 'warning' ? 'default' : null}
    />
  ) : (
    undefined
  );

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
      ) : (
        undefined
      )}
      {type === 'toast' ? (
        <div className='slds-notify__content slds-grid'>
          {iconEl}
          <div className='slds-col slds-align-middle'>
            <h2 className='slds-text-heading--small'>{children}</h2>
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
export const Alert: React.FC<AlertProps> = (props) => (
  <Notification {...props} type='alert' />
);

export type ToastProps = Omit<NotificationProps, 'type'>;
export const Toast: React.FC<ToastProps> = (props) => (
  <Notification {...props} type='toast' />
);
