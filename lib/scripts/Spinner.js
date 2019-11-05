"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spinner = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _util = require("./util");

var Spinner =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Spinner, _React$Component);

  function Spinner(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Spinner);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Spinner).call(this, props));
    (0, _util.registerStyle)('spinner-overlay', [['body .slds .slds-spinner_container', '{ z-index: 9002 }']]);
    return _this;
  }

  (0, _createClass2.default)(Spinner, [{
    key: "renderSpinner",
    value: function renderSpinner(props) {
      var className = props.className,
          size = props.size,
          type = props.type,
          pprops = (0, _objectWithoutProperties2.default)(props, ["className", "size", "type"]);
      var spinnerClassNames = (0, _classnames.default)(className, 'slds-spinner', "slds-spinner--".concat(size), type ? "slds-spinner--".concat(type) : null);
      return _react.default.createElement("div", (0, _extends2.default)({
        className: spinnerClassNames,
        "aria-hidden": "false",
        role: "alert"
      }, pprops), _react.default.createElement("div", {
        className: "slds-spinner__dot-a"
      }), _react.default.createElement("div", {
        className: "slds-spinner__dot-b"
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$container = _this$props.container,
          container = _this$props$container === void 0 ? true : _this$props$container,
          _this$props$size = _this$props.size,
          size = _this$props$size === void 0 ? 'small' : _this$props$size,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["container", "size"]);
      return container ? _react.default.createElement("div", {
        className: "slds-spinner_container"
      }, this.renderSpinner((0, _objectSpread2.default)({
        size: size
      }, props))) : this.renderSpinner((0, _objectSpread2.default)({
        size: size
      }, props));
    }
  }]);
  return Spinner;
}(_react.default.Component);

exports.Spinner = Spinner;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL1NwaW5uZXIudHN4Il0sIm5hbWVzIjpbIlNwaW5uZXIiLCJwcm9wcyIsImNsYXNzTmFtZSIsInNpemUiLCJ0eXBlIiwicHByb3BzIiwic3Bpbm5lckNsYXNzTmFtZXMiLCJjb250YWluZXIiLCJyZW5kZXJTcGlubmVyIiwiUmVhY3QiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7SUFXYUEsTzs7Ozs7QUFDWCxtQkFBWUMsS0FBWixFQUEyQztBQUFBOztBQUFBO0FBQ3pDLDZHQUFNQSxLQUFOO0FBQ0EsNkJBQWMsaUJBQWQsRUFBaUMsQ0FDL0IsQ0FBQyxvQ0FBRCxFQUF1QyxtQkFBdkMsQ0FEK0IsQ0FBakM7QUFGeUM7QUFLMUM7Ozs7a0NBRWFBLEssRUFBWTtBQUFBLFVBQ2hCQyxTQURnQixHQUNxQkQsS0FEckIsQ0FDaEJDLFNBRGdCO0FBQUEsVUFDTEMsSUFESyxHQUNxQkYsS0FEckIsQ0FDTEUsSUFESztBQUFBLFVBQ0NDLElBREQsR0FDcUJILEtBRHJCLENBQ0NHLElBREQ7QUFBQSxVQUNVQyxNQURWLDBDQUNxQkosS0FEckI7QUFFeEIsVUFBTUssaUJBQWlCLEdBQUcseUJBQ3hCSixTQUR3QixFQUV4QixjQUZ3QiwwQkFHUEMsSUFITyxHQUl4QkMsSUFBSSwyQkFBb0JBLElBQXBCLElBQTZCLElBSlQsQ0FBMUI7QUFPQSxhQUNFO0FBQ0UsUUFBQSxTQUFTLEVBQUVFLGlCQURiO0FBRUUsdUJBQVksT0FGZDtBQUdFLFFBQUEsSUFBSSxFQUFDO0FBSFAsU0FJTUQsTUFKTixHQU1FO0FBQUssUUFBQSxTQUFTLEVBQUM7QUFBZixRQU5GLEVBT0U7QUFBSyxRQUFBLFNBQVMsRUFBQztBQUFmLFFBUEYsQ0FERjtBQVdEOzs7NkJBRVE7QUFBQSx3QkFLVyxLQUFLSixLQUxoQjtBQUFBLDhDQUVMTSxTQUZLO0FBQUEsVUFFTEEsU0FGSyxzQ0FFTyxJQUZQO0FBQUEseUNBR0xKLElBSEs7QUFBQSxVQUdMQSxJQUhLLGlDQUdFLE9BSEY7QUFBQSxVQUlGRixLQUpFO0FBT1AsYUFBT00sU0FBUyxHQUNkO0FBQUssUUFBQSxTQUFTLEVBQUM7QUFBZixTQUNHLEtBQUtDLGFBQUw7QUFBcUJMLFFBQUFBLElBQUksRUFBSkE7QUFBckIsU0FBOEJGLEtBQTlCLEVBREgsQ0FEYyxHQUtkLEtBQUtPLGFBQUw7QUFBcUJMLFFBQUFBLElBQUksRUFBSkE7QUFBckIsU0FBOEJGLEtBQTlCLEVBTEY7QUFPRDs7O0VBNUMwQlEsZUFBTUMsUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBIVE1MQXR0cmlidXRlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgcmVnaXN0ZXJTdHlsZSB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCB0eXBlIFNwaW5uZXJTaXplID0gJ3NtYWxsJyB8ICdtZWRpdW0nIHwgJ2xhcmdlJztcbmV4cG9ydCB0eXBlIFNwaW5uZXJUeXBlID0gJ2JyYW5kJyB8ICdpbnZlcnNlJztcbmV4cG9ydCB0eXBlIFNwaW5uZXJQcm9wcyA9IHtcbiAgY29udGFpbmVyPzogYm9vbGVhbjtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBzaXplPzogU3Bpbm5lclNpemU7XG4gIHR5cGU/OiBTcGlubmVyVHlwZTtcbn0gJiBIVE1MQXR0cmlidXRlczxIVE1MRGl2RWxlbWVudD47XG5cbmV4cG9ydCBjbGFzcyBTcGlubmVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFNwaW5uZXJQcm9wcywge30+IHtcbiAgY29uc3RydWN0b3IocHJvcHM6IFJlYWRvbmx5PFNwaW5uZXJQcm9wcz4pIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgcmVnaXN0ZXJTdHlsZSgnc3Bpbm5lci1vdmVybGF5JywgW1xuICAgICAgWydib2R5IC5zbGRzIC5zbGRzLXNwaW5uZXJfY29udGFpbmVyJywgJ3sgei1pbmRleDogOTAwMiB9J10sXG4gICAgXSk7XG4gIH1cblxuICByZW5kZXJTcGlubmVyKHByb3BzOiBhbnkpIHtcbiAgICBjb25zdCB7IGNsYXNzTmFtZSwgc2l6ZSwgdHlwZSwgLi4ucHByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBzcGlubmVyQ2xhc3NOYW1lcyA9IGNsYXNzbmFtZXMoXG4gICAgICBjbGFzc05hbWUsXG4gICAgICAnc2xkcy1zcGlubmVyJyxcbiAgICAgIGBzbGRzLXNwaW5uZXItLSR7c2l6ZX1gLFxuICAgICAgdHlwZSA/IGBzbGRzLXNwaW5uZXItLSR7dHlwZX1gIDogbnVsbFxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e3NwaW5uZXJDbGFzc05hbWVzfVxuICAgICAgICBhcmlhLWhpZGRlbj0nZmFsc2UnXG4gICAgICAgIHJvbGU9J2FsZXJ0J1xuICAgICAgICB7Li4ucHByb3BzfVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2xkcy1zcGlubmVyX19kb3QtYScgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NsZHMtc3Bpbm5lcl9fZG90LWInIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbnRhaW5lciA9IHRydWUsXG4gICAgICBzaXplID0gJ3NtYWxsJyxcbiAgICAgIC4uLnByb3BzXG4gICAgfTogU3Bpbm5lclByb3BzID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiBjb250YWluZXIgPyAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nc2xkcy1zcGlubmVyX2NvbnRhaW5lcic+XG4gICAgICAgIHt0aGlzLnJlbmRlclNwaW5uZXIoeyBzaXplLCAuLi5wcm9wcyB9KX1cbiAgICAgIDwvZGl2PlxuICAgICkgOiAoXG4gICAgICB0aGlzLnJlbmRlclNwaW5uZXIoeyBzaXplLCAuLi5wcm9wcyB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==