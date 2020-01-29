import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { Textarea } from '../src/scripts';

storiesOf('Textarea', module)
  .add(
    'Controlled with knobs',
    () => (
      <Textarea
        label={text('label', 'Textarea Label')}
        error={text('error', '')}
        required={boolean('required', false)}
        value={text('value', '')}
        placeholder={text('placeholder', '')}
        disabled={boolean('disabled', false)}
        readOnly={boolean('readOnly', false)}
        onChange={action('change')}
        onBlur={action('blur')}
      />
    ),
    { info: 'Textarea controlled with knobs' }
  )
  .add(
    'Default',
    () => <Textarea label='Textarea Label' placeholder='Placeholder Text' />,
    { info: 'Default Textarea control' }
  )
  .add(
    'Required',
    () => (
      <Textarea
        label='Textarea Label'
        placeholder='Placeholder Text'
        required
      />
    ),
    { info: 'Textarea control with required attribute' }
  )
  .add(
    'Error',
    () => (
      <Textarea
        label='Textarea Label'
        placeholder='Placeholder Text'
        required
        error='This field is required'
      />
    ),
    { info: 'Textarea control with error message' }
  )
  .add(
    'Disabled',
    () => (
      <Textarea
        label='Textarea Label'
        placeholder='Placeholder Text'
        disabled
      />
    ),
    { info: 'Textarea control with disabled status' }
  )
  .add(
    'Read only',
    () => <Textarea label='Textarea Label' value='Read Only' readOnly />,
    { info: 'Textarea control with readOnly status' }
  );
