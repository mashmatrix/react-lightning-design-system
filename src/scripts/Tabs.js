import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { registerStyle } from './util';
import DropdownButton from './DropdownButton';
import { MenuItem } from './DropdownMenu';
import PropTypes from 'prop-types';

export default class Tabs extends Component {
  constructor(props) {
    super(props);
    const [visibleTabs, hiddenTabs] = this.getvisibleAndHiddenTabs(props);

    this.state = {
      visibleTabs,
      hiddenTabs,
    };

    this.modifyVisibleTabs = this.modifyVisibleTabs.bind(this);
    this.activeTabRef = this.activeTabRef.bind(this);

    registerStyle('tab-menu', [
      [
        '.slds-tabs__item.react-slds-tab-with-menu',
        '{ position: relative !important; overflow: visible !important; }',
      ],
      [
        '.slds-tabs__item.react-slds-tab-with-menu > .react-slds-tab-item-inner',
        '{ overflow: hidden }',
      ],
      [
        '.slds-tabs__item.react-slds-tab-with-menu > .react-slds-tab-item-inner > a',
        '{ padding-right: 2rem; }',
      ],
      [
        '.react-slds-tab-menu',
        '{ position: absolute; top: 0; right: 0; visibility: hidden }',
      ],
      [
        '.react-slds-tab-menu button',
        '{ height: 3rem; line-height: 3rem; width: 2rem; }',
      ],
      [
        '.slds-tabs__item.slds-active .react-slds-tab-menu',
        '.slds-tabs__item:hover .react-slds-tab-menu',
        '{ visibility: visible }',
      ],
    ]);
  }

  componentWillReceiveProps(nextProps) {
    const [visibleTabs, hiddenTabs] = this.getvisibleAndHiddenTabs(nextProps);
    this.setState({
      visibleTabs,
      hiddenTabs,
    });
  }

  componentDidUpdate() {
    if (this.state.focusTab) {
      const el = ReactDOM.findDOMNode(this.activeTab);
      if (el) {
        el.focus();
      }
      /* eslint-disable react/no-did-update-set-state */
      this.setState({ focusTab: false });
    }
  }

  onTabClick(tabKey) {
    if (this.props.onSelect) {
      this.props.onSelect(tabKey);
    }
    // Uncontrolled
    this.setState({ activeKey: tabKey, focusTab: true });
  }

