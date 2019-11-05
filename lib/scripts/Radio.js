"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Radio = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var Radio = function Radio(_ref) {
  var className = _ref.className,
      label = _ref.label,
      name = _ref.name,
      value = _ref.value,
      checked = _ref.checked,
      defaultChecked = _ref.defaultChecked,
      props = (0, _objectWithoutProperties2.default)(_ref, ["className", "label", "name", "value", "checked", "defaultChecked"]);
  var radioClassNames = (0, _classnames.default)(className, 'slds-radio');
  return _react.default.createElement("label", {
    className: radioClassNames
  }, _react.default.createElement("input", (0, _extends2.default)({
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    defaultChecked: defaultChecked
  }, props)), _react.default.createElement("span", {
    className: "slds-radio--faux"
  }), _react.default.createElement("span", {
    className: "slds-form-element__label"
  }, label));
};

exports.Radio = Radio;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL1JhZGlvLnRzeCJdLCJuYW1lcyI6WyJSYWRpbyIsImNsYXNzTmFtZSIsImxhYmVsIiwibmFtZSIsInZhbHVlIiwiY2hlY2tlZCIsImRlZmF1bHRDaGVja2VkIiwicHJvcHMiLCJyYWRpb0NsYXNzTmFtZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFXTyxJQUFNQSxLQUEyQixHQUFHLFNBQTlCQSxLQUE4QixPQVFyQztBQUFBLE1BUEpDLFNBT0ksUUFQSkEsU0FPSTtBQUFBLE1BTkpDLEtBTUksUUFOSkEsS0FNSTtBQUFBLE1BTEpDLElBS0ksUUFMSkEsSUFLSTtBQUFBLE1BSkpDLEtBSUksUUFKSkEsS0FJSTtBQUFBLE1BSEpDLE9BR0ksUUFISkEsT0FHSTtBQUFBLE1BRkpDLGNBRUksUUFGSkEsY0FFSTtBQUFBLE1BRERDLEtBQ0M7QUFDSixNQUFNQyxlQUFlLEdBQUcseUJBQVdQLFNBQVgsRUFBc0IsWUFBdEIsQ0FBeEI7QUFDQSxTQUNFO0FBQU8sSUFBQSxTQUFTLEVBQUVPO0FBQWxCLEtBQ0U7QUFDRSxJQUFBLElBQUksRUFBQyxPQURQO0FBRUUsSUFBQSxJQUFJLEVBQUVMLElBRlI7QUFHRSxJQUFBLEtBQUssRUFBRUMsS0FIVDtBQUlFLElBQUEsT0FBTyxFQUFFQyxPQUpYO0FBS0UsSUFBQSxjQUFjLEVBQUVDO0FBTGxCLEtBTU1DLEtBTk4sRUFERixFQVNFO0FBQU0sSUFBQSxTQUFTLEVBQUM7QUFBaEIsSUFURixFQVVFO0FBQU0sSUFBQSxTQUFTLEVBQUM7QUFBaEIsS0FBNENMLEtBQTVDLENBVkYsQ0FERjtBQWNELENBeEJNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IElucHV0SFRNTEF0dHJpYnV0ZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuZXhwb3J0IHR5cGUgUmFkaW9Qcm9wcyA9IHtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBsYWJlbD86IHN0cmluZztcbiAgbmFtZT86IHN0cmluZztcbiAgdmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XG4gIGNoZWNrZWQ/OiBib29sZWFuO1xuICBkZWZhdWx0Q2hlY2tlZD86IGJvb2xlYW47XG59ICYgSW5wdXRIVE1MQXR0cmlidXRlczxIVE1MSW5wdXRFbGVtZW50PjtcblxuZXhwb3J0IGNvbnN0IFJhZGlvOiBSZWFjdC5GQzxSYWRpb1Byb3BzPiA9ICh7XG4gIGNsYXNzTmFtZSxcbiAgbGFiZWwsXG4gIG5hbWUsXG4gIHZhbHVlLFxuICBjaGVja2VkLFxuICBkZWZhdWx0Q2hlY2tlZCxcbiAgLi4ucHJvcHNcbn0pID0+IHtcbiAgY29uc3QgcmFkaW9DbGFzc05hbWVzID0gY2xhc3NuYW1lcyhjbGFzc05hbWUsICdzbGRzLXJhZGlvJyk7XG4gIHJldHVybiAoXG4gICAgPGxhYmVsIGNsYXNzTmFtZT17cmFkaW9DbGFzc05hbWVzfT5cbiAgICAgIDxpbnB1dFxuICAgICAgICB0eXBlPSdyYWRpbydcbiAgICAgICAgbmFtZT17bmFtZX1cbiAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICBjaGVja2VkPXtjaGVja2VkfVxuICAgICAgICBkZWZhdWx0Q2hlY2tlZD17ZGVmYXVsdENoZWNrZWR9XG4gICAgICAgIHsuLi5wcm9wc31cbiAgICAgIC8+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9J3NsZHMtcmFkaW8tLWZhdXgnIC8+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9J3NsZHMtZm9ybS1lbGVtZW50X19sYWJlbCc+e2xhYmVsfTwvc3Bhbj5cbiAgICA8L2xhYmVsPlxuICApO1xufTtcbiJdfQ==