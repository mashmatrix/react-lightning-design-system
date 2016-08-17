import React from 'react';

import { Popover, Icon, Button } from 'react-lightning-design-system';

export default class PopoverExamples extends React.Component {
  render() {
    return (
      <div>
        <h2 className='slds-m-vertical--medium'>Popovers</h2>
        <div>
          <Popover position='left' hidden={false}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Commodi laudantium molestias reprehenderit nostrum quod natus saepe
              ea corrupti odit minima?
            </p>
          </Popover>

          <br /><br />
          <Popover position='bottom' hidden={false} tooltip>
            <p>
              Sit nulla est ex deserunt exercitation anim occaecat.
              Nostrud ullamco deserunt aute id consequat veniam incididunt duis
              in sint irure nisi.
            </p>
          </Popover>

          <br /><br />
          <Popover position='left' hidden={false} theme='info'>
            <p>
              Sit nulla est ex deserunt exercitation anim occaecat.
              Nostrud ullamco deserunt aute id consequat veniam incididunt duis in
              sint irure nisi.
            </p>
          </Popover>
        </div>
        <div style={{ marginTop: 40 }}>
          <Icon
            size='x-small'
            icon='help'
            category='utility'
            onMouseEnter={() => this.refs.popover.toggle(true)}
            onMouseLeave={() => this.refs.popover.toggle(false)}
          />
          <Popover
            ref='popover'
            position='left'
            tooltip
            style={{
              position: 'absolute',
              marginLeft: 14,
              marginTop: -24,
            }}
          >
            <p>
              Sit nulla est ex deserunt exercitation anim occaecat.
              Nostrud ullamco deserunt aute id consequat veniam incididunt duis
              in sint irure nisi.
            </p>
          </Popover>
        </div>
        <div style={{ marginTop: 40, position: 'relative' }}>
          <Button
            type='neutral'
            ref='popoverTrigger'
            onClick={() => this.refs.buttonPopover.toggle()}
            icon='down'
            iconAlign='right'
            iconSize='small'
          >Click</Button>
          <Popover
            ref='buttonPopover'
            trigger={() => this.refs.popoverTrigger}
            style={{
              position: 'absolute',
              marginLeft: -85,
              marginTop: 38,
            }}
          >
            <p>
              Sit nulla est ex deserunt exercitation anim occaecat.
              Nostrud ullamco deserunt aute id consequat veniam incididunt
              duis in sint irure nisi.
            </p>
          </Popover>
        </div>
      </div>
    );
  }
}
