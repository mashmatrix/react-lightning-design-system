"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentSettings = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

/**
 *
 */
var ComponentSettings =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ComponentSettings, _React$Component);

  function ComponentSettings() {
    (0, _classCallCheck2.default)(this, ComponentSettings);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ComponentSettings).apply(this, arguments));
  }

  (0, _createClass2.default)(ComponentSettings, [{
    key: "getChildContext",
    value: function getChildContext() {
      var _this$props = this.props,
          assetRoot = _this$props.assetRoot,
          portalClassName = _this$props.portalClassName,
          portalStyle = _this$props.portalStyle;
      return {
        assetRoot: assetRoot,
        portalClassName: portalClassName,
        portalStyle: portalStyle
      };
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);
  return ComponentSettings;
}(_react.default.Component);

exports.ComponentSettings = ComponentSettings;
(0, _defineProperty2.default)(ComponentSettings, "childContextTypes", {
  assetRoot: _propTypes.default.string,
  portalClassName: _propTypes.default.string,
  portalStyle: _propTypes.default.object // eslint-disable-line react/forbid-prop-types

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL0NvbXBvbmVudFNldHRpbmdzLnRzeCJdLCJuYW1lcyI6WyJDb21wb25lbnRTZXR0aW5ncyIsInByb3BzIiwiYXNzZXRSb290IiwicG9ydGFsQ2xhc3NOYW1lIiwicG9ydGFsU3R5bGUiLCJjaGlsZHJlbiIsIlJlYWN0IiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwic3RyaW5nIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFjQTs7O0lBR2FBLGlCOzs7Ozs7Ozs7Ozs7c0NBVWlDO0FBQUEsd0JBQ1UsS0FBS0MsS0FEZjtBQUFBLFVBQ2xDQyxTQURrQyxlQUNsQ0EsU0FEa0M7QUFBQSxVQUN2QkMsZUFEdUIsZUFDdkJBLGVBRHVCO0FBQUEsVUFDTkMsV0FETSxlQUNOQSxXQURNO0FBRTFDLGFBQU87QUFBRUYsUUFBQUEsU0FBUyxFQUFUQSxTQUFGO0FBQWFDLFFBQUFBLGVBQWUsRUFBZkEsZUFBYjtBQUE4QkMsUUFBQUEsV0FBVyxFQUFYQTtBQUE5QixPQUFQO0FBQ0Q7Ozs2QkFFUTtBQUNQLGFBQU8sS0FBS0gsS0FBTCxDQUFXSSxRQUFsQjtBQUNEOzs7RUFqQm9DQyxlQUFNQyxTOzs7OEJBQWhDUCxpQix1QkFJZ0I7QUFDekJFLEVBQUFBLFNBQVMsRUFBRU0sbUJBQVVDLE1BREk7QUFFekJOLEVBQUFBLGVBQWUsRUFBRUssbUJBQVVDLE1BRkY7QUFHekJMLEVBQUFBLFdBQVcsRUFBRUksbUJBQVVFLE1BSEUsQ0FHTTs7QUFITixDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmV4cG9ydCB0eXBlIENvbXBvbmVudFNldHRpbmdzUHJvcHMgPSB7XG4gIGFzc2V0Um9vdD86IHN0cmluZztcbiAgcG9ydGFsQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBwb3J0YWxTdHlsZT86IG9iamVjdDtcbn07XG5cbmV4cG9ydCB0eXBlIENvbXBvbmVudFNldHRpbmdzQ29udGV4dCA9IHtcbiAgYXNzZXRSb290Pzogc3RyaW5nO1xuICBwb3J0YWxDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHBvcnRhbFN0eWxlPzogb2JqZWN0O1xufTtcblxuLyoqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50U2V0dGluZ3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8XG4gIENvbXBvbmVudFNldHRpbmdzUHJvcHMsXG4gIHt9XG4+IHtcbiAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzID0ge1xuICAgIGFzc2V0Um9vdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwb3J0YWxDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcG9ydGFsU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXNcbiAgfTtcblxuICBnZXRDaGlsZENvbnRleHQoKTogQ29tcG9uZW50U2V0dGluZ3NDb250ZXh0IHtcbiAgICBjb25zdCB7IGFzc2V0Um9vdCwgcG9ydGFsQ2xhc3NOYW1lLCBwb3J0YWxTdHlsZSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4geyBhc3NldFJvb3QsIHBvcnRhbENsYXNzTmFtZSwgcG9ydGFsU3R5bGUgfTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgfVxufVxuIl19