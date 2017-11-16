import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from './Button';
import Spinner from './Spinner';
import { cleanProps } from './util';


export default class TreeNode extends Component {
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

  renderTreeItem(itemProps) {
    const {
      className, label, icon = 'chevronright', loading, selected, leaf, isOpened,
      children, itemRender, ...props
    } = itemProps;
    const itmClassNames = classnames(className, 'slds-tree__item', {
      'slds-is-open': isOpened,
      'slds-is-selected': selected,
    });
    const pprops = cleanProps(props, TreeNode.propTypes);
    return (
      <div
        className={ itmClassNames }
        onClick={ this.onClick.bind(this) }
        style={{ position: 'relative' }}
        { ...pprops }
      >
        {
          loading ?
            <Spinner
              container={false}
              size='small'
              className='slds-m-right--x-small'
              style={{ position: 'static', marginTop: 14, marginLeft: -2 }}
            /> :
          !leaf ?
            <Button
              className='slds-m-right--small'
              aria-controls=''
              type='icon-bare'
              icon={ icon }
              iconSize='small'
              onClick={ this.onToggle.bind(this) }
            /> :
            null
        }
        <a
          className='slds-truncate'
          tabIndex={ -1 }
          role='presentation'
          onClick={ this.onLabelClick.bind(this) }
        >
          {itemRender ?
            itemRender(itemProps) :
            label
          }
        </a>
        { leaf ? children : null }
      </div>
    );
  }

  renderChildNode(level, tnode) {
    const { onNodeClick, onNodeToggle, onNodeLabelClick, toggleOnNodeClick } = this.props;
    return React.cloneElement(tnode, {
      level, onNodeClick, onNodeToggle, onNodeLabelClick, toggleOnNodeClick,
    });
  }

  render() {
    const {
      defaultOpened, opened, leaf, level,
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
      return (
        <li role='treeitem' aria-level={ level }>
          { this.renderTreeItem(itemProps) }
        </li>
      );
    }

    return (
      <li role='treeitem' aria-level={ level } aria-expanded={ isOpened }>
        { this.renderTreeItem(itemProps) }
        <ul className={ grpClassNames } role='group'>
          { React.Children.map(children, this.renderChildNode.bind(this, level + 1)) }
        </ul>
      </li>
    );
  }
}


TreeNode.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  onToggle: PropTypes.func,
  onNodeToggle: PropTypes.func,
  onNodeLabelClick: PropTypes.func,
  onLabelClick: PropTypes.func,
  onNodeClick: PropTypes.func,
  toggleOnNodeClick: PropTypes.bool,
  defaultOpened: PropTypes.bool,
  opened: PropTypes.bool,
  leaf: PropTypes.bool,
  level: PropTypes.number,
  children: PropTypes.node,
  itemRender: PropTypes.func,
};
