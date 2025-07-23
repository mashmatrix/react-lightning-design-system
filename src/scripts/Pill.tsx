import React, {
  HTMLAttributes,
  MouseEvent,
  KeyboardEvent,
  Ref,
  FC,
} from 'react';
import classnames from 'classnames';
import { Icon, IconCategory } from './Icon';
import { Button } from './Button';
import { useEventCallback } from './hooks';

/**
 *
 */
export type PillProps = {
  label?: string;
  title?: string;
  truncate?: boolean;
  disabled?: boolean;
  icon?: {
    category?: IconCategory;
    icon?: string;
  };
  pillRef?: Ref<HTMLElement>;
  onRemove?: () => void;
} & HTMLAttributes<HTMLSpanElement>;

/**
 *
 */
export const Pill: FC<PillProps> = (props) => {
  const {
    icon,
    disabled,
    label,
    title,
    truncate,
    className,
    pillRef,
    onClick,
    onRemove,
  } = props;
  const onPillRemove = useEventCallback(
    (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onRemove?.();
    }
  );

  const onKeyDown = useEventCallback((e: KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === 8 || e.keyCode === 46) {
      // Bacspace / DEL
      onPillRemove(e);
    }
  });

  const pillClassNames = classnames(
    'slds-pill',
    { 'slds-pill_link': !disabled },
    { 'slds-truncate': truncate },
    className
  );
  return (
    <span
      ref={pillRef}
      className={pillClassNames}
      onKeyDown={onKeyDown}
      onClick={onClick}
    >
      {icon && icon.icon ? (
        <span className='slds-pill__icon_container'>
          <Icon category={icon.category} icon={icon.icon} />
        </span>
      ) : undefined}
      {disabled ? (
        <span className='slds-pill__label' title={title}>
          {label}
        </span>
      ) : (
        <a className='slds-pill__action' title={title}>
          <span className='slds-pill__label'>{label}</span>
        </a>
      )}
      <Button
        disabled={disabled}
        className='slds-pill__remove'
        type='icon'
        icon='close'
        alt='Remove'
        tabIndex={-1}
        onClick={onPillRemove}
      />
    </span>
  );
};
