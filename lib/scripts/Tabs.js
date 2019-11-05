"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = exports.Tab = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _util = require("./util");

var _DropdownButton = require("./DropdownButton");

/**
 *
 */
var TabContent = function TabContent(props) {
  var className = props.className,
      active = props.active,
      children = props.children,
      pprops = (0, _objectWithoutProperties2.default)(props, ["className", "active", "children"]);
  var tabClassNames = (0, _classnames.default)(className, 'slds-tabs__content', "slds-".concat(active ? 'show' : 'hide'));
  return _react.default.createElement("div", (0, _extends2.default)({
    className: tabClassNames,
    role: "tabpanel"
  }, pprops), children);
};

/**
 *
 */
var TabMenu = function TabMenu(props) {
  var _props$icon = props.icon,
      icon = _props$icon === void 0 ? 'down' : _props$icon,
      children = props.children,
      pprops = (0, _objectWithoutProperties2.default)(props, ["icon", "children"]);
  return _react.default.createElement(_DropdownButton.DropdownButton, (0, _extends2.default)({
    className: "react-slds-tab-menu",
    icon: icon,
    type: "icon-bare",
    iconSize: "small",
    nubbinTop: true
  }, pprops), children);
};

var DefaultTabItemRenderer = function DefaultTabItemRenderer(props) {
  return _react.default.Children.only(props.children);
};

/**
 *
 */
var TabItem = function TabItem(props) {
  var type = props.type,
      title = props.title,
      activeKey = props.activeKey,
      eventKey = props.eventKey,
      activeTabRef = props.activeTabRef,
      menu = props.menu,
      menuIcon = props.menuIcon,
      onTabClick = props.onTabClick,
      onTabKeyDown = props.onTabKeyDown;
  var menuItems = props.menuItems;
  menuItems = menu ? menu.props.children : menuItems;
  var menuProps = menu ? menu.props : {};
  var isActive = eventKey === activeKey;
  var tabItemClassName = (0, _classnames.default)({
    'slds-tabs__item': !!menuItems
  }, "slds-tabs--".concat(type, "__item"), 'slds-text-heading---label', {
    'slds-active': isActive
  }, {
    'react-slds-tab-with-menu': menu || menuItems
  });
  var tabLinkClassName = "slds-tabs--".concat(type, "__link");
  var _props$tabItemRendere = props.tabItemRenderer,
      TabItemRenderer = _props$tabItemRendere === void 0 ? DefaultTabItemRenderer : _props$tabItemRendere,
      pprops = (0, _objectWithoutProperties2.default)(props, ["tabItemRenderer"]);
  return _react.default.createElement("li", {
    className: tabItemClassName,
    role: "presentation"
  }, _react.default.createElement(TabItemRenderer, pprops, _react.default.createElement("span", {
    className: "react-slds-tab-item-content"
  }, _react.default.createElement("a", {
    className: tabLinkClassName,
    role: "tab",
    ref: isActive ? activeTabRef : undefined,
    tabIndex: isActive ? 0 : -1,
    "aria-selected": isActive,
    onClick: function onClick() {
      return onTabClick && onTabClick(eventKey);
    },
    onKeyDown: function onKeyDown(e) {
      return onTabKeyDown && onTabKeyDown(eventKey, e);
    }
  }, title), menuItems ? _react.default.createElement(TabMenu, (0, _extends2.default)({
    icon: menuIcon
  }, menuProps), menuItems) : undefined)));
};

/**
 *
 */
var TabNav = function TabNav(props) {
  var type = props.type,
      tabs = props.tabs,
      activeKey = props.activeKey,
      activeTabRef = props.activeTabRef,
      onTabClick = props.onTabClick,
      onTabKeyDown = props.onTabKeyDown;
  var tabNavClassName = "slds-tabs--".concat(type, "__nav");
  return _react.default.createElement("ul", {
    className: tabNavClassName,
    role: "tablist"
  }, _react.default.Children.map(tabs, function (tab) {
    return _react.default.createElement(TabItem, (0, _extends2.default)({}, tab.props, {
      type: type,
      activeKey: activeKey,
      activeTabRef: activeTabRef,
      onTabClick: onTabClick,
      onTabKeyDown: onTabKeyDown
    }));
  }));
};

