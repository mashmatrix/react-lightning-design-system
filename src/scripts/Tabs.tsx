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

export type TabMenuProps<MenuEventKey extends Key> = DropdownButtonProps<
  MenuEventKey
>;
/**
 *
 */
const TabMenu = <MenuEventKey extends Key>(
  props: TabMenuProps<MenuEventKey>
) => {
  const { icon = 'down', children, ...pprops } = props;
  return (
    <DropdownButton
      className='react-slds-tab-menu'
      icon={icon}
      type='icon-bare'
      iconSize='small'
      tabIndex={-1}
      nubbinTop
      {...pprops}
    >
      {children}
    </DropdownButton>
  );
};

const DefaultTabItemRenderer = (props: any) =>
  React.Children.only(props.children);

type Key = string | number;
export type TabType = 'default' | 'scoped';

export type TabItemRendererProps<
  EventKey extends Key = Key,
  EventValueKey extends EventKey = EventKey
> = {
  type?: TabType;
  title?: string;
  menu?: JSX.Element;
  menuItems?: JSX.Element[];
  menuIcon?: string;
  eventKey?: EventValueKey;
  activeKey?: EventValueKey;
  activeTabRef?: (node: HTMLAnchorElement) => void;
  onTabClick?: (eventKey: EventKey) => void;
  onTabKeyDown?: (
    eventKey: EventKey,
    e: React.KeyboardEvent<HTMLAnchorElement>
  ) => void;
  children?: React.ReactNode;
  [key: string]: any;
};

export type TabItemProps<
  EventKey extends Key,
  EventValueKey extends EventKey
> = {
  tabItemRenderer?: (
    props: TabItemRendererProps<EventKey, EventValueKey>
  ) => JSX.Element;
} & TabItemRendererProps<EventKey, EventValueKey>;

/**
 *
 */
const TabItem = <EventKey extends Key, EventValueKey extends EventKey>(
  props: TabItemProps<EventKey, EventValueKey>
) => {
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
    `slds-tabs_${type}__item`,
    { 'slds-active': isActive },
    { 'react-slds-tab-with-menu': menu || menuItems }
  );
  const tabLinkClassName = `slds-tabs_${type}__link`;
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
            onClick={() =>
              onTabClick && eventKey != null && onTabClick(eventKey)
            }
            onKeyDown={(e) =>
              onTabKeyDown && eventKey != null && onTabKeyDown(eventKey, e)
            }
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

export type TabNavProps<
  EventKey extends Key,
  EventValueKey extends EventKey
> = {
  type?: TabType;
  activeKey?: EventValueKey;
  tabs?: ReactNode;
  activeTabRef?: (node: HTMLAnchorElement) => void;
  onTabClick?: (eventKey: EventKey) => void;
  onTabKeyDown?: (
    eventKey: EventKey,
    e: React.KeyboardEvent<HTMLAnchorElement>
  ) => void;
};
/**
 *
 */
const TabNav = <EventKey extends Key, EventValueKey extends EventKey>(
  props: TabNavProps<EventKey, EventValueKey>
) => {
  const {
    type,
    tabs,
    activeKey,
    activeTabRef,
    onTabClick,
    onTabKeyDown,
  } = props;
  const tabNavClassName = `slds-tabs_${type}__nav`;
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

export type TabProps<EventKey extends Key, EventValueKey extends EventKey> = {
  className?: string;
  eventKey?: EventValueKey;
  activeKey?: EventValueKey;
} & TabItemProps<EventKey, EventValueKey>;

/**
 *
 */
export const Tab = <EventKey extends Key, EventValueKey extends EventKey>(
  props: TabProps<EventKey, EventValueKey>
) => {
  const { className, eventKey, activeKey, children } = props;
  return (
    <TabContent className={className} active={eventKey === activeKey}>
      {children}
    </TabContent>
  );
};

export type TabsProps<EventKey extends Key, EventValueKey extends EventKey> = {
  className?: string;
  type?: TabType;
  defaultActiveKey?: EventValueKey;
  activeKey?: EventValueKey;
  onSelect?: (tabKey: EventKey) => void;
};

export type TabsState<EventKey extends Key> = {
  focusTab?: boolean;
  activeKey?: EventKey;
};
/**
 *
 */
export class Tabs<
  EventKey extends Key,
  EventValueKey extends EventKey
> extends Component<TabsProps<EventKey, EventValueKey>, TabsState<EventKey>> {
  activeTab: HTMLAnchorElement | null = null;

  constructor(props: Readonly<TabsProps<EventKey, EventValueKey>>) {
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
        '{ height: 2.5rem; line-height: 2rem; width: 2rem; visibility: hidden; justify-content: center }',
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

  onTabClick = (tabKey: EventKey) => {
    if (this.props.onSelect) {
      this.props.onSelect(tabKey);
    }
    // Uncontrolled
    this.setState({ activeKey: tabKey, focusTab: true });
  };

  onTabKeyDown = (
    tabKey: EventKey,
    e: React.KeyboardEvent<HTMLAnchorElement>
  ) => {
    if (e.keyCode === 37 || e.keyCode === 39) {
      // left/right cursor key
      let idx = 0;
      const tabKeys: EventKey[] = [];
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
    const tabsClassNames = classnames(className, `slds-tabs_${type}`);
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
