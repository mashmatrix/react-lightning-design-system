import React, { ComponentProps, useCallback } from 'react';
import dayjs from 'dayjs';
import { Datepicker, Button } from '../src/scripts';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { containerDecorator } from './util';

/**
 *
 */
const TodayButtonExtensionRenderer = (props: {
  onSelect?: (date: string) => void;
}) => {
  const { onSelect } = props;
  const today = dayjs().format('YYYY-MM-DD');
  const onSelectToday = useCallback(() => {
    onSelect?.(today);
  }, [onSelect, today]);
  return (
    <div
      style={{
        padding: '4px',
        textAlign: 'center',
      }}
    >
      <Button className='slds-size_1-of-2' onClick={onSelectToday}>
        Today
      </Button>
    </div>
  );
};

const datepickerDecorator = containerDecorator({
  padding: 8,
  width: 350,
  borderRadius: 4,
  boxShadow: '0 0 4px gray',
});

/**
 *
 */
const meta: ComponentMeta<typeof Datepicker> = {
  title: 'Datepicker',
  component: Datepicker,
  argTypes: {
    onSelect: { action: 'select' },
    onClose: { action: 'close' },
    onBlur: { action: 'blur' },
  },
};
export default meta;

/**
 *
 */
export const ControlledWithKnobs: ComponentStoryObj<typeof Datepicker> = {
  name: 'Controlled with knobs',
  args: {},
  decorators: [datepickerDecorator],
  parameters: {
    docs: {
      storyDescription: 'DateInput controlled with knobs',
    },
  },
};

/**
 *
 */
export const Default: ComponentStoryObj<typeof Datepicker> = {
  args: {
    selectedDate: '2016-04-13',
  },
  decorators: [datepickerDecorator],
  parameters: {
    docs: {
      storyDescription: 'Default date input control',
    },
  },
};

/**
 *
 */
export const WithMinDate: ComponentStoryObj<typeof Datepicker> = {
  name: 'With min date',
  args: {
    selectedDate: '2016-04-13',
    minDate: '2016-04-05',
  },
  decorators: [datepickerDecorator],
  parameters: {
    docs: {
      storyDescription: 'Date input with min date',
    },
  },
};

/**
 *
 */
export const WithMaxDate: ComponentStoryObj<typeof Datepicker> = {
  name: 'With max date',
  args: {
    selectedDate: '2016-04-13',
    maxDate: '2016-04-20',
  },
  decorators: [datepickerDecorator],
  parameters: {
    docs: {
      storyDescription: 'Date input with max date',
    },
  },
};

/**
 *
 */
export const ExtensionRendering: ComponentStoryObj<typeof Datepicker> = {
  args: {
    selectedDate: '2016-04-13',
    extensionRenderer: TodayButtonExtensionRenderer,
  },
  decorators: [datepickerDecorator],
  parameters: {
    docs: {
      storyDescription: 'Specify extension component in datepicker content',
    },
  },
};
