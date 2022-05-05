import React, {
  CSSProperties,
  MouseEvent,
  KeyboardEvent,
  SyntheticEvent,
  useRef,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import classnames from 'classnames';
import { Button, ButtonProps } from './Button';
import { DropdownMenu } from './DropdownMenu';
import { registerStyle, isElInChildren } from './util';
import { ComponentSettingsContext } from './ComponentSettings';
import { ButtonGroupContext } from './ButtonGroup';

export type DropdownMenuAlign = 'left' | 'right';
export type DropdownMenuSize = 'small' | 'medium' | 'large';

export type Key = string | number;

/**
 *
 */
function useInitComponentStyle() {
  useEffect(() => {
    registerStyle('no-hover-popup', [
      [
        '.slds-dropdown-trigger:hover .slds-dropdown_menu.react-slds-no-hover-popup',
        '{ visibility: hidden; opacity: 0; }',
      ],
      [
        '.slds-dropdown-trigger.react-slds-dropdown-opened .slds-dropdown_menu',
        '{ visibility: visible !important; opacity: 1 !important; }',
      ],
    ]);
  }, []);
}

function isFocusedInComponent(
  targetEl: HTMLElement | null,
  rootEl: HTMLElement | null,
  dropdownEl: HTMLElement | null
) {
  return (
    isElInChildren(rootEl, targetEl) || isElInChildren(dropdownEl, targetEl)
  );
}

function focusToTargetItemEl(dropdownEl: HTMLElement | null) {
  if (!dropdownEl) {
    return;
  }
  const firstItemEl: HTMLAnchorElement | null =
    dropdownEl.querySelector(
      '.slds-is-selected > .react-slds-menuitem[tabIndex]'
    ) || dropdownEl.querySelector('.react-slds-menuitem[tabIndex]');
  if (firstItemEl) {
    firstItemEl.focus();
  }
}

/**
 *
 */
export type DropdownButtonProps<EventKey extends Key> = {
  className?: string;
  label?: React.ReactNode;
  opened?: boolean;
  defaultOpened?: boolean;
  menuAlign?: DropdownMenuAlign;
  menuSize?: DropdownMenuSize;
  menuHeader?: string;
  nubbinTop?: boolean;
  hoverPopup?: boolean;
  menuStyle?: CSSProperties;
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void;
  onBlur?: () => void;
  onMenuSelect?: (eventKey: EventKey) => void;
} & Omit<ButtonProps, 'onClick' | 'onBlur'>;

/**
 *
 */
export const DropdownButton = <EventKey extends Key>(
  props: DropdownButtonProps<EventKey>
) => {
  const {
    className,
    opened: opened_,
    defaultOpened,
    menuAlign,
    menuSize,
    menuHeader,
    nubbinTop,
    hoverPopup,
    menuStyle,
    type,
    label,
    children,
    style,
    onBlur: onBlur_,
    onClick: onClick_,
    onMenuSelect: onMenuSelect_,
    ...rprops
  } = props;
  useInitComponentStyle();
  const { getActiveElement } = useContext(ComponentSettingsContext);
  const { grouped, isFirstInGroup, isLastInGroup } =
    useContext(ButtonGroupContext) ?? {};
  const rootElRef = useRef<HTMLDivElement | null>(null);
  const triggerElRef = useRef<HTMLButtonElement | null>(null);
  const dropdownElRef = useRef<HTMLDivElement | null>(null);

  const [opened, setStateOpened] = useState(
    typeof opened_ === 'undefined' ? defaultOpened || false : opened_
  );

  const onBlur = useCallback(() => {
    setTimeout(() => {
      const targetEl = getActiveElement();
      if (
        !isFocusedInComponent(
          targetEl,
          rootElRef.current,
          dropdownElRef.current
        )
      ) {
        setStateOpened(false);
        onBlur_?.();
      }
    }, 10);
  }, [getActiveElement, onBlur_]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.keyCode === 40) {
        // down
        e.preventDefault();
        e.stopPropagation();
        if (!opened) {
          setStateOpened(true);
          onClick_?.(e);
          setTimeout(() => {
            focusToTargetItemEl(dropdownElRef.current);
          }, 20);
        } else {
          focusToTargetItemEl(dropdownElRef.current);
        }
      } else if (e.keyCode === 27) {
        // ESC
        e.preventDefault();
        e.stopPropagation();
        setStateOpened(false);
      }
    },
    [onClick_]
  );

  const onTriggerClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (!hoverPopup) {
        setStateOpened((opened) => !opened);
      }
      onClick_?.(e);
    },
    [hoverPopup, onClick_]
  );

  const onMenuSelect = useCallback(
    (eventKey: EventKey) => {
      if (!hoverPopup) {
        setTimeout(() => {
          triggerElRef.current?.focus();
          setStateOpened(false);
        }, 10);
      }
      onMenuSelect_?.(eventKey);
    },
    [hoverPopup, onMenuSelect_]
  );

  const onMenuClose = useCallback(() => {
    triggerElRef.current?.focus();
    setStateOpened(false);
  }, []);

  let { icon } = props;
  let iconMore: string | undefined = undefined;
  if (!label && !icon) {
    icon = 'down';
  }
  if (label || type === 'icon-more') {
    iconMore = 'down';
  }

  const button = (
    <Button
      {...{
        type,
        label,
        icon,
        iconMore,
      }}
      {...rprops}
      aria-haspopup
      buttonRef={triggerElRef}
      onClick={onTriggerClick}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );

  const dropdownClassNames = classnames(className, 'slds-dropdown-trigger', {
    'slds-button-space-left': !grouped,
    'react-slds-dropdown-opened': opened,
  });
  const noneStyle = { display: 'none' };

  return (
    <div className={dropdownClassNames} style={style} ref={rootElRef}>
      {grouped ? (
        <div className='slds-button-group'>
          {isFirstInGroup ? null : (
            <button type='button' className='slds-button' style={noneStyle} />
          )}
          {button}
          {isLastInGroup ? null : (
            <button type='button' className='slds-button' style={noneStyle} />
          )}
        </div>
      ) : (
        button
      )}
      {hoverPopup || opened ? (
        <DropdownMenu
          portalClassName={className}
          align={menuAlign}
          header={menuHeader}
          size={menuSize}
          nubbinTop={nubbinTop}
          hoverPopup={hoverPopup}
          dropdownMenuRef={dropdownElRef}
          onMenuSelect={onMenuSelect}
          onMenuClose={onMenuClose}
          onBlur={onBlur}
          style={{ transition: 'none', ...menuStyle }}
        >
          {children}
        </DropdownMenu>
      ) : undefined}
    </div>
  );
};
