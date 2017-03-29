import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { withKnobs, text } from '@kadira/storybook-addon-knobs';
import { Tabs, Tab, Icon, MenuItem } from '../src/scripts';

function createMenu() {
  return [1, 2, 3].map(i => <MenuItem key={i}>Item #{i}</MenuItem>);
}

function CustomTabItemContent(props) {
  /* eslint-disable react/prop-types */
  const {
    activeKey, activeTabRef, eventKey, icon, title,
    onTabClick, onTabKeyDown,
  } = props;
  /* eslint-enable react/prop-types */
  const isActive = eventKey === activeKey;
  return (
    <a
      role='tab'
      ref={ isActive ? activeTabRef : undefined }
      style={ { opacity: isActive ? 1.0 : 0.5, border: 0 } }
      tabIndex={ isActive ? 0 : -1 }
      aria-selected={ isActive }
      onClick={ () => onTabClick(eventKey) }
      onKeyDown={ e => onTabKeyDown(eventKey, e) }
    >
      <Icon icon={ icon } size='small' />
      <span className='slds-p-horizontal--x-small'>{ title }</span>
    </a>
  );
}

storiesOf('Tabs', module)
  .addDecorator(withKnobs)
  .addWithInfo('Controlled with knobs', 'Tabs controlled with knobs', () => (
    <Tabs
      type={ text('type', 'default') }
      activeKey={ text('activeKey') }
      onSelect={ action('select') }
    >
      <Tab eventKey='1' title='Tab 1'>This is in tab #1</Tab>
      <Tab eventKey='2' title='Tab 2'>This is in tab #2</Tab>
      <Tab eventKey='3' title='Tab 3'>This is in tab #3</Tab>
    </Tabs>
  ))
  .addWithInfo('Default', 'Default Tabs', () => (
    <Tabs type='default' defaultActiveKey='1' onSelect={ action('select') }>
      <Tab eventKey='1' title='Tab 1'>This is in tab #1</Tab>
      <Tab eventKey='2' title='Tab 2'>This is in tab #2</Tab>
      <Tab eventKey='3' title='Tab 3'>This is in tab #3</Tab>
    </Tabs>
  ))
  .addWithInfo('Scoped', 'Scoped Tabs', () => (
    <Tabs type='scoped' defaultActiveKey='1' onSelect={ action('select') }>
      <Tab eventKey='1' title='Tab 1'>This is in tab #1</Tab>
      <Tab eventKey='2' title='Tab 2'>This is in tab #2</Tab>
      <Tab eventKey='3' title='Tab 3'>This is in tab #3</Tab>
    </Tabs>
  ))
  .addWithInfo('With Dropdown (Default)', 'Default tabs with dropdown menu', () => (
    <Tabs type='default' defaultActiveKey='1' onSelect={ action('select') }>
      <Tab eventKey='1' title='Tab 1' menuItems={ createMenu() }>This is in tab #1</Tab>
      <Tab eventKey='2' title='Tab 2' menuItems={ createMenu() }>This is in tab #2</Tab>
      <Tab eventKey='3' title='Tab 3' menuItems={ createMenu() }>This is in tab #3</Tab>
    </Tabs>
  ))
  .addWithInfo('With Dropdown (Scoped)', 'Scoped tabs with dropdown menu', () => (
    <Tabs type='scoped' defaultActiveKey='1' onSelect={ action('select') }>
      <Tab eventKey='1' title='Tab 1' menuItems={ createMenu() }>This is in tab #1</Tab>
      <Tab eventKey='2' title='Tab 2' menuItems={ createMenu() }>This is in tab #2</Tab>
      <Tab eventKey='3' title='Tab 3' menuItems={ createMenu() }>This is in tab #3</Tab>
    </Tabs>
  ))
  .addWithInfo('Custom Tab Item', 'Tab with custom tab item content', () => (
    <Tabs type='default' defaultActiveKey='1' onSelect={ action('select') }>
      <Tab eventKey='1' title='Tab 1' icon='standard:account' tabItemRenderer={ CustomTabItemContent }>
        This is in tab #1
      </Tab>
      <Tab eventKey='2' title='Tab 2' icon='standard:contact' tabItemRenderer={ CustomTabItemContent }>
        This is in tab #2
      </Tab>
      <Tab eventKey='3' title='Tab 3' icon='standard:opportunity' tabItemRenderer={ CustomTabItemContent }>
        This is in tab #3
      </Tab>
    </Tabs>
  ))
;
