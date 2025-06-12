import React, {
  CSSProperties,
  ThHTMLAttributes,
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  FC,
  createContext,
  useMemo,
  useContext,
  ReactNode,
} from 'react';
import classnames from 'classnames';
import { Icon } from './Icon';

/**
 *
 */
const TableRowContext = createContext<{
  header?: boolean;
  hasActions?: boolean;
  actionsPosition?: number;
  sortable?: boolean;
}>({});

const TableContext = createContext<{ sortable?: boolean }>({});

/**
 *
 */
export type TableHeaderProps = {
  hasActions?: boolean;
  actionsPosition?: number;
  sortable?: boolean;
  children?: ReactNode;
};

/**
 *
 */
export const TableHeader: FC<TableHeaderProps> = (props) => {
  const { hasActions, actionsPosition, sortable: sortable_, children } = props;
  const { sortable: tableSortable } = useContext(TableContext);
  const sortable = typeof sortable_ !== 'undefined' ? sortable_ : tableSortable;
  const ctx = useMemo(
    () => ({ header: true, hasActions, actionsPosition, sortable }),
    [hasActions, actionsPosition, sortable]
  );
  return (
    <thead>
      <TableRowContext.Provider value={ctx}>
        {children}
      </TableRowContext.Provider>
    </thead>
  );
};

/**
 *
 */
export const TableBody: FC<{ children?: ReactNode }> = ({ children }) => {
  const ctx = useMemo(() => ({}), []);
  return (
    <tbody>
      {React.Children.map(children, (child) => (
        <TableRowContext.Provider value={ctx}>{child}</TableRowContext.Provider>
      ))}
    </tbody>
  );
};

/**
 *
 */
export type TableRowProps = {
  selected?: boolean;
  style?: object;
} & HTMLAttributes<HTMLTableRowElement>;

/**
 *
 */
export const TableRow: FC<TableRowProps> = (props) => {
  const { className, selected, style: style_, children, ...rprops } = props;
  const {
    header,
    hasActions,
    actionsPosition = 0,
  } = useContext(TableRowContext);
  let newChildren = React.Children.toArray(children);
  if (header && hasActions) {
    newChildren = [
      ...newChildren.slice(0, actionsPosition),
      <TableHeaderColumn
        sortable={false}
        width={50}
        key={-1}
        className='slds-cell-shrink'
      />,
      ...newChildren.slice(actionsPosition),
    ];
  }
  const rowClassName = classnames(
    className,
    header ? 'slds-line-height_reset' : 'slds-hint-parent'
  );
  const style = selected
    ? {
        ...style_,
        backgroundColor: '#F8FCF5',
        borderLeft: '2px solid #7db450',
      }
    : style_;
  return (
    <tr {...rprops} className={rowClassName} style={style}>
      {newChildren}
    </tr>
  );
};

/**
 *
 */
export type TableHeaderColumnProps = {
  className?: string;
  width?: string | number;
  sortable?: boolean;
  resizable?: boolean;
  sortDir?: string;
  sorted?: boolean;
  align?: 'left' | 'center' | 'right';
  onSort?: () => void;
} & ThHTMLAttributes<HTMLTableCellElement>;

/**
 *
 */
export const TableHeaderColumn: FC<TableHeaderColumnProps> = (props) => {
  const {
    sortable: sortable_,
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
  const { sortable: rowSortable } = useContext(TableRowContext);
  const sortable = typeof sortable_ === 'undefined' ? rowSortable : sortable_;
  const oClassNames = classnames(
    className,
    {
      'slds-is-sortable': sortable,
      'slds-is-resizable': resizable,
      'slds-is-sorted': sorted,
    },
    align ? `slds-text-align_${align}` : undefined
  );

  const style = { minWidth: width || 'auto' };

  const icon = sortDir === 'DESC' ? 'arrowdown' : 'arrowup';

  const content = typeof children === 'string' ? children : undefined;
  const cellContent = (
    <div className='slds-truncate' title={content}>
      {children}
    </div>
  );

  return (
    <th {...pprops} className={oClassNames} style={style}>
      {sortable ? (
        <a
          onClick={(e) => {
            e.preventDefault();
            if (onSort) {
              onSort();
            }
          }}
          className='slds-th__action slds-text-link_reset'
        >
          <span className='slds-assistive-text'>Sort </span>
          {cellContent}
          <Icon
            container
            className='slds-is-sortable__icon'
            textColor='default'
            size='x-small'
            category='utility'
            icon={icon}
          />
        </a>
      ) : (
        cellContent
      )}
    </th>
  );
};

/**
 *
 */
export type TableRowColumnProps = {
  width?: string | number;
  truncate?: boolean;
} & TdHTMLAttributes<HTMLTableCellElement>;

/**
 *
 */
export const TableRowColumn: FC<TableRowColumnProps> = (props) => {
  const {
    truncate = true,
    className: oClassNames,
    width,
    children,
    ...pprops
  } = props;
  const style: CSSProperties = {};
  if (width !== undefined) style.width = width;
  if (!truncate) style.position = 'static';

  const content = typeof children === 'string' ? children : undefined;
  const cellContent = truncate ? (
    <div className='slds-truncate' title={content}>
      {children}
    </div>
  ) : (
    children
  );

  return (
    <td style={style} className={oClassNames} {...pprops}>
      {cellContent}
    </td>
  );
};

/**
 *
 */
export const TableRowColumnActions: FC<{ children?: ReactNode }> = (props) => (
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

/**
 *
 */
export type TableProps = {
  bordered?: boolean;
  verticalBorders?: boolean;
  noRowHover?: boolean;
  striped?: boolean;
  fixedLayout?: boolean;
  sortable?: boolean;
  autoWidth?: boolean;
} & TableHTMLAttributes<HTMLTableElement>;

/**
 *
 */
export const Table: FC<TableProps> = (props) => {
  const {
    className,
    bordered,
    verticalBorders,
    noRowHover,
    striped,
    fixedLayout,
    autoWidth,
    sortable,
    children,
    style: style_,
    ...rprops
  } = props;

  const tableClassNames = classnames(className, 'slds-table', {
    'slds-table_bordered': bordered,
    'slds-no-row-hover': noRowHover,
    'slds-table_striped': striped,
    'slds-table_fixed-layout': fixedLayout,
    'slds-table_resizable-cols': sortable,
    'slds-table_cell-buffer': !sortable,
    'slds-table_col-bordered': verticalBorders,
  });

  const style: CSSProperties = { ...style_ };
  if (autoWidth) {
    style.width = 'auto';
  }

  const ctx = useMemo(() => ({ sortable }), [sortable]);

  return (
    <table className={tableClassNames} style={style} {...rprops}>
      <TableContext.Provider value={ctx}>{children}</TableContext.Provider>
    </table>
  );
};
