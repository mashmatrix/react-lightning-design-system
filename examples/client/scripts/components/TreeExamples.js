import React from 'react';
import { Tree, TreeNode, PropTypes } from 'react-lightning-design-system';

const L = ['A', 'B', 'C', 'E'];
const inlineStyle = {
  border: '1px solid #CCC',
  width: '20px',
  height: '20px',
  textAlign: 'center',
  display: 'inline-block',
  cursor: 'pointer',
  marginLeft: 'auto',
  lineHeight: 'initial',
};

const clickMe = (name) => {
  alert(`click on ${name}`) //eslint-disable-line
};

const onInputChange = (e) => {
  console.log(e.target.value);
};

const input = <input onChange={onInputChange} />;

const InLineButton = ({ name }) => (
  <div style={inlineStyle} onClick={clickMe.bind(null, name)}>
    {name}
  </div>
);

InLineButton.propTypes = {
  name: PropTypes.string,
};

export default class TreeExamples extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nodes: {} };
  }

  loadItems(path = '') {
    let state = this.state;
    const { loading, items } = state.nodes[path] || {};
    if (!loading && !items) {
      setTimeout(() => {
        const nodeCount = Math.floor(Math.random() * 5 + 1);
        const branchIdx = Math.floor(Math.random() * nodeCount);
        this.setState({
          nodes: {
            ...this.state.nodes,
            [path]: {
              ...this.state.nodes[path],
              items: new Array(nodeCount + 1).join('_').split('')
                .map((a, idx) => {
                  const cpath = (path ? `${path}-` : '') + (idx + 1);
                  return {
                    label: `Item #${cpath}`,
                    index: idx,
                    path: cpath,
                    leaf: branchIdx !== idx,
                  };
                }),
              loading: false,
            },
          },
        });
      }, 2000);
      state = {
        nodes: {
          ...state.nodes,
          [path]: {
            ...state.nodes[path],
            loading: true,
          },
        },
      };
    }
    this.setState({
      nodes: {
        ...state.nodes,
        [path]: {
          ...state.nodes[path],
          opened: !state.nodes[path].opened,
        },
      },
    });
  }

  renderAsyncTreeNode(props = {}) {
    const { index, path = '', label, leaf } = props;
    const { opened, loading, items } = this.state.nodes[path] || {};
    return (
      <TreeNode
        key={ index }
        label={ label }
        leaf={ leaf }
        opened={ opened }
        loading={ loading }
        onToggle={ !leaf && this.loadItems.bind(this, path) }
      >
        {
          items ?
          items.map((cprops) => this.renderAsyncTreeNode(cprops)) :
          undefined
        }
      </TreeNode>
    );
  }

  renderControlButtons() {
    return (
      <div>
        {L.map((l, i) => <InLineButton name={l} key={i} />)}
      </div>
    );
  }

  render() {
    const styles = { padding: '12px' };
    const rootProps = {
      label: 'Async Tree Root Node',
      index: 0,
      path: '',
      opened: true,
    };
    return (
      <div>
        {this.renderControlButtons()}
        <h2 className='slds-m-vertical--medium'>Tree</h2>
        <div style={ styles }>
          <Tree label='Tree Example #1'>
            <TreeNode
              useInput={input}
              label='Item #1'
              defaultOpened
              selected
              controls={L.map((l, i) => <InLineButton name={l} key={i} />)}
            >
              <TreeNode label='Item #1-1' leaf />
              <TreeNode label='Item #1-2'>
                <TreeNode label='Item #1-2-1' leaf />
                <TreeNode label='Item #1-2-2' leaf />
              </TreeNode>
              <TreeNode
                label='Item #1-3'
                leaf
                showAllways
                controls={L.map((l, i) => <InLineButton name={l} key={i} />)}
              />
            </TreeNode>
            <TreeNode label='Item #2' leaf />
          </Tree>
        </div>
        <h2 className='slds-m-vertical--medium'>Tree (async loading)</h2>
        <div style={ styles }>
          <Tree label='Tree Example #2' toggleOnNodeClick>
            { this.renderAsyncTreeNode(rootProps) }
          </Tree>
        </div>
      </div>
    );
  }
}
