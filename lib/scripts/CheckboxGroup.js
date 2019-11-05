"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckboxGroup = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var CheckboxGroup =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(CheckboxGroup, _React$Component);

  function CheckboxGroup(props) {
    var _this;

    (0, _classCallCheck2.default)(this, CheckboxGroup);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CheckboxGroup).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "nodes", {});
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)(_this));
    _this.renderControl = _this.renderControl.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(CheckboxGroup, [{
    key: "onChange",
    value: function onChange(e) {
      var _this2 = this;

      if (this.props.onChange) {
        var _values = [];

        _react.default.Children.forEach(this.props.children, function (check, i) {
          var el = check.props.ref || _this2.nodes["check".concat(i + 1)];

          var checkEl = el && el.querySelector('input[type=checkbox]');

          if (checkEl && checkEl.checked) {
            _values.push(check.props.value);
          }
        });

        this.props.onChange(e, _values);
      }
    }
  }, {
    key: "renderControl",
    value: function renderControl(checkbox, i) {
      var _this3 = this;

      var props = {
        grouped: true
      };

      if (checkbox.props.ref) {
        props.ref = checkbox.props.ref;
      } else {
        props.checkboxRef = function (node) {
          return _this3.nodes["check".concat(i + 1)] = node;
        };
      }

      if (this.props.name) {
        props.name = this.props.name;
      }

      return _react.default.cloneElement(checkbox, props);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          label = _this$props.label,
          totalCols = _this$props.totalCols,
          cols = _this$props.cols,
          style = _this$props.style,
          required = _this$props.required,
          error = _this$props.error,
          children = _this$props.children,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["className", "label", "totalCols", "cols", "style", "required", "error", "children"]);
      var grpClassNames = (0, _classnames.default)(className, 'slds-form-element', {
        'slds-has-error': error,
        'slds-is-required': required
      }, typeof totalCols === 'number' ? "slds-size--".concat(cols || 1, "-of-").concat(totalCols) : null);
      var grpStyles = typeof totalCols === 'number' ? (0, _objectSpread2.default)({
        display: 'inline-block'
      }, style) : style;
      var errorMessage = error ? typeof error === 'string' ? error : (0, _typeof2.default)(error) === 'object' ? error.message : undefined : undefined;
      delete props.onChange;
      return _react.default.createElement("fieldset", (0, _extends2.default)({
        className: grpClassNames,
        style: grpStyles,
        onChange: this.onChange
      }, props), _react.default.createElement("legend", {
        className: "slds-form-element__label slds-form-element__label--top"
      }, label, required ? _react.default.createElement("abbr", {
        className: "slds-required"
      }, "*") : undefined), _react.default.createElement("div", {
        className: "slds-form-element__control"
      }, _react.default.Children.map(children, this.renderControl), errorMessage ? _react.default.createElement("div", {
        className: "slds-form-element__help"
      }, errorMessage) : undefined));
    }
  }]);
  return CheckboxGroup;
}(_react.default.Component);