/**
 *
 */
var Tab = function Tab(props) {
  var className = props.className,
      eventKey = props.eventKey,
      activeKey = props.activeKey,
      children = props.children;
  return _react.default.createElement(TabContent, {
    className: className,
    active: eventKey === activeKey
  }, children);
};

exports.Tab = Tab;

/**
 *
 */
var Tabs =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Tabs, _Component);

  function Tabs(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Tabs);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Tabs).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "activeTab", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onTabClick", function (tabKey) {
      if (_this.props.onSelect) {
        _this.props.onSelect(tabKey);
      } // Uncontrolled


      _this.setState({
        activeKey: tabKey,
        focusTab: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onTabKeyDown", function (tabKey, e) {
      if (e.keyCode === 37 || e.keyCode === 39) {
        // left/right cursor key
        var idx = 0;
        var tabKeys = [];

        _react.default.Children.forEach(_this.props.children, function (tab, i) {
          tabKeys.push(tab.props.eventKey);

          if (tabKey === tab.props.eventKey) {
            idx = i;
          }
        });

        var dir = e.keyCode === 37 ? -1 : 1;
        var activeIdx = (idx + dir + tabKeys.length) % tabKeys.length;
        var activeKey = tabKeys[activeIdx];

        _this.onTabClick(activeKey);

        e.preventDefault();
        e.stopPropagation();
      }
    });
    _this.state = {};
    (0, _util.registerStyle)('tab-menu', [['.slds-tabs__item.react-slds-tab-with-menu', '{ position: relative !important; overflow: visible !important; }'], ['.slds-tabs__item.react-slds-tab-with-menu > .react-slds-tab-item-content', '{ overflow: hidden }'], ['.slds-tabs__item.react-slds-tab-with-menu > .react-slds-tab-item-content > a', '{ padding-right: 2rem; }'], ['.react-slds-tab-menu', '{ position: absolute; top: 0; right: 0; }'], ['.react-slds-tab-menu button', '{ height: 2.5rem; line-height: 2rem; width: 2rem; visibility: hidden }'], ['.slds-tabs__item.slds-active .react-slds-tab-menu button', '.slds-tabs__item:hover .react-slds-tab-menu button', '.slds-tabs__item .react-slds-tab-menu button:focus', '{ visibility: visible }']]);
    return _this;
  }

  (0, _createClass2.default)(Tabs, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.state.focusTab) {
        var el = this.activeTab;

        if (el) {
          el.focus();
        }
        /* eslint-disable react/no-did-update-set-state */


        this.setState({
          focusTab: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          children = _this$props.children;
      var type = this.props.type === 'scoped' ? 'scoped' : 'default';
      var tabsClassNames = (0, _classnames.default)(className, "slds-tabs--".concat(type));
      var activeKey = typeof this.props.activeKey !== 'undefined' ? this.props.activeKey : typeof this.state.activeKey !== 'undefined' ? this.state.activeKey : this.props.defaultActiveKey;
      return _react.default.createElement("div", {
        className: tabsClassNames
      }, _react.default.createElement(TabNav, {
        type: type,
        activeKey: activeKey,
        activeTabRef: function activeTabRef(node) {
          _this2.activeTab = node;
        },
        tabs: children,
        onTabClick: this.onTabClick,
        onTabKeyDown: this.onTabKeyDown
      }), _react.default.Children.map(children, function (tab) {
        return _react.default.cloneElement(tab, {
          activeKey: activeKey
        });
      }));
    }
  }]);
  return Tabs;
}(_react.Component);

