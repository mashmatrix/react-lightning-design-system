import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { cleanProps } from './util';


export default class Tree extends Component {
  constructor() {
    super();

    this.renderTreeNode = this.renderTreeNode.bind(this);
  }

  renderTreeNode(tnode) {
    const { onNodeClick, onNodeToggle, onNodeLabelClick, toggleOnNodeClick } = this.props;
    return cloneElement(tnode, {
      level: 1, onNodeClick, onNodeToggle, onNodeLabelClick, toggleOnNodeClick,
    });
  }

  render() {
    const { className, label, children, ...props } = this.props;
    const treeClassNames = classnames(className, 'slds-tree-container');
    const pprops = cleanProps(props, Tree.propTypes);
    return (
      <div className={ treeClassNames } role='application' { ...pprops }>
        {
          label ?
            <h4 className='slds-text-heading--label'>{ label }</h4> :
            null
        }
        <ul className='slds-tree' role='tree'>
          { Children.map(children, this.renderTreeNode) }
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
