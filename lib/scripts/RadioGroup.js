"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioGroup = void 0;

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

var RadioGroup =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(RadioGroup, _React$Component);

  function RadioGroup(props) {
    var _this;

    (0, _classCallCheck2.default)(this, RadioGroup);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RadioGroup).call(this, props));
    _this.renderControl = _this.renderControl.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(RadioGroup, [{
    key: "onControlChange",
    value: function onControlChange(value, e) {
      if (this.props.onChange) {
        this.props.onChange(e, value);
      }
    }
  }, {
    key: "renderControl",
    value: function renderControl(radio) {
      return this.props.name ? _react.default.cloneElement(radio, {
        name: this.props.name,
        onChange: this.onControlChange.bind(this, radio.props.value)
      }) : radio;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          label = _this$props.label,
          required = _this$props.required,
          error = _this$props.error,
          totalCols = _this$props.totalCols,
          cols = _this$props.cols,
          style = _this$props.style,
          children = _this$props.children,
          onChange = _this$props.onChange,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["className", "label", "required", "error", "totalCols", "cols", "style", "children", "onChange"]);
      var grpClassNames = (0, _classnames.default)(className, 'slds-form-element', {
        'slds-has-error': error,
        'slds-is-required': required
      }, typeof totalCols === 'number' ? "slds-size--".concat(cols || 1, "-of-").concat(totalCols) : null);
      var grpStyles = typeof totalCols === 'number' ? (0, _objectSpread2.default)({
        display: 'inline-block'
      }, style) : style;
      var errorMessage = error ? typeof error === 'string' ? error : (0, _typeof2.default)(error) === 'object' ? error.message : undefined : undefined;
      return _react.default.createElement("fieldset", (0, _extends2.default)({
        className: grpClassNames,
        style: grpStyles
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
  return RadioGroup;
}(_react.default.Component);

exports.RadioGroup = RadioGroup;
(0, _defineProperty2.default)(RadioGroup, "isFormElement", true);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL1JhZGlvR3JvdXAudHN4Il0sIm5hbWVzIjpbIlJhZGlvR3JvdXAiLCJwcm9wcyIsInJlbmRlckNvbnRyb2wiLCJiaW5kIiwidmFsdWUiLCJlIiwib25DaGFuZ2UiLCJyYWRpbyIsIm5hbWUiLCJSZWFjdCIsImNsb25lRWxlbWVudCIsIm9uQ29udHJvbENoYW5nZSIsImNsYXNzTmFtZSIsImxhYmVsIiwicmVxdWlyZWQiLCJlcnJvciIsInRvdGFsQ29scyIsImNvbHMiLCJzdHlsZSIsImNoaWxkcmVuIiwiZ3JwQ2xhc3NOYW1lcyIsImdycFN0eWxlcyIsImRpc3BsYXkiLCJlcnJvck1lc3NhZ2UiLCJtZXNzYWdlIiwidW5kZWZpbmVkIiwiQ2hpbGRyZW4iLCJtYXAiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7SUFjYUEsVTs7Ozs7QUFHWCxzQkFBWUMsS0FBWixFQUE4QztBQUFBOztBQUFBO0FBQzVDLGdIQUFNQSxLQUFOO0FBQ0EsVUFBS0MsYUFBTCxHQUFxQixNQUFLQSxhQUFMLENBQW1CQyxJQUFuQiw2Q0FBckI7QUFGNEM7QUFHN0M7Ozs7b0NBRWVDLEssRUFBWUMsQyxFQUFRO0FBQ2xDLFVBQUksS0FBS0osS0FBTCxDQUFXSyxRQUFmLEVBQXlCO0FBQ3ZCLGFBQUtMLEtBQUwsQ0FBV0ssUUFBWCxDQUFvQkQsQ0FBcEIsRUFBdUJELEtBQXZCO0FBQ0Q7QUFDRjs7O2tDQUVhRyxLLEVBQVk7QUFDeEIsYUFBTyxLQUFLTixLQUFMLENBQVdPLElBQVgsR0FDSEMsZUFBTUMsWUFBTixDQUFtQkgsS0FBbkIsRUFBMEI7QUFDeEJDLFFBQUFBLElBQUksRUFBRSxLQUFLUCxLQUFMLENBQVdPLElBRE87QUFFeEJGLFFBQUFBLFFBQVEsRUFBRSxLQUFLSyxlQUFMLENBQXFCUixJQUFyQixDQUEwQixJQUExQixFQUFnQ0ksS0FBSyxDQUFDTixLQUFOLENBQVlHLEtBQTVDO0FBRmMsT0FBMUIsQ0FERyxHQUtIRyxLQUxKO0FBTUQ7Ozs2QkFFUTtBQUFBLHdCQVlILEtBQUtOLEtBWkY7QUFBQSxVQUVMVyxTQUZLLGVBRUxBLFNBRks7QUFBQSxVQUdMQyxLQUhLLGVBR0xBLEtBSEs7QUFBQSxVQUlMQyxRQUpLLGVBSUxBLFFBSks7QUFBQSxVQUtMQyxLQUxLLGVBS0xBLEtBTEs7QUFBQSxVQU1MQyxTQU5LLGVBTUxBLFNBTks7QUFBQSxVQU9MQyxJQVBLLGVBT0xBLElBUEs7QUFBQSxVQVFMQyxLQVJLLGVBUUxBLEtBUks7QUFBQSxVQVNMQyxRQVRLLGVBU0xBLFFBVEs7QUFBQSxVQVVMYixRQVZLLGVBVUxBLFFBVks7QUFBQSxVQVdGTCxLQVhFO0FBYVAsVUFBTW1CLGFBQWEsR0FBRyx5QkFDcEJSLFNBRG9CLEVBRXBCLG1CQUZvQixFQUdwQjtBQUNFLDBCQUFrQkcsS0FEcEI7QUFFRSw0QkFBb0JEO0FBRnRCLE9BSG9CLEVBT3BCLE9BQU9FLFNBQVAsS0FBcUIsUUFBckIsd0JBQ2tCQyxJQUFJLElBQUksQ0FEMUIsaUJBQ2tDRCxTQURsQyxJQUVJLElBVGdCLENBQXRCO0FBV0EsVUFBTUssU0FBUyxHQUNiLE9BQU9MLFNBQVAsS0FBcUIsUUFBckI7QUFDTU0sUUFBQUEsT0FBTyxFQUFFO0FBRGYsU0FDa0NKLEtBRGxDLElBRUlBLEtBSE47QUFJQSxVQUFNSyxZQUFZLEdBQUdSLEtBQUssR0FDdEIsT0FBT0EsS0FBUCxLQUFpQixRQUFqQixHQUNFQSxLQURGLEdBRUUsc0JBQU9BLEtBQVAsTUFBaUIsUUFBakIsR0FDQUEsS0FBSyxDQUFDUyxPQUROLEdBRUFDLFNBTG9CLEdBTXRCQSxTQU5KO0FBUUEsYUFDRTtBQUFVLFFBQUEsU0FBUyxFQUFFTCxhQUFyQjtBQUFvQyxRQUFBLEtBQUssRUFBRUM7QUFBM0MsU0FBMERwQixLQUExRCxHQUNFO0FBQVEsUUFBQSxTQUFTLEVBQUM7QUFBbEIsU0FDR1ksS0FESCxFQUVHQyxRQUFRLEdBQUc7QUFBTSxRQUFBLFNBQVMsRUFBQztBQUFoQixhQUFILEdBQThDVyxTQUZ6RCxDQURGLEVBS0U7QUFBSyxRQUFBLFNBQVMsRUFBQztBQUFmLFNBQ0doQixlQUFNaUIsUUFBTixDQUFlQyxHQUFmLENBQW1CUixRQUFuQixFQUE2QixLQUFLakIsYUFBbEMsQ0FESCxFQUVHcUIsWUFBWSxHQUNYO0FBQUssUUFBQSxTQUFTLEVBQUM7QUFBZixTQUEwQ0EsWUFBMUMsQ0FEVyxHQUdYRSxTQUxKLENBTEYsQ0FERjtBQWdCRDs7O0VBM0U2QmhCLGVBQU1tQixTOzs7OEJBQXpCNUIsVSxtQkFDWSxJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5leHBvcnQgdHlwZSBSYWRpb0dyb3VwUHJvcHMgPSB7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgbGFiZWw/OiBzdHJpbmc7XG4gIHJlcXVpcmVkPzogYm9vbGVhbjtcbiAgZXJyb3I/OiBhbnk7IC8vIEZJWE1FOiBzaG91bGQgYmUgRm9ybUVsZW1lbnRQcm9wcy5lcnJvclxuICBuYW1lPzogc3RyaW5nO1xuICBvbkNoYW5nZT86IChlOiBhbnksIHZhbHVlOiBhbnkpID0+IHZvaWQ7XG4gIHRvdGFsQ29scz86IG51bWJlcjtcbiAgY29scz86IG51bWJlcjtcbiAgc3R5bGU/OiBvYmplY3Q7XG59O1xuXG5leHBvcnQgY2xhc3MgUmFkaW9Hcm91cCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxSYWRpb0dyb3VwUHJvcHMsIHt9PiB7XG4gIHN0YXRpYyBpc0Zvcm1FbGVtZW50ID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wczogUmVhZG9ubHk8UmFkaW9Hcm91cFByb3BzPikge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnJlbmRlckNvbnRyb2wgPSB0aGlzLnJlbmRlckNvbnRyb2wuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9uQ29udHJvbENoYW5nZSh2YWx1ZTogYW55LCBlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShlLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyQ29udHJvbChyYWRpbzogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMubmFtZVxuICAgICAgPyBSZWFjdC5jbG9uZUVsZW1lbnQocmFkaW8sIHtcbiAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsXG4gICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25Db250cm9sQ2hhbmdlLmJpbmQodGhpcywgcmFkaW8ucHJvcHMudmFsdWUpLFxuICAgICAgICB9KVxuICAgICAgOiByYWRpbztcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjbGFzc05hbWUsXG4gICAgICBsYWJlbCxcbiAgICAgIHJlcXVpcmVkLFxuICAgICAgZXJyb3IsXG4gICAgICB0b3RhbENvbHMsXG4gICAgICBjb2xzLFxuICAgICAgc3R5bGUsXG4gICAgICBjaGlsZHJlbixcbiAgICAgIG9uQ2hhbmdlLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgLi4ucHJvcHNcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBncnBDbGFzc05hbWVzID0gY2xhc3NuYW1lcyhcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgICdzbGRzLWZvcm0tZWxlbWVudCcsXG4gICAgICB7XG4gICAgICAgICdzbGRzLWhhcy1lcnJvcic6IGVycm9yLFxuICAgICAgICAnc2xkcy1pcy1yZXF1aXJlZCc6IHJlcXVpcmVkLFxuICAgICAgfSxcbiAgICAgIHR5cGVvZiB0b3RhbENvbHMgPT09ICdudW1iZXInXG4gICAgICAgID8gYHNsZHMtc2l6ZS0tJHtjb2xzIHx8IDF9LW9mLSR7dG90YWxDb2xzfWBcbiAgICAgICAgOiBudWxsXG4gICAgKTtcbiAgICBjb25zdCBncnBTdHlsZXMgPVxuICAgICAgdHlwZW9mIHRvdGFsQ29scyA9PT0gJ251bWJlcidcbiAgICAgICAgPyB7IGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLCAuLi5zdHlsZSB9XG4gICAgICAgIDogc3R5bGU7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZXJyb3JcbiAgICAgID8gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJ1xuICAgICAgICA/IGVycm9yXG4gICAgICAgIDogdHlwZW9mIGVycm9yID09PSAnb2JqZWN0J1xuICAgICAgICA/IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxmaWVsZHNldCBjbGFzc05hbWU9e2dycENsYXNzTmFtZXN9IHN0eWxlPXtncnBTdHlsZXN9IHsuLi5wcm9wc30+XG4gICAgICAgIDxsZWdlbmQgY2xhc3NOYW1lPSdzbGRzLWZvcm0tZWxlbWVudF9fbGFiZWwgc2xkcy1mb3JtLWVsZW1lbnRfX2xhYmVsLS10b3AnPlxuICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICB7cmVxdWlyZWQgPyA8YWJiciBjbGFzc05hbWU9J3NsZHMtcmVxdWlyZWQnPio8L2FiYnI+IDogdW5kZWZpbmVkfVxuICAgICAgICA8L2xlZ2VuZD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NsZHMtZm9ybS1lbGVtZW50X19jb250cm9sJz5cbiAgICAgICAgICB7UmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCB0aGlzLnJlbmRlckNvbnRyb2wpfVxuICAgICAgICAgIHtlcnJvck1lc3NhZ2UgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2xkcy1mb3JtLWVsZW1lbnRfX2hlbHAnPntlcnJvck1lc3NhZ2V9PC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIHVuZGVmaW5lZFxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9maWVsZHNldD5cbiAgICApO1xuICB9XG59XG4iXX0=