import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { registerStyle } from './util';
import DropdownButton from './DropdownButton';

/**
 *
 */
const TabContent = (props) => {
  const { className, active, children, ...pprops } = props;
  const tabClassNames = classnames(
    className,
    'slds-tabs__content',
    `slds-${active ? 'show' : 'hide'}`
  );
  return (
    <div className={ tabClassNames } role='tabpanel' { ...pprops }>
      { children }
    </div>
  );
};

TabContent.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  children: PropTypes.node,
};

/**
 *
 */
const TabMenu = (props) => {
  const { icon = 'down', children, ...pprops } = props;
  return (
    <DropdownButton
      className='react-slds-tab-menu'
      icon={ icon }
      type='icon-bare'
      iconSize='small'
      nubbinTop
      { ...pprops }
    >
      { children }
    </DropdownButton>
  );
};

TabMenu.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.node,
};

const DefaultTabItemRenderer = props => (
  React.Children.only(props.children)
);

DefaultTabItemRenderer.propTypes = {
  children: PropTypes.node,
};


/**
 *
 */
const TabItem = (props) => {
  const {
    type, title, activeKey, eventKey, activeTabRef,
    menu, menuIcon,
    onTabClick, onTabKeyDown,
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
  const { tabItemRenderer: TabItemRenderer = DefaultTabItemRenderer, ...pprops } = props;
  return (
    <li className={ tabItemClassName } role='presentation'>
      <TabItemRenderer { ...pprops }>
        <span className='react-slds-tab-item-content'>
          <a
            className={ tabLinkClassName }
            role='tab'
            ref={ isActive ? activeTabRef : undefined }
            tabIndex={ isActive ? 0 : -1 }
            aria-selected={ isActive }
            onClick={ () => onTabClick(eventKey) }
            onKeyDown={ e => onTabKeyDown(eventKey, e) }
          >
            { title }
          </a>
          {
            menuItems ?
              <TabMenu icon={ menuIcon } { ...menuProps }>{ menuItems }</TabMenu> :
              undefined
          }
        </span>
      </TabItemRenderer>
    </li>
  );
};

TabItem.propTypes = {
  type: PropTypes.string,
  activeTabRef: PropTypes.func,
  title: PropTypes.string,
  menu: PropTypes.element,
  menuItems: PropTypes.arrayOf(PropTypes.element),
  menuIcon: PropTypes.string,
  eventKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  activeKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  tabItemRenderer: PropTypes.func,
  onTabClick: PropTypes.func,
  onTabKeyDown: PropTypes.func,
};

/**
 *
 */
const TabNav = (props) => {
  const {
    type, tabs, activeKey, activeTabRef,
    onTabClick, onTabKeyDown,
  } = props;
  const tabNavClassName = `slds-tabs--${type}__nav`;
  return (
    <ul className={ tabNavClassName } role='tablist'>
      {
        React.Children.map(tabs, tab => (
          <TabItem
            { ...tab.props }
            type={ type }
            activeKey={ activeKey }
            activeTabRef={ activeTabRef }
            onTabClick={ onTabClick }
            onTabKeyDown={ onTabKeyDown }
          />
        ))
      }
    </ul>
  );
};

TabNav.propTypes = {
  type: PropTypes.string,
  activeKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  activeTabRef: PropTypes.func,
  tabs: PropTypes.node,
  onTabClick: PropTypes.func,
  onTabKeyDown: PropTypes.func,
};

/**
 *
 */
export const Tab = (props) => {
  const { className, eventKey, activeKey, children } = props;
  return (
    <TabContent className={ className } active={ eventKey === activeKey }>
      { children }
    </TabContent>
  );
};

Tab.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  eventKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  menu: PropTypes.element,
  menuItems: PropTypes.arrayOf(PropTypes.element),
  menuIcon: PropTypes.string,
  activeKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  children: PropTypes.node,
  tabItemRenderer: PropTypes.func,
};

/**
 *
 */
export default class Tabs extends Component {

  constructor() {
    super();
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
      [
        '.react-slds-tab-menu',
        '{ position: absolute; top: 0; right: 0; }',
      ],
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

  onTabClick = (tabKey) => {
    if (this.props.onSelect) {
      this.props.onSelect(tabKey);
    }
    // Uncontrolled
    this.setState({ activeKey: tabKey, focusTab: true });
  }

  onTabKeyDown = (tabKey, e) => {
    if (e.keyCode === 37 || e.keyCode === 39) { // left/right cursor key
      let idx = 0;
      const tabKeys = [];
      React.Children.forEach(this.props.children, (tab, i) => {
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
  }

  render() {
    const { className, children } = this.props;
    const type = this.props.type === 'scoped' ? 'scoped' : 'default';
    const tabsClassNames = classnames(className, `slds-tabs--${type}`);
    const activeKey =
      typeof this.props.activeKey !== 'undefined' ? this.props.activeKey :
      typeof this.state.activeKey !== 'undefined' ? this.state.activeKey :
      this.props.defaultActiveKey;
    return (
      <div className={ tabsClassNames }>
        <TabNav
          type={ type }
          activeKey={ activeKey }
          activeTabRef={ (node) => { this.activeTab = node; } }
          tabs={ children }
          onTabClick={ this.onTabClick }
          onTabKeyDown={ this.onTabKeyDown }
        />
        { React.Children.map(children, tab => React.cloneElement(tab, { activeKey })) }
      </div>
    );
  }
}

const TAB_TYPES = ['default', 'scoped'];

Tabs.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(TAB_TYPES),
  onSelect: PropTypes.func,
  children: PropTypes.node,
  defaultActiveKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  activeKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};
