import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import { Popover } from '../src/scripts';

const popoverText = `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
Commodi laudantium molestias reprehenderit nostrum quod natus saepe
ea corrupti odit minima?
`;

storiesOf('Popover', module)
  .add(
    'Controlled with knobs',
    () => {
      const positionOptions = {
        '': '(none)',
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
      const position = select('position', positionOptions);
      const themeOptions = {
        '': '(none)',
        info: 'info',
        success: 'success',
        warning: 'warning',
        error: 'error',
      };
      const theme = select('theme', themeOptions);
      const hidden = boolean('hidden', false);
      const tooltip = boolean('tooltip');
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
    { info: 'Popover controlled with knobs' }
  )
  .add(
    'Default',
    () => (
      <Popover hidden={false} position='left'>
        <p>{popoverText}</p>
      </Popover>
    ),
    { info: 'Default Popover' }
  )
  .add(
    'Theme - Info',
    () => (
      <Popover hidden={false} theme='info' position='left'>
        <p>{popoverText}</p>
      </Popover>
    ),
    { info: 'Popover with info theme' }
  )
  .add(
    'Theme - Error',
    () => (
      <Popover hidden={false} theme='error' position='left'>
        <p>{popoverText}</p>
      </Popover>
    ),
    { info: 'Popover with error theme' }
  )
  .add(
    'Theme - Warning',
    () => (
      <Popover hidden={false} theme='warning' position='left'>
        <p>{popoverText}</p>
      </Popover>
    ),
    { info: 'Popover with warning theme' }
  )
  .add(
    'Theme - Success',
    () => (
      <Popover hidden={false} theme='success' position='left'>
        <p>{popoverText}</p>
      </Popover>
    ),
    { info: 'Popover with success theme' }
  )
  .add(
    'Position - Left',
    () => (
      <Popover hidden={false} position='left'>
        <p>{popoverText}</p>
      </Popover>
    ),
    { info: 'Popover with nubbin in left position' }
  )
  .add(
    'Position - Left (top)',
    () => (
      <Popover hidden={false} position='left-top'>
        <p>{popoverText}</p>
      </Popover>
    ),
    { info: 'Popover with nubbin in left-top position' }
  )
  .add(
    'Position - Left (bottom)',
    () => (
      <Popover hidden={false} position='left-bottom'>
        <p>{popoverText}</p>
      </Popover>
    ),
    { info: 'Popover with nubbin in left-bottom position' }
  )
  .add(
    'Position - Top',
    () => (
      <Popover hidden={false} position='top'>
        <p>{popoverText}</p>
      </Popover>
    ),
    { info: 'Popover with nubbin in top position' }
  )
  .add(
    'Position - Top (left)',
    () => (
      <Popover hidden={false} position='top-left'>
        <p>{popoverText}</p>
      </Popover>
    ),
    { info: 'Popover with nubbin in top-left position' }
  )
  .add(
    'Position - Top (right)',
    () => (
      <Popover hidden={false} position='top-right'>
        <p>{popoverText}</p>
      </Popover>
    ),
    { info: 'Popover with nubbin in top-right position' }
  )
  .add(
    'Position - Right',
    () => (
      <Popover hidden={false} position='right'>
        <p>{popoverText}</p>
      </Popover>
    ),
    { info: 'Popover with nubbin in right position' }
  )
  .add(
    'Position - Right (top)',
    () => (
      <Popover hidden={false} position='right-top'>
        <p>{popoverText}</p>
      </Popover>
    ),
    { info: 'Popover with nubbin in right-top position' }
  )
  .add(
    'Position - Right (bottom)',
    () => (
      <Popover hidden={false} position='right-bottom'>
        <p>{popoverText}</p>
      </Popover>
    ),
    { info: 'Popover with nubbin in right-bottom position' }
  )
  .add(
    'Position - Bottom',
    () => (
      <Popover hidden={false} position='bottom'>
        <p>{popoverText}</p>
      </Popover>
    ),
    { info: 'Popover with nubbin in bottom position' }
  )
  .add(
    'Position - Bottom (left)',
    () => (
      <Popover hidden={false} position='bottom-left'>
        <p>{popoverText}</p>
      </Popover>
    ),
    { info: 'Popover with nubbin in bottom-left position' }
  )
  .add(
    'Position - Bottom (right)',
    () => (
      <Popover hidden={false} position='bottom-right'>
        <p>{popoverText}</p>
      </Popover>
    ),
    { info: 'Popover with nubbin in bottom-right position' }
  )
  .add(
    'Tooltip',
    () => (
      <Popover hidden={false} position='bottom-left' tooltip>
        <p>{popoverText}</p>
      </Popover>
    ),
    { info: 'Popover with tooltip styling' }
  );
