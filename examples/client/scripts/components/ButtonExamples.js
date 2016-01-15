import React from 'react';

import { Button } from 'react-lightning-design-system';

export default class ButtonExamples extends React.Component {
  render() {
    const styles = { padding: '12px' };
    const click = () => alert('Clicked');
    return (
      <div>
        <h2 className='slds-m-vertical--medium'>Buttons</h2>
        <div style={ styles }>
          <Button onClick={ click }>Simple</Button>
          <Button type='neutral' onClick={ click }>Neutral</Button>
          <Button type='brand' onClick={ click }>Brand</Button>
          <Button type='destructive' onClick={ click }>Brand</Button>
        </div>
      </div>
    );
  }
}
