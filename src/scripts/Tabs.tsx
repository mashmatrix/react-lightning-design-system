import React, {
  FC,
  ComponentType,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import classnames from 'classnames';
import { registerStyle } from './util';
import { DropdownButton, DropdownButtonProps } from './DropdownButton';
import { useControlledValue } from './hooks';

/**
 *
 */
type TabKey = string | number;

export type TabType = 'default' | 'scoped';

/**
 *
 */
const TabsHandlersContext = createContext<{
  onTabClick?: (tabKey: TabKey) => void;
  onTabKeyDown?: (tabKey: TabKey, e: React.KeyboardEvent) => void;
}>({});

/**
 *
 */
const TabsActiveKeyContext = createContext<TabKey | undefined>(undefined);

/**
 *
 */
const TabsContext = createContext<{
  type: TabType;
  activeTabRef?: Ref<HTMLAnchorElement>;
}>({ type: 'default' });

/**
 *
 */
export type TabContentProps = {
  active?: boolean;
} & HTMLAttributes<HTMLDivElement>;

/**
 *
 */
const TabContent: FC<TabContentProps> = (props) => {
  const { className, active, children, ...rprops } = props;
  const tabClassNames = classnames(
    className,
    'slds-tabs__content',
    `slds-${active ? 'show' : 'hide'}`
  );
  return (
    <div className={tabClassNames} role='tabpanel' {...rprops}>
      {children}
    </div>
  );
};

/**
 *
 */
export type TabMenuProps = DropdownButtonProps<TabKey>;

/**
 *
 */
const TabMenu: FC<TabMenuProps> = (props) => {
  const { icon = 'down', children, ...rprops } = props;
  return (
    <DropdownButton
      {...rprops}
      className='react-slds-tab-menu'
      icon={icon}
      type='icon-bare'
      iconSize='small'
      tabIndex={-1}
      nubbinTop
    >
      {children}
    </DropdownButton>
  );
};

/**
 *
 */
export type TabItemRendererProps = {
  type?: TabType;
  title?: string;
  menu?: ReactElement;
  menuItems?: ReactElement[];
  menuIcon?: string;
  eventKey?: TabKey;
  activeKey?: TabKey;
  onTabClick?: (eventKey: TabKey) => void;
  onTabKeyDown?: (
    eventKey: TabKey,
    e: React.KeyboardEvent<HTMLAnchorElement>
  ) => void;
};

const DefaultTabItemRenderer: FC<TabItemRendererProps> = (props) => {
  const el = React.Children.only(props.children);
  return React.isValidElement(el) ? el : <>{el}</>;
};

/**
 *
 */
export type TabItemProps = {
  tabItemRenderer?: ComponentType<TabItemRendererProps>;
} & Omit<
  TabItemRendererProps,
  'type' | 'activeKey' | 'onTabClick' | 'onTabKeyDown'
>;

/**
 *
 */
const TabItem: FC<TabItemProps> = (props) => {
  const { title, eventKey, menu, menuIcon } = props;
  const { type, activeTabRef } = useContext(TabsContext);
  const activeKey = useContext(TabsActiveKeyContext);
  const { onTabClick, onTabKeyDown } = useContext(TabsHandlersContext);
  let { menuItems } = props;
  menuItems = menu
    ? React.Children.toArray(
        (menu.props as unknown as { children?: ReactNode }).children || []
      ).map((el) => (React.isValidElement(el) ? el : <>{el}</>))
    : menuItems;
  const menuProps = (menu?.props as unknown) ?? {};
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
    ...rprops
  } = props;
  return (
    <li className={tabItemClassName} role='presentation'>
      <TabItemRenderer
        {...rprops}
        {...{ type, activeKey, onTabClick, onTabKeyDown }}
      >
        <span className='react-slds-tab-item-content'>
          <a
            className={tabLinkClassName}
            role='tab'
            ref={isActive ? activeTabRef : undefined}
            tabIndex={isActive ? 0 : -1}
            aria-selected={isActive}
            onClick={
              eventKey != null ? () => onTabClick?.(eventKey) : undefined
            }
            onKeyDown={
              eventKey != null ? (e) => onTabKeyDown?.(eventKey, e) : undefined
            }
          >
            {title}
          </a>
          {menuItems ? (
            <TabMenu icon={menuIcon} {...menuProps}>
              {menuItems}
            </TabMenu>
          ) : undefined}
        </span>
      </TabItemRenderer>
    </li>
  );
};

