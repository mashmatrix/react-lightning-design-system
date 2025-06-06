import React, { FC, ReactNode, ButtonHTMLAttributes, Ref, useRef } from 'react';
import classnames from 'classnames';
import { SvgButtonIcon, IconCategory } from './Icon';
import { Spinner } from './Spinner';
import { useEventCallback, useMergeRefs } from './hooks';

export type ButtonType =
  | 'neutral'
  | 'brand'
  | 'destructive'
  | 'inverse'
  | 'icon'
  | 'icon-bare'
  | 'icon-container'
  | 'icon-inverse'
  | 'icon-more'
  | 'icon-border'
  | 'icon-border-filled'
  | 'icon-border-inverse';

const ICON_SIZES = ['x-small', 'small', 'medium', 'large'] as const;
const ICON_ALIGNS = ['left', 'right'] as const;

export type ButtonSize = 'x-small' | 'small' | 'medium' | 'large';
export type ButtonIconSize = (typeof ICON_SIZES)[number];
export type ButtonIconAlign = (typeof ICON_ALIGNS)[number];
export type ButtonIconMoreSize = 'x-small' | 'small' | 'medium' | 'large';

/**
 *
 */
export type ButtonIconProps = {
  className?: string;
  category?: IconCategory;
  icon: string;
  align?: ButtonIconAlign;
  size?: ButtonIconSize;
  inverse?: boolean;
  style?: object;
};

/**
 *
 */
export const ButtonIcon: FC<ButtonIconProps> = ({
  align,
  className,
  style,
  icon,
  category = 'utility',
  ...props
}) => {
  const alignClassName =
    align && ICON_ALIGNS.indexOf(align) >= 0
      ? `slds-button__icon_${align}`
      : null;
  const iconClassNames = classnames(
    'slds-button__icon',
    alignClassName,
    className
  );

  if (icon.indexOf(':') > 0) {
    [category, icon] = icon.split(':') as [IconCategory, string];
  }

  return (
    <SvgButtonIcon
      className={iconClassNames}
      icon={icon}
      category={category}
      pointerEvents='none'
      style={style}
      {...props}
    />
  );
};

/**
 *
 */
export type ButtonProps = {
  label?: ReactNode;
  alt?: string;
  type?: ButtonType;
  size?: ButtonSize;
  htmlType?: 'button' | 'submit' | 'reset';
  selected?: boolean;
  inverse?: boolean;
  loading?: boolean;
  icon?: string;
  iconSize?: ButtonIconSize;
  iconAlign?: ButtonIconAlign;
  iconMore?: string;
  iconMoreSize?: ButtonIconMoreSize;
  buttonRef?: Ref<HTMLButtonElement>;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

/**
 *
 */
export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    type,
    size,
    icon,
    iconAlign,
    iconMore,
    selected,
    alt,
    label,
    loading,
    iconSize,
    inverse: inverse_,
    htmlType = 'button',
    children,
    buttonRef: buttonRef_,
    iconMoreSize: iconMoreSize_,
    onClick: onClick_,
    tabIndex,
    ...rprops
  } = props;

  const adjoining = icon && (iconAlign === 'right' || !(label || children));
  const iconMoreSize = iconMoreSize_ || adjoining ? 'x-small' : 'small';
  const inverse = inverse_ || /-?inverse$/.test(type || '');
  const buttonElRef = useRef<HTMLButtonElement | null>(null);
  const buttonRef = useMergeRefs([buttonElRef, buttonRef_]);

  const onClick = useEventCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonElRef.current !== null) {
      // Safari, FF to trigger focus event on click
      buttonElRef.current.focus();
    }
    onClick_?.(e);
  });

  const content = children || label;
  const isIconOnly = type && /^icon-/.test(type) && icon && !content;

  const typeClassName = classnames(
    {
      'slds-button_icon': isIconOnly,
    },
    type ? `slds-button_${type}` : null,
    isIconOnly && iconSize && ICON_SIZES.indexOf(iconSize) >= 0
      ? `slds-button_icon-${iconSize}`
      : null
  );
  const btnClassNames = classnames(className, 'slds-button', typeClassName, {
    'slds-is-selected': selected,
    ['slds-button_icon']: /^icon-/.test(type ?? ''),
    [`slds-button_icon-${size ?? ''}`]:
      /^(x-small|small)$/.test(size ?? '') && /^icon-/.test(type ?? ''),
  });

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      ref={buttonRef}
      className={btnClassNames}
      type={htmlType}
      title={isIconOnly || alt ? alt ?? icon : undefined}
      tabIndex={tabIndex ?? -1}
      {...rprops}
      onClick={onClick}
    >
      {icon && iconAlign !== 'right' ? (
        <ButtonIcon
          icon={icon}
          align={iconAlign}
          size={iconSize}
          inverse={inverse}
        />
      ) : undefined}
      {content}
      {icon && iconAlign === 'right' ? (
        <ButtonIcon
          icon={icon}
          align={iconAlign}
          size={iconSize}
          inverse={inverse}
        />
      ) : undefined}
      {iconMore ? (
        <ButtonIcon icon={iconMore} align='right' size={iconMoreSize} />
      ) : undefined}
      {isIconOnly || alt ? (
        <span className='slds-assistive-text'>{alt ?? icon}</span>
      ) : undefined}
      {loading ? <Spinner /> : undefined}
    </button>
  );
};
