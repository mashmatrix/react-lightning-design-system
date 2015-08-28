import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Button from './Button';
import Spinner from './Spinner';


export default class TreeNode extends React.Component {
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
      defaultOpened, opened, leaf, level,
      onClick, onToggle, onNodeClick, onNodeToggle, onLabelClick, onNodeLabelClick,
      toggleOnNodeClick,
      children, ...props
    } = this.props;
    const isOpened =
      typeof opened !== 'undefined' ? opened :
      typeof this.state.opened !== 'undefined' ? this.state.opened :
      defaultOpened;
    const grpClassNames = classnames('slds-tree__group', {
      'slds-nested': !leaf,
      'is-expanded': isOpened,
      'slds-show': isOpened,
      'slds-hide': !isOpened,
    });
    const itemProps = { leaf, isOpened, children, ...props };
    if (leaf) {
      return this.renderTreeItem(itemProps);
    } else {
      return (
        <li className='slds-tree__branch' role='treeitem' aria-level={ level } aria-expanded={ opened }>
          { this.renderTreeItem(itemProps) }
          <ul className={ grpClassNames } role='group'>
            { React.Children.map(children, this.renderChildNode.bind(this, level+1)) }
          </ul>
        </li>
      );
    }
  }

  renderTreeItem(itemProps) {
    const {
      className, label, icon='chevronright', loading, selected, leaf, isOpened,
      children, ...props
    } = itemProps;
    const itmClassNames = classnames(className, 'slds-tree__item', {
      'slds-is-open': isOpened,
      'slds-is-selected': selected,
    });
    return (
      <div className={ itmClassNames } onClick={ this.onClick.bind(this) } { ...props }>
        {
          loading ? <Spinner size='small' /> :
          !leaf ?
          <Button className='slds-m-right--small'
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
