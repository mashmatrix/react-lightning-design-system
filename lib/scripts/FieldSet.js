"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldSet = FieldSet;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _FormElement = require("./FormElement");

var _util = require("./util");

function FieldSet(_ref) {
  var className = _ref.className,
      label = _ref.label,
      children = _ref.children,
      props = (0, _objectWithoutProperties2.default)(_ref, ["className", "label", "children"]);
  var fsClassNames = (0, _classnames.default)(className, 'slds-form--compound');
  return _react.default.createElement("fieldset", (0, _extends2.default)({
    className: fsClassNames
  }, props), label ? _react.default.createElement("legend", {
    className: "slds-form-element__label"
  }, label) : null, _react.default.createElement("div", {
    className: "form-element__group"
  }, children));
}

FieldSet.isFormElement = true;

var Row =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Row, _Component);

  function Row() {
    (0, _classCallCheck2.default)(this, Row);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Row).apply(this, arguments));
  }

  (0, _createClass2.default)(Row, [{
    key: "renderChild",
    value: function renderChild(totalCols, child) {
      if (child && !child.type.isFormElement) {
        var _child$props$id = child.props.id,
            id = _child$props$id === void 0 ? "form-element-".concat((0, _util.uuid)()) : _child$props$id;
        var formElemProps = {
          id: id,
          totalCols: totalCols,
          cols: 1
        };
        return _react.default.createElement(_FormElement.FormElement, formElemProps, _react.default.cloneElement(child, {
          id: id
        }));
      }

      return _react.default.cloneElement(child, {
        totalCols: totalCols
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          cols = _this$props.cols,
          children = _this$props.children;

      var totalCols = cols || _react.default.Children.count(children);

      var rowClassNames = (0, _classnames.default)(className, 'slds-form-element__row');
      return _react.default.createElement("div", {
        className: rowClassNames
      }, _react.default.Children.map(children, this.renderChild.bind(this, totalCols)));
    }
  }]);
  return Row;
}(_react.Component);

(0, _defineProperty2.default)(Row, "isFormElement", true);
FieldSet.Row = Row;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL0ZpZWxkU2V0LnRzeCJdLCJuYW1lcyI6WyJGaWVsZFNldCIsImNsYXNzTmFtZSIsImxhYmVsIiwiY2hpbGRyZW4iLCJwcm9wcyIsImZzQ2xhc3NOYW1lcyIsImlzRm9ybUVsZW1lbnQiLCJSb3ciLCJ0b3RhbENvbHMiLCJjaGlsZCIsInR5cGUiLCJpZCIsImZvcm1FbGVtUHJvcHMiLCJjb2xzIiwiUmVhY3QiLCJjbG9uZUVsZW1lbnQiLCJDaGlsZHJlbiIsImNvdW50Iiwicm93Q2xhc3NOYW1lcyIsIm1hcCIsInJlbmRlckNoaWxkIiwiYmluZCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBUU8sU0FBU0EsUUFBVCxPQUtXO0FBQUEsTUFKaEJDLFNBSWdCLFFBSmhCQSxTQUlnQjtBQUFBLE1BSGhCQyxLQUdnQixRQUhoQkEsS0FHZ0I7QUFBQSxNQUZoQkMsUUFFZ0IsUUFGaEJBLFFBRWdCO0FBQUEsTUFEYkMsS0FDYTtBQUNoQixNQUFNQyxZQUFZLEdBQUcseUJBQVdKLFNBQVgsRUFBc0IscUJBQXRCLENBQXJCO0FBQ0EsU0FDRTtBQUFVLElBQUEsU0FBUyxFQUFFSTtBQUFyQixLQUF1Q0QsS0FBdkMsR0FDR0YsS0FBSyxHQUNKO0FBQVEsSUFBQSxTQUFTLEVBQUM7QUFBbEIsS0FBOENBLEtBQTlDLENBREksR0FFRixJQUhOLEVBSUU7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLEtBQXNDQyxRQUF0QyxDQUpGLENBREY7QUFRRDs7QUFFREgsUUFBUSxDQUFDTSxhQUFULEdBQXlCLElBQXpCOztJQU9NQyxHOzs7Ozs7Ozs7Ozs7Z0NBR1FDLFMsRUFBbUJDLEssRUFBWTtBQUN6QyxVQUFJQSxLQUFLLElBQUksQ0FBQ0EsS0FBSyxDQUFDQyxJQUFOLENBQVdKLGFBQXpCLEVBQXdDO0FBQUEsOEJBQ0lHLEtBQUssQ0FBQ0wsS0FEVixDQUM5Qk8sRUFEOEI7QUFBQSxZQUM5QkEsRUFEOEIsdURBQ1QsaUJBRFM7QUFFdEMsWUFBTUMsYUFBYSxHQUFHO0FBQUVELFVBQUFBLEVBQUUsRUFBRkEsRUFBRjtBQUFNSCxVQUFBQSxTQUFTLEVBQVRBLFNBQU47QUFBaUJLLFVBQUFBLElBQUksRUFBRTtBQUF2QixTQUF0QjtBQUNBLGVBQ0UsNkJBQUMsd0JBQUQsRUFBaUJELGFBQWpCLEVBQ0dFLGVBQU1DLFlBQU4sQ0FBbUJOLEtBQW5CLEVBQTBCO0FBQUVFLFVBQUFBLEVBQUUsRUFBRkE7QUFBRixTQUExQixDQURILENBREY7QUFLRDs7QUFDRCxhQUFPRyxlQUFNQyxZQUFOLENBQW1CTixLQUFuQixFQUEwQjtBQUFFRCxRQUFBQSxTQUFTLEVBQVRBO0FBQUYsT0FBMUIsQ0FBUDtBQUNEOzs7NkJBRVE7QUFBQSx3QkFDK0IsS0FBS0osS0FEcEM7QUFBQSxVQUNDSCxTQURELGVBQ0NBLFNBREQ7QUFBQSxVQUNZWSxJQURaLGVBQ1lBLElBRFo7QUFBQSxVQUNrQlYsUUFEbEIsZUFDa0JBLFFBRGxCOztBQUVQLFVBQU1LLFNBQVMsR0FBR0ssSUFBSSxJQUFJQyxlQUFNRSxRQUFOLENBQWVDLEtBQWYsQ0FBcUJkLFFBQXJCLENBQTFCOztBQUNBLFVBQU1lLGFBQWEsR0FBRyx5QkFBV2pCLFNBQVgsRUFBc0Isd0JBQXRCLENBQXRCO0FBQ0EsYUFDRTtBQUFLLFFBQUEsU0FBUyxFQUFFaUI7QUFBaEIsU0FDR0osZUFBTUUsUUFBTixDQUFlRyxHQUFmLENBQW1CaEIsUUFBbkIsRUFBNkIsS0FBS2lCLFdBQUwsQ0FBaUJDLElBQWpCLENBQXNCLElBQXRCLEVBQTRCYixTQUE1QixDQUE3QixDQURILENBREY7QUFLRDs7O0VBekJlYyxnQjs7OEJBQVpmLEcsbUJBQ21CLEk7QUEyQnpCUCxRQUFRLENBQUNPLEdBQVQsR0FBZUEsR0FBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IEZvcm1FbGVtZW50IH0gZnJvbSAnLi9Gb3JtRWxlbWVudCc7XG5pbXBvcnQgeyB1dWlkIH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IHR5cGUgRmllbGRTZXRQcm9wcyA9IHtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBsYWJlbD86IHN0cmluZztcbiAgY2hpbGRyZW4/OiBSZWFjdC5SZWFjdE5vZGU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gRmllbGRTZXQoe1xuICBjbGFzc05hbWUsXG4gIGxhYmVsLFxuICBjaGlsZHJlbixcbiAgLi4ucHJvcHNcbn06IEZpZWxkU2V0UHJvcHMpIHtcbiAgY29uc3QgZnNDbGFzc05hbWVzID0gY2xhc3NuYW1lcyhjbGFzc05hbWUsICdzbGRzLWZvcm0tLWNvbXBvdW5kJyk7XG4gIHJldHVybiAoXG4gICAgPGZpZWxkc2V0IGNsYXNzTmFtZT17ZnNDbGFzc05hbWVzfSB7Li4ucHJvcHN9PlxuICAgICAge2xhYmVsID8gKFxuICAgICAgICA8bGVnZW5kIGNsYXNzTmFtZT0nc2xkcy1mb3JtLWVsZW1lbnRfX2xhYmVsJz57bGFiZWx9PC9sZWdlbmQ+XG4gICAgICApIDogbnVsbH1cbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdmb3JtLWVsZW1lbnRfX2dyb3VwJz57Y2hpbGRyZW59PC9kaXY+XG4gICAgPC9maWVsZHNldD5cbiAgKTtcbn1cblxuRmllbGRTZXQuaXNGb3JtRWxlbWVudCA9IHRydWU7XG5cbnR5cGUgUm93UHJvcHMgPSB7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgY29scz86IG51bWJlcjtcbn07XG5cbmNsYXNzIFJvdyBleHRlbmRzIENvbXBvbmVudDxSb3dQcm9wcz4ge1xuICBzdGF0aWMgaXNGb3JtRWxlbWVudCA9IHRydWU7XG5cbiAgcmVuZGVyQ2hpbGQodG90YWxDb2xzOiBudW1iZXIsIGNoaWxkOiBhbnkpIHtcbiAgICBpZiAoY2hpbGQgJiYgIWNoaWxkLnR5cGUuaXNGb3JtRWxlbWVudCkge1xuICAgICAgY29uc3QgeyBpZCA9IGBmb3JtLWVsZW1lbnQtJHt1dWlkKCl9YCB9ID0gY2hpbGQucHJvcHM7XG4gICAgICBjb25zdCBmb3JtRWxlbVByb3BzID0geyBpZCwgdG90YWxDb2xzLCBjb2xzOiAxIH07XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Rm9ybUVsZW1lbnQgey4uLmZvcm1FbGVtUHJvcHN9PlxuICAgICAgICAgIHtSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHsgaWQgfSl9XG4gICAgICAgIDwvRm9ybUVsZW1lbnQ+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7IHRvdGFsQ29scyB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNsYXNzTmFtZSwgY29scywgY2hpbGRyZW4gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgdG90YWxDb2xzID0gY29scyB8fCBSZWFjdC5DaGlsZHJlbi5jb3VudChjaGlsZHJlbik7XG4gICAgY29uc3Qgcm93Q2xhc3NOYW1lcyA9IGNsYXNzbmFtZXMoY2xhc3NOYW1lLCAnc2xkcy1mb3JtLWVsZW1lbnRfX3JvdycpO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17cm93Q2xhc3NOYW1lc30+XG4gICAgICAgIHtSZWFjdC5DaGlsZHJlbi5tYXAoY2hpbGRyZW4sIHRoaXMucmVuZGVyQ2hpbGQuYmluZCh0aGlzLCB0b3RhbENvbHMpKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuRmllbGRTZXQuUm93ID0gUm93O1xuIl19