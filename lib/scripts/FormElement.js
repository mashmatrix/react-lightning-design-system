"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormElement = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var FormElement =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(FormElement, _React$Component);

  function FormElement() {
    (0, _classCallCheck2.default)(this, FormElement);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FormElement).apply(this, arguments));
  }

  (0, _createClass2.default)(FormElement, [{
    key: "renderFormElement",
    value: function renderFormElement(props) {
      var className = props.className,
          error = props.error,
          totalCols = props.totalCols,
          _props$cols = props.cols,
          cols = _props$cols === void 0 ? 1 : _props$cols,
          formElementRef = props.formElementRef,
          children = props.children;
      var formElementClassNames = (0, _classnames2.default)('slds-form-element', (0, _defineProperty2.default)({
        'slds-has-error': error
      }, "slds-size--".concat(cols, "-of-").concat(totalCols), typeof totalCols === 'number'), className);
      return _react.default.createElement("div", {
        ref: formElementRef,
        key: "form-element",
        className: formElementClassNames
      }, children);
    }
  }, {
    key: "renderLabel",
    value: function renderLabel() {
      var _this$props = this.props,
          id = _this$props.id,
          label = _this$props.label,
          required = _this$props.required;
      return label ? _react.default.createElement("label", {
        key: "form-element-label",
        className: "slds-form-element__label",
        htmlFor: id
      }, label, required ? _react.default.createElement("abbr", {
        className: "slds-required"
      }, "*") : undefined) : undefined;
    }
  }, {
    key: "renderControl",
    value: function renderControl(props) {
      var children = props.children,
          dropdown = props.dropdown,
          error = props.error;
      var readOnly = this.props.readOnly;
      var formElementControlClassNames = (0, _classnames2.default)('slds-form-element__control', {
        'slds-has-divider--bottom': readOnly
      });
      return _react.default.createElement("div", {
        key: "form-element-control",
        className: formElementControlClassNames
      }, children, dropdown, this.renderError(error));
    }
  }, {
    key: "renderError",
    value: function renderError(error) {
      var errorMessage = error ? typeof error === 'string' ? error : (0, _typeof2.default)(error) === 'object' ? error.message : undefined : undefined;
      return errorMessage ? _react.default.createElement("span", {
        key: "slds-form-error",
        className: "slds-form-element__help"
      }, errorMessage) : undefined;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          dropdown = _this$props2.dropdown,
          className = _this$props2.className,
          totalCols = _this$props2.totalCols,
          cols = _this$props2.cols,
          error = _this$props2.error,
          children = _this$props2.children,
          style = _this$props2.style,
          props = (0, _objectWithoutProperties2.default)(_this$props2, ["dropdown", "className", "totalCols", "cols", "error", "children", "style"]);
      var labelElem = this.renderLabel();
      var controlElem = this.renderControl({
        children: children,
        dropdown: dropdown,
        error: error
      });
      var formElemChildren = [labelElem, controlElem];
      return this.renderFormElement((0, _objectSpread2.default)({}, props, {
        className: className,
        error: error,
        totalCols: totalCols,
        cols: cols,
        style: style,
        children: formElemChildren
      }));
    }
  }]);
  return FormElement;
}(_react.default.Component);

