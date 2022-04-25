import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, select } from '@storybook/addon-knobs';
import {
  Tabs,
  Tab,
  TabType,
  Icon,
  MenuItem,
  TabItemRendererProps,
} from '../src/scripts';

function createMenu() {
  return [1, 2, 3].map((i) => <MenuItem key={i}>Item #{i}</MenuItem>);
}

function CustomTabItemContent(props: TabItemRendererProps) {
  const {
    activeKey,
    activeTabRef,
    eventKey,
    icon,
    title,
    onTabClick,
    onTabKeyDown,
  } = props;
  const isActive = eventKey === activeKey;
  return (
    <a
      role='tab'
      ref={isActive ? activeTabRef : undefined}
      style={{
        opacity: isActive ? 1.0 : 0.5,
        border: 0,
      }}
      tabIndex={isActive ? 0 : -1}
      aria-selected={isActive}
      onClick={() => onTabClick && eventKey != null && onTabClick(eventKey)}
      onKeyDown={(e) =>
        onTabKeyDown && eventKey != null && onTabKeyDown(eventKey, e)
      }
    >
      <Icon icon={icon} size='small' />
      <span className='slds-p-horizontal_x-small'>{title}</span>
    </a>
  );
}

export default {
  title: 'Tabs',
};
export const ControlledWithKnobs = {
  render: () => {
    const typeOptions = {
      '(none)': '',
      default: 'default',
      scoped: 'scoped',
    };
    const type = select('type', typeOptions, '') as TabType;
    return (
      <Tabs
        type={type}
        activeKey={text('activeKey', '')}
        onSelect={action('select')}
      >
        <Tab eventKey='1' title='Tab 1'>
          This is in tab #1
        </Tab>
        <Tab eventKey='2' title='Tab 2'>
          This is in tab #2
        </Tab>
        <Tab eventKey='3' title='Tab 3'>
          This is in tab #3
        </Tab>
      </Tabs>
    );
  },
  name: 'Controlled with knobs',
  parameters: {
    info: 'Tabs controlled with knobs',
  },
};
export const Default = {
  render: () => (
    <Tabs type='default' defaultActiveKey='1' onSelect={action('select')}>
      <Tab eventKey='1' title='Tab 1'>
        This is in tab #1
      </Tab>
      <Tab eventKey='2' title='Tab 2'>
        This is in tab #2
      </Tab>
      <Tab eventKey='3' title='Tab 3'>
        This is in tab #3
      </Tab>
    </Tabs>
  ),
  parameters: {
    info: 'Default Tabs',
  },
};
export const Scoped = {
  render: () => (
    <Tabs type='scoped' defaultActiveKey='1' onSelect={action('select')}>
      <Tab eventKey='1' title='Tab 1'>
        This is in tab #1
      </Tab>
      <Tab eventKey='2' title='Tab 2'>
        This is in tab #2
      </Tab>
      <Tab eventKey='3' title='Tab 3'>
        This is in tab #3
      </Tab>
    </Tabs>
  ),
  parameters: {
    info: 'Scoped Tabs',
  },
};
export const WithDropdownDefault = {
  render: () => (
    <Tabs type='default' defaultActiveKey='1' onSelect={action('select')}>
      <Tab eventKey='1' title='Tab 1' menuItems={createMenu()}>
        This is in tab #1
      </Tab>
      <Tab eventKey='2' title='Tab 2' menuItems={createMenu()}>
        This is in tab #2
      </Tab>
      <Tab eventKey='3' title='Tab 3' menuItems={createMenu()}>
        This is in tab #3
      </Tab>
    </Tabs>
  ),
  name: 'With Dropdown (Default)',
  parameters: {
    info: 'Default tabs with dropdown menu',
  },
};
export const WithDropdownScoped = {
  render: () => (
    <Tabs type='scoped' defaultActiveKey='1' onSelect={action('select')}>
      <Tab eventKey='1' title='Tab 1' menuItems={createMenu()}>
        This is in tab #1
      </Tab>
      <Tab eventKey='2' title='Tab 2' menuItems={createMenu()}>
        This is in tab #2
      </Tab>
      <Tab eventKey='3' title='Tab 3' menuItems={createMenu()}>
        This is in tab #3
      </Tab>
    </Tabs>
  ),
  name: 'With Dropdown (Scoped)',
  parameters: {
    info: 'Scoped tabs with dropdown menu',
  },
};
export const CustomTabItem = {
  render: () => (
    <Tabs type='default' defaultActiveKey='1' onSelect={action('select')}>
      <Tab
        eventKey='1'
        title='Tab 1'
        icon='standard:account'
        tabItemRenderer={CustomTabItemContent}
      >
        This is in tab #1
      </Tab>
      <Tab
        eventKey='2'
        title='Tab 2'
        icon='standard:contact'
        tabItemRenderer={CustomTabItemContent}
      >
        This is in tab #2
      </Tab>
      <Tab
        eventKey='3'
        title='Tab 3'
        icon='standard:opportunity'
        tabItemRenderer={CustomTabItemContent}
      >
        This is in tab #3
      </Tab>
    </Tabs>
  ),
  parameters: {
    info: 'Tab with custom tab item content',
  },
};
