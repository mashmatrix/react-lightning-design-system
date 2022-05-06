import React, {
  FC,
  ReactNode,
  ButtonHTMLAttributes,
  Ref,
  useRef,
  useCallback,
} from 'react';
import mergeRefs from 'react-merge-refs';
import classnames from 'classnames';
import { Icon } from './Icon';
import { Spinner } from './Spinner';

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
export type ButtonIconSize = typeof ICON_SIZES[number];
export type ButtonIconAlign = typeof ICON_ALIGNS[number];
export type ButtonIconMoreSize = 'x-small' | 'small' | 'medium' | 'large';

/**
 *
 */
export type ButtonIconProps = {
  className?: string;
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
  icon,
  align,
  size,
  inverse,
  className,
  style,
  ...props
}) => {
  const alignClassName =
    align && ICON_ALIGNS.indexOf(align) >= 0
      ? `slds-button__icon_${align}`
      : null;
  const sizeClassName =
    size && ICON_SIZES.indexOf(size) >= 0 ? `slds-button__icon_${size}` : null;
  const inverseClassName = inverse ? 'slds-button__icon_inverse' : null;
  const iconClassNames = classnames(
    'slds-button__icon',
    alignClassName,
    sizeClassName,
    inverseClassName,
    className
  );
  return (
    <Icon
      className={iconClassNames}
      icon={icon}
      textColor={null}
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
    ...rprops
  } = props;

  const adjoining = icon && (iconAlign === 'right' || !(label || children));
  const iconMoreSize = iconMoreSize_ || adjoining ? 'x-small' : 'small';
  const inverse = inverse_ || /-?inverse$/.test(type || '');
  const buttonElRef = useRef<HTMLButtonElement | null>(null);
  const buttonRef = buttonRef_
    ? mergeRefs([buttonElRef, buttonRef_])
    : buttonElRef;

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (buttonElRef.current !== null) {
        // Safari, FF to trigger focus event on click
        buttonElRef.current.focus();
      }
      onClick_?.(e);
    },
    [onClick_]
  );

  const typeClassName = type ? `slds-button_${type}` : null;
  const btnClassNames = classnames(className, 'slds-button', typeClassName, {
    'slds-is-selected': selected,
    [`slds-button_icon-${size ?? ''}`]:
      /^(x-small|small)$/.test(size ?? '') && /^icon-/.test(type ?? ''),
  });

  const buttonContent = (
    // eslint-disable-next-line react/button-has-type
    <button
      ref={buttonRef}
      className={btnClassNames}
      type={htmlType}
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
      {children || label}
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
      {alt ? <span className='slds-assistive-text'>{alt}</span> : undefined}
      {loading ? <Spinner /> : undefined}
    </button>
  );

  if (props.tabIndex != null) {
    return (
      <span
        className='react-slds-button-focus-wrapper'
        style={{ outline: 0 }}
        tabIndex={-1}
      >
        {buttonContent}
      </span>
    );
  }

  return buttonContent;
};
