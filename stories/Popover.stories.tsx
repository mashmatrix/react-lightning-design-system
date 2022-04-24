import React from 'react';
import { select, boolean } from '@storybook/addon-knobs';
import { Button, Popover, PopoverPosition, PopoverTheme } from '../src/scripts';

const popoverText = `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
Commodi laudantium molestias reprehenderit nostrum quod natus saepe
ea corrupti odit minima?
`;

const paddingDecorator = (storyFn: Function) => (
  <div style={{ padding: '100px 350px' }}>
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

export const ControlledWithKnobs = () => {
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
};

ControlledWithKnobs.story = {
  name: 'Controlled with knobs',
  parameters: { info: 'Popover controlled with knobs' },
};

export const Default = () => (
  <Popover hidden={false} position='left'>
    <p>{popoverText}</p>
  </Popover>
);

Default.story = {
  parameters: { info: 'Default Popover' },
};

export const ThemeInfo = () => (
  <Popover hidden={false} theme='info' position='left'>
    <p>{popoverText}</p>
  </Popover>
);

ThemeInfo.story = {
  name: 'Theme - Info',
  parameters: { info: 'Popover with info theme' },
};

export const ThemeError = () => (
  <Popover hidden={false} theme='error' position='left'>
    <p>{popoverText}</p>
  </Popover>
);

ThemeError.story = {
  name: 'Theme - Error',
  parameters: { info: 'Popover with error theme' },
};

export const ThemeWarning = () => (
  <Popover hidden={false} theme='warning' position='left'>
    <p>{popoverText}</p>
  </Popover>
);

ThemeWarning.story = {
  name: 'Theme - Warning',
  parameters: { info: 'Popover with warning theme' },
};

export const ThemeSuccess = () => (
  <Popover hidden={false} theme='success' position='left'>
    <p>{popoverText}</p>
  </Popover>
);

ThemeSuccess.story = {
  name: 'Theme - Success',
  parameters: { info: 'Popover with success theme' },
};

export const PositionLeft = () => (
  <Popover hidden={false} position='left'>
    <p>{popoverText}</p>
  </Popover>
);

PositionLeft.story = {
  name: 'Position - Left',
  parameters: { info: 'Popover with nubbin in left position' },
};

export const PositionLeftTop = () => (
  <Popover hidden={false} position='left-top'>
    <p>{popoverText}</p>
  </Popover>
);

PositionLeftTop.story = {
  name: 'Position - Left (top)',
  parameters: { info: 'Popover with nubbin in left-top position' },
};

export const PositionLeftBottom = () => (
  <Popover hidden={false} position='left-bottom'>
    <p>{popoverText}</p>
  </Popover>
);

PositionLeftBottom.story = {
  name: 'Position - Left (bottom)',
  parameters: { info: 'Popover with nubbin in left-bottom position' },
};

export const PositionTop = () => (
  <Popover hidden={false} position='top'>
    <p>{popoverText}</p>
  </Popover>
);

PositionTop.story = {
  name: 'Position - Top',
  parameters: { info: 'Popover with nubbin in top position' },
};

export const PositionTopLeft = () => (
  <Popover hidden={false} position='top-left'>
    <p>{popoverText}</p>
  </Popover>
);

PositionTopLeft.story = {
  name: 'Position - Top (left)',
  parameters: { info: 'Popover with nubbin in top-left position' },
};

export const PositionTopRight = () => (
  <Popover hidden={false} position='top-right'>
    <p>{popoverText}</p>
  </Popover>
);

PositionTopRight.story = {
  name: 'Position - Top (right)',
  parameters: { info: 'Popover with nubbin in top-right position' },
};

export const PositionRight = () => (
  <Popover hidden={false} position='right'>
    <p>{popoverText}</p>
  </Popover>
);

PositionRight.story = {
  name: 'Position - Right',
  parameters: { info: 'Popover with nubbin in right position' },
};

export const PositionRightTop = () => (
  <Popover hidden={false} position='right-top'>
    <p>{popoverText}</p>
  </Popover>
);

PositionRightTop.story = {
  name: 'Position - Right (top)',
  parameters: { info: 'Popover with nubbin in right-top position' },
};

export const PositionRightBottom = () => (
  <Popover hidden={false} position='right-bottom'>
    <p>{popoverText}</p>
  </Popover>
);

PositionRightBottom.story = {
  name: 'Position - Right (bottom)',
  parameters: { info: 'Popover with nubbin in right-bottom position' },
};

export const PositionBottom = () => (
  <Popover hidden={false} position='bottom'>
    <p>{popoverText}</p>
  </Popover>
);

PositionBottom.story = {
  name: 'Position - Bottom',
  parameters: { info: 'Popover with nubbin in bottom position' },
};

export const PositionBottomLeft = () => (
  <Popover hidden={false} position='bottom-left'>
    <p>{popoverText}</p>
  </Popover>
);

PositionBottomLeft.story = {
  name: 'Position - Bottom (left)',
  parameters: { info: 'Popover with nubbin in bottom-left position' },
};

export const PositionBottomRight = () => (
  <Popover hidden={false} position='bottom-right'>
    <p>{popoverText}</p>
  </Popover>
);

PositionBottomRight.story = {
  name: 'Position - Bottom (right)',
  parameters: { info: 'Popover with nubbin in bottom-right position' },
};

export const Tooltip = () => (
  <Popover hidden={false} position='bottom-left' tooltip>
    <p>{popoverText}</p>
  </Popover>
);

Tooltip.story = {
  parameters: { info: 'Popover with tooltip styling' },
};
