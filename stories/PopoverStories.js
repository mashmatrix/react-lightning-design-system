import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { withKnobs, text, select, boolean } from '@kadira/storybook-addon-knobs';
import Popover from '../src/scripts/Popover';

const popoverText = `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
Commodi laudantium molestias reprehenderit nostrum quod natus saepe
ea corrupti odit minima?
`;

storiesOf('Popover', module)
  .addDecorator(withKnobs)
  .addWithInfo('Controlled with knobs', 'Popover controlled with knobs', () => {
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
      <Popover position={ position } theme={ theme } hidden={ hidden } tooltip={ tooltip }>
        <p>{ popoverText }</p>
      </Popover>
    );
  })
  .addWithInfo('Default', 'Default Popover', () => (
    <Popover hidden={ false } position='left'>
      <p>{ popoverText }</p>
    </Popover>
  ))
  .addWithInfo('Theme - Info', 'Popover with info theme', () => (
    <Popover hidden={ false } theme='info' position='left'>
      <p>{ popoverText }</p>
    </Popover>
  ))
  .addWithInfo('Theme - Error', 'Popover with error theme', () => (
    <Popover hidden={ false } theme='error' position='left'>
      <p>{ popoverText }</p>
    </Popover>
  ))
  .addWithInfo('Theme - Warning', 'Popover with warning theme', () => (
    <Popover hidden={ false } theme='warning' position='left'>
      <p>{ popoverText }</p>
    </Popover>
  ))
  .addWithInfo('Theme - Success', 'Popover with success theme', () => (
    <Popover hidden={ false } theme='success' position='left'>
      <p>{ popoverText }</p>
    </Popover>
  ))
  .addWithInfo('Position - Left', 'Popover with nubbin in left position', () => (
    <Popover hidden={ false } position='left'>
      <p>{ popoverText }</p>
    </Popover>
  ))
  .addWithInfo('Position - Left (top)', 'Popover with nubbin in left-top position', () => (
    <Popover hidden={ false } position='left-top'>
      <p>{ popoverText }</p>
    </Popover>
  ))
  .addWithInfo('Position - Left (bottom)', 'Popover with nubbin in left-bottom position', () => (
    <Popover hidden={ false } position='left-bottom'>
      <p>{ popoverText }</p>
    </Popover>
  ))
  .addWithInfo('Position - Top', 'Popover with nubbin in top position', () => (
    <Popover hidden={ false } position='top'>
      <p>{ popoverText }</p>
    </Popover>
  ))
  .addWithInfo('Position - Top (left)', 'Popover with nubbin in top-left position', () => (
    <Popover hidden={ false } position='top-left'>
      <p>{ popoverText }</p>
    </Popover>
  ))
  .addWithInfo('Position - Top (right)', 'Popover with nubbin in top-right position', () => (
    <Popover hidden={ false } position='top-right'>
      <p>{ popoverText }</p>
    </Popover>
  ))
  .addWithInfo('Position - Right', 'Popover with nubbin in right position', () => (
    <Popover hidden={ false } position='right'>
      <p>{ popoverText }</p>
    </Popover>
  ))
  .addWithInfo('Position - Right (top)', 'Popover with nubbin in right-top position', () => (
    <Popover hidden={ false } position='right-top'>
      <p>{ popoverText }</p>
    </Popover>
  ))
  .addWithInfo('Position - Right (bottom)', 'Popover with nubbin in right-bottom position', () => (
    <Popover hidden={ false } position='right-bottom'>
      <p>{ popoverText }</p>
    </Popover>
  ))
  .addWithInfo('Position - Bottom', 'Popover with nubbin in bottom position', () => (
    <Popover hidden={ false } position='bottom'>
      <p>{ popoverText }</p>
    </Popover>
  ))
  .addWithInfo('Position - Bottom (left)', 'Popover with nubbin in bottom-left position', () => (
    <Popover hidden={ false } position='bottom-left'>
      <p>{ popoverText }</p>
    </Popover>
  ))
  .addWithInfo('Position - Bottom (right)', 'Popover with nubbin in bottom-right position', () => (
    <Popover hidden={ false } position='bottom-right'>
      <p>{ popoverText }</p>
    </Popover>
  ))
  .addWithInfo('Tooltip', 'Popover with tooltip styling', () => (
    <Popover hidden={ false } position='bottom-left' tooltip>
      <p>{ popoverText }</p>
    </Popover>
  ))
;
