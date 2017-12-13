import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from './Icon';

export class TableHeader extends Component {
  renderBaseHeaderRow() {
    const { children, sortable, hasActions, actionsPosition } = this.props;
    let nextChildren = [];

    const props = {
      className: 'slds-text-title--caps',
    };

    React.Children.forEach(children.props.children, (child, index) => {
      const childSortable = child.props.sortable;
      nextChildren.push(React.cloneElement(child, {
        key: index,
        sortable: typeof childSortable === 'undefined' ? sortable : childSortable,
      }));
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

    return React.cloneElement(children, props, nextChildren);
  }

  render() {
    return (
      <thead>
        { this.renderBaseHeaderRow() }
      </thead>
    );
  }
}

TableHeader.propTypes = {
  hasActions: PropTypes.bool,
  actionsPosition: PropTypes.number,
  children: PropTypes.node,
  sortable: PropTypes.bool,
};

TableHeader.defaultProps = {
  actionsPosition: 0,
};

export class TableBody extends Component {
  renderRows() {
    return React.Children.map(this.props.children, (child) => {
      const children = [];

      React.Children.forEach(child.props.children, (innerChild, index) => {
        if (!React.isValidElement(innerChild)) return;
        const { truncate } = innerChild.props;
        const props = {
          key: index,
        };
        if (typeof truncate !== 'undefined') props.truncate = truncate;
        children.push(React.cloneElement(innerChild, props));
      });

      return React.cloneElement(child, { className: 'slds-hint-parent' }, children);
    });
  }

  render() {
    return (
      <tbody>
        { this.renderRows() }
      </tbody>
    );
  }
}

TableBody.propTypes = {
  children: PropTypes.node,
};

export const TableRow = ({ selected, ...props }) => {
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

TableRow.propTypes = {
  selected: PropTypes.bool,
  children: PropTypes.node,
  /* eslint-disable react/forbid-prop-types */
  style: PropTypes.object,
};

export const TableHeaderColumn = (props) => {
  const {
    sortable, resizable, children, className, width, sortDir, onSort, sorted, align, ...pprops
  } = props;
  const oClassNames = classnames(className,
    'slds-text-title--caps slds-truncate', {
      'slds-is-sortable': sortable,
      'slds-is-resizable': resizable,
      'slds-is-sorted': sorted,
      [`slds-text-align--${align}`]: align,
    });

  const style = { minWidth: width || 'auto' };

  const icon = sortDir === 'DESC' ? 'arrowdown' : 'arrowup';

  return (
    <th
      {...pprops}
      className={oClassNames}
      scope='col'
      style={style}
    >
      {sortable ?
        <a
          onClick={(e) => { e.preventDefault(); onSort(); } }
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
          <span className='slds-assistive-text' aria-live='assertive' aria-atomic='true' />
        </a>
        : children
      }
    </th>
  );
};

TableHeaderColumn.propTypes = {
  className: PropTypes.string,
  onSort: PropTypes.func,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  sortable: PropTypes.bool,
  resizable: PropTypes.bool,
  sortDir: PropTypes.string,
  sorted: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  children: PropTypes.node,
};

export const TableRowColumn = (props) => {
  const { truncate, className, children, ...pprops } = props;
  const oClassNames = classnames(className, {
    'slds-truncate': truncate,
  });
  const style = {};
  if (!truncate) style.position = 'static';

  return (
    <td
      role='gridcell'
      style={style}
      className={oClassNames}
      {...pprops}
    >{children}</td>
  );
};

TableRowColumn.propTypes = {
  className: PropTypes.string,
  truncate: PropTypes.bool,
  children: PropTypes.node,
};

TableRowColumn.defaultProps = {
  truncate: true,
};

export const TableRowColumnActions = props => (
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

TableRowColumnActions.propTypes = {
  children: PropTypes.node,
};

class Table extends Component {

  onScroll() {
    const elements = document.getElementsByClassName('react-slds-dropdown-opened');
    if (elements.length) elements[0].childNodes[0].blur();
  }

  renderTableHeader(base) {
    const { sortable } = this.props;
    return React.cloneElement(base, { sortable });
  }
  renderTableBody(base) {
    return base;
  }

  render() {
    const {
      className, bordered, verticalBorders, noRowHover, striped, fixedLayout,
      children, autoWidth, wrapperStyle, ...pprops
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

    const wrapStyle = Object.assign({
      overflowY: 'hidden',
      overflowX: 'auto',
    }, wrapperStyle);

    const style = {};
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
        <div style={ wrapStyle } onScroll={this.onScroll.bind(this)}>
          <table className={tableClassNames} style={style} {...pprops}>
            {tHead}
            {tBody}
          </table>
        </div>
      </div>
    );
  }
}

Table.propTypes = {
  wrapperStyle: PropTypes.object,
  className: PropTypes.string,
  bordered: PropTypes.bool,
  verticalBorders: PropTypes.bool,
  noRowHover: PropTypes.bool,
  striped: PropTypes.bool,
  fixedLayout: PropTypes.bool,
  sortable: PropTypes.bool,
  children: PropTypes.node,
  autoWidth: PropTypes.bool,
};

export default Table;
