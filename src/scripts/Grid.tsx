import React, {
  ReactHTML,
  HTMLAttributes,
  createContext,
  useContext,
  FC,
  useMemo,
} from 'react';
import classnames from 'classnames';

/**
 *
 */
export type GridProps = {
  tag?: keyof ReactHTML;
  frame?: boolean;
  vertical?: boolean;
} & HTMLAttributes<HTMLElement>;

/**
 *
 */
export const Grid: React.FC<GridProps> = ({
  className,
  frame,
  vertical = true,
  children,
  tag,
  ...props
}) => {
  const gridClassNames = classnames(
    className,
    'slds-grid',
    vertical ? 'slds-grid_vertical' : null,
    frame ? 'slds-grid_frame' : null
  );
  const Tag = tag || 'div';
  return (
    <Tag className={gridClassNames} {...props}>
      {children}
    </Tag>
  );
};

/**
 *
 */
const GridRowContext = createContext<{
  totalCols?: number;
  totalColsSmall?: number;
  totalColsMedium?: number;
  totalColsLarge?: number;
}>({});

/**
 *
 */
function adjustCols(colNum: number, large?: boolean) {
  if (colNum > 6) {
    return large ? 12 : 6;
  }
  return colNum;
}

/**
 *
 */
export type ColProps = {
  padded?: boolean | 'medium' | 'large';
  align?: 'top' | 'medium' | 'bottom';
  noFlex?: boolean;
  order?: number;
  orderSmall?: number;
  orderMedium?: number;
  orderLarge?: number;
  cols?: number;
  colsSmall?: number;
  colsMedium?: number;
  colsLarge?: number;
} & HTMLAttributes<HTMLDivElement>;

/**
 *
 */
export const Col: React.FC<ColProps> = (props) => {
  const {
    className,
    padded,
    align,
    noFlex,
    order,
    orderSmall,
    orderMedium,
    orderLarge,
    cols,
    colsSmall,
    colsMedium,
    colsLarge,
    children,
    ...pprops
  } = props;
  const { totalCols, totalColsSmall, totalColsMedium, totalColsLarge } =
    useContext(GridRowContext);
  const rowClassNames = classnames(
    className,
    padded
      ? `slds-col_padded${
          typeof padded === 'string' && /^(medium|large)$/.test(padded)
            ? `-${padded}`
            : ''
        }`
      : 'slds-col',
    align ? `slds-align-${align}` : null,
    noFlex ? 'slds-no-flex' : null,
    order ? `slds-order_${order}` : null,
    orderSmall ? `slds-small-order_${orderSmall}` : null,
    orderMedium ? `slds-medium-order_${orderMedium}` : null,
    orderLarge ? `slds-large-order_${orderLarge}` : null,
    cols && totalCols
      ? `slds-size_${cols}-of-${adjustCols(totalCols, true)}`
      : null,
    colsSmall && totalColsSmall
      ? `slds-small-size_${colsSmall}-of-${adjustCols(totalColsSmall)}`
      : null,
    colsMedium && totalColsMedium
      ? `slds-medium-size_${colsMedium}-of-${adjustCols(totalColsMedium)}`
      : null,
    colsLarge && totalColsLarge
      ? `slds-large-size_${colsLarge}-of-${adjustCols(totalColsLarge, true)}`
      : null
  );
  return (
    <div className={rowClassNames} {...pprops}>
      {children}
    </div>
  );
};

export type RowProps = {
  align?: 'center' | 'space' | 'spread';
  nowrap?: boolean;
  nowrapSmall?: boolean;
  nowrapMedium?: boolean;
  nowrapLarge?: boolean;
  pullPadded?: boolean;
  cols?: number;
  colsSmall?: number;
  colsMedium?: number;
  colsLarge?: number;
} & HTMLAttributes<HTMLDivElement>;

/**
 *
 */
export const Row: FC<RowProps> = (props) => {
  const {
    className,
    align,
    nowrap,
    nowrapSmall,
    nowrapMedium,
    nowrapLarge,
    cols,
    colsSmall,
    colsMedium,
    colsLarge,
    pullPadded,
    children,
    ...rprops
  } = props;
  const rowClassNames = classnames(
    className,
    'slds-grid',
    align ? `slds-grid_align-${align}` : null,
    nowrap ? 'slds-nowrap' : 'slds-wrap',
    nowrapSmall ? 'slds-nowrap_small' : null,
    nowrapMedium ? 'slds-nowrap_medium' : null,
    nowrapLarge ? 'slds-nowrap_large' : null,
    pullPadded ? 'slds-grid_pull-padded' : null
  );
  const totalCols =
    cols ||
    (() => {
      let cnt = 0;
      React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return;
        cnt += (child.props as { cols?: number }).cols || 1;
      });
      return cnt;
    })();
  const gridRowCtx = useMemo(
    () => ({
      totalCols,
      totalColsSmall: colsSmall || totalCols,
      totalColsMedium: colsMedium || totalCols,
      totalColsLarge: colsLarge || totalCols,
    }),
    [totalCols, colsSmall, colsMedium, colsLarge]
  );
  return (
    <GridRowContext.Provider value={gridRowCtx}>
      <div className={rowClassNames} {...rprops}>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child) || child.type !== Col) {
            return <Col>{child}</Col>;
          }
          return child;
        })}
      </div>
    </GridRowContext.Provider>
  );
};
