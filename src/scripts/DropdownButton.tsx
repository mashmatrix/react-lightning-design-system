import React, {
  CSSProperties,
  MouseEvent,
  KeyboardEvent,
  SyntheticEvent,
  useRef,
  useContext,
  useEffect,
  Ref,
  EventHandler,
} from 'react';
import classnames from 'classnames';
import { Button, ButtonProps } from './Button';
import { DropdownMenu } from './DropdownMenu';
import { registerStyle, isElInChildren } from './util';
import { ComponentSettingsContext } from './ComponentSettings';
import { ButtonGroupContext } from './ButtonGroup';
import { useControlledValue, useEventCallback, useMergeRefs } from './hooks';
import { Bivariant } from './typeUtils';

export type DropdownMenuAlign = 'left' | 'right';
export type DropdownMenuSize = 'small' | 'medium' | 'large';

type EventKey = string | number;

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
export type DropdownButtonProps = {
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
  dropdownRef?: Ref<HTMLDivElement>;
  onClick?: EventHandler<SyntheticEvent<HTMLButtonElement>>;
  onBlur?: () => void;
  onMenuSelect?: Bivariant<(eventKey: EventKey) => void>;
} & Omit<ButtonProps, 'onClick' | 'onBlur'>;

/**
 *
 */
export const DropdownButton = (props: DropdownButtonProps) => {
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
    buttonRef: buttonRef_,
    dropdownRef: dropdownRef_,
    onBlur: onBlur_,
    onClick: onClick_,
    onMenuSelect: onMenuSelect_,
    ...rprops
  } = props;
  useInitComponentStyle();
  const { getActiveElement } = useContext(ComponentSettingsContext);
  const { grouped, isFirstInGroup, isLastInGroup } =
    useContext(ButtonGroupContext) ?? {};
  const elRef = useRef<HTMLDivElement | null>(null);
  const buttonElRef = useRef<HTMLButtonElement | null>(null);
  const buttonRef = useMergeRefs([buttonElRef, buttonRef_]);
  const dropdownElRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useMergeRefs([dropdownElRef, dropdownRef_]);

  const [opened, setOpened] = useControlledValue(
    opened_,
    defaultOpened || false
  );
  const onBlur = useEventCallback(() => {
    setTimeout(() => {
      const targetEl = getActiveElement();
      if (
        !isFocusedInComponent(targetEl, elRef.current, dropdownElRef.current)
      ) {
        setOpened(false);
        onBlur_?.();
      }
    }, 10);
  });

  const onKeyDown = useEventCallback((e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.keyCode === 40) {
      // down
      e.preventDefault();
      e.stopPropagation();
      if (!opened) {
        setOpened(true);
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
      setOpened(false);
    }
  });

  const onTriggerClick = useEventCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (!hoverPopup) {
        setOpened((opened) => !opened);
      }
      onClick_?.(e);
    }
  );

  const onMenuSelect = useEventCallback((eventKey: EventKey) => {
    if (!hoverPopup) {
      setTimeout(() => {
        buttonElRef.current?.focus();
        setOpened(false);
      }, 10);
    }
    onMenuSelect_?.(eventKey);
  });

  const onMenuClose = useEventCallback(() => {
    buttonElRef.current?.focus();
    setOpened(false);
  });

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
      buttonRef={buttonRef}
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
    <div className={dropdownClassNames} style={style} ref={elRef}>
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
          elementRef={dropdownRef}
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
