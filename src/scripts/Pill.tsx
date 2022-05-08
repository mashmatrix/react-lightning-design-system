import React, {
  ReactHTML,
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
  truncate?: boolean;
  disabled?: boolean;
  tag?: keyof ReactHTML;
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
    tag,
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag: any = disabled ? 'span' : tag || 'a';
  const pillClassNames = classnames(
    'slds-pill',
    { 'slds-truncate': truncate },
    className
  );
  return (
    <Tag
      ref={pillRef}
      className={pillClassNames}
      onKeyDown={onKeyDown}
      onClick={onClick}
    >
      {icon && icon.icon ? (
        <Icon
          className='slds-pill__icon'
          category={icon.category}
          icon={icon.icon}
        />
      ) : undefined}
      <span className='slds-pill__label'>{label}</span>
      <Button
        disabled={disabled}
        className='slds-pill__remove'
        type='icon-bare'
        icon='close'
        alt='Remove'
        tabIndex={-1}
        onClick={onPillRemove}
      />
    </Tag>
  );
};
