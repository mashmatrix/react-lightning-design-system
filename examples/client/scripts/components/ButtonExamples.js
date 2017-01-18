import React from 'react';

import { Button, SearchButtonField } from 'react-lightning-design-system';

export default () => {
  const styles = { padding: '12px' };
  const click = () => alert('Clicked');
  const handleOnChange = (ev) => console.log('changed', ev, ev.target.value);

  return (
    <div>
      <h2 className='slds-m-vertical--medium'>Buttons</h2>
      <div style={ styles }>
        <Button onClick={ click }>Simple</Button>
        <Button type='neutral' onClick={ click }>Neutral</Button>
        <Button type='brand' onClick={ click }>Brand</Button>
        <Button type='destructive' onClick={ click }>Brand</Button>
      </div>
      <div style={ styles }>
        <Button type='neutral' icon='download' iconAlign='left' onClick={ click }>
          Icon #1
        </Button>
        <Button type='neutral' icon='download' iconAlign='right' onClick={ click }>
          Icon #2
        </Button>
      </div>
      <div style={ styles }>
        <Button type='neutral' disabled>Disabled Neutral</Button>
        <Button type='brand' disabled>Disabled Brand</Button>
        <Button type='destructive' disabled>Disabled Destructive</Button>
      </div>
      <div style={ styles }>
        <Button type='neutral' size='small'>Small</Button>
        <Button type='brand' size='small'>Small Brand</Button>
        <Button type='destructive' size='small'>Small Destructive</Button>
      </div>
      <h2 className='slds-m-vertical--medium'>Buttons Inverse</h2>
      <div style={ { backgroundColor: '#16325c', ...styles } }>
        <Button type='inverse' onClick={ click }>Inverse</Button>
        <Button type='inverse' icon='download' iconAlign='left' onClick={ click }>
          Icon #1
        </Button>
        <Button type='inverse' icon='download' iconAlign='right' onClick={ click }>
          Icon #2
        </Button>
        <Button type='inverse' disabled>Disabled</Button>
      </div>
      <h2 className='slds-m-vertical--medium'>Icon Buttons</h2>
      <div style={ styles }>
        <Button type='icon-bare' icon='settings' />
        <Button type='icon-bare' icon='settings' disabled />
        <Button type='icon-container' icon='settings' />
        <Button type='icon-container' icon='settings' disabled />
        <Button type='icon-border' icon='settings' />
        <Button type='icon-border' icon='settings' disabled />
        <Button type='icon-border-filled' icon='settings' />
        <Button type='icon-border-filled' icon='settings' disabled />
      </div>
      <div style={ styles }>
        <Button type='icon-border' icon='down' size='x-small' />
        <Button type='icon-border' icon='down' size='small' />
        <Button type='icon-border' icon='down' size='medium' />
      </div>
      <div style={ styles }>
        <Button type='icon-bare' icon='down' iconSize='x-small' />
        <Button type='icon-bare' icon='down' iconSize='small' />
        <Button type='icon-bare' icon='close' iconSize='medium' />
        <Button type='icon-bare' icon='close' iconSize='large' />
      </div>
      <h2 className='slds-m-vertical--medium'>Icon Buttons Inverse</h2>
      <div style={ { backgroundColor: '#16325c', ...styles } }>
        <Button type='icon-inverse' icon='close' />
        <Button type='icon-inverse' icon='close' disabled />
      </div>
      <div style={ styles }>
        <SearchButtonField searchButtonTitle='Search' />
        <SearchButtonField value='initial value' onChange={handleOnChange} />
      </div>
    </div>
  );
};
