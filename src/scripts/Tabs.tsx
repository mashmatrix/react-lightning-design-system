import React, { Component, HTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';
import { registerStyle } from './util';
import { DropdownButton, DropdownButtonProps } from './DropdownButton';

export type TabContentProps = {
  active?: boolean;
} & HTMLAttributes<HTMLDivElement>;

/**
 *
 */
const TabContent: React.FC<TabContentProps> = (props) => {
  const { className, active, children, ...pprops } = props;
  const tabClassNames = classnames(
    className,
    'slds-tabs__content',
    `slds-${active ? 'show' : 'hide'}`
  );
  return (
    <div className={tabClassNames} role='tabpanel' {...pprops}>
      {children}
    </div>
  );
};

export type TabMenuProps = DropdownButtonProps;
/**
 *
 */
const TabMenu: React.FC<TabMenuProps> = (props) => {
  const { icon = 'down', children, ...pprops } = props;
  return (
    <DropdownButton
      className='react-slds-tab-menu'
      icon={icon}
      type='icon-bare'
      iconSize='small'
      nubbinTop
      {...pprops}
    >
      {children}
    </DropdownButton>
  );
};

const DefaultTabItemRenderer = (props: any) =>
  React.Children.only(props.children);

type EventKey = string | number;
export type TabType = 'default' | 'scoped';

export type TabItemRendererProps<Key extends EventKey> = {
  type?: TabType;
  title?: string;
  menu?: JSX.Element;
  menuItems?: JSX.Element[];
  menuIcon?: string;
  eventKey?: Key;
  activeKey?: Key;
  activeTabRef?: (node: HTMLAnchorElement) => void;
  onTabClick?: (eventKey: Key) => void;
  onTabKeyDown?: (
    eventKey: Key,
    e: React.KeyboardEvent<HTMLAnchorElement>
  ) => void;
  children?: React.ReactNode;
  [key: string]: any;
};

export type TabItemProps<Key extends EventKey> = {
  tabItemRenderer?: (props: TabItemRendererProps<Key>) => JSX.Element;
} & TabItemRendererProps<Key>;

/**
 *
 */
const TabItem = <Key extends EventKey>(props: TabItemProps<Key>) => {
  const {
    type,
    title,
    activeKey,
    eventKey,
    activeTabRef,
    menu,
    menuIcon,
    onTabClick,
    onTabKeyDown,
  } = props;
  let { menuItems } = props;
  menuItems = menu ? menu.props.children : menuItems;
  const menuProps = menu ? menu.props : {};
  const isActive = eventKey === activeKey;
  const tabItemClassName = classnames(
    { 'slds-tabs__item': !!menuItems },
    `slds-tabs--${type}__item`,
    'slds-text-heading---label',
    { 'slds-active': isActive },
    { 'react-slds-tab-with-menu': menu || menuItems }
  );
  const tabLinkClassName = `slds-tabs--${type}__link`;
  const {
    tabItemRenderer: TabItemRenderer = DefaultTabItemRenderer,
    ...pprops
  } = props;
  return (
    <li className={tabItemClassName} role='presentation'>
      <TabItemRenderer {...pprops}>
        <span className='react-slds-tab-item-content'>
          <a
            className={tabLinkClassName}
            role='tab'
            ref={isActive ? activeTabRef : undefined}
            tabIndex={isActive ? 0 : -1}
            aria-selected={isActive}
            onClick={() => onTabClick && eventKey != null && onTabClick(eventKey)}
            onKeyDown={(e) => onTabKeyDown && eventKey != null && onTabKeyDown(eventKey, e)}
          >
            {title}
          </a>
          {menuItems ? (
            <TabMenu icon={menuIcon} {...menuProps}>
              {menuItems}
            </TabMenu>
          ) : (
            undefined
          )}
        </span>
      </TabItemRenderer>
    </li>
  );
};

export type TabNavProps<Key extends EventKey> = {
  type?: TabType;
  activeKey?: Key;
  tabs?: ReactNode;
  activeTabRef?: (node: HTMLAnchorElement) => void;
  onTabClick?: (eventKey: Key) => void;
  onTabKeyDown?: (
    eventKey: Key,
    e: React.KeyboardEvent<HTMLAnchorElement>
  ) => void;
};
/**
 *
 */
const TabNav = <Key extends EventKey>(props: TabNavProps<Key>) => {
  const {
    type,
    tabs,
    activeKey,
    activeTabRef,
    onTabClick,
    onTabKeyDown,
  } = props;
  const tabNavClassName = `slds-tabs--${type}__nav`;
  return (
    <ul className={tabNavClassName} role='tablist'>
      {React.Children.map(tabs, (tab: any) => (
        <TabItem
          {...tab.props}
          type={type}
          activeKey={activeKey}
          activeTabRef={activeTabRef}
          onTabClick={onTabClick}
          onTabKeyDown={onTabKeyDown}
        />
      ))}
    </ul>
  );
};

export type TabProps<Key extends EventKey> = {
  className?: string;
  eventKey?: Key;
  activeKey?: Key;
} & TabItemProps<Key>;


export type TabsProps<Key extends EventKey> = {
  className?: string;
  type?: TabType;
  defaultActiveKey?: Key;
  activeKey?: Key;
  onSelect?: (tabKey: Key) => void;
};

export type TabsState<Key extends EventKey> = {
  focusTab?: boolean;
  activeKey?: Key;
};
/**
 *
 */
export class Tabs<Key extends EventKey> extends Component<TabsProps<Key>, TabsState<Key>> {
  activeTab: HTMLAnchorElement | null = null;

  constructor(props: Readonly<TabsProps<Key>>) {
    super(props);
    this.state = {};
    registerStyle('tab-menu', [
      [
        '.slds-tabs__item.react-slds-tab-with-menu',
        '{ position: relative !important; overflow: visible !important; }',
      ],
      [
        '.slds-tabs__item.react-slds-tab-with-menu > .react-slds-tab-item-content',
        '{ overflow: hidden }',
      ],
      [
        '.slds-tabs__item.react-slds-tab-with-menu > .react-slds-tab-item-content > a',
        '{ padding-right: 2rem; }',
      ],
      ['.react-slds-tab-menu', '{ position: absolute; top: 0; right: 0; }'],
      [
        '.react-slds-tab-menu button',
        '{ height: 2.5rem; line-height: 2rem; width: 2rem; visibility: hidden }',
      ],
      [
        '.slds-tabs__item.slds-active .react-slds-tab-menu button',
        '.slds-tabs__item:hover .react-slds-tab-menu button',
        '.slds-tabs__item .react-slds-tab-menu button:focus',
        '{ visibility: visible }',
      ],
    ]);
  }

  componentDidUpdate() {
    if (this.state.focusTab) {
      const el = this.activeTab;
      if (el) {
        el.focus();
      }
      /* eslint-disable react/no-did-update-set-state */
      this.setState({ focusTab: false });
    }
  }

  onTabClick = (tabKey: Key) => {
    if (this.props.onSelect) {
      this.props.onSelect(tabKey);
    }
    // Uncontrolled
    this.setState({ activeKey: tabKey, focusTab: true });
  };

  onTabKeyDown = (
    tabKey: Key,
    e: React.KeyboardEvent<HTMLAnchorElement>
  ) => {
    if (e.keyCode === 37 || e.keyCode === 39) {
      // left/right cursor key
      let idx = 0;
      const tabKeys: Key[] = [];
      React.Children.forEach(this.props.children, (tab: any, i) => {
        tabKeys.push(tab.props.eventKey);
        if (tabKey === tab.props.eventKey) {
          idx = i;
        }
      });
      const dir = e.keyCode === 37 ? -1 : 1;
      const activeIdx = (idx + dir + tabKeys.length) % tabKeys.length;
      const activeKey = tabKeys[activeIdx];
      this.onTabClick(activeKey);
      e.preventDefault();
      e.stopPropagation();
    }
  };

  render() {
    const { className, children } = this.props;
    const type = this.props.type === 'scoped' ? 'scoped' : 'default';
    const tabsClassNames = classnames(className, `slds-tabs--${type}`);
    const activeKey =
      typeof this.props.activeKey !== 'undefined'
        ? this.props.activeKey
        : typeof this.state.activeKey !== 'undefined'
        ? this.state.activeKey
        : this.props.defaultActiveKey;
    return (
      <div className={tabsClassNames}>
        <TabNav
          type={type}
          activeKey={activeKey}
          activeTabRef={(node) => {
            this.activeTab = node;
          }}
          tabs={children}
          onTabClick={this.onTabClick}
          onTabKeyDown={this.onTabKeyDown}
        />
        {React.Children.map(children, (tab: any) =>
          React.cloneElement(tab, { activeKey })
        )}
      </div>
    );
  }
}
