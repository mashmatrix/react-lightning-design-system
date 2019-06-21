import React, { Component } from 'react';
import classnames from 'classnames';
import { Button } from './Button';
import { Spinner } from './Spinner';

export type TreeNodeProps = {
  className?: string;
  label?: string;
  toggleOnNodeClick?: boolean;
  defaultOpened?: boolean;
  opened?: boolean;
  selected?: boolean;
  leaf?: boolean;
  loading?: boolean;
  level?: number;
  onClick?: (e: React.MouseEvent, props: any) => void;
  onToggle?: (e: React.MouseEvent, props: any) => void;
  onNodeToggle?: (e: React.MouseEvent, props: any) => void;
  onNodeLabelClick?: (e: React.MouseEvent, props: any) => void;
  onLabelClick?: (e: React.MouseEvent, props: any) => void;
  onNodeClick?: (e: React.MouseEvent, props: any) => void;
  itemRender?: (props: any) => void;
};

type TreeNodeState = {
  opened?: boolean;
};

export class TreeNode extends Component<TreeNodeProps, TreeNodeState> {
  constructor(props: Readonly<TreeNodeProps>) {
    super(props);
    this.state = { opened: this.props.defaultOpened };
  }

  onToggle(
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>
  ) {
    const { onToggle, onNodeToggle } = this.props;
    if (onToggle) {
      onToggle(e, this.props);
    }
    if (onNodeToggle) {
      onNodeToggle(e, this.props);
    }
    this.setState((prevState) => ({ opened: !prevState.opened }));
  }

  onLabelClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    const { onLabelClick, onNodeLabelClick } = this.props;
    if (onLabelClick) {
      onLabelClick(e, this.props);
    }
    if (onNodeLabelClick) {
      onNodeLabelClick(e, this.props);
    }
  }

  onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { onClick, onNodeClick, toggleOnNodeClick } = this.props;
    if (onClick) {
      onClick(e, this.props);
    }
    if (onNodeClick) {
      onNodeClick(e, this.props);
    }
    if (toggleOnNodeClick) {
      this.onToggle(e);
    }
  }

  renderTreeItem(itemProps: any) {
    const {
      className,
      label,
      icon = 'chevronright',
      loading,
      selected,
      leaf,
      isOpened,
      children,
      itemRender,
      /* eslint-disable @typescript-eslint/no-unused-vars */
      onNodeClick,
      onNodeToggle,
      onNodeLabelClick,
      toggleOnNodeClick,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...props
    } = itemProps;
    const itmClassNames = classnames(className, 'slds-tree__item', {
      'slds-is-open': isOpened,
      'slds-is-selected': selected,
    });
    return (
      <div
        className={itmClassNames}
        onClick={this.onClick.bind(this)}
        style={{ position: 'relative' }}
        {...props}
      >
        {loading ? (
          <Spinner
            container={false}
            size='small'
            className='slds-m-right--x-small'
            style={{ position: 'static', marginTop: 14, marginLeft: -2 }}
          />
        ) : !leaf ? (
          <Button
            className='slds-m-right--small'
            aria-controls=''
            type='icon-bare'
            icon={icon}
            iconSize='small'
            onClick={this.onToggle.bind(this)}
          />
        ) : null}
        <a
          className='slds-truncate'
          tabIndex={-1}
          role='presentation'
          onClick={this.onLabelClick.bind(this)}
        >
          {itemRender ? itemRender(itemProps) : label}
        </a>
        {leaf ? children : null}
      </div>
    );
  }

  renderChildNode(level: number, tnode: any) {
    const {
      onNodeClick,
      onNodeToggle,
      onNodeLabelClick,
      toggleOnNodeClick,
    } = this.props;
    return React.cloneElement(tnode, {
      level,
      onNodeClick,
      onNodeToggle,
      onNodeLabelClick,
      toggleOnNodeClick,
    });
  }

  render() {
    const {
      defaultOpened,
      opened,
      leaf,
      level = 1,
      children,
      ...props
    } = this.props;
    const isOpened =
      typeof opened !== 'undefined'
        ? opened
        : typeof this.state.opened !== 'undefined'
        ? this.state.opened
        : defaultOpened;
    const grpClassNames = classnames('slds-tree__group', {
      'slds-nested': !leaf,
      'is-expanded': isOpened,
      'slds-show': isOpened,
      'slds-hide': !isOpened,
    });
    const itemProps = { leaf, isOpened, children, ...props };
    if (leaf) {
      return (
        <li role='treeitem' aria-level={level}>
          {this.renderTreeItem(itemProps)}
        </li>
      );
    }

    return (
      <li role='treeitem' aria-level={level} aria-expanded={isOpened}>
        {this.renderTreeItem(itemProps)}
        <ul className={grpClassNames} role='group'>
          {React.Children.map(
            children,
            this.renderChildNode.bind(this, level + 1)
          )}
        </ul>
      </li>
    );
  }
}
