import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';
import { SalesPath } from '../src/scripts';

storiesOf('SalesPath', module)
  .add(
    'Controlled with knobs',
    () => {
      const activeKey = select(
        'activeKey',
        { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' },
        '1'
      );
      return (
        <SalesPath activeKey={activeKey} onSelect={action('onSelect')}>
          <SalesPath.PathItem eventKey='1' title='Contacted' />
          <SalesPath.PathItem eventKey='2' title='Open' />
          <SalesPath.PathItem eventKey='3' title='Unqualified' />
          <SalesPath.PathItem eventKey='4' title='Nurturing' />
          <SalesPath.PathItem eventKey='5' title='Closed' />
        </SalesPath>
      );
    },
    { info: 'Sales Path controlled with knobs' }
  )
  .add(
    'Default',
    () => {
      return (
        <SalesPath activeKey='3' onSelect={action('onSelect')}>
          <SalesPath.PathItem eventKey='1' title='Contacted' />
          <SalesPath.PathItem eventKey='2' title='Open' />
          <SalesPath.PathItem eventKey='3' title='Unqualified' />
          <SalesPath.PathItem eventKey='4' title='Nurturing' />
          <SalesPath.PathItem eventKey='5' title='Closed' />
        </SalesPath>
      );
    },
    { info: 'Sales Path' }
  );
