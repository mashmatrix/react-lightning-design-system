import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Grid extends Component {
  render() {
    const { className, frame, children, ...props } = this.props;
    const gridClassNames = classnames(
      className, 'slds-grid', 'slds-grid--vertical',
      frame ? 'slds-grid--frame' : null
    );
    return (
      <div className={ gridClassNames } { ...props }>
        { children }
      </div>
    );
  }
}

Grid.propTypes = {
  className: PropTypes.string,
  frame: PropTypes.bool,
};

export class Row extends Component {
  render() {
    const {
      className, align, nowrap, nowrapSmall, nowrapMedium, nowrapLarge,
      cols, colsSmall, colsMedium, colsLarge,
      children, ...props
    } = this.props;
    const rowClassNames = classnames(
      className, 'slds-grid',
      align ? `slds-grid--align-${align}` : null,
      nowrap ? `slds-nowrap` : 'slds-wrap',
      nowrapSmall ? 'slds-nowrap--small' : null,
      nowrapMedium ? 'slds-nowrap--medium' : null,
      nowrapLarge ? 'slds-nowrap--large' : null
    );
    const totalCols = cols || (() => {
      let cnt = 0;
      React.Children.forEach(children, (child) => cnt += child.props.cols || 1);
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

  renderColumn(colProps, child) {
    if (child.type !== Col) {
      return <Col { ...colProps }>{ child }</Col>;
    } else {
      const childProps = Object.keys(colProps).reduce((cprops, key) => {
        cprops[key] = child.props[key] || colProps[key];
        return cprops;
      }, {});
      return React.cloneElement(child, childProps);
    }
  }
}

const ROW_ALIGNS = [
  'center',
  'space',
  'speard',
];

Row.propTypes = {
  className: PropTypes.string,
  align: PropTypes.oneOf(ROW_ALIGNS),
  nowrap: PropTypes.bool,
  nowrapSmall: PropTypes.bool,
  nowrapMedium: PropTypes.bool,
  nowrapLarge: PropTypes.bool,
  cols: PropTypes.number,
  colsSmall: PropTypes.number,
  colsMedium: PropTypes.number,
  colsLarge: PropTypes.number,
};


function adjustCols(colNum, large) {
  if (colNum > 6) {
    return large ? 12 : 6;
  }
  return colNum;
}

export class Col extends Component {
  render() {
    const {
      className, padded, align, noFlex,
      order, orderSmall, orderMedium, orderLarge,
      cols, colsSmall, colsMedium, colsLarge,
      totalCols, totalColsSmall, totalColsMedium, totalColsLarge,
      children, ...props
    } = this.props;
    const rowClassNames = classnames(
      className,
      padded ?
        `slds-col--padded${/^(medium|large)$/.test(padded) ? '-' + padded : ''}` :
        'slds-col',
      align ? `slds-align-${align}` : null,
      noFlex ? 'slds-no-flex' : null,
      order ? `slds-order--${order}` : null,
      orderSmall ? `slds-small-order--${orderSmall}` : null,
      orderMedium ? `slds-medium-order--${orderMedium}` : null,
      orderLarge ? `slds-large-order--${orderLarge}` : null,
      cols && totalCols ? `slds-size--${cols}-of-${adjustCols(totalCols, true)}` : null,
      colsSmall && totalColsSmall ? `slds-small-size--${colsSmall}-of-${adjustCols(totalColsSmall)}` : null,
      colsMedium && totalColsMedium ? `slds-medium-size--${colsMedium}-of-${adjustCols(totalColsMedium)}` : null,
      colsLarge && totalColsMedium ? `slds-large-size--${colsLarge}-of-${adjustCols(totalColsLarge, true)}` : null
    );
    return (
      <div className={ rowClassNames } { ...props }>
        { children }
      </div>
    );
  }
}

const COL_ALIGNS = [
  'top',
  'medium',
  'bottom',
];

Col.propTypes = {
  className: PropTypes.string,
  padded: PropTypes.oneOfType(
    PropTypes.bool,
    PropTypes.string
  ),
  align: PropTypes.oneOf(COL_ALIGNS),
  nowrap: PropTypes.bool,
  cols: PropTypes.number,
  colsSmall: PropTypes.number,
  colsMedium: PropTypes.number,
  colsLarge: PropTypes.number,
};


export default Grid;
