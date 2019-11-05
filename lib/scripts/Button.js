"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonIcon = exports.Button = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _Icon = require("./Icon");

var _Spinner = require("./Spinner");

var ICON_SIZES = ['x-small', 'small', 'medium', 'large'];
var ICON_ALIGNS = ['left', 'right'];

var Button =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Button, _Component);

  function Button(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Button);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Button).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "node", null);
    _this.onClick = _this.onClick.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(Button, [{
    key: "onClick",
    value: function onClick(e) {
      if (this.node !== null) {
        // Safari, FF to trigger focus event on click
        this.node.focus();
      }

      var onClick = this.props.onClick;
      if (onClick) onClick(e);
    }
  }, {
    key: "renderIcon",
    value: function renderIcon(iconSize, inv) {
      var _this$props = this.props,
          icon = _this$props.icon,
          iconAlign = _this$props.iconAlign,
          type = _this$props.type;
      var inverse = inv || /-?inverse$/.test(type || '');
      return _react.default.createElement(ButtonIcon, {
        icon: icon,
        align: iconAlign,
        size: iconSize,
        inverse: inverse
      });
    }
  }, {
    key: "renderIconMore",
    value: function renderIconMore() {
      var _this$props2 = this.props,
          iconMore = _this$props2.iconMore,
          icon = _this$props2.icon,
          iconAlign = _this$props2.iconAlign,
          label = _this$props2.label,
          children = _this$props2.children;
      var adjoining = icon && (iconAlign === 'right' || !(label || children));
      var iconMoreSize = this.props.iconMoreSize || adjoining ? 'x-small' : 'small';
      return _react.default.createElement(ButtonIcon, {
        icon: iconMore,
        align: "right",
        size: iconMoreSize
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames,
          _this2 = this;

      var _this$props3 = this.props,
          className = _this$props3.className,
          type = _this$props3.type,
          size = _this$props3.size,
          icon = _this$props3.icon,
          iconAlign = _this$props3.iconAlign,
          iconMore = _this$props3.iconMore,
          selected = _this$props3.selected,
          alt = _this$props3.alt,
          label = _this$props3.label,
          loading = _this$props3.loading,
          iconSize = _this$props3.iconSize,
          inverse = _this$props3.inverse,
          _this$props3$htmlType = _this$props3.htmlType,
          htmlType = _this$props3$htmlType === void 0 ? 'button' : _this$props3$htmlType,
          children = _this$props3.children,
          buttonRef = _this$props3.buttonRef,
          props = (0, _objectWithoutProperties2.default)(_this$props3, ["className", "type", "size", "icon", "iconAlign", "iconMore", "selected", "alt", "label", "loading", "iconSize", "inverse", "htmlType", "children", "buttonRef"]);
      var typeClassName = type ? "slds-button--".concat(type) : null;
      var btnClassNames = (0, _classnames2.default)(className, 'slds-button', typeClassName, (_classnames = {
        'slds-is-selected': selected
      }, (0, _defineProperty2.default)(_classnames, "slds-button--".concat(size), size && !/^icon-/.test(type || '')), (0, _defineProperty2.default)(_classnames, "slds-button--icon-".concat(size), /^(x-small|small)$/.test(size || '') && /^icon-/.test(type || '')), _classnames));
      return (// eslint-disable-next-line react/button-has-type
        _react.default.createElement("button", (0, _extends2.default)({
          ref: function ref(node) {
            _this2.node = node;
            if (buttonRef) buttonRef(node);
          },
          className: btnClassNames,
          type: htmlType
        }, props, {
          onClick: this.onClick
        }), icon && iconAlign !== 'right' ? this.renderIcon(iconSize, inverse) : null, children || label, icon && iconAlign === 'right' ? this.renderIcon(iconSize, inverse) : null, iconMore ? this.renderIconMore() : null, alt ? _react.default.createElement("span", {
          className: "slds-assistive-text"
        }, alt) : null, loading ? _react.default.createElement(_Spinner.Spinner, null) : null)
      );
    }
  }]);
  return Button;
}(_react.Component);

exports.Button = Button;

var ButtonIcon = function ButtonIcon(_ref) {
  var icon = _ref.icon,
      align = _ref.align,
      size = _ref.size,
      inverse = _ref.inverse,
      className = _ref.className,
      style = _ref.style,
      props = (0, _objectWithoutProperties2.default)(_ref, ["icon", "align", "size", "inverse", "className", "style"]);
  var alignClassName = align && ICON_ALIGNS.indexOf(align) >= 0 ? "slds-button__icon--".concat(align) : null;
  var sizeClassName = size && ICON_SIZES.indexOf(size) >= 0 ? "slds-button__icon--".concat(size) : null;
  var inverseClassName = inverse ? 'slds-button__icon--inverse' : null;
  var iconClassNames = (0, _classnames2.default)('slds-button__icon', alignClassName, sizeClassName, inverseClassName, className);
  return _react.default.createElement(_Icon.Icon, (0, _extends2.default)({
    className: iconClassNames,
    icon: icon,
    textColor: null,
    pointerEvents: "none",
    style: style
  }, props));
};

exports.ButtonIcon = ButtonIcon;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL0J1dHRvbi50c3giXSwibmFtZXMiOlsiSUNPTl9TSVpFUyIsIklDT05fQUxJR05TIiwiQnV0dG9uIiwicHJvcHMiLCJvbkNsaWNrIiwiYmluZCIsImUiLCJub2RlIiwiZm9jdXMiLCJpY29uU2l6ZSIsImludiIsImljb24iLCJpY29uQWxpZ24iLCJ0eXBlIiwiaW52ZXJzZSIsInRlc3QiLCJpY29uTW9yZSIsImxhYmVsIiwiY2hpbGRyZW4iLCJhZGpvaW5pbmciLCJpY29uTW9yZVNpemUiLCJjbGFzc05hbWUiLCJzaXplIiwic2VsZWN0ZWQiLCJhbHQiLCJsb2FkaW5nIiwiaHRtbFR5cGUiLCJidXR0b25SZWYiLCJ0eXBlQ2xhc3NOYW1lIiwiYnRuQ2xhc3NOYW1lcyIsInJlbmRlckljb24iLCJyZW5kZXJJY29uTW9yZSIsIkNvbXBvbmVudCIsIkJ1dHRvbkljb24iLCJhbGlnbiIsInN0eWxlIiwiYWxpZ25DbGFzc05hbWUiLCJpbmRleE9mIiwic2l6ZUNsYXNzTmFtZSIsImludmVyc2VDbGFzc05hbWUiLCJpY29uQ2xhc3NOYW1lcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFrQkEsSUFBTUEsVUFBVSxHQUFHLENBQUMsU0FBRCxFQUFZLE9BQVosRUFBcUIsUUFBckIsRUFBK0IsT0FBL0IsQ0FBbkI7QUFDQSxJQUFNQyxXQUFXLEdBQUcsQ0FBQyxNQUFELEVBQVMsT0FBVCxDQUFwQjs7SUEwQmFDLE07Ozs7O0FBR1gsa0JBQVlDLEtBQVosRUFBMEM7QUFBQTs7QUFBQTtBQUN4Qyw0R0FBTUEsS0FBTjtBQUR3Qyx1RkFGVCxJQUVTO0FBR3hDLFVBQUtDLE9BQUwsR0FBZSxNQUFLQSxPQUFMLENBQWFDLElBQWIsNkNBQWY7QUFId0M7QUFJekM7Ozs7NEJBRU9DLEMsRUFBb0Q7QUFDMUQsVUFBSSxLQUFLQyxJQUFMLEtBQWMsSUFBbEIsRUFBd0I7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QUFwQixLQUE4QixDQUF2QyxnQ0FDMEJBLEtBRDFCLElBRUksSUFITjtBQUlBLE1BQU1JLGFBQWEsR0FDakJoQixJQUFJLElBQUl0QixVQUFVLENBQUNxQyxPQUFYLENBQW1CZixJQUFuQixLQUE0QixDQUFwQyxnQ0FBOERBLElBQTlELElBQXVFLElBRHpFO0FBRUEsTUFBTWlCLGdCQUFnQixHQUFHekIsT0FBTyxHQUFHLDRCQUFILEdBQWtDLElBQWxFO0FBQ0EsTUFBTTBCLGNBQWMsR0FBRywwQkFDckIsbUJBRHFCLEVBRXJCSixjQUZxQixFQUdyQkUsYUFIcUIsRUFJckJDLGdCQUpxQixFQUtyQmxCLFNBTHFCLENBQXZCO0FBT0EsU0FDRSw2QkFBQyxVQUFEO0FBQ0UsSUFBQSxTQUFTLEVBQUVtQixjQURiO0FBRUUsSUFBQSxJQUFJLEVBQUU3QixJQUZSO0FBR0UsSUFBQSxTQUFTLEVBQUUsSUFIYjtBQUlFLElBQUEsYUFBYSxFQUFDLE1BSmhCO0FBS0UsSUFBQSxLQUFLLEVBQUV3QjtBQUxULEtBTU1oQyxLQU5OLEVBREY7QUFVRCxDQWpDTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFJlYWN0Tm9kZSwgQnV0dG9uSFRNTEF0dHJpYnV0ZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IEljb24gfSBmcm9tICcuL0ljb24nO1xuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gJy4vU3Bpbm5lcic7XG5cbnR5cGUgT21pdDxULCBLIGV4dGVuZHMga2V5b2YgVD4gPSBQaWNrPFQsIEV4Y2x1ZGU8a2V5b2YgVCwgSz4+O1xuXG5leHBvcnQgdHlwZSBCdXR0b25UeXBlID1cbiAgfCAnbmV1dHJhbCdcbiAgfCAnYnJhbmQnXG4gIHwgJ2Rlc3RydWN0aXZlJ1xuICB8ICdpbnZlcnNlJ1xuICB8ICdpY29uJ1xuICB8ICdpY29uLWJhcmUnXG4gIHwgJ2ljb24tY29udGFpbmVyJ1xuICB8ICdpY29uLWludmVyc2UnXG4gIHwgJ2ljb24tbW9yZSdcbiAgfCAnaWNvbi1ib3JkZXInXG4gIHwgJ2ljb24tYm9yZGVyLWZpbGxlZCdcbiAgfCAnaWNvbi1ib3JkZXItaW52ZXJzZSc7XG5cbmNvbnN0IElDT05fU0laRVMgPSBbJ3gtc21hbGwnLCAnc21hbGwnLCAnbWVkaXVtJywgJ2xhcmdlJ10gYXMgY29uc3Q7XG5jb25zdCBJQ09OX0FMSUdOUyA9IFsnbGVmdCcsICdyaWdodCddIGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBCdXR0b25TaXplID0gJ3gtc21hbGwnIHwgJ3NtYWxsJyB8ICdtZWRpdW0nIHwgJ2xhcmdlJztcbmV4cG9ydCB0eXBlIEJ1dHRvbkljb25TaXplID0gdHlwZW9mIElDT05fU0laRVNbbnVtYmVyXTtcbmV4cG9ydCB0eXBlIEJ1dHRvbkljb25BbGlnbiA9IHR5cGVvZiBJQ09OX0FMSUdOU1tudW1iZXJdO1xuZXhwb3J0IHR5cGUgQnV0dG9uSWNvbk1vcmVTaXplID0gJ3gtc21hbGwnIHwgJ3NtYWxsJyB8ICdtZWRpdW0nIHwgJ2xhcmdlJztcblxuZXhwb3J0IHR5cGUgQnV0dG9uUHJvcHMgPSB7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgbGFiZWw/OiBSZWFjdE5vZGU7XG4gIGFsdD86IHN0cmluZztcbiAgdHlwZT86IEJ1dHRvblR5cGU7XG4gIHNpemU/OiBCdXR0b25TaXplO1xuICBodG1sVHlwZT86ICdidXR0b24nIHwgJ3N1Ym1pdCcgfCAncmVzZXQnO1xuICBzZWxlY3RlZD86IGJvb2xlYW47XG4gIGludmVyc2U/OiBib29sZWFuO1xuICBsb2FkaW5nPzogYm9vbGVhbjtcbiAgaWNvbj86IHN0cmluZztcbiAgaWNvblNpemU/OiBCdXR0b25JY29uU2l6ZTtcbiAgaWNvbkFsaWduPzogQnV0dG9uSWNvbkFsaWduO1xuICBpY29uTW9yZT86IHN0cmluZztcbiAgaWNvbk1vcmVTaXplPzogQnV0dG9uSWNvbk1vcmVTaXplO1xuICBvbkNsaWNrPzogKGU6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQsIE1vdXNlRXZlbnQ+KSA9PiB2b2lkO1xuICBidXR0b25SZWY/OiAobm9kZTogSFRNTEJ1dHRvbkVsZW1lbnQpID0+IHZvaWQ7XG59ICYgT21pdDxCdXR0b25IVE1MQXR0cmlidXRlczxIVE1MQnV0dG9uRWxlbWVudD4sICd0eXBlJz47XG5cbmV4cG9ydCBjbGFzcyBCdXR0b24gZXh0ZW5kcyBDb21wb25lbnQ8QnV0dG9uUHJvcHMsIHt9PiB7XG4gIG5vZGU6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IFJlYWRvbmx5PEJ1dHRvblByb3BzPikge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMub25DbGljayA9IHRoaXMub25DbGljay5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25DbGljayhlOiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50LCBNb3VzZUV2ZW50Pikge1xuICAgIGlmICh0aGlzLm5vZGUgIT09IG51bGwpIHtcbiAgICAgIC8vIFNhZmFyaSwgRkYgdG8gdHJpZ2dlciBmb2N1cyBldmVudCBvbiBjbGlja1xuICAgICAgdGhpcy5ub2RlLmZvY3VzKCk7XG4gICAgfVxuICAgIGNvbnN0IHsgb25DbGljayB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAob25DbGljaykgb25DbGljayhlKTtcbiAgfVxuXG4gIHJlbmRlckljb24oaWNvblNpemU6IEJ1dHRvblByb3BzWydpY29uU2l6ZSddLCBpbnY6IEJ1dHRvblByb3BzWydpbnZlcnNlJ10pIHtcbiAgICBjb25zdCB7IGljb24sIGljb25BbGlnbiwgdHlwZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpbnZlcnNlID0gaW52IHx8IC8tP2ludmVyc2UkLy50ZXN0KHR5cGUgfHwgJycpO1xuICAgIHJldHVybiAoXG4gICAgICA8QnV0dG9uSWNvblxuICAgICAgICBpY29uPXtpY29uIX1cbiAgICAgICAgYWxpZ249e2ljb25BbGlnbn1cbiAgICAgICAgc2l6ZT17aWNvblNpemV9XG4gICAgICAgIGludmVyc2U9e2ludmVyc2V9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICByZW5kZXJJY29uTW9yZSgpIHtcbiAgICBjb25zdCB7IGljb25Nb3JlLCBpY29uLCBpY29uQWxpZ24sIGxhYmVsLCBjaGlsZHJlbiB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBhZGpvaW5pbmcgPSBpY29uICYmIChpY29uQWxpZ24gPT09ICdyaWdodCcgfHwgIShsYWJlbCB8fCBjaGlsZHJlbikpO1xuICAgIGNvbnN0IGljb25Nb3JlU2l6ZSA9XG4gICAgICB0aGlzLnByb3BzLmljb25Nb3JlU2l6ZSB8fCBhZGpvaW5pbmcgPyAneC1zbWFsbCcgOiAnc21hbGwnO1xuICAgIHJldHVybiA8QnV0dG9uSWNvbiBpY29uPXtpY29uTW9yZSF9IGFsaWduPSdyaWdodCcgc2l6ZT17aWNvbk1vcmVTaXplfSAvPjtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjbGFzc05hbWUsXG4gICAgICB0eXBlLFxuICAgICAgc2l6ZSxcbiAgICAgIGljb24sXG4gICAgICBpY29uQWxpZ24sXG4gICAgICBpY29uTW9yZSxcbiAgICAgIHNlbGVjdGVkLFxuICAgICAgYWx0LFxuICAgICAgbGFiZWwsXG4gICAgICBsb2FkaW5nLFxuICAgICAgaWNvblNpemUsXG4gICAgICBpbnZlcnNlLFxuICAgICAgaHRtbFR5cGUgPSAnYnV0dG9uJyxcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgYnV0dG9uUmVmLFxuICAgICAgLi4ucHJvcHNcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB0eXBlQ2xhc3NOYW1lID0gdHlwZSA/IGBzbGRzLWJ1dHRvbi0tJHt0eXBlfWAgOiBudWxsO1xuICAgIGNvbnN0IGJ0bkNsYXNzTmFtZXMgPSBjbGFzc25hbWVzKGNsYXNzTmFtZSwgJ3NsZHMtYnV0dG9uJywgdHlwZUNsYXNzTmFtZSwge1xuICAgICAgJ3NsZHMtaXMtc2VsZWN0ZWQnOiBzZWxlY3RlZCxcbiAgICAgIFtgc2xkcy1idXR0b24tLSR7c2l6ZX1gXTogc2l6ZSAmJiAhL15pY29uLS8udGVzdCh0eXBlIHx8ICcnKSxcbiAgICAgIFtgc2xkcy1idXR0b24tLWljb24tJHtzaXplfWBdOlxuICAgICAgICAvXih4LXNtYWxsfHNtYWxsKSQvLnRlc3Qoc2l6ZSB8fCAnJykgJiYgL15pY29uLS8udGVzdCh0eXBlIHx8ICcnKSxcbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QvYnV0dG9uLWhhcy10eXBlXG4gICAgICA8YnV0dG9uXG4gICAgICAgIHJlZj17KG5vZGU6IEhUTUxCdXR0b25FbGVtZW50KSA9PiB7XG4gICAgICAgICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgICAgICAgICBpZiAoYnV0dG9uUmVmKSBidXR0b25SZWYobm9kZSk7XG4gICAgICAgIH19XG4gICAgICAgIGNsYXNzTmFtZT17YnRuQ2xhc3NOYW1lc31cbiAgICAgICAgdHlwZT17aHRtbFR5cGV9XG4gICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrfVxuICAgICAgPlxuICAgICAgICB7aWNvbiAmJiBpY29uQWxpZ24gIT09ICdyaWdodCdcbiAgICAgICAgICA/IHRoaXMucmVuZGVySWNvbihpY29uU2l6ZSwgaW52ZXJzZSlcbiAgICAgICAgICA6IG51bGx9XG4gICAgICAgIHtjaGlsZHJlbiB8fCBsYWJlbH1cbiAgICAgICAge2ljb24gJiYgaWNvbkFsaWduID09PSAncmlnaHQnXG4gICAgICAgICAgPyB0aGlzLnJlbmRlckljb24oaWNvblNpemUsIGludmVyc2UpXG4gICAgICAgICAgOiBudWxsfVxuICAgICAgICB7aWNvbk1vcmUgPyB0aGlzLnJlbmRlckljb25Nb3JlKCkgOiBudWxsfVxuICAgICAgICB7YWx0ID8gPHNwYW4gY2xhc3NOYW1lPSdzbGRzLWFzc2lzdGl2ZS10ZXh0Jz57YWx0fTwvc3Bhbj4gOiBudWxsfVxuICAgICAgICB7bG9hZGluZyA/IDxTcGlubmVyIC8+IDogbnVsbH1cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgQnV0dG9uSWNvblByb3BzID0ge1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGljb246IHN0cmluZztcbiAgYWxpZ24/OiBCdXR0b25JY29uQWxpZ247XG4gIHNpemU/OiBCdXR0b25JY29uU2l6ZTtcbiAgaW52ZXJzZT86IGJvb2xlYW47XG4gIHN0eWxlPzogb2JqZWN0O1xufTtcblxuZXhwb3J0IGNvbnN0IEJ1dHRvbkljb246IFJlYWN0LkZDPEJ1dHRvbkljb25Qcm9wcz4gPSAoe1xuICBpY29uLFxuICBhbGlnbixcbiAgc2l6ZSxcbiAgaW52ZXJzZSxcbiAgY2xhc3NOYW1lLFxuICBzdHlsZSxcbiAgLi4ucHJvcHNcbn0pID0+IHtcbiAgY29uc3QgYWxpZ25DbGFzc05hbWUgPVxuICAgIGFsaWduICYmIElDT05fQUxJR05TLmluZGV4T2YoYWxpZ24pID49IDBcbiAgICAgID8gYHNsZHMtYnV0dG9uX19pY29uLS0ke2FsaWdufWBcbiAgICAgIDogbnVsbDtcbiAgY29uc3Qgc2l6ZUNsYXNzTmFtZSA9XG4gICAgc2l6ZSAmJiBJQ09OX1NJWkVTLmluZGV4T2Yoc2l6ZSkgPj0gMCA/IGBzbGRzLWJ1dHRvbl9faWNvbi0tJHtzaXplfWAgOiBudWxsO1xuICBjb25zdCBpbnZlcnNlQ2xhc3NOYW1lID0gaW52ZXJzZSA/ICdzbGRzLWJ1dHRvbl9faWNvbi0taW52ZXJzZScgOiBudWxsO1xuICBjb25zdCBpY29uQ2xhc3NOYW1lcyA9IGNsYXNzbmFtZXMoXG4gICAgJ3NsZHMtYnV0dG9uX19pY29uJyxcbiAgICBhbGlnbkNsYXNzTmFtZSxcbiAgICBzaXplQ2xhc3NOYW1lLFxuICAgIGludmVyc2VDbGFzc05hbWUsXG4gICAgY2xhc3NOYW1lXG4gICk7XG4gIHJldHVybiAoXG4gICAgPEljb25cbiAgICAgIGNsYXNzTmFtZT17aWNvbkNsYXNzTmFtZXN9XG4gICAgICBpY29uPXtpY29ufVxuICAgICAgdGV4dENvbG9yPXtudWxsfVxuICAgICAgcG9pbnRlckV2ZW50cz0nbm9uZSdcbiAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgIHsuLi5wcm9wc31cbiAgICAvPlxuICApO1xufTtcbiJdfQ==