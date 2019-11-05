"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PicklistItem = exports.Picklist = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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

var _FormElement = require("./FormElement");

var _Icon = require("./Icon");

var _Button = require("./Button");

var _DropdownMenu = require("./DropdownMenu");

var _util = require("./util");

var Picklist =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Picklist, _Component);

  function Picklist(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Picklist);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Picklist).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "node", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "picklistButton", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "dropdown", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClick", function () {
      _this.setState(function (prevState) {
        return {
          opened: !prevState.opened
        };
      });

      setTimeout(function () {
        _this.focusToTargetItemEl();
      }, 10);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onPicklistItemClick", function (item, e) {
      var _this$props$multiSele = _this.props.multiSelect,
          multiSelect = _this$props$multiSele === void 0 ? false : _this$props$multiSele;

      _this.updateItemValue(item.value);

      if (_this.props.onChange) {
        _this.props.onChange(e, item.value);
      }

      if (_this.props.onSelect) {
        _this.props.onSelect(item);
      }

      if (!multiSelect) {
        // close if only single select
        setTimeout(function () {
          _this.setState({
            opened: false
          });

          if (_this.props.onComplete) {
            _this.props.onComplete();
          }

          var picklistButtonEl = _this.picklistButton;

          if (picklistButtonEl) {
            picklistButtonEl.focus();
          }
        }, 200);
      }

      e.preventDefault();
      e.stopPropagation();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onPicklistClose", function () {
      var picklistButtonEl = _this.picklistButton;

      if (picklistButtonEl) {
        picklistButtonEl.focus();
      }

      _this.setState({
        opened: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onBlur", function () {
      setTimeout(function () {
        if (!_this.isFocusedInComponent()) {
          _this.setState({
            opened: false
          });

          if (_this.props.onBlur) {
            _this.props.onBlur();
          }

          if (_this.props.onComplete) {
            _this.props.onComplete();
          }
        }
      }, 10);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onKeydown", function (e) {
      if (e.keyCode === 40) {
        // down
        e.preventDefault();
        e.stopPropagation();

        if (!_this.state.opened) {
          _this.setState({
            opened: true
          });

          setTimeout(function () {
            _this.focusToTargetItemEl();
          }, 10);
        } else {
          _this.focusToTargetItemEl();
        }
      } else if (e.keyCode === 27) {
        // ESC
        e.preventDefault();
        e.stopPropagation();

        _this.setState({
          opened: false
        });

        if (_this.props.onComplete) {
          _this.props.onComplete();
        }
      }

      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(e);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderPicklistItem", function (item) {
      var selected = _this.getValue().indexOf(item.props.value) !== -1;

      var _assertThisInitialize = (0, _assertThisInitialized2.default)(_this),
          onBlur = _assertThisInitialize.onBlur;

      return _react.default.cloneElement(item, {
        selected: selected,
        onBlur: onBlur
      });
    });
    var _props$defaultValue = props.defaultValue,
        defaultValue = _props$defaultValue === void 0 ? [] : _props$defaultValue;
    var initialValue = props.value || defaultValue;
    _this.state = {
      id: "form-element-".concat((0, _util.uuid)()),
      opened: props.defaultOpened,
      value: Array.isArray(initialValue) ? initialValue : [initialValue]
    };
    return _this;
  }

  (0, _createClass2.default)(Picklist, [{
    key: "getValue",
    value: function getValue() {
      var value = this.props.value; // for controlled behavior returning value from props

      if (value) {
        return Array.isArray(value) ? value : [value];
      } // for uncontrolled - value from state


      return this.state.value;
    }
  }, {
    key: "setValue",
    value: function setValue(newValue) {
      var _this$props = this.props,
          _this$props$multiSele2 = _this$props.multiSelect,
          multiSelect = _this$props$multiSele2 === void 0 ? false : _this$props$multiSele2,
          onValueChange = _this$props.onValueChange;
      var prevValue = this.getValue();
      this.setState({
        value: newValue
      }); // this is for controlled behavior

      if (onValueChange && prevValue !== newValue) {
        if (multiSelect) {
          onValueChange(newValue, prevValue);
        } else {
          onValueChange(newValue.length > 0 ? newValue[0] : undefined, prevValue.length > 0 ? prevValue[0] : undefined);
        }
      }
    }
  }, {
    key: "getSelectedItemLabel",
    value: function getSelectedItemLabel() {
      var selectedValues = this.getValue(); // many items selected

      if (selectedValues.length > 1) {
        var _this$props$optionsSe = this.props.optionsSelectedText,
            optionsSelectedText = _this$props$optionsSe === void 0 ? '' : _this$props$optionsSe;
        return optionsSelectedText;
      } // one item


      if (selectedValues.length === 1) {
        var selectedValue = selectedValues[0];
        var selected = null;

        _react.default.Children.forEach(this.props.children, function (item) {
          if (item.props.value === selectedValue) {
            selected = item.props.label || item.props.children;
          }
        });

        return selected || selectedValue;
      } // zero items


      var _this$props$selectedT = this.props.selectedText,
          selectedText = _this$props$selectedT === void 0 ? '' : _this$props$selectedT;
      return selectedText;
    }
  }, {
    key: "updateItemValue",
    value: function updateItemValue(itemValue) {
      var _this$props$multiSele3 = this.props.multiSelect,
          multiSelect = _this$props$multiSele3 === void 0 ? false : _this$props$multiSele3;

      if (multiSelect) {
        var _newValue = this.getValue().slice(); // toggle value


        if (_newValue.indexOf(itemValue) === -1) {
          // add value to array
          _newValue.push(itemValue);
        } else {
          // remove from array
          _newValue.splice(_newValue.indexOf(itemValue), 1);
        }

        this.setValue(_newValue);
      } else {
        // set only one value
        this.setValue([itemValue]);
      }
    }
  }, {
    key: "isFocusedInComponent",
    value: function isFocusedInComponent() {
      var targetEl = document.activeElement;
      return (0, _util.isElInChildren)(this.node, targetEl) || (0, _util.isElInChildren)(this.dropdown, targetEl);
    }
  }, {
    key: "focusToTargetItemEl",
    value: function focusToTargetItemEl() {
      var dropdownEl = this.dropdown;

      if (!dropdownEl) {
        return;
      }

      var firstItemEl = dropdownEl.querySelector('.slds-is-selected > .react-slds-menuitem[tabIndex]') || dropdownEl.querySelector('.react-slds-menuitem[tabIndex]');

      if (firstItemEl) {
        firstItemEl.focus();
      }
    }
  }, {
    key: "renderPicklist",
    value: function renderPicklist(props) {
      var _this2 = this;

      var className = props.className,
          id = props.id,
          disabled = props.disabled,
          menuSize = props.menuSize,
          menuStyle = props.menuStyle;
      var picklistClassNames = (0, _classnames.default)(className, 'slds-picklist', 'slds-dropdown-trigger');
      return _react.default.createElement("div", {
        className: picklistClassNames,
        "aria-expanded": this.state.opened
      }, _react.default.createElement(_Button.Button, {
        id: id,
        buttonRef: function buttonRef(node) {
          return _this2.picklistButton = node;
        },
        className: "slds-picklist__label",
        type: "neutral",
        disabled: disabled,
        onClick: disabled ? undefined : this.onClick,
        onBlur: disabled ? undefined : this.onBlur,
        onKeyDown: disabled ? undefined : this.onKeydown
      }, _react.default.createElement("span", {
        className: "slds-truncate"
      }, this.getSelectedItemLabel() || _react.default.createElement("span", null, "\xA0")), _react.default.createElement(_Icon.Icon, {
        icon: "down"
      })), this.renderDropdown(menuSize, menuStyle));
    }
  }, {
    key: "renderDropdown",
    value: function renderDropdown(menuSize, menuStyle) {
      var _this3 = this;

      var _this$props2 = this.props,
          className = _this$props2.className,
          children = _this$props2.children;
      return this.state.opened ? _react.default.createElement(_DropdownMenu.DropdownMenu, {
        portalClassName: (0, _classnames.default)(className, 'slds-picklist'),
        dropdownMenuRef: function dropdownMenuRef(node) {
          return _this3.dropdown = node;
        },
        size: menuSize,
        onMenuItemClick: this.onPicklistItemClick,
        onMenuClose: this.onPicklistClose,
        style: menuStyle,
        onBlur: this.onBlur
      }, _react.default.Children.map(children, this.renderPicklistItem)) : _react.default.createElement("div", {
        ref: function ref(node) {
          return _this3.dropdown = node;
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var id = this.props.id || this.state.id;
      var _this$props3 = this.props,
          label = _this$props3.label,
          required = _this$props3.required,
          error = _this$props3.error,
          totalCols = _this$props3.totalCols,
          cols = _this$props3.cols,
          props = (0, _objectWithoutProperties2.default)(_this$props3, ["label", "required", "error", "totalCols", "cols"]);
      var formElemProps = {
        id: id,
        label: label,
        required: required,
        error: error,
        totalCols: totalCols,
        cols: cols
      };
      return _react.default.createElement(_FormElement.FormElement, (0, _extends2.default)({
        formElementRef: function formElementRef(node) {
          return _this4.node = node;
        }
      }, formElemProps), this.renderPicklist((0, _objectSpread2.default)({}, props, {
        id: id
      })));
    }
  }]);
  return Picklist;
}(_react.Component);

exports.Picklist = Picklist;
(0, _defineProperty2.default)(Picklist, "isFormElement", true);

var PicklistItem = function PicklistItem(_ref) {
  var label = _ref.label,
      selected = _ref.selected,
      disabled = _ref.disabled,
      children = _ref.children,
      props = (0, _objectWithoutProperties2.default)(_ref, ["label", "selected", "disabled", "children"]);
  return _react.default.createElement(_DropdownMenu.DropdownMenuItem, (0, _extends2.default)({
    icon: selected ? 'check' : 'none',
    role: "menuitemradio",
    selected: selected,
    disabled: disabled
  }, props), label || children);
};

exports.PicklistItem = PicklistItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL1BpY2tsaXN0LnRzeCJdLCJuYW1lcyI6WyJQaWNrbGlzdCIsInByb3BzIiwic2V0U3RhdGUiLCJwcmV2U3RhdGUiLCJvcGVuZWQiLCJzZXRUaW1lb3V0IiwiZm9jdXNUb1RhcmdldEl0ZW1FbCIsIml0ZW0iLCJlIiwibXVsdGlTZWxlY3QiLCJ1cGRhdGVJdGVtVmFsdWUiLCJ2YWx1ZSIsIm9uQ2hhbmdlIiwib25TZWxlY3QiLCJvbkNvbXBsZXRlIiwicGlja2xpc3RCdXR0b25FbCIsInBpY2tsaXN0QnV0dG9uIiwiZm9jdXMiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsImlzRm9jdXNlZEluQ29tcG9uZW50Iiwib25CbHVyIiwia2V5Q29kZSIsInN0YXRlIiwib25LZXlEb3duIiwic2VsZWN0ZWQiLCJnZXRWYWx1ZSIsImluZGV4T2YiLCJSZWFjdCIsImNsb25lRWxlbWVudCIsImRlZmF1bHRWYWx1ZSIsImluaXRpYWxWYWx1ZSIsImlkIiwiZGVmYXVsdE9wZW5lZCIsIkFycmF5IiwiaXNBcnJheSIsIm5ld1ZhbHVlIiwib25WYWx1ZUNoYW5nZSIsInByZXZWYWx1ZSIsImxlbmd0aCIsInVuZGVmaW5lZCIsInNlbGVjdGVkVmFsdWVzIiwib3B0aW9uc1NlbGVjdGVkVGV4dCIsInNlbGVjdGVkVmFsdWUiLCJDaGlsZHJlbiIsImZvckVhY2giLCJjaGlsZHJlbiIsImxhYmVsIiwic2VsZWN0ZWRUZXh0IiwiaXRlbVZhbHVlIiwic2xpY2UiLCJwdXNoIiwic3BsaWNlIiwic2V0VmFsdWUiLCJ0YXJnZXRFbCIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsIm5vZGUiLCJkcm9wZG93biIsImRyb3Bkb3duRWwiLCJmaXJzdEl0ZW1FbCIsInF1ZXJ5U2VsZWN0b3IiLCJjbGFzc05hbWUiLCJkaXNhYmxlZCIsIm1lbnVTaXplIiwibWVudVN0eWxlIiwicGlja2xpc3RDbGFzc05hbWVzIiwib25DbGljayIsIm9uS2V5ZG93biIsImdldFNlbGVjdGVkSXRlbUxhYmVsIiwicmVuZGVyRHJvcGRvd24iLCJvblBpY2tsaXN0SXRlbUNsaWNrIiwib25QaWNrbGlzdENsb3NlIiwibWFwIiwicmVuZGVyUGlja2xpc3RJdGVtIiwicmVxdWlyZWQiLCJlcnJvciIsInRvdGFsQ29scyIsImNvbHMiLCJmb3JtRWxlbVByb3BzIiwicmVuZGVyUGlja2xpc3QiLCJDb21wb25lbnQiLCJQaWNrbGlzdEl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7SUFrQ2FBLFE7Ozs7O0FBU1gsb0JBQVlDLEtBQVosRUFBNEM7QUFBQTs7QUFBQTtBQUMxQyw4R0FBTUEsS0FBTjtBQUQwQyx1RkFOZCxJQU1jO0FBQUEsaUdBSkQsSUFJQztBQUFBLDJGQUZWLElBRVU7QUFBQSwwRkFhbEMsWUFBTTtBQUNkLFlBQUtDLFFBQUwsQ0FBYyxVQUFDQyxTQUFEO0FBQUEsZUFBZ0I7QUFBRUMsVUFBQUEsTUFBTSxFQUFFLENBQUNELFNBQVMsQ0FBQ0M7QUFBckIsU0FBaEI7QUFBQSxPQUFkOztBQUNBQyxNQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLGNBQUtDLG1CQUFMO0FBQ0QsT0FGUyxFQUVQLEVBRk8sQ0FBVjtBQUdELEtBbEIyQztBQUFBLHNHQW9CdEIsVUFBQ0MsSUFBRCxFQUFZQyxDQUFaLEVBQXVCO0FBQUEsa0NBQ1gsTUFBS1AsS0FETSxDQUNuQ1EsV0FEbUM7QUFBQSxVQUNuQ0EsV0FEbUMsc0NBQ3JCLEtBRHFCOztBQUUzQyxZQUFLQyxlQUFMLENBQXFCSCxJQUFJLENBQUNJLEtBQTFCOztBQUVBLFVBQUksTUFBS1YsS0FBTCxDQUFXVyxRQUFmLEVBQXlCO0FBQ3ZCLGNBQUtYLEtBQUwsQ0FBV1csUUFBWCxDQUFvQkosQ0FBcEIsRUFBdUJELElBQUksQ0FBQ0ksS0FBNUI7QUFDRDs7QUFDRCxVQUFJLE1BQUtWLEtBQUwsQ0FB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SUUsSUFBQSxRQUFRLEVBQUVzQztBQUpaLEtBS005RCxLQUxOLEdBT0c4QyxLQUFLLElBQUlELFFBUFosQ0FQdUQ7QUFBQSxDQUFsRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IEZvcm1FbGVtZW50LCBGb3JtRWxlbWVudFByb3BzIH0gZnJvbSAnLi9Gb3JtRWxlbWVudCc7XG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnLi9JY29uJztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4vQnV0dG9uJztcbmltcG9ydCB7IERyb3Bkb3duTWVudSwgRHJvcGRvd25NZW51SXRlbSB9IGZyb20gJy4vRHJvcGRvd25NZW51JztcbmltcG9ydCB7IHV1aWQsIGlzRWxJbkNoaWxkcmVuIH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IHR5cGUgUGlja2xpc3RQcm9wcyA9IHtcbiAgaWQ/OiBzdHJpbmc7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgbGFiZWw/OiBzdHJpbmc7XG4gIHJlcXVpcmVkPzogYm9vbGVhbjtcbiAgbXVsdGlTZWxlY3Q/OiBib29sZWFuO1xuICBlcnJvcj86IEZvcm1FbGVtZW50UHJvcHNbJ2Vycm9yJ107XG4gIHRvdGFsQ29scz86IG51bWJlcjtcbiAgY29scz86IG51bWJlcjtcbiAgbmFtZT86IHN0cmluZztcbiAgdmFsdWU/OiBzdHJpbmcgfCBudW1iZXIgfCAoc3RyaW5nIHwgbnVtYmVyKVtdO1xuICBkZWZhdWx0VmFsdWU/OiBzdHJpbmcgfCBudW1iZXIgfCAoc3RyaW5nIHwgbnVtYmVyKVtdO1xuICBzZWxlY3RlZFRleHQ/OiBzdHJpbmc7XG4gIG9wdGlvbnNTZWxlY3RlZFRleHQ/OiBzdHJpbmc7XG4gIGRlZmF1bHRPcGVuZWQ/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIG1lbnVTaXplPzogc3RyaW5nO1xuICBtZW51U3R5bGU/OiBvYmplY3Q7XG4gIG9uQ2hhbmdlPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG4gIG9uVmFsdWVDaGFuZ2U/OiAobmV3VmFsdWU/OiBhbnksIHByZXZWYWx1ZT86IGFueSkgPT4gdm9pZDtcbiAgb25TZWxlY3Q/OiAoLi4uYXJnczogYW55W10pID0+IGFueTtcbiAgb25Db21wbGV0ZT86ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55O1xuICBvbktleURvd24/OiAoLi4uYXJnczogYW55W10pID0+IGFueTtcbiAgb25CbHVyPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG59O1xuXG5leHBvcnQgdHlwZSBQaWNrbGlzdFN0YXRlID0ge1xuICBpZDogc3RyaW5nO1xuICBvcGVuZWQ/OiBib29sZWFuO1xuICB2YWx1ZTogKHN0cmluZyB8IG51bWJlcilbXTtcbn07XG5cbmV4cG9ydCBjbGFzcyBQaWNrbGlzdCBleHRlbmRzIENvbXBvbmVudDxQaWNrbGlzdFByb3BzLCBQaWNrbGlzdFN0YXRlPiB7XG4gIHN0YXRpYyBpc0Zvcm1FbGVtZW50ID0gdHJ1ZTtcblxuICBub2RlOiBIVE1MRGl2RWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIHBpY2tsaXN0QnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIGRyb3Bkb3duOiBIVE1MRGl2RWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBSZWFkb25seTxQaWNrbGlzdFByb3BzPikge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGNvbnN0IHsgZGVmYXVsdFZhbHVlID0gW10gfSA9IHByb3BzO1xuICAgIGNvbnN0IGluaXRpYWxWYWx1ZSA9IHByb3BzLnZhbHVlIHx8IGRlZmF1bHRWYWx1ZTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpZDogYGZvcm0tZWxlbWVudC0ke3V1aWQoKX1gLFxuICAgICAgb3BlbmVkOiBwcm9wcy5kZWZhdWx0T3BlbmVkLFxuICAgICAgdmFsdWU6IEFycmF5LmlzQXJyYXkoaW5pdGlhbFZhbHVlKSA/IGluaXRpYWxWYWx1ZSA6IFtpbml0aWFsVmFsdWVdLFxuICAgIH07XG4gIH1cblxuICBvbkNsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4gKHsgb3BlbmVkOiAhcHJldlN0YXRlLm9wZW5lZCB9KSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmZvY3VzVG9UYXJnZXRJdGVtRWwoKTtcbiAgICB9LCAxMCk7XG4gIH07XG5cbiAgb25QaWNrbGlzdEl0ZW1DbGljayA9IChpdGVtOiBhbnksIGU6IGFueSkgPT4ge1xuICAgIGNvbnN0IHsgbXVsdGlTZWxlY3QgPSBmYWxzZSB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnVwZGF0ZUl0ZW1WYWx1ZShpdGVtLnZhbHVlKTtcblxuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGUsIGl0ZW0udmFsdWUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5vblNlbGVjdCkge1xuICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChpdGVtKTtcbiAgICB9XG4gICAgaWYgKCFtdWx0aVNlbGVjdCkge1xuICAgICAgLy8gY2xvc2UgaWYgb25seSBzaW5nbGUgc2VsZWN0XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG9wZW5lZDogZmFsc2UgfSk7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ29tcGxldGUpIHtcbiAgICAgICAgICB0aGlzLnByb3BzLm9uQ29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwaWNrbGlzdEJ1dHRvbkVsID0gdGhpcy5waWNrbGlzdEJ1dHRvbjtcbiAgICAgICAgaWYgKHBpY2tsaXN0QnV0dG9uRWwpIHtcbiAgICAgICAgICBwaWNrbGlzdEJ1dHRvbkVsLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDIwMCk7XG4gICAgfVxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9O1xuXG4gIG9uUGlja2xpc3RDbG9zZSA9ICgpID0+IHtcbiAgICBjb25zdCBwaWNrbGlzdEJ1dHRvbkVsID0gdGhpcy5waWNrbGlzdEJ1dHRvbjtcbiAgICBpZiAocGlja2xpc3RCdXR0b25FbCkge1xuICAgICAgcGlja2xpc3RCdXR0b25FbC5mb2N1cygpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgb3BlbmVkOiBmYWxzZSB9KTtcbiAgfTtcblxuICBvbkJsdXIgPSAoKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuaXNGb2N1c2VkSW5Db21wb25lbnQoKSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgb3BlbmVkOiBmYWxzZSB9KTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25CbHVyKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5vbkJsdXIoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNvbXBsZXRlKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5vbkNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCAxMCk7XG4gIH07XG5cbiAgb25LZXlkb3duID0gKGU6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gNDApIHtcbiAgICAgIC8vIGRvd25cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBpZiAoIXRoaXMuc3RhdGUub3BlbmVkKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBvcGVuZWQ6IHRydWUgfSk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZm9jdXNUb1RhcmdldEl0ZW1FbCgpO1xuICAgICAgICB9LCAxMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZvY3VzVG9UYXJnZXRJdGVtRWwoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgIC8vIEVTQ1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBvcGVuZWQ6IGZhbHNlIH0pO1xuICAgICAgaWYgKHRoaXMucHJvcHMub25Db21wbGV0ZSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ29tcGxldGUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMub25LZXlEb3duKSB7XG4gICAgICB0aGlzLnByb3BzLm9uS2V5RG93bihlKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0VmFsdWUoKSB7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gdGhpcy5wcm9wcztcbiAgICAvLyBmb3IgY29udHJvbGxlZCBiZWhhdmlvciByZXR1cm5pbmcgdmFsdWUgZnJvbSBwcm9wc1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xuICAgIH1cbiAgICAvLyBmb3IgdW5jb250cm9sbGVkIC0gdmFsdWUgZnJvbSBzdGF0ZVxuICAgIHJldHVybiB0aGlzLnN0YXRlLnZhbHVlO1xuICB9XG5cbiAgc2V0VmFsdWUobmV3VmFsdWU6IChzdHJpbmcgfCBudW1iZXIpW10pIHtcbiAgICBjb25zdCB7IG11bHRpU2VsZWN0ID0gZmFsc2UsIG9uVmFsdWVDaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgcHJldlZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogbmV3VmFsdWUgfSk7XG5cbiAgICAvLyB0aGlzIGlzIGZvciBjb250cm9sbGVkIGJlaGF2aW9yXG4gICAgaWYgKG9uVmFsdWVDaGFuZ2UgJiYgcHJldlZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgaWYgKG11bHRpU2VsZWN0KSB7XG4gICAgICAgIG9uVmFsdWVDaGFuZ2UobmV3VmFsdWUsIHByZXZWYWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvblZhbHVlQ2hhbmdlKFxuICAgICAgICAgIG5ld1ZhbHVlLmxlbmd0aCA+IDAgPyBuZXdWYWx1ZVswXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICBwcmV2VmFsdWUubGVuZ3RoID4gMCA/IHByZXZWYWx1ZVswXSA6IHVuZGVmaW5lZFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFNlbGVjdGVkSXRlbUxhYmVsKCkge1xuICAgIGNvbnN0IHNlbGVjdGVkVmFsdWVzID0gdGhpcy5nZXRWYWx1ZSgpO1xuXG4gICAgLy8gbWFueSBpdGVtcyBzZWxlY3RlZFxuICAgIGlmIChzZWxlY3RlZFZhbHVlcy5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCB7IG9wdGlvbnNTZWxlY3RlZFRleHQgPSAnJyB9ID0gdGhpcy5wcm9wcztcbiAgICAgIHJldHVybiBvcHRpb25zU2VsZWN0ZWRUZXh0O1xuICAgIH1cblxuICAgIC8vIG9uZSBpdGVtXG4gICAgaWYgKHNlbGVjdGVkVmFsdWVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZSA9IHNlbGVjdGVkVmFsdWVzWzBdO1xuICAgICAgbGV0IHNlbGVjdGVkID0gbnVsbDtcbiAgICAgIFJlYWN0LkNoaWxkcmVuLmZvckVhY2godGhpcy5wcm9wcy5jaGlsZHJlbiwgKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICBpZiAoaXRlbS5wcm9wcy52YWx1ZSA9PT0gc2VsZWN0ZWRWYWx1ZSkge1xuICAgICAgICAgIHNlbGVjdGVkID0gaXRlbS5wcm9wcy5sYWJlbCB8fCBpdGVtLnByb3BzLmNoaWxkcmVuO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBzZWxlY3RlZCB8fCBzZWxlY3RlZFZhbHVlO1xuICAgIH1cblxuICAgIC8vIHplcm8gaXRlbXNcbiAgICBjb25zdCB7IHNlbGVjdGVkVGV4dCA9ICcnIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBzZWxlY3RlZFRleHQ7XG4gIH1cblxuICB1cGRhdGVJdGVtVmFsdWUoaXRlbVZhbHVlOiBhbnkpIHtcbiAgICBjb25zdCB7IG11bHRpU2VsZWN0ID0gZmFsc2UgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAobXVsdGlTZWxlY3QpIHtcbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpLnNsaWNlKCk7XG5cbiAgICAgIC8vIHRvZ2dsZSB2YWx1ZVxuICAgICAgaWYgKG5ld1ZhbHVlLmluZGV4T2YoaXRlbVZhbHVlKSA9PT0gLTEpIHtcbiAgICAgICAgLy8gYWRkIHZhbHVlIHRvIGFycmF5XG4gICAgICAgIG5ld1ZhbHVlLnB1c2goaXRlbVZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJlbW92ZSBmcm9tIGFycmF5XG4gICAgICAgIG5ld1ZhbHVlLnNwbGljZShuZXdWYWx1ZS5pbmRleE9mKGl0ZW1WYWx1ZSksIDEpO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRWYWx1ZShuZXdWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNldCBvbmx5IG9uZSB2YWx1ZVxuICAgICAgdGhpcy5zZXRWYWx1ZShbaXRlbVZhbHVlXSk7XG4gICAgfVxuICB9XG5cbiAgaXNGb2N1c2VkSW5Db21wb25lbnQoKSB7XG4gICAgY29uc3QgdGFyZ2V0RWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgIHJldHVybiAoXG4gICAgICBpc0VsSW5DaGlsZHJlbih0aGlzLm5vZGUsIHRhcmdldEVsKSB8fFxuICAgICAgaXNFbEluQ2hpbGRyZW4odGhpcy5kcm9wZG93biwgdGFyZ2V0RWwpXG4gICAgKTtcbiAgfVxuXG4gIGZvY3VzVG9UYXJnZXRJdGVtRWwoKSB7XG4gICAgY29uc3QgZHJvcGRvd25FbCA9IHRoaXMuZHJvcGRvd247XG4gICAgaWYgKCFkcm9wZG93bkVsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGZpcnN0SXRlbUVsOiBIVE1MQW5jaG9yRWxlbWVudCB8IG51bGwgPVxuICAgICAgZHJvcGRvd25FbC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnLnNsZHMtaXMtc2VsZWN0ZWQgPiAucmVhY3Qtc2xkcy1tZW51aXRlbVt0YWJJbmRleF0nXG4gICAgICApIHx8IGRyb3Bkb3duRWwucXVlcnlTZWxlY3RvcignLnJlYWN0LXNsZHMtbWVudWl0ZW1bdGFiSW5kZXhdJyk7XG4gICAgaWYgKGZpcnN0SXRlbUVsKSB7XG4gICAgICBmaXJzdEl0ZW1FbC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlclBpY2tsaXN0KHByb3BzOiBQaWNrbGlzdFByb3BzKSB7XG4gICAgY29uc3QgeyBjbGFzc05hbWUsIGlkLCBkaXNhYmxlZCwgbWVudVNpemUsIG1lbnVTdHlsZSB9ID0gcHJvcHM7XG4gICAgY29uc3QgcGlja2xpc3RDbGFzc05hbWVzID0gY2xhc3NuYW1lcyhcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgICdzbGRzLXBpY2tsaXN0JyxcbiAgICAgICdzbGRzLWRyb3Bkb3duLXRyaWdnZXInXG4gICAgKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3BpY2tsaXN0Q2xhc3NOYW1lc30gYXJpYS1leHBhbmRlZD17dGhpcy5zdGF0ZS5vcGVuZWR9PlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgaWQ9e2lkfVxuICAgICAgICAgIGJ1dHRvblJlZj17KG5vZGUpID0+ICh0aGlzLnBpY2tsaXN0QnV0dG9uID0gbm9kZSl9XG4gICAgICAgICAgY2xhc3NOYW1lPSdzbGRzLXBpY2tsaXN0X19sYWJlbCdcbiAgICAgICAgICB0eXBlPSduZXV0cmFsJ1xuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICBvbkNsaWNrPXtkaXNhYmxlZCA/IHVuZGVmaW5lZCA6IHRoaXMub25DbGlja31cbiAgICAgICAgICBvbkJsdXI9e2Rpc2FibGVkID8gdW5kZWZpbmVkIDogdGhpcy5vbkJsdXJ9XG4gICAgICAgICAgb25LZXlEb3duPXtkaXNhYmxlZCA/IHVuZGVmaW5lZCA6IHRoaXMub25LZXlkb3dufVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdzbGRzLXRydW5jYXRlJz5cbiAgICAgICAgICAgIHt0aGlzLmdldFNlbGVjdGVkSXRlbUxhYmVsKCkgfHwgPHNwYW4+Jm5ic3A7PC9zcGFuPn1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPEljb24gaWNvbj0nZG93bicgLz5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIHt0aGlzLnJlbmRlckRyb3Bkb3duKG1lbnVTaXplLCBtZW51U3R5bGUpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlckRyb3Bkb3duKG1lbnVTaXplOiBhbnksIG1lbnVTdHlsZTogb2JqZWN0IHwgdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgeyBjbGFzc05hbWUsIGNoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiB0aGlzLnN0YXRlLm9wZW5lZCA/IChcbiAgICAgIDxEcm9wZG93bk1lbnVcbiAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPXtjbGFzc25hbWVzKGNsYXNzTmFtZSwgJ3NsZHMtcGlja2xpc3QnKX1cbiAgICAgICAgZHJvcGRvd25NZW51UmVmPXsobm9kZTogSFRNTERpdkVsZW1lbnQpID0+ICh0aGlzLmRyb3Bkb3duID0gbm9kZSl9XG4gICAgICAgIHNpemU9e21lbnVTaXplfVxuICAgICAgICBvbk1lbnVJdGVtQ2xpY2s9e3RoaXMub25QaWNrbGlzdEl0ZW1DbGlja31cbiAgICAgICAgb25NZW51Q2xvc2U9e3RoaXMub25QaWNrbGlzdENsb3NlfVxuICAgICAgICBzdHlsZT17bWVudVN0eWxlfVxuICAgICAgICBvbkJsdXI9e3RoaXMub25CbHVyfVxuICAgICAgPlxuICAgICAgICB7UmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCB0aGlzLnJlbmRlclBpY2tsaXN0SXRlbSl9XG4gICAgICA8L0Ryb3Bkb3duTWVudT5cbiAgICApIDogKFxuICAgICAgPGRpdiByZWY9eyhub2RlKSA9PiAodGhpcy5kcm9wZG93biA9IG5vZGUpfSAvPlxuICAgICk7XG4gIH1cblxuICByZW5kZXJQaWNrbGlzdEl0ZW0gPSAoaXRlbTogYW55KSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLmdldFZhbHVlKCkuaW5kZXhPZihpdGVtLnByb3BzLnZhbHVlKSAhPT0gLTE7XG4gICAgY29uc3QgeyBvbkJsdXIgfSA9IHRoaXM7XG4gICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChpdGVtLCB7IHNlbGVjdGVkLCBvbkJsdXIgfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGlkID0gdGhpcy5wcm9wcy5pZCB8fCB0aGlzLnN0YXRlLmlkO1xuICAgIGNvbnN0IHsgbGFiZWwsIHJlcXVpcmVkLCBlcnJvciwgdG90YWxDb2xzLCBjb2xzLCAuLi5wcm9wcyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBmb3JtRWxlbVByb3BzID0geyBpZCwgbGFiZWwsIHJlcXVpcmVkLCBlcnJvciwgdG90YWxDb2xzLCBjb2xzIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxGb3JtRWxlbWVudFxuICAgICAgICBmb3JtRWxlbWVudFJlZj17KG5vZGUpID0+ICh0aGlzLm5vZGUgPSBub2RlKX1cbiAgICAgICAgey4uLmZvcm1FbGVtUHJvcHN9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnJlbmRlclBpY2tsaXN0KHsgLi4ucHJvcHMsIGlkIH0pfVxuICAgICAgPC9Gb3JtRWxlbWVudD5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIFBpY2tsaXN0SXRlbVByb3BzID0ge1xuICBsYWJlbD86IHN0cmluZyB8IG51bWJlcjtcbiAgc2VsZWN0ZWQ/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xufTtcblxuZXhwb3J0IGNvbnN0IFBpY2tsaXN0SXRlbTogUmVhY3QuRkM8UGlja2xpc3RJdGVtUHJvcHM+ID0gKHtcbiAgbGFiZWwsXG4gIHNlbGVjdGVkLFxuICBkaXNhYmxlZCxcbiAgY2hpbGRyZW4sXG4gIC4uLnByb3BzXG59KSA9PiAoXG4gIDxEcm9wZG93bk1lbnVJdGVtXG4gICAgaWNvbj17c2VsZWN0ZWQgPyAnY2hlY2snIDogJ25vbmUnfVxuICAgIHJvbGU9J21lbnVpdGVtcmFkaW8nXG4gICAgc2VsZWN0ZWQ9e3NlbGVjdGVkfVxuICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICB7Li4ucHJvcHN9XG4gID5cbiAgICB7bGFiZWwgfHwgY2hpbGRyZW59XG4gIDwvRHJvcGRvd25NZW51SXRlbT5cbik7XG4iXX0=