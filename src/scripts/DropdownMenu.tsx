import React, {
  Component,
  ComponentType,
  AnchorHTMLAttributes,
  FocusEvent,
  KeyboardEvent,
  HTMLAttributes,
  SyntheticEvent,
} from 'react';
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
  label?: string;
  eventKey?: string | number;
  icon?: string;
  iconRight?: string;
  disabled?: boolean;
  divider?: 'top' | 'bottom';
  selected?: boolean;
  onClick?: (e: SyntheticEvent<HTMLElement>) => void;
  onMenuSelect?: (eventKey?: string | number) => void;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'>;

export class DropdownMenuItem extends Component<DropdownMenuItemProps> {
  onKeyDown = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      // return or space
      e.preventDefault();
      e.stopPropagation();
      this.onMenuItemClick(e);
    } else if (e.keyCode === 40 || e.keyCode === 38) {
      e.preventDefault();
      e.stopPropagation();
      const currentEl = e.currentTarget.parentElement;
      let itemEl: any = currentEl
        ? e.keyCode === 40
          ? currentEl.nextSibling
          : currentEl.previousSibling
        : null;
      while (itemEl) {
        const anchorEl = itemEl.querySelector('.react-slds-menuitem[tabIndex]');
        if (anchorEl && !anchorEl.disabled) {
          anchorEl.focus();
          return;
        }
        itemEl = e.keyCode === 40 ? itemEl.nextSibling : itemEl.previousSibling;
      }
    }
  };

  onMenuItemClick = (e: SyntheticEvent<HTMLAnchorElement>) => {
    if (this.props.eventKey != null && this.props.onMenuSelect) {
      this.props.onMenuSelect(this.props.eventKey);
    }
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  render() {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
      className,
      label,
      icon,
      iconRight,
      selected,
      disabled,
      divider,
      tabIndex = 0,
      eventKey,
      onClick,
      onBlur,
      onFocus,
      onMenuSelect,
      children,
      ...props
    } = this.props;
    /* eslint-enable @typescript-eslint/no-unused-vars */
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
          role='menuitem'
          {...props}
          className='slds-truncate react-slds-menuitem'
          aria-disabled={disabled}
          tabIndex={disabled ? undefined : tabIndex}
          onClick={disabled ? undefined : this.onMenuItemClick}
          onBlur={disabled ? undefined : onBlur}
          onFocus={disabled ? undefined : onFocus}
          onKeyDown={disabled ? undefined : this.onKeyDown}
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

type Key = string | number;

export type DropdownMenuProps<EventKey extends Key> = HTMLAttributes<
  HTMLElement
> & {
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
  onMenuSelect?: (eventKey: EventKey) => void;
  onMenuClose?: () => void;
  dropdownMenuRef?: (node: HTMLDivElement) => void;
};

class WrappedDropdownMenu<EventKey extends Key> extends Component<
  DropdownMenuProps<EventKey> & InjectedProps
> {
  node: HTMLDivElement | null = null;

  onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 27) {
      // ESC
      if (this.props.onMenuClose) {
        this.props.onMenuClose();
      }
    }
  };

  renderMenuItem(menuItem: any) {
    const {
      onFocus: onMenuFocus,
      onBlur: onMenuBlur,
      onMenuSelect,
    } = this.props;
    const { onBlur, onFocus } = menuItem.props;
    const onMenuItemFocus = (e: FocusEvent<HTMLElement>) => {
      if (onFocus) {
        onFocus(e);
      }
      if (onMenuFocus) {
        onMenuFocus(e);
      }
    };
    const onMenuItemBlur = (e: FocusEvent<HTMLElement>) => {
      if (onBlur) {
        onBlur(e);
      }
      if (onMenuBlur) {
        onMenuBlur(e);
      }
    };
    return React.cloneElement(menuItem, {
      onMenuSelect,
      onBlur: onMenuItemBlur,
      onFocus: onMenuItemFocus,
    });
  }

  render() {
    /* eslint-disable @typescript-eslint/no-unused-vars */
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
      onMenuSelect,
      onMenuClose,
      ...rprops
    } = this.props;
    /* eslint-enable @typescript-eslint/no-unused-vars */
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
        onKeyDown={this.onKeyDown}
        tabIndex={-1}
        onFocus={onFocus}
        onBlur={onBlur}
        {...rprops}
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

function preventPortalizeOnHoverPopup<EventKey extends Key>(
  Cmp: ComponentType<DropdownMenuProps<EventKey> & AutoAlignProps>
) {
  type ResultProps = DropdownMenuProps<EventKey> & AutoAlignProps;
  return (props: ResultProps) => (
    <Cmp preventPortalize={!!props.hoverPopup} {...props} />
  );
}

type DropdownMenuType = <EventKey extends Key>(
  props: DropdownMenuProps<EventKey> & AutoAlignProps
) => JSX.Element;

export const DropdownMenu: DropdownMenuType = preventPortalizeOnHoverPopup(
  autoAlign({
    triggerSelector: '.slds-dropdown-trigger',
  })(WrappedDropdownMenu)
) as DropdownMenuType;
