"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var Container = function Container(_ref) {
  var className = _ref.className,
      size = _ref.size,
      align = _ref.align,
      children = _ref.children,
      props = (0, _objectWithoutProperties2.default)(_ref, ["className", "size", "align", "children"]);
  var ctClassNames = (0, _classnames.default)(className, "slds-container--".concat(size || 'fluid'), align ? "slds-container--".concat(align) : null);
  return _react.default.createElement("div", (0, _extends2.default)({
    className: ctClassNames
  }, props), children);
};

exports.Container = Container;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL0NvbnRhaW5lci50c3giXSwibmFtZXMiOlsiQ29udGFpbmVyIiwiY2xhc3NOYW1lIiwic2l6ZSIsImFsaWduIiwiY2hpbGRyZW4iLCJwcm9wcyIsImN0Q2xhc3NOYW1lcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQVFPLElBQU1BLFNBQW1DLEdBQUcsU0FBdENBLFNBQXNDLE9BTTdDO0FBQUEsTUFMSkMsU0FLSSxRQUxKQSxTQUtJO0FBQUEsTUFKSkMsSUFJSSxRQUpKQSxJQUlJO0FBQUEsTUFISkMsS0FHSSxRQUhKQSxLQUdJO0FBQUEsTUFGSkMsUUFFSSxRQUZKQSxRQUVJO0FBQUEsTUFEREMsS0FDQztBQUNKLE1BQU1DLFlBQVksR0FBRyx5QkFDbkJMLFNBRG1CLDRCQUVBQyxJQUFJLElBQUksT0FGUixHQUduQkMsS0FBSyw2QkFBc0JBLEtBQXRCLElBQWdDLElBSGxCLENBQXJCO0FBS0EsU0FDRTtBQUFLLElBQUEsU0FBUyxFQUFFRztBQUFoQixLQUFrQ0QsS0FBbEMsR0FDR0QsUUFESCxDQURGO0FBS0QsQ0FqQk0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgSFRNTEF0dHJpYnV0ZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuZXhwb3J0IHR5cGUgQ29udGFpbmVyUHJvcHMgPSB7XG4gIGNsYXNzTmFtZTogc3RyaW5nO1xuICBzaXplOiAnc21hbGwnIHwgJ21lZGl1bScgfCAnbGFyZ2UnO1xuICBhbGlnbjogJ2xlZnQnIHwgJ2NlbnRlcicgfCAncmlnaHQnO1xufSAmIEhUTUxBdHRyaWJ1dGVzPEhUTUxEaXZFbGVtZW50PjtcblxuZXhwb3J0IGNvbnN0IENvbnRhaW5lcjogUmVhY3QuRkM8Q29udGFpbmVyUHJvcHM+ID0gKHtcbiAgY2xhc3NOYW1lLFxuICBzaXplLFxuICBhbGlnbixcbiAgY2hpbGRyZW4sXG4gIC4uLnByb3BzXG59KSA9PiB7XG4gIGNvbnN0IGN0Q2xhc3NOYW1lcyA9IGNsYXNzbmFtZXMoXG4gICAgY2xhc3NOYW1lLFxuICAgIGBzbGRzLWNvbnRhaW5lci0tJHtzaXplIHx8ICdmbHVpZCd9YCxcbiAgICBhbGlnbiA/IGBzbGRzLWNvbnRhaW5lci0tJHthbGlnbn1gIDogbnVsbFxuICApO1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjdENsYXNzTmFtZXN9IHsuLi5wcm9wc30+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl19