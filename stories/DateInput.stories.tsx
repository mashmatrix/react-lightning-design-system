import { DateInput } from '../src/scripts';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

/**
 *
 */
const meta: ComponentMeta<typeof DateInput> = {
  title: 'DateInput',
  component: DateInput,
  argTypes: {
    onBlur: { action: 'blur' },
    onValueChange: { action: 'valueChange' },
    onComplete: { action: 'complete' },
  },
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 400,
    },
  },
};
export default meta;

/**
 *
 */
export const ControlledWithKnobs: ComponentStoryObj<typeof DateInput> = {
  name: 'Controlled with knobs',
  args: {
    label: 'Date Input Label',
  },
  parameters: {
    docs: {
      description: {
        story: 'DateInput controlled with knobs',
      },
    },
  },
};

/**
 *
 */
export const Default: ComponentStoryObj<typeof DateInput> = {
  args: {
    label: 'Date Input Label',
    value: '2016-04-13',
    defaultOpened: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default date input control',
      },
    },
  },
};

/**
 *
 */
export const Required: ComponentStoryObj<typeof DateInput> = {
  args: {
    label: 'Date Input Label',
    value: '2016-04-13',
    defaultOpened: true,
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Date input control with required attribute',
      },
    },
  },
};

/**
 *
 */
export const Error: ComponentStoryObj<typeof DateInput> = {
  args: {
    label: 'Date Input Label',
    value: '2016-04-13',
    defaultOpened: true,
    required: true,
    error: 'This field is required',
  },
  parameters: {
    docs: {
      description: {
        story: 'Date input control with error message',
      },
    },
  },
};

/**
 *
 */
export const Disabled: ComponentStoryObj<typeof DateInput> = {
  args: {
    label: 'Date Input Label',
    value: '2016-04-13',
    defaultOpened: true,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Date input control with disabled status',
      },
    },
  },
};

/**
 *
 */
export const WithDateFormat: ComponentStoryObj<typeof DateInput> = {
  name: 'With date format',
  args: {
    label: 'Date Input Label',
    value: '2016-04-13',
    defaultOpened: true,
    dateFormat: 'YYYY.MM.DD',
  },
  parameters: {
    docs: {
      description: {
        story: 'Date input control with date format specified (YYYY.MM.DD)',
      },
    },
  },
};

/**
 *
 */
export const WithMinMaxDate: ComponentStoryObj<typeof DateInput> = {
  name: 'With min/max date',
  args: {
    label: 'Date Input Label',
    value: '2016-04-13',
    defaultOpened: true,
    minDate: '2016-04-10',
    maxDate: '2016-04-19',
  },
  parameters: {
    docs: {
      description: {
        story: 'Date input control with minimum date boundary',
      },
    },
  },
};

/**
 *
 */
export const IncludeTimeData: ComponentStoryObj<typeof DateInput> = {
  name: 'Include time data',
  args: {
    label: 'Date Input Label',
    value: '2016-04-13',
    defaultOpened: true,
    dateFormat: 'YYYY/MM/DD HH:mm:ss',
    includeTime: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Date input control with time information',
      },
    },
  },
};

/**
 *
 */
export const WithTooltip: ComponentStoryObj<typeof DateInput> = {
  name: 'With tooltip',
  args: {
    label: 'Date Input Label',
    tooltip: 'Tooltip Text',
  },
  parameters: {
    docs: {
      description: {
        story: 'Date input control with tooltip',
      },
    },
  },
};
