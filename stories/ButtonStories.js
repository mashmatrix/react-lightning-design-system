import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean, select } from '@storybook/addon-knobs';
import { Button } from '../src/scripts';

const darkBgStyle = { backgroundColor: '#16325c', padding: 4 };
const lightBgStyle = { backgroundColor: '#cccccc', padding: 4 };

const stories = storiesOf('Button', module)
  .add('Controlled with knobs', () => {
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
  }, {
    info: 'Button controlled with knobs',
  })
  .add('Reset', () => (
    <Button onClick={ action('clicked') }>Reset</Button>
  ), {
    info: 'Button with no type property assigned',
  })
  .add('Neutral', () => (
    <Button type='neutral' onClick={ action('neutral clicked') }>Neutral</Button>
  ), {
    info: 'Neutral type button',
  })
  .add('Neutral disabled', () => (
    <Button type='neutral' disabled onClick={ action('should not be clicked') }>Disabled Neutral</Button>
  ), {
    info: 'Neutral type button but disabled',
  })
  .add('Brand', () => (
    <Button type='brand' onClick={ action('brand clicked') }>Brand</Button>
  ), {
    info: 'Brand type button',
  })
  .add('Brand disabled', () => (
    <Button type='brand' disabled onClick={ action('should not be clicked') }>Disabled Brand</Button>
  ), {
    info: 'Brand type button but disabled',
  })
  .add('Destructive', () => (
    <Button type='destructive' onClick={ action('destructive clicked') }>Destructive</Button>
  ), {
    info: 'Destructive type button',
  })
  .add('Destructive disabled', () => (
    <Button type='destructive' disabled onClick={ action('should not be clicked') }>Disabled Destructive</Button>
  ), {
    info: 'Destructive type button but disabled',
  })
  .add('Neutral with left icon', () => (
    <Button type='neutral' icon='download' iconAlign='left' onClick={ action('neutral button icon left clicked') }>
      Button Neutral
    </Button>
  ), {
    info: 'Neutral type button with download icon in left side',
  })
  .add('Neutral with right icon', () => (
    <Button type='neutral' icon='down' iconAlign='right' onClick={ action('neutral button icon right clicked') }>
      Button Neutral
    </Button>
  ), {
    info: 'Neutral type button with down icon in right side',
  })
  .add('Inverse', () => (
    <div style={ darkBgStyle }>
      <Button type='inverse' onClick={ action('inverse button clicked') }>Inverse</Button>
    </div>
  ), {
    info: 'Inverse type button in dark background',
  })
  .add('Inverse Disabled', () => (
    <div style={ darkBgStyle }>
      <Button type='inverse' disabled onClick={ action('should not be clicked') }>Disabled Inverse</Button>
    </div>
  ), {
    info: 'Inverse type button in dark background but disabled',
  })
  .add('Button Icon', () => (
    <Button type='icon' icon='settings' onClick={ action('button icon clicked') } />
  ), {
    info: 'Default button with icon',
  })
  .add('Button Icon Container', () => (
    <Button type='icon-container' icon='settings' onClick={ action('button icon container button clicked') } />
  ), {
    info: 'Button with icon in container',
  })
  .add('Button Icon Border', () => (
    <Button type='icon-border' icon='settings' onClick={ action('button icon border clicked') } />
  ), {
    info: 'Button with icon of bordered',
  })
  .add('Button Icon Border and Filled', () => (
    <div style={ lightBgStyle }>
      <Button type='icon-border-filled' icon='settings' onClick={ action('button icon border and filled button clicked') } />
    </div>
  ), {
    info: 'Button with icon of bordered and filled with white',
  })
  .add('Button Icon Inverse', () => (
    <div style={ darkBgStyle }>
      <Button type='icon-inverse' icon='close' onClick={ action('button icon inverse button clicked') } />
    </div>
  ), {
    info: 'Button with icon in dark background',
  })
  .add('Button Icon Inverse in dark background', () => (
    <div style={ darkBgStyle }>
      <Button type='icon-inverse' icon='close' disabled onClick={ action('should not be clicked') } />
    </div>
  ), {
    info: 'Button with icon in dark background',
  })
;

export default stories;
