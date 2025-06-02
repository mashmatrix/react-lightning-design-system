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
  ReactNode,
  useState,
  useId,
} from 'react';
import classnames from 'classnames';
import { Icon } from './Icon';
import { AutoAlign, AutoAlignInjectedProps, AutoAlignProps } from './AutoAlign';
import { useEventCallback, useMergeRefs } from './hooks';
import { Bivariant } from './typeUtils';

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
  children?: ReactNode;
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
    'slds-truncate',
    divider ? `slds-has-divider_${divider}-space` : undefined,
    className
  );
  return (
    <li className={menuHeaderClass} role='presentation'>
      <span>{children}</span>
    </li>
  );
};

export const MenuHeader = DropdownMenuHeader;

/**
 *
 */
type DropdownMenuHandler = {
  onMenuSelect?: Bivariant<(eventKey: EventKey) => void>;
  onMenuFocus?: (e: FocusEvent<HTMLElement>) => void;
  onMenuBlur?: (e: FocusEvent<HTMLElement>) => void;
};

export const DropdownMenuHandlerContext = createContext<DropdownMenuHandler>(
  {}
);

type OpenSubmenuContext = {
  openSubmenuKeys: {
    [key: string]: { isOpen: boolean; level: number } | undefined;
  };
  handleSubmenuOpen: (key: string, level: number) => void;
};

export const OpenSubmenuContext = createContext<OpenSubmenuContext>({
  openSubmenuKeys: {},
  handleSubmenuOpen: () => {},
});

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
  submenu?: ReactNode;
  submenuItems?: Array<{ key: string | number } & DropdownMenuItemProps>;
  level?: number;
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
    submenu: submenu_,
    submenuItems,
    children,
    level = 0,
    ...rprops
  } = props;

  const { onMenuSelect, onMenuBlur, onMenuFocus } = useContext(
    DropdownMenuHandlerContext
  );

  const { openSubmenuKeys, handleSubmenuOpen } = useContext(OpenSubmenuContext);

  const submenuKey = useId();

  const onKeyDown = useEventCallback((e: KeyboardEvent<HTMLAnchorElement>) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      // return or space
      e.preventDefault();
      e.stopPropagation();
      onMenuItemClick(e);
    } else if (e.keyCode === 38 /* up */ || e.keyCode === 40 /* down */) {
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
    } else if (
      submenuItems &&
      (e.keyCode === 39 /* right */ || e.keyCode === 37) /* left */
    ) {
      e.preventDefault();
      e.stopPropagation();
      const submenuEl =
        e.currentTarget.parentElement?.querySelector<HTMLUListElement>(
          '.slds-dropdown__list'
        );
      if (submenuEl) {
        const anchorEl = submenuEl.querySelector<HTMLAnchorElement>(
          '.react-slds-menuitem[tabIndex]'
        );
        if (anchorEl) {
          anchorEl.focus();
        }
      }
    }
  });

  const onMenuItemClick = useEventCallback(
    (e: SyntheticEvent<HTMLAnchorElement>) => {
      if (submenu) {
        handleSubmenuOpen(submenuKey, level + 1);
        return;
      }
      onClick?.(e);
      if (eventKey != null) {
        onMenuSelect?.(eventKey);
      }
    }
  );

  const onMenuItemBlur = useEventCallback(
    (e: FocusEvent<HTMLAnchorElement>) => {
      onBlur?.(e);
      onMenuBlur?.(e);
    }
  );

  const onMenuItemFocus = useEventCallback(
    (e: FocusEvent<HTMLAnchorElement>) => {
      onFocus?.(e);
      onMenuFocus?.(e);
    }
  );

  const submenu =
    submenu_ ??
    (submenuItems ? (
      <DropdownSubmenu label={label}>
        {submenuItems?.map(({ key, ...itemProps }) => (
          <DropdownMenuItem key={key} level={level + 1} {...itemProps} />
        ))}
      </DropdownSubmenu>
    ) : undefined);

  const submenuExpanded = openSubmenuKeys[submenuKey]?.isOpen ?? false;

  const menuItemClass = classnames(
    'slds-dropdown__item',
    { 'slds-is-selected': selected },
    submenu ? 'slds-has-submenu' : undefined,
    className
  );
  return (
    <>
      {divider === 'top' ? (
        <li className={`slds-has-divider_${divider}-space`} role='separator' />
      ) : null}
      <li className={menuItemClass} role='presentation'>
        <a
          role='menuitem'
          {...rprops}
          className='react-slds-menuitem'
          aria-disabled={disabled}
          aria-haspopup={submenu != null}
          aria-expanded={submenuExpanded}
          tabIndex={disabled ? undefined : tabIndex}
          onClick={disabled ? undefined : onMenuItemClick}
          onBlur={disabled ? undefined : onMenuItemBlur}
          onFocus={disabled ? undefined : onMenuItemFocus}
          onKeyDown={disabled ? undefined : onKeyDown}
        >
          <span
            className='slds-truncate'
            title={typeof label === 'string' ? label : undefined}
          >
            {icon ? <Icon icon={icon} size='x-small' align='left' /> : null}
            {label || children}
          </span>
          {iconRight || submenu ? (
            <Icon icon={iconRight ?? 'right'} size='x-small' align='right' />
          ) : null}
        </a>
        {submenu && submenuExpanded ? submenu : undefined}
      </li>
      {divider === 'bottom' ? (
        <li className={`slds-has-divider_${divider}-space`} role='separator' />
      ) : null}
    </>
  );
};

export const MenuItem = DropdownMenuItem;

/**
 *
 */
export type DropdownSubmenuProps = {
  label?: string;
  align?: 'left' | 'right';
  children?: ReactNode;
};

/**
 *
 */
export const DropdownSubmenu: FC<DropdownSubmenuProps> = (props) => {
  const { label, align = 'right', children } = props;
  const submenuClassName = classnames(
    'slds-dropdown',
    'slds-dropdown_submenu',
    `slds-dropdown_submenu-${align}`
  );
  return (
    <div className={submenuClassName}>
      <ul className='slds-dropdown__list' role='menu' aria-label={label}>
        {children}
      </ul>
    </div>
  );
};

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
  onMenuSelect?: Bivariant<(eventKey: EventKey) => void>;
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

  const [openSubmenuKeys, setOpenSubmenuKeys] = useState<{
    [key: string]: { isOpen: boolean; level: number };
  }>({});

  const handleSubmenuOpen = (key: string, level: number) => {
    setOpenSubmenuKeys((prevState) => {
      const newState = { ...prevState };
      Object.keys(newState).forEach((submenuKey) => {
        if (newState[submenuKey].level >= level && key !== submenuKey) {
          newState[submenuKey].isOpen = false;
        }
      });
      newState[key] = { isOpen: !newState[key]?.isOpen, level };
      return newState;
    });
  };

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
      <ul className='slds-dropdown__list' role='menu' aria-label={header}>
        {header ? <MenuHeader>{header}</MenuHeader> : null}
        <DropdownMenuHandlerContext.Provider value={handlers}>
          <OpenSubmenuContext.Provider
            value={{ openSubmenuKeys, handleSubmenuOpen }}
          >
            {children}
          </OpenSubmenuContext.Provider>
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
