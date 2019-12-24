import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean, select } from '@storybook/addon-knobs';
import { Input } from '../src/scripts';

storiesOf('Input', module)
  .add('Controlled with knobs', () => {
    const iconOptions = {
      '': '(none)',
      search: 'search',
      clear: 'clear',
      warning: 'warning',
    };
    return (
      <Input
        label={ text('label', 'Input Label') }
        error={ text('error') }
        required={ boolean('required') }
        value={ text('value') }
        placeholder={ text('placeholder') }
        addonLeft={ text('addonLeft') }
        addonRight={ text('addonRight') }
        iconLeft={ select('iconLeft', iconOptions) }
        iconRight={ select('iconRight', iconOptions) }
        disabled={ boolean('disabled') }
        readOnly={ boolean('readOnly') }
        onChange={ action('change') }
        onBlur={ action('blur') }
      />
    );
  }, {
    info: 'Input controlled with knobs',
  })
  .add('Default', () => (
    <Input label='Input Label' placeholder='Placeholder Text' />
  ), {
    info: 'Default Input control',
  })
  .add('With icon to the left', () => (
    <Input label='Input Label' placeholder='Placeholder Text' iconLeft='search' />
  ), {
    info: 'Input control with icon to the left',
  })
  .add('With icon to the right', () => (
    <Input label='Input Label' placeholder='Placeholder Text' iconRight='search' />
  ), {
    info: 'Input control with icon to the right',
  })
  .add('With icon to the left & right', () => (
    <Input label='Input Label' placeholder='Placeholder Text' iconLeft='search' iconRight='clear' />
  ), {
    info: 'Input control with icon to the left and right',
  })
  .add('Required', () => (
    <Input label='Input Label' placeholder='Placeholder Text' required />
  ), {
    info: 'Input control with required attribute',
  })
  .add('Error', () => (
    <Input label='Input Label' placeholder='Placeholder Text' required error='This field is required' />
  ), {
    info: 'Input control with error message',
  })
  .add('Error with icon', () => (
    <Input
      label='Input Label'
      placeholder='Placeholder Text'
      required
      error='This field is required'
      iconLeft='warning'
    />
  ), {
    info: 'Input control with error message and icon',
  })
  .add('Disabled', () => (
    <Input label='Input Label' placeholder='Placeholder Text' disabled />
  ), {
    info: 'Input control with disabled status',
  })
  .add('Read only', () => (
    <Input label='Input Label' value='Read Only' readOnly />
  ), {
    info: 'Input control with readOnly status',
  })
  .add('Read only (HTML)', () => (
    <Input label='Input Label' value='Read Only' htmlReadOnly />
  ), {
    info: 'Input control with readOnly status (passsed to HTML <input> element)',
  })
  .add('With fixed text', () => (
    <Input label='Input Label' placeholder='Placeholder Text' addonLeft='$' addonRight='%' />
  ), {
    info: 'Input control with fixed text to the left and right',
  })
  .add('Read only with fixed text', () => (
    <Input label='Input Label' value='Read Only' addonLeft='$' addonRight='%' readOnly />
  ), {
    info: 'Input control with fixed text to the left and right and readOnly status',
  })
;
