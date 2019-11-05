"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Badge = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var Badge = function Badge(_ref) {
  var type = _ref.type,
      label = _ref.label,
      props = (0, _objectWithoutProperties2.default)(_ref, ["type", "label"]);
  var typeClassName = type ? "slds-theme--".concat(type) : null;
  var badgeClassNames = (0, _classnames.default)('slds-badge', typeClassName);
  return _react.default.createElement("span", (0, _extends2.default)({
    className: badgeClassNames
  }, props), label || props.children);
};

exports.Badge = Badge;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL0JhZGdlLnRzeCJdLCJuYW1lcyI6WyJCYWRnZSIsInR5cGUiLCJsYWJlbCIsInByb3BzIiwidHlwZUNsYXNzTmFtZSIsImJhZGdlQ2xhc3NOYW1lcyIsImNoaWxkcmVuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBT08sSUFBTUEsS0FBMkIsR0FBRyxTQUE5QkEsS0FBOEIsT0FBK0I7QUFBQSxNQUE1QkMsSUFBNEIsUUFBNUJBLElBQTRCO0FBQUEsTUFBdEJDLEtBQXNCLFFBQXRCQSxLQUFzQjtBQUFBLE1BQVpDLEtBQVk7QUFDeEUsTUFBTUMsYUFBYSxHQUFHSCxJQUFJLHlCQUFrQkEsSUFBbEIsSUFBMkIsSUFBckQ7QUFDQSxNQUFNSSxlQUFlLEdBQUcseUJBQVcsWUFBWCxFQUF5QkQsYUFBekIsQ0FBeEI7QUFDQSxTQUNFO0FBQU0sSUFBQSxTQUFTLEVBQUVDO0FBQWpCLEtBQXNDRixLQUF0QyxHQUNHRCxLQUFLLElBQUlDLEtBQUssQ0FBQ0csUUFEbEIsQ0FERjtBQUtELENBUk0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgSFRNTEF0dHJpYnV0ZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuZXhwb3J0IHR5cGUgQmFkZ2VQcm9wcyA9IHtcbiAgdHlwZT86ICdkZWZhdWx0JyB8ICdzaGFkZScgfCAnaW52ZXJzZSc7XG4gIGxhYmVsPzogc3RyaW5nO1xufSAmIEhUTUxBdHRyaWJ1dGVzPEhUTUxTcGFuRWxlbWVudD47XG5cbmV4cG9ydCBjb25zdCBCYWRnZTogUmVhY3QuRkM8QmFkZ2VQcm9wcz4gPSAoeyB0eXBlLCBsYWJlbCwgLi4ucHJvcHMgfSkgPT4ge1xuICBjb25zdCB0eXBlQ2xhc3NOYW1lID0gdHlwZSA/IGBzbGRzLXRoZW1lLS0ke3R5cGV9YCA6IG51bGw7XG4gIGNvbnN0IGJhZGdlQ2xhc3NOYW1lcyA9IGNsYXNzbmFtZXMoJ3NsZHMtYmFkZ2UnLCB0eXBlQ2xhc3NOYW1lKTtcbiAgcmV0dXJuIChcbiAgICA8c3BhbiBjbGFzc05hbWU9e2JhZGdlQ2xhc3NOYW1lc30gey4uLnByb3BzfT5cbiAgICAgIHtsYWJlbCB8fCBwcm9wcy5jaGlsZHJlbn1cbiAgICA8L3NwYW4+XG4gICk7XG59O1xuIl19