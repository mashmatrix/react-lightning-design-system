import React, { FocusEvent, useCallback, useRef, useState } from 'react';
import {
  Tabs,
  Tab,
  Icon,
  MenuItem,
  TabItemRendererProps,
  Button,
  Popover,
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
function CustomTabItemContent(props: TabItemRendererProps & { icon: string }) {
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

function TooltipContent(props: { text: string }) {
  const { text } = props;
  const [isHideTooltip, setIsHideTooltip] = useState(true);
  const popoverRef = useRef<HTMLDivElement>(null);
  const tooltipToggle = useCallback(() => {
    setIsHideTooltip((hidden) => !hidden);
  }, []);
  const onIconBlur = useCallback((e: FocusEvent<HTMLElement>) => {
    if (popoverRef.current !== e.relatedTarget) {
      setIsHideTooltip(true);
    }
  }, []);
  const onPopoverBlur = useCallback(() => {
    setIsHideTooltip(true);
  }, []);
  return (
    <>
      <Button
        type='icon'
        icon='info'
        onClick={tooltipToggle}
        onBlur={onIconBlur}
        title={text}
      />
      <Popover
        ref={popoverRef}
        hidden={isHideTooltip}
        tabIndex={-1}
        onBlur={onPopoverBlur}
        tooltip
      >
        {text}
      </Popover>
    </>
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
export const WithTooltipScoped: ComponentStoryObj<typeof Tabs> = {
  render: (args) => (
    <Tabs {...args}>
      <Tab
        eventKey='1'
        title='Tab 1'
        menuItems={createMenu()}
        tooltip={
          <TooltipContent
            text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
          />
        }
      >
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
  name: 'With Tooltip (Scoped)',
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
        tabItemRenderer={CustomTabItemContent}
        rendererProps={{
          icon: 'standard:account',
        }}
      >
        This is in tab #1
      </Tab>
      <Tab
        eventKey='2'
        title='Tab 2'
        tabItemRenderer={CustomTabItemContent}
        rendererProps={{
          icon: 'standard:contact',
        }}
      >
        This is in tab #2
      </Tab>
      <Tab
        eventKey='3'
        title='Tab 3'
        tabItemRenderer={CustomTabItemContent}
        rendererProps={{
          icon: 'standard:opportunity',
        }}
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