  onTabKeyDown(tabKey, e) {
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

  getActiveKey(props) {
    const { activeKey, defaultActiveKey } = props;
    if (typeof activeKey !== 'undefined') return activeKey;
    if (this.state && typeof this.state.activeKey !== 'undefined') return this.state.activeKey;
    return defaultActiveKey;
  }

  getvisibleAndHiddenTabs(props) {
    const { children, maxVisibleTabs } = props;

    const [visibleTabs, hiddenTabs] = [
      children.slice(0, maxVisibleTabs),
      children.slice(maxVisibleTabs, children.length),
    ];
    const activeKey = this.getActiveKey(props);
    const isActiveTabHidden = hiddenTabs.findIndex(tab => tab.props.eventKey === activeKey) !== -1;
    return isActiveTabHidden ?
      this.selectHiddenTab(visibleTabs, hiddenTabs, activeKey) : [visibleTabs, hiddenTabs];
  }

  selectHiddenTab(visibleTabs, hiddenTabs, activeKey) {
    const tabToShowIndex = hiddenTabs.findIndex(tab => tab.props.eventKey === activeKey);
    const tabToShow = hiddenTabs[tabToShowIndex];
    const tabToHide = visibleTabs[visibleTabs.length - 1];
    const newVisibleTabs = [...visibleTabs.slice(0, visibleTabs.length - 1), tabToShow];
    const newHiddenTabs = [
      tabToHide,
      ...hiddenTabs.filter(tab => tab.props.eventKey !== activeKey),
    ];

    return [newVisibleTabs, newHiddenTabs];
  }

  tabsType() {
    return this.props.type === 'scoped' ? 'scoped' : 'default';
  }

  modifyVisibleTabs(event) {
    const { tabIndex } = event;
    this.props.onSelect(tabIndex);
    const [visibleTabs, hiddenTabs] =
      this.selectHiddenTab(this.state.visibleTabs, this.state.hiddenTabs, tabIndex);

    this.setState({
      visibleTabs,
      hiddenTabs,
      activeKey: tabIndex,
      focusTab: true,
    });
  }

  activeTabRef(ref) {
    this.activeTab = ref;
  }

  renderController() {
    const label = 'More';
    const normalizedLabel = this.props.allCaps ? label.toUpperCase() : label;
    const marginTop = this.props.allCaps ? 4 : 7;
    return (
      <DropdownButton
        label={normalizedLabel}
        style={{ marginTop, marginLeft: 20, color: '#54698d' }}
        onMenuItemClick={this.modifyVisibleTabs}
      >
        {
          this.state.hiddenTabs.map((tab) => (
            <MenuItem key={tab.props.eventKey} tabIndex={tab.props.eventKey}>
              {tab.props.title}
            </MenuItem>
          ))
        }
      </DropdownButton>
    );
  }

  renderTabNav() {
    const type = this.tabsType();
    const { children, maxVisibleTabs } = this.props;
    const currentActiveKey = this.getActiveKey(this.props);
    const tabNavClassName = `slds-tabs--${type}__nav`;
    return (
      <ul className={ tabNavClassName } role='tablist'>
      {
        this.state.visibleTabs.map((tab) => {
          const { title, eventKey, menu, menuIcon } = tab.props;
          let { menuItems } = tab.props;
          menuItems = menu ? menu.props.children : menuItems;
          const menuProps = menu ? menu.props : {};
          const isActive = eventKey === currentActiveKey;
          const tabItemClassName = classnames(
            'slds-tabs__item',
            `slds-tabs--${type}__item`,
            'slds-text-heading---label',
            { 'slds-active': isActive },
            { 'react-slds-tab-with-menu': menu || menuItems }
          );
          const tabLinkClassName = `slds-tabs--${type}__link`;
          return (
            <li className={ tabItemClassName } role='presentation' key={tab.props.eventKey}>
              <span className='react-slds-tab-item-inner'>
                <a
                  className={ tabLinkClassName }
                  onClick={ this.onTabClick.bind(this, eventKey) }
                  onKeyDown={ this.onTabKeyDown.bind(this, eventKey) }
                  role='tab'
                  ref={ isActive ? this.activeTabRef : null }
                  tabIndex={ isActive ? 0 : -1 }
                  aria-selected={ isActive }
                >
                  { title }
                </a>
                { menuItems ? this.renderTabMenu(menuIcon, menuItems, menuProps) : null }
              </span>
            </li>
          );
        })
      }
      {
        maxVisibleTabs < children.length && this.renderController()
      }
      </ul>
    );
  }

  renderTabMenu(menuIcon = 'down', menuItems = [], menuProps = {}) {
    return (
      <DropdownButton
        className='react-slds-tab-menu'
        icon={ menuIcon }
        type='icon-bare'
        iconSize='small'
        nubbinTop
        { ...menuProps }
      >
        { menuItems }
      </DropdownButton>
    );
  }

  renderTabPanel() {
    const activeKey = this.getActiveKey(this.props);
    return (
      this.state.visibleTabs.map((tab) => {
        const { eventKey } = tab.props;
        const isActive = eventKey === activeKey;
        return React.cloneElement(tab, { active: isActive, key: tab.props.eventKey });
      })
    );
  }

  render() {
    const { className } = this.props;
    const tabsClassNames = classnames(className, `slds-tabs--${this.tabsType()}`);
    return (
      <div className={ tabsClassNames }>
        { this.renderTabNav() }
        { this.renderTabPanel() }
      </div>
    );
  }
}

const TAB_TYPES = ['default', 'scoped'];

Tabs.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(TAB_TYPES),
  defaultActiveKey: PropTypes.any,
  activeKey: PropTypes.any,
  onSelect: PropTypes.func,
  children: PropTypes.node,
  controller: PropTypes.node,
  maxVisibleTabs: PropTypes.number,
  allCaps: PropTypes.bool,
};

Tabs.defaultProps = {
  maxVisibleTabs: 10,
};
