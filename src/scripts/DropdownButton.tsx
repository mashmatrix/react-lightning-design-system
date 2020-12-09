import React, {
  Component,
  CSSProperties,
  MouseEvent,
  KeyboardEvent,
  SyntheticEvent,
} from 'react';
import classnames from 'classnames';
import { Button, ButtonProps } from './Button';
import { DropdownMenu } from './DropdownMenu';
import { registerStyle, isElInChildren } from './util';

export type DropdownMenuAlign = 'left' | 'right';
export type DropdownMenuSize = 'small' | 'medium' | 'large';

export type Key = string | number;

export type DropdownButtonProps<EventKey extends Key> = {
  className?: string;
  label?: React.ReactNode;
  menuAlign?: DropdownMenuAlign;
  menuSize?: DropdownMenuSize;
  menuHeader?: string;
  nubbinTop?: boolean;
  hoverPopup?: boolean;
  grouped?: boolean;
  isFirstInGroup?: boolean;
  isLastInGroup?: boolean;
  menuStyle?: CSSProperties;
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void;
  onBlur?: () => void;
  onMenuSelect?: (eventKey: EventKey) => void;
} & Omit<ButtonProps, 'onClick' | 'onBlur'>;

type DropdownButtonState = {
  opened: boolean;
};

export class DropdownButton<EventKey extends Key> extends Component<
  DropdownButtonProps<EventKey>,
  DropdownButtonState
> {
  node: HTMLDivElement | null = null;

  trigger: HTMLButtonElement | null = null;

  dropdown: HTMLDivElement | null = null;

  constructor(props: Readonly<DropdownButtonProps<EventKey>>) {
    super(props);
    this.state = { opened: false };
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
  }

  onBlur = () => {
    setTimeout(() => {
      if (!this.isFocusedInComponent()) {
        this.setState({ opened: false });
        if (this.props.onBlur) {
          this.props.onBlur();
        }
      }
    }, 10);
  };

  onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.keyCode === 40) {
      // down
      e.preventDefault();
      e.stopPropagation();
      if (!this.state.opened) {
        this.setState({ opened: true });
        if (this.props.onClick) {
          this.props.onClick(e);
        }
        setTimeout(() => {
          this.focusToTargetItemEl();
        }, 20);
      } else {
        this.focusToTargetItemEl();
      }
    } else if (e.keyCode === 27) {
      // ESC
      e.preventDefault();
      e.stopPropagation();
      this.setState({ opened: false });
    }
  };

  onTriggerClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!this.props.hoverPopup) {
      this.setState((prevState) => ({ opened: !prevState.opened }));
    }
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  onMenuSelect = (eventKey: EventKey) => {
    if (!this.props.hoverPopup) {
      setTimeout(() => {
        const triggerElem = this.trigger;
        if (triggerElem) triggerElem.focus();
        this.setState({ opened: false });
      }, 10);
    }
    if (this.props.onMenuSelect) {
      this.props.onMenuSelect(eventKey);
    }
  };

  onMenuClose = () => {
    if (this.trigger) {
      this.trigger.focus();
    }
    this.setState({ opened: false });
  };

  isFocusedInComponent() {
    const targetEl = document.activeElement;
    return (
      isElInChildren(this.node, targetEl) ||
      isElInChildren(this.dropdown, targetEl)
    );
  }

  focusToTargetItemEl() {
    const dropdownEl = this.dropdown;
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

  renderButton({ grouped, isFirstInGroup, isLastInGroup, ...props }: any) {
    const pprops = props;
    delete pprops.onMenuItemClick;
    const button = (
      <Button
        {...pprops}
        aria-haspopup
        buttonRef={(node) => (this.trigger = node)}
        onClick={this.onTriggerClick}
        onKeyDown={this.onKeyDown}
        onBlur={this.onBlur}
      />
    );

    if (grouped) {
      const noneStyle = { display: 'none' };
      return (
        <div className='slds-button-group'>
          {isFirstInGroup ? null : (
            <button type='button' className='slds-button' style={noneStyle} />
          )}
          {button}
          {isLastInGroup ? null : (
            <button type='button' className='slds-button' style={noneStyle} />
          )}
        </div>
      );
    }

    return button;
  }

  render() {
    const {
      className,
      menuAlign,
      menuSize,
      nubbinTop,
      hoverPopup,
      menuHeader,
      type,
      label,
      children,
      style,
      menuStyle,
      ...props
    } = this.props;
    let { icon } = this.props;
    const dropdownClassNames = classnames(className, 'slds-dropdown-trigger', {
      'slds-button-space-left': !props.grouped,
      'react-slds-dropdown-opened': this.state.opened,
    });
    let iconMore = null;
    if (!label && !icon) {
      icon = 'down';
    }
    if (label || type === 'icon-more') {
      iconMore = 'down';
    }

    const dropdown = (
      <DropdownMenu
        portalClassName={className}
        align={menuAlign}
        header={menuHeader}
        size={menuSize}
        nubbinTop={nubbinTop}
        hoverPopup={hoverPopup}
        dropdownMenuRef={(node) => (this.dropdown = node)}
        onMenuSelect={this.onMenuSelect}
        onMenuClose={this.onMenuClose}
        onBlur={this.onBlur}
        style={Object.assign({ transition: 'none' }, menuStyle)}
      >
        {children}
      </DropdownMenu>
    );

    return (
      <div
        className={dropdownClassNames}
        style={style}
        ref={(node) => (this.node = node)}
      >
        {this.renderButton({ type, label, icon, iconMore, ...props })}
        {hoverPopup || this.state.opened ? dropdown : undefined}
      </div>
    );
  }
}
