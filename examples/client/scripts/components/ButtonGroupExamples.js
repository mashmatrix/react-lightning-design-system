import React from 'react';

import { ButtonGroup, Button } from 'react-lightning-design-system';

export default () => {
  const styles = { padding: '12px' };
  const click = () => alert('Clicked');
  return (
    <div>
      <h2 className='slds-m-vertical--medium'>Button Groups</h2>
      <div style={ styles }>
        <ButtonGroup>
          <Button type='neutral' onClick={ click }>Refresh</Button>
          <Button type='neutral' onClick={ click } disabled>Edit</Button>
          <Button type='neutral' icon='download' iconAlign='left' onClick={ click }>
            Download
          </Button>
          <Button type='icon-border' icon='down' />
        </ButtonGroup>
      </div>
      <h2 className='slds-m-vertical--medium'>Button Groups Inverse</h2>
      <div style={ { backgroundColor: '#16325c', ...styles } }>
        <ButtonGroup>
          <Button type='inverse' onClick={ click }>Refresh</Button>
          <Button type='inverse' onClick={ click } disabled>Edit</Button>
          <Button type='inverse' icon='download' iconAlign='left' onClick={ click }>
            Download
          </Button>
          <Button type='icon-border' icon='down' inverse />
        </ButtonGroup>
      </div>
    </div>
  );
};
