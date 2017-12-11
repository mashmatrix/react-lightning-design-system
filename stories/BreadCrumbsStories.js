import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { BreadCrumbs, Crumb } from '../src/scripts';

storiesOf('BreadCrumbs', module)
  .add('Default', withInfo('Default BreadCrumbs')(() => (
    <BreadCrumbs>
      <Crumb onClick={ action('crumb1#click') }>Parent Entity</Crumb>
      <Crumb onClick={ action('crumb2#click') }>Parent Record Name</Crumb>
    </BreadCrumbs>
  )))
;
