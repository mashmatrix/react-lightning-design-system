import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { withKnobs } from '@kadira/storybook-addon-knobs';
import BreadCrumbs, { Crumb } from '../src/scripts/BreadCrumbs';

storiesOf('BreadCrumbs', module)
  .addDecorator(withKnobs)
  .addWithInfo('Default', 'Default BreadCrumbs', () => (
    <BreadCrumbs>
      <Crumb onClick={ action('crumb1#click') }>Parent Entity</Crumb>
      <Crumb onClick={ action('crumb2#click') }>Parent Record Name</Crumb>
    </BreadCrumbs>
  ))
;
