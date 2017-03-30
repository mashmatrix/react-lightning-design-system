import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { text, boolean, select } from '@kadira/storybook-addon-knobs';
import { Button } from '../src/scripts';

const darkBgStyle = { backgroundColor: '#16325c', padding: 4 };
const lightBgStyle = { backgroundColor: '#cccccc', padding: 4 };

const stories = storiesOf('Button', module)
  .addWithInfo('Controlled with knobs', 'Button controlled with knobs', () => {
    const typeOptions = {
      '': '(none)',
      neutral: 'neutral',
      brand: 'brand',
      destructive: 'destructive',
      'icon-bare': 'icon-bare',
      'icon-container': 'icon-container',
      'icon-border': 'icon-border',
      'icon-border-filled': 'icon-border-filled',
      inverse: 'inverse',
      'icon-inverse': 'icon-inverse',
    };
    const type = select('type', typeOptions);
    const sizeOptions = {
      '': '(none)',
      'x-small': 'x-small',
      small: 'small',
      medium: 'medium',
    };
    const size = select('size', sizeOptions);
    const label = text('label', 'Button');
    const iconOptions = {
      '': '(none)',
      download: 'download',
      down: 'down',
      task: 'task',
      settings: 'settings',
      close: 'close',
    };
    const icon = select('icon', iconOptions);
    const iconAlignOptions = { '': '(none)', left: 'left', right: 'right' };
    const iconAlign = select('iconAlign', iconAlignOptions, 'left');
    const iconSizeOptions = {
      '': '(none)',
      'x-small': 'x-small',
      small: 'small',
      medium: 'medium',
      large: 'large',
    };
    const iconSize = select('iconSize', iconSizeOptions);
    const disabled = boolean('disabled', false);
    const cntStyles =
      type === 'inverse' || type === 'icon-inverse' ? darkBgStyle :
      type === 'icon-border-filled' ? lightBgStyle :
      {};
    return (
      <div style={ cntStyles }>
        <Button
          type={ type }
          size={ size }
          label={ label }
          icon={ icon }
          iconAlign={ iconAlign }
          iconSize={ iconSize }
          disabled={ disabled }
          onClick={ action('clicked') }
        />
      </div>
    );
  })
  .addWithInfo('Reset', 'Button with no type property assigned', () => (
    <Button onClick={ action('clicked') }>Reset</Button>
  ))
  .addWithInfo('Neutral', 'Neutral type button', () => (
    <Button type='neutral' onClick={ action('neutral clicked') }>Neutral</Button>
  ))
  .addWithInfo('Neutral disabled', 'Neutral type button but disabled', () => (
    <Button type='neutral' disabled onClick={ action('should not be clicked') }>Disabled Neutral</Button>
  ))
  .addWithInfo('Brand', 'Brand type button', () => (
    <Button type='brand' onClick={ action('brand clicked') }>Brand</Button>
  ))
  .addWithInfo('Brand disabled', 'Brand type button but disabled', () => (
    <Button type='brand' disabled onClick={ action('should not be clicked') }>Disabled Brand</Button>
  ))
  .addWithInfo('Destructive', 'Destructive type button', () => (
    <Button type='destructive' onClick={ action('destructive clicked') }>Destructive</Button>
  ))
  .addWithInfo('Destructive disabled', 'Destructive type button but disabled', () => (
    <Button type='destructive' disabled onClick={ action('should not be clicked') }>Disabled Destructive</Button>
  ))
  .addWithInfo('Neutral with left icon', 'Neutral type button with download icon in left side', () => (
    <Button type='neutral' icon='download' iconAlign='left' onClick={ action('neutral button icon left clicked') }>
      Button Neutral
    </Button>
  ))
  .addWithInfo('Neutral with right icon', 'Neutral type button with down icon in right side', () => (
    <Button type='neutral' icon='down' iconAlign='right' onClick={ action('neutral button icon right clicked') }>
      Button Neutral
    </Button>
  ))
  .addWithInfo('Inverse', 'Inverse type button in dark background', () => (
    <div style={ darkBgStyle }>
      <Button type='inverse' onClick={ action('inverse button clicked') }>Inverse</Button>
    </div>
  ))
  .addWithInfo('Inverse Disabled', 'Inverse type button in dark background but disabled', () => (
    <div style={ darkBgStyle }>
      <Button type='inverse' disabled onClick={ action('should not be clicked') }>Disabled Inverse</Button>
    </div>
  ))
  .addWithInfo('Button Icon', 'Default button with icon', () => (
    <Button type='icon' icon='settings' onClick={ action('button icon clicked') } />
  ))
  .addWithInfo('Button Icon Container', 'Button with icon in container', () => (
    <Button type='icon-container' icon='settings' onClick={ action('button icon container button clicked') } />
  ))
  .addWithInfo('Button Icon Border', 'Button with icon of bordered', () => (
    <Button type='icon-border' icon='settings' onClick={ action('button icon border clicked') } />
  ))
  .addWithInfo('Button Icon Border and Filled', 'Button with icon of bordered and filled with white', () => (
    <div style={ lightBgStyle }>
      <Button type='icon-border-filled' icon='settings' onClick={ action('button icon border and filled button clicked') } />
    </div>
  ))
  .addWithInfo('Button Icon Inverse', 'Button with icon in dark background', () => (
    <div style={ darkBgStyle }>
      <Button type='icon-inverse' icon='close' onClick={ action('button icon inverse button clicked') } />
    </div>
  ))
  .addWithInfo('Button Icon Inverse in dark background', 'Button with icon in dark background', () => (
    <div style={ darkBgStyle }>
      <Button type='icon-inverse' icon='close' disabled onClick={ action('should not be clicked') } />
    </div>
  ))
;

export default stories;