exports.Tabs = Tabs;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL1RhYnMudHN4Il0sIm5hbWVzIjpbIlRhYkNvbnRlbnQiLCJwcm9wcyIsImNsYXNzTmFtZSIsImFjdGl2ZSIsImNoaWxkcmVuIiwicHByb3BzIiwidGFiQ2xhc3NOYW1lcyIsIlRhYk1lbnUiLCJpY29uIiwiRGVmYXVsdFRhYkl0ZW1SZW5kZXJlciIsIlJlYWN0IiwiQ2hpbGRyZW4iLCJvbmx5IiwiVGFiSXRlbSIsInR5cGUiLCJ0aXRsZSIsImFjdGl2ZUtleSIsImV2ZW50S2V5IiwiYWN0aXZlVGFiUmVmIiwibWVudSIsIm1lbnVJY29uIiwib25UYWJDbGljayIsIm9uVGFiS2V5RG93biIsIm1lbnVJdGVtcyIsIm1lbnVQcm9wcyIsImlzQWN0aXZlIiwidGFiSXRlbUNsYXNzTmFtZSIsInRhYkxpbmtDbGFzc05hbWUiLCJ0YWJJdGVtUmVuZGVyZXIiLCJUYWJJdGVtUmVuZGVyZXIiLCJ1bmRlZmluZWQiLCJlIiwiVGFiTmF2IiwidGFicyIsInRhYk5hdkNsYXNzTmFtZSIsIm1hcCIsInRhYiIsIlRhYiIsIlRhYnMiLCJ0YWJLZXkiLCJvblNlbGVjdCIsInNldFN0YXRlIiwiZm9jdXNUYWIiLCJrZXlDb2RlIiwiaWR4IiwidGFiS2V5cyIsImZvckVhY2giLCJpIiwicHVzaCIsImRpciIsImFjdGl2ZUlkeCIsImxlbmd0aCIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwic3RhdGUiLCJlbCIsImFjdGl2ZVRhYiIsImZvY3VzIiwidGFic0NsYXNzTmFtZXMiLCJkZWZhdWx0QWN0aXZlS2V5Iiwibm9kZSIsImNsb25lRWxlbWVudCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFPQTs7O0FBR0EsSUFBTUEsVUFBcUMsR0FBRyxTQUF4Q0EsVUFBd0MsQ0FBQ0MsS0FBRCxFQUFXO0FBQUEsTUFDL0NDLFNBRCtDLEdB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QUFMLENBQVdlLFNBRGYsR0FFSSxPQUFPLEtBQUtzQyxLQUFMLENBQVd0QyxTQUFsQixLQUFnQyxXQUFoQyxHQUNBLEtBQUtzQyxLQUFMLENBQVd0QyxTQURYLEdBRUEsS0FBS2YsS0FBTCxDQUFXMEQsZ0JBTGpCO0FBTUEsYUFDRTtBQUFLLFFBQUEsU0FBUyxFQUFFRDtBQUFoQixTQUNFLDZCQUFDLE1BQUQ7QUFDRSxRQUFBLElBQUksRUFBRTVDLElBRFI7QUFFRSxRQUFBLFNBQVMsRUFBRUUsU0FGYjtBQUdFLFFBQUEsWUFBWSxFQUFFLHNCQUFDNEMsSUFBRCxFQUFVO0FBQ3RCLFVBQUEsTUFBSSxDQUFDSixTQUFMLEdBQWlCSSxJQUFqQjtBQUNELFNBTEg7QUFNRSxRQUFBLElBQUksRUFBRXhELFFBTlI7QUFPRSxRQUFBLFVBQVUsRUFBRSxLQUFLaUIsVUFQbkI7QUFRRSxRQUFBLFlBQVksRUFBRSxLQUFLQztBQVJyQixRQURGLEVBV0daLGVBQU1DLFFBQU4sQ0FBZXdCLEdBQWYsQ0FBbUIvQixRQUFuQixFQUE2QixVQUFDZ0MsR0FBRDtBQUFBLGVBQzVCMUIsZUFBTW1ELFlBQU4sQ0FBbUJ6QixHQUFuQixFQUF3QjtBQUFFcEIsVUFBQUEsU0FBUyxFQUFUQTtBQUFGLFNBQXhCLENBRDRCO0FBQUEsT0FBN0IsQ0FYSCxDQURGO0FBaUJEOzs7RUF0R3VCOEMsZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBIVE1MQXR0cmlidXRlcywgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyByZWdpc3RlclN0eWxlIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7IERyb3Bkb3duQnV0dG9uLCBEcm9wZG93bkJ1dHRvblByb3BzIH0gZnJvbSAnLi9Ecm9wZG93bkJ1dHRvbic7XG5cbmV4cG9ydCB0eXBlIFRhYkNvbnRlbnRQcm9wcyA9IHtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBhY3RpdmU/OiBib29sZWFuO1xufSAmIEhUTUxBdHRyaWJ1dGVzPEhUTUxEaXZFbGVtZW50PjtcblxuLyoqXG4gKlxuICovXG5jb25zdCBUYWJDb250ZW50OiBSZWFjdC5GQzxUYWJDb250ZW50UHJvcHM+ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgY2xhc3NOYW1lLCBhY3RpdmUsIGNoaWxkcmVuLCAuLi5wcHJvcHMgfSA9IHByb3BzO1xuICBjb25zdCB0YWJDbGFzc05hbWVzID0gY2xhc3NuYW1lcyhcbiAgICBjbGFzc05hbWUsXG4gICAgJ3NsZHMtdGFic19fY29udGVudCcsXG4gICAgYHNsZHMtJHthY3RpdmUgPyAnc2hvdycgOiAnaGlkZSd9YFxuICApO1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXt0YWJDbGFzc05hbWVzfSByb2xlPSd0YWJwYW5lbCcgey4uLnBwcm9wc30+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgdHlwZSBUYWJNZW51UHJvcHMgPSBEcm9wZG93bkJ1dHRvblByb3BzO1xuLyoqXG4gKlxuICovXG5jb25zdCBUYWJNZW51OiBSZWFjdC5GQzxUYWJNZW51UHJvcHM+ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgaWNvbiA9ICdkb3duJywgY2hpbGRyZW4sIC4uLnBwcm9wcyB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPERyb3Bkb3duQnV0dG9uXG4gICAgICBjbGFzc05hbWU9J3JlYWN0LXNsZHMtdGFiLW1lbnUnXG4gICAgICBpY29uPXtpY29ufVxuICAgICAgdHlwZT0naWNvbi1iYXJlJ1xuICAgICAgaWNvblNpemU9J3NtYWxsJ1xuICAgICAgbnViYmluVG9wXG4gICAgICB7Li4ucHByb3BzfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0Ryb3Bkb3duQnV0dG9uPlxuICApO1xufTtcblxuY29uc3QgRGVmYXVsdFRhYkl0ZW1SZW5kZXJlciA9IChwcm9wczogYW55KSA9PlxuICBSZWFjdC5DaGlsZHJlbi5vbmx5KHByb3BzLmNoaWxkcmVuKTtcblxudHlwZSBFdmVudEtleSA9IHN0cmluZyB8IG51bWJlcjtcbmV4cG9ydCB0eXBlIFRhYlR5cGUgPSAnZGVmYXVsdCcgfCAnc2NvcGVkJztcblxuZXhwb3J0IHR5cGUgVGFiSXRlbVJlbmRlcmVyUHJvcHMgPSB7XG4gIHR5cGU/OiBUYWJUeXBlO1xuICB0aXRsZT86IHN0cmluZztcbiAgbWVudT86IEpTWC5FbGVtZW50O1xuICBtZW51SXRlbXM/OiBKU1guRWxlbWVudFtdO1xuICBtZW51SWNvbj86IHN0cmluZztcbiAgZXZlbnRLZXk/OiBFdmVudEtleTtcbiAgYWN0aXZlS2V5PzogRXZlbnRLZXk7XG4gIGFjdGl2ZVRhYlJlZj86IChub2RlOiBIVE1MQW5jaG9yRWxlbWVudCkgPT4gdm9pZDtcbiAgb25UYWJDbGljaz86IChldmVudEtleTogRXZlbnRLZXkgfCB1bmRlZmluZWQpID0+IHZvaWQ7XG4gIG9uVGFiS2V5RG93bj86IChcbiAgICBldmVudEtleTogRXZlbnRLZXkgfCB1bmRlZmluZWQsXG4gICAgZTogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MQW5jaG9yRWxlbWVudD5cbiAgKSA9PiB2b2lkO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59O1xuXG5leHBvcnQgdHlwZSBUYWJJdGVtUHJvcHMgPSB7XG4gIHRhYkl0ZW1SZW5kZXJlcj86IChwcm9wczogVGFiSXRlbVJlbmRlcmVyUHJvcHMpID0+IEpTWC5FbGVtZW50O1xufSAmIFRhYkl0ZW1SZW5kZXJlclByb3BzO1xuXG4vKipcbiAqXG4gKi9cbmNvbnN0IFRhYkl0ZW06IFJlYWN0LkZDPFRhYkl0ZW1Qcm9wcz4gPSAocHJvcHMpID0+IHtcbiAgY29uc3Qge1xuICAgIHR5cGUsXG4gICAgdGl0bGUsXG4gICAgYWN0aXZlS2V5LFxuICAgIGV2ZW50S2V5LFxuICAgIGFjdGl2ZVRhYlJlZixcbiAgICBtZW51LFxuICAgIG1lbnVJY29uLFxuICAgIG9uVGFiQ2xpY2ssXG4gICAgb25UYWJLZXlEb3duLFxuICB9ID0gcHJvcHM7XG4gIGxldCB7IG1lbnVJdGVtcyB9ID0gcHJvcHM7XG4gIG1lbnVJdGVtcyA9IG1lbnUgPyBtZW51LnByb3BzLmNoaWxkcmVuIDogbWVudUl0ZW1zO1xuICBjb25zdCBtZW51UHJvcHMgPSBtZW51ID8gbWVudS5wcm9wcyA6IHt9O1xuICBjb25zdCBpc0FjdGl2ZSA9IGV2ZW50S2V5ID09PSBhY3RpdmVLZXk7XG4gIGNvbnN0IHRhYkl0ZW1DbGFzc05hbWUgPSBjbGFzc25hbWVzKFxuICAgIHsgJ3NsZHMtdGFic19faXRlbSc6ICEhbWVudUl0ZW1zIH0sXG4gICAgYHNsZHMtdGFicy0tJHt0eXBlfV9faXRlbWAsXG4gICAgJ3NsZHMtdGV4dC1oZWFkaW5nLS0tbGFiZWwnLFxuICAgIHsgJ3NsZHMtYWN0aXZlJzogaXNBY3RpdmUgfSxcbiAgICB7ICdyZWFjdC1zbGRzLXRhYi13aXRoLW1lbnUnOiBtZW51IHx8IG1lbnVJdGVtcyB9XG4gICk7XG4gIGNvbnN0IHRhYkxpbmtDbGFzc05hbWUgPSBgc2xkcy10YWJzLS0ke3R5cGV9X19saW5rYDtcbiAgY29uc3Qge1xuICAgIHRhYkl0ZW1SZW5kZXJlcjogVGFiSXRlbVJlbmRlcmVyID0gRGVmYXVsdFRhYkl0ZW1SZW5kZXJlcixcbiAgICAuLi5wcHJvcHNcbiAgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxsaSBjbGFzc05hbWU9e3RhYkl0ZW1DbGFzc05hbWV9IHJvbGU9J3ByZXNlbnRhdGlvbic+XG4gICAgICA8VGFiSXRlbVJlbmRlcmVyIHsuLi5wcHJvcHN9PlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3JlYWN0LXNsZHMtdGFiLWl0ZW0tY29udGVudCc+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGNsYXNzTmFtZT17dGFiTGlua0NsYXNzTmFtZX1cbiAgICAgICAgICAgIHJvbGU9J3RhYidcbiAgICAgICAgICAgIHJlZj17aXNBY3RpdmUgPyBhY3RpdmVUYWJSZWYgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICB0YWJJbmRleD17aXNBY3RpdmUgPyAwIDogLTF9XG4gICAgICAgICAgICBhcmlhLXNlbGVjdGVkPXtpc0FjdGl2ZX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uVGFiQ2xpY2sgJiYgb25UYWJDbGljayhldmVudEtleSl9XG4gICAgICAgICAgICBvbktleURvd249eyhlKSA9PiBvblRhYktleURvd24gJiYgb25UYWJLZXlEb3duKGV2ZW50S2V5LCBlKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGl0bGV9XG4gICAgICAgICAgPC9hPlxuICAgICAgICAgIHttZW51SXRlbXMgPyAoXG4gICAgICAgICAgICA8VGFiTWVudSBpY29uPXttZW51SWNvbn0gey4uLm1lbnVQcm9wc30+XG4gICAgICAgICAgICAgIHttZW51SXRlbXN9XG4gICAgICAgICAgICA8L1RhYk1lbnU+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIHVuZGVmaW5lZFxuICAgICAgICAgICl9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvVGFiSXRlbVJlbmRlcmVyPlxuICAgIDwvbGk+XG4gICk7XG59O1xuXG5leHBvcnQgdHlwZSBUYWJOYXZQcm9wcyA9IHtcbiAgdHlwZT86IFRhYlR5cGU7XG4gIGFjdGl2ZUtleT86IEV2ZW50S2V5O1xuICB0YWJzPzogUmVhY3ROb2RlO1xuICBhY3RpdmVUYWJSZWY/OiAobm9kZTogSFRNTEFuY2hvckVsZW1lbnQpID0+IHZvaWQ7XG4gIG9uVGFiQ2xpY2s/OiAoZXZlbnRLZXk/OiBFdmVudEtleSkgPT4gdm9pZDtcbiAgb25UYWJLZXlEb3duPzogKFxuICAgIGV2ZW50S2V5OiBFdmVudEtleSB8IHVuZGVmaW5lZCxcbiAgICBlOiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxBbmNob3JFbGVtZW50PlxuICApID0+IHZvaWQ7XG59O1xuLyoqXG4gKlxuICovXG5jb25zdCBUYWJOYXY6IFJlYWN0LkZDPFRhYk5hdlByb3BzPiA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7XG4gICAgdHlwZSxcbiAgICB0YWJzLFxuICAgIGFjdGl2ZUtleSxcbiAgICBhY3RpdmVUYWJSZWYsXG4gICAgb25UYWJDbGljayxcbiAgICBvblRhYktleURvd24sXG4gIH0gPSBwcm9wcztcbiAgY29uc3QgdGFiTmF2Q2xhc3NOYW1lID0gYHNsZHMtdGFicy0tJHt0eXBlfV9fbmF2YDtcbiAgcmV0dXJuIChcbiAgICA8dWwgY2xhc3NOYW1lPXt0YWJOYXZDbGFzc05hbWV9IHJvbGU9J3RhYmxpc3QnPlxuICAgICAge1JlYWN0LkNoaWxkcmVuLm1hcCh0YWJzLCAodGFiOiBhbnkpID0+IChcbiAgICAgICAgPFRhYkl0ZW1cbiAgICAgICAgICB7Li4udGFiLnByb3BzfVxuICAgICAgICAgIHR5cGU9e3R5cGV9XG4gICAgICAgICAgYWN0aXZlS2V5PXthY3RpdmVLZXl9XG4gICAgICAgICAgYWN0aXZlVGFiUmVmPXthY3RpdmVUYWJSZWZ9XG4gICAgICAgICAgb25UYWJDbGljaz17b25UYWJDbGlja31cbiAgICAgICAgICBvblRhYktleURvd249e29uVGFiS2V5RG93bn1cbiAgICAgICAgLz5cbiAgICAgICkpfVxuICAgIDwvdWw+XG4gICk7XG59O1xuXG5leHBvcnQgdHlwZSBUYWJQcm9wcyA9IHtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBldmVudEtleT86IEV2ZW50S2V5O1xuICBhY3RpdmVLZXk/OiBFdmVudEtleTtcbn0gJiBUYWJJdGVtUHJvcHM7XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGNvbnN0IFRhYjogUmVhY3QuRkM8VGFiUHJvcHM+ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgY2xhc3NOYW1lLCBldmVudEtleSwgYWN0aXZlS2V5LCBjaGlsZHJlbiB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPFRhYkNvbnRlbnQgY2xhc3NOYW1lPXtjbGFzc05hbWV9IGFjdGl2ZT17ZXZlbnRLZXkgPT09IGFjdGl2ZUtleX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9UYWJDb250ZW50PlxuICApO1xufTtcblxuZXhwb3J0IHR5cGUgVGFic1Byb3BzID0ge1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIHR5cGU/OiBUYWJUeXBlO1xuICBkZWZhdWx0QWN0aXZlS2V5PzogRXZlbnRLZXk7XG4gIGFjdGl2ZUtleT86IEV2ZW50S2V5O1xuICBvblNlbGVjdDogKHRhYktleTogRXZlbnRLZXkgfCB1bmRlZmluZWQpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgdHlwZSBUYWJzU3RhdGUgPSB7XG4gIGZvY3VzVGFiPzogYm9vbGVhbjtcbiAgYWN0aXZlS2V5PzogRXZlbnRLZXk7XG59O1xuLyoqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgVGFicyBleHRlbmRzIENvbXBvbmVudDxUYWJzUHJvcHMsIFRhYnNTdGF0ZT4ge1xuICBhY3RpdmVUYWI6IEhUTUxBbmNob3JFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IFJlYWRvbmx5PFRhYnNQcm9wcz4pIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHt9O1xuICAgIHJlZ2lzdGVyU3R5bGUoJ3RhYi1tZW51JywgW1xuICAgICAgW1xuICAgICAgICAnLnNsZHMtdGFic19faXRlbS5yZWFjdC1zbGRzLXRhYi13aXRoLW1lbnUnLFxuICAgICAgICAneyBwb3NpdGlvbjogcmVsYXRpdmUgIWltcG9ydGFudDsgb3ZlcmZsb3c6IHZpc2libGUgIWltcG9ydGFudDsgfScsXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAnLnNsZHMtdGFic19faXRlbS5yZWFjdC1zbGRzLXRhYi13aXRoLW1lbnUgPiAucmVhY3Qtc2xkcy10YWItaXRlbS1jb250ZW50JyxcbiAgICAgICAgJ3sgb3ZlcmZsb3c6IGhpZGRlbiB9JyxcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICcuc2xkcy10YWJzX19pdGVtLnJlYWN0LXNsZHMtdGFiLXdpdGgtbWVudSA+IC5yZWFjdC1zbGRzLXRhYi1pdGVtLWNvbnRlbnQgPiBhJyxcbiAgICAgICAgJ3sgcGFkZGluZy1yaWdodDogMnJlbTsgfScsXG4gICAgICBdLFxuICAgICAgWycucmVhY3Qtc2xkcy10YWItbWVudScsICd7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyByaWdodDogMDsgfSddLFxuICAgICAgW1xuICAgICAgICAnLnJlYWN0LXNsZHMtdGFiLW1lbnUgYnV0dG9uJyxcbiAgICAgICAgJ3sgaGVpZ2h0OiAyLjVyZW07IGxpbmUtaGVpZ2h0OiAycmVtOyB3aWR0aDogMnJlbTsgdmlzaWJpbGl0eTogaGlkZGVuIH0nLFxuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJy5zbGRzLXRhYnNfX2l0ZW0uc2xkcy1hY3RpdmUgLnJlYWN0LXNsZHMtdGFiLW1lbnUgYnV0dG9uJyxcbiAgICAgICAgJy5zbGRzLXRhYnNfX2l0ZW06aG92ZXIgLnJlYWN0LXNsZHMtdGFiLW1lbnUgYnV0dG9uJyxcbiAgICAgICAgJy5zbGRzLXRhYnNfX2l0ZW0gLnJlYWN0LXNsZHMtdGFiLW1lbnUgYnV0dG9uOmZvY3VzJyxcbiAgICAgICAgJ3sgdmlzaWJpbGl0eTogdmlzaWJsZSB9JyxcbiAgICAgIF0sXG4gICAgXSk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuZm9jdXNUYWIpIHtcbiAgICAgIGNvbnN0IGVsID0gdGhpcy5hY3RpdmVUYWI7XG4gICAgICBpZiAoZWwpIHtcbiAgICAgICAgZWwuZm9jdXMoKTtcbiAgICAgIH1cbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLWRpZC11cGRhdGUtc2V0LXN0YXRlICovXG4gICAgICB0aGlzLnNldFN0YXRlKHsgZm9jdXNUYWI6IGZhbHNlIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uVGFiQ2xpY2sgPSAodGFiS2V5OiBFdmVudEtleSB8IHVuZGVmaW5lZCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uU2VsZWN0KSB7XG4gICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHRhYktleSk7XG4gICAgfVxuICAgIC8vIFVuY29udHJvbGxlZFxuICAgIHRoaXMuc2V0U3RhdGUoeyBhY3RpdmVLZXk6IHRhYktleSwgZm9jdXNUYWI6IHRydWUgfSk7XG4gIH07XG5cbiAgb25UYWJLZXlEb3duID0gKFxuICAgIHRhYktleTogRXZlbnRLZXkgfCB1bmRlZmluZWQsXG4gICAgZTogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MQW5jaG9yRWxlbWVudD5cbiAgKSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMzcgfHwgZS5rZXlDb2RlID09PSAzOSkge1xuICAgICAgLy8gbGVmdC9yaWdodCBjdXJzb3Iga2V5XG4gICAgICBsZXQgaWR4ID0gMDtcbiAgICAgIGNvbnN0IHRhYktleXM6IEV2ZW50S2V5W10gPSBbXTtcbiAgICAgIFJlYWN0LkNoaWxkcmVuLmZvckVhY2godGhpcy5wcm9wcy5jaGlsZHJlbiwgKHRhYjogYW55LCBpKSA9PiB7XG4gICAgICAgIHRhYktleXMucHVzaCh0YWIucHJvcHMuZXZlbnRLZXkpO1xuICAgICAgICBpZiAodGFiS2V5ID09PSB0YWIucHJvcHMuZXZlbnRLZXkpIHtcbiAgICAgICAgICBpZHggPSBpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGRpciA9IGUua2V5Q29kZSA9PT0gMzcgPyAtMSA6IDE7XG4gICAgICBjb25zdCBhY3RpdmVJZHggPSAoaWR4ICsgZGlyICsgdGFiS2V5cy5sZW5ndGgpICUgdGFiS2V5cy5sZW5ndGg7XG4gICAgICBjb25zdCBhY3RpdmVLZXkgPSB0YWJLZXlzW2FjdGl2ZUlkeF07XG4gICAgICB0aGlzLm9uVGFiQ2xpY2soYWN0aXZlS2V5KTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNsYXNzTmFtZSwgY2hpbGRyZW4gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgdHlwZSA9IHRoaXMucHJvcHMudHlwZSA9PT0gJ3Njb3BlZCcgPyAnc2NvcGVkJyA6ICdkZWZhdWx0JztcbiAgICBjb25zdCB0YWJzQ2xhc3NOYW1lcyA9IGNsYXNzbmFtZXMoY2xhc3NOYW1lLCBgc2xkcy10YWJzLS0ke3R5cGV9YCk7XG4gICAgY29uc3QgYWN0aXZlS2V5ID1cbiAgICAgIHR5cGVvZiB0aGlzLnByb3BzLmFjdGl2ZUtleSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgPyB0aGlzLnByb3BzLmFjdGl2ZUtleVxuICAgICAgICA6IHR5cGVvZiB0aGlzLnN0YXRlLmFjdGl2ZUtleSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgPyB0aGlzLnN0YXRlLmFjdGl2ZUtleVxuICAgICAgICA6IHRoaXMucHJvcHMuZGVmYXVsdEFjdGl2ZUtleTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3RhYnNDbGFzc05hbWVzfT5cbiAgICAgICAgPFRhYk5hdlxuICAgICAgICAgIHR5cGU9e3R5cGV9XG4gICAgICAgICAgYWN0aXZlS2V5PXthY3RpdmVLZXl9XG4gICAgICAgICAgYWN0aXZlVGFiUmVmPXsobm9kZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVUYWIgPSBub2RlO1xuICAgICAgICAgIH19XG4gICAgICAgICAgdGFicz17Y2hpbGRyZW59XG4gICAgICAgICAgb25UYWJDbGljaz17dGhpcy5vblRhYkNsaWNrfVxuICAgICAgICAgIG9uVGFiS2V5RG93bj17dGhpcy5vblRhYktleURvd259XG4gICAgICAgIC8+XG4gICAgICAgIHtSZWFjdC5DaGlsZHJlbi5tYXAoY2hpbGRyZW4sICh0YWI6IGFueSkgPT5cbiAgICAgICAgICBSZWFjdC5jbG9uZUVsZW1lbnQodGFiLCB7IGFjdGl2ZUtleSB9KVxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19