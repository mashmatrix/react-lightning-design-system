"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Row = exports.Col = exports.Grid = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var Grid = function Grid(_ref) {
  var className = _ref.className,
      frame = _ref.frame,
      vertical = _ref.vertical,
      children = _ref.children,
      tag = _ref.tag,
      props = (0, _objectWithoutProperties2.default)(_ref, ["className", "frame", "vertical", "children", "tag"]);
  var gridClassNames = (0, _classnames.default)(className, 'slds-grid', vertical ? 'slds-grid--vertical' : null, frame ? 'slds-grid--frame' : null);
  var Tag = tag || 'div';
  return _react.default.createElement(Tag, (0, _extends2.default)({
    className: gridClassNames
  }, props), children);
};

exports.Grid = Grid;
Grid.defaultProps = {
  vertical: true
};

function adjustCols(colNum, large) {
  if (colNum > 6) {
    return large ? 12 : 6;
  }

  return colNum;
}

var Col = function Col(props) {
  var className = props.className,
      padded = props.padded,
      align = props.align,
      noFlex = props.noFlex,
      order = props.order,
      orderSmall = props.orderSmall,
      orderMedium = props.orderMedium,
      orderLarge = props.orderLarge,
      cols = props.cols,
      colsSmall = props.colsSmall,
      colsMedium = props.colsMedium,
      colsLarge = props.colsLarge,
      totalCols = props.totalCols,
      totalColsSmall = props.totalColsSmall,
      totalColsMedium = props.totalColsMedium,
      totalColsLarge = props.totalColsLarge,
      children = props.children,
      pprops = (0, _objectWithoutProperties2.default)(props, ["className", "padded", "align", "noFlex", "order", "orderSmall", "orderMedium", "orderLarge", "cols", "colsSmall", "colsMedium", "colsLarge", "totalCols", "totalColsSmall", "totalColsMedium", "totalColsLarge", "children"]);
  var rowClassNames = (0, _classnames.default)(className, padded ? "slds-col--padded".concat(typeof padded === 'string' && /^(medium|large)$/.test(padded) ? "-".concat(padded) : '') : 'slds-col', align ? "slds-align-".concat(align) : null, noFlex ? 'slds-no-flex' : null, order ? "slds-order--".concat(order) : null, orderSmall ? "slds-small-order--".concat(orderSmall) : null, orderMedium ? "slds-medium-order--".concat(orderMedium) : null, orderLarge ? "slds-large-order--".concat(orderLarge) : null, cols && totalCols ? "slds-size--".concat(cols, "-of-").concat(adjustCols(totalCols, true)) : null, colsSmall && totalColsSmall ? "slds-small-size--".concat(colsSmall, "-of-").concat(adjustCols(totalColsSmall)) : null, colsMedium && totalColsMedium ? "slds-medium-size--".concat(colsMedium, "-of-").concat(adjustCols(totalColsMedium)) : null, colsLarge && totalColsLarge ? "slds-large-size--".concat(colsLarge, "-of-").concat(adjustCols(totalColsLarge, true)) : null);
  return _react.default.createElement("div", (0, _extends2.default)({
    className: rowClassNames
  }, pprops), children);
};

exports.Col = Col;

var Row =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Row, _Component);

  function Row() {
    (0, _classCallCheck2.default)(this, Row);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Row).apply(this, arguments));
  }

  (0, _createClass2.default)(Row, [{
    key: "renderColumn",
    value: function renderColumn(colProps, child) {
      if (child.type !== Col) {
        return _react.default.createElement(Col, colProps, child);
      }
      /* eslint-disable no-param-reassign */


      var childProps = Object.keys(colProps).reduce(function (cprops, key) {
        cprops[key] = child.props[key] || colProps[key];
        return cprops;
      }, {});
      return _react.default.cloneElement(child, childProps);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          align = _this$props.align,
          nowrap = _this$props.nowrap,
          nowrapSmall = _this$props.nowrapSmall,
          nowrapMedium = _this$props.nowrapMedium,
          nowrapLarge = _this$props.nowrapLarge,
          cols = _this$props.cols,
          colsSmall = _this$props.colsSmall,
          colsMedium = _this$props.colsMedium,
          colsLarge = _this$props.colsLarge,
          pullPadded = _this$props.pullPadded,
          children = _this$props.children,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["className", "align", "nowrap", "nowrapSmall", "nowrapMedium", "nowrapLarge", "cols", "colsSmall", "colsMedium", "colsLarge", "pullPadded", "children"]);
      var rowClassNames = (0, _classnames.default)(className, 'slds-grid', align ? "slds-grid--align-".concat(align) : null, nowrap ? 'slds-nowrap' : 'slds-wrap', nowrapSmall ? 'slds-nowrap--small' : null, nowrapMedium ? 'slds-nowrap--medium' : null, nowrapLarge ? 'slds-nowrap--large' : null, pullPadded ? 'slds-grid--pull-padded' : null);

      var totalCols = cols || function () {
        var cnt = 0;

        _react.default.Children.forEach(children, function (child) {
          if (!_react.default.isValidElement(child)) return;
          cnt += child.props.cols || 1;
        });

        return cnt;
      }();

      var colProps = {
        totalCols: totalCols,
        totalColsSmall: colsSmall || totalCols,
        totalColsMedium: colsMedium || totalCols,
        totalColsLarge: colsLarge || totalCols
      };
      return _react.default.createElement("div", (0, _extends2.default)({
        className: rowClassNames
      }, props), _react.default.Children.map(children, this.renderColumn.bind(this, colProps)));
    }
  }]);
  return Row;
}(_react.Component);

