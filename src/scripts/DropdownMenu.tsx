import React, {
  AnchorHTMLAttributes,
  FocusEvent,
  KeyboardEvent,
  HTMLAttributes,
  SyntheticEvent,
  createContext,
  Ref,
  FC,
  useContext,
  useRef,
  useMemo,
} from 'react';
import classnames from 'classnames';
import { Icon } from './Icon';
import { AutoAlign, AutoAlignInjectedProps, AutoAlignProps } from './AutoAlign';
import { useEventCallback, useMergeRefs } from './hooks';

/**
 *
 */
type EventKey = string | number;

/**
 *
 */
export type DropdownMenuHeaderProps = {
  className?: string;
  divider?: 'top' | 'bottom';
};

/**
 *
 */
export const DropdownMenuHeader: FC<DropdownMenuHeaderProps> = ({
  divider,
  className,
  children,
}) => {
  const menuHeaderClass = classnames(
    'slds-dropdown__header',
    divider ? `slds-has-divider_${divider}-space` : undefined,
    className
  );
  return (
    <div className={menuHeaderClass}>
      <span className='slds-text-heading_label'>{children}</span>
    </div>
  );
};

export const MenuHeader = DropdownMenuHeader;

/**
 *
 */
type DropdownMenuHandler = {
  onMenuSelect?: (eventKey: EventKey) => void;
  onMenuFocus?: (e: FocusEvent<HTMLElement>) => void;
  onMenuBlur?: (e: FocusEvent<HTMLElement>) => void;
};

export const DropdownMenuHandlerContext = createContext<DropdownMenuHandler>(
  {}
);

/**
 *
 */
export type DropdownMenuItemProps = {
  label?: string;
  eventKey?: string | number;
  icon?: string;
  iconRight?: string;
  disabled?: boolean;
  divider?: 'top' | 'bottom';
  selected?: boolean;
  onClick?: (e: React.SyntheticEvent) => void;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'>;

/**
 *
 */
export const DropdownMenuItem: FC<DropdownMenuItemProps> = (props) => {
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
    children,
    ...rprops
  } = props;

  const { onMenuSelect, onMenuBlur, onMenuFocus } = useContext(
    DropdownMenuHandlerContext
  );

  const onKeyDown = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      // return or space
      e.preventDefault();
      e.stopPropagation();
      onMenuItemClick(e);
    } else if (e.keyCode === 40 || e.keyCode === 38) {
      e.preventDefault();
      e.stopPropagation();
      const currentEl = e.currentTarget.parentElement;
      let itemEl: Element | null = currentEl
        ? e.keyCode === 40
          ? currentEl.nextElementSibling
          : currentEl.previousElementSibling
        : null;
      while (itemEl) {
        const anchorEl = itemEl.querySelector<HTMLAnchorElement>(
          '.react-slds-menuitem[tabIndex]'
        );
        if (anchorEl && !anchorEl.ariaDisabled) {
          anchorEl.focus();
          return;
        }
        itemEl =
          e.keyCode === 40
            ? itemEl.nextElementSibling
            : itemEl.previousElementSibling;
      }
    }
  };

  const onMenuItemClick = (e: SyntheticEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (eventKey != null) {
      onMenuSelect?.(eventKey);
    }
  };

  const onMenuItemBlur = (e: FocusEvent<HTMLAnchorElement>) => {
    onBlur?.(e);
    onMenuBlur?.(e);
  };

  const onMenuItemFocus = (e: FocusEvent<HTMLAnchorElement>) => {
    onFocus?.(e);
    onMenuFocus?.(e);
  };

  const menuItemClass = classnames(
    'slds-dropdown__item',
    { 'slds-is-selected': selected },
    divider ? `slds-has-divider_${divider}-space` : undefined,
    className
  );
  return (
    <li className={menuItemClass}>
      <a
        role='menuitem'
        {...rprops}
        className='slds-truncate react-slds-menuitem'
        aria-disabled={disabled}
        tabIndex={disabled ? undefined : tabIndex}
        onClick={disabled ? undefined : onMenuItemClick}
        onBlur={disabled ? undefined : onMenuItemBlur}
        onFocus={disabled ? undefined : onMenuItemFocus}
        onKeyDown={disabled ? undefined : onKeyDown}
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
};

export const MenuItem = DropdownMenuItem;

/**
 *
 */
export type DropdownMenuProps = HTMLAttributes<HTMLElement> & {
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
  elementRef?: Ref<HTMLDivElement>;
};

/**
 *
 */
const DropdownMenuInner: FC<DropdownMenuProps & AutoAlignInjectedProps> = (
  props
) => {
  const {
    className,
    size,
    header,
    nubbin: nubbin_,
    nubbinTop,
    hoverPopup,
    children,
    style,
    alignment,
    autoAlignContentRef,
    elementRef: elementRef_,
    onFocus,
    onBlur,
    onMenuSelect,
    onMenuClose,
    ...rprops
  } = props;

  const elRef = useRef<HTMLDivElement | null>(null);
  const elementRef = useMergeRefs([elRef, autoAlignContentRef, elementRef_]);

  const onKeyDown = useEventCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 27) {
      // ESC
      onMenuClose?.();
    }
  });

  const nubbin = nubbinTop ? 'auto' : nubbin_;
  const [vertAlign, align] = alignment;
  const nubbinPosition =
    nubbin === 'auto' ? alignment.join('-') : nubbin?.split(' ').join('-');
  const dropdownClassNames = classnames(
    className,
    'slds-dropdown',
    vertAlign ? `slds-dropdown_${vertAlign}` : undefined,
    align ? `slds-dropdown_${align}` : undefined,
    size ? `slds-dropdown_${size}` : undefined,
    nubbinPosition ? `slds-nubbin_${nubbinPosition}` : undefined,
    { 'react-slds-no-hover-popup': !hoverPopup }
  );
  const handlers = useMemo(
    () => ({
      onMenuSelect,
      onMenuBlur: onBlur,
      onMenuFocus: onFocus,
    }),
    [onBlur, onFocus, onMenuSelect]
  );
  return (
    <div
      className={dropdownClassNames}
      ref={elementRef}
      style={{ outline: 'none', ...style }}
      onKeyDown={onKeyDown}
      tabIndex={-1}
      onFocus={onFocus}
      onBlur={onBlur}
      {...rprops}
    >
      {header ? <MenuHeader>{header}</MenuHeader> : null}
      <ul className='slds-dropdown__list' role='menu'>
        <DropdownMenuHandlerContext.Provider value={handlers}>
          {children}
        </DropdownMenuHandlerContext.Provider>
      </ul>
    </div>
  );
};

/**
 *
 */
export const DropdownMenu: FC<
  DropdownMenuProps &
    Pick<AutoAlignProps, 'portalClassName' | 'portalStyle' | 'align'>
> = (props) => {
  return (
    <AutoAlign
      {...props}
      preventPortalize={!!props.hoverPopup}
      triggerSelector='.slds-dropdown-trigger'
      alignmentStyle='menu'
    >
      {(injectedProps) => <DropdownMenuInner {...props} {...injectedProps} />}
    </AutoAlign>
  );
};
