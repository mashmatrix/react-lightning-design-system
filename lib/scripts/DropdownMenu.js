"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownMenu = exports.MenuItem = exports.DropdownMenuItem = exports.MenuHeader = exports.DropdownMenuHeader = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _Icon = require("./Icon");

var _AutoAlign = require("./AutoAlign");

var _Picklist = require("./Picklist");

var DropdownMenuHeader = function DropdownMenuHeader(_ref) {
  var divider = _ref.divider,
      className = _ref.className,
      children = _ref.children;
  var menuHeaderClass = (0, _classnames3.default)('slds-dropdown__header', (0, _defineProperty2.default)({}, "slds-has-divider--".concat(divider, "-space"), divider), className);
  return _react.default.createElement("div", {
    className: menuHeaderClass
  }, _react.default.createElement("span", {
    className: "slds-text-heading--label"
  }, children));
};

exports.DropdownMenuHeader = DropdownMenuHeader;
var MenuHeader = DropdownMenuHeader;
exports.MenuHeader = MenuHeader;

var DropdownMenuItem =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DropdownMenuItem, _Component);

  function DropdownMenuItem() {
    (0, _classCallCheck2.default)(this, DropdownMenuItem);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(DropdownMenuItem).apply(this, arguments));
  }

  (0, _createClass2.default)(DropdownMenuItem, [{
    key: "onKeyDown",
    value: function onKeyDown(e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        // return or space
        e.preventDefault();
        e.stopPropagation();

        if (this.props.onClick) {
          this.props.onClick(e);
        }
      } else if (e.keyCode === 40 || e.keyCode === 38) {
        e.preventDefault();
        e.stopPropagation();
        var currentEl = e.target.parentElement;
        var itemEl = e.keyCode === 40 ? currentEl.nextSibling : currentEl.previousSibling;

        while (itemEl) {
          var anchorEl = itemEl.querySelector('.react-slds-menuitem[tabIndex]');

          if (anchorEl && !anchorEl.disabled) {
            anchorEl.focus();
            return;
          }

          itemEl = e.keyCode === 40 ? itemEl.nextSibling : itemEl.previousSibling;
        }
      }
    }
  }, {
    key: "onBlur",
    value: function onBlur(e) {
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
    }
  }, {
    key: "onFocus",
    value: function onFocus(e) {
      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          label = _this$props.label,
          icon = _this$props.icon,
          iconRight = _this$props.iconRight,
          selected = _this$props.selected,
          disabled = _this$props.disabled,
          divider = _this$props.divider,
          _this$props$tabIndex = _this$props.tabIndex,
          tabIndex = _this$props$tabIndex === void 0 ? 0 : _this$props$tabIndex,
          onClick = _this$props.onClick,
          children = _this$props.children,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["className", "label", "icon", "iconRight", "selected", "disabled", "divider", "tabIndex", "onClick", "children"]);
      var menuItemClass = (0, _classnames3.default)('slds-dropdown__item', (0, _defineProperty2.default)({
        'slds-is-selected': selected
      }, "slds-has-divider--".concat(divider, "-space"), divider), className);
      return _react.default.createElement("li", {
        className: menuItemClass
      }, _react.default.createElement("a", (0, _extends2.default)({
        className: "slds-truncate react-slds-menuitem",
        role: "menuitem",
        "aria-disabled": disabled,
        tabIndex: disabled ? undefined : tabIndex,
        onClick: disabled ? undefined : onClick,
        onKeyDown: disabled ? undefined : this.onKeyDown.bind(this),
        onBlur: disabled ? undefined : this.onBlur.bind(this),
        onFocus: disabled ? undefined : this.onFocus.bind(this)
      }, props), _react.default.createElement("p", {
        className: "slds-truncate"
      }, icon ? _react.default.createElement(_Icon.Icon, {
        icon: icon,
        size: "x-small",
        align: "left"
      }) : null, label || children), iconRight ? _react.default.createElement(_Icon.Icon, {
        icon: iconRight,
        size: "x-small",
        align: "right"
      }) : null));
    }
  }]);
  return DropdownMenuItem;
}(_react.Component);

