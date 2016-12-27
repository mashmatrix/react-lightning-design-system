import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { withKnobs, text, boolean, select } from '@kadira/storybook-addon-knobs';
import Button from '../src/scripts/Button';

const inverseBgStyle = { backgroundColor: '#16325c', padding: 4 };

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .addWithInfo('Controlled with knobs', 'Button controlled with knobs', () => {
    const typeOptions = {
      '': '(none)',
      neutral: 'neutral', brand: 'brand', destructive: 'destructive',
      inverse: 'inverse',
    };
    const type = select('type', typeOptions);
    const label = text('label', 'Button');
    const iconOptions = { '': '(none)', download: 'download', down: 'down', task: 'task' };
    const icon = select('icon', iconOptions);
    const iconAlignOptions = { '': '(none)', left: 'left', right: 'right' };
    const iconAlign = select('iconAlign', iconAlignOptions, 'left');
    const disabled = boolean('disabled', false);
    const cntStyles = type === 'inverse' ? inverseBgStyle : {};
    return (
      <div style={ cntStyles }>
        <Button
          type={ type } icon={ icon } iconAlign={ iconAlign }
          disabled={ disabled } label={ label }
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
    <div style={ inverseBgStyle }>
      <Button type='inverse'>Inverse</Button>
    </div>
  ))
  .addWithInfo('Inverse Disabled', 'Inverse type button in dark background but disabled', () => (
    <div style={ inverseBgStyle }>
      <Button type='inverse' disabled onClick={ action('should not be clicked') }>Disabled Inverse</Button>
    </div>
  ))
;
