import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import Icon from './Icon';
import Spinner from './Spinner';

export type ButtonType =
  | 'neutral'
  | 'brand'
  | 'destructive'
  | 'inverse'
  | 'icon-bare'
  | 'icon-container'
  | 'icon-inverse'
  | 'icon-more'
  | 'icon-border'
  | 'icon-border-filled';

export type ButtonProps = {
  className?: string;
  label?: ReactNode;
  alt?: string;
  type?: ButtonType;
  size?: 'x-small' | 'small' | 'medium' | 'large';
  htmlType?: 'button' | 'submit' | 'reset';
  selected?: boolean;
  inverse?: boolean;
  loading?: boolean;
  icon?: string;
  iconSize?: 'x-small' | 'small' | 'medium' | 'large';
  iconAlign?: 'left' | 'right';
  iconMore?: string;
  iconMoreSize?: 'x-small' | 'small' | 'medium' | 'large';
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  buttonRef?: (node?: any) => void; // FIXME
};

export default class Button extends Component<ButtonProps, {}> {
  // eslint-disable-next-line react/sort-comp
  private node: any; // FIXME

  constructor(props: Readonly<ButtonProps>) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // Safari, FF to trigger focus event on click
    this.node.focus();
    const { onClick } = this.props;
    if (onClick) onClick(e);
  }

  renderIcon(iconSize: ButtonProps['iconSize'], inv: ButtonProps['inverse']) {
    const { icon, iconAlign, type } = this.props;
    const inverse = inv || /-?inverse$/.test(type || '');
    return (
      <ButtonIcon
        icon={icon}
        align={iconAlign}
        size={iconSize}
        inverse={inverse}
      />
    );
  }

  renderIconMore() {
    const { iconMore, icon, iconAlign, label, children } = this.props;
    const adjoining = icon && (iconAlign === 'right' || !(label || children));
    const iconMoreSize =
      this.props.iconMoreSize || adjoining ? 'x-small' : 'small';
    return <ButtonIcon icon={iconMore} align='right' size={iconMoreSize} />;
  }

  render() {
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
      inverse,
      htmlType = 'button',
      children,
      buttonRef,
      ...props
    } = this.props;
    const typeClassName = type ? `slds-button--${type}` : null;
    const btnClassNames = classnames(className, 'slds-button', typeClassName, {
      'slds-is-selected': selected,
      [`slds-button--${size}`]: size && !/^icon-/.test(type || ''),
      [`slds-button--icon-${size}`]:
        /^(x-small|small)$/.test(size || '') && /^icon-/.test(type || ''),
    });

    return (
      // eslint-disable-next-line react/button-has-type
      <button
        ref={(node) => {
          this.node = node;
          if (buttonRef) buttonRef(node);
        }}
        className={btnClassNames}
        type={htmlType}
        {...props}
        onClick={this.onClick}
      >
        {icon && iconAlign !== 'right'
          ? this.renderIcon(iconSize, inverse)
          : null}
        {children || label}
        {icon && iconAlign === 'right'
          ? this.renderIcon(iconSize, inverse)
          : null}
        {iconMore ? this.renderIconMore() : null}
        {alt ? <span className='slds-assistive-text'>{alt}</span> : null}
        {loading ? <Spinner /> : null}
      </button>
    );
  }
}

const ICON_SIZES = ['x-small', 'small', 'medium', 'large'] as const;

const ICON_ALIGNS = ['left', 'right'] as const;

export type ButtonIconProps = {
  className?: string;
  icon?: string;
  align?: typeof ICON_ALIGNS[number];
  size?: typeof ICON_SIZES[number];
  inverse?: boolean;
  style?: object;
};

export const ButtonIcon: React.FC<ButtonIconProps> = ({
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
      ? `slds-button__icon--${align}`
      : null;
  const sizeClassName =
    size && ICON_SIZES.indexOf(size) >= 0 ? `slds-button__icon--${size}` : null;
  const inverseClassName = inverse ? 'slds-button__icon--inverse' : null;
  const iconClassNames = classnames(
    'slds-button__icon',
    alignClassName,
    sizeClassName,
    inverseClassName,
    className
  );
  const iconStyle = { ...style, pointerEvents: 'none' };
  return (
    <Icon
      className={iconClassNames}
      icon={icon}
      textColor={null}
      style={iconStyle}
      {...props}
    />
  );
};
