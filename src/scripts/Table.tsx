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
export const TableBody: FC = ({ children }) => {
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
    header ? 'slds-text-title_caps' : 'slds-hint-parent'
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
} & ThHTMLAttributes<HTMLTableHeaderCellElement>;

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
    'slds-text-title_caps slds-truncate',
    {
      'slds-is-sortable': sortable,
      'slds-is-resizable': resizable,
      'slds-is-sorted': sorted,
    },
    align ? `slds-text-align_${align}` : undefined
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
          className='slds-th__action slds-text-link_reset'
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

/**
 *
 */
export type TableRowColumnProps = {
  width?: string | number;
  truncate?: boolean;
} & TdHTMLAttributes<HTMLTableDataCellElement>;

/**
 *
 */
export const TableRowColumn: FC<TableRowColumnProps> = (props) => {
  const { truncate = true, className, width, children, ...pprops } = props;
  const oClassNames = classnames(className, {
    'slds-truncate': truncate,
  });
  const style: CSSProperties = {};
  if (width !== undefined) style.width = width;
  if (!truncate) style.position = 'static';

  return (
    <td role='gridcell' style={style} className={oClassNames} {...pprops}>
      {children}
    </td>
  );
};

/**
 *
 */
export const TableRowColumnActions: FC = (props) => (
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

  const tableClassNames = classnames(
    className,
    'slds-table slds-table_cell-buffer',
    {
      'slds-table_bordered': bordered,
      'slds-no-row-hover': noRowHover,
      'slds-table_striped': striped,
      'slds-table_fixed-layout': fixedLayout,
      'slds-table_col-bordered': verticalBorders,
    }
  );

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
