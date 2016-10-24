import React from 'react';

import { Toggle } from 'react-lightning-design-system';

export default () => (
  <div>
    <h2 className='slds-m-vertical--medium'>Toggle</h2>
    <Toggle />

    <h2 className='slds-m-vertical--medium'>Toggle checked</h2>
    <Toggle defaultChecked />

    <h2 className='slds-m-vertical--medium'>Toggle disabled</h2>
    <Toggle disabled />
  </div>
);
