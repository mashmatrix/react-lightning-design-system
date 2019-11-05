"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateInput = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _moment = _interopRequireDefault(require("moment"));

var _AutoAlign = require("./AutoAlign");

var _FormElement = require("./FormElement");

var _Input = require("./Input");

var _Icon = require("./Icon");

var _Datepicker = require("./Datepicker");

var _util = require("./util");

/**
 *
 */
var DatepickerDropdown =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DatepickerDropdown, _Component);

  function DatepickerDropdown() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DatepickerDropdown);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DatepickerDropdown)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "node", null);
    return _this;
  }

  (0, _createClass2.default)(DatepickerDropdown, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          align = _this$props.align,
          vertAlign = _this$props.vertAlign,
          dateValue = _this$props.dateValue,
          minDate = _this$props.minDate,
          maxDate = _this$props.maxDate,
          extensionRenderer = _this$props.extensionRenderer,
          elementRef = _this$props.elementRef,
          onSelect = _this$props.onSelect,
          onBlur = _this$props.onBlur,
          onClose = _this$props.onClose;
      var datepickerClassNames = (0, _classnames.default)(className, 'slds-dropdown', align ? "slds-dropdown--".concat(align) : undefined, vertAlign ? "slds-dropdown--".concat(vertAlign) : undefined);

      var handleDOMRef = function handleDOMRef(node) {
        _this2.node = node;

        if (elementRef) {
          elementRef(node);
        }
      };

      return _react.default.createElement(_Datepicker.Datepicker, {
        elementRef: handleDOMRef,
        className: datepickerClassNames,
        selectedDate: dateValue,
        autoFocus: true,
        minDate: minDate,
        maxDate: maxDate,
        extensionRenderer: extensionRenderer,
        onSelect: onSelect,
        onBlur: onBlur,
        onClose: onClose
      });
    }
  }]);
  return DatepickerDropdown;
}(_react.Component);

var DatepickerDropdownPortal = (0, _AutoAlign.autoAlign)({
  triggerSelector: '.slds-dropdown-trigger'
})(DatepickerDropdown);

/**
 *
 */
