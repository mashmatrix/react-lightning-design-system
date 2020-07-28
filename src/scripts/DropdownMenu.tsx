import React, {
  Component,
  ComponentType,
  AnchorHTMLAttributes,
  FocusEvent,
  KeyboardEvent,
  HTMLAttributes,
  SyntheticEvent,
  createContext,
} from 'react';
import classnames from 'classnames';
import { Icon } from './Icon';
import { autoAlign, InjectedProps, AutoAlignProps } from './AutoAlign';

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

type DropdownMenuHandler<EventKey extends Key> = {
  onMenuSelect: (eventKey: EventKey) => void;
  onMenuFocus: (e: FocusEvent<HTMLElement>) => void;
  onMenuBlur: (e: FocusEvent<HTMLElement>) => void;
};

export const DropdownMenuHandlerContext = createContext<
  DropdownMenuHandler<Key>
>(null as any);

export type DropdownMenuItemProps = {
  label?: string;
  eventKey?: string | number;
  icon?: string;
  iconRight?: string;
  disabled?: boolean;
  divider?: 'top' | 'bottom';
  selected?: boolean;
  onClick?: (e: SyntheticEvent<HTMLElement>) => void;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'>;

class DropdownMenuItemInner extends Component<
  DropdownMenuItemProps & DropdownMenuHandler<Key>
> {
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
    if (this.props.onClick) {
      this.props.onClick(e);
    }
    if (this.props.eventKey) {
      this.props.onMenuSelect(this.props.eventKey);
    }
  };

  onMenuItemBlur = (e: FocusEvent<HTMLAnchorElement>) => {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
    if (this.props.onMenuBlur) {
      this.props.onMenuBlur(e);
    }
  };

  onMenuItemFocus = (e: FocusEvent<HTMLAnchorElement>) => {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
    if (this.props.onMenuFocus) {
      this.props.onMenuFocus(e);
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

export const DropdownMenuItem = (props: DropdownMenuItemProps) => {
  return (
    <DropdownMenuHandlerContext.Consumer>
      {(handlers) => <DropdownMenuItemInner {...props} {...handlers} />}
    </DropdownMenuHandlerContext.Consumer>
  );
};

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

class DropdownMenuInner<EventKey extends Key> extends Component<
  DropdownMenuProps<EventKey> & InjectedProps
> {
  node: HTMLDivElement | null = null;

  handlers: DropdownMenuHandler<EventKey> | null = null;

  onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 27) {
      // ESC
      if (this.props.onMenuClose) {
        this.props.onMenuClose();
      }
    }
  };

  onMenuSelect = (eventKey: EventKey) => {
    if (this.props.onMenuSelect) {
      this.props.onMenuSelect(eventKey);
    }
  };

  onMenuFocus = (e: FocusEvent<HTMLElement>) => {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  onMenuBlur = (e: FocusEvent<HTMLElement>) => {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  getDropdownContext = () => {
    if (!this.handlers) {
      this.handlers = {
        onMenuSelect: this.onMenuSelect,
        onMenuBlur: this.onMenuBlur,
        onMenuFocus: this.onMenuFocus,
      };
    }
    return this.handlers as DropdownMenuHandler<Key>;
  };

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
          <DropdownMenuHandlerContext.Provider
            value={this.getDropdownContext()}
          >
            {children}
          </DropdownMenuHandlerContext.Provider>
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
  })(DropdownMenuInner)
) as DropdownMenuType;
