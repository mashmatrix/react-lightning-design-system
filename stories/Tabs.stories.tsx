import React from 'react';
import {
  Tabs,
  Tab,
  Icon,
  MenuItem,
  TabItemRendererProps,
} from '../src/scripts';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

/**
 *
 */
function createMenu() {
  return [1, 2, 3].map((i) => <MenuItem key={i}>Item #{i}</MenuItem>);
}

/**
 *
 */
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
      <Icon icon={icon as string} size='small' />
      <span className='slds-p-horizontal_x-small'>{title}</span>
    </a>
  );
}

/**
 *
 */
const meta: ComponentMeta<typeof Tabs> = {
  title: 'Tabs',
  component: Tabs,
  argTypes: {
    onSelect: { action: 'select' },
  },
};
export default meta;

/**
 *
 */
export const ControlledWithKnobs: ComponentStoryObj<typeof Tabs> = {
  render: (args) => (
    <Tabs {...args}>
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
  name: 'Controlled with knobs',
  args: {
    activeKey: '1',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs controlled with knobs',
      },
    },
  },
};

/**
 *
 */
export const Default: ComponentStoryObj<typeof Tabs> = {
  render: (args) => (
    <Tabs {...args}>
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
  args: {
    type: 'default',
    defaultActiveKey: '1',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default Tabs',
      },
    },
  },
};

/**
 *
 */
export const Scoped: ComponentStoryObj<typeof Tabs> = {
  ...Default,
  args: {
    type: 'scoped',
    defaultActiveKey: '1',
  },
  parameters: {
    docs: {
      description: {
        story: 'Scoped Tabs',
      },
    },
  },
};

/**
 *
 */
export const WithDropdownDefault: ComponentStoryObj<typeof Tabs> = {
  render: (args) => (
    <Tabs {...args}>
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
  args: {
    type: 'default',
    defaultActiveKey: '1',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default tabs with dropdown menu',
      },
    },
  },
};

/**
 *
 */
export const WithDropdownScoped: ComponentStoryObj<typeof Tabs> = {
  ...WithDropdownDefault,
  name: 'With Dropdown (Scoped)',
  args: {
    type: 'scoped',
    defaultActiveKey: '1',
  },
  parameters: {
    docs: {
      description: {
        story: 'Scoped tabs with dropdown menu',
      },
    },
  },
};

/**
 *
 */
export const CustomTabItem: ComponentStoryObj<typeof Tabs> = {
  render: (args) => (
    <Tabs {...args}>
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
  args: {
    type: 'default',
    defaultActiveKey: '1',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tab with custom tab item content',
      },
    },
  },
};