var DateInput =
/*#__PURE__*/
function (_Component2) {
  (0, _inherits2.default)(DateInput, _Component2);

  function DateInput(props) {
    var _this3;

    (0, _classCallCheck2.default)(this, DateInput);
    _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(DateInput).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this3), "node", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this3), "datepicker", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this3), "input", null);
    _this3.state = {
      id: "form-element-".concat((0, _util.uuid)()),
      opened: props.defaultOpened || false
    };
    _this3.onDateIconClick = _this3.onDateIconClick.bind((0, _assertThisInitialized2.default)(_this3));
    _this3.onInputKeyDown = _this3.onInputKeyDown.bind((0, _assertThisInitialized2.default)(_this3));
    _this3.onInputChange = _this3.onInputChange.bind((0, _assertThisInitialized2.default)(_this3));
    _this3.onInputBlur = _this3.onInputBlur.bind((0, _assertThisInitialized2.default)(_this3));
    _this3.onDatepickerSelect = _this3.onDatepickerSelect.bind((0, _assertThisInitialized2.default)(_this3));
    _this3.onDatepickerBlur = _this3.onDatepickerBlur.bind((0, _assertThisInitialized2.default)(_this3));
    _this3.onDatepickerClose = _this3.onDatepickerClose.bind((0, _assertThisInitialized2.default)(_this3));
    (0, _util.registerStyle)('dateinput', [['.slds-has-error .slds-datepicker .slds-select', '{ border: 1px solid #d8dde6; box-shadow: none; }']]);
    return _this3;
  }

  (0, _createClass2.default)(DateInput, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.onValueChange && prevState.value !== this.state.value) {
        this.props.onValueChange(this.state.value, prevState.value);
      }
    }
  }, {
    key: "onDateIconClick",
    value: function onDateIconClick() {
      var _this4 = this;

      setTimeout(function () {
        _this4.showDatepicker();
      }, 10);
    }
  }, {
    key: "onInputKeyDown",
    value: function onInputKeyDown(e) {
      var _this5 = this;

      if (e.keyCode === 13) {
        // return key
        e.preventDefault();
        e.stopPropagation();

        if (e.target.value !== undefined) {
          this.setValueFromInput(e.target.value);
        }

        if (this.props.onComplete) {
          setTimeout(function () {
            if (_this5.props.onComplete) {
              _this5.props.onComplete();
            }
          }, 10);
        }
      } else if (e.keyCode === 40) {
        // down key
        this.showDatepicker();
        e.preventDefault();
        e.stopPropagation();
      }

      if (this.props.onKeyDown) {
        this.props.onKeyDown(e);
      }
    }
  }, {
    key: "onInputChange",
    value: function onInputChange(e) {
      var inputValue = e.target.value;
      this.setState({
        inputValue: inputValue
      });

      if (this.props.onChange) {
        this.props.onChange(e, inputValue);
      }
    }
  }, {
    key: "onInputBlur",
    value: function onInputBlur(e) {
      var _this6 = this;

      this.setValueFromInput(e.target.value);
      setTimeout(function () {
        if (!_this6.isFocusedInComponent()) {
          if (_this6.props.onBlur) {
            _this6.props.onBlur();
          }

          if (_this6.props.onComplete) {
            _this6.props.onComplete();
          }
        }
      }, 10);
    }
  }, {
    key: "onDatepickerSelect",
    value: function onDatepickerSelect(dvalue) {
      var _this7 = this;

      var value = (0, _moment.default)(dvalue).format(this.getValueFormat());
      this.setState({
        value: value,
        inputValue: undefined
      });
      setTimeout(function () {
        _this7.setState({
          opened: false
        });

        var inputEl = _this7.input;

        if (inputEl) {
          inputEl.focus();
          inputEl.select();
        }

        if (_this7.props.onComplete) {
          _this7.props.onComplete();
        }
      }, 200);
    }
  }, {
    key: "onDatepickerBlur",
    value: function onDatepickerBlur() {
      var _this8 = this;

      this.setState({
        opened: false
      });
      setTimeout(function () {
        if (!_this8.isFocusedInComponent()) {
          if (_this8.props.onBlur) {
            _this8.props.onBlur();
          }

          if (_this8.props.onComplete) {
            _this8.props.onComplete();
          }
        }
      }, 10);
    }
  }, {
    key: "onDatepickerClose",
    value: function onDatepickerClose() {
      this.setState({
        opened: false
      });
      var inputEl = this.input;

      if (inputEl) {
        inputEl.focus();
        inputEl.select();
      }
    }
  }, {
    key: "getValueFormat",
    value: function getValueFormat() {
      return this.props.includeTime ? 'YYYY-MM-DDTHH:mm:ss.SSSZ' : 'YYYY-MM-DD';
    }
  }, {
    key: "getInputValueFormat",
    value: function getInputValueFormat() {
      return this.props.dateFormat || (this.props.includeTime ? 'L HH:mm' : 'L');
    }
  }, {
    key: "setValueFromInput",
    value: function setValueFromInput(inputValue) {
      var value = this.state.value;

      if (!inputValue) {
        value = '';
      } else {
        var mvalue = (0, _moment.default)(inputValue, this.getInputValueFormat());

        if (mvalue.isValid()) {
          value = mvalue.format(this.getValueFormat());
        } else {
          value = '';
        }
      }

      this.setState({
        value: value,
        inputValue: undefined
      });
    }
  }, {
    key: "isFocusedInComponent",
    value: function isFocusedInComponent() {
      var targetEl = document.activeElement;
      return (0, _util.isElInChildren)(this.node, targetEl) || (0, _util.isElInChildren)(this.datepicker, targetEl);
    }
  }, {
    key: "showDatepicker",
    value: function showDatepicker() {
      var value = this.state.value;

      if (typeof this.state.inputValue !== 'undefined') {
        var mvalue = (0, _moment.default)(this.state.inputValue, this.getInputValueFormat());

        if (mvalue.isValid()) {
          value = mvalue.format(this.getValueFormat());
        } else {
          // eslint-disable-next-line prefer-destructuring
          value = this.state.value;
        }
      }

      this.setState({
        opened: true,
        value: value
      });
    }
  }, {
    key: "renderInput",
    value: function renderInput(_ref) {
      var _this9 = this;

      var inputValue = _ref.inputValue,
          props = (0, _objectWithoutProperties2.default)(_ref, ["inputValue"]);
      var pprops = props;
      delete pprops.onValueChange;
      return _react.default.createElement("div", {
        className: "slds-input-has-icon slds-input-has-icon--right"
      }, _react.default.createElement(_Input.Input, (0, _extends2.default)({
        inputRef: function inputRef(node) {
          return _this9.input = node;
        },
        value: inputValue
      }, props, {
        onKeyDown: this.onInputKeyDown,
        onChange: this.onInputChange,
        onBlur: this.onInputBlur
      })), _react.default.createElement("span", {
        tabIndex: -1,
        style: props.disabled ? undefined : {
          position: 'relative',
          cursor: 'pointer',
          outline: 'none'
        },
        onClick: props.disabled ? undefined : this.onDateIconClick,
        onBlur: this.onInputBlur
      }, _react.default.createElement(_Icon.Icon, {
        icon: "event",
        className: "slds-input__icon"
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _this10 = this;

      var id = this.props.id || this.state.id;
      var _this$props2 = this.props,
          className = _this$props2.className,
          totalCols = _this$props2.totalCols,
          cols = _this$props2.cols,
          label = _this$props2.label,
          required = _this$props2.required,
          error = _this$props2.error,
          defaultValue = _this$props2.defaultValue,
          value = _this$props2.value,
          menuAlign = _this$props2.menuAlign,
          minDate = _this$props2.minDate,
          maxDate = _this$props2.maxDate,
          extensionRenderer = _this$props2.extensionRenderer,
          props = (0, _objectWithoutProperties2.default)(_this$props2, ["className", "totalCols", "cols", "label", "required", "error", "defaultValue", "value", "menuAlign", "minDate", "maxDate", "extensionRenderer"]);
      var dateValue = typeof value !== 'undefined' ? value : typeof this.state.value !== 'undefined' ? this.state.value : defaultValue;
      var mvalue = (0, _moment.default)(dateValue, this.getValueFormat());
      var inputValue = typeof this.state.inputValue !== 'undefined' ? this.state.inputValue : typeof dateValue !== 'undefined' && mvalue.isValid() ? mvalue.format(this.getInputValueFormat()) : undefined;
      var formElemProps = {
        id: id,
        totalCols: totalCols,
        cols: cols,
        label: label,
        required: required,
        error: error
      };
      delete props.dateFormat;
      delete props.defaultOpened;
      delete props.includeTime;
      delete props.onComplete;
      return _react.default.createElement(_FormElement.FormElement, (0, _extends2.default)({
        formElementRef: function formElementRef(node) {
          return _this10.node = node;
        }
      }, formElemProps), _react.default.createElement("div", {
        className: (0, _classnames.default)(className, 'slds-dropdown-trigger')
      }, this.renderInput((0, _objectSpread2.default)({
        id: id,
        inputValue: inputValue
      }, props)), this.state.opened ? _react.default.createElement(DatepickerDropdownPortal, {
        portalClassName: className,
        elementRef: function elementRef(node) {
          return _this10.datepicker = node;
        },
        dateValue: mvalue.isValid() ? mvalue.format('YYYY-MM-DD') : undefined,
        minDate: minDate,
        maxDate: maxDate,
        align: menuAlign,
        extensionRenderer: extensionRenderer,
        onBlur: this.onDatepickerBlur,
        onSelect: this.onDatepickerSelect,
        onClose: this.onDatepickerClose
      }) : undefined));
    }
  }]);
  return DateInput;
}(_react.Component);

exports.DateInput = DateInput;
(0, _defineProperty2.default)(DateInput, "isFormElement", true);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL0RhdGVJbnB1dC50c3giXSwibmFtZXMiOlsiRGF0ZXBpY2tlckRyb3Bkb3duIiwicHJvcHMiLCJjbGFzc05hbWUiLCJhbGlnbiIsInZlcnRBbGlnbiIsImRhdGVWYWx1ZSIsIm1pbkRhdGUiLCJtYXhEYXRlIiwiZXh0ZW5zaW9uUmVuZGVyZXIiLCJlbGVtZW50UmVmIiwib25TZWxlY3QiLCJvbkJsdXIiLCJvbkNsb3NlIiwiZGF0ZXBpY2tlckNsYXNzTmFtZXMiLCJ1bmRlZmluZWQiLCJoYW5kbGVET01SZWYiLCJub2RlIiwiQ29tcG9uZW50IiwiRGF0ZXBpY2tlckRyb3Bkb3duUG9ydGFsIiwidHJpZ2dlclNlbGVjdG9yIiwiRGF0ZUlucHV0Iiwic3RhdGUiLCJpZCIsIm9wZW5lZCIsImRlZmF1bHRPcGVuZWQiLCJvbkRhdGVJY29uQ2xpY2siLCJiaW5kIiwib25JbnB1dEtleURvd24iLCJvbklucHV0Q2hhbmdlIiwib25JbnB1dEJsdXIiLCJvbkRhdGVwaWNrZXJTZWxlY3QiLCJvbkRhdGVwaWNrZXJCbHVyIiwib25EYXRlcGlja2VyQ2xvc2UiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJvblZhbHVlQ2hhbmdlIiwidmFsdWUiLCJzZXRUaW1lb3V0Iiwic2hvd0RhdGVwaWNrZXIiLCJlIiwia2V5Q29kZSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwidGFyZ2V0Iiwic2V0VmFsdWVGcm9tSW5wdXQiLCJvbkNvbXBsZXRlIiwib25LZXlEb3duIiwiaW5wdXRWYWx1ZSIsInNldFN0YXRlIiwib25DaGFuZ2UiLCJpc0ZvY3VzZWRJbkNvbXBvbmVudCIsImR2YWx1ZSIsImZvcm1hdCIsImdldFZhbHVlRm9ybWF0IiwiaW5wdXRFbCIsImlucHV0IiwiZm9jdXMiLCJzZWxlY3QiLCJpbmNsdWRlVGltZSIsImRhdGVGb3JtYXQiLCJtdmFsdWUiLCJnZXRJbnB1dFZhbHVlRm9ybWF0IiwiaXNWYWxpZCIsInRhcmdldEVsIiwiZG9jdW1lbnQiLCJhY3RpdmVFbGVtZW50IiwiZGF0ZXBpY2tlciIsInBwcm9wcyIsImRpc2FibGVkIiwicG9zaXRpb24iLCJjdXJzb3IiLCJvdXRsaW5lIiwidG90YWxDb2xzIiwiY29scyIsImxhYmVsIiwicmVxdWlyZWQiLCJlcnJvciIsImRlZmF1bHRWYWx1ZSIsIm1lbnVBbGlnbiIsImZvcm1FbGVtUHJvcHMiLCJyZW5kZXJJbnB1dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQWNBOzs7SUFHTUEsa0I7Ozs7Ozs7Ozs7Ozs7Ozs7O3VGQUMwQixJOzs7Ozs7NkJBRXJCO0FBQUE7O0FBQUEsd0JBYUgsS0FBS0MsS0FiRjtBQUFBLFVBRUxDLFNBRkssZUFFTEEsU0FGSztBQUFBLFVBR0xDLEtBSEssZUFHTEEsS0FISztBQUFBLFVBSUxDLFNBSkssZUFJTEEsU0FKSztBQUFBLFVBS0xDLFNBTEssZUFLTEEsU0FMSztBQUFBLFVBTUxDLE9BTkssZUFNTEEsT0FOSztBQUFBLFVBT0xDLE9BUEssZUFPTEEsT0FQSztBQUFBLFVBUUxDLGlCQVJLLGVBUUxBLGlCQVJLO0FBQUEsVUFTTEMsVUFUSyxlQVNMQSxVQVRLO0FBQUEsVUFVTEMsUUFWSyxlQVVMQSxRQVZLO0FBQUEsVUFXTEMsTUFYSyxlQVdMQSxNQVhLO0FBQUEsVUFZTEMsT0FaSyxlQVlMQSxPQVpLO0FBY1AsVUFBTUMsb0JBQW9CLEdBQUcseUJBQzNCWCxTQUQyQixFQUUzQixlQUYyQixFQUczQkMsS0FBSyw0QkFBcUJBLEtBQXJCLElBQStCVyxTQUhULEVBSTNCVixTQUFTLDRCQUFxQkEsU0FBckIsSUFBbUNVLFNBSmpCLENBQTdCOztBQU1BLFVBQU1DLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUNDLElBQUQsRUFBMEI7QUFDN0MsUUFBQSxNQUFJLENBQUNBLElBQUwsR0FBWUEsSUFBWjs7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LFFBQUFBLEVBQUUsRUFBRkEsRUFBbkI7QUFBdUJ5QixRQUFBQSxVQUFVLEVBQVZBO0FBQXZCLFNBQXNDOUMsS0FBdEMsRUFESCxFQUVHLEtBQUtvQixLQUFMLENBQVdFLE1BQVgsR0FDQyw2QkFBQyx3QkFBRDtBQUNFLFFBQUEsZUFBZSxFQUFFckIsU0FEbkI7QUFFRSxRQUFBLFVBQVUsRUFBRSxvQkFBQ2MsSUFBRDtBQUFBLGlCQUEyQixPQUFJLENBQUNrRCxVQUFMLEdBQWtCbEQsSUFBN0M7QUFBQSxTQUZkO0FBR0UsUUFBQSxTQUFTLEVBQ1A0QyxNQUFNLENBQUNFLE9BQVAsS0FBbUJGLE1BQU0sQ0FBQ1IsTUFBUCxDQUFjLFlBQWQsQ0FBbkIsR0FBaUR0QyxTQUpyRDtBQU1FLFFBQUEsT0FBTyxFQUFFUixPQU5YO0FBT0UsUUFBQSxPQUFPLEVBQUVDLE9BUFg7QUFRRSxRQUFBLEtBQUssRUFBRXVFLFNBUlQ7QUFTRSxRQUFBLGlCQUFpQixFQUFFdEUsaUJBVHJCO0FBVUUsUUFBQSxNQUFNLEVBQUUsS0FBS3VCLGdCQVZmO0FBV0UsUUFBQSxRQUFRLEVBQUUsS0FBS0Qsa0JBWGpCO0FBWUUsUUFBQSxPQUFPLEVBQUUsS0FBS0U7QUFaaEIsUUFERCxHQWdCQ2xCLFNBbEJKLENBSkYsQ0FERjtBQTRCRDs7O0VBN1E0QkcsZ0I7Ozs4QkFBbEJHLFMsbUJBQ1ksSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IGF1dG9BbGlnbiwgSW5qZWN0ZWRQcm9wcyB9IGZyb20gJy4vQXV0b0FsaWduJztcbmltcG9ydCB7IEZvcm1FbGVtZW50LCBGb3JtRWxlbWVudFByb3BzIH0gZnJvbSAnLi9Gb3JtRWxlbWVudCc7XG5pbXBvcnQgeyBJbnB1dCwgSW5wdXRQcm9wcyB9IGZyb20gJy4vSW5wdXQnO1xuaW1wb3J0IHsgSWNvbiB9IGZyb20gJy4vSWNvbic7XG5pbXBvcnQgeyBEYXRlcGlja2VyIH0gZnJvbSAnLi9EYXRlcGlja2VyJztcbmltcG9ydCB7IHV1aWQsIGlzRWxJbkNoaWxkcmVuLCByZWdpc3RlclN0eWxlIH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IHR5cGUgRGF0ZXBpY2tlckRyb3Bkb3duUHJvcHMgPSB7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgZGF0ZVZhbHVlPzogc3RyaW5nO1xuICBtaW5EYXRlPzogc3RyaW5nO1xuICBtYXhEYXRlPzogc3RyaW5nO1xuICBlbGVtZW50UmVmPzogKG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB2b2lkO1xuICBleHRlbnNpb25SZW5kZXJlcj86ICguLi5wcm9wczogYW55W10pID0+IEpTWC5FbGVtZW50O1xuICBvblNlbGVjdD86IChkYXRlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uQmx1cj86IChlOiBSZWFjdC5Gb2N1c0V2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcbiAgb25DbG9zZT86ICgpID0+IHZvaWQ7XG59ICYgSW5qZWN0ZWRQcm9wcztcblxuLyoqXG4gKlxuICovXG5jbGFzcyBEYXRlcGlja2VyRHJvcGRvd24gZXh0ZW5kcyBDb21wb25lbnQ8RGF0ZXBpY2tlckRyb3Bkb3duUHJvcHM+IHtcbiAgbm9kZTogSFRNTERpdkVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY2xhc3NOYW1lLFxuICAgICAgYWxpZ24sXG4gICAgICB2ZXJ0QWxpZ24sXG4gICAgICBkYXRlVmFsdWUsXG4gICAgICBtaW5EYXRlLFxuICAgICAgbWF4RGF0ZSxcbiAgICAgIGV4dGVuc2lvblJlbmRlcmVyLFxuICAgICAgZWxlbWVudFJlZixcbiAgICAgIG9uU2VsZWN0LFxuICAgICAgb25CbHVyLFxuICAgICAgb25DbG9zZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBkYXRlcGlja2VyQ2xhc3NOYW1lcyA9IGNsYXNzbmFtZXMoXG4gICAgICBjbGFzc05hbWUsXG4gICAgICAnc2xkcy1kcm9wZG93bicsXG4gICAgICBhbGlnbiA/IGBzbGRzLWRyb3Bkb3duLS0ke2FsaWdufWAgOiB1bmRlZmluZWQsXG4gICAgICB2ZXJ0QWxpZ24gPyBgc2xkcy1kcm9wZG93bi0tJHt2ZXJ0QWxpZ259YCA6IHVuZGVmaW5lZFxuICAgICk7XG4gICAgY29uc3QgaGFuZGxlRE9NUmVmID0gKG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB7XG4gICAgICB0aGlzLm5vZGUgPSBub2RlO1xuICAgICAgaWYgKGVsZW1lbnRSZWYpIHtcbiAgICAgICAgZWxlbWVudFJlZihub2RlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8RGF0ZXBpY2tlclxuICAgICAgICBlbGVtZW50UmVmPXtoYW5kbGVET01SZWZ9XG4gICAgICAgIGNsYXNzTmFtZT17ZGF0ZXBpY2tlckNsYXNzTmFtZXN9XG4gICAgICAgIHNlbGVjdGVkRGF0ZT17ZGF0ZVZhbHVlfVxuICAgICAgICBhdXRvRm9jdXNcbiAgICAgICAgbWluRGF0ZT17bWluRGF0ZX1cbiAgICAgICAgbWF4RGF0ZT17bWF4RGF0ZX1cbiAgICAgICAgZXh0ZW5zaW9uUmVuZGVyZXI9e2V4dGVuc2lvblJlbmRlcmVyfVxuICAgICAgICBvblNlbGVjdD17b25TZWxlY3R9XG4gICAgICAgIG9uQmx1cj17b25CbHVyfVxuICAgICAgICBvbkNsb3NlPXtvbkNsb3NlfVxuICAgICAgLz5cbiAgICApO1xuICB9XG59XG5cbmNvbnN0IERhdGVwaWNrZXJEcm9wZG93blBvcnRhbCA9IGF1dG9BbGlnbih7XG4gIHRyaWdnZXJTZWxlY3RvcjogJy5zbGRzLWRyb3Bkb3duLXRyaWdnZXInLFxufSkoRGF0ZXBpY2tlckRyb3Bkb3duKTtcblxuZXhwb3J0IHR5cGUgRGF0ZUlucHV0UHJvcHMgPSB7XG4gIGlkPzogc3RyaW5nO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGxhYmVsPzogc3RyaW5nO1xuICByZXF1aXJlZD86IGJvb2xlYW47XG4gIGVycm9yPzogRm9ybUVsZW1lbnRQcm9wc1snZXJyb3InXTtcbiAgdG90YWxDb2xzPzogbnVtYmVyO1xuICBjb2xzPzogbnVtYmVyO1xuICB2YWx1ZT86IHN0cmluZztcbiAgZGVmYXVsdFZhbHVlPzogc3RyaW5nO1xuICBkZWZhdWx0T3BlbmVkPzogYm9vbGVhbjtcbiAgZGF0ZUZvcm1hdD86IHN0cmluZztcbiAgaW5jbHVkZVRpbWU/OiBib29sZWFuO1xuICBtaW5EYXRlPzogc3RyaW5nO1xuICBtYXhEYXRlPzogc3RyaW5nO1xuICBtZW51QWxpZ24/OiAnbGVmdCcgfCAncmlnaHQnO1xuICBvbktleURvd24/OiAoZTogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4gdm9pZDtcbiAgb25CbHVyPzogKCkgPT4gdm9pZDtcbiAgb25DaGFuZ2U/OiAoZTogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4sIHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uVmFsdWVDaGFuZ2U/OiAoXG4gICAgdmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICBwcmV2VmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZFxuICApID0+IHZvaWQ7XG4gIG9uQ29tcGxldGU/OiAoKSA9PiB2b2lkO1xuICBleHRlbnNpb25SZW5kZXJlcj86ICguLi5wcm9wczogYW55W10pID0+IEpTWC5FbGVtZW50O1xufSAmIElucHV0UHJvcHM7XG5cbmV4cG9ydCB0eXBlIERhdGVJbnB1dFN0YXRlID0ge1xuICBpZDogc3RyaW5nO1xuICBvcGVuZWQ6IGJvb2xlYW47XG4gIGlucHV0VmFsdWU/OiBzdHJpbmc7XG4gIHZhbHVlPzogc3RyaW5nO1xufTtcbi8qKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIERhdGVJbnB1dCBleHRlbmRzIENvbXBvbmVudDxEYXRlSW5wdXRQcm9wcywgRGF0ZUlucHV0U3RhdGU+IHtcbiAgc3RhdGljIGlzRm9ybUVsZW1lbnQgPSB0cnVlO1xuXG4gIG5vZGU6IEhUTUxEaXZFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgZGF0ZXBpY2tlcjogSFRNTERpdkVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICBpbnB1dDogSFRNTElucHV0RWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBSZWFkb25seTxEYXRlSW5wdXRQcm9wcz4pIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlkOiBgZm9ybS1lbGVtZW50LSR7dXVpZCgpfWAsXG4gICAgICBvcGVuZWQ6IHByb3BzLmRlZmF1bHRPcGVuZWQgfHwgZmFsc2UsXG4gICAgfTtcblxuICAgIHRoaXMub25EYXRlSWNvbkNsaWNrID0gdGhpcy5vbkRhdGVJY29uQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uSW5wdXRLZXlEb3duID0gdGhpcy5vbklucHV0S2V5RG93bi5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25JbnB1dENoYW5nZSA9IHRoaXMub25JbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25JbnB1dEJsdXIgPSB0aGlzLm9uSW5wdXRCbHVyLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLm9uRGF0ZXBpY2tlclNlbGVjdCA9IHRoaXMub25EYXRlcGlja2VyU2VsZWN0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkRhdGVwaWNrZXJCbHVyID0gdGhpcy5vbkRhdGVwaWNrZXJCbHVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkRhdGVwaWNrZXJDbG9zZSA9IHRoaXMub25EYXRlcGlja2VyQ2xvc2UuYmluZCh0aGlzKTtcblxuICAgIHJlZ2lzdGVyU3R5bGUoJ2RhdGVpbnB1dCcsIFtcbiAgICAgIFtcbiAgICAgICAgJy5zbGRzLWhhcy1lcnJvciAuc2xkcy1kYXRlcGlja2VyIC5zbGRzLXNlbGVjdCcsXG4gICAgICAgICd7IGJvcmRlcjogMXB4IHNvbGlkICNkOGRkZTY7IGJveC1zaGFkb3c6IG5vbmU7IH0nLFxuICAgICAgXSxcbiAgICBdKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHM6IERhdGVJbnB1dFByb3BzLCBwcmV2U3RhdGU6IERhdGVJbnB1dFN0YXRlKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25WYWx1ZUNoYW5nZSAmJiBwcmV2U3RhdGUudmFsdWUgIT09IHRoaXMuc3RhdGUudmFsdWUpIHtcbiAgICAgIHRoaXMucHJvcHMub25WYWx1ZUNoYW5nZSh0aGlzLnN0YXRlLnZhbHVlLCBwcmV2U3RhdGUudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIG9uRGF0ZUljb25DbGljaygpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2hvd0RhdGVwaWNrZXIoKTtcbiAgICB9LCAxMCk7XG4gIH1cblxuICBvbklucHV0S2V5RG93bihlOiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIC8vIHJldHVybiBrZXlcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBpZiAoKGUudGFyZ2V0IGFzIGFueSkudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnNldFZhbHVlRnJvbUlucHV0KChlLnRhcmdldCBhcyBhbnkpLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnByb3BzLm9uQ29tcGxldGUpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMub25Db21wbGV0ZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNvbXBsZXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAxMCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT09IDQwKSB7XG4gICAgICAvLyBkb3duIGtleVxuICAgICAgdGhpcy5zaG93RGF0ZXBpY2tlcigpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMub25LZXlEb3duKSB7XG4gICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihlKTtcbiAgICB9XG4gIH1cblxuICBvbklucHV0Q2hhbmdlKGU6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSB7XG4gICAgY29uc3QgaW5wdXRWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlIH0pO1xuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGUsIGlucHV0VmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIG9uSW5wdXRCbHVyKGU6IFJlYWN0LkZvY3VzRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pIHtcbiAgICB0aGlzLnNldFZhbHVlRnJvbUlucHV0KGUudGFyZ2V0LnZhbHVlKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5pc0ZvY3VzZWRJbkNvbXBvbmVudCgpKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uQmx1cikge1xuICAgICAgICAgIHRoaXMucHJvcHMub25CbHVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25Db21wbGV0ZSkge1xuICAgICAgICAgIHRoaXMucHJvcHMub25Db21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgMTApO1xuICB9XG5cbiAgb25EYXRlcGlja2VyU2VsZWN0KGR2YWx1ZTogc3RyaW5nKSB7XG4gICAgY29uc3QgdmFsdWUgPSBtb21lbnQoZHZhbHVlKS5mb3JtYXQodGhpcy5nZXRWYWx1ZUZvcm1hdCgpKTtcbiAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWUsIGlucHV0VmFsdWU6IHVuZGVmaW5lZCB9KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBvcGVuZWQ6IGZhbHNlIH0pO1xuICAgICAgY29uc3QgaW5wdXRFbCA9IHRoaXMuaW5wdXQ7XG4gICAgICBpZiAoaW5wdXRFbCkge1xuICAgICAgICBpbnB1dEVsLmZvY3VzKCk7XG4gICAgICAgIGlucHV0RWwuc2VsZWN0KCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wcm9wcy5vbkNvbXBsZXRlKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25Db21wbGV0ZSgpO1xuICAgICAgfVxuICAgIH0sIDIwMCk7XG4gIH1cblxuICBvbkRhdGVwaWNrZXJCbHVyKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBvcGVuZWQ6IGZhbHNlIH0pO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmlzRm9jdXNlZEluQ29tcG9uZW50KCkpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25CbHVyKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5vbkJsdXIoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNvbXBsZXRlKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5vbkNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCAxMCk7XG4gIH1cblxuICBvbkRhdGVwaWNrZXJDbG9zZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgb3BlbmVkOiBmYWxzZSB9KTtcbiAgICBjb25zdCBpbnB1dEVsID0gdGhpcy5pbnB1dDtcbiAgICBpZiAoaW5wdXRFbCkge1xuICAgICAgaW5wdXRFbC5mb2N1cygpO1xuICAgICAgaW5wdXRFbC5zZWxlY3QoKTtcbiAgICB9XG4gIH1cblxuICBnZXRWYWx1ZUZvcm1hdCgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5pbmNsdWRlVGltZSA/ICdZWVlZLU1NLUREVEhIOm1tOnNzLlNTU1onIDogJ1lZWVktTU0tREQnO1xuICB9XG5cbiAgZ2V0SW5wdXRWYWx1ZUZvcm1hdCgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5kYXRlRm9ybWF0IHx8ICh0aGlzLnByb3BzLmluY2x1ZGVUaW1lID8gJ0wgSEg6bW0nIDogJ0wnKTtcbiAgfVxuXG4gIHNldFZhbHVlRnJvbUlucHV0KGlucHV0VmFsdWU6IHN0cmluZykge1xuICAgIGxldCB7IHZhbHVlIH0gPSB0aGlzLnN0YXRlO1xuICAgIGlmICghaW5wdXRWYWx1ZSkge1xuICAgICAgdmFsdWUgPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbXZhbHVlID0gbW9tZW50KGlucHV0VmFsdWUsIHRoaXMuZ2V0SW5wdXRWYWx1ZUZvcm1hdCgpKTtcbiAgICAgIGlmIChtdmFsdWUuaXNWYWxpZCgpKSB7XG4gICAgICAgIHZhbHVlID0gbXZhbHVlLmZvcm1hdCh0aGlzLmdldFZhbHVlRm9ybWF0KCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSAnJztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlLCBpbnB1dFZhbHVlOiB1bmRlZmluZWQgfSk7XG4gIH1cblxuICBpc0ZvY3VzZWRJbkNvbXBvbmVudCgpIHtcbiAgICBjb25zdCB0YXJnZXRFbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgcmV0dXJuIChcbiAgICAgIGlzRWxJbkNoaWxkcmVuKHRoaXMubm9kZSwgdGFyZ2V0RWwpIHx8XG4gICAgICBpc0VsSW5DaGlsZHJlbih0aGlzLmRhdGVwaWNrZXIsIHRhcmdldEVsKVxuICAgICk7XG4gIH1cblxuICBzaG93RGF0ZXBpY2tlcigpIHtcbiAgICBsZXQgeyB2YWx1ZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAodHlwZW9mIHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnN0IG12YWx1ZSA9IG1vbWVudCh0aGlzLnN0YXRlLmlucHV0VmFsdWUsIHRoaXMuZ2V0SW5wdXRWYWx1ZUZvcm1hdCgpKTtcbiAgICAgIGlmIChtdmFsdWUuaXNWYWxpZCgpKSB7XG4gICAgICAgIHZhbHVlID0gbXZhbHVlLmZvcm1hdCh0aGlzLmdldFZhbHVlRm9ybWF0KCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICAgIHZhbHVlID0gdGhpcy5zdGF0ZS52YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IG9wZW5lZDogdHJ1ZSwgdmFsdWUgfSk7XG4gIH1cblxuICByZW5kZXJJbnB1dCh7IGlucHV0VmFsdWUsIC4uLnByb3BzIH06IGFueSkge1xuICAgIGNvbnN0IHBwcm9wcyA9IHByb3BzO1xuICAgIGRlbGV0ZSBwcHJvcHMub25WYWx1ZUNoYW5nZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3NsZHMtaW5wdXQtaGFzLWljb24gc2xkcy1pbnB1dC1oYXMtaWNvbi0tcmlnaHQnPlxuICAgICAgICA8SW5wdXRcbiAgICAgICAgICBpbnB1dFJlZj17KG5vZGUpID0+ICh0aGlzLmlucHV0ID0gbm9kZSl9XG4gICAgICAgICAgdmFsdWU9e2lucHV0VmFsdWV9XG4gICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vbklucHV0S2V5RG93bn1cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0Q2hhbmdlfVxuICAgICAgICAgIG9uQmx1cj17dGhpcy5vbklucHV0Qmx1cn1cbiAgICAgICAgLz5cbiAgICAgICAgPHNwYW5cbiAgICAgICAgICB0YWJJbmRleD17LTF9XG4gICAgICAgICAgc3R5bGU9e1xuICAgICAgICAgICAgcHJvcHMuZGlzYWJsZWRcbiAgICAgICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgOiB7IHBvc2l0aW9uOiAncmVsYXRpdmUnLCBjdXJzb3I6ICdwb2ludGVyJywgb3V0bGluZTogJ25vbmUnIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgb25DbGljaz17cHJvcHMuZGlzYWJsZWQgPyB1bmRlZmluZWQgOiB0aGlzLm9uRGF0ZUljb25DbGlja31cbiAgICAgICAgICBvbkJsdXI9e3RoaXMub25JbnB1dEJsdXJ9XG4gICAgICAgID5cbiAgICAgICAgICA8SWNvbiBpY29uPSdldmVudCcgY2xhc3NOYW1lPSdzbGRzLWlucHV0X19pY29uJyAvPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGlkID0gdGhpcy5wcm9wcy5pZCB8fCB0aGlzLnN0YXRlLmlkO1xuICAgIGNvbnN0IHtcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIHRvdGFsQ29scyxcbiAgICAgIGNvbHMsXG4gICAgICBsYWJlbCxcbiAgICAgIHJlcXVpcmVkLFxuICAgICAgZXJyb3IsXG4gICAgICBkZWZhdWx0VmFsdWUsXG4gICAgICB2YWx1ZSxcbiAgICAgIG1lbnVBbGlnbixcbiAgICAgIG1pbkRhdGUsXG4gICAgICBtYXhEYXRlLFxuICAgICAgZXh0ZW5zaW9uUmVuZGVyZXIsXG4gICAgICAuLi5wcm9wc1xuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGRhdGVWYWx1ZSA9XG4gICAgICB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnXG4gICAgICAgID8gdmFsdWVcbiAgICAgICAgOiB0eXBlb2YgdGhpcy5zdGF0ZS52YWx1ZSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgPyB0aGlzLnN0YXRlLnZhbHVlXG4gICAgICAgIDogZGVmYXVsdFZhbHVlO1xuICAgIGNvbnN0IG12YWx1ZSA9IG1vbWVudChkYXRlVmFsdWUsIHRoaXMuZ2V0VmFsdWVGb3JtYXQoKSk7XG4gICAgY29uc3QgaW5wdXRWYWx1ZSA9XG4gICAgICB0eXBlb2YgdGhpcy5zdGF0ZS5pbnB1dFZhbHVlICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IHRoaXMuc3RhdGUuaW5wdXRWYWx1ZVxuICAgICAgICA6IHR5cGVvZiBkYXRlVmFsdWUgIT09ICd1bmRlZmluZWQnICYmIG12YWx1ZS5pc1ZhbGlkKClcbiAgICAgICAgPyBtdmFsdWUuZm9ybWF0KHRoaXMuZ2V0SW5wdXRWYWx1ZUZvcm1hdCgpKVxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBmb3JtRWxlbVByb3BzID0geyBpZCwgdG90YWxDb2xzLCBjb2xzLCBsYWJlbCwgcmVxdWlyZWQsIGVycm9yIH07XG4gICAgZGVsZXRlIHByb3BzLmRhdGVGb3JtYXQ7XG4gICAgZGVsZXRlIHByb3BzLmRlZmF1bHRPcGVuZWQ7XG4gICAgZGVsZXRlIHByb3BzLmluY2x1ZGVUaW1lO1xuICAgIGRlbGV0ZSBwcm9wcy5vbkNvbXBsZXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8Rm9ybUVsZW1lbnRcbiAgICAgICAgZm9ybUVsZW1lbnRSZWY9eyhub2RlKSA9PiAodGhpcy5ub2RlID0gbm9kZSl9XG4gICAgICAgIHsuLi5mb3JtRWxlbVByb3BzfVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhjbGFzc05hbWUsICdzbGRzLWRyb3Bkb3duLXRyaWdnZXInKX0+XG4gICAgICAgICAge3RoaXMucmVuZGVySW5wdXQoeyBpZCwgaW5wdXRWYWx1ZSwgLi4ucHJvcHMgfSl9XG4gICAgICAgICAge3RoaXMuc3RhdGUub3BlbmVkID8gKFxuICAgICAgICAgICAgPERhdGVwaWNrZXJEcm9wZG93blBvcnRhbFxuICAgICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICAgICAgZWxlbWVudFJlZj17KG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiAodGhpcy5kYXRlcGlja2VyID0gbm9kZSl9XG4gICAgICAgICAgICAgIGRhdGVWYWx1ZT17XG4gICAgICAgICAgICAgICAgbXZhbHVlLmlzVmFsaWQoKSA/IG12YWx1ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG1pbkRhdGU9e21pbkRhdGV9XG4gICAgICAgICAgICAgIG1heERhdGU9e21heERhdGV9XG4gICAgICAgICAgICAgIGFsaWduPXttZW51QWxpZ259XG4gICAgICAgICAgICAgIGV4dGVuc2lvblJlbmRlcmVyPXtleHRlbnNpb25SZW5kZXJlcn1cbiAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLm9uRGF0ZXBpY2tlckJsdXJ9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uRGF0ZXBpY2tlclNlbGVjdH1cbiAgICAgICAgICAgICAgb25DbG9zZT17dGhpcy5vbkRhdGVwaWNrZXJDbG9zZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIHVuZGVmaW5lZFxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9Gb3JtRWxlbWVudD5cbiAgICApO1xuICB9XG59XG4iXX0=