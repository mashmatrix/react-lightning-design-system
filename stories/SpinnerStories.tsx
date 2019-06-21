import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import { Spinner, SpinnerType, SpinnerSize } from '../src/scripts/Spinner';

const containerStyle = {
  position: 'relative' as const,
  width: 100,
  height: 100,
  display: 'inline-block',
};
const inverseContainerStyle = Object.assign({}, containerStyle, {
  background: '#16325C',
});

storiesOf('Spinner', module)
  .add(
    'Controlled with knobs',
    () => {
      const sizeOptions = {
        '(none)': '',
        small: 'small',
        medium: 'medium',
        large: 'large',
      };
      const size = select('size', sizeOptions, '') as SpinnerSize;
      const typeOptions = {
        '(none)': '',
        brand: 'brand',
        inverse: 'inverse',
      };
      const type = select('type', typeOptions, '') as SpinnerType;
      return (
        <div
          style={type === 'inverse' ? inverseContainerStyle : containerStyle}
        >
          <Spinner size={size} type={type} />
        </div>
      );
    },
    { info: 'Spinner with knobs' }
  )
  .add(
    'Default',
    () => (
      <div>
        <div style={containerStyle}>
          <Spinner size='small' />
        </div>
        <div style={containerStyle}>
          <Spinner size='medium' />
        </div>
        <div style={containerStyle}>
          <Spinner size='large' />
        </div>
      </div>
    ),
    { info: 'Default spinner with different sizes (small, medium, large)' }
  )
  .add(
    'Brand',
    () => (
      <div>
        <div style={containerStyle}>
          <Spinner type='brand' size='small' />
        </div>
        <div style={containerStyle}>
          <Spinner type='brand' size='medium' />
        </div>
        <div style={containerStyle}>
          <Spinner type='brand' size='large' />
        </div>
      </div>
    ),
    { info: 'Brand spinner with different sizes (small, medium, large)' }
  )
  .add(
    'Inverse',
    () => (
      <div>
        <div style={inverseContainerStyle}>
          <Spinner type='inverse' size='small' />
        </div>
        <div style={inverseContainerStyle}>
          <Spinner type='inverse' size='medium' />
        </div>
        <div style={inverseContainerStyle}>
          <Spinner type='inverse' size='large' />
        </div>
      </div>
    ),
    { info: 'Inverse spinner with different sizes (small, medium, large)' }
  );
