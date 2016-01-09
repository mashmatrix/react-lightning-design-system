import React from 'react';

import { Badge } from 'react-lightning-design-system';

export default class BadgeExamples extends React.Component {
  render() {
    const styles = { padding: '12px' };
    return (
      <div>
        <h2 className='slds-m-vertical--medium'>Badges</h2>
        <div style={ styles }>
          <Badge>Label</Badge>
          <Badge type='default'>Label</Badge>
          <Badge type='shade'>Label</Badge>
          <Badge type='inverse'>Label</Badge>
        </div>
      </div>
    );
  }
}
