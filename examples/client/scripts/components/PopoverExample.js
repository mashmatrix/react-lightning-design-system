import React from 'react';

import { Icon, Popover } from 'react-lightning-design-system';

export default class PopoverExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { popoverVisible: false };
    this.togglePopover = this.togglePopover.bind(this);
  }

  togglePopover() {
    this.setState({ popoverVisible: !this.state.popoverVisible });
  }

  render() {
    return (
      <div style={{ height: 50, display: 'flex', alignItems: 'center' }}>
        <Icon
          key={3}
          category='utility'
          icon='info'
          onMouseEnter={this.togglePopover}
          onMouseLeave={this.togglePopover}
          style={{ width: 12, height: 12, marginRight: 10 }}
        />
        { this.state.popoverVisible &&
          <Popover
            key={4}
            hidden={this.state.popoverVisible}
            theme='info'
            arrow='left'
          >
            <p>Some content</p>
          </Popover> }
      </div>
    );
  }
}