exports.DropdownMenuItem = DropdownMenuItem;
var MenuItem = DropdownMenuItem;
exports.MenuItem = MenuItem;

var WrappedDropdownMenu =
/*#__PURE__*/
function (_Component2) {
  (0, _inherits2.default)(WrappedDropdownMenu, _Component2);

  function WrappedDropdownMenu() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, WrappedDropdownMenu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(WrappedDropdownMenu)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "node", null);
    return _this;
  }

  (0, _createClass2.default)(WrappedDropdownMenu, [{
    key: "onMenuItemBlur",
    value: function onMenuItemBlur(e) {
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
    }
  }, {
    key: "onMenuItemFocus",
    value: function onMenuItemFocus(e) {
      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      if (e.keyCode === 27) {
        // ESC
        if (this.props.onMenuClose) {
          this.props.onMenuClose();
        }
      }
    }
  }, {
    key: "renderMenuItem",
    value: function renderMenuItem(menuItem) {
      var _this2 = this;

      var _menuItem$props = menuItem.props,
          onClick = _menuItem$props.onClick,
          onBlur = _menuItem$props.onBlur,
          onFocus = _menuItem$props.onFocus,
          props = (0, _objectWithoutProperties2.default)(_menuItem$props, ["onClick", "onBlur", "onFocus"]);

      var onMenuItemClick = function onMenuItemClick() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        if (onClick) {
          onClick.apply(void 0, args);
        }

        if (_this2.props.onMenuItemClick) {
          var _this2$props;

          (_this2$props = _this2.props).onMenuItemClick.apply(_this2$props, [props].concat(args));
        }
      };

      var onMenuItemFocus = function onMenuItemFocus(e) {
        if (onFocus) {
          onFocus(e);
        }

        _this2.onMenuItemFocus(e);
      };

      var onMenuItemBlur = function onMenuItemBlur(e) {
        if (onBlur) {
          onBlur(e);
        }

        _this2.onMenuItemBlur(e);
      };

      return _react.default.cloneElement(menuItem, {
        onClick: onMenuItemClick,
        onBlur: onMenuItemBlur,
        onFocus: onMenuItemFocus
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          className = _this$props2.className,
          align = _this$props2.align,
          vertAlign = _this$props2.vertAlign,
          size = _this$props2.size,
          header = _this$props2.header,
          nubbinTop = _this$props2.nubbinTop,
          hoverPopup = _this$props2.hoverPopup,
          children = _this$props2.children,
          style = _this$props2.style,
          dropdownMenuRef = _this$props2.dropdownMenuRef,
          onFocus = _this$props2.onFocus,
          onBlur = _this$props2.onBlur;
      var nubbin = nubbinTop ? 'auto' : this.props.nubbin;
      var nubbinPosition = nubbin === 'auto' ? "".concat(vertAlign, " ").concat(align) : nubbin;
      var dropdownClassNames = (0, _classnames3.default)(className, 'slds-dropdown', "slds-dropdown--".concat(align), "slds-dropdown--".concat(vertAlign), size ? "slds-dropdown--".concat(size) : undefined, nubbinPosition ? "slds-nubbin_".concat(nubbinPosition.replace(/\s+/g, '-')) : undefined, {
        'react-slds-no-hover-popup': !hoverPopup
      });

      var handleDOMRef = function handleDOMRef(node) {
        _this3.node = node;

        if (dropdownMenuRef) {
          dropdownMenuRef(node);
        }
      };

      return _react.default.createElement("div", {
        className: dropdownClassNames,
        ref: handleDOMRef,
        style: (0, _objectSpread2.default)({
          outline: 'none'
        }, style),
        onKeyDown: this.onKeyDown.bind(this),
        tabIndex: -1,
        onFocus: onFocus,
        onBlur: onBlur
      }, header ? _react.default.createElement(MenuHeader, null, header) : null, _react.default.createElement("ul", {
        className: "slds-dropdown__list",
        role: "menu"
      }, _react.default.Children.map(children, function (item) {
        return item.type === MenuItem || item.type === _Picklist.PicklistItem ? _this3.renderMenuItem(item) : item;
      })));
    }
  }]);
  return WrappedDropdownMenu;
}(_react.Component);

