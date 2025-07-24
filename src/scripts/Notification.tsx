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
  onClose?: EventHandler<MouseEvent<HTMLButtonElement>>;
} & HTMLAttributes<HTMLDivElement>;

export const Notification: FC<NotificationProps> = (props) => {
  const {
    className,
    type,
    level,
    alt,
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
    {
      [`slds-alert_${level}`]: type === 'alert' && level && level !== 'info',
    }
  );

  const iconEl = icon ? (
    <Icon
      containerClassName={classnames(
        type === 'toast' ? 'slds-m-right_small' : 'slds-m-right_x-small',
        type === 'alert' ? ['slds-no-flex', 'slds-align-top'] : null
      )}
      icon={icon}
      size={iconSize ?? (type === 'toast' ? 'small' : 'x-small')}
      fillColor='currentColor'
      textColor={level === 'warning' ? 'default' : null}
    />
  ) : undefined;

  return (
    <div className={alertClassNames} role='alert' {...pprops}>
      {alt ? <span className='slds-assistive-text'>{alt}</span> : undefined}
      {onClose ? (
        <div className='slds-notify__close'>
          <Button
            type='icon-inverse'
            icon='close'
            size={type === 'toast' ? undefined : 'small'}
            alt='Close'
            onClick={onClose}
          />
        </div>
      ) : undefined}
      {iconEl}
      {type === 'toast' ? (
        <div className='slds-notify__content'>
          <h2 className='slds-text-heading_small'>{children}</h2>
        </div>
      ) : (
        <h2>{children}</h2>
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
