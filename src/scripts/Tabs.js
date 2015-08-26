import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default class Tabs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onTabClick(tabKey) {
    if (this.props.onSelect) {
      this.props.onSelect(tabKey);
    }
    // Uncontrolled
    if (typeof this.props.activeKey === 'undefined') {
      this.setState({ activeKey: tabKey });
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
    const activeKey = this.props.activeKey || this.state.activeKey || this.props.defaultActiveKey;
    const tabNavClassName = `slds-tabs--${type}__nav`;
    return (
      <ul className={ tabNavClassName } role="tablist">
      {
        React.Children.map(tabs, (tab, idx) => {
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
                 role="tab"
                 tabIndex={ idx }
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
