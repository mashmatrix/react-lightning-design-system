"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Text = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var Text = function Text(_ref) {
  var _classnames;

  var tag = _ref.tag,
      category = _ref.category,
      type = _ref.type,
      align = _ref.align,
      truncate = _ref.truncate,
      section = _ref.section,
      children = _ref.children,
      className = _ref.className,
      props = (0, _objectWithoutProperties2.default)(_ref, ["tag", "category", "type", "align", "truncate", "section", "children", "className"]);
  var textClassNames = (0, _classnames2.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "slds-text-".concat(category, "--").concat(type), type && category), (0, _defineProperty2.default)(_classnames, "slds-text-".concat(category), category && !type), (0, _defineProperty2.default)(_classnames, 'slds-truncate', truncate), (0, _defineProperty2.default)(_classnames, "slds-text-align--".concat(align), align), (0, _defineProperty2.default)(_classnames, 'slds-section-title--divider', section), _classnames), className);
  var Tag = tag || 'p';
  return _react.default.createElement(Tag, (0, _extends2.default)({}, props, {
    className: textClassNames
  }), children);
};

exports.Text = Text;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL1RleHQudHN4Il0sIm5hbWVzIjpbIlRleHQiLCJ0YWciLCJjYXRlZ29yeSIsInR5cGUiLCJhbGlnbiIsInRydW5jYXRlIiwic2VjdGlvbiIsImNoaWxkcmVuIiwiY2xhc3NOYW1lIiwicHJvcHMiLCJ0ZXh0Q2xhc3NOYW1lcyIsIlRhZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBWU8sSUFBTUEsSUFBeUIsR0FBRyxTQUE1QkEsSUFBNEIsT0FVbkM7QUFBQTs7QUFBQSxNQVRKQyxHQVNJLFFBVEpBLEdBU0k7QUFBQSxNQVJKQyxRQVFJLFFBUkpBLFFBUUk7QUFBQSxNQVBKQyxJQU9JLFFBUEpBLElBT0k7QUFBQSxNQU5KQyxLQU1JLFFBTkpBLEtBTUk7QUFBQSxNQUxKQyxRQUtJLFFBTEpBLFFBS0k7QUFBQSxNQUpKQyxPQUlJLFFBSkpBLE9BSUk7QUFBQSxNQUhKQyxRQUdJLFFBSEpBLFFBR0k7QUFBQSxNQUZKQyxTQUVJLFFBRkpBLFNBRUk7QUFBQSxNQUREQyxLQUNDO0FBQ0osTUFBTUMsY0FBYyxHQUFHLDRHQUVMUixRQUZLLGVBRVFDLElBRlIsR0FFaUJBLElBQUksSUFBSUQsUUFGekIsa0VBR0xBLFFBSEssR0FHUUEsUUFBUSxJQUFJLENBQUNDLElBSHJCLDhDQUluQixlQUptQixFQUlGRSxRQUpFLHlFQUtFRCxLQUxGLEdBS1lBLEtBTFosOENBTW5CLDZCQU5tQixFQU1ZRSxPQU5aLGlCQVFyQkUsU0FScUIsQ0FBdkI7QUFVQSxNQUFNRyxHQUFHLEdBQUdWLEdBQUcsSUFBSSxHQUFuQjtBQUNBLFNBQ0UsNkJBQUMsR0FBRCw2QkFBU1EsS0FBVDtBQUFnQixJQUFBLFNBQVMsRUFBRUM7QUFBM0IsTUFDR0gsUUFESCxDQURGO0FBS0QsQ0EzQk0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUmVhY3RIVE1MLCBIVE1MQXR0cmlidXRlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5leHBvcnQgdHlwZSBUZXh0UHJvcHMgPSB7XG4gIHRhZz86IGtleW9mIFJlYWN0SFRNTDtcbiAgY2F0ZWdvcnk/OiAnYm9keScgfCAnaGVhZGluZycgfCAndGl0bGUnO1xuICB0eXBlPzogJ3NtYWxsJyB8ICdyZWd1bGFyJyB8ICdtZWRpdW0nIHwgJ2xhcmdlJyB8ICdjYXBzJyB8ICdsYWJlbCc7XG4gIGFsaWduPzogJ2xlZnQnIHwgJ2NlbnRlcicgfCAncmlnaHQnO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIHRydW5jYXRlPzogYm9vbGVhbjtcbiAgc2VjdGlvbj86IGJvb2xlYW47XG59ICYgSFRNTEF0dHJpYnV0ZXM8SFRNTEVsZW1lbnQ+O1xuXG5leHBvcnQgY29uc3QgVGV4dDogUmVhY3QuRkM8VGV4dFByb3BzPiA9ICh7XG4gIHRhZyxcbiAgY2F0ZWdvcnksXG4gIHR5cGUsXG4gIGFsaWduLFxuICB0cnVuY2F0ZSxcbiAgc2VjdGlvbixcbiAgY2hpbGRyZW4sXG4gIGNsYXNzTmFtZSxcbiAgLi4ucHJvcHNcbn0pID0+IHtcbiAgY29uc3QgdGV4dENsYXNzTmFtZXMgPSBjbGFzc25hbWVzKFxuICAgIHtcbiAgICAgIFtgc2xkcy10ZXh0LSR7Y2F0ZWdvcnl9LS0ke3R5cGV9YF06IHR5cGUgJiYgY2F0ZWdvcnksXG4gICAgICBbYHNsZHMtdGV4dC0ke2NhdGVnb3J5fWBdOiBjYXRlZ29yeSAmJiAhdHlwZSxcbiAgICAgICdzbGRzLXRydW5jYXRlJzogdHJ1bmNhdGUsXG4gICAgICBbYHNsZHMtdGV4dC1hbGlnbi0tJHthbGlnbn1gXTogYWxpZ24sXG4gICAgICAnc2xkcy1zZWN0aW9uLXRpdGxlLS1kaXZpZGVyJzogc2VjdGlvbixcbiAgICB9LFxuICAgIGNsYXNzTmFtZVxuICApO1xuICBjb25zdCBUYWcgPSB0YWcgfHwgJ3AnO1xuICByZXR1cm4gKFxuICAgIDxUYWcgey4uLnByb3BzfSBjbGFzc05hbWU9e3RleHRDbGFzc05hbWVzfT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L1RhZz5cbiAgKTtcbn07XG4iXX0=