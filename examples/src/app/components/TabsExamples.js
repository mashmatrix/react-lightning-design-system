import React from 'react';

import { Tabs, Tab } from 'react-lightning-design-system';
import { MenuItem } from 'react-lightning-design-system';

function createMenu() {
  return [1, 2, 3].map((i) => <MenuItem key={i}>Item #{i}</MenuItem>);
}

export default class TabsExamples extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeKey: 1 };
  }

  onTabSelect(key) {
    this.setState({ activeKey: key });
  }

  render() {
    const styles = { padding: '12px' };
    return (
      <div>
        <h2 className='slds-m-vertical--medium'>Default Tabs</h2>
        <div style={ styles }>
          <Tabs type='default' defaultActiveKey={1}>
            <Tab eventKey={1} title='Tab #1'>This is in tab #1</Tab>
            <Tab eventKey={2} title='Tab #2'>This is in tab #2</Tab>
            <Tab eventKey={3} title='Tab #3'>This is in tab #3</Tab>
          </Tabs>
        </div>
        <h2 className='slds-m-vertical--medium'>Scoped Tabs</h2>
        <div style={ styles }>
          <Tabs type='scoped' activeKey={ this.state.activeKey } onSelect={ this.onTabSelect.bind(this) }>
            <Tab eventKey={1} title='Tab #1'>This is in tab #1</Tab>
            <Tab eventKey={2} title='Tab #2'>This is in tab #2</Tab>
            <Tab eventKey={3} title='Tab #3'>This is in tab #3</Tab>
          </Tabs>
        </div>
        <h2 className='slds-m-vertical--medium'>Tab with Dropdown Menu</h2>
        <div style={ styles }>
          <Tabs type='default' defaultActiveKey={1}>
            <Tab eventKey={1} title='Tab #1' menuItems={ createMenu() }>This is in tab #1</Tab>
            <Tab eventKey={2} title='Tab #2' menuItems={ createMenu() }>This is in tab #2</Tab>
            <Tab eventKey={3} title='Tab #3' menuItems={ createMenu() }>This is in tab #3</Tab>
          </Tabs>
        </div>
        <h2 className='slds-m-vertical--medium'>Tab with Dropdown Menu (scoped)</h2>
        <div style={ styles }>
          <Tabs type='scoped' defaultActiveKey={1}>
            <Tab eventKey={1} title='Tab #1' menuIcon='settings' menuItems={ createMenu() }>This is in tab #1</Tab>
            <Tab eventKey={2} title='Tab #2' menuIcon='settings' menuItems={ createMenu() }>This is in tab #2</Tab>
            <Tab eventKey={3} title='Tab #3' menuIcon='settings' menuItems={ createMenu() }>This is in tab #3</Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}
