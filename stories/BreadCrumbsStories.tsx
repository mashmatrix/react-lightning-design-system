import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BreadCrumbs, Crumb } from '../src/scripts';

storiesOf('BreadCrumbs', module).add(
  'Default',
  () => (
    <BreadCrumbs>
      <Crumb onClick={action('crumb1#click')}>Parent Entity</Crumb>
      <Crumb onClick={action('crumb2#click')}>Parent Record Name</Crumb>
    </BreadCrumbs>
  ),
  { info: 'Default BreadCrumbs' }
);
