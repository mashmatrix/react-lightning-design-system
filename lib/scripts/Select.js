"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Option = exports.Select = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _FormElement = require("./FormElement");

var _util = require("./util");

var Select =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Select, _Component);

  function Select(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Select);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Select).call(this, props));
    _this.state = {
      id: "form-element-".concat((0, _util.uuid)())
    };
    return _this;
  }

  (0, _createClass2.default)(Select, [{
    key: "onChange",
    value: function onChange(e) {
      var value = e.target.value;

      if (this.props.onChange) {
        this.props.onChange(e, value);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var id = this.props.id || this.state.id;
      var _this$props = this.props,
          label = _this$props.label,
          required = _this$props.required,
          error = _this$props.error,
          totalCols = _this$props.totalCols,
          cols = _this$props.cols,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["label", "required", "error", "totalCols", "cols"]);

      if (label || required || error || totalCols || cols) {
        var formElemProps = {
          id: id,
          label: label,
          required: required,
          error: error,
          totalCols: totalCols,
          cols: cols
        };
        return _react.default.createElement(_FormElement.FormElement, formElemProps, _react.default.createElement(Select, (0, _objectSpread2.default)({}, props, {
          id: id
        })));
      }

      var className = props.className,
          children = props.children,
          onChange = props.onChange,
          pprops = (0, _objectWithoutProperties2.default)(props, ["className", "children", "onChange"]);
      var selectClassNames = (0, _classnames.default)(className, 'slds-select');
      return _react.default.createElement("select", (0, _extends2.default)({
        id: id,
        className: selectClassNames,
        onChange: this.onChange.bind(this)
      }, pprops), children);
    }
  }]);
  return Select;
}(_react.Component);

exports.Select = Select;
(0, _defineProperty2.default)(Select, "isFormElement", true);

var Option = function Option(props) {
  var label = props.label,
      children = props.children,
      pprops = (0, _objectWithoutProperties2.default)(props, ["label", "children"]);
  return _react.default.createElement("option", pprops, label || children);
};

