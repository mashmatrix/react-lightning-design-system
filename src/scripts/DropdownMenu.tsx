import React, { Component, ComponentType, AnchorHTMLAttributes } from 'react';
import classnames from 'classnames';
import { Icon } from './Icon';
import { autoAlign, InjectedProps, AutoAlignProps } from './AutoAlign';
import { PicklistItem } from './Picklist';

export type DropdownMenuHeaderProps = {
  className?: string;
  divider?: 'top' | 'bottom';
};

export const DropdownMenuHeader: React.FC<DropdownMenuHeaderProps> = ({
  divider,
  className,
  children,
}) => {
  const menuHeaderClass = classnames(
    'slds-dropdown__header',
    { [`slds-has-divider--${divider}-space`]: divider },
    className
  );
  return (
    <div className={menuHeaderClass}>
      <span className='slds-text-heading--label'>{children}</span>
    </div>
  );
};

export const MenuHeader = DropdownMenuHeader;

export type DropdownMenuItemProps = {
  className?: string;
  label?: string;
  icon?: string;
  iconRight?: string;
  disabled?: boolean;
  divider?: 'top' | 'bottom';
  tabIndex?: number;
  selected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onBlur?: (e: React.FocusEvent<HTMLAnchorElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLAnchorElement>) => void;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export class DropdownMenuItem extends Component<DropdownMenuItemProps> {
  onKeyDown(e: any) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      // return or space
      e.preventDefault();
      e.stopPropagation();
      if (this.props.onClick) {
        this.props.onClick(e);
      }
    } else if (e.keyCode === 40 || e.keyCode === 38) {
      e.preventDefault();
      e.stopPropagation();
      const currentEl = e.target.parentElement;
      let itemEl =
        e.keyCode === 40 ? currentEl.nextSibling : currentEl.previousSibling;
      while (itemEl) {
        const anchorEl = itemEl.querySelector('.react-slds-menuitem[tabIndex]');
        if (anchorEl && !anchorEl.disabled) {
          anchorEl.focus();
          return;
        }
        itemEl = e.keyCode === 40 ? itemEl.nextSibling : itemEl.previousSibling;
      }
    }
  }

  onBlur(e: React.FocusEvent<HTMLAnchorElement>) {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  onFocus(e: React.FocusEvent<HTMLAnchorElement>) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  render() {
    const {
      className,
      label,
      icon,
      iconRight,
      selected,
      disabled,
      divider,
      tabIndex = 0,
      onClick,
      children,
      ...props
    } = this.props;
    const menuItemClass = classnames(
      'slds-dropdown__item',
      {
        'slds-is-selected': selected,
        [`slds-has-divider--${divider}-space`]: divider,
      },
      className
    );
    return (
      <li className={menuItemClass}>
        {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
        <a
          className='slds-truncate react-slds-menuitem'
          role='menuitem'
          aria-disabled={disabled}
          tabIndex={disabled ? undefined : tabIndex}
          onClick={disabled ? undefined : onClick}
          onKeyDown={disabled ? undefined : this.onKeyDown.bind(this)}
          onBlur={disabled ? undefined : this.onBlur.bind(this)}
          onFocus={disabled ? undefined : this.onFocus.bind(this)}
          {...props}
        >
          <p className='slds-truncate'>
            {icon ? <Icon icon={icon} size='x-small' align='left' /> : null}
            {label || children}
          </p>
          {iconRight ? (
            <Icon icon={iconRight} size='x-small' align='right' />
          ) : null}
        </a>
      </li>
    );
  }
}

export const MenuItem = DropdownMenuItem;

export type DropdownMenuProps = {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  header?: string;
  nubbin?:
    | 'top'
    | 'top left'
    | 'top right'
    | 'bottom'
    | 'bottom left'
    | 'bottom right'
    | 'auto';
  nubbinTop?: boolean; // for backward compatibility. use nubbin instead
  hoverPopup?: boolean;
  onMenuItemClick?: (props: any, ...args: any[]) => void;
  onMenuClose?: () => void;
  onBlur?: (e: any) => void;
  onFocus?: (e: any) => void;
  dropdownMenuRef?: (node: HTMLDivElement) => void;
  style?: object;
};

class WrappedDropdownMenu extends Component<DropdownMenuProps & InjectedProps> {
  node: HTMLDivElement | null = null;

  onMenuItemBlur(e: any) {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  onMenuItemFocus(e: any) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.keyCode === 27) {
      // ESC
      if (this.props.onMenuClose) {
        this.props.onMenuClose();
      }
    }
  }

  renderMenuItem(menuItem: any) {
    const { onClick, onBlur, onFocus, ...props } = menuItem.props;
    const onMenuItemClick = (...args: any[]) => {
      if (onClick) {
        onClick(...args);
      }
      if (this.props.onMenuItemClick) {
        this.props.onMenuItemClick(props, ...args);
      }
    };
    const onMenuItemFocus = (e: any) => {
      if (onFocus) {
        onFocus(e);
      }
      this.onMenuItemFocus(e);
    };
    const onMenuItemBlur = (e: any) => {
      if (onBlur) {
        onBlur(e);
      }
      this.onMenuItemBlur(e);
    };
    return React.cloneElement(menuItem, {
      onClick: onMenuItemClick,
      onBlur: onMenuItemBlur,
      onFocus: onMenuItemFocus,
    });
  }

  render() {
    const {
      className,
      align,
      vertAlign,
      size,
      header,
      nubbinTop,
      hoverPopup,
      children,
      style,
      dropdownMenuRef,
      onFocus,
      onBlur,
    } = this.props;
    const nubbin = nubbinTop ? 'auto' : this.props.nubbin;
    const nubbinPosition = nubbin === 'auto' ? `${vertAlign} ${align}` : nubbin;
    const dropdownClassNames = classnames(
      className,
      'slds-dropdown',
      `slds-dropdown--${align}`,
      `slds-dropdown--${vertAlign}`,
      size ? `slds-dropdown--${size}` : undefined,
      nubbinPosition
        ? `slds-nubbin_${nubbinPosition.replace(/\s+/g, '-')}`
        : undefined,
      { 'react-slds-no-hover-popup': !hoverPopup }
    );
    const handleDOMRef = (node: HTMLDivElement) => {
      this.node = node;
      if (dropdownMenuRef) {
        dropdownMenuRef(node);
      }
    };
    return (
      <div
        className={dropdownClassNames}
        ref={handleDOMRef}
        style={{ outline: 'none', ...style }}
        onKeyDown={this.onKeyDown.bind(this)}
        tabIndex={-1}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {header ? <MenuHeader>{header}</MenuHeader> : null}
        <ul className='slds-dropdown__list' role='menu'>
          {React.Children.map(children, (item: any) =>
            item.type === MenuItem || item.type === PicklistItem
              ? this.renderMenuItem(item)
              : item
          )}
        </ul>
      </div>
    );
  }
}

function preventPortalizeOnHoverPopup(
  Cmp: ComponentType<DropdownMenuProps & AutoAlignProps>
) {
  type ResultProps = DropdownMenuProps & AutoAlignProps;
  const Result: React.FC<ResultProps> = (props) => (
    <Cmp preventPortalize={!!props.hoverPopup} {...props} />
  );
  return Result;
}

export const DropdownMenu = preventPortalizeOnHoverPopup(
  autoAlign({
    triggerSelector: '.slds-dropdown-trigger',
  })(WrappedDropdownMenu)
);
