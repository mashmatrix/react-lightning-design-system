import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { BreadCrumbs, Crumb } from '../src/scripts';

storiesOf('BreadCrumbs', module)
  .addWithInfo('Default', 'Default BreadCrumbs', () => (
    <BreadCrumbs>
      <Crumb onClick={ action('crumb1#click') }>Parent Entity</Crumb>
      <Crumb onClick={ action('crumb2#click') }>Parent Record Name</Crumb>
    </BreadCrumbs>
  ))
;
