import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default class Tabs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    if (this.state.focusTab) {
      let el = React.findDOMNode(this.refs.activeTab);
      if (el) {
        el.focus();
      }
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
      let tabKeys = [];
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
    const { className, children, ...props } = this.props;
    const type = this.props.type === 'scoped' ? 'scoped' : 'default';
    const tabsClassNames = classnames(className, `slds-tabs--${type}`);
    return (
      <div className={ tabsClassNames }>
        { this.renderTabNav(type, children) }
        { React.Children.map(children, this.renderTabPanel.bind(this)) }
      </div>
    );
  }

  renderTabNav(type, tabs) {
    const activeKey =
      typeof this.props.activeKey !== 'undefined' ? this.props.activeKey :
      typeof this.state.activeKey !== 'undefined' ? this.state.activeKey :
      this.props.defaultActiveKey;
    const tabNavClassName = `slds-tabs--${type}__nav`;
    return (
      <ul className={ tabNavClassName } role="tablist">
      {
        React.Children.map(tabs, (tab) => {
          const { title, eventKey } = tab.props;
          const isActive = eventKey === activeKey;
          const tabItemClassName = classnames(
            'slds-tabs__item',
            'slds-text-heading---label',
            { 'slds-active': isActive }
          );
          return (
            <li className={ tabItemClassName } role='presentation'>
              <a onClick={ this.onTabClick.bind(this, eventKey) }
                 onKeyDown={ this.onTabKeyDown.bind(this, eventKey) }
                 role="tab"
                 ref={ isActive ? 'activeTab' : null }
                 tabIndex={ isActive ? 0 : -1 }
                 aria-selected={ isActive }>
                { title }
              </a>
            </li>
          );
        })
      }
      </ul>
    );
  }

  renderTabPanel(tab) {
    const activeKey = this.props.activeKey || this.state.activeKey || this.props.defaultActiveKey;
    const { eventKey } = tab.props;
    const isActive = eventKey === activeKey;
    return React.cloneElement(tab, { active: isActive });
  }

}

const TAB_TYPES = [ 'default', 'scoped' ];

Tabs.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(TAB_TYPES),
  defaultActiveKey: PropTypes.any,
  activeKey: PropTypes.any,
};
