import React from 'react';

import { Spinner } from 'react-lightning-design-system';

export default () => {
  const style = { position: 'relative', width: 100, height: 100, display: 'inline-block' };
  const inverseStyle = Object.assign({}, style, { background: '#16325C' });
  return (
    <div>
      <h2 className='slds-m-vertical--medium'>Spinners</h2>
      <div>
        <div style={style}><Spinner /></div>
        <div style={style}><Spinner size='medium' /></div>
        <div style={style}><Spinner size='large' /></div>

        <div style={style}><Spinner type='brand' /></div>
        <div style={style}><Spinner type='brand' size='medium' /></div>
        <div style={style}><Spinner type='brand' size='large' /></div>

        <div style={inverseStyle}><Spinner type='inverse' /></div>
        <div style={inverseStyle}><Spinner type='inverse' size='medium' /></div>
        <div style={inverseStyle}><Spinner type='inverse' size='large' /></div>
      </div>
    </div>
  );
};
