import React, { ComponentType, createContext, FC, useContext } from 'react';
import classnames from 'classnames';
import { Button } from './Button';
import { Spinner } from './Spinner';
import { useControlledValue, useEventCallback } from './hooks';
import { TreeContext } from './Tree';

/**
 *
 */
const TreeNodeLevelContext = createContext<number>(1);

/**
 *
 */
export type TreeNodeProps = {
  className?: string;
  label?: string | JSX.Element;
  defaultOpened?: boolean;
  opened?: boolean;
  selected?: boolean;
  leaf?: boolean;
  loading?: boolean;
  level?: number;
  onClick?: (e: React.MouseEvent) => void;
  onLabelClick?: (e: React.MouseEvent) => void;
  onToggle?: (e: React.MouseEvent) => void;
  itemRender?: ComponentType<TreeNodeProps>;
};

/**
 *
 */
const TreeNodeItem: FC<TreeNodeProps & { icon?: string }> = (props) => {
  const {
    className,
    label,
    icon = 'chevronright',
    loading,
    selected,
    leaf,
    opened,
    children,
    itemRender: ItemRender,
    onClick,
    onToggle,
    onLabelClick,
    ...rprops
  } = props;
  const itmClassNames = classnames(className, 'slds-tree__item', {
    'slds-is-open': opened,
    'slds-is-selected': selected,
  });
  return (
    <div
      className={itmClassNames}
      onClick={onClick}
      style={{ position: 'relative' }}
      {...rprops}
    >
      {loading ? (
        <Spinner
          container={false}
          size='small'
          className='slds-m-right_x-small'
          style={{ position: 'static', marginTop: 14, marginLeft: -2 }}
        />
      ) : !leaf ? (
        <Button
          className='slds-m-right_small'
          aria-controls=''
          type='icon-bare'
          icon={icon}
          iconSize='small'
          onClick={onToggle}
        />
      ) : null}
      <a
        className='slds-truncate'
        tabIndex={-1}
        role='presentation'
        onClick={onLabelClick}
      >
        {ItemRender ? <ItemRender {...props} /> : label}
      </a>
      {leaf ? children : null}
    </div>
  );
};

/**
 *
 */
export const TreeNode: FC<TreeNodeProps> = (props) => {
  const {
    defaultOpened,
    opened: opened_,
    leaf,
    children,
    onClick: onClick_,
    onToggle: onToggle_,
    onLabelClick: onLabelClick_,
    ...rprops
  } = props;
  const { toggleOnNodeClick, onNodeClick, onNodeLabelClick, onNodeToggle } =
    useContext(TreeContext);
  const level = useContext(TreeNodeLevelContext);
  const [opened, setOpened] = useControlledValue(
    opened_,
    defaultOpened ?? false
  );

  const onToggle = useEventCallback((e: React.MouseEvent) => {
    onToggle_?.(e);
    onNodeToggle?.(e, props);
    setOpened((opened) => !opened);
  });

  const onLabelClick = useEventCallback((e: React.MouseEvent) => {
    onLabelClick_?.(e);
    onNodeLabelClick?.(e, props);
  });

  const onClick = useEventCallback((e: React.MouseEvent) => {
    onClick_?.(e);
    onNodeClick?.(e, props);
    if (toggleOnNodeClick) {
      onToggle(e);
    }
  });

  const grpClassNames = classnames('slds-tree__group', {
    'slds-nested': !leaf,
    'is-expanded': opened,
    'slds-show': opened,
    'slds-hide': !opened,
  });
  return (
    <li
      role='treeitem'
      aria-level={level}
      {...(leaf ? {} : { 'aria-expanded': opened })}
    >
      <TreeNodeItem
        {...rprops}
        {...{ leaf, opened, children, onClick, onLabelClick, onToggle }}
      />
      {!leaf ? (
        <ul className={grpClassNames} role='group'>
          <TreeNodeLevelContext.Provider value={level + 1}>
            {children}
          </TreeNodeLevelContext.Provider>
        </ul>
      ) : undefined}
    </li>
  );
};
