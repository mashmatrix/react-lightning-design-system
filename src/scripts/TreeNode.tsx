import React, {
  ComponentType,
  createContext,
  FC,
  useContext,
  ReactNode,
} from 'react';
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
  disabled?: boolean;
  children?: ReactNode;
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
    level = 0,
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
  const spinnerClassNames = classnames(
    'react-slds-spinner',
    'slds-m-right_x-small'
  );
  const loadingPositionStyle = {
    left: `${level}rem`,
  };
  return (
    <div
      className={itmClassNames}
      onClick={onClick}
      style={{ position: 'relative' }}
      {...rprops}
    >
      {loading && (
        <Spinner
          className={spinnerClassNames}
          container={false}
          size='small'
          style={loadingPositionStyle}
        />
      )}
      {!leaf ? (
        <Button
          className='slds-m-right_x-small'
          aria-controls=''
          type='icon-bare'
          icon={icon}
          iconSize='small'
          onClick={onToggle}
          // Prevent focus loss during loading by keeping the toggle button in the DOM with opacity set to 0.
          style={loading ? { opacity: 0, pointerEvents: 'none' } : undefined}
        />
      ) : null}
      <span className='slds-has-flexi-truncate'>
        <a
          className='slds-tree__item-label slds-truncate'
          onClick={onLabelClick}
          title={typeof label === 'string' ? label : undefined}
        >
          {ItemRender ? <ItemRender {...props} /> : label}
        </a>
      </span>
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
    selected,
    disabled,
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
  const labelText =
    typeof rprops.label === 'string' ? rprops.label : 'Tree Branch';
  const ariaLabel = !leaf ? labelText : undefined;
  return (
    <li
      role='treeitem'
      aria-level={level}
      aria-expanded={!leaf ? opened : undefined}
      aria-label={ariaLabel}
      aria-selected={selected || undefined}
      aria-disabled={disabled || undefined}
    >
      <TreeNodeItem
        {...rprops}
        {...{
          leaf,
          opened,
          level,
          selected,
          disabled,
          children,
          onClick,
          onLabelClick,
          onToggle,
        }}
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
