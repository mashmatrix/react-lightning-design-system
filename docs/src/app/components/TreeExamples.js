import React from 'react';

import { Tree, TreeNode } from 'react-lightning-design-system';

export default class TreeExamples extends React.Component {
  constructor(props) {
    super(props);
    this.state = { opened: false, loading: false };
  }

  loadItems() {
    if (!this.state.loading && !this.state.items) {
      setTimeout(() => {
        this.setState({
          items: [
            { label: 'Item #1', leaf: true },
            { label: 'Item #2', leaf: true },
            { label: 'Item #3', leaf: true },
          ],
          loading: false,
        });
      }, 2000);
      this.setState({ loading: true });
    }
    this.setState({ opened: !this.state.opened });
  }

  render() {
    const styles = { padding: '12px' };
    return (
      <div>
        <h2 className='slds-m-vertical--medium'>Tree</h2>
        <div style={ styles }>
          <Tree label='Tree Example #1'>
            <TreeNode label='Item #1' defaultOpened selected>
              <TreeNode label='Item #1-1' leaf />
              <TreeNode label='Item #1-2'>
                <TreeNode label='Item #1-2-1' leaf />
                <TreeNode label='Item #1-2-2' leaf />
              </TreeNode>
              <TreeNode label='Item #1-3' leaf />
            </TreeNode>
            <TreeNode label='Item #2' leaf />
          </Tree>
        </div>
        <h2 className='slds-m-vertical--medium'>Tree (async loading)</h2>
        <div style={ styles }>
          <Tree label='Tree Example #2' toggleOnNodeClick>
            <TreeNode label='Async Item #1'
              opened={ this.state.opened }
              loading={ this.state.loading }
              onToggle={ this.loadItems.bind(this) }
            >
              {
                this.state.items ?
                this.state.items.map((props, index) => <TreeNode key={ index } { ...props } />) :
                null
              }
            </TreeNode>
          </Tree>
        </div>
      </div>
    );
  }
}
