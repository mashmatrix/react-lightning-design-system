import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { withKnobs, text, boolean, select } from '@kadira/storybook-addon-knobs';
import Button from '../src/scripts/Button';

const inverseBgStyle = { backgroundColor: '#16325c', padding: 4 };

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('Full Control', () => {
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
  .add('Reset', () => (
    <Button onClick={ action('clicked') }>Reset</Button>
  ))
  .add('Neutral', () => (
    <Button type='neutral' onClick={ action('neutral clicked') }>Neutral</Button>
  ))
  .add('Neutral disabled', () => (
    <Button type='neutral' disabled onClick={ action('should not be clicked') }>Disabled Neutral</Button>
  ))
  .add('Brand', () => (
    <Button type='brand' onClick={ action('brand clicked') }>Brand</Button>
  ))
  .add('Brand disabled', () => (
    <Button type='brand' disabled onClick={ action('should not be clicked') }>Disabled Brand</Button>
  ))
  .add('Destructive', () => (
    <Button type='destructive' onClick={ action('destructive clicked') }>Destructive</Button>
  ))
  .add('Destructive disabled', () => (
    <Button type='destructive' disabled onClick={ action('should not be clicked') }>Disabled Destructive</Button>
  ))
  .add('Neutral with left icon', () => (
    <Button type='neutral' icon='download' iconAlign='left' onClick={ action('neutral button icon left clicked') }>
      Button Neutral
    </Button>
  ))
  .add('Neutral with right icon', () => (
    <Button type='neutral' icon='down' iconAlign='right' onClick={ action('neutral button icon right clicked') }>
      Button Neutral
    </Button>
  ))
  .add('Inverse', () => (
    <div style={ inverseBgStyle }>
      <Button type='inverse'>Inverse</Button>
    </div>
  ))
  .add('Inverse Disabled', () => (
    <div style={ inverseBgStyle }>
      <Button type='inverse' disabled onClick={ action('should not be clicked') }>Disabled Inverse</Button>
    </div>
  ))
;
