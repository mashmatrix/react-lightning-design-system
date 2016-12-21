import React from 'react';

import { FileSelector } from 'react-lightning-design-system';

export default () => (
  <FileSelector
    label='Attachment'
    multiple={ false }
    accept='image/png'
    buttonText='Upload Files'
    errorMessage='File type not supported'
  />
);
