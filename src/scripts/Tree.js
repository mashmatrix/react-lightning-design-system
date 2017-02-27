import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { registerStyle } from './util';


export default class Tree extends React.Component {
  constructor(props) {
    super(props);
    registerStyle('tree', [
      [
        '.slds-tree [aria-level="1"] > .slds-tree__item',
        '{ padding-left: 20px; line-height: 2.5rem; margin: 1px 0 1px 0; }',
      ],
    ]);
  }

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
      <div className={ treeClassNames } role='application' { ...pprops }>
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
