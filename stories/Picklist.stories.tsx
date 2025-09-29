import React from 'react';
import { Picklist, PicklistItem } from '../src/scripts';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

/**
 *
 */
const meta: ComponentMeta<typeof Picklist> = {
  title: 'Picklist',
  component: Picklist,
  subcomponents: { PicklistItem },
  argTypes: {
    onSelect: { action: 'select' },
    onValueChange: { action: 'valueChange' },
    onBlur: { action: 'blur' },
    onComplete: { action: 'complete' },
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
export const ControlledWithKnobs: ComponentStoryObj<typeof Picklist> = {
  name: 'Controlled with knobs',
  args: {
    label: 'Picklist Label',
    children: [
      <PicklistItem key='1' label='Picklist Item One' value='1' />,
      <PicklistItem key='2' label='Picklist Item Two' value='2' />,
      <PicklistItem key='3' label='Picklist Item Three' value='3' />,
    ],
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
export const Default: ComponentStoryObj<typeof Picklist> = {
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
export const Required: ComponentStoryObj<typeof Picklist> = {
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
export const Error: ComponentStoryObj<typeof Picklist> = {
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
export const DisabledItems: ComponentStoryObj<typeof Picklist> = {
  args: {
    label: 'Picklist Label',
    defaultOpened: true,
    children: [
      <PicklistItem label='Picklist Item One' value='1' key='1' disabled />,
      <PicklistItem label='Picklist Item Two' value='2' key='2' disabled />,
      <PicklistItem label='Picklist Item Three' value='3' key='3' disabled />,
    ],
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
export const Disabled: ComponentStoryObj<typeof Picklist> = {
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
export const MenuSizeMedium: ComponentStoryObj<typeof Picklist> = {
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
export const MenuSizeLarge: ComponentStoryObj<typeof Picklist> = {
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
export const SingleItemSelected: ComponentStoryObj<typeof Picklist> = {
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
export const MultipleItemsSelected: ComponentStoryObj<typeof Picklist> = {
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
export const DropdownScroll: ComponentStoryObj<typeof Picklist> = {
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
export const WithTooltip: ComponentStoryObj<typeof Picklist> = {
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
export const WithDividers: ComponentStoryObj<typeof Picklist> = {
  name: 'With Dividers',
  args: {
    label: 'Picklist Label',
    defaultOpened: true,
    children: [
      <PicklistItem
        key='1'
        label='Picklist Item One'
        value='1'
        divider='bottom'
      />,
      <PicklistItem key='2' label='Picklist Item Two' value='2' />,
      <PicklistItem
        key='3'
        label='Picklist Item Three'
        value='3'
        divider='top'
      />,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Picklist with dividers',
      },
    },
  },
};
