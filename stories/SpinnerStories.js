import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { select } from '@storybook/addon-knobs';
import { Spinner } from '../src/scripts';


const containerStyle = { position: 'relative', width: 100, height: 100, display: 'inline-block' };
const inverseContainerStyle = Object.assign({}, containerStyle, { background: '#16325C' });

storiesOf('Spinner', module)
  .add('Controlled with knobs', withInfo('Spinner with knobs')(() => {
    const sizeOptions = {
      '': '(none)',
      small: 'small',
      medium: 'medium',
      large: 'large',
    };
    const size = select('size', sizeOptions);
    const typeOptions = {
      '': '(none)',
      brand: 'brand',
      inverse: 'inverse',
    };
    const type = select('type', typeOptions);
    return (
      <div style={ type === 'inverse' ? inverseContainerStyle : containerStyle }>
        <Spinner size={ size } type={ type } />
      </div>
    );
  }))
  .add('Default', withInfo('Default spinner with different sizes (small, medium, large)')(() => (
    <div>
      <div style={ containerStyle }>
        <Spinner size='small' />
      </div>
      <div style={ containerStyle }>
        <Spinner size='medium' />
      </div>
      <div style={ containerStyle }>
        <Spinner size='large' />
      </div>
    </div>
  )))
  .add('Brand', withInfo('Brand spinner with different sizes (small, medium, large)')(() => (
    <div>
      <div style={ containerStyle }>
        <Spinner type='brand' size='small' />
      </div>
      <div style={ containerStyle }>
        <Spinner type='brand' size='medium' />
      </div>
      <div style={ containerStyle }>
        <Spinner type='brand' size='large' />
      </div>
    </div>
  )))
  .add('Inverse', withInfo('Inverse spinner with different sizes (small, medium, large)')(() => (
    <div>
      <div style={ inverseContainerStyle }>
        <Spinner type='inverse' size='small' />
      </div>
      <div style={ inverseContainerStyle }>
        <Spinner type='inverse' size='medium' />
      </div>
      <div style={ inverseContainerStyle }>
        <Spinner type='inverse' size='large' />
      </div>
    </div>
  )))
;