/**
 *
 */
const TabNav: FC = (props) => {
  const { children } = props;
  const { type } = useContext(TabsContext);
  const tabNavClassName = `slds-tabs_${type}__nav`;
  return (
    <ul className={tabNavClassName} role='tablist'>
      {React.Children.map(children, (tab) => {
        if (!React.isValidElement(tab)) {
          return null;
        }
        return <TabItem {...tab.props} />;
      })}
    </ul>
  );
};

/**
 *
 */
export type TabProps = {
  className?: string;
  eventKey?: TabKey;
} & TabItemProps;

export const Tab: FC<TabProps> = (props) => {
  const { className, eventKey, children } = props;
  const activeKey = useContext(TabsActiveKeyContext);
  return (
    <TabContent
      className={className}
      active={eventKey != null && eventKey === activeKey}
    >
      {children}
    </TabContent>
  );
};

/**
 *
 */
export type TabsProps = {
  className?: string;
  type?: TabType;
  defaultActiveKey?: TabKey;
  activeKey?: TabKey;
  children?: ReactNode;
  onSelect?: (tabKey: TabKey) => void;
};

/**
 *
 */
function useInitComponentStyle() {
  useEffect(() => {
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
  }, []);
}

/**
 *
 */
export const Tabs: FC<TabsProps> = (props) => {
  const {
    className,
    type = 'default',
    activeKey: activeKey_,
    defaultActiveKey,
    children,
    onSelect,
  } = props;
  const tabsClassNames = classnames(className, `slds-tabs_${type}`);
  const activeTabRef = useRef<HTMLAnchorElement | null>(null);
  const [focusTab, setFocusTab] = useState(false);
  const [activeKey, setActiveKey] = useControlledValue(
    activeKey_,
    defaultActiveKey ?? null
  );
  const tabKeys = React.Children.map(children, (tab: ReactNode) => {
    if (React.isValidElement(tab)) {
      const { eventKey } = tab.props as { eventKey?: TabKey };
      return eventKey;
    }
    return undefined;
  }) as Array<TabKey | undefined>;

  useInitComponentStyle();

  const onTabClick = useCallback(
    (tabKey: TabKey) => {
      onSelect?.(tabKey);
      setActiveKey(tabKey);
      setFocusTab(true);
    },
    [onSelect, setActiveKey]
  );

  const onTabKeyDown = useCallback(
    (tabKey: TabKey, e: React.KeyboardEvent) => {
      if (e.keyCode === 37 || e.keyCode === 39) {
        // left/right cursor key
        const idx = tabKeys.findIndex((key) => key === tabKey);
        if (idx < 0) {
          return;
        }
        const dir = e.keyCode === 37 ? -1 : 1;
        const activeIdx = (idx + dir + tabKeys.length) % tabKeys.length;
        const activeKey = tabKeys[activeIdx];
        if (activeKey) {
          onTabClick(activeKey);
        }
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [onTabClick, tabKeys]
  );

  useEffect(() => {
    if (focusTab) {
      activeTabRef.current?.focus();
      setFocusTab(false);
    }
  }, [focusTab]);

  const tabCtx = useMemo(() => ({ type, activeTabRef }), [type]);
  const handlers = useMemo(
    () => ({ onTabClick, onTabKeyDown }),
    [onTabClick, onTabKeyDown]
  );

  return (
    <TabsContext.Provider value={tabCtx}>
      <TabsActiveKeyContext.Provider value={activeKey ?? undefined}>
        <TabsHandlersContext.Provider value={handlers}>
          <div className={tabsClassNames}>
            <TabNav>{children}</TabNav>
            {children}
          </div>
        </TabsHandlersContext.Provider>
      </TabsActiveKeyContext.Provider>
    </TabsContext.Provider>
  );
};
