import React from 'react';
import { select, boolean } from '@storybook/addon-knobs';
import { Button, Popover, PopoverPosition, PopoverTheme } from '../src/scripts';
const popoverText = `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
Commodi laudantium molestias reprehenderit nostrum quod natus saepe
ea corrupti odit minima?
`;

const paddingDecorator = (storyFn: Function) => (
  <div
    style={{
      padding: '100px 350px',
    }}
  >
    <div className='slds-dropdown-trigger'>
      <Button type='icon' icon='question' />
      {storyFn()}
    </div>
  </div>
);

export default {
  title: 'Popover',
  decorators: [paddingDecorator],
};
export const ControlledWithKnobs = {
  render: () => {
    const positionOptions = {
      '(none)': '',
      left: 'left',
      right: 'right',
      top: 'top',
      bottom: 'bottom',
      'top-left': 'top-left',
      'top-right': 'top-right',
      'left-top': 'left-top',
      'left-bottom': 'left-bottom',
      'right-top': 'right-top',
      'right-bottom': 'right-bottom',
      'bottom-left': 'bottom-left',
      'bottom-right': 'bottom-right',
    };
    const position = select('position', positionOptions, '') as PopoverPosition;
    const themeOptions = {
      '(none)': '',
      info: 'info',
      success: 'success',
      warning: 'warning',
      error: 'error',
    };
    const theme = select('theme', themeOptions, '') as PopoverTheme;
    const hidden = boolean('hidden', false);
    const tooltip = boolean('tooltip', false);
    return (
      <Popover
        position={position}
        theme={theme}
        hidden={hidden}
        tooltip={tooltip}
      >
        <p>{popoverText}</p>
      </Popover>
    );
  },
  name: 'Controlled with knobs',
  parameters: {
    info: 'Popover controlled with knobs',
  },
};
export const Default = {
  render: () => (
    <Popover hidden={false} position='left'>
      <p>{popoverText}</p>
    </Popover>
  ),
  parameters: {
    info: 'Default Popover',
  },
};
export const ThemeInfo = {
  render: () => (
    <Popover hidden={false} theme='info' position='left'>
      <p>{popoverText}</p>
    </Popover>
  ),
  name: 'Theme - Info',
  parameters: {
    info: 'Popover with info theme',
  },
};
export const ThemeError = {
  render: () => (
    <Popover hidden={false} theme='error' position='left'>
      <p>{popoverText}</p>
    </Popover>
  ),
  name: 'Theme - Error',
  parameters: {
    info: 'Popover with error theme',
  },
};
export const ThemeWarning = {
  render: () => (
    <Popover hidden={false} theme='warning' position='left'>
      <p>{popoverText}</p>
    </Popover>
  ),
  name: 'Theme - Warning',
  parameters: {
    info: 'Popover with warning theme',
  },
};
export const ThemeSuccess = {
  render: () => (
    <Popover hidden={false} theme='success' position='left'>
      <p>{popoverText}</p>
    </Popover>
  ),
  name: 'Theme - Success',
  parameters: {
    info: 'Popover with success theme',
  },
};
export const PositionLeft = {
  render: () => (
    <Popover hidden={false} position='left'>
      <p>{popoverText}</p>
    </Popover>
  ),
  name: 'Position - Left',
  parameters: {
    info: 'Popover with nubbin in left position',
  },
};
export const PositionLeftTop = {
  render: () => (
    <Popover hidden={false} position='left-top'>
      <p>{popoverText}</p>
    </Popover>
  ),
  name: 'Position - Left (top)',
  parameters: {
    info: 'Popover with nubbin in left-top position',
  },
};
export const PositionLeftBottom = {
  render: () => (
    <Popover hidden={false} position='left-bottom'>
      <p>{popoverText}</p>
    </Popover>
  ),
  name: 'Position - Left (bottom)',
  parameters: {
    info: 'Popover with nubbin in left-bottom position',
  },
};
export const PositionTop = {
  render: () => (
    <Popover hidden={false} position='top'>
      <p>{popoverText}</p>
    </Popover>
  ),
  name: 'Position - Top',
  parameters: {
    info: 'Popover with nubbin in top position',
  },
};
export const PositionTopLeft = {
  render: () => (
    <Popover hidden={false} position='top-left'>
      <p>{popoverText}</p>
    </Popover>
  ),
  name: 'Position - Top (left)',
  parameters: {
    info: 'Popover with nubbin in top-left position',
  },
};
export const PositionTopRight = {
  render: () => (
    <Popover hidden={false} position='top-right'>
      <p>{popoverText}</p>
    </Popover>
  ),
  name: 'Position - Top (right)',
  parameters: {
    info: 'Popover with nubbin in top-right position',
  },
};
export const PositionRight = {
  render: () => (
    <Popover hidden={false} position='right'>
      <p>{popoverText}</p>
    </Popover>
  ),
  name: 'Position - Right',
  parameters: {
    info: 'Popover with nubbin in right position',
  },
};
export const PositionRightTop = {
  render: () => (
    <Popover hidden={false} position='right-top'>
      <p>{popoverText}</p>
    </Popover>
  ),
  name: 'Position - Right (top)',
  parameters: {
    info: 'Popover with nubbin in right-top position',
  },
};
export const PositionRightBottom = {
  render: () => (
    <Popover hidden={false} position='right-bottom'>
      <p>{popoverText}</p>
    </Popover>
  ),
  name: 'Position - Right (bottom)',
  parameters: {
    info: 'Popover with nubbin in right-bottom position',
  },
};
export const PositionBottom = {
  render: () => (
    <Popover hidden={false} position='bottom'>
      <p>{popoverText}</p>
    </Popover>
  ),
  name: 'Position - Bottom',
  parameters: {
    info: 'Popover with nubbin in bottom position',
  },
};
export const PositionBottomLeft = {
  render: () => (
    <Popover hidden={false} position='bottom-left'>
      <p>{popoverText}</p>
    </Popover>
  ),
  name: 'Position - Bottom (left)',
  parameters: {
    info: 'Popover with nubbin in bottom-left position',
  },
};
export const PositionBottomRight = {
  render: () => (
    <Popover hidden={false} position='bottom-right'>
      <p>{popoverText}</p>
    </Popover>
  ),
  name: 'Position - Bottom (right)',
  parameters: {
    info: 'Popover with nubbin in bottom-right position',
  },
};
export const Tooltip = {
  render: () => (
    <Popover hidden={false} position='bottom-left' tooltip>
      <p>{popoverText}</p>
    </Popover>
  ),
  parameters: {
    info: 'Popover with tooltip styling',
  },
};
