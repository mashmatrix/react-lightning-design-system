import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { withKnobs, select } from '@kadira/storybook-addon-knobs';
import Spinner from '../src/scripts/Spinner';


const containerStyle = { position: 'relative', width: 100, height: 100, display: 'inline-block' };
const inverseContainerStyle = Object.assign({}, containerStyle, { background: '#16325C' });

storiesOf('Spinner', module)
  .addDecorator(withKnobs)
  .addWithInfo('Controlled with knobs', 'Spinner with knobs', () => {
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
  })
  .addWithInfo('Default', 'Default spinner with different sizes (small, medium, large)', () => (
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
  ))
  .addWithInfo('Brand', 'Brand spinner with different sizes (small, medium, large)', () => (
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
  ))
  .addWithInfo('Inverse', 'Inverse spinner with different sizes (small, medium, large)', () => (
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
  ))
;
