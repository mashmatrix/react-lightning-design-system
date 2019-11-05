"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeNode = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Button = require("./Button");

var _Spinner = require("./Spinner");

var TreeNode =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TreeNode, _Component);

  function TreeNode(props) {
    var _this;

    (0, _classCallCheck2.default)(this, TreeNode);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TreeNode).call(this, props));
    _this.state = {
      opened: _this.props.defaultOpened
    };
    return _this;
  }

  (0, _createClass2.default)(TreeNode, [{
    key: "onToggle",
    value: function onToggle(e) {
      var _this$props = this.props,
          onToggle = _this$props.onToggle,
          onNodeToggle = _this$props.onNodeToggle;

      if (onToggle) {
        onToggle(e, this.props);
      }

      if (onNodeToggle) {
        onNodeToggle(e, this.props);
      }

      this.setState(function (prevState) {
        return {
          opened: !prevState.opened
        };
      });
    }
  }, {
    key: "onLabelClick",
    value: function onLabelClick(e) {
      var _this$props2 = this.props,
          onLabelClick = _this$props2.onLabelClick,
          onNodeLabelClick = _this$props2.onNodeLabelClick;

      if (onLabelClick) {
        onLabelClick(e, this.props);
      }

      if (onNodeLabelClick) {
        onNodeLabelClick(e, this.props);
      }
    }
  }, {
    key: "onClick",
    value: function onClick(e) {
      var _this$props3 = this.props,
          onClick = _this$props3.onClick,
          onNodeClick = _this$props3.onNodeClick,
          toggleOnNodeClick = _this$props3.toggleOnNodeClick;

      if (onClick) {
        onClick(e, this.props);
      }

      if (onNodeClick) {
        onNodeClick(e, this.props);
      }

      if (toggleOnNodeClick) {
        this.onToggle(e);
      }
    }
  }, {
    key: "renderTreeItem",
    value: function renderTreeItem(itemProps) {
      var className = itemProps.className,
          label = itemProps.label,
          _itemProps$icon = itemProps.icon,
          icon = _itemProps$icon === void 0 ? 'chevronright' : _itemProps$icon,
          loading = itemProps.loading,
          selected = itemProps.selected,
          leaf = itemProps.leaf,
          isOpened = itemProps.isOpened,
          children = itemProps.children,
          itemRender = itemProps.itemRender,
          onNodeClick = itemProps.onNodeClick,
          onNodeToggle = itemProps.onNodeToggle,
          onNodeLabelClick = itemProps.onNodeLabelClick,
          toggleOnNodeClick = itemProps.toggleOnNodeClick,
          props = (0, _objectWithoutProperties2.default)(itemProps, ["className", "label", "icon", "loading", "selected", "leaf", "isOpened", "children", "itemRender", "onNodeClick", "onNodeToggle", "onNodeLabelClick", "toggleOnNodeClick"]);
      var itmClassNames = (0, _classnames.default)(className, 'slds-tree__item', {
        'slds-is-open': isOpened,
        'slds-is-selected': selected
      });
      return _react.default.createElement("div", (0, _extends2.default)({
        className: itmClassNames,
        onClick: this.onClick.bind(this),
        style: {
          position: 'relative'
        }
      }, props), loading ? _react.default.createElement(_Spinner.Spinner, {
        container: false,
        size: "small",
        className: "slds-m-right--x-small",
        style: {
          position: 'static',
          marginTop: 14,
          marginLeft: -2
        }
      }) : !leaf ? _react.default.createElement(_Button.Button, {
        className: "slds-m-right--small",
        "aria-controls": "",
        type: "icon-bare",
        icon: icon,
        iconSize: "small",
        onClick: this.onToggle.bind(this)
      }) : null, _react.default.createElement("a", {
        className: "slds-truncate",
        tabIndex: -1,
        role: "presentation",
        onClick: this.onLabelClick.bind(this)
      }, itemRender ? itemRender(itemProps) : label), leaf ? children : null);
    }
  }, {
    key: "renderChildNode",
    value: function renderChildNode(level, tnode) {
      var _this$props4 = this.props,
          onNodeClick = _this$props4.onNodeClick,
          onNodeToggle = _this$props4.onNodeToggle,
          onNodeLabelClick = _this$props4.onNodeLabelClick,
          toggleOnNodeClick = _this$props4.toggleOnNodeClick;
      return _react.default.cloneElement(tnode, {
        level: level,
        onNodeClick: onNodeClick,
        onNodeToggle: onNodeToggle,
        onNodeLabelClick: onNodeLabelClick,
        toggleOnNodeClick: toggleOnNodeClick
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          defaultOpened = _this$props5.defaultOpened,
          opened = _this$props5.opened,
          leaf = _this$props5.leaf,
          _this$props5$level = _this$props5.level,
          level = _this$props5$level === void 0 ? 1 : _this$props5$level,
          children = _this$props5.children,
          props = (0, _objectWithoutProperties2.default)(_this$props5, ["defaultOpened", "opened", "leaf", "level", "children"]);
      var isOpened = typeof opened !== 'undefined' ? opened : typeof this.state.opened !== 'undefined' ? this.state.opened : defaultOpened;
      var grpClassNames = (0, _classnames.default)('slds-tree__group', {
        'slds-nested': !leaf,
        'is-expanded': isOpened,
        'slds-show': isOpened,
        'slds-hide': !isOpened
      });
      var itemProps = (0, _objectSpread2.default)({
        leaf: leaf,
        isOpened: isOpened,
        children: children
      }, props);

      if (leaf) {
        return _react.default.createElement("li", {
          role: "treeitem",
          "aria-level": level
        }, this.renderTreeItem(itemProps));
      }

      return _react.default.createElement("li", {
        role: "treeitem",
        "aria-level": level,
        "aria-expanded": isOpened
      }, this.renderTreeItem(itemProps), _react.default.createElement("ul", {
        className: grpClassNames,
        role: "group"
      }, _react.default.Children.map(children, this.renderChildNode.bind(this, level + 1))));
    }
  }]);
  return TreeNode;
}(_react.Component);

exports.TreeNode = TreeNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL1RyZWVOb2RlLnRzeCJdLCJuYW1lcyI6WyJUcmVlTm9kZSIsInByb3BzIiwic3RhdGUiLCJvcGVuZWQiLCJkZWZhdWx0T3BlbmVkIiwiZSIsIm9uVG9nZ2xlIiwib25Ob2RlVG9nZ2xlIiwic2V0U3RhdGUiLCJwcmV2U3RhdGUiLCJvbkxhYmVsQ2xpY2siLCJvbk5vZGVMYWJlbENsaWNrIiwib25DbGljayIsIm9uTm9kZUNsaWNrIiwidG9nZ2xlT25Ob2RlQ2xpY2siLCJpdGVtUHJvcHMiLCJjbGFzc05hbWUiLCJsYWJlbCIsImljb24iLCJsb2FkaW5nIiwic2VsZWN0ZWQiLCJsZWFmIiwiaXNPcGVuZWQiLCJjaGlsZHJlbiIsIml0ZW1SZW5kZXIiLCJpdG1DbGFzc05hbWVzIiwiYmluZCIsInBvc2l0aW9uIiwibWFyZ2luVG9wIiwibWFyZ2luTGVmdCIsImxldmVsIiwidG5vZGUiLCJSZWFjdCIsImNsb25lRWxlbWVudCIsImdycENsYXNzTmFtZXMiLCJyZW5kZXJUcmVlSXRlbSIsIkNoaWxkcmVuIiwibWFwIiwicmVuZGVyQ2hpbGROb2RlIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7SUF5QmFBLFE7Ozs7O0FBQ1gsb0JBQVlDLEtBQVosRUFBNEM7QUFBQTs7QUFBQTtBQUMxQyw4R0FBTUEsS0FBTjtBQUNBLFVBQUtDLEtBQUwsR0FBYTtBQUFFQyxNQUFBQSxNQUFNLEVBQUUsTUFBS0YsS0FBTCxDQUFXRztBQUFyQixLQUFiO0FBRjBDO0FBRzNDOzs7OzZCQUdDQyxDLEVBQ0E7QUFBQSx3QkFDbUMsS0FBS0osS0FEeEM7QUFBQSxVQUNRSyxRQURSLGVBQ1FBLFFBRFI7QUFBQSxVQUNrQkMsWUFEbEIsZUFDa0JBLFlBRGxCOztBQUVBLFVBQUlELFFBQUosRUFBYztBQUNaQSxRQUFBQSxRQUFRLENBQUNELENBQUQsRUFBSSxLQUFL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RCxhQUNFO0FBQUksUUFBQSxJQUFJLEVBQUMsVUFBVDtBQUFvQixzQkFBWWUsS0FBaEM7QUFBdUMseUJBQWVSO0FBQXRELFNBQ0csS0FBS2EsY0FBTCxDQUFvQnBCLFNBQXBCLENBREgsRUFFRTtBQUFJLFFBQUEsU0FBUyxFQUFFbUIsYUFBZjtBQUE4QixRQUFBLElBQUksRUFBQztBQUFuQyxTQUNHRixlQUFNSSxRQUFOLENBQWVDLEdBQWYsQ0FDQ2QsUUFERCxFQUVDLEtBQUtlLGVBQUwsQ0FBcUJaLElBQXJCLENBQTBCLElBQTFCLEVBQWdDSSxLQUFLLEdBQUcsQ0FBeEMsQ0FGRCxDQURILENBRkYsQ0FERjtBQVdEOzs7RUEvSjJCUyxnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4vQnV0dG9uJztcbmltcG9ydCB7IFNwaW5uZXIgfSBmcm9tICcuL1NwaW5uZXInO1xuXG5leHBvcnQgdHlwZSBUcmVlTm9kZVByb3BzID0ge1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGxhYmVsPzogc3RyaW5nO1xuICB0b2dnbGVPbk5vZGVDbGljaz86IGJvb2xlYW47XG4gIGRlZmF1bHRPcGVuZWQ/OiBib29sZWFuO1xuICBvcGVuZWQ/OiBib29sZWFuO1xuICBzZWxlY3RlZD86IGJvb2xlYW47XG4gIGxlYWY/OiBib29sZWFuO1xuICBsb2FkaW5nPzogYm9vbGVhbjtcbiAgbGV2ZWw/OiBudW1iZXI7XG4gIG9uQ2xpY2s/OiAoZTogUmVhY3QuTW91c2VFdmVudCwgcHJvcHM6IGFueSkgPT4gdm9pZDtcbiAgb25Ub2dnbGU/OiAoZTogUmVhY3QuTW91c2VFdmVudCwgcHJvcHM6IGFueSkgPT4gdm9pZDtcbiAgb25Ob2RlVG9nZ2xlPzogKGU6IFJlYWN0Lk1vdXNlRXZlbnQsIHByb3BzOiBhbnkpID0+IHZvaWQ7XG4gIG9uTm9kZUxhYmVsQ2xpY2s/OiAoZTogUmVhY3QuTW91c2VFdmVudCwgcHJvcHM6IGFueSkgPT4gdm9pZDtcbiAgb25MYWJlbENsaWNrPzogKGU6IFJlYWN0Lk1vdXNlRXZlbnQsIHByb3BzOiBhbnkpID0+IHZvaWQ7XG4gIG9uTm9kZUNsaWNrPzogKGU6IFJlYWN0Lk1vdXNlRXZlbnQsIHByb3BzOiBhbnkpID0+IHZvaWQ7XG4gIGl0ZW1SZW5kZXI/OiAocHJvcHM6IGFueSkgPT4gdm9pZDtcbn07XG5cbnR5cGUgVHJlZU5vZGVTdGF0ZSA9IHtcbiAgb3BlbmVkPzogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCBjbGFzcyBUcmVlTm9kZSBleHRlbmRzIENvbXBvbmVudDxUcmVlTm9kZVByb3BzLCBUcmVlTm9kZVN0YXRlPiB7XG4gIGNvbnN0cnVjdG9yKHByb3BzOiBSZWFkb25seTxUcmVlTm9kZVByb3BzPikge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0geyBvcGVuZWQ6IHRoaXMucHJvcHMuZGVmYXVsdE9wZW5lZCB9O1xuICB9XG5cbiAgb25Ub2dnbGUoXG4gICAgZTogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudCB8IEhUTUxEaXZFbGVtZW50LCBNb3VzZUV2ZW50PlxuICApIHtcbiAgICBjb25zdCB7IG9uVG9nZ2xlLCBvbk5vZGVUb2dnbGUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKG9uVG9nZ2xlKSB7XG4gICAgICBvblRvZ2dsZShlLCB0aGlzLnByb3BzKTtcbiAgICB9XG4gICAgaWYgKG9uTm9kZVRvZ2dsZSkge1xuICAgICAgb25Ob2RlVG9nZ2xlKGUsIHRoaXMucHJvcHMpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKChwcmV2U3RhdGUpID0+ICh7IG9wZW5lZDogIXByZXZTdGF0ZS5vcGVuZWQgfSkpO1xuICB9XG5cbiAgb25MYWJlbENsaWNrKGU6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEFuY2hvckVsZW1lbnQsIE1vdXNlRXZlbnQ+KSB7XG4gICAgY29uc3QgeyBvbkxhYmVsQ2xpY2ssIG9uTm9kZUxhYmVsQ2xpY2sgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKG9uTGFiZWxDbGljaykge1xuICAgICAgb25MYWJlbENsaWNrKGUsIHRoaXMucHJvcHMpO1xuICAgIH1cbiAgICBpZiAob25Ob2RlTGFiZWxDbGljaykge1xuICAgICAgb25Ob2RlTGFiZWxDbGljayhlLCB0aGlzLnByb3BzKTtcbiAgICB9XG4gIH1cblxuICBvbkNsaWNrKGU6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTERpdkVsZW1lbnQsIE1vdXNlRXZlbnQ+KSB7XG4gICAgY29uc3QgeyBvbkNsaWNrLCBvbk5vZGVDbGljaywgdG9nZ2xlT25Ob2RlQ2xpY2sgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKG9uQ2xpY2spIHtcbiAgICAgIG9uQ2xpY2soZSwgdGhpcy5wcm9wcyk7XG4gICAgfVxuICAgIGlmIChvbk5vZGVDbGljaykge1xuICAgICAgb25Ob2RlQ2xpY2soZSwgdGhpcy5wcm9wcyk7XG4gICAgfVxuICAgIGlmICh0b2dnbGVPbk5vZGVDbGljaykge1xuICAgICAgdGhpcy5vblRvZ2dsZShlKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXJUcmVlSXRlbShpdGVtUHJvcHM6IGFueSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIGxhYmVsLFxuICAgICAgaWNvbiA9ICdjaGV2cm9ucmlnaHQnLFxuICAgICAgbG9hZGluZyxcbiAgICAgIHNlbGVjdGVkLFxuICAgICAgbGVhZixcbiAgICAgIGlzT3BlbmVkLFxuICAgICAgY2hpbGRyZW4sXG4gICAgICBpdGVtUmVuZGVyLFxuICAgICAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG4gICAgICBvbk5vZGVDbGljayxcbiAgICAgIG9uTm9kZVRvZ2dsZSxcbiAgICAgIG9uTm9kZUxhYmVsQ2xpY2ssXG4gICAgICB0b2dnbGVPbk5vZGVDbGljayxcbiAgICAgIC8qIGVzbGludC1lbmFibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG4gICAgICAuLi5wcm9wc1xuICAgIH0gPSBpdGVtUHJvcHM7XG4gICAgY29uc3QgaXRtQ2xhc3NOYW1lcyA9IGNsYXNzbmFtZXMoY2xhc3NOYW1lLCAnc2xkcy10cmVlX19pdGVtJywge1xuICAgICAgJ3NsZHMtaXMtb3Blbic6IGlzT3BlbmVkLFxuICAgICAgJ3NsZHMtaXMtc2VsZWN0ZWQnOiBzZWxlY3RlZCxcbiAgICB9KTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2l0bUNsYXNzTmFtZXN9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMub25DbGljay5iaW5kKHRoaXMpfVxuICAgICAgICBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9fVxuICAgICAgICB7Li4ucHJvcHN9XG4gICAgICA+XG4gICAgICAgIHtsb2FkaW5nID8gKFxuICAgICAgICAgIDxTcGlubmVyXG4gICAgICAgICAgICBjb250YWluZXI9e2ZhbHNlfVxuICAgICAgICAgICAgc2l6ZT0nc21hbGwnXG4gICAgICAgICAgICBjbGFzc05hbWU9J3NsZHMtbS1yaWdodC0teC1zbWFsbCdcbiAgICAgICAgICAgIHN0eWxlPXt7IHBvc2l0aW9uOiAnc3RhdGljJywgbWFyZ2luVG9wOiAxNCwgbWFyZ2luTGVmdDogLTIgfX1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogIWxlYWYgPyAoXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPSdzbGRzLW0tcmlnaHQtLXNtYWxsJ1xuICAgICAgICAgICAgYXJpYS1jb250cm9scz0nJ1xuICAgICAgICAgICAgdHlwZT0naWNvbi1iYXJlJ1xuICAgICAgICAgICAgaWNvbj17aWNvbn1cbiAgICAgICAgICAgIGljb25TaXplPSdzbWFsbCdcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25Ub2dnbGUuYmluZCh0aGlzKX1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPGFcbiAgICAgICAgICBjbGFzc05hbWU9J3NsZHMtdHJ1bmNhdGUnXG4gICAgICAgICAgdGFiSW5kZXg9ey0xfVxuICAgICAgICAgIHJvbGU9J3ByZXNlbnRhdGlvbidcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uTGFiZWxDbGljay5iaW5kKHRoaXMpfVxuICAgICAgICA+XG4gICAgICAgICAge2l0ZW1SZW5kZXIgPyBpdGVtUmVuZGVyKGl0ZW1Qcm9wcykgOiBsYWJlbH1cbiAgICAgICAgPC9hPlxuICAgICAgICB7bGVhZiA/IGNoaWxkcmVuIDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZW5kZXJDaGlsZE5vZGUobGV2ZWw6IG51bWJlciwgdG5vZGU6IGFueSkge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uTm9kZUNsaWNrLFxuICAgICAgb25Ob2RlVG9nZ2xlLFxuICAgICAgb25Ob2RlTGFiZWxDbGljayxcbiAgICAgIHRvZ2dsZU9uTm9kZUNsaWNrLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQodG5vZGUsIHtcbiAgICAgIGxldmVsLFxuICAgICAgb25Ob2RlQ2xpY2ssXG4gICAgICBvbk5vZGVUb2dnbGUsXG4gICAgICBvbk5vZGVMYWJlbENsaWNrLFxuICAgICAgdG9nZ2xlT25Ob2RlQ2xpY2ssXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZGVmYXVsdE9wZW5lZCxcbiAgICAgIG9wZW5lZCxcbiAgICAgIGxlYWYsXG4gICAgICBsZXZlbCA9IDEsXG4gICAgICBjaGlsZHJlbixcbiAgICAgIC4uLnByb3BzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaXNPcGVuZWQgPVxuICAgICAgdHlwZW9mIG9wZW5lZCAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgPyBvcGVuZWRcbiAgICAgICAgOiB0eXBlb2YgdGhpcy5zdGF0ZS5vcGVuZWQgIT09ICd1bmRlZmluZWQnXG4gICAgICAgID8gdGhpcy5zdGF0ZS5vcGVuZWRcbiAgICAgICAgOiBkZWZhdWx0T3BlbmVkO1xuICAgIGNvbnN0IGdycENsYXNzTmFtZXMgPSBjbGFzc25hbWVzKCdzbGRzLXRyZWVfX2dyb3VwJywge1xuICAgICAgJ3NsZHMtbmVzdGVkJzogIWxlYWYsXG4gICAgICAnaXMtZXhwYW5kZWQnOiBpc09wZW5lZCxcbiAgICAgICdzbGRzLXNob3cnOiBpc09wZW5lZCxcbiAgICAgICdzbGRzLWhpZGUnOiAhaXNPcGVuZWQsXG4gICAgfSk7XG4gICAgY29uc3QgaXRlbVByb3BzID0geyBsZWFmLCBpc09wZW5lZCwgY2hpbGRyZW4sIC4uLnByb3BzIH07XG4gICAgaWYgKGxlYWYpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxsaSByb2xlPSd0cmVlaXRlbScgYXJpYS1sZXZlbD17bGV2ZWx9PlxuICAgICAgICAgIHt0aGlzLnJlbmRlclRyZWVJdGVtKGl0ZW1Qcm9wcyl9XG4gICAgICAgIDwvbGk+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8bGkgcm9sZT0ndHJlZWl0ZW0nIGFyaWEtbGV2ZWw9e2xldmVsfSBhcmlhLWV4cGFuZGVkPXtpc09wZW5lZH0+XG4gICAgICAgIHt0aGlzLnJlbmRlclRyZWVJdGVtKGl0ZW1Qcm9wcyl9XG4gICAgICAgIDx1bCBjbGFzc05hbWU9e2dycENsYXNzTmFtZXN9IHJvbGU9J2dyb3VwJz5cbiAgICAgICAgICB7UmVhY3QuQ2hpbGRyZW4ubWFwKFxuICAgICAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgICAgICB0aGlzLnJlbmRlckNoaWxkTm9kZS5iaW5kKHRoaXMsIGxldmVsICsgMSlcbiAgICAgICAgICApfVxuICAgICAgICA8L3VsPlxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG4iXX0=