exports.CheckboxGroup = CheckboxGroup;
(0, _defineProperty2.default)(CheckboxGroup, "isFormElement", true);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL0NoZWNrYm94R3JvdXAudHN4Il0sIm5hbWVzIjpbIkNoZWNrYm94R3JvdXAiLCJwcm9wcyIsIm9uQ2hhbmdlIiwiYmluZCIsInJlbmRlckNvbnRyb2wiLCJlIiwidmFsdWVzIiwiUmVhY3QiLCJDaGlsZHJlbiIsImZvckVhY2giLCJjaGlsZHJlbiIsImNoZWNrIiwiaSIsImVsIiwicmVmIiwibm9kZXMiLCJjaGVja0VsIiwicXVlcnlTZWxlY3RvciIsImNoZWNrZWQiLCJwdXNoIiwidmFsdWUiLCJjaGVja2JveCIsImdyb3VwZWQiLCJjaGVja2JveFJlZiIsIm5vZGUiLCJuYW1lIiwiY2xvbmVFbGVtZW50IiwiY2xhc3NOYW1lIiwibGFiZWwiLCJ0b3RhbENvbHMiLCJjb2xzIiwic3R5bGUiLCJyZXF1aXJlZCIsImVycm9yIiwiZ3JwQ2xhc3NOYW1lcyIsImdycFN0eWxlcyIsImRpc3BsYXkiLCJlcnJvck1lc3NhZ2UiLCJtZXNzYWdlIiwidW5kZWZpbmVkIiwibWFwIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0lBa0JhQSxhOzs7OztBQUtYLHlCQUFZQyxLQUFaLEVBQWlEO0FBQUE7O0FBQUE7QUFDL0MsbUhBQU1BLEtBQU47QUFEK0Msd0ZBRlQsRUFFUztBQUcvQyxVQUFLQyxRQUFMLEdBQWdCLE1BQUtBLFFBQUwsQ0FBY0MsSUFBZCw2Q0FBaEI7QUFDQSxVQUFLQyxhQUFMLEdBQXFCLE1BQUtBLGFBQUwsQ0FBbUJELElBQW5CLDZDQUFyQjtBQUorQztBQUtoRDs7Ozs2QkFFUUUsQyxFQUF5QztBQUFBOztBQUNoRCxVQUFJLEtBQUtKLEtBQUwsQ0FBV0MsUUFBZixFQUF5QjtBQUN2QixZQUFNSSxPQUEyQixHQUFHLEVBQXBDOztBQUNBQyx1QkFBTUMsUUFBTixDQUFlQyxPQUFmLENBQXVCLEtBQUtSLEtBQUwsQ0FBV1MsUUFBbEMsRUFBNEMs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LGFBQUgsR0FBOENPLFNBRnpELENBTkYsRUFVRTtBQUFLLFFBQUEsU0FBUyxFQUFDO0FBQWYsU0FDR2hDLGVBQU1DLFFBQU4sQ0FBZWdDLEdBQWYsQ0FBbUI5QixRQUFuQixFQUE2QixLQUFLTixhQUFsQyxDQURILEVBRUdpQyxZQUFZLEdBQ1g7QUFBSyxRQUFBLFNBQVMsRUFBQztBQUFmLFNBQTBDQSxZQUExQyxDQURXLEdBR1hFLFNBTEosQ0FWRixDQURGO0FBcUJEOzs7RUFoR2dDaEMsZUFBTWtDLFM7Ozs4QkFBNUJ6QyxhLG1CQUNZLEkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgRmllbGRzZXRIVE1MQXR0cmlidXRlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgRm9ybUVsZW1lbnRQcm9wcyB9IGZyb20gJy4vRm9ybUVsZW1lbnQnO1xuXG5leHBvcnQgdHlwZSBDaGVja2JveEdyb3VwUHJvcHMgPSB7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgbGFiZWw/OiBzdHJpbmc7XG4gIHJlcXVpcmVkPzogYm9vbGVhbjtcbiAgZXJyb3I/OiBGb3JtRWxlbWVudFByb3BzWydlcnJvciddO1xuICBuYW1lPzogc3RyaW5nO1xuICB0b3RhbENvbHM/OiBudW1iZXI7XG4gIGNvbHM/OiBudW1iZXI7XG4gIHN0eWxlPzogb2JqZWN0O1xuICBvbkNoYW5nZT86IChcbiAgICBlOiBSZWFjdC5Gb3JtRXZlbnQ8SFRNTEZpZWxkU2V0RWxlbWVudD4sXG4gICAgdmFsdWVzOiAoc3RyaW5nIHwgbnVtYmVyKVtdXG4gICkgPT4gdm9pZDtcbn0gJiBGaWVsZHNldEhUTUxBdHRyaWJ1dGVzPEhUTUxGaWVsZFNldEVsZW1lbnQ+O1xuXG5leHBvcnQgY2xhc3MgQ2hlY2tib3hHcm91cCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxDaGVja2JveEdyb3VwUHJvcHM+IHtcbiAgc3RhdGljIGlzRm9ybUVsZW1lbnQgPSB0cnVlO1xuXG4gIHByaXZhdGUgbm9kZXM6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wczogUmVhZG9ubHk8Q2hlY2tib3hHcm91cFByb3BzPikge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5yZW5kZXJDb250cm9sID0gdGhpcy5yZW5kZXJDb250cm9sLmJpbmQodGhpcyk7XG4gIH1cblxuICBvbkNoYW5nZShlOiBSZWFjdC5Gb3JtRXZlbnQ8SFRNTEZpZWxkU2V0RWxlbWVudD4pIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xuICAgICAgY29uc3QgdmFsdWVzOiAoc3RyaW5nIHwgbnVtYmVyKVtdID0gW107XG4gICAgICBSZWFjdC5DaGlsZHJlbi5mb3JFYWNoKHRoaXMucHJvcHMuY2hpbGRyZW4sIChjaGVjazogYW55LCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsID0gY2hlY2sucHJvcHMucmVmIHx8IHRoaXMubm9kZXNbYGNoZWNrJHtpICsgMX1gXTtcbiAgICAgICAgY29uc3QgY2hlY2tFbCA9IGVsICYmIGVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9Y2hlY2tib3hdJyk7XG4gICAgICAgIGlmIChjaGVja0VsICYmIGNoZWNrRWwuY2hlY2tlZCkge1xuICAgICAgICAgIHZhbHVlcy5wdXNoKGNoZWNrLnByb3BzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGUsIHZhbHVlcyk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyQ29udHJvbChjaGVja2JveDogYW55LCBpOiBudW1iZXIpIHtcbiAgICBjb25zdCBwcm9wczogYW55ID0geyBncm91cGVkOiB0cnVlIH07XG4gICAgaWYgKGNoZWNrYm94LnByb3BzLnJlZikge1xuICAgICAgcHJvcHMucmVmID0gY2hlY2tib3gucHJvcHMucmVmO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9wcy5jaGVja2JveFJlZiA9IChub2RlOiBhbnkpID0+ICh0aGlzLm5vZGVzW2BjaGVjayR7aSArIDF9YF0gPSBub2RlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMubmFtZSkge1xuICAgICAgcHJvcHMubmFtZSA9IHRoaXMucHJvcHMubmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGVja2JveCwgcHJvcHMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIGxhYmVsLFxuICAgICAgdG90YWxDb2xzLFxuICAgICAgY29scyxcbiAgICAgIHN0eWxlLFxuICAgICAgcmVxdWlyZWQsXG4gICAgICBlcnJvcixcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgLi4ucHJvcHNcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBncnBDbGFzc05hbWVzID0gY2xhc3NuYW1lcyhcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgICdzbGRzLWZvcm0tZWxlbWVudCcsXG4gICAgICB7XG4gICAgICAgICdzbGRzLWhhcy1lcnJvcic6IGVycm9yLFxuICAgICAgICAnc2xkcy1pcy1yZXF1aXJlZCc6IHJlcXVpcmVkLFxuICAgICAgfSxcbiAgICAgIHR5cGVvZiB0b3RhbENvbHMgPT09ICdudW1iZXInXG4gICAgICAgID8gYHNsZHMtc2l6ZS0tJHtjb2xzIHx8IDF9LW9mLSR7dG90YWxDb2xzfWBcbiAgICAgICAgOiBudWxsXG4gICAgKTtcbiAgICBjb25zdCBncnBTdHlsZXMgPVxuICAgICAgdHlwZW9mIHRvdGFsQ29scyA9PT0gJ251bWJlcidcbiAgICAgICAgPyB7IGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLCAuLi5zdHlsZSB9XG4gICAgICAgIDogc3R5bGU7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZXJyb3JcbiAgICAgID8gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJ1xuICAgICAgICA/IGVycm9yXG4gICAgICAgIDogdHlwZW9mIGVycm9yID09PSAnb2JqZWN0J1xuICAgICAgICA/IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgZGVsZXRlIHByb3BzLm9uQ2hhbmdlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZmllbGRzZXRcbiAgICAgICAgY2xhc3NOYW1lPXtncnBDbGFzc05hbWVzfVxuICAgICAgICBzdHlsZT17Z3JwU3R5bGVzfVxuICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgICAgey4uLnByb3BzfVxuICAgICAgPlxuICAgICAgICA8bGVnZW5kIGNsYXNzTmFtZT0nc2xkcy1mb3JtLWVsZW1lbnRfX2xhYmVsIHNsZHMtZm9ybS1lbGVtZW50X19sYWJlbC0tdG9wJz5cbiAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAge3JlcXVpcmVkID8gPGFiYnIgY2xhc3NOYW1lPSdzbGRzLXJlcXVpcmVkJz4qPC9hYmJyPiA6IHVuZGVmaW5lZH1cbiAgICAgICAgPC9sZWdlbmQ+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzbGRzLWZvcm0tZWxlbWVudF9fY29udHJvbCc+XG4gICAgICAgICAge1JlYWN0LkNoaWxkcmVuLm1hcChjaGlsZHJlbiwgdGhpcy5yZW5kZXJDb250cm9sKX1cbiAgICAgICAgICB7ZXJyb3JNZXNzYWdlID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NsZHMtZm9ybS1lbGVtZW50X19oZWxwJz57ZXJyb3JNZXNzYWdlfTwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICB1bmRlZmluZWRcbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZmllbGRzZXQ+XG4gICAgKTtcbiAgfVxufVxuIl19