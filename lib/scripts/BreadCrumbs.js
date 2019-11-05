"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BreadCrumbs = exports.Crumb = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var Crumb = function Crumb(_ref) {
  var className = _ref.className,
      href = _ref.href,
      children = _ref.children,
      props = (0, _objectWithoutProperties2.default)(_ref, ["className", "href", "children"]);
  var text = children;
  var cClassName = (0, _classnames.default)('slds-list__item slds-text-heading--label', className);
  return _react.default.createElement("li", (0, _extends2.default)({}, props, {
    className: cClassName
  }), _react.default.createElement("a", {
    href: href
  }, text));
};

exports.Crumb = Crumb;

var BreadCrumbs = function BreadCrumbs(_ref2) {
  var label = _ref2.label,
      className = _ref2.className,
      children = _ref2.children,
      props = (0, _objectWithoutProperties2.default)(_ref2, ["label", "className", "children"]);
  var oClassName = (0, _classnames.default)('slds-breadcrumb slds-list--horizontal', className);
  return _react.default.createElement("nav", (0, _extends2.default)({}, props, {
    role: "navigation"
  }), label ? _react.default.createElement("p", {
    id: "bread-crumb-label",
    className: "slds-assistive-text"
  }, label) : null, _react.default.createElement("ol", {
    className: oClassName,
    "aria-labelledby": "bread-crumb-label"
  }, children));
};

exports.BreadCrumbs = BreadCrumbs;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL0JyZWFkQ3J1bWJzLnRzeCJdLCJuYW1lcyI6WyJDcnVtYiIsImNsYXNzTmFtZSIsImhyZWYiLCJjaGlsZHJlbiIsInByb3BzIiwidGV4dCIsImNDbGFzc05hbWUiLCJCcmVhZENydW1icyIsImxhYmVsIiwib0NsYXNzTmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQU9PLElBQU1BLEtBQTJCLEdBQUcsU0FBOUJBLEtBQThCLE9BS3JDO0FBQUEsTUFKSkMsU0FJSSxRQUpKQSxTQUlJO0FBQUEsTUFISkMsSUFHSSxRQUhKQSxJQUdJO0FBQUEsTUFGSkMsUUFFSSxRQUZKQSxRQUVJO0FBQUEsTUFEREMsS0FDQztBQUNKLE1BQU1DLElBQUksR0FBR0YsUUFBYjtBQUNBLE1BQU1HLFVBQVUsR0FBRyx5QkFDakIsMENBRGlCLEVBRWpCTCxTQUZpQixDQUFuQjtBQUtBLFNBQ0UsOERBQVFHLEtBQVI7QUFBZSxJQUFBLFNBQVMsRUFBRUU7QUFBMUIsTUFDRTtBQUFHLElBQUEsSUFBSSxFQUFFSjtBQUFULEtBQWdCRyxJQUFoQixDQURGLENBREY7QUFLRCxDQWpCTTs7OztBQXdCQSxJQUFNRSxXQUF1QyxHQUFHLFNBQTFDQSxXQUEwQyxRQUtqRDtBQUFBLE1BSkpDLEtBSUksU0FKSkEsS0FJSTtBQUFBLE1BSEpQLFNBR0ksU0FISkEsU0FHSTtBQUFBLE1BRkpFLFFBRUksU0FGSkEsUUFFSTtBQUFBLE1BRERDLEtBQ0M7QUFDSixNQUFNSyxVQUFVLEdBQUcseUJBQ2pCLHVDQURpQixFQUVqQlIsU0FGaUIsQ0FBbkI7QUFLQSxTQUNFLCtEQUFTRyxLQUFUO0FBQWdCLElBQUEsSUFBSSxFQUFDO0FBQXJCLE1BQ0dJLEtBQUssR0FDSjtBQUFHLElBQUEsRUFBRSxFQUFDLG1CQUFOO0FBQTBCLElBQUEsU0FBUyxFQUFDO0FBQXBDLEtBQ0dBLEtBREgsQ0FESSxHQUlGLElBTE4sRUFNRTtBQUFJLElBQUEsU0FBUyxFQUFFQyxVQUFmO0FBQTJCLHVCQUFnQjtBQUEzQyxLQUNHTixRQURILENBTkYsQ0FERjtBQVlELENBdkJNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IEhUTUxBdHRyaWJ1dGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmV4cG9ydCB0eXBlIENydW1iUHJvcHMgPSB7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgaHJlZj86IHN0cmluZztcbn0gJiBIVE1MQXR0cmlidXRlczxIVE1MTElFbGVtZW50PjtcblxuZXhwb3J0IGNvbnN0IENydW1iOiBSZWFjdC5GQzxDcnVtYlByb3BzPiA9ICh7XG4gIGNsYXNzTmFtZSxcbiAgaHJlZixcbiAgY2hpbGRyZW4sXG4gIC4uLnByb3BzXG59KSA9PiB7XG4gIGNvbnN0IHRleHQgPSBjaGlsZHJlbjtcbiAgY29uc3QgY0NsYXNzTmFtZSA9IGNsYXNzbmFtZXMoXG4gICAgJ3NsZHMtbGlzdF9faXRlbSBzbGRzLXRleHQtaGVhZGluZy0tbGFiZWwnLFxuICAgIGNsYXNzTmFtZVxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGxpIHsuLi5wcm9wc30gY2xhc3NOYW1lPXtjQ2xhc3NOYW1lfT5cbiAgICAgIDxhIGhyZWY9e2hyZWZ9Pnt0ZXh0fTwvYT5cbiAgICA8L2xpPlxuICApO1xufTtcblxuZXhwb3J0IHR5cGUgQnJlYWRDcnVtYnNQcm9wcyA9IHtcbiAgbGFiZWw/OiBzdHJpbmc7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbn0gJiBIVE1MQXR0cmlidXRlczxIVE1MRWxlbWVudD47XG5cbmV4cG9ydCBjb25zdCBCcmVhZENydW1iczogUmVhY3QuRkM8QnJlYWRDcnVtYnNQcm9wcz4gPSAoe1xuICBsYWJlbCxcbiAgY2xhc3NOYW1lLFxuICBjaGlsZHJlbixcbiAgLi4ucHJvcHNcbn0pID0+IHtcbiAgY29uc3Qgb0NsYXNzTmFtZSA9IGNsYXNzbmFtZXMoXG4gICAgJ3NsZHMtYnJlYWRjcnVtYiBzbGRzLWxpc3QtLWhvcml6b250YWwnLFxuICAgIGNsYXNzTmFtZVxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPG5hdiB7Li4ucHJvcHN9IHJvbGU9J25hdmlnYXRpb24nPlxuICAgICAge2xhYmVsID8gKFxuICAgICAgICA8cCBpZD0nYnJlYWQtY3J1bWItbGFiZWwnIGNsYXNzTmFtZT0nc2xkcy1hc3Npc3RpdmUtdGV4dCc+XG4gICAgICAgICAge2xhYmVsfVxuICAgICAgICA8L3A+XG4gICAgICApIDogbnVsbH1cbiAgICAgIDxvbCBjbGFzc05hbWU9e29DbGFzc05hbWV9IGFyaWEtbGFiZWxsZWRieT0nYnJlYWQtY3J1bWItbGFiZWwnPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L29sPlxuICAgIDwvbmF2PlxuICApO1xufTtcbiJdfQ==