import React from 'react';

import { Breadcrumbs } from 'react-lightning-design-system';

export default () => (
  <div>
    <h2 className='slds-m-vertical--medium'>Breadcrumbs</h2>
    <div>
      <Breadcrumbs
        items={[{
          label: 'Parent Entity',
          href: '#',
        }, {
          label: 'Parent Record Name',
          href: '#',
        }]}
      />
    </div>
  </div>
);
