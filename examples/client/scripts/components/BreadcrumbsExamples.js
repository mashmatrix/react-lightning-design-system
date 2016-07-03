import React from 'react';

import { BreadCrumbs, Crumb } from 'react-lightning-design-system';

export default () => (
  <div>
    <h2 className='slds-m-vertical--medium'>Breadcrumbs</h2>
    <div>
      <BreadCrumbs>
        <Crumb href='#'>Parent Entity</Crumb>
        <Crumb href='#'>Parent Record Name</Crumb>
      </BreadCrumbs>
    </div>
  </div>
);
