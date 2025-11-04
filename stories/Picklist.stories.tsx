import React, { ComponentProps } from 'react';
import { Picklist, PicklistItem } from '../src/scripts';
import { Meta, StoryObj } from '@storybook/react';

type StoryProps = ComponentProps<typeof Picklist> & {
  picklistItem1_onClick: ComponentProps<typeof PicklistItem>['onClick'];
  picklistItem2_onClick: ComponentProps<typeof PicklistItem>['onClick'];
  picklistItem3_onClick: ComponentProps<typeof PicklistItem>['onClick'];
};

/**
 *
 */
const meta: Meta<StoryProps> = {
  title: 'Picklist',
  component: Picklist,
  subcomponents: { PicklistItem },
  argTypes: {
    onSelect: { action: 'select' },
    onValueChange: { action: 'valueChange' },
    onBlur: { action: 'blur' },
    onComplete: { action: 'complete' },
    picklistItem1_onClick: { action: 'picklistItem1_click' },
    picklistItem2_onClick: { action: 'picklistItem2_click' },
    picklistItem3_onClick: { action: 'picklistItem3_click' },
  },
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 300,
    },
  },
};
export default meta;

/**
 *
 */
export const ControlledWithKnobs: StoryObj<StoryProps> = {
  name: 'Controlled with knobs',
  render: ({
    picklistItem1_onClick,
    picklistItem2_onClick,
    picklistItem3_onClick,
    ...args
  }) => (
    <Picklist {...args}>
      <PicklistItem
        key='1'
        label='Picklist Item One'
        value='1'
        onClick={picklistItem1_onClick}
      />
      <PicklistItem
        key='2'
        label='Picklist Item Two'
        value='2'
        onClick={picklistItem2_onClick}
      />
      <PicklistItem
        key='3'
        label='Picklist Item Three'
        value='3'
        onClick={picklistItem3_onClick}
      />
    </Picklist>
  ),
  args: {
    label: 'Picklist Label',
  },
  parameters: {
    docs: {
      description: {
        story: 'Picklist controlled with knobs',
      },
    },
  },
};

/**
 *
 */
export const Default: StoryObj<StoryProps> = {
  render: ControlledWithKnobs.render,
  args: {
    ...ControlledWithKnobs.args,
    selectedText: 'Select item from here',
    defaultOpened: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default Picklist control',
      },
    },
  },
};

/**
 *
 */
export const Required: StoryObj<StoryProps> = {
  render: ControlledWithKnobs.render,
  args: {
    ...ControlledWithKnobs.args,
    required: true,
    defaultOpened: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Picklist control with required attribute',
      },
    },
  },
};

/**
 *
 */
export const Error: StoryObj<StoryProps> = {
  render: ControlledWithKnobs.render,
  args: {
    ...ControlledWithKnobs.args,
    required: true,
    error: 'This field is required',
    defaultOpened: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Picklist control with error message',
      },
    },
  },
};

/**
 *
 */
export const DisabledItems: StoryObj<StoryProps> = {
  render: ({
    picklistItem1_onClick,
    picklistItem2_onClick,
    picklistItem3_onClick,
    ...args
  }) => (
    <Picklist {...args}>
      <PicklistItem
        key='1'
        label='Picklist Item One'
        value='1'
        onClick={picklistItem1_onClick}
        disabled
      />
      <PicklistItem
        key='2'
        label='Picklist Item Two'
        value='2'
        onClick={picklistItem2_onClick}
        disabled
      />
      <PicklistItem
        key='3'
        label='Picklist Item Three'
        value='3'
        onClick={picklistItem3_onClick}
        disabled
      />
    </Picklist>
  ),
  args: {
    label: 'Picklist Label',
    defaultOpened: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Picklist with disabled items',
      },
    },
  },
};

/**
 *
 */
export const Disabled: StoryObj<StoryProps> = {
  render: ControlledWithKnobs.render,
  args: {
    ...ControlledWithKnobs.args,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Picklist with disabled status',
      },
    },
  },
};

/**
 *
 */
export const MenuSizeMedium: StoryObj<StoryProps> = {
  render: ControlledWithKnobs.render,
  name: 'Menu Size - Medium',
  args: {
    ...ControlledWithKnobs.args,
    selectedText: 'Select item from here',
    menuSize: 'medium',
    defaultOpened: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Picklist with medium size menu',
      },
    },
  },
};

/**
 *
 */
export const MenuSizeLarge: StoryObj<StoryProps> = {
  render: ControlledWithKnobs.render,
  name: 'Menu Size - Large',
  args: {
    ...ControlledWithKnobs.args,
    selectedText: 'Select item from here',
    menuSize: 'large',
    defaultOpened: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Picklist with large size menu',
      },
    },
  },
};

/**
 *
 */
export const SingleItemSelected: StoryObj<StoryProps> = {
  render: ControlledWithKnobs.render,
  name: 'Single item selected',
  args: {
    ...ControlledWithKnobs.args,
    value: '1',
    defaultOpened: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Picklist with a single item value is specified',
      },
    },
  },
};

/**
 *
 */
export const MultipleItemsSelected: StoryObj<StoryProps> = {
  render: ControlledWithKnobs.render,
  name: 'Multiple items selected',
  args: {
    ...ControlledWithKnobs.args,
    value: ['1', '3'],
    optionsSelectedText: 'multiple items are selected',
    multiSelect: true,
    defaultOpened: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Picklist with multiple item values are specified',
      },
    },
  },
};

/**
 *
 */
export const DropdownScroll: StoryObj<StoryProps> = {
  args: {
    ...ControlledWithKnobs.args,
    selectedText: 'Select item from here',
    menuSize: 'small',
    menuStyle: {
      maxHeight: '20rem',
      overflowY: 'auto',
    },
    defaultOpened: true,
    children: Array.from(Array(20)).map((_, i) => (
      <PicklistItem
        label={`Picklist Item #${i + 1}`}
        value={String(i + 1)}
        key={String(i + 1)}
      />
    )),
  },
  parameters: {
    docs: {
      description: {
        story: 'Picklist control with many items',
      },
      iframeHeight: 400,
    },
  },
};

/**
 *
 */
export const WithTooltip: StoryObj<StoryProps> = {
  render: ControlledWithKnobs.render,
  name: 'With tooltip',
  args: {
    ...ControlledWithKnobs.args,
    tooltip: 'Tooltip Text',
  },
  parameters: {
    docs: {
      description: {
        story: 'Picklist control with tooltip',
      },
    },
  },
};

/**
 *
 */
export const WithDividers: StoryObj<StoryProps> = {
  name: 'With Dividers',
  render: ({
    picklistItem1_onClick,
    picklistItem2_onClick,
    picklistItem3_onClick,
    ...args
  }) => (
    <Picklist {...args}>
      <PicklistItem
        key='1'
        label='Picklist Item One'
        value='1'
        onClick={picklistItem1_onClick}
        divider='bottom'
      />
      <PicklistItem
        key='2'
        label='Picklist Item Two'
        value='2'
        onClick={picklistItem2_onClick}
      />
      <PicklistItem
        key='3'
        label='Picklist Item Three'
        value='3'
        onClick={picklistItem3_onClick}
        divider='top'
      />
    </Picklist>
  ),
  args: {
    label: 'Picklist Label',
    defaultOpened: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Picklist with dividers',
      },
    },
  },
};
