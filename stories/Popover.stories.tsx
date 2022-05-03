import React from 'react';
import { Button, Popover } from '../src/scripts';
import {
  ComponentMeta,
  ComponentStoryObj,
  DecoratorFn,
} from '@storybook/react';

/**
 *
 */
const popoverText = `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
Commodi laudantium molestias reprehenderit nostrum quod natus saepe
ea corrupti odit minima?
`.trim();

const paddingDecorator: DecoratorFn = (story) => (
  <div
    style={{
      padding: '100px 350px',
    }}
  >
    <div className='slds-dropdown-trigger'>
      <Button type='icon' icon='question' />
      {story()}
    </div>
  </div>
);

/**
 *
 */
const meta: ComponentMeta<typeof Popover> = {
  title: 'Popover',
  component: Popover,
  decorators: [paddingDecorator],
};
export default meta;

/**
 *
 */
export const ControlledWithKnobs: ComponentStoryObj<typeof Popover> = {
  name: 'Controlled with knobs',
  args: {
    children: <p>{popoverText}</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover controlled with knobs',
      },
      inlineStories: false,
      iframeHeight: 300,
    },
  },
};

/**
 *
 */
export const Default: ComponentStoryObj<typeof Popover> = {
  args: {
    hidden: false,
    position: 'left',
    children: <p>{popoverText}</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default Popover',
      },
    },
  },
};

/**
 *
 */
export const ThemeInfo: ComponentStoryObj<typeof Popover> = {
  name: 'Theme - Info',
  args: {
    hidden: false,
    theme: 'info',
    position: 'left',
    children: <p>{popoverText}</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover with info theme',
      },
    },
  },
};

/**
 *
 */
export const ThemeError: ComponentStoryObj<typeof Popover> = {
  name: 'Theme - Error',
  args: {
    hidden: false,
    theme: 'error',
    position: 'left',
    children: <p>{popoverText}</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover with error theme',
      },
    },
  },
};

/**
 *
 */
export const ThemeWarning: ComponentStoryObj<typeof Popover> = {
  name: 'Theme - Warning',
  args: {
    hidden: false,
    theme: 'warning',
    position: 'left',
    children: <p>{popoverText}</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover with warning theme',
      },
    },
  },
};

/**
 *
 */
export const ThemeSuccess: ComponentStoryObj<typeof Popover> = {
  name: 'Theme - Success',
  args: {
    hidden: false,
    theme: 'success',
    position: 'left',
    children: <p>{popoverText}</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover with success theme',
      },
    },
  },
};

/**
 *
 */
export const PositionLeft: ComponentStoryObj<typeof Popover> = {
  name: 'Position - Left',
  args: {
    hidden: false,
    position: 'left',
    children: <p>{popoverText}</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover with nubbin in left position',
      },
    },
  },
};

/**
 *
 */
export const PositionLeftTop: ComponentStoryObj<typeof Popover> = {
  name: 'Position - Left (top)',
  args: {
    hidden: false,
    position: 'left-top',
    children: <p>{popoverText}</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover with nubbin in left-top position',
      },
    },
  },
};

/**
 *
 */
export const PositionLeftBottom: ComponentStoryObj<typeof Popover> = {
  name: 'Position - Left (bottom)',
  args: {
    hidden: false,
    position: 'left-bottom',
    children: <p>{popoverText}</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover with nubbin in left-bottom position',
      },
    },
  },
};

/**
 *
 */
export const PositionTop: ComponentStoryObj<typeof Popover> = {
  name: 'Position - Top',
  args: {
    hidden: false,
    position: 'top',
    children: <p>{popoverText}</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover with nubbin in top position',
      },
    },
  },
};

/**
 *
 */
export const PositionTopLeft: ComponentStoryObj<typeof Popover> = {
  name: 'Position - Top (left)',
  args: {
    hidden: false,
    position: 'top-left',
    children: <p>{popoverText}</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover with nubbin in top-left position',
      },
    },
  },
};

/**
 *
 */
export const PositionTopRight: ComponentStoryObj<typeof Popover> = {
  name: 'Position - Top (right)',
  args: {
    hidden: false,
    position: 'top-right',
    children: <p>{popoverText}</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover with nubbin in top-right position',
      },
    },
  },
};

/**
 *
 */
export const PositionRight: ComponentStoryObj<typeof Popover> = {
  name: 'Position - Right',
  args: {
    hidden: false,
    position: 'right',
    children: <p>{popoverText}</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover with nubbin in right position',
      },
    },
  },
};

/**
 *
 */
export const PositionRightTop: ComponentStoryObj<typeof Popover> = {
  name: 'Position - Right (top)',
  args: {
    hidden: false,
    position: 'right-top',
    children: <p>{popoverText}</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover with nubbin in right-top position',
      },
    },
  },
};

/**
 *
 */
export const PositionRightBottom: ComponentStoryObj<typeof Popover> = {
  name: 'Position - Right (bottom)',
  args: {
    hidden: false,
    position: 'right-bottom',
    children: <p>{popoverText}</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover with nubbin in right-bottom position',
      },
    },
  },
};

/**
 *
 */
export const PositionBottom: ComponentStoryObj<typeof Popover> = {
  name: 'Position - Bottom',
  args: {
    hidden: false,
    position: 'bottom',
    children: <p>{popoverText}</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover with nubbin in bottom position',
      },
    },
  },
};

/**
 *
 */
export const PositionBottomLeft: ComponentStoryObj<typeof Popover> = {
  name: 'Position - Bottom (left)',
  args: {
    hidden: false,
    position: 'bottom-left',
    children: <p>{popoverText}</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover with nubbin in bottom-left position',
      },
    },
  },
};

/**
 *
 */
export const PositionBottomRight: ComponentStoryObj<typeof Popover> = {
  name: 'Position - Bottom (right)',
  args: {
    hidden: false,
    position: 'bottom-right',
    children: <p>{popoverText}</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover with nubbin in bottom-right position',
      },
    },
  },
};

/**
 *
 */
export const Tooltip: ComponentStoryObj<typeof Popover> = {
  args: {
    hidden: false,
    position: 'bottom-left',
    tooltip: true,
    children: <p>{popoverText}</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover with tooltip styling',
      },
    },
  },
};
