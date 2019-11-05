"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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

var _classnames = _interopRequireDefault(require("classnames"));

var _keycoder = _interopRequireDefault(require("keycoder"));

var _Icon = require("./Icon");

var _FormElement = require("./FormElement");

var _Text = require("./Text");

var _util = require("./util");

var Input =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Input, _Component);

  function Input(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Input);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Input).call(this, props));
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)(_this));
    _this.onKeyDown = _this.onKeyDown.bind((0, _assertThisInitialized2.default)(_this));

    _this.registerIconStyle();

    return _this;
  }

  (0, _createClass2.default)(Input, [{
    key: "onChange",
    value: function onChange(e) {
      var value = e.target.value;

      if (this.props.onChange) {
        this.props.onChange(e, value);
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      var _this$props = this.props,
          symbolPattern = _this$props.symbolPattern,
          onKeyDown = _this$props.onKeyDown;

      if (symbolPattern) {
        var keyCode = e.keyCode,
            shiftKey = e.shiftKey;

        var _value = _keycoder.default.toCharacter(keyCode, shiftKey);

        if (_value && !_value.match(new RegExp(symbolPattern))) {
          e.preventDefault();
          return;
        }
      }

      if (onKeyDown) {
        onKeyDown(e);
      }
    }
  }, {
    key: "registerIconStyle",
    value: function registerIconStyle() {
      (0, _util.registerStyle)('input-icons', [// fix styles of double-iconed input
      ['.slds-input-has-icon--left-right .slds-input__icon--right', '{ left: auto; }']]);
    }
  }, {
    key: "renderAddon",
    value: function renderAddon(content) {
      return _react.default.createElement(_Text.Text, {
        tag: "span",
        className: "slds-form-element__addon",
        category: "body",
        type: "regular"
      }, content);
    }
  }, {
    key: "renderIcon",
    value: function renderIcon(icon, align) {
      return _react.default.isValidElement(icon) ? icon : _react.default.createElement(_Icon.Icon, {
        icon: icon,
        className: (0, _classnames.default)('slds-input__icon', "slds-input__icon--".concat(align), 'slds-icon-text-default')
      });
    }
  }, {
    key: "renderInput",
    value: function renderInput(props) {
      var id = props.id,
          readOnly = props.readOnly,
          className = props.className,
          inputRef = props.inputRef,
          type = props.type,
          bare = props.bare,
          value = props.value,
          defaultValue = props.defaultValue,
          htmlReadOnly = props.htmlReadOnly,
          pprops = (0, _objectWithoutProperties2.default)(props, ["id", "readOnly", "className", "inputRef", "type", "bare", "value", "defaultValue", "htmlReadOnly"]);
      var inputClassNames = (0, _classnames.default)(className, bare ? 'slds-input--bare' : 'slds-input');
      return readOnly ? _react.default.createElement(_Text.Text, {
        type: "regular",
        category: "body",
        className: "slds-form-element__static",
        id: id
      }, value) : _react.default.createElement("input", (0, _extends2.default)({
        ref: inputRef,
        className: inputClassNames,
        id: id,
        type: type,
        value: value,
        defaultValue: defaultValue,
        readOnly: htmlReadOnly
      }, pprops, {
        onChange: this.onChange,
        onKeyDown: this.onKeyDown
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          _this$props2$id = _this$props2.id,
          id = _this$props2$id === void 0 ? "input-".concat((0, _util.uuid)()) : _this$props2$id,
          label = _this$props2.label,
          required = _this$props2.required,
          error = _this$props2.error,
          readOnly = _this$props2.readOnly,
          totalCols = _this$props2.totalCols,
          cols = _this$props2.cols,
          props = (0, _objectWithoutProperties2.default)(_this$props2, ["id", "label", "required", "error", "readOnly", "totalCols", "cols"]);

      if (label || required || error || totalCols || cols) {
        var formElemProps = {
          id: id,
          label: label,
          required: required,
          error: error,
          readOnly: readOnly,
          totalCols: totalCols,
          cols: cols
        };
        return _react.default.createElement(_FormElement.FormElement, formElemProps, _react.default.createElement(Input, (0, _objectSpread2.default)({
          id: id,
          readOnly: readOnly
        }, props)));
      }

      var iconLeft = props.iconLeft,
          iconRight = props.iconRight,
          addonLeft = props.addonLeft,
          addonRight = props.addonRight,
          pprops = (0, _objectWithoutProperties2.default)(props, ["iconLeft", "iconRight", "addonLeft", "addonRight"]);
      var inputProps = (0, _objectSpread2.default)({}, pprops, {
        id: id,
        readOnly: readOnly
      });

      if (iconLeft || iconRight || addonLeft || addonRight) {
        var wrapperClassName = (0, _classnames.default)('slds-form-element__control', {
          'slds-input-has-icon': iconLeft || iconRight
        }, {
          'slds-input-has-icon--left-right': iconLeft && iconRight
        }, {
          'slds-input-has-icon--left': iconLeft
        }, {
          'slds-input-has-icon--right': iconRight
        }, {
          'slds-input-has-fixed-addon': addonLeft || addonRight
        });
        return _react.default.createElement("div", {
          className: wrapperClassName
        }, addonLeft ? this.renderAddon(addonLeft) : undefined, iconLeft ? this.renderIcon(iconLeft, 'left') : undefined, this.renderInput(inputProps), iconRight ? this.renderIcon(iconRight, 'right') : undefined, addonRight ? this.renderAddon(addonRight) : undefined);
      }

      return this.renderInput(inputProps);
    }
  }]);
  return Input;
}(_react.Component);

exports.Input = Input;
(0, _defineProperty2.default)(Input, "isFormElement", true);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL0lucHV0LnRzeCJdLCJuYW1lcyI6WyJJbnB1dCIsInByb3BzIiwib25DaGFuZ2UiLCJiaW5kIiwib25LZXlEb3duIiwicmVnaXN0ZXJJY29uU3R5bGUiLCJlIiwidmFsdWUiLCJ0YXJnZXQiLCJzeW1ib2xQYXR0ZXJuIiwia2V5Q29kZSIsInNoaWZ0S2V5Iiwia2V5Y29kZXIiLCJ0b0NoYXJhY3RlciIsIm1hdGNoIiwiUmVnRXhwIiwicHJldmVudERlZmF1bHQiLCJjb250ZW50IiwiaWNvbiIsImFsaWduIiwiUmVhY3QiLCJpc1ZhbGlkRWxlbWVudCIsImlkIiwicmVhZE9ubHkiLCJjbGFzc05hbWUiLCJpbnB1dFJlZiIsInR5cGUiLCJiYXJlIiwiZGVmYXVsdFZhbHVlIiwiaHRtbFJlYWRPbmx5IiwicHByb3BzIiwiaW5wdXRDbGFzc05hbWVzIiwibGFiZWwiLCJyZXF1aXJlZCIsImVycm9yIiwidG90YWxDb2xzIiwiY29scyIsImZvcm1FbGVtUHJvcHMiLCJpY29uTGVmdCIsImljb25SaWdodCIsImFkZG9uTGVmdCIsImFkZG9uUmlnaHQiLCJpbnB1dFByb3BzIiwid3JhcHBlckNsYXNzTmFtZSIsInJlbmRlckFkZG9uIiwidW5kZWZpbmVkIiwicmVuZGVySWNvbiIsInJlbmRlcklucHV0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0lBNEJhQSxLOzs7OztBQUdYLGlCQUFZQyxLQUFaLEVBQXlDO0FBQUE7O0FBQUE7QUFDdkMsMkdBQU1BLEtBQU47QUFDQSxVQUFLQyxRQUFMLEdBQWdCLE1BQUtBLFFBQUwsQ0FBY0MsSUFBZCw2Q0FBaEI7QUFDQSxVQUFLQyxTQUFMLEdBQWlCLE1BQUtBLFNBQUwsQ0FBZUQsSUFBZiw2Q0FBakI7O0FBQ0EsVUFBS0UsaUJBQUw7O0FBSnVDO0FBS3hDOzs7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TCxDQUFnQlAsU0FBaEIsRUFBMkIsT0FBM0IsQ0FBSCxHQUF5Q00sU0FKckQsRUFLR0osVUFBVSxHQUFHLEtBQUtHLFdBQUwsQ0FBaUJILFVBQWpCLENBQUgsR0FBa0NJLFNBTC9DLENBREY7QUFTRDs7QUFDRCxhQUFPLEtBQUtFLFdBQUwsQ0FBaUJMLFVBQWpCLENBQVA7QUFDRDs7O0VBakt3Qk0sZ0I7Ozs4QkFBZGhELEssbUJBQ1ksSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIElucHV0SFRNTEF0dHJpYnV0ZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBrZXljb2RlciBmcm9tICdrZXljb2Rlcic7XG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnLi9JY29uJztcbmltcG9ydCB7IEZvcm1FbGVtZW50LCBGb3JtRWxlbWVudFByb3BzIH0gZnJvbSAnLi9Gb3JtRWxlbWVudCc7XG5pbXBvcnQgeyBUZXh0IH0gZnJvbSAnLi9UZXh0JztcbmltcG9ydCB7IHV1aWQsIHJlZ2lzdGVyU3R5bGUgfSBmcm9tICcuL3V0aWwnO1xuXG50eXBlIE9taXQ8VCwgSyBleHRlbmRzIGtleW9mIFQ+ID0gUGljazxULCBFeGNsdWRlPGtleW9mIFQsIEs+PjtcblxuZXhwb3J0IHR5cGUgSW5wdXRQcm9wcyA9IHtcbiAgaWQ/OiBzdHJpbmc7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgbGFiZWw/OiBzdHJpbmc7XG4gIHJlcXVpcmVkPzogYm9vbGVhbjtcbiAgZXJyb3I/OiBGb3JtRWxlbWVudFByb3BzWydlcnJvciddO1xuICB0b3RhbENvbHM/OiBudW1iZXI7XG4gIGNvbHM/OiBudW1iZXI7XG4gIHZhbHVlPzogc3RyaW5nO1xuICBkZWZhdWx0VmFsdWU/OiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICBiYXJlPzogYm9vbGVhbjtcbiAgc3ltYm9sUGF0dGVybj86IHN0cmluZztcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBodG1sUmVhZE9ubHk/OiBib29sZWFuO1xuICBpY29uTGVmdD86IHN0cmluZyB8IEpTWC5FbGVtZW50O1xuICBpY29uUmlnaHQ/OiBzdHJpbmcgfCBKU1guRWxlbWVudDtcbiAgYWRkb25MZWZ0Pzogc3RyaW5nO1xuICBhZGRvblJpZ2h0Pzogc3RyaW5nO1xuICBvbkNoYW5nZT86IChlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PiwgdmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25LZXlEb3duPzogKGU6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHZvaWQ7XG4gIGlucHV0UmVmPzogKG5vZGU6IEhUTUxJbnB1dEVsZW1lbnQpID0+IHZvaWQ7XG59ICYgT21pdDxJbnB1dEhUTUxBdHRyaWJ1dGVzPEhUTUxJbnB1dEVsZW1lbnQ+LCAnb25DaGFuZ2UnPjtcblxuZXhwb3J0IGNsYXNzIElucHV0IGV4dGVuZHMgQ29tcG9uZW50PElucHV0UHJvcHM+IHtcbiAgc3RhdGljIGlzRm9ybUVsZW1lbnQgPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBSZWFkb25seTxJbnB1dFByb3BzPikge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLm9uQ2hhbmdlID0gdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25LZXlEb3duID0gdGhpcy5vbktleURvd24uYmluZCh0aGlzKTtcbiAgICB0aGlzLnJlZ2lzdGVySWNvblN0eWxlKCk7XG4gIH1cblxuICBvbkNoYW5nZShlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50Pikge1xuICAgIGNvbnN0IHsgdmFsdWUgfSA9IGUudGFyZ2V0O1xuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGUsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBvbktleURvd24oZTogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MSW5wdXRFbGVtZW50Pikge1xuICAgIGNvbnN0IHsgc3ltYm9sUGF0dGVybiwgb25LZXlEb3duIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChzeW1ib2xQYXR0ZXJuKSB7XG4gICAgICBjb25zdCB7IGtleUNvZGUsIHNoaWZ0S2V5IH0gPSBlO1xuICAgICAgY29uc3QgdmFsdWUgPSBrZXljb2Rlci50b0NoYXJhY3RlcihrZXlDb2RlLCBzaGlmdEtleSk7XG4gICAgICBpZiAodmFsdWUgJiYgIXZhbHVlLm1hdGNoKG5ldyBSZWdFeHAoc3ltYm9sUGF0dGVybikpKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob25LZXlEb3duKSB7XG4gICAgICBvbktleURvd24oZSk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJJY29uU3R5bGUoKSB7XG4gICAgcmVnaXN0ZXJTdHlsZSgnaW5wdXQtaWNvbnMnLCBbXG4gICAgICAvLyBmaXggc3R5bGVzIG9mIGRvdWJsZS1pY29uZWQgaW5wdXRcbiAgICAgIFtcbiAgICAgICAgJy5zbGRzLWlucHV0LWhhcy1pY29uLS1sZWZ0LXJpZ2h0IC5zbGRzLWlucHV0X19pY29uLS1yaWdodCcsXG4gICAgICAgICd7IGxlZnQ6IGF1dG87IH0nLFxuICAgICAgXSxcbiAgICBdKTtcbiAgfVxuXG4gIHJlbmRlckFkZG9uKGNvbnRlbnQ6IHN0cmluZykge1xuICAgIHJldHVybiAoXG4gICAgICA8VGV4dFxuICAgICAgICB0YWc9J3NwYW4nXG4gICAgICAgIGNsYXNzTmFtZT0nc2xkcy1mb3JtLWVsZW1lbnRfX2FkZG9uJ1xuICAgICAgICBjYXRlZ29yeT0nYm9keSdcbiAgICAgICAgdHlwZT0ncmVndWxhcidcbiAgICAgID5cbiAgICAgICAge2NvbnRlbnR9XG4gICAgICA8L1RleHQ+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlckljb24oaWNvbjogYW55LCBhbGlnbjogJ2xlZnQnIHwgJ3JpZ2h0Jykge1xuICAgIHJldHVybiBSZWFjdC5pc1ZhbGlkRWxlbWVudChpY29uKSA/IChcbiAgICAgIGljb25cbiAgICApIDogKFxuICAgICAgPEljb25cbiAgICAgICAgaWNvbj17aWNvbn1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFxuICAgICAgICAgICdzbGRzLWlucHV0X19pY29uJyxcbiAgICAgICAgICBgc2xkcy1pbnB1dF9faWNvbi0tJHthbGlnbn1gLFxuICAgICAgICAgICdzbGRzLWljb24tdGV4dC1kZWZhdWx0J1xuICAgICAgICApfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVySW5wdXQocHJvcHM6IElucHV0UHJvcHMpIHtcbiAgICBjb25zdCB7XG4gICAgICBpZCxcbiAgICAgIHJlYWRPbmx5LFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgaW5wdXRSZWYsXG4gICAgICB0eXBlLFxuICAgICAgYmFyZSxcbiAgICAgIHZhbHVlLFxuICAgICAgZGVmYXVsdFZhbHVlLFxuICAgICAgaHRtbFJlYWRPbmx5LFxuICAgICAgLi4ucHByb3BzXG4gICAgfSA9IHByb3BzO1xuICAgIGNvbnN0IGlucHV0Q2xhc3NOYW1lcyA9IGNsYXNzbmFtZXMoXG4gICAgICBjbGFzc05hbWUsXG4gICAgICBiYXJlID8gJ3NsZHMtaW5wdXQtLWJhcmUnIDogJ3NsZHMtaW5wdXQnXG4gICAgKTtcbiAgICByZXR1cm4gcmVhZE9ubHkgPyAoXG4gICAgICA8VGV4dFxuICAgICAgICB0eXBlPSdyZWd1bGFyJ1xuICAgICAgICBjYXRlZ29yeT0nYm9keSdcbiAgICAgICAgY2xhc3NOYW1lPSdzbGRzLWZvcm0tZWxlbWVudF9fc3RhdGljJ1xuICAgICAgICBpZD17aWR9XG4gICAgICA+XG4gICAgICAgIHt2YWx1ZX1cbiAgICAgIDwvVGV4dD5cbiAgICApIDogKFxuICAgICAgPGlucHV0XG4gICAgICAgIHJlZj17aW5wdXRSZWZ9XG4gICAgICAgIGNsYXNzTmFtZT17aW5wdXRDbGFzc05hbWVzfVxuICAgICAgICBpZD17aWR9XG4gICAgICAgIHR5cGU9e3R5cGV9XG4gICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgZGVmYXVsdFZhbHVlPXtkZWZhdWx0VmFsdWV9XG4gICAgICAgIHJlYWRPbmx5PXtodG1sUmVhZE9ubHl9XG4gICAgICAgIHsuLi5wcHJvcHN9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuICAgICAgICBvbktleURvd249e3RoaXMub25LZXlEb3dufVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGlkID0gYGlucHV0LSR7dXVpZCgpfWAsXG4gICAgICBsYWJlbCxcbiAgICAgIHJlcXVpcmVkLFxuICAgICAgZXJyb3IsXG4gICAgICByZWFkT25seSxcbiAgICAgIHRvdGFsQ29scyxcbiAgICAgIGNvbHMsXG4gICAgICAuLi5wcm9wc1xuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChsYWJlbCB8fCByZXF1aXJlZCB8fCBlcnJvciB8fCB0b3RhbENvbHMgfHwgY29scykge1xuICAgICAgY29uc3QgZm9ybUVsZW1Qcm9wcyA9IHtcbiAgICAgICAgaWQsXG4gICAgICAgIGxhYmVsLFxuICAgICAgICByZXF1aXJlZCxcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIHJlYWRPbmx5LFxuICAgICAgICB0b3RhbENvbHMsXG4gICAgICAgIGNvbHMsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEZvcm1FbGVtZW50IHsuLi5mb3JtRWxlbVByb3BzfT5cbiAgICAgICAgICA8SW5wdXQgey4uLnsgaWQsIHJlYWRPbmx5LCAuLi5wcm9wcyB9fSAvPlxuICAgICAgICA8L0Zvcm1FbGVtZW50PlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgeyBpY29uTGVmdCwgaWNvblJpZ2h0LCBhZGRvbkxlZnQsIGFkZG9uUmlnaHQsIC4uLnBwcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgaW5wdXRQcm9wcyA9IHsgLi4ucHByb3BzLCBpZCwgcmVhZE9ubHkgfTtcbiAgICBpZiAoaWNvbkxlZnQgfHwgaWNvblJpZ2h0IHx8IGFkZG9uTGVmdCB8fCBhZGRvblJpZ2h0KSB7XG4gICAgICBjb25zdCB3cmFwcGVyQ2xhc3NOYW1lID0gY2xhc3NuYW1lcyhcbiAgICAgICAgJ3NsZHMtZm9ybS1lbGVtZW50X19jb250cm9sJyxcbiAgICAgICAgeyAnc2xkcy1pbnB1dC1oYXMtaWNvbic6IGljb25MZWZ0IHx8IGljb25SaWdodCB9LFxuICAgICAgICB7ICdzbGRzLWlucHV0LWhhcy1pY29uLS1sZWZ0LXJpZ2h0JzogaWNvbkxlZnQgJiYgaWNvblJpZ2h0IH0sXG4gICAgICAgIHsgJ3NsZHMtaW5wdXQtaGFzLWljb24tLWxlZnQnOiBpY29uTGVmdCB9LFxuICAgICAgICB7ICdzbGRzLWlucHV0LWhhcy1pY29uLS1yaWdodCc6IGljb25SaWdodCB9LFxuICAgICAgICB7ICdzbGRzLWlucHV0LWhhcy1maXhlZC1hZGRvbic6IGFkZG9uTGVmdCB8fCBhZGRvblJpZ2h0IH1cbiAgICAgICk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17d3JhcHBlckNsYXNzTmFtZX0+XG4gICAgICAgICAge2FkZG9uTGVmdCA/IHRoaXMucmVuZGVyQWRkb24oYWRkb25MZWZ0KSA6IHVuZGVmaW5lZH1cbiAgICAgICAgICB7aWNvbkxlZnQgPyB0aGlzLnJlbmRlckljb24oaWNvbkxlZnQsICdsZWZ0JykgOiB1bmRlZmluZWR9XG4gICAgICAgICAge3RoaXMucmVuZGVySW5wdXQoaW5wdXRQcm9wcyl9XG4gICAgICAgICAge2ljb25SaWdodCA/IHRoaXMucmVuZGVySWNvbihpY29uUmlnaHQsICdyaWdodCcpIDogdW5kZWZpbmVkfVxuICAgICAgICAgIHthZGRvblJpZ2h0ID8gdGhpcy5yZW5kZXJBZGRvbihhZGRvblJpZ2h0KSA6IHVuZGVmaW5lZH1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZW5kZXJJbnB1dChpbnB1dFByb3BzKTtcbiAgfVxufVxuIl19