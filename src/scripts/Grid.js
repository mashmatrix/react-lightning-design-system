import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Grid = ({ className, frame, vertical, children, tag, ...props }) => {
  const gridClassNames = classnames(
    className, 'slds-grid',
    vertical ? 'slds-grid--vertical' : null,
    frame ? 'slds-grid--frame' : null
  );
  const Tag = tag || 'div';
  return (
    <Tag className={ gridClassNames } { ...props }>
      { children }
    </Tag>
  );
};

Grid.propTypes = {
  tag: PropTypes.string,
  className: PropTypes.string,
  frame: PropTypes.bool,
  children: PropTypes.node,
  vertical: PropTypes.bool,
};

Grid.defaultProps = {
  vertical: true,
};

function adjustCols(colNum, large) {
  if (colNum > 6) {
    return large ? 12 : 6;
  }
  return colNum;
}

export const Col = (props) => {
  const {
    className, padded, align, noFlex,
    order, orderSmall, orderMedium, orderLarge,
    cols, colsSmall, colsMedium, colsLarge,
    totalCols, totalColsSmall, totalColsMedium, totalColsLarge,
    children, ...pprops
  } = props;
  const rowClassNames = classnames(
    className,
    padded ?
      `slds-col--padded${/^(medium|large)$/.test(padded) ? `-${padded}` : ''}` :
      'slds-col',
    align ? `slds-align-${align}` : null,
    noFlex ? 'slds-no-flex' : null,
    order ? `slds-order--${order}` : null,
    orderSmall ? `slds-small-order--${orderSmall}` : null,
    orderMedium ? `slds-medium-order--${orderMedium}` : null,
    orderLarge ? `slds-large-order--${orderLarge}` : null,
    cols && totalCols ? `slds-size--${cols}-of-${adjustCols(totalCols, true)}` : null,
    colsSmall && totalColsSmall ?
      `slds-small-size--${colsSmall}-of-${adjustCols(totalColsSmall)}` : null,
    colsMedium && totalColsMedium ?
      `slds-medium-size--${colsMedium}-of-${adjustCols(totalColsMedium)}` : null,
    colsLarge && totalColsMedium ?
      `slds-large-size--${colsLarge}-of-${adjustCols(totalColsLarge, true)}` : null
  );
  return (
    <div className={ rowClassNames } { ...pprops }>
      { children }
    </div>
  );
};

const COL_ALIGNS = [
  'top',
  'medium',
  'bottom',
];

Col.propTypes = {
  className: PropTypes.string,
  padded: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  align: PropTypes.oneOf(COL_ALIGNS),
  noFlex: PropTypes.bool,
  order: PropTypes.number,
  orderSmall: PropTypes.number,
  orderMedium: PropTypes.number,
  orderLarge: PropTypes.number,
  cols: PropTypes.number,
  colsSmall: PropTypes.number,
  colsMedium: PropTypes.number,
  colsLarge: PropTypes.number,
  totalCols: PropTypes.number,
  totalColsSmall: PropTypes.number,
  totalColsMedium: PropTypes.number,
  totalColsLarge: PropTypes.number,
  children: PropTypes.node,
};

Grid.propTypes = {
  className: PropTypes.string,
  frame: PropTypes.bool,
  children: PropTypes.node,
};

export class Row extends Component {
  renderColumn(colProps, child) {
    if (child.type !== Col) {
      return <Col { ...colProps }>{ child }</Col>;
    }

    /* eslint-disable no-param-reassign */
    const childProps = Object.keys(colProps).reduce((cprops, key) => {
      cprops[key] = child.props[key] || colProps[key];
      return cprops;
    }, {});
    return React.cloneElement(child, childProps);
  }

  render() {
    const {
      className, align, nowrap, nowrapSmall, nowrapMedium, nowrapLarge,
      cols, colsSmall, colsMedium, colsLarge, pullPadded,
      children, ...props
    } = this.props;
    const rowClassNames = classnames(
      className, 'slds-grid',
      align ? `slds-grid--align-${align}` : null,
      nowrap ? 'slds-nowrap' : 'slds-wrap',
      nowrapSmall ? 'slds-nowrap--small' : null,
      nowrapMedium ? 'slds-nowrap--medium' : null,
      nowrapLarge ? 'slds-nowrap--large' : null,
      pullPadded ? 'slds-grid--pull-padded' : null
    );
    const totalCols = cols || (() => {
      let cnt = 0;
      React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return;
        cnt += child.props.cols || 1;
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
      <div className={ rowClassNames } { ...props }>
        { React.Children.map(children, this.renderColumn.bind(this, colProps)) }
      </div>
    );
  }
}

const ROW_ALIGNS = [
  'center',
  'space',
  'spread',
];

Row.propTypes = {
  className: PropTypes.string,
  align: PropTypes.oneOf(ROW_ALIGNS),
  nowrap: PropTypes.bool,
  nowrapSmall: PropTypes.bool,
  nowrapMedium: PropTypes.bool,
  nowrapLarge: PropTypes.bool,
  pullPadded: PropTypes.bool,
  cols: PropTypes.number,
  colsSmall: PropTypes.number,
  colsMedium: PropTypes.number,
  colsLarge: PropTypes.number,
  children: PropTypes.node,
};


export default Grid;
