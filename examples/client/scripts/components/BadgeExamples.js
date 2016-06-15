import React from 'react';

import { Badge } from 'react-lightning-design-system';

export default () => (
  <div>
    <h2 className='slds-m-vertical--medium'>Badges</h2>
    <div style={{ padding: '12px' }}>
      <Badge>Label</Badge>
      <Badge type='default'>Label</Badge>
      <Badge type='shade'>Label</Badge>
      <Badge type='inverse'>Label</Badge>
    </div>
  </div>
);
