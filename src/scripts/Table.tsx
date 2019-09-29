import React, {
  Component,
  CSSProperties,
  ThHTMLAttributes,
  HTMLAttributes,
  AllHTMLAttributes,
  TableHTMLAttributes,
} from 'react';
import classnames from 'classnames';

import { Icon } from './Icon';

export type TableHeaderProps = {
  hasActions?: boolean;
  actionsPosition?: number;
  sortable?: boolean;
};

export class TableHeader extends Component<TableHeaderProps> {
  renderBaseHeaderRow() {
    const { children, sortable, hasActions, actionsPosition = 0 } = this.props;
    let nextChildren: any = [];

    const props = {
      className: 'slds-text-title--caps',
    };

    React.Children.forEach((children as any).props.children, (child, index) => {
      const childSortable = child.props.sortable;
      nextChildren.push(
        React.cloneElement(child, {
          // eslint-disable-next-line react/no-array-index-key
          key: index,
          sortable:
            typeof childSortable === 'undefined' ? sortable : childSortable,
        })
      );
    });

    if (hasActions) {
      nextChildren = [
        ...nextChildren.slice(0, actionsPosition),
        <TableHeaderColumn
          sortable={false}
          width={50}
          key={-1}
          className='slds-cell-shrink'
        />,
        ...nextChildren.slice(actionsPosition),
      ];
    }

    return React.cloneElement(children as any, props, nextChildren);
  }

  render() {
    return <thead>{this.renderBaseHeaderRow()}</thead>;
  }
}

export class TableBody extends Component {
  renderRows() {
    return React.Children.map(this.props.children, (child: any) => {
      const children: any = [];

      React.Children.forEach(child.props.children, (innerChild, index) => {
        if (!React.isValidElement(innerChild)) return;
        const { truncate } = innerChild.props as any;
        const props: any = {
          key: index,
        };
        if (typeof truncate !== 'undefined') props.truncate = truncate;
        children.push(React.cloneElement(innerChild, props));
      });

      return React.cloneElement(
        child,
        { className: 'slds-hint-parent' },
        children
      );
    });
  }

  render() {
    return <tbody>{this.renderRows()}</tbody>;
  }
}

export type TableRowProps = {
  selected?: boolean;
  style?: object;
} & HTMLAttributes<HTMLTableRowElement>;

export const TableRow: React.FC<TableRowProps> = ({ selected, ...props }) => {
  let { style } = props;

  if (selected) {
    style = Object.assign({}, style, {
      backgroundColor: '#F8FCF5',
      borderLeft: '2px solid #7db450',
    });
  }

  return (
    <tr {...props} style={style}>
      {props.children}
    </tr>
  );
};

export type TableHeaderColumnProps = {
  className?: string;
  width?: string | number;
  sortable?: boolean;
  resizable?: boolean;
  sortDir?: string;
  sorted?: boolean;
  align?: 'left' | 'center' | 'right';
  onSort?: () => void;
} & ThHTMLAttributes<HTMLTableHeaderCellElement>;

export const TableHeaderColumn: React.FC<TableHeaderColumnProps> = (props) => {
  const {
    sortable,
    resizable,
    children,
    className,
    width,
    sortDir,
    onSort,
    sorted,
    align,
    ...pprops
  } = props;
  const oClassNames = classnames(
    className,
    'slds-text-title--caps slds-truncate',
    {
      'slds-is-sortable': sortable,
      'slds-is-resizable': resizable,
      'slds-is-sorted': sorted,
      [`slds-text-align--${align}`]: align,
    }
  );

  const style = { minWidth: width || 'auto' };

  const icon = sortDir === 'DESC' ? 'arrowdown' : 'arrowup';

  return (
    <th {...pprops} className={oClassNames} scope='col' style={style}>
      {sortable ? (
        <a
          onClick={(e) => {
            e.preventDefault();
            if (onSort) {
              onSort();
            }
          }}
          className='slds-th__action slds-text-link--reset'
        >
          <span className='slds-assistive-text'>Sort </span>
          <span className='slds-truncate'>{children}</span>
          <Icon
            className='slds-is-sortable__icon'
            textColor='default'
            container
            size='x-small'
            category='utility'
            icon={icon}
            style={{ position: 'absolute' }}
          />
          <span
            className='slds-assistive-text'
            aria-live='assertive'
            aria-atomic='true'
          />
        </a>
      ) : (
        children
      )}
    </th>
  );
};

export type TableRowColumnProps = {
  className?: string;
  truncate?: boolean;
} & AllHTMLAttributes<HTMLTableDataCellElement>;

export const TableRowColumn: React.FC<TableRowColumnProps> = (props) => {
  const { truncate = true, className, children, ...pprops } = props;
  const oClassNames = classnames(className, {
    'slds-truncate': truncate,
  });
  const style: CSSProperties = {};
  if (!truncate) style.position = 'static';

  return (
    <td role='gridcell' style={style} className={oClassNames} {...pprops}>
      {children}
    </td>
  );
};

export const TableRowColumnActions: React.FC = (props) => (
  <TableRowColumn
    className='slds-cell-shrink'
    data-label='Actions'
    truncate={false}
    width={50}
    style={{ position: 'static' }}
  >
    {props.children}
  </TableRowColumn>
);

export type TableProps = {
  wrapperStyle?: object;
  className?: string;
  bordered?: boolean;
  verticalBorders?: boolean;
  noRowHover?: boolean;
  striped?: boolean;
  fixedLayout?: boolean;
  sortable?: boolean;
  autoWidth?: boolean;
} & TableHTMLAttributes<HTMLTableElement>;

class Table extends Component<TableProps> {
  onScroll() {
    const elements = document.getElementsByClassName(
      'react-slds-dropdown-opened'
    );
    if (elements.length) (elements[0].childNodes[0] as any).blur();
  }

  renderTableHeader(base: any) {
    const { sortable } = this.props;
    return React.cloneElement(base, { sortable });
  }

  renderTableBody(base: any) {
    return base;
  }

  render() {
    const {
      className,
      bordered,
      verticalBorders,
      noRowHover,
      striped,
      fixedLayout,
      children,
      autoWidth,
      wrapperStyle,
      ...pprops
    } = this.props;
    delete pprops.sortable;

    const tableClassNames = classnames(
      className,
      'slds-table slds-table--cell-buffer',
      {
        'slds-table--bordered': bordered,
        'slds-no-row-hover': noRowHover,
        'slds-table--striped': striped,
        'slds-table--fixed-layout': fixedLayout,
        'slds-table--col-bordered': verticalBorders,
      }
    );

    const wrapStyle = Object.assign(
      {
        overflowY: 'hidden',
        overflowX: 'auto',
      },
      wrapperStyle
    );

    const style: CSSProperties = {};
    if (autoWidth) style.width = 'auto';

    let tBody;
    let tHead;

    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;
      if (child.type === TableHeader) {
        tHead = this.renderTableHeader(child);
      } else if (child.type === TableBody) {
        tBody = this.renderTableBody(child);
      }
    });

    return (
      <div>
        <div style={wrapStyle} onScroll={this.onScroll.bind(this)}>
          <table className={tableClassNames} style={style} {...pprops}>
            {tHead}
            {tBody}
          </table>
        </div>
      </div>
    );
  }
}

export default Table;