function preventPortalizeOnHoverPopup(Cmp) {
  var Result = function Result(props) {
    return _react.default.createElement(Cmp, (0, _extends2.default)({
      preventPortalize: !!props.hoverPopup
    }, props));
  };

  return Result;
}

var DropdownMenu = preventPortalizeOnHoverPopup((0, _AutoAlign.autoAlign)({
  triggerSelector: '.slds-dropdown-trigger'
})(WrappedDropdownMenu));
exports.DropdownMenu = DropdownMenu;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL0Ryb3Bkb3duTWVudS50c3giXSwibmFtZXMiOlsiRHJvcGRvd25NZW51SGVhZGVyIiwiZGl2aWRlciIsImNsYXNzTmFtZSIsImNoaWxkcmVuIiwibWVudUhlYWRlckNsYXNzIiwiTWVudUhlYWRlciIsIkRyb3Bkb3duTWVudUl0ZW0iLCJlIiwia2V5Q29kZSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwicHJvcHMiLCJvbkNsaWNrIiwiY3VycmVudEVsIiwidGFyZ2V0IiwicGFyZW50RWxlbWVudCIsIml0ZW1FbCIsIm5leHRTaWJsaW5nIiwicHJldmlvdXNTaWJsaW5nIiwiYW5jaG9yRWwiLCJxdWVyeVNlbGVjdG9yIiwiZGlzYWJsZWQiLCJmb2N1cyIsIm9uQmx1ciIsIm9uRm9jdXMiLCJsYWJlbCIsImljb24iLCJpY29uUmlnaHQiLCJzZWxlY3RlZCIsInRhYkluZGV4IiwibWVudUl0ZW1DbGFzcyIsInVuZGVmaW5lZCIsIm9uS2V5RG93biIsImJpbmQiLCJDb21wb25lbnQiLCJNZW51SXRlbSIsIldyYXBwZWREcm9wZG93bk1lbnUiLCJvbk1lbnVDbG9zZSIsIm1lbnVJdGVtIiwib25NZW51SXRlbUNsaWNrIiwiYXJncyIsIm9uTWVudUl0ZW1Gb2N1cyIsIm9uTWVudUl0ZW1CbHVyIiwiUmVhY3QiLCJjbG9uZUVsZW1lbnQiLCJhbGlnbiIsInZlcnRBbGlnbiIsInNpemUiLCJoZWFkZXIiLCJudWJiaW5Ub3AiLCJob3ZlclBvcHVwIiwic3R5bGUiLCJkcm9wZG93bk1lbnVSZWYiLCJudWJiaW4iLCJudWJiaW5Qb3NpdGlvbiIsImRyb3Bkb3duQ2xhc3NOYW1lcyIsInJlcGxhY2UiLCJoYW5kbGVET01SZWYiLCJub2RlIiwib3V0bGluZSIsIkNoaWxkcmVuIiwibWFwIiwiaXRlbSIsInR5cGUiLCJQaWNrbGlzdEl0ZW0iLCJyZW5kZXJNZW51SXRlbSIsInByZXZlbnRQb3J0YWxpemVPbkhvdmVyUG9w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UUFBQSxJQUFJLEVBQUM7QUFBekMsU0FDR0wsZUFBTWlCLFFBQU4sQ0FBZUMsR0FBZixDQUFtQjFELFFBQW5CLEVBQTZCLFVBQUMyRCxJQUFEO0FBQUEsZUFDNUJBLElBQUksQ0FBQ0MsSUFBTCxLQUFjNUIsUUFBZCxJQUEwQjJCLElBQUksQ0FBQ0MsSUFBTCxLQUFjQyxzQkFBeEMsR0FDSSxNQUFJLENBQUNDLGNBQUwsQ0FBb0JILElBQXBCLENBREosR0FFSUEsSUFId0I7QUFBQSxPQUE3QixDQURILENBVkYsQ0FERjtBQW9CRDs7O0VBM0crQjVCLGdCOztBQThHbEMsU0FBU2dDLDRCQUFULENBQ0VDLEdBREYsRUFFRTtBQUVBLE1BQU1DLE1BQTZCLEdBQUcsU0FBaENBLE1BQWdDLENBQUN6RCxLQUFEO0FBQUEsV0FDcEMsNkJBQUMsR0FBRDtBQUFLLE1BQUEsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDQSxLQUFLLENBQUN1QztBQUEvQixPQUErQ3ZDLEtBQS9DLEVBRG9DO0FBQUEsR0FBdEM7O0FBR0EsU0FBT3lELE1BQVA7QUFDRDs7QUFFTSxJQUFNQyxZQUFZLEdBQUdILDRCQUE0QixDQUN0RCwwQkFBVTtBQUNSSSxFQUFBQSxlQUFlLEVBQUU7QUFEVCxDQUFWLEVBRUdsQyxtQkFGSCxDQURzRCxDQUFqRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIENvbXBvbmVudFR5cGUsIEFuY2hvckhUTUxBdHRyaWJ1dGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnLi9JY29uJztcbmltcG9ydCB7IGF1dG9BbGlnbiwgSW5qZWN0ZWRQcm9wcywgQXV0b0FsaWduUHJvcHMgfSBmcm9tICcuL0F1dG9BbGlnbic7XG5pbXBvcnQgeyBQaWNrbGlzdEl0ZW0gfSBmcm9tICcuL1BpY2tsaXN0JztcblxuZXhwb3J0IHR5cGUgRHJvcGRvd25NZW51SGVhZGVyUHJvcHMgPSB7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgZGl2aWRlcj86ICd0b3AnIHwgJ2JvdHRvbSc7XG59O1xuXG5leHBvcnQgY29uc3QgRHJvcGRvd25NZW51SGVhZGVyOiBSZWFjdC5GQzxEcm9wZG93bk1lbnVIZWFkZXJQcm9wcz4gPSAoe1xuICBkaXZpZGVyLFxuICBjbGFzc05hbWUsXG4gIGNoaWxkcmVuLFxufSkgPT4ge1xuICBjb25zdCBtZW51SGVhZGVyQ2xhc3MgPSBjbGFzc25hbWVzKFxuICAgICdzbGRzLWRyb3Bkb3duX19oZWFkZXInLFxuICAgIHsgW2BzbGRzLWhhcy1kaXZpZGVyLS0ke2RpdmlkZXJ9LXNwYWNlYF06IGRpdmlkZXIgfSxcbiAgICBjbGFzc05hbWVcbiAgKTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17bWVudUhlYWRlckNsYXNzfT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT0nc2xkcy10ZXh0LWhlYWRpbmctLWxhYmVsJz57Y2hpbGRyZW59PC9zcGFuPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IE1lbnVIZWFkZXIgPSBEcm9wZG93bk1lbnVIZWFkZXI7XG5cbmV4cG9ydCB0eXBlIERyb3Bkb3duTWVudUl0ZW1Qcm9wcyA9IHtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBsYWJlbD86IHN0cmluZztcbiAgaWNvbj86IHN0cmluZztcbiAgaWNvblJpZ2h0Pzogc3RyaW5nO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIGRpdmlkZXI/OiAndG9wJyB8ICdib3R0b20nO1xuICB0YWJJbmRleD86IG51bWJlcjtcbiAgc2VsZWN0ZWQ/OiBib29sZWFuO1xuICBvbkNsaWNrPzogKGU6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEFuY2hvckVsZW1lbnQsIE1vdXNlRXZlbnQ+KSA9PiB2b2lkO1xuICBvbkJsdXI/OiAoZTogUmVhY3QuRm9jdXNFdmVudDxIVE1MQW5jaG9yRWxlbWVudD4pID0+IHZvaWQ7XG4gIG9uRm9jdXM/OiAoZTogUmVhY3QuRm9jdXNFdmVudDxIVE1MQW5jaG9yRWxlbWVudD4pID0+IHZvaWQ7XG59ICYgQW5jaG9ySFRNTEF0dHJpYnV0ZXM8SFRNTEFuY2hvckVsZW1lbnQ+O1xuXG5leHBvcnQgY2xhc3MgRHJvcGRvd25NZW51SXRlbSBleHRlbmRzIENvbXBvbmVudDxEcm9wZG93bk1lbnVJdGVtUHJvcHM+IHtcbiAgb25LZXlEb3duKGU6IGFueSkge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDEzIHx8IGUua2V5Q29kZSA9PT0gMzIpIHtcbiAgICAgIC8vIHJldHVybiBvciBzcGFjZVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2xpY2spIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSA0MCB8fCBlLmtleUNvZGUgPT09IDM4KSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgY29uc3QgY3VycmVudEVsID0gZS50YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICAgIGxldCBpdGVtRWwgPVxuICAgICAgICBlLmtleUNvZGUgPT09IDQwID8gY3VycmVudEVsLm5leHRTaWJsaW5nIDogY3VycmVudEVsLnByZXZpb3VzU2libGluZztcbiAgICAgIHdoaWxlIChpdGVtRWwpIHtcbiAgICAgICAgY29uc3QgYW5jaG9yRWwgPSBpdGVtRWwucXVlcnlTZWxlY3RvcignLnJlYWN0LXNsZHMtbWVudWl0ZW1bdGFiSW5kZXhdJyk7XG4gICAgICAgIGlmIChhbmNob3JFbCAmJiAhYW5jaG9yRWwuZGlzYWJsZWQpIHtcbiAgICAgICAgICBhbmNob3JFbC5mb2N1cygpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpdGVtRWwgPSBlLmtleUNvZGUgPT09IDQwID8gaXRlbUVsLm5leHRTaWJsaW5nIDogaXRlbUVsLnByZXZpb3VzU2libGluZztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkJsdXIoZTogUmVhY3QuRm9jdXNFdmVudDxIVE1MQW5jaG9yRWxlbWVudD4pIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkJsdXIpIHtcbiAgICAgIHRoaXMucHJvcHMub25CbHVyKGUpO1xuICAgIH1cbiAgfVxuXG4gIG9uRm9jdXMoZTogUmVhY3QuRm9jdXNFdmVudDxIVE1MQW5jaG9yRWxlbWVudD4pIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkZvY3VzKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRm9jdXMoZSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIGxhYmVsLFxuICAgICAgaWNvbixcbiAgICAgIGljb25SaWdodCxcbiAgICAgIHNlbGVjdGVkLFxuICAgICAgZGlzYWJsZWQsXG4gICAgICBkaXZpZGVyLFxuICAgICAgdGFiSW5kZXggPSAwLFxuICAgICAgb25DbGljayxcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgLi4ucHJvcHNcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBtZW51SXRlbUNsYXNzID0gY2xhc3NuYW1lcyhcbiAgICAgICdzbGRzLWRyb3Bkb3duX19pdGVtJyxcbiAgICAgIHtcbiAgICAgICAgJ3NsZHMtaXMtc2VsZWN0ZWQnOiBzZWxlY3RlZCxcbiAgICAgICAgW2BzbGRzLWhhcy1kaXZpZGVyLS0ke2RpdmlkZXJ9LXNwYWNlYF06IGRpdmlkZXIsXG4gICAgICB9LFxuICAgICAgY2xhc3NOYW1lXG4gICAgKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGxpIGNsYXNzTmFtZT17bWVudUl0ZW1DbGFzc30+XG4gICAgICAgIHsvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUganN4LWExMXkvaW50ZXJhY3RpdmUtc3VwcG9ydHMtZm9jdXMgKi99XG4gICAgICAgIDxhXG4gICAgICAgICAgY2xhc3NOYW1lPSdzbGRzLXRydW5jYXRlIHJlYWN0LXNsZHMtbWVudWl0ZW0nXG4gICAgICAgICAgcm9sZT0nbWVudWl0ZW0nXG4gICAgICAgICAgYXJpYS1kaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgdGFiSW5kZXg9e2Rpc2FibGVkID8gdW5kZWZpbmVkIDogdGFiSW5kZXh9XG4gICAgICAgICAgb25DbGljaz17ZGlzYWJsZWQgPyB1bmRlZmluZWQgOiBvbkNsaWNrfVxuICAgICAgICAgIG9uS2V5RG93bj17ZGlzYWJsZWQgPyB1bmRlZmluZWQgOiB0aGlzLm9uS2V5RG93bi5iaW5kKHRoaXMpfVxuICAgICAgICAgIG9uQmx1cj17ZGlzYWJsZWQgPyB1bmRlZmluZWQgOiB0aGlzLm9uQmx1ci5iaW5kKHRoaXMpfVxuICAgICAgICAgIG9uRm9jdXM9e2Rpc2FibGVkID8gdW5kZWZpbmVkIDogdGhpcy5vbkZvY3VzLmJpbmQodGhpcyl9XG4gICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICA+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPSdzbGRzLXRydW5jYXRlJz5cbiAgICAgICAgICAgIHtpY29uID8gPEljb24gaWNvbj17aWNvbn0gc2l6ZT0neC1zbWFsbCcgYWxpZ249J2xlZnQnIC8+IDogbnVsbH1cbiAgICAgICAgICAgIHtsYWJlbCB8fCBjaGlsZHJlbn1cbiAgICAgICAgICA8L3A+XG4gICAgICAgICAge2ljb25SaWdodCA/IChcbiAgICAgICAgICAgIDxJY29uIGljb249e2ljb25SaWdodH0gc2l6ZT0neC1zbWFsbCcgYWxpZ249J3JpZ2h0JyAvPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IE1lbnVJdGVtID0gRHJvcGRvd25NZW51SXRlbTtcblxuZXhwb3J0IHR5cGUgRHJvcGRvd25NZW51UHJvcHMgPSB7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgc2l6ZT86ICdzbWFsbCcgfCAnbWVkaXVtJyB8ICdsYXJnZSc7XG4gIGhlYWRlcj86IHN0cmluZztcbiAgbnViYmluPzpcbiAgICB8ICd0b3AnXG4gICAgfCAndG9wIGxlZnQnXG4gICAgfCAndG9wIHJpZ2h0J1xuICAgIHwgJ2JvdHRvbSdcbiAgICB8ICdib3R0b20gbGVmdCdcbiAgICB8ICdib3R0b20gcmlnaHQnXG4gICAgfCAnYXV0byc7XG4gIG51YmJpblRvcD86IGJvb2xlYW47IC8vIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LiB1c2UgbnViYmluIGluc3RlYWRcbiAgaG92ZXJQb3B1cD86IGJvb2xlYW47XG4gIG9uTWVudUl0ZW1DbGljaz86IChwcm9wczogYW55LCAuLi5hcmdzOiBhbnlbXSkgPT4gdm9pZDtcbiAgb25NZW51Q2xvc2U/OiAoKSA9PiB2b2lkO1xuICBvbkJsdXI/OiAoZTogYW55KSA9PiB2b2lkO1xuICBvbkZvY3VzPzogKGU6IGFueSkgPT4gdm9pZDtcbiAgZHJvcGRvd25NZW51UmVmPzogKG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB2b2lkO1xuICBzdHlsZT86IG9iamVjdDtcbn07XG5cbmNsYXNzIFdyYXBwZWREcm9wZG93bk1lbnUgZXh0ZW5kcyBDb21wb25lbnQ8RHJvcGRvd25NZW51UHJvcHMgJiBJbmplY3RlZFByb3BzPiB7XG4gIG5vZGU6IEhUTUxEaXZFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgb25NZW51SXRlbUJsdXIoZTogYW55KSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25CbHVyKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQmx1cihlKTtcbiAgICB9XG4gIH1cblxuICBvbk1lbnVJdGVtRm9jdXMoZTogYW55KSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25Gb2N1cykge1xuICAgICAgdGhpcy5wcm9wcy5vbkZvY3VzKGUpO1xuICAgIH1cbiAgfVxuXG4gIG9uS2V5RG93bihlOiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50Pikge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAvLyBFU0NcbiAgICAgIGlmICh0aGlzLnByb3BzLm9uTWVudUNsb3NlKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25NZW51Q2xvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW5kZXJNZW51SXRlbShtZW51SXRlbTogYW55KSB7XG4gICAgY29uc3QgeyBvbkNsaWNrLCBvbkJsdXIsIG9uRm9jdXMsIC4uLnByb3BzIH0gPSBtZW51SXRlbS5wcm9wcztcbiAgICBjb25zdCBvbk1lbnVJdGVtQ2xpY2sgPSAoLi4uYXJnczogYW55W10pID0+IHtcbiAgICAgIGlmIChvbkNsaWNrKSB7XG4gICAgICAgIG9uQ2xpY2soLi4uYXJncyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wcm9wcy5vbk1lbnVJdGVtQ2xpY2spIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbk1lbnVJdGVtQ2xpY2socHJvcHMsIC4uLmFyZ3MpO1xuICAgICAgfVxuICAgIH07XG4gICAgY29uc3Qgb25NZW51SXRlbUZvY3VzID0gKGU6IGFueSkgPT4ge1xuICAgICAgaWYgKG9uRm9jdXMpIHtcbiAgICAgICAgb25Gb2N1cyhlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMub25NZW51SXRlbUZvY3VzKGUpO1xuICAgIH07XG4gICAgY29uc3Qgb25NZW51SXRlbUJsdXIgPSAoZTogYW55KSA9PiB7XG4gICAgICBpZiAob25CbHVyKSB7XG4gICAgICAgIG9uQmx1cihlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMub25NZW51SXRlbUJsdXIoZSk7XG4gICAgfTtcbiAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KG1lbnVJdGVtLCB7XG4gICAgICBvbkNsaWNrOiBvbk1lbnVJdGVtQ2xpY2ssXG4gICAgICBvbkJsdXI6IG9uTWVudUl0ZW1CbHVyLFxuICAgICAgb25Gb2N1czogb25NZW51SXRlbUZvY3VzLFxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIGFsaWduLFxuICAgICAgdmVydEFsaWduLFxuICAgICAgc2l6ZSxcbiAgICAgIGhlYWRlcixcbiAgICAgIG51YmJpblRvcCxcbiAgICAgIGhvdmVyUG9wdXAsXG4gICAgICBjaGlsZHJlbixcbiAgICAgIHN0eWxlLFxuICAgICAgZHJvcGRvd25NZW51UmVmLFxuICAgICAgb25Gb2N1cyxcbiAgICAgIG9uQmx1cixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBudWJiaW4gPSBudWJiaW5Ub3AgPyAnYXV0bycgOiB0aGlzLnByb3BzLm51YmJpbjtcbiAgICBjb25zdCBudWJiaW5Qb3NpdGlvbiA9IG51YmJpbiA9PT0gJ2F1dG8nID8gYCR7dmVydEFsaWdufSAke2FsaWdufWAgOiBudWJiaW47XG4gICAgY29uc3QgZHJvcGRvd25DbGFzc05hbWVzID0gY2xhc3NuYW1lcyhcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgICdzbGRzLWRyb3Bkb3duJyxcbiAgICAgIGBzbGRzLWRyb3Bkb3duLS0ke2FsaWdufWAsXG4gICAgICBgc2xkcy1kcm9wZG93bi0tJHt2ZXJ0QWxpZ259YCxcbiAgICAgIHNpemUgPyBgc2xkcy1kcm9wZG93bi0tJHtzaXplfWAgOiB1bmRlZmluZWQsXG4gICAgICBudWJiaW5Qb3NpdGlvblxuICAgICAgICA/IGBzbGRzLW51YmJpbl8ke251YmJpblBvc2l0aW9uLnJlcGxhY2UoL1xccysvZywgJy0nKX1gXG4gICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgeyAncmVhY3Qtc2xkcy1uby1ob3Zlci1wb3B1cCc6ICFob3ZlclBvcHVwIH1cbiAgICApO1xuICAgIGNvbnN0IGhhbmRsZURPTVJlZiA9IChub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4ge1xuICAgICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgICAgIGlmIChkcm9wZG93bk1lbnVSZWYpIHtcbiAgICAgICAgZHJvcGRvd25NZW51UmVmKG5vZGUpO1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtkcm9wZG93bkNsYXNzTmFtZXN9XG4gICAgICAgIHJlZj17aGFuZGxlRE9NUmVmfVxuICAgICAgICBzdHlsZT17eyBvdXRsaW5lOiAnbm9uZScsIC4uLnN0eWxlIH19XG4gICAgICAgIG9uS2V5RG93bj17dGhpcy5vbktleURvd24uYmluZCh0aGlzKX1cbiAgICAgICAgdGFiSW5kZXg9ey0xfVxuICAgICAgICBvbkZvY3VzPXtvbkZvY3VzfVxuICAgICAgICBvbkJsdXI9e29uQmx1cn1cbiAgICAgID5cbiAgICAgICAge2hlYWRlciA/IDxNZW51SGVhZGVyPntoZWFkZXJ9PC9NZW51SGVhZGVyPiA6IG51bGx9XG4gICAgICAgIDx1bCBjbGFzc05hbWU9J3NsZHMtZHJvcGRvd25fX2xpc3QnIHJvbGU9J21lbnUnPlxuICAgICAgICAgIHtSZWFjdC5DaGlsZHJlbi5tYXAoY2hpbGRyZW4sIChpdGVtOiBhbnkpID0+XG4gICAgICAgICAgICBpdGVtLnR5cGUgPT09IE1lbnVJdGVtIHx8IGl0ZW0udHlwZSA9PT0gUGlja2xpc3RJdGVtXG4gICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJNZW51SXRlbShpdGVtKVxuICAgICAgICAgICAgICA6IGl0ZW1cbiAgICAgICAgICApfVxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwcmV2ZW50UG9ydGFsaXplT25Ib3ZlclBvcHVwKFxuICBDbXA6IENvbXBvbmVudFR5cGU8RHJvcGRvd25NZW51UHJvcHMgJiBBdXRvQWxpZ25Qcm9wcz5cbikge1xuICB0eXBlIFJlc3VsdFByb3BzID0gRHJvcGRvd25NZW51UHJvcHMgJiBBdXRvQWxpZ25Qcm9wcztcbiAgY29uc3QgUmVzdWx0OiBSZWFjdC5GQzxSZXN1bHRQcm9wcz4gPSAocHJvcHMpID0+IChcbiAgICA8Q21wIHByZXZlbnRQb3J0YWxpemU9eyEhcHJvcHMuaG92ZXJQb3B1cH0gey4uLnByb3BzfSAvPlxuICApO1xuICByZXR1cm4gUmVzdWx0O1xufVxuXG5leHBvcnQgY29uc3QgRHJvcGRvd25NZW51ID0gcHJldmVudFBvcnRhbGl6ZU9uSG92ZXJQb3B1cChcbiAgYXV0b0FsaWduKHtcbiAgICB0cmlnZ2VyU2VsZWN0b3I6ICcuc2xkcy1kcm9wZG93bi10cmlnZ2VyJyxcbiAgfSkoV3JhcHBlZERyb3Bkb3duTWVudSlcbik7XG4iXX0=