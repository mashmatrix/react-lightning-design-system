import React, { PropTypes } from 'react';
import classnames from 'classnames';


export default class Tree extends React.Component {
  renderTreeNode(tnode) {
    const { onNodeClick, onNodeToggle, onNodeLabelClick, toggleOnNodeClick } = this.props;
    return React.cloneElement(tnode, {
      level: 1, onNodeClick, onNodeToggle, onNodeLabelClick, toggleOnNodeClick,
    });
  }

  render() {
    const { className, label, children, ...props } = this.props;
    const treeClassNames = classnames(className, 'slds-tree-container');
    const pprops = props;
    delete pprops.toggleOnNodeClick;
    return (
      <div className={ treeClassNames } role='application' { ...props }>
        {
          label ?
            <h4 className='slds-text-heading--label'>{ label }</h4> :
            null
        }
        <ul className='slds-tree' role='tree'>
          { React.Children.map(children, this.renderTreeNode.bind(this)) }
        </ul>
      </div>
    );
  }
}

Tree.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onNodeClick: PropTypes.func,
  onNodeToggle: PropTypes.func,
  onNodeLabelClick: PropTypes.func,
  toggleOnNodeClick: PropTypes.bool,
  children: PropTypes.node,
};
