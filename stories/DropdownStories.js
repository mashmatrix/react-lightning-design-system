import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Button, Dropdown, util } from '../src/scripts';

const stories = storiesOf('Dropdown', module)
  .add('Auto Alignment', withInfo('Render Dropdown with auto layout')(() => (
    <div
      style={ {
        position: 'relative',
        width: '100%',
        height: 300,
        overflow: 'auto',
        backgroundColor: '#efefef',
      } }
      onScroll={ util.updateScroll }
    >
      <div style={ { position: 'relative', width: 3000, height: 1000 } }>
        <span className='slds-dropdown-trigger' style={ { position: 'absolute', left: 1500, top: 500 } }>
          <Button type='neutral' autoFocus>button</Button>
          <Dropdown>
            <div style={ { width: 150, height: 200 } }>Dropdown #1</div>
          </Dropdown>
        </span>
      </div>
    </div>
  )))
;

export default stories;
