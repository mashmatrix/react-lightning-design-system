"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownButton = void 0;

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

var _Button = require("./Button");

var _DropdownMenu = require("./DropdownMenu");

var _util = require("./util");

var DropdownButton =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DropdownButton, _Component);

  function DropdownButton(props) {
    var _this;

    (0, _classCallCheck2.default)(this, DropdownButton);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DropdownButton).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "node", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "trigger", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "dropdown", null);
    _this.state = {
      opened: false
    };
    (0, _util.registerStyle)('no-hover-popup', [['.slds-dropdown-trigger:hover .slds-dropdown--menu.react-slds-no-hover-popup', '{ visibility: hidden; opacity: 0; }'], ['.slds-dropdown-trigger.react-slds-dropdown-opened .slds-dropdown--menu', '{ visibility: visible !important; opacity: 1 !important; }']]);
    return _this;
  }

  (0, _createClass2.default)(DropdownButton, [{
    key: "onBlur",
    value: function onBlur() {
      var _this2 = this;

      setTimeout(function () {
        if (!_this2.isFocusedInComponent()) {
          _this2.setState({
            opened: false
          });

          if (_this2.props.onBlur) {
            _this2.props.onBlur();
          }
        }
      }, 10);
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      var _this3 = this;

      if (e.keyCode === 40) {
        // down
        e.preventDefault();
        e.stopPropagation();

        if (!this.state.opened) {
          this.setState({
            opened: true
          });

          if (this.props.onClick) {
            this.props.onClick(e);
          }

          setTimeout(function () {
            _this3.focusToTargetItemEl();
          }, 20);
        } else {
          this.focusToTargetItemEl();
        }
      } else if (e.keyCode === 27) {
        // ESC
        e.preventDefault();
        e.stopPropagation();
        this.setState({
          opened: false
        });
      }
    }
  }, {
    key: "onTriggerClick",
    value: function onTriggerClick() {
      if (!this.props.hoverPopup) {
        this.setState(function (prevState) {
          return {
            opened: !prevState.opened
          };
        });
      }

      if (this.props.onClick) {
        var _this$props;

        (_this$props = this.props).onClick.apply(_this$props, arguments);
      }
    }
  }, {
    key: "onMenuItemClick",
    value: function onMenuItemClick() {
      var _this4 = this;

      if (!this.props.hoverPopup) {
        setTimeout(function () {
          var triggerElem = _this4.trigger;
          if (triggerElem) triggerElem.focus();

          _this4.setState({
            opened: false
          });
        }, 10);
      }

      if (this.props.onMenuItemClick) {
        var _this$props2;

        (_this$props2 = this.props).onMenuItemClick.apply(_this$props2, arguments);
      }
    }
  }, {
    key: "onMenuClose",
    value: function onMenuClose() {
      if (this.trigger) {
        this.trigger.focus();
      }

      this.setState({
        opened: false
      });
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
    key: "renderButton",
    value: function renderButton(_ref) {
      var _this5 = this;

      var grouped = _ref.grouped,
          isFirstInGroup = _ref.isFirstInGroup,
          isLastInGroup = _ref.isLastInGroup,
          props = (0, _objectWithoutProperties2.default)(_ref, ["grouped", "isFirstInGroup", "isLastInGroup"]);
      var pprops = props;
      delete pprops.onMenuItemClick;

      var button = _react.default.createElement(_Button.Button, (0, _extends2.default)({}, pprops, {
        "aria-haspopup": true,
        buttonRef: function buttonRef(node) {
          return _this5.trigger = node;
        },
        onClick: this.onTriggerClick.bind(this),
        onKeyDown: this.onKeyDown.bind(this),
        onBlur: this.onBlur.bind(this)
      }));

      if (grouped) {
        var noneStyle = {
          display: 'none'
        };
        return _react.default.createElement("div", {
          className: "slds-button-group"
        }, isFirstInGroup ? null : _react.default.createElement("button", {
          type: "button",
          className: "slds-button",
          style: noneStyle
        }), button, isLastInGroup ? null : _react.default.createElement("button", {
          type: "button",
          className: "slds-button",
          style: noneStyle
        }));
      }

      return button;
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _this$props3 = this.props,
          className = _this$props3.className,
          menuAlign = _this$props3.menuAlign,
          menuSize = _this$props3.menuSize,
          nubbinTop = _this$props3.nubbinTop,
          hoverPopup = _this$props3.hoverPopup,
          menuHeader = _this$props3.menuHeader,
          type = _this$props3.type,
          label = _this$props3.label,
          children = _this$props3.children,
          style = _this$props3.style,
          menuStyle = _this$props3.menuStyle,
          props = (0, _objectWithoutProperties2.default)(_this$props3, ["className", "menuAlign", "menuSize", "nubbinTop", "hoverPopup", "menuHeader", "type", "label", "children", "style", "menuStyle"]);
      var icon = this.props.icon;
      var dropdownClassNames = (0, _classnames.default)(className, 'slds-dropdown-trigger', {
        'slds-button-space-left': !props.grouped,
        'react-slds-dropdown-opened': this.state.opened
      });
      var iconMore = null;

      if (!label && !icon) {
        icon = 'down';
      }

      if (label || type === 'icon-more') {
        iconMore = 'down';
      }

      var dropdown = _react.default.createElement(_DropdownMenu.DropdownMenu, {
        portalClassName: className,
        align: menuAlign,
        header: menuHeader,
        size: menuSize,
        nubbinTop: nubbinTop,
        hoverPopup: hoverPopup,
        dropdownMenuRef: function dropdownMenuRef(node) {
          return _this6.dropdown = node;
        },
        onMenuItemClick: this.onMenuItemClick.bind(this),
        onMenuClose: this.onMenuClose.bind(this),
        onBlur: this.onBlur.bind(this),
        style: Object.assign({
          transition: 'none'
        }, menuStyle)
      }, children);

      return _react.default.createElement("div", {
        className: dropdownClassNames,
        style: style,
        ref: function ref(node) {
          return _this6.node = node;
        }
      }, this.renderButton((0, _objectSpread2.default)({
        type: type,
        label: label,
        icon: icon,
        iconMore: iconMore
      }, props)), hoverPopup || this.state.opened ? dropdown : undefined);
    }
  }]);
  return DropdownButton;
}(_react.Component);

