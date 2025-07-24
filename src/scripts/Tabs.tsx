import React, {
  FC,
  ComponentType,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
  createContext,
  useId,
  useContext,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import classnames from 'classnames';
import { registerStyle } from './util';
import { DropdownButton, DropdownButtonProps } from './DropdownButton';
import { useControlledValue, useEventCallback } from './hooks';
import { Bivariant } from './typeUtils';
import { TooltipContent } from './TooltipContent';

/**
 *
 */
type TabKey = string | number;

export type TabType = 'default' | 'scoped';

/**
 *
 */
const TabsHandlersContext = createContext<{
  onTabClick?: Bivariant<(tabKey: TabKey) => void>;
  onTabKeyDown?: Bivariant<(tabKey: TabKey, e: React.KeyboardEvent) => void>;
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
  tabIdPrefix?: string;
}>({ type: 'default' });

/**
 * Custom hook to generate unique tab IDs
 */
const useTabIds = (eventKey?: TabKey) => {
  const { tabIdPrefix } = useContext(TabsContext);
  const tabIndex = eventKey ? String(eventKey) : '0';
  const tabId = `${tabIdPrefix}-${tabIndex}`;
  return { tabId };
};

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
  const { type } = useContext(TabsContext);
  const tabClassNames = classnames(
    className,
    `slds-tabs_${type}__content`,
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
export type TabMenuProps = DropdownButtonProps;

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
      type='icon'
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
  alt?: string;
  menu?: ReactElement;
  menuItems?: ReactElement[];
  menuIcon?: string;
  eventKey?: TabKey;
  activeKey?: TabKey;
  activeTabRef?: Ref<HTMLAnchorElement>;
  children?: ReactNode;
  onTabClick?: Bivariant<(eventKey: TabKey) => void>;
  onTabKeyDown?: Bivariant<
    (eventKey: TabKey, e: React.KeyboardEvent<HTMLAnchorElement>) => void
  >;
  tooltip?: ReactNode;
  tooltipIcon?: string;
};

const DefaultTabItemRenderer: FC<{ children?: ReactNode }> = (props) => {
  const el = React.Children.only(props.children);
  return React.isValidElement(el) ? el : <>{el}</>;
};

/**
 *
 */
export type TabItemProps<RendererProps extends TabItemRendererProps> = {
  tabItemRenderer?: ComponentType<RendererProps>;
  rendererProps?: Omit<RendererProps, keyof TabItemRendererProps>;
} & Omit<
  TabItemRendererProps,
  'type' | 'activeKey' | 'activeTabRef' | 'onTabClick' | 'onTabKeyDown'
>;

/**
 *
 */
const TabItem = <RendererProps extends TabItemRendererProps>(
  props: TabItemProps<RendererProps>
) => {
  const { title, alt, eventKey, menu, menuIcon, tooltip, tooltipIcon } = props;
  const { type, activeTabRef } = useContext(TabsContext);
  const activeKey = useContext(TabsActiveKeyContext);
  const { onTabClick, onTabKeyDown } = useContext(TabsHandlersContext);
  const { tabId } = useTabIds(eventKey);
  let { menuItems } = props;
  menuItems = menu
    ? React.Children.toArray(
        (menu.props as unknown as { children?: ReactNode }).children || []
      ).map((el) => (React.isValidElement(el) ? el : <>{el}</>))
    : menuItems;
  const menuProps = (menu?.props as unknown) ?? {};
  const isActive = eventKey === activeKey;
  const tabItemClassName = classnames(
    'react-slds-tab-item',
    `slds-tabs_${type}__item`,
    { 'slds-is-active': isActive },
    { 'react-slds-tab-with-menu': menu || menuItems }
  );
  const tabLinkClassName = `slds-tabs_${type}__link`;
  const {
    tabItemRenderer: TabItemRenderer = DefaultTabItemRenderer,
    rendererProps,
    ...rprops
  } = props;
  const itemRendererProps = {
    ...rendererProps,
    ...rprops,
    type,
    activeKey,
    activeTabRef,
    onTabClick,
    onTabKeyDown,
  } as RendererProps;
  return (
    <li className={tabItemClassName} title={alt} role='presentation'>
      <TabItemRenderer {...itemRendererProps}>
        <span
          className={`react-slds-tab-item-content ${
            tooltip ? 'react-slds-tooltip-enabled' : ''
          }`}
        >
          <a
            className={tabLinkClassName}
            role='tab'
            ref={isActive ? activeTabRef : undefined}
            tabIndex={isActive ? 0 : -1}
            aria-selected={isActive}
            aria-controls={tabId}
            onClick={
              eventKey != null ? () => onTabClick?.(eventKey) : undefined
            }
            onKeyDown={
              eventKey != null ? (e) => onTabKeyDown?.(eventKey, e) : undefined
            }
          >
            {title}
          </a>
          {tooltip ? (
            <TooltipContent icon={tooltipIcon}>{tooltip}</TooltipContent>
          ) : null}
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
const TabNav: FC<{ children?: ReactNode }> = (props) => {
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
export type TabProps<RendererProps extends TabItemRendererProps> = {
  className?: string;
  eventKey?: TabKey;
  children?: ReactNode;
} & TabItemProps<RendererProps>;

export const Tab = <
  RendererProps extends TabItemRendererProps = TabItemRendererProps,
>(
  props: TabProps<RendererProps>
) => {
  const { className, eventKey, children } = props;
  const activeKey = useContext(TabsActiveKeyContext);
  const { tabId } = useTabIds(eventKey);
  return (
    <TabContent
      id={tabId}
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
  onSelect?: Bivariant<(tabKey: TabKey) => void>;
};

/**
 *
 */
function useInitComponentStyle() {
  useEffect(() => {
    registerStyle('tab-menu', [
      [
        '.react-slds-tab-item.react-slds-tab-with-menu',
        '{ position: relative !important; overflow: visible !important; }',
      ],
      [
        '.react-slds-tab-item.react-slds-tab-with-menu > .react-slds-tab-item-content',
        '{ overflow: hidden }',
      ],
      [
        '.react-slds-tab-item.react-slds-tab-with-menu > .react-slds-tab-item-content > a',
        '{ padding-right: 2rem; }',
      ],
      [
        '.react-slds-tab-item.react-slds-tab-with-menu > .react-slds-tab-item-content.react-slds-tooltip-enabled > a',
        '{ padding-right: 3.5rem; }',
      ],
      ['.react-slds-tab-menu', '{ position: absolute; top: 0; right: 0; }'],
      [
        '.react-slds-tab-item.react-slds-tab-with-menu .react-slds-tab-item-content .react-slds-tooltip-content',
        '{ position: absolute; top: 0.6rem; right: 2.25rem; }',
      ],
      [
        '.react-slds-tab-menu button',
        '{ height: 2.5rem; line-height: 2rem; width: 2rem; visibility: hidden; justify-content: center }',
      ],
      [
        '.react-slds-tab-item.slds-is-active .react-slds-tab-menu button',
        '.react-slds-tab-item:hover .react-slds-tab-menu button',
        '.react-slds-tab-item .react-slds-tab-menu button:focus',
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

  const onTabClick = useEventCallback((tabKey: TabKey) => {
    onSelect?.(tabKey);
    setActiveKey(tabKey);
    setFocusTab(true);
  });

  const onTabKeyDown = useEventCallback(
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
    }
  );

  useEffect(() => {
    if (focusTab) {
      activeTabRef.current?.focus();
      setFocusTab(false);
    }
  }, [focusTab]);

  const tabIdPrefix = useId();
  const tabItemIdPrefix = useId();
  const tabCtx = useMemo(
    () => ({ type, activeTabRef, tabIdPrefix, tabItemIdPrefix }),
    [type, tabIdPrefix, tabItemIdPrefix]
  );

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
