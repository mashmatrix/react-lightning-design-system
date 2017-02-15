import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { withKnobs } from '@kadira/storybook-addon-knobs';
import { FileSelector } from '../src/scripts';


storiesOf('FileSelector', module)
  .addDecorator(withKnobs)
  .addWithInfo('Default', 'Default File Selector', () => (
    <FileSelector
      label='Attachment'
      multiple={ false }
      accept='image/png'
      buttonText='Upload Files'
      errorMessage='File type not supported'
    />
  ))
;