exports.FormElement = FormElement;
(0, _defineProperty2.default)(FormElement, "isFormElement", true);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL0Zvcm1FbGVtZW50LnRzeCJdLCJuYW1lcyI6WyJGb3JtRWxlbWVudCIsInByb3BzIiwiY2xhc3NOYW1lIiwiZXJyb3IiLCJ0b3RhbENvbHMiLCJjb2xzIiwiZm9ybUVsZW1lbnRSZWYiLCJjaGlsZHJlbiIsImZvcm1FbGVtZW50Q2xhc3NOYW1lcyIsImlkIiwibGFiZWwiLCJyZXF1aXJlZCIsInVuZGVmaW5lZCIsImRyb3Bkb3duIiwicmVhZE9ubHkiLCJmb3JtRWxlbWVudENvbnRyb2xDbGFzc05hbWVzIiwicmVuZGVyRXJyb3IiLCJlcnJvck1lc3NhZ2UiLCJtZXNzYWdlIiwic3R5bGUiLCJsYWJlbEVsZW0iLCJyZW5kZXJMYWJlbCIsImNvbnRyb2xFbGVtIiwicmVuZGVyQ29udHJvbCIsImZvcm1FbGVtQ2hpbGRyZW4iLCJyZW5kZXJGb3JtRWxlbWVudCIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7SUFnQmFBLFc7Ozs7Ozs7Ozs7OztzQ0FHT0MsSyxFQUFZO0FBQUEsVUFFMUJDLFNBRjBCLEdBUXhCRCxLQVJ3QixDQUUxQkMsU0FGMEI7QUFBQSxVQUcxQkMsS0FIMEIsR0FReEJGLEtBUndCLENBRzFCRSxLQUgwQjtBQUFBLFVBSTFCQyxTQUowQixHQVF4QkgsS0FSd0IsQ0FJMUJHLFNBSjBCO0FBQUEsd0JBUXhCSCxLQVJ3QixDQUsxQkksSUFMMEI7QUFBQSxVQUsxQkEsSUFMMEIsNEJBS25CLENBTG1CO0FBQUEsVUFNMUJDLGNBTjBCLEdBUXhCTCxLQVJ3QixDQU0xQkssY0FOMEI7QUFBQSxVQU8xQkMsUUFQMEIsR0FReEJOLEtBUndCLENBTzFCTSxRQVAwQjtBQVM1QixVQUFNQyxxQkFBcUIsR0FBRywwQkFDNUIsbUJBRDRCO0FBRzFCLDBCQUFrQkw7QUFIUSw4QkFJWEUsSUFKVyxpQkFJQUQsU0FKQSxHQUljLE9BQU9BLFNBQVAs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O0VBdkc4QkUsZUFBTUMsUzs7OzhCQUExQjNCLFcsbUJBQ1ksSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuZXhwb3J0IHR5cGUgRm9ybUVsZW1lbnRQcm9wcyA9IHtcbiAgaWQ/OiBzdHJpbmc7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgbGFiZWw/OiBzdHJpbmc7XG4gIHJlcXVpcmVkPzogYm9vbGVhbjtcbiAgZXJyb3I/OiBib29sZWFuIHwgc3RyaW5nIHwgeyBtZXNzYWdlOiBzdHJpbmcgfTtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBjb2xzPzogbnVtYmVyO1xuICB0b3RhbENvbHM/OiBudW1iZXI7XG4gIGRyb3Bkb3duPzogSlNYLkVsZW1lbnQ7XG4gIGZvcm1FbGVtZW50UmVmPzogKG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB2b2lkO1xuICBzdHlsZT86IG9iamVjdDtcbn07XG5cbmV4cG9ydCBjbGFzcyBGb3JtRWxlbWVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxGb3JtRWxlbWVudFByb3BzLCB7fT4ge1xuICBzdGF0aWMgaXNGb3JtRWxlbWVudCA9IHRydWU7XG5cbiAgcmVuZGVyRm9ybUVsZW1lbnQocHJvcHM6IGFueSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIGVycm9yLFxuICAgICAgdG90YWxDb2xzLFxuICAgICAgY29scyA9IDEsXG4gICAgICBmb3JtRWxlbWVudFJlZixcbiAgICAgIGNoaWxkcmVuLFxuICAgIH0gPSBwcm9wcztcbiAgICBjb25zdCBmb3JtRWxlbWVudENsYXNzTmFtZXMgPSBjbGFzc25hbWVzKFxuICAgICAgJ3NsZHMtZm9ybS1lbGVtZW50JyxcbiAgICAgIHtcbiAgICAgICAgJ3NsZHMtaGFzLWVycm9yJzogZXJyb3IsXG4gICAgICAgIFtgc2xkcy1zaXplLS0ke2NvbHN9LW9mLSR7dG90YWxDb2xzfWBdOiB0eXBlb2YgdG90YWxDb2xzID09PSAnbnVtYmVyJyxcbiAgICAgIH0sXG4gICAgICBjbGFzc05hbWVcbiAgICApO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIHJlZj17Zm9ybUVsZW1lbnRSZWZ9XG4gICAgICAgIGtleT0nZm9ybS1lbGVtZW50J1xuICAgICAgICBjbGFzc05hbWU9e2Zvcm1FbGVtZW50Q2xhc3NOYW1lc31cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlckxhYmVsKCkge1xuICAgIGNvbnN0IHsgaWQsIGxhYmVsLCByZXF1aXJlZCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gbGFiZWwgPyAoXG4gICAgICA8bGFiZWxcbiAgICAgICAga2V5PSdmb3JtLWVsZW1lbnQtbGFiZWwnXG4gICAgICAgIGNsYXNzTmFtZT0nc2xkcy1mb3JtLWVsZW1lbnRfX2xhYmVsJ1xuICAgICAgICBodG1sRm9yPXtpZH1cbiAgICAgID5cbiAgICAgICAge2xhYmVsfVxuICAgICAgICB7cmVxdWlyZWQgPyA8YWJiciBjbGFzc05hbWU9J3NsZHMtcmVxdWlyZWQnPio8L2FiYnI+IDogdW5kZWZpbmVkfVxuICAgICAgPC9sYWJlbD5cbiAgICApIDogKFxuICAgICAgdW5kZWZpbmVkXG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlckNvbnRyb2wocHJvcHM6IHsgY2hpbGRyZW46IGFueTsgZHJvcGRvd246IGFueTsgZXJyb3I6IGFueSB9KSB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgZHJvcGRvd24sIGVycm9yIH0gPSBwcm9wcztcbiAgICBjb25zdCB7IHJlYWRPbmx5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGZvcm1FbGVtZW50Q29udHJvbENsYXNzTmFtZXMgPSBjbGFzc25hbWVzKFxuICAgICAgJ3NsZHMtZm9ybS1lbGVtZW50X19jb250cm9sJyxcbiAgICAgIHsgJ3NsZHMtaGFzLWRpdmlkZXItLWJvdHRvbSc6IHJlYWRPbmx5IH1cbiAgICApO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGtleT0nZm9ybS1lbGVtZW50LWNvbnRyb2wnIGNsYXNzTmFtZT17Zm9ybUVsZW1lbnRDb250cm9sQ2xhc3NOYW1lc30+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAge2Ryb3Bkb3dufVxuICAgICAgICB7dGhpcy5yZW5kZXJFcnJvcihlcnJvcil9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyRXJyb3IoZXJyb3I6IGFueSkge1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGVycm9yXG4gICAgICA/IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZydcbiAgICAgICAgPyBlcnJvclxuICAgICAgICA6IHR5cGVvZiBlcnJvciA9PT0gJ29iamVjdCdcbiAgICAgICAgPyBlcnJvci5tZXNzYWdlXG4gICAgICAgIDogdW5kZWZpbmVkXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gZXJyb3JNZXNzYWdlID8gKFxuICAgICAgPHNwYW4ga2V5PSdzbGRzLWZvcm0tZXJyb3InIGNsYXNzTmFtZT0nc2xkcy1mb3JtLWVsZW1lbnRfX2hlbHAnPlxuICAgICAgICB7ZXJyb3JNZXNzYWdlfVxuICAgICAgPC9zcGFuPlxuICAgICkgOiAoXG4gICAgICB1bmRlZmluZWRcbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGRyb3Bkb3duLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgdG90YWxDb2xzLFxuICAgICAgY29scyxcbiAgICAgIGVycm9yLFxuICAgICAgY2hpbGRyZW4sXG4gICAgICBzdHlsZSxcbiAgICAgIC4uLnByb3BzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbGFiZWxFbGVtID0gdGhpcy5yZW5kZXJMYWJlbCgpO1xuICAgIGNvbnN0IGNvbnRyb2xFbGVtID0gdGhpcy5yZW5kZXJDb250cm9sKHsgY2hpbGRyZW4sIGRyb3Bkb3duLCBlcnJvciB9KTtcbiAgICBjb25zdCBmb3JtRWxlbUNoaWxkcmVuID0gW2xhYmVsRWxlbSwgY29udHJvbEVsZW1dO1xuICAgIHJldHVybiB0aGlzLnJlbmRlckZvcm1FbGVtZW50KHtcbiAgICAgIC4uLnByb3BzLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgZXJyb3IsXG4gICAgICB0b3RhbENvbHMsXG4gICAgICBjb2xzLFxuICAgICAgc3R5bGUsXG4gICAgICBjaGlsZHJlbjogZm9ybUVsZW1DaGlsZHJlbixcbiAgICB9KTtcbiAgfVxufVxuIl19