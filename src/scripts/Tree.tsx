import React, {
  useId,
  HTMLAttributes,
  createContext,
  FC,
  useMemo,
} from 'react';
import classnames from 'classnames';
import { TreeNodeProps } from './TreeNode';

/**
 *
 */
export const TreeContext = createContext<{
  toggleOnNodeClick?: boolean;
  onNodeClick?: (e: React.MouseEvent, props: TreeNodeProps) => void;
  onNodeLabelClick?: (e: React.MouseEvent, props: TreeNodeProps) => void;
  onNodeToggle?: (e: React.MouseEvent, props: TreeNodeProps) => void;
}>({});

/**
 *
 */
export type TreeProps = {
  label?: string;
  toggleOnNodeClick?: boolean;
  onNodeClick?: (e: React.MouseEvent, props: TreeNodeProps) => void;
  onNodeLabelClick?: (e: React.MouseEvent, props: TreeNodeProps) => void;
  onNodeToggle?: (e: React.MouseEvent, props: TreeNodeProps) => void;
} & HTMLAttributes<HTMLDivElement>;

/**
 *
 */
export const Tree: FC<TreeProps> = (props) => {
  const {
    className,
    label,
    children,
    toggleOnNodeClick,
    onNodeClick,
    onNodeLabelClick,
    onNodeToggle,
    ...rprops
  } = props;
  const treeClassNames = classnames(className, 'slds-tree_container');
  const ctx = useMemo(
    () => ({
      toggleOnNodeClick,
      onNodeClick,
      onNodeLabelClick,
      onNodeToggle,
    }),
    [toggleOnNodeClick, onNodeClick, onNodeLabelClick, onNodeToggle]
  );
  const id = useId();
  return (
    <div className={treeClassNames} {...rprops}>
      {label ? (
        <h4 className='slds-tree__group-header' id={id}>
          {label}
        </h4>
      ) : null}
      <ul
        aria-labelledby={label ? id : undefined}
        className='slds-tree'
        role='tree'
      >
        <TreeContext.Provider value={ctx}>{children}</TreeContext.Provider>
      </ul>
    </div>
  );
};