exports.Row = Row;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL0dyaWQudHN4Il0sIm5hbWVzIjpbIkdyaWQiLCJjbGFzc05hbWUiLCJmcmFtZSIsInZlcnRpY2FsIiwiY2hpbGRyZW4iLCJ0YWciLCJwcm9wcyIsImdyaWRDbGFzc05hbWVzIiwiVGFnIiwiZGVmYXVsdFByb3BzIiwiYWRqdXN0Q29scyIsImNvbE51bSIsImxhcmdlIiwiQ29sIiwicGFkZGVkIiwiYWxpZ24iLCJub0ZsZXgiLCJvcmRlciIsIm9yZGVyU21hbGwiLCJvcmRlck1lZGl1bSIsIm9yZGVyTGFyZ2UiLCJjb2xzIiwiY29sc1NtYWxsIiwiY29sc01lZGl1bSIsImNvbHNMYXJnZSIsInRvdGFsQ29scyIsInRvdGFsQ29sc1NtYWxsIiwidG90YWxDb2xzTWVkaXVtIiwidG90YWxDb2xzTGFyZ2UiLCJwcHJvcHMiLCJyb3dDbGFzc05hbWVzIiwidGVzdCIsIlJvdyIsImNvbFByb3BzIiwiY2hpbGQiLCJ0eXBlIiwiY2hpbGRQcm9wcyIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJjcHJvcHMiLCJrZXkiLCJSZWFjdCIsImNsb25lRWxlbWVudCIsIm5vd3JhcCIsIm5vd3JhcFNtYWxsIiwibm93cmFwTWVkaXVtIiwibm93cmFwTGFyZ2UiLCJwdWxsUGFkZGVkIiwiY250IiwiQ2hpbGRyZW4iLCJmb3JFYWNoIiwiaXNWYWxpZEVsZW1lbnQiLCJtYXAiLCJyZW5kZXJDb2x1bW4iLCJiaW5kIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBU08sSUFBTUEsSUFBeUIsR0FBRyxTQUE1QkEsSUFBNEIsT0FPbkM7QUFBQSxNQU5KQyxTQU1JLFFBTkpBLFNBTUk7QUFBQSxNQUxKQyxLQUtJLFFBTEpBLEtBS0k7QUFBQSxNQUpKQyxRQUlJLFFBSkpBLFFBSUk7QUFBQSxNQUhKQyxRQUdJLFFBSEpBLFFBR0k7QUFBQSxNQUZKQyxHQUVJLFFBRkpBLEdBRUk7QUFB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LFNBQVMsRUFBVEEsU0FEZTtBQUVmQyxRQUFBQSxjQUFjLEVBQUVKLFNBQVMsSUFBSUcsU0FGZDtBQUdmRSxRQUFBQSxlQUFlLEVBQUVKLFVBQVUsSUFBSUUsU0FIaEI7QUFJZkcsUUFBQUEsY0FBYyxFQUFFSixTQUFTLElBQUlDO0FBSmQsT0FBakI7QUFNQSxhQUNFO0FBQUssUUFBQSxTQUFTLEVBQUVLO0FBQWhCLFNBQW1DeEIsS0FBbkMsR0FDR29DLGVBQU1RLFFBQU4sQ0FBZUcsR0FBZixDQUFtQmpELFFBQW5CLEVBQTZCLEtBQUtrRCxZQUFMLENBQWtCQyxJQUFsQixDQUF1QixJQUF2QixFQUE2QnRCLFFBQTdCLENBQTdCLENBREgsQ0FERjtBQUtEOzs7RUE3RHNCdUIsZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBSZWFjdEhUTUwgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuZXhwb3J0IHR5cGUgR3JpZFByb3BzID0ge1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIHRhZz86IGtleW9mIFJlYWN0SFRNTDtcbiAgZnJhbWU/OiBib29sZWFuO1xuICB2ZXJ0aWNhbD86IGJvb2xlYW47XG59ICYgUmVhY3QuSFRNTEF0dHJpYnV0ZXM8SFRNTEVsZW1lbnQ+O1xuXG5leHBvcnQgY29uc3QgR3JpZDogUmVhY3QuRkM8R3JpZFByb3BzPiA9ICh7XG4gIGNsYXNzTmFtZSxcbiAgZnJhbWUsXG4gIHZlcnRpY2FsLFxuICBjaGlsZHJlbixcbiAgdGFnLFxuICAuLi5wcm9wc1xufSkgPT4ge1xuICBjb25zdCBncmlkQ2xhc3NOYW1lcyA9IGNsYXNzbmFtZXMoXG4gICAgY2xhc3NOYW1lLFxuICAgICdzbGRzLWdyaWQnLFxuICAgIHZlcnRpY2FsID8gJ3NsZHMtZ3JpZC0tdmVydGljYWwnIDogbnVsbCxcbiAgICBmcmFtZSA/ICdzbGRzLWdyaWQtLWZyYW1lJyA6IG51bGxcbiAgKTtcbiAgY29uc3QgVGFnID0gdGFnIHx8ICdkaXYnO1xuICByZXR1cm4gKFxuICAgIDxUYWcgY2xhc3NOYW1lPXtncmlkQ2xhc3NOYW1lc30gey4uLnByb3BzfT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L1RhZz5cbiAgKTtcbn07XG5cbkdyaWQuZGVmYXVsdFByb3BzID0ge1xuICB2ZXJ0aWNhbDogdHJ1ZSxcbn07XG5cbmZ1bmN0aW9uIGFkanVzdENvbHMoY29sTnVtOiBudW1iZXIsIGxhcmdlPzogYm9vbGVhbikge1xuICBpZiAoY29sTnVtID4gNikge1xuICAgIHJldHVybiBsYXJnZSA/IDEyIDogNjtcbiAgfVxuICByZXR1cm4gY29sTnVtO1xufVxuXG5leHBvcnQgdHlwZSBDb2xQcm9wcyA9IHtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBwYWRkZWQ/OiBib29sZWFuIHwgJ21lZGl1bScgfCAnbGFyZ2UnO1xuICBhbGlnbj86ICd0b3AnIHwgJ21lZGl1bScgfCAnYm90dG9tJztcbiAgbm9GbGV4PzogYm9vbGVhbjtcbiAgb3JkZXI/OiBudW1iZXI7XG4gIG9yZGVyU21hbGw/OiBudW1iZXI7XG4gIG9yZGVyTWVkaXVtPzogbnVtYmVyO1xuICBvcmRlckxhcmdlPzogbnVtYmVyO1xuICBjb2xzPzogbnVtYmVyO1xuICBjb2xzU21hbGw/OiBudW1iZXI7XG4gIGNvbHNNZWRpdW0/OiBudW1iZXI7XG4gIGNvbHNMYXJnZT86IG51bWJlcjtcbiAgdG90YWxDb2xzPzogbnVtYmVyO1xuICB0b3RhbENvbHNTbWFsbD86IG51bWJlcjtcbiAgdG90YWxDb2xzTWVkaXVtPzogbnVtYmVyO1xuICB0b3RhbENvbHNMYXJnZT86IG51bWJlcjtcbn0gJiBSZWFjdC5IVE1MQXR0cmlidXRlczxIVE1MRGl2RWxlbWVudD47XG5cbmV4cG9ydCBjb25zdCBDb2w6IFJlYWN0LkZDPENvbFByb3BzPiA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7XG4gICAgY2xhc3NOYW1lLFxuICAgIHBhZGRlZCxcbiAgICBhbGlnbixcbiAgICBub0ZsZXgsXG4gICAgb3JkZXIsXG4gICAgb3JkZXJTbWFsbCxcbiAgICBvcmRlck1lZGl1bSxcbiAgICBvcmRlckxhcmdlLFxuICAgIGNvbHMsXG4gICAgY29sc1NtYWxsLFxuICAgIGNvbHNNZWRpdW0sXG4gICAgY29sc0xhcmdlLFxuICAgIHRvdGFsQ29scyxcbiAgICB0b3RhbENvbHNTbWFsbCxcbiAgICB0b3RhbENvbHNNZWRpdW0sXG4gICAgdG90YWxDb2xzTGFyZ2UsXG4gICAgY2hpbGRyZW4sXG4gICAgLi4ucHByb3BzXG4gIH0gPSBwcm9wcztcbiAgY29uc3Qgcm93Q2xhc3NOYW1lcyA9IGNsYXNzbmFtZXMoXG4gICAgY2xhc3NOYW1lLFxuICAgIHBhZGRlZFxuICAgICAgPyBgc2xkcy1jb2wtLXBhZGRlZCR7XG4gICAgICAgICAgdHlwZW9mIHBhZGRlZCA9PT0gJ3N0cmluZycgJiYgL14obWVkaXVtfGxhcmdlKSQvLnRlc3QocGFkZGVkKVxuICAgICAgICAgICAgPyBgLSR7cGFkZGVkfWBcbiAgICAgICAgICAgIDogJydcbiAgICAgICAgfWBcbiAgICAgIDogJ3NsZHMtY29sJyxcbiAgICBhbGlnbiA/IGBzbGRzLWFsaWduLSR7YWxpZ259YCA6IG51bGwsXG4gICAgbm9GbGV4ID8gJ3NsZHMtbm8tZmxleCcgOiBudWxsLFxuICAgIG9yZGVyID8gYHNsZHMtb3JkZXItLSR7b3JkZXJ9YCA6IG51bGwsXG4gICAgb3JkZXJTbWFsbCA/IGBzbGRzLXNtYWxsLW9yZGVyLS0ke29yZGVyU21hbGx9YCA6IG51bGwsXG4gICAgb3JkZXJNZWRpdW0gPyBgc2xkcy1tZWRpdW0tb3JkZXItLSR7b3JkZXJNZWRpdW19YCA6IG51bGwsXG4gICAgb3JkZXJMYXJnZSA/IGBzbGRzLWxhcmdlLW9yZGVyLS0ke29yZGVyTGFyZ2V9YCA6IG51bGwsXG4gICAgY29scyAmJiB0b3RhbENvbHNcbiAgICAgID8gYHNsZHMtc2l6ZS0tJHtjb2xzfS1vZi0ke2FkanVzdENvbHModG90YWxDb2xzLCB0cnVlKX1gXG4gICAgICA6IG51bGwsXG4gICAgY29sc1NtYWxsICYmIHRvdGFsQ29sc1NtYWxsXG4gICAgICA/IGBzbGRzLXNtYWxsLXNpemUtLSR7Y29sc1NtYWxsfS1vZi0ke2FkanVzdENvbHModG90YWxDb2xzU21hbGwpfWBcbiAgICAgIDogbnVsbCxcbiAgICBjb2xzTWVkaXVtICYmIHRvdGFsQ29sc01lZGl1bVxuICAgICAgPyBgc2xkcy1tZWRpdW0tc2l6ZS0tJHtjb2xzTWVkaXVtfS1vZi0ke2FkanVzdENvbHModG90YWxDb2xzTWVkaXVtKX1gXG4gICAgICA6IG51bGwsXG4gICAgY29sc0xhcmdlICYmIHRvdGFsQ29sc0xhcmdlXG4gICAgICA/IGBzbGRzLWxhcmdlLXNpemUtLSR7Y29sc0xhcmdlfS1vZi0ke2FkanVzdENvbHModG90YWxDb2xzTGFyZ2UsIHRydWUpfWBcbiAgICAgIDogbnVsbFxuICApO1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtyb3dDbGFzc05hbWVzfSB7Li4ucHByb3BzfT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCB0eXBlIFJvd1Byb3BzID0ge1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGFsaWduPzogJ2NlbnRlcicgfCAnc3BhY2UnIHwgJ3NwcmVhZCc7XG4gIG5vd3JhcD86IGJvb2xlYW47XG4gIG5vd3JhcFNtYWxsPzogYm9vbGVhbjtcbiAgbm93cmFwTWVkaXVtPzogYm9vbGVhbjtcbiAgbm93cmFwTGFyZ2U/OiBib29sZWFuO1xuICBwdWxsUGFkZGVkPzogYm9vbGVhbjtcbiAgY29scz86IG51bWJlcjtcbiAgY29sc1NtYWxsPzogbnVtYmVyO1xuICBjb2xzTWVkaXVtPzogbnVtYmVyO1xuICBjb2xzTGFyZ2U/OiBudW1iZXI7XG59ICYgUmVhY3QuSFRNTEF0dHJpYnV0ZXM8SFRNTERpdkVsZW1lbnQ+O1xuXG5leHBvcnQgY2xhc3MgUm93IGV4dGVuZHMgQ29tcG9uZW50PFJvd1Byb3BzPiB7XG4gIHJlbmRlckNvbHVtbihjb2xQcm9wczogYW55LCBjaGlsZDogYW55KSB7XG4gICAgaWYgKGNoaWxkLnR5cGUgIT09IENvbCkge1xuICAgICAgcmV0dXJuIDxDb2wgey4uLmNvbFByb3BzfT57Y2hpbGR9PC9Db2w+O1xuICAgIH1cblxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgY29uc3QgY2hpbGRQcm9wcyA9IE9iamVjdC5rZXlzKGNvbFByb3BzKS5yZWR1Y2UoKGNwcm9wczogYW55LCBrZXkpID0+IHtcbiAgICAgIGNwcm9wc1trZXldID0gY2hpbGQucHJvcHNba2V5XSB8fCBjb2xQcm9wc1trZXldO1xuICAgICAgcmV0dXJuIGNwcm9wcztcbiAgICB9LCB7fSk7XG4gICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwgY2hpbGRQcm9wcyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY2xhc3NOYW1lLFxuICAgICAgYWxpZ24sXG4gICAgICBub3dyYXAsXG4gICAgICBub3dyYXBTbWFsbCxcbiAgICAgIG5vd3JhcE1lZGl1bSxcbiAgICAgIG5vd3JhcExhcmdlLFxuICAgICAgY29scyxcbiAgICAgIGNvbHNTbWFsbCxcbiAgICAgIGNvbHNNZWRpdW0sXG4gICAgICBjb2xzTGFyZ2UsXG4gICAgICBwdWxsUGFkZGVkLFxuICAgICAgY2hpbGRyZW4sXG4gICAgICAuLi5wcm9wc1xuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHJvd0NsYXNzTmFtZXMgPSBjbGFzc25hbWVzKFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgJ3NsZHMtZ3JpZCcsXG4gICAgICBhbGlnbiA/IGBzbGRzLWdyaWQtLWFsaWduLSR7YWxpZ259YCA6IG51bGwsXG4gICAgICBub3dyYXAgPyAnc2xkcy1ub3dyYXAnIDogJ3NsZHMtd3JhcCcsXG4gICAgICBub3dyYXBTbWFsbCA/ICdzbGRzLW5vd3JhcC0tc21hbGwnIDogbnVsbCxcbiAgICAgIG5vd3JhcE1lZGl1bSA/ICdzbGRzLW5vd3JhcC0tbWVkaXVtJyA6IG51bGwsXG4gICAgICBub3dyYXBMYXJnZSA/ICdzbGRzLW5vd3JhcC0tbGFyZ2UnIDogbnVsbCxcbiAgICAgIHB1bGxQYWRkZWQgPyAnc2xkcy1ncmlkLS1wdWxsLXBhZGRlZCcgOiBudWxsXG4gICAgKTtcbiAgICBjb25zdCB0b3RhbENvbHMgPVxuICAgICAgY29scyB8fFxuICAgICAgKCgpID0+IHtcbiAgICAgICAgbGV0IGNudCA9IDA7XG4gICAgICAgIFJlYWN0LkNoaWxkcmVuLmZvckVhY2goY2hpbGRyZW4sIChjaGlsZCkgPT4ge1xuICAgICAgICAgIGlmICghUmVhY3QuaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSByZXR1cm47XG4gICAgICAgICAgY250ICs9IChjaGlsZCBhcyBhbnkpLnByb3BzLmNvbHMgfHwgMTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjbnQ7XG4gICAgICB9KSgpO1xuICAgIGNvbnN0IGNvbFByb3BzID0ge1xuICAgICAgdG90YWxDb2xzLFxuICAgICAgdG90YWxDb2xzU21hbGw6IGNvbHNTbWFsbCB8fCB0b3RhbENvbHMsXG4gICAgICB0b3RhbENvbHNNZWRpdW06IGNvbHNNZWRpdW0gfHwgdG90YWxDb2xzLFxuICAgICAgdG90YWxDb2xzTGFyZ2U6IGNvbHNMYXJnZSB8fCB0b3RhbENvbHMsXG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3Jvd0NsYXNzTmFtZXN9IHsuLi5wcm9wc30+XG4gICAgICAgIHtSZWFjdC5DaGlsZHJlbi5tYXAoY2hpbGRyZW4sIHRoaXMucmVuZGVyQ29sdW1uLmJpbmQodGhpcywgY29sUHJvcHMpKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==