exports.Option = Option;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL1NlbGVjdC50c3giXSwibmFtZXMiOlsiU2VsZWN0IiwicHJvcHMiLCJzdGF0ZSIsImlkIiwiZSIsInZhbHVlIiwidGFyZ2V0Iiwib25DaGFuZ2UiLCJsYWJlbCIsInJlcXVpcmVkIiwiZXJyb3IiLCJ0b3RhbENvbHMiLCJjb2xzIiwiZm9ybUVsZW1Qcm9wcyIsImNsYXNzTmFtZSIsImNoaWxkcmVuIiwicHByb3BzIiwic2VsZWN0Q2xhc3NOYW1lcyIsImJpbmQiLCJDb21wb25lbnQiLCJPcHRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0lBbUJhQSxNOzs7OztBQUdYLGtCQUFZQyxLQUFaLEVBQTBDO0FBQUE7O0FBQUE7QUFDeEMsNEdBQU1BLEtBQU47QUFDQSxVQUFLQyxLQUFMLEdBQWE7QUFBRUMsTUFBQUEsRUFBRSx5QkFBa0IsaUJBQWxCO0FBQUosS0FBYjtBQUZ3QztBQUd6Qzs7Ozs2QkFFUUMsQyxFQUF5QztBQUFBLFVBQ3hDQyxLQUR3QyxHQUM5QkQsQ0FBQyxDQUFDRSxNQUQ0QixDQUN4Q0QsS0FEd0M7O0FBRWhELFVBQUksS0FBS0osS0FBTCxDQUFXTSxRQUFmLEVBQXlCO0FBQ3ZCLGFBQUtOLEtBQUwsQ0FBV00sUUFBWCxDQUFvQkgsQ0FBcEIsRUFBdUJDLEtBQXZCO0FBQ0Q7QUFDRjs7OzZCQUVRO0FBQ1AsVUFBTUYsRUFBRSxHQUFHLEtBQUtGLEtBQUwsQ0FBV0UsRUFBWCxJQUFpQixLQUFLRCxLQUFMLENBQVdDLEVBQXZDO0FBRE8sd0JBRXVELEtBQUtGLEtBRjVEO0FBQUEsVUFFQ08sS0FGRCxlQUVDQSxLQUZEO0FBQUEsVUFFUUMsUUFGUixlQUVRQSxRQUZSO0FBQUEsVUFFa0JDLEtBRmxCLGVBRWtCQSxLQUZsQjtBQUFBLFVBRXlCQyxTQUZ6QixlQUV5QkEsU0FGekI7QUFBQSxVQUVvQ0MsSUFGcEMsZUFFb0NBLElBRnBDO0FBQUEsVUFFNkNYLEtBRjdDOztBQUdQLFVBQUlPLEtBQUssSUFBSUMsUUFBVCxJQUFxQkMsS0FBckIsSUFBOEJDLFNBQTlCLElBQTJDQyxJQUEvQyxFQUFxRDtBQUNuRCxZQUFNQyxhQUFhLEdBQUc7QUFBRVYsVUFBQUEsRUFBRSxFQUFGQSxFQUFGO0FBQU1LLFVBQUFBLEtBQUssRUFBTEEsS0FBTjtBQUFhQyxVQUFBQSxRQUFRLEVBQVJBLFFBQWI7QUFBdUJDLFVBQUFBLEtBQUssRUFBTEEsS0FBdkI7QUFBOEJDLFVBQUFBLFNBQVMsRUFBVEEsU0FBOUI7QUFBeUNDLFVBQUFBLElBQUksRUFBSkE7QUFBekMsU0FBdEI7QUFDQSxlQUNFLDZCQUFDLHdCQUFELEVBQWlCQyxhQUFqQixFQUNFLDZCQUFDLE1BQUQsa0NBQWlCWixLQUFqQjtBQUF3QkUsVUFBQUEsRUFBRSxFQUFGQTtBQUF4QixXQURGLENBREY7QUFLRDs7QUFWTSxVQVlMVyxTQVpLLEdBaUJIYixLQWpCRyxDQVlMYSxTQVpLO0FBQUEsVUFhTEMsUUFiSyxHQWlCSGQsS0FqQkcsQ0FhTGMsUUFiSztBQUFBLFVBZUxSLFFBZkssR0FpQkhOLEtBakJHLENBZUxNLFFBZks7QUFBQSxVQWdCRlMsTUFoQkUsMENBaUJIZixLQWpCRztBQWtCUCxVQUFNZ0IsZ0JBQWdCLEdBQUcseUJBQVdILFNBQVgsRUFBc0IsYUFBdEIsQ0FBekI7QUFDQSxhQUNFO0FBQ0UsUUFBQSxFQUFFLEVBQUVYLEVBRE47QUFFRSxRQUFBLFNBQVMsRUFBRWMsZ0JBRmI7QUFHRSxRQUFBLFFBQVEsRUFBRSxLQUFLVixRQUFMLENBQWNXLElBQWQsQ0FBbUIsSUFBbkI7QUFIWixTQUlNRixNQUpOLEdBTUdELFFBTkgsQ0FERjtBQVVEOzs7RUE1Q3lCSSxnQjs7OzhCQUFmbkIsTSxtQkFDWSxJOztBQWtEbEIsSUFBTW9CLE1BQTZCLEdBQUcsU0FBaENBLE1BQWdDLENBQUNuQixLQUFELEVBQVc7QUFBQSxNQUM5Q08sS0FEOEMsR0FDZlAsS0FEZSxDQUM5Q08sS0FEOEM7QUFBQSxNQUN2Q08sUUFEdUMsR0FDZmQsS0FEZSxDQUN2Q2MsUUFEdUM7QUFBQSxNQUMxQkMsTUFEMEIsMENBQ2ZmLEtBRGU7QUFFdEQsU0FBTyx1Q0FBWWUsTUFBWixFQUFxQlIsS0FBSyxJQUFJTyxRQUE5QixDQUFQO0FBQ0QsQ0FITSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IEZvcm1FbGVtZW50LCBGb3JtRWxlbWVudFByb3BzIH0gZnJvbSAnLi9Gb3JtRWxlbWVudCc7XG5pbXBvcnQgeyB1dWlkIH0gZnJvbSAnLi91dGlsJztcblxudHlwZSBPbWl0PFQsIEsgZXh0ZW5kcyBrZXlvZiBUPiA9IFBpY2s8VCwgRXhjbHVkZTxrZXlvZiBULCBLPj47XG5cbmV4cG9ydCB0eXBlIFNlbGVjdFByb3BzID0ge1xuICBpZD86IHN0cmluZztcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBsYWJlbD86IHN0cmluZztcbiAgcmVxdWlyZWQ/OiBib29sZWFuO1xuICB0b3RhbENvbHM/OiBudW1iZXI7XG4gIGNvbHM/OiBudW1iZXI7XG4gIGVycm9yPzogRm9ybUVsZW1lbnRQcm9wc1snZXJyb3InXTtcbiAgb25DaGFuZ2U/OiAoZTogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTFNlbGVjdEVsZW1lbnQ+LCB2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xufSAmIE9taXQ8UmVhY3QuU2VsZWN0SFRNTEF0dHJpYnV0ZXM8SFRNTFNlbGVjdEVsZW1lbnQ+LCAnb25DaGFuZ2UnPjtcblxuZXhwb3J0IHR5cGUgU2VsZWN0U3RhdGUgPSB7XG4gIGlkOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY2xhc3MgU2VsZWN0IGV4dGVuZHMgQ29tcG9uZW50PFNlbGVjdFByb3BzLCBTZWxlY3RTdGF0ZT4ge1xuICBzdGF0aWMgaXNGb3JtRWxlbWVudCA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IFJlYWRvbmx5PFNlbGVjdFByb3BzPikge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0geyBpZDogYGZvcm0tZWxlbWVudC0ke3V1aWQoKX1gIH07XG4gIH1cblxuICBvbkNoYW5nZShlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MU2VsZWN0RWxlbWVudD4pIHtcbiAgICBjb25zdCB7IHZhbHVlIH0gPSBlLnRhcmdldDtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShlLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGlkID0gdGhpcy5wcm9wcy5pZCB8fCB0aGlzLnN0YXRlLmlkO1xuICAgIGNvbnN0IHsgbGFiZWwsIHJlcXVpcmVkLCBlcnJvciwgdG90YWxDb2xzLCBjb2xzLCAuLi5wcm9wcyB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAobGFiZWwgfHwgcmVxdWlyZWQgfHwgZXJyb3IgfHwgdG90YWxDb2xzIHx8IGNvbHMpIHtcbiAgICAgIGNvbnN0IGZvcm1FbGVtUHJvcHMgPSB7IGlkLCBsYWJlbCwgcmVxdWlyZWQsIGVycm9yLCB0b3RhbENvbHMsIGNvbHMgfTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxGb3JtRWxlbWVudCB7Li4uZm9ybUVsZW1Qcm9wc30+XG4gICAgICAgICAgPFNlbGVjdCB7Li4ueyAuLi5wcm9wcywgaWQgfX0gLz5cbiAgICAgICAgPC9Gb3JtRWxlbWVudD5cbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IHtcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgb25DaGFuZ2UsXG4gICAgICAuLi5wcHJvcHNcbiAgICB9ID0gcHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0Q2xhc3NOYW1lcyA9IGNsYXNzbmFtZXMoY2xhc3NOYW1lLCAnc2xkcy1zZWxlY3QnKTtcbiAgICByZXR1cm4gKFxuICAgICAgPHNlbGVjdFxuICAgICAgICBpZD17aWR9XG4gICAgICAgIGNsYXNzTmFtZT17c2VsZWN0Q2xhc3NOYW1lc31cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2UuYmluZCh0aGlzKX1cbiAgICAgICAgey4uLnBwcm9wc31cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9zZWxlY3Q+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBPcHRpb25Qcm9wcyA9IHtcbiAgbGFiZWw/OiBzdHJpbmcgfCBudW1iZXI7XG59ICYgT21pdDxSZWFjdC5PcHRpb25IVE1MQXR0cmlidXRlczxIVE1MT3B0aW9uRWxlbWVudD4sICdsYWJlbCc+O1xuXG5leHBvcnQgY29uc3QgT3B0aW9uOiBSZWFjdC5GQzxPcHRpb25Qcm9wcz4gPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyBsYWJlbCwgY2hpbGRyZW4sIC4uLnBwcm9wcyB9ID0gcHJvcHM7XG4gIHJldHVybiA8b3B0aW9uIHsuLi5wcHJvcHN9PntsYWJlbCB8fCBjaGlsZHJlbn08L29wdGlvbj47XG59O1xuIl19