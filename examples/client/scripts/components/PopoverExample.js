import React, { Component } from 'react';
import { Popover, Icon, Button, SearchButtonField } from 'react-lightning-design-system';

export default class PopoverExample extends Component {
  constructor(props) {
    super(props);
    this.state = { popoverVisible: false };
    this.showPopover = this.showPopover.bind(this);
    this.hidePopover = this.hidePopover.bind(this);
  }

  showPopover() {
    this.setState({ popoverVisible: true });
  }

  hidePopover() {
    this.setState({ popoverVisible: false });
  }

  render() {
    return (
      <div>
        <h2 className='slds-m-vertical--medium'>Icon with popover</h2>
        <div style={{ height: 50, display: 'flex', alignItems: 'center' }}>
          <Icon
            key={3}
            category='utility'
            icon='info'
            onMouseEnter={this.showPopover}
            onMouseLeave={this.hidePopover}
            style={{ width: 12, height: 12, marginRight: 10 }}
          />
          <Popover
            key={4}
            hidden={!this.state.popoverVisible}
            theme='info'
            arrow='left'
            className='example-popover'
          >
            <p>Some content</p>
          </Popover>
        </div>

        <h2 className='slds-m-vertical--medium'>Button with popover</h2>
        <div style={{ height: 50, display: 'flex', alignItems: 'center' }}>
          <Button
            type='icon-border'
            icon='settings'
            onMouseEnter={this.showPopover}
            onMouseLeave={this.hidePopover}
          />
          <Popover
            key={5}
            hidden={!this.state.popoverVisible}
            theme='info'
            arrow='left'
            className='example-popover'
          >
            <p>Settings</p>
          </Popover>
        </div>
        <h2 className='slds-m-vertical--medium'>Search button with popover</h2>
        <div style={{ height: 50, display: 'flex', alignItems: 'center' }}>
          <SearchButtonField
            onMouseEnter={this.showPopover}
            onMouseLeave={this.hidePopover}
          >
            <Popover
              key={6}
              hidden={!this.state.popoverVisible}
              theme='info'
              arrow='top'
              className='example-popover example-popover-search'
            >
              <p>Search</p>
            </Popover>
          </SearchButtonField>

        </div>
      </div>
    );
  }
}
