import React from 'react';
import { action } from '@storybook/addon-actions';
import { BreadCrumbs, Crumb } from '../src/scripts';

export default {
  title: 'BreadCrumbs',
};

export const Default = () => (
  <BreadCrumbs>
    <Crumb onClick={action('crumb1#click')}>Parent Entity</Crumb>
    <Crumb onClick={action('crumb2#click')}>Parent Record Name</Crumb>
  </BreadCrumbs>
);

Default.story = {
  parameters: { info: 'Default BreadCrumbs' },
};
