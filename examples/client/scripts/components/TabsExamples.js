import React from 'react';

import { Tabs, Tab, SalesPath, MenuItem, DropdownButton } from 'react-lightning-design-system';
const { PathItem } = SalesPath;

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
          <Tabs
            type='scoped'
            onSelect={ this.onTabSelect.bind(this) }
            defaultActiveKey={1}
            maxVisibleTabs={3}
          >
            <Tab eventKey={1} title='Tab #A1'>This is in tab #A1</Tab>
            <Tab eventKey={2} title='Tab #A2'>This is in tab #A2</Tab>
            <Tab eventKey={3} title='Tab #A3'>This is in tab #A3</Tab>
            <Tab eventKey={4} title='Tab #A4'>This is in tab #A4</Tab>
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
            <Tab eventKey={1} title='Tab #1' menuIcon='settings' menuItems={ createMenu() }>
              This is in tab #1
            </Tab>
            <Tab eventKey={2} title='Tab #2' menuIcon='settings' menuItems={ createMenu() }>
              This is in tab #2
            </Tab>
            <Tab eventKey={3} title='Tab #3' menuIcon='settings' menuItems={ createMenu() }>
              This is in tab #3
            </Tab>
          </Tabs>
        </div>
        <h2 className='slds-m-vertical--medium'>Sales Path</h2>
        <div style={ styles }>
          <SalesPath
            defaultActiveKey={2}
            activeKey={ this.state.salesPathActiveKey }
            onSelect={ (item) => this.setState({ salesPathActiveKey: item }) }
          >
            <PathItem eventKey={1} title='Draft' completedTitle='Draft Complete' />
            <PathItem eventKey={2} title='Active' />
            <PathItem eventKey={3} title='Complete' />
          </SalesPath>
        </div>
      </div>
    );
  }
}
