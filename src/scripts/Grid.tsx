import React, { Component, ReactHTML, HTMLAttributes } from 'react';
import classnames from 'classnames';

export type GridProps = {
  tag?: keyof ReactHTML;
  frame?: boolean;
  vertical?: boolean;
} & HTMLAttributes<HTMLElement>;

export const Grid: React.FC<GridProps> = ({
  className,
  frame,
  vertical,
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

Grid.defaultProps = {
  vertical: true,
};

function adjustCols(colNum: number, large?: boolean) {
  if (colNum > 6) {
    return large ? 12 : 6;
  }
  return colNum;
}

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
  totalCols?: number;
  totalColsSmall?: number;
  totalColsMedium?: number;
  totalColsLarge?: number;
} & HTMLAttributes<HTMLDivElement>;

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
    totalCols,
    totalColsSmall,
    totalColsMedium,
    totalColsLarge,
    children,
    ...pprops
  } = props;
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

export class Row extends Component<RowProps> {
  renderColumn(colProps: any, child: any) {
    if (child.type !== Col) {
      return <Col {...colProps}>{child}</Col>;
    }

    /* eslint-disable no-param-reassign */
    const childProps = Object.keys(colProps).reduce((cprops: any, key) => {
      cprops[key] = child.props[key] || colProps[key];
      return cprops;
    }, {});
    return React.cloneElement(child, childProps);
  }

  render() {
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
      ...props
    } = this.props;
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
          cnt += (child as any).props.cols || 1;
        });
        return cnt;
      })();
    const colProps = {
      totalCols,
      totalColsSmall: colsSmall || totalCols,
      totalColsMedium: colsMedium || totalCols,
      totalColsLarge: colsLarge || totalCols,
    };
    return (
      <div className={rowClassNames} {...props}>
        {React.Children.map(children, this.renderColumn.bind(this, colProps))}
      </div>
    );
  }
}