exports.DropdownButton = DropdownButton;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL0Ryb3Bkb3duQnV0dG9uLnRzeCJdLCJuYW1lcyI6WyJEcm9wZG93bkJ1dHRvbiIsInByb3BzIiwic3RhdGUiLCJvcGVuZWQiLCJzZXRUaW1lb3V0IiwiaXNGb2N1c2VkSW5Db21wb25lbnQiLCJzZXRTdGF0ZSIsIm9uQmx1ciIsImUiLCJrZXlDb2RlIiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJvbkNsaWNrIiwiZm9jdXNUb1RhcmdldEl0ZW1FbCIsImhvdmVyUG9wdXAiLCJwcmV2U3RhdGUiLCJ0cmlnZ2VyRWxlbSIsInRyaWdnZXIiLCJmb2N1cyIsIm9uTWVudUl0ZW1DbGljayIsInRhcmdldEVsIiwiZG9jdW1lbnQiLCJhY3RpdmVFbGVtZW50Iiwibm9kZSIsImRyb3Bkb3duIiwiZHJvcGRvd25FbCIsImZpcnN0SXRlbUVsIiwicXVlcnlTZWxlY3RvciIsImdyb3VwZWQiLCJpc0ZpcnN0SW5Hcm91cCIsImlzTGFzdEluR3JvdXAiLCJwcHJvcHMiLCJidXR0b24iLCJvblRyaWdnZXJDbGljayIsImJpbmQiLCJvbktleURvd24iLCJub25lU3R5bGUiLCJkaXNwbGF5IiwiY2xhc3NOYW1lIiwibWVudUFsaWduIiwibWVudVNpemUiLCJudWJiaW5Ub3AiLCJtZW51SGVhZGVyIiwidHlwZSIsImxhYmVsIiwiY2hpbGRyZW4iLCJzdHlsZSIsIm1lbnVTdHlsZSIsImljb24iLCJkcm9wZG93bkNsYXNzTmFtZXMiLCJpY29uTW9yZSIsIm9uTWVudUNsb3NlIiwiT2JqZWN0IiwiYXNzaWduIiwidHJhbnNpdGlvbiIsInJlbmRlckJ1dHRvbiIsInVuZGVmaW5lZCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztJQTBCYUEsYzs7Ozs7QUFVWCwwQkFBWUMsS0FBWixFQUFrRDtBQUFBOztBQUFBO0FBQ2hE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LE1BQUksQ0FBQ0EsSUFBTCxHQUFZQSxJQUF2QjtBQUFBO0FBSFAsU0FLRyxLQUFLZ0MsWUFBTDtBQUFvQlosUUFBQUEsSUFBSSxFQUFKQSxJQUFwQjtBQUEwQkMsUUFBQUEsS0FBSyxFQUFMQSxLQUExQjtBQUFpQ0ksUUFBQUEsSUFBSSxFQUFKQSxJQUFqQztBQUF1Q0UsUUFBQUEsUUFBUSxFQUFSQTtBQUF2QyxTQUFvRGpELEtBQXBELEVBTEgsRUFNR2EsVUFBVSxJQUFJLEtBQUtaLEtBQUwsQ0FBV0MsTUFBekIsR0FBa0NxQixRQUFsQyxHQUE2Q2dDLFNBTmhELENBREY7QUFVRDs7O0VBdk1pQ0MsZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBCdXR0b24sIEJ1dHRvblByb3BzIH0gZnJvbSAnLi9CdXR0b24nO1xuaW1wb3J0IHsgRHJvcGRvd25NZW51IH0gZnJvbSAnLi9Ecm9wZG93bk1lbnUnO1xuaW1wb3J0IHsgcmVnaXN0ZXJTdHlsZSwgaXNFbEluQ2hpbGRyZW4gfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgdHlwZSBEcm9wZG93bk1lbnVBbGlnbiA9ICdsZWZ0JyB8ICdyaWdodCc7XG5leHBvcnQgdHlwZSBEcm9wZG93bk1lbnVTaXplID0gJ3NtYWxsJyB8ICdtZWRpdW0nIHwgJ2xhcmdlJztcbmV4cG9ydCB0eXBlIERyb3Bkb3duQnV0dG9uUHJvcHMgPSB7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgbGFiZWw/OiBSZWFjdC5SZWFjdE5vZGU7XG4gIG1lbnVBbGlnbj86IERyb3Bkb3duTWVudUFsaWduO1xuICBtZW51U2l6ZT86IERyb3Bkb3duTWVudVNpemU7XG4gIG1lbnVIZWFkZXI/OiBzdHJpbmc7XG4gIG51YmJpblRvcD86IGJvb2xlYW47XG4gIGhvdmVyUG9wdXA/OiBib29sZWFuO1xuICBncm91cGVkPzogYm9vbGVhbjtcbiAgaXNGaXJzdEluR3JvdXA/OiBib29sZWFuO1xuICBpc0xhc3RJbkdyb3VwPzogYm9vbGVhbjtcbiAgc3R5bGU/OiBvYmplY3Q7XG4gIG1lbnVTdHlsZT86IG9iamVjdDtcbiAgb25CbHVyPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG4gIG9uQ2xpY2s/OiAoLi4uYXJnczogYW55W10pID0+IGFueTtcbiAgb25NZW51SXRlbUNsaWNrPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG59ICYgQnV0dG9uUHJvcHM7XG5cbnR5cGUgRHJvcGRvd25CdXR0b25TdGF0ZSA9IHtcbiAgb3BlbmVkOiBib29sZWFuO1xufTtcblxuZXhwb3J0IGNsYXNzIERyb3Bkb3duQnV0dG9uIGV4dGVuZHMgQ29tcG9uZW50PFxuICBEcm9wZG93bkJ1dHRvblByb3BzLFxuICBEcm9wZG93bkJ1dHRvblN0YXRlXG4+IHtcbiAgbm9kZTogSFRNTERpdkVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICB0cmlnZ2VyOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIGRyb3Bkb3duOiBIVE1MRGl2RWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBSZWFkb25seTxEcm9wZG93bkJ1dHRvblByb3BzPikge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0geyBvcGVuZWQ6IGZhbHNlIH07XG4gICAgcmVnaXN0ZXJTdHlsZSgnbm8taG92ZXItcG9wdXAnLCBbXG4gICAgICBbXG4gICAgICAgICcuc2xkcy1kcm9wZG93bi10cmlnZ2VyOmhvdmVyIC5zbGRzLWRyb3Bkb3duLS1tZW51LnJlYWN0LXNsZHMtbm8taG92ZXItcG9wdXAnLFxuICAgICAgICAneyB2aXNpYmlsaXR5OiBoaWRkZW47IG9wYWNpdHk6IDA7IH0nLFxuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJy5zbGRzLWRyb3Bkb3duLXRyaWdnZXIucmVhY3Qtc2xkcy1kcm9wZG93bi1vcGVuZWQgLnNsZHMtZHJvcGRvd24tLW1lbnUnLFxuICAgICAgICAneyB2aXNpYmlsaXR5OiB2aXNpYmxlICFpbXBvcnRhbnQ7IG9wYWNpdHk6IDEgIWltcG9ydGFudDsgfScsXG4gICAgICBdLFxuICAgIF0pO1xuICB9XG5cbiAgb25CbHVyKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmlzRm9jdXNlZEluQ29tcG9uZW50KCkpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG9wZW5lZDogZmFsc2UgfSk7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uQmx1cikge1xuICAgICAgICAgIHRoaXMucHJvcHMub25CbHVyKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCAxMCk7XG4gIH1cblxuICBvbktleURvd24oZTogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pIHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSA0MCkge1xuICAgICAgLy8gZG93blxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGlmICghdGhpcy5zdGF0ZS5vcGVuZWQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG9wZW5lZDogdHJ1ZSB9KTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25DbGljaykge1xuICAgICAgICAgIHRoaXMucHJvcHMub25DbGljayhlKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmZvY3VzVG9UYXJnZXRJdGVtRWwoKTtcbiAgICAgICAgfSwgMjApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5mb2N1c1RvVGFyZ2V0SXRlbUVsKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAvLyBFU0NcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgb3BlbmVkOiBmYWxzZSB9KTtcbiAgICB9XG4gIH1cblxuICBvblRyaWdnZXJDbGljayguLi5hcmdzOiBhbnlbXSkge1xuICAgIGlmICghdGhpcy5wcm9wcy5ob3ZlclBvcHVwKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKChwcmV2U3RhdGUpID0+ICh7IG9wZW5lZDogIXByZXZTdGF0ZS5vcGVuZWQgfSkpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5vbkNsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2xpY2soLi4uYXJncyk7XG4gICAgfVxuICB9XG5cbiAgb25NZW51SXRlbUNsaWNrKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmhvdmVyUG9wdXApIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCB0cmlnZ2VyRWxlbSA9IHRoaXMudHJpZ2dlcjtcbiAgICAgICAgaWYgKHRyaWdnZXJFbGVtKSB0cmlnZ2VyRWxlbS5mb2N1cygpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgb3BlbmVkOiBmYWxzZSB9KTtcbiAgICAgIH0sIDEwKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMub25NZW51SXRlbUNsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uTWVudUl0ZW1DbGljayguLi5hcmdzKTtcbiAgICB9XG4gIH1cblxuICBvbk1lbnVDbG9zZSgpIHtcbiAgICBpZiAodGhpcy50cmlnZ2VyKSB7XG4gICAgICB0aGlzLnRyaWdnZXIuZm9jdXMoKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IG9wZW5lZDogZmFsc2UgfSk7XG4gIH1cblxuICBpc0ZvY3VzZWRJbkNvbXBvbmVudCgpIHtcbiAgICBjb25zdCB0YXJnZXRFbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgcmV0dXJuIChcbiAgICAgIGlzRWxJbkNoaWxkcmVuKHRoaXMubm9kZSwgdGFyZ2V0RWwpIHx8XG4gICAgICBpc0VsSW5DaGlsZHJlbih0aGlzLmRyb3Bkb3duLCB0YXJnZXRFbClcbiAgICApO1xuICB9XG5cbiAgZm9jdXNUb1RhcmdldEl0ZW1FbCgpIHtcbiAgICBjb25zdCBkcm9wZG93bkVsID0gdGhpcy5kcm9wZG93bjtcbiAgICBpZiAoIWRyb3Bkb3duRWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZmlyc3RJdGVtRWw6IEhUTUxBbmNob3JFbGVtZW50IHwgbnVsbCA9XG4gICAgICBkcm9wZG93bkVsLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICcuc2xkcy1pcy1zZWxlY3RlZCA+IC5yZWFjdC1zbGRzLW1lbnVpdGVtW3RhYkluZGV4XSdcbiAgICAgICkgfHwgZHJvcGRvd25FbC5xdWVyeVNlbGVjdG9yKCcucmVhY3Qtc2xkcy1tZW51aXRlbVt0YWJJbmRleF0nKTtcbiAgICBpZiAoZmlyc3RJdGVtRWwpIHtcbiAgICAgIGZpcnN0SXRlbUVsLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyQnV0dG9uKHsgZ3JvdXBlZCwgaXNGaXJzdEluR3JvdXAsIGlzTGFzdEluR3JvdXAsIC4uLnByb3BzIH06IGFueSkge1xuICAgIGNvbnN0IHBwcm9wcyA9IHByb3BzO1xuICAgIGRlbGV0ZSBwcHJvcHMub25NZW51SXRlbUNsaWNrO1xuICAgIGNvbnN0IGJ1dHRvbiA9IChcbiAgICAgIDxCdXR0b25cbiAgICAgICAgey4uLnBwcm9wc31cbiAgICAgICAgYXJpYS1oYXNwb3B1cFxuICAgICAgICBidXR0b25SZWY9eyhub2RlKSA9PiAodGhpcy50cmlnZ2VyID0gbm9kZSl9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMub25UcmlnZ2VyQ2xpY2suYmluZCh0aGlzKX1cbiAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uS2V5RG93bi5iaW5kKHRoaXMpfVxuICAgICAgICBvbkJsdXI9e3RoaXMub25CbHVyLmJpbmQodGhpcyl9XG4gICAgICAvPlxuICAgICk7XG5cbiAgICBpZiAoZ3JvdXBlZCkge1xuICAgICAgY29uc3Qgbm9uZVN0eWxlID0geyBkaXNwbGF5OiAnbm9uZScgfTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzbGRzLWJ1dHRvbi1ncm91cCc+XG4gICAgICAgICAge2lzRmlyc3RJbkdyb3VwID8gbnVsbCA6IChcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT0nYnV0dG9uJyBjbGFzc05hbWU9J3NsZHMtYnV0dG9uJyBzdHlsZT17bm9uZVN0eWxlfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2J1dHRvbn1cbiAgICAgICAgICB7aXNMYXN0SW5Hcm91cCA/IG51bGwgOiAoXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3NOYW1lPSdzbGRzLWJ1dHRvbicgc3R5bGU9e25vbmVTdHlsZX0gLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1dHRvbjtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjbGFzc05hbWUsXG4gICAgICBtZW51QWxpZ24sXG4gICAgICBtZW51U2l6ZSxcbiAgICAgIG51YmJpblRvcCxcbiAgICAgIGhvdmVyUG9wdXAsXG4gICAgICBtZW51SGVhZGVyLFxuICAgICAgdHlwZSxcbiAgICAgIGxhYmVsLFxuICAgICAgY2hpbGRyZW4sXG4gICAgICBzdHlsZSxcbiAgICAgIG1lbnVTdHlsZSxcbiAgICAgIC4uLnByb3BzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IHsgaWNvbiB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBkcm9wZG93bkNsYXNzTmFtZXMgPSBjbGFzc25hbWVzKGNsYXNzTmFtZSwgJ3NsZHMtZHJvcGRvd24tdHJpZ2dlcicsIHtcbiAgICAgICdzbGRzLWJ1dHRvbi1zcGFjZS1sZWZ0JzogIXByb3BzLmdyb3VwZWQsXG4gICAgICAncmVhY3Qtc2xkcy1kcm9wZG93bi1vcGVuZWQnOiB0aGlzLnN0YXRlLm9wZW5lZCxcbiAgICB9KTtcbiAgICBsZXQgaWNvbk1vcmUgPSBudWxsO1xuICAgIGlmICghbGFiZWwgJiYgIWljb24pIHtcbiAgICAgIGljb24gPSAnZG93bic7XG4gICAgfVxuICAgIGlmIChsYWJlbCB8fCB0eXBlID09PSAnaWNvbi1tb3JlJykge1xuICAgICAgaWNvbk1vcmUgPSAnZG93bic7XG4gICAgfVxuXG4gICAgY29uc3QgZHJvcGRvd24gPSAoXG4gICAgICA8RHJvcGRvd25NZW51XG4gICAgICAgIHBvcnRhbENsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgICBhbGlnbj17bWVudUFsaWdufVxuICAgICAgICBoZWFkZXI9e21lbnVIZWFkZXJ9XG4gICAgICAgIHNpemU9e21lbnVTaXplfVxuICAgICAgICBudWJiaW5Ub3A9e251YmJpblRvcH1cbiAgICAgICAgaG92ZXJQb3B1cD17aG92ZXJQb3B1cH1cbiAgICAgICAgZHJvcGRvd25NZW51UmVmPXsobm9kZSkgPT4gKHRoaXMuZHJvcGRvd24gPSBub2RlKX1cbiAgICAgICAgb25NZW51SXRlbUNsaWNrPXt0aGlzLm9uTWVudUl0ZW1DbGljay5iaW5kKHRoaXMpfVxuICAgICAgICBvbk1lbnVDbG9zZT17dGhpcy5vbk1lbnVDbG9zZS5iaW5kKHRoaXMpfVxuICAgICAgICBvbkJsdXI9e3RoaXMub25CbHVyLmJpbmQodGhpcyl9XG4gICAgICAgIHN0eWxlPXtPYmplY3QuYXNzaWduKHsgdHJhbnNpdGlvbjogJ25vbmUnIH0sIG1lbnVTdHlsZSl9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvRHJvcGRvd25NZW51PlxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2Ryb3Bkb3duQ2xhc3NOYW1lc31cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICByZWY9eyhub2RlKSA9PiAodGhpcy5ub2RlID0gbm9kZSl9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnJlbmRlckJ1dHRvbih7IHR5cGUsIGxhYmVsLCBpY29uLCBpY29uTW9yZSwgLi4ucHJvcHMgfSl9XG4gICAgICAgIHtob3ZlclBvcHVwIHx8IHRoaXMuc3RhdGUub3BlbmVkID8gZHJvcGRvd24gOiB1bmRlZmluZWR9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=