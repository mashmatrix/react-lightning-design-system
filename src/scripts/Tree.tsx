import React, {
  Component,
  Children,
  cloneElement,
  HTMLAttributes,
} from 'react';
import classnames from 'classnames';

export type TreeProps = {
  label?: string;
  toggleOnNodeClick?: boolean;
  onNodeClick?: (...args: any[]) => any;
  onNodeToggle?: (...args: any[]) => any;
  onNodeLabelClick?: (...args: any[]) => any;
} & HTMLAttributes<HTMLDivElement>;

export class Tree extends Component<TreeProps, {}> {
  constructor(props: Readonly<TreeProps>) {
    super(props);
    this.renderTreeNode = this.renderTreeNode.bind(this);
  }

  renderTreeNode(tnode: any) {
    const {
      onNodeClick,
      onNodeToggle,
      onNodeLabelClick,
      toggleOnNodeClick,
    } = this.props;
    return cloneElement(tnode, {
      level: 1,
      onNodeClick,
      onNodeToggle,
      onNodeLabelClick,
      toggleOnNodeClick,
    });
  }

  render() {
    const {
      className,
      label,
      children,
      /* eslint-disable @typescript-eslint/no-unused-vars */
      onNodeClick,
      onNodeToggle,
      onNodeLabelClick,
      toggleOnNodeClick,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...props
    } = this.props;
    const treeClassNames = classnames(className, 'slds-tree-container');
    return (
      <div className={treeClassNames} role='application' {...props}>
        {label ? <h4 className='slds-text-heading--label'>{label}</h4> : null}
        <ul className='slds-tree' role='tree'>
          {Children.map(children, this.renderTreeNode)}
        </ul>
      </div>
    );
  }
}
