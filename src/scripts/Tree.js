import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Button from './Button';


export default class Tree extends React.Component {
  render() {
    const { className, label, children, ...props } = this.props;
    const treeClassNames = classnames(className, 'slds-tree-container');
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

  renderTreeNode(tnode) {
    const { onNodeClick, onNodeToggle, onNodeLabelClick, toggleOnNodeClick } = this.props;
    return React.cloneElement(tnode, { level: 1, onNodeClick, onNodeToggle, onNodeLabelClick, toggleOnNodeClick });
  }
}

Tree.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onNodeClick: PropTypes.func,
  onNodeToggle: PropTypes.func,
  onNodeLabelClick: PropTypes.func,
  toggleOnNodeClick: PropTypes.bool,
};


export class TreeNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = { opened: this.props.defaultOpened };
  }

  onToggle(e) {
    const { onToggle, onNodeToggle } = this.props;
    if (onToggle) { onToggle(e, this.props); }
    if (onNodeToggle) { onNodeToggle(e, this.props); }
    this.setState({ opened: !this.state.opened });
  }

  onLabelClick(e) {
    const { onLabelClick, onNodeLabelClick } = this.props;
    if (onLabelClick) { onLabelClick(e, this.props); }
    if (onNodeLabelClick) { onNodeLabelClick(e, this.props); }
  }

  onClick(e) {
    const { onClick, onNodeClick, toggleOnNodeClick } = this.props;
    if (onClick) { onClick(e, this.props); }
    if (onNodeClick) { onNodeClick(e, this.props); }
    if (toggleOnNodeClick) {
      this.onToggle(e);
    }
  }

  render() {
    const {
      className, label, icon='chevronright',
      defaultOpened, opened, leaf, level,
      onNodeClick, onToggleClick, onTreeNodeClick,
      children,
      ...props
    } = this.props;
    const isOpened =
      typeof opened !== 'undefined' ? opened :
      typeof this.state.opened !== 'undefined' ? this.state.opened :
      defaultOpened;
    const tnClassNames = classnames(className, 'slds-tree__branch', {
      'slds-is-open': isOpened,
    });
    const grpClassNames = classnames('slds-tree__group', {
      'slds-nested': !leaf,
      'is-expanded': isOpened,
      'slds-show': isOpened,
      'slds-hide': !isOpened,
    });
    return (
      <li className={ tnClassNames } role='treeitem' aria-level={ level } aria-expanded={ opened } { ...props }>
        <div className='slds-tree__item' onClick={ this.onClick.bind(this) }>
          {
            !leaf ?
            <Button className='slds-m-right--x-small'
              type='icon-bare'
              icon={ icon }
              onClick={ this.onToggle.bind(this) }
            /> :
            null
          }
          <a className='slds-truncate' tabIndex={ -1 } role='presentation'
            onClick={ this.onLabelClick.bind(this) } >
            { label }
          </a>
          { leaf ? children : null }
        </div>
        {
          !leaf ?
          <ul className={ grpClassNames } role='group'>
            { React.Children.map(children, this.renderChildNode.bind(this, level+1)) }
          </ul> :
          null
        }
      </li>
    );
  }

  renderChildNode(level, tnode) {
    const { onNodeClick, onNodeToggle, onNodeLabelClick, toggleOnNodeClick } = this.props;
    return React.cloneElement(tnode, { level, onNodeClick, onNodeToggle, onNodeLabelClick, toggleOnNodeClick });
  }
}


TreeNode.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  onToggle: PropTypes.func,
  onLabelClick: PropTypes.func,
};
