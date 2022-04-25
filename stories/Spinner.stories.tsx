import React from 'react';
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
export default {
  title: 'Spinner',
};
export const ControlledWithKnobs = {
  render: () => {
    // NOTE: Converting empty string to undefined
    // because we can't assign undefined to options directly
    // ref. https://github.com/storybookjs/storybook/issues/4487
    const sizeOptions = {
      '(none)': '',
      small: 'small',
      medium: 'medium',
      large: 'large',
    };
    const size = (select('size', sizeOptions, '') || undefined) as unknown as SpinnerSize;
    const typeOptions = {
      '(none)': '',
      brand: 'brand',
      inverse: 'inverse',
    };
    const type = (select('type', typeOptions, '') || undefined) as unknown as SpinnerType;
    return (
      <div style={type === 'inverse' ? inverseContainerStyle : containerStyle}>
        <Spinner size={size} type={type} />
      </div>
    );
  },
  name: 'Controlled with knobs',
  parameters: {
    info: 'Spinner with knobs',
  },
};
export const Default = {
  render: () => (
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
  parameters: {
    info: 'Default spinner with different sizes (small, medium, large)',
  },
};
export const Brand = {
  render: () => (
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
  parameters: {
    info: 'Brand spinner with different sizes (small, medium, large)',
  },
};
export const Inverse = {
  render: () => (
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
  parameters: {
    info: 'Inverse spinner with different sizes (small, medium, large)',
  },
};
