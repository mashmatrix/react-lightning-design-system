"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SalesPath = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Icon = require("./Icon");

var PathItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(PathItem, _React$Component);

  function PathItem() {
    (0, _classCallCheck2.default)(this, PathItem);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PathItem).apply(this, arguments));
  }

  (0, _createClass2.default)(PathItem, [{
    key: "onItemClick",
    value: function onItemClick(itemKey) {
      if (this.props.onSelect) {
        this.props.onSelect(itemKey);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          eventKey = _this$props.eventKey,
          title = _this$props.title,
          completedTitle = _this$props.completedTitle,
          type = _this$props.type;
      var pathItemClassName = (0, _classnames.default)('slds-tabs--path__item', "slds-is-".concat(type), className);
      var tabIndex = type === 'current' ? 0 : -1;
      var completedText = completedTitle || 'Stage Complete';
      return _react.default.createElement("li", {
        className: pathItemClassName,
        role: "presentation"
      }, _react.default.createElement("a", {
        className: "slds-tabs--path__link",
        "aria-selected": "false",
        tabIndex: tabIndex,
        role: "tab",
        "aria-live": "assertive",
        onClick: this.onItemClick.bind(this, eventKey)
      }, _react.default.createElement("span", {
        className: "slds-tabs--path__stage"
      }, _react.default.createElement(_Icon.Icon, {
        category: "utility",
        icon: "check",
        size: "x-small"
      }), type === 'complete' ? _react.default.createElement("span", {
        className: "slds-assistive-text"
      }, completedText) : null), _react.default.createElement("span", {
        className: "slds-tabs--path__title"
      }, title)));
    }
  }]);
  return PathItem;
}(_react.default.Component);

var SalesPath =
/*#__PURE__*/
function (_React$Component2) {
  (0, _inherits2.default)(SalesPath, _React$Component2);

  function SalesPath(props) {
    var _this;

    (0, _classCallCheck2.default)(this, SalesPath);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SalesPath).call(this, props));
    _this.state = {};
    _this.onItemClick = _this.onItemClick.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(SalesPath, [{
    key: "onItemClick",
    value: function onItemClick(itemKey) {
      if (this.props.onSelect) {
        this.props.onSelect(itemKey);
      } // Uncontrolled


      this.setState({
        activeKey: itemKey
      });
    }
  }, {
    key: "renderSalesPath",
    value: function renderSalesPath(activeKey, paths) {
      var _this2 = this;

      var typeTracker = -1;
      return _react.default.Children.map(paths, function (path) {
        var _path$props = path.props,
            eventKey = _path$props.eventKey,
            type = _path$props.type,
            props = (0, _objectWithoutProperties2.default)(_path$props, ["eventKey", "type"]);
        var isActive = eventKey === activeKey;
        typeTracker = isActive ? 0 : typeTracker >= 0 ? 1 : -1;
        var evaluatedType = type || (isActive ? 'current' : typeTracker === -1 ? 'complete' : 'incomplete');
        return _react.default.createElement(PathItem, (0, _extends2.default)({
          eventKey: eventKey,
          type: evaluatedType,
          onSelect: _this2.onItemClick
        }, props));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          children = _this$props2.children;
      var activeKey = this.props.activeKey || this.state.activeKey || this.props.defaultActiveKey;
      var salesPathClassNames = (0, _classnames.default)(className, 'slds-tabs--path');
      return _react.default.createElement("div", {
        className: salesPathClassNames,
        role: "application tablist"
      }, _react.default.createElement("ul", {
        className: "slds-tabs--path__nav",
        role: "presentation"
      }, this.renderSalesPath(activeKey, children)));
    }
  }]);
  return SalesPath;
}(_react.default.Component);

exports.SalesPath = SalesPath;
(0, _defineProperty2.default)(SalesPath, "PathItem", PathItem);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL1NhbGVzUGF0aC50c3giXSwibmFtZXMiOlsiUGF0aEl0ZW0iLCJpdGVtS2V5IiwicHJvcHMiLCJvblNlbGVjdCIsImNsYXNzTmFtZSIsImV2ZW50S2V5IiwidGl0bGUiLCJjb21wbGV0ZWRUaXRsZSIsInR5cGUiLCJwYXRoSXRlbUNsYXNzTmFtZSIsInRhYkluZGV4IiwiY29tcGxldGVkVGV4dCIsIm9uSXRlbUNsaWNrIiwiYmluZCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiU2FsZXNQYXRoIiwic3RhdGUiLCJzZXRTdGF0ZSIsImFjdGl2ZUtleSIsInBhdGhzIiwidHlwZVRyYWNrZXIiLCJDaGlsZHJlbiIsIm1hcCIsInBhdGgiLCJpc0FjdGl2ZSIsImV2YWx1YXRlZFR5cGUiLCJjaGlsZHJlbiIsImRlZmF1bHRBY3RpdmVLZXkiLCJzYWxlc1BhdGhDbGFzc05hbWVzIiwicmVuZGVyU2FsZXNQYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7SUFXTUEsUTs7Ozs7Ozs7Ozs7O2dDQUNRQyxPLEVBQWM7QUFDeEIsVUFBSSxLQUFLQyxLQUFMLENBQVdDLFFBQWYsRUFBeUI7QUFDdkIsYUFBS0QsS0FBTCxDQUFXQyxRQUFYLENBQW9CRixPQUFwQjtBQUNEO0FBQ0Y7Ozs2QkFFUTtBQUFBLHdCQUNzRCxLQUFLQyxLQUQzRDtBQUFBLFVBQ0NFLFNBREQsZUFDQ0EsU0FERDtBQUFBLFVBQ1lDLFFBRFosZUFDWUEsUUFEWjtBQUFBLFVBQ3NCQyxLQUR0QixlQUNzQkEsS0FEdEI7QUFBQSxVQUM2QkMsY0FEN0IsZUFDNkJBLGNBRDdCO0FBQUEsVUFDNkNDLElBRDdDLGVBQzZDQSxJQUQ3QztBQUdQLFVBQU1DLGlCQUFpQixHQUFHLHlCQUN4Qix1QkFEd0Isb0JBRWJELElBRmEsR0FHeEJKLFNBSHdCLENBQTFCO0FBTUEsVUFBTU0sUUFBUSxHQUFHRixJQUFJLEtBQUssU0FB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QUFXekIsU0FBWCxFQUFzQixpQkFBdEIsQ0FBNUI7QUFDQSxhQUNFO0FBQUssUUFBQSxTQUFTLEVBQUV5QixtQkFBaEI7QUFBcUMsUUFBQSxJQUFJLEVBQUM7QUFBMUMsU0FDRTtBQUFJLFFBQUEsU0FBUyxFQUFDLHNCQUFkO0FBQXFDLFFBQUEsSUFBSSxFQUFDO0FBQTFDLFNBQ0csS0FBS0MsZUFBTCxDQUFxQlgsU0FBckIsRUFBZ0NRLFFBQWhDLENBREgsQ0FERixDQURGO0FBT0Q7OztFQXpENEJiLGVBQU1DLFM7Ozs4QkFBeEJDLFMsY0FDT2hCLFEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnLi9JY29uJztcblxuZXhwb3J0IHR5cGUgUGF0aEl0ZW1Qcm9wcyA9IHtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBldmVudEtleT86IGFueTtcbiAgdHlwZT86ICdjb21wbGV0ZScgfCAnY3VycmVudCcgfCAnaW5jb21wbGV0ZSc7XG4gIHRpdGxlPzogc3RyaW5nO1xuICBjb21wbGV0ZWRUaXRsZT86IHN0cmluZztcbiAgb25TZWxlY3Q/OiAoaXRlbUtleTogYW55KSA9PiB2b2lkO1xufTtcblxuY2xhc3MgUGF0aEl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UGF0aEl0ZW1Qcm9wcz4ge1xuICBvbkl0ZW1DbGljayhpdGVtS2V5OiBhbnkpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblNlbGVjdCkge1xuICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChpdGVtS2V5KTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjbGFzc05hbWUsIGV2ZW50S2V5LCB0aXRsZSwgY29tcGxldGVkVGl0bGUsIHR5cGUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBwYXRoSXRlbUNsYXNzTmFtZSA9IGNsYXNzbmFtZXMoXG4gICAgICAnc2xkcy10YWJzLS1wYXRoX19pdGVtJyxcbiAgICAgIGBzbGRzLWlzLSR7dHlwZX1gLFxuICAgICAgY2xhc3NOYW1lXG4gICAgKTtcblxuICAgIGNvbnN0IHRhYkluZGV4ID0gdHlwZSA9PT0gJ2N1cnJlbnQnID8gMCA6IC0xO1xuICAgIGNvbnN0IGNvbXBsZXRlZFRleHQgPSBjb21wbGV0ZWRUaXRsZSB8fCAnU3RhZ2UgQ29tcGxldGUnO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBjbGFzc05hbWU9e3BhdGhJdGVtQ2xhc3NOYW1lfSByb2xlPSdwcmVzZW50YXRpb24nPlxuICAgICAgICA8YVxuICAgICAgICAgIGNsYXNzTmFtZT0nc2xkcy10YWJzLS1wYXRoX19saW5rJ1xuICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9J2ZhbHNlJ1xuICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICByb2xlPSd0YWInXG4gICAgICAgICAgYXJpYS1saXZlPSdhc3NlcnRpdmUnXG4gICAgICAgICAgb25DbGljaz17dGhpcy5vbkl0ZW1DbGljay5iaW5kKHRoaXMsIGV2ZW50S2V5KX1cbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nc2xkcy10YWJzLS1wYXRoX19zdGFnZSc+XG4gICAgICAgICAgICA8SWNvbiBjYXRlZ29yeT0ndXRpbGl0eScgaWNvbj0nY2hlY2snIHNpemU9J3gtc21hbGwnIC8+XG4gICAgICAgICAgICB7dHlwZSA9PT0gJ2NvbXBsZXRlJyA/IChcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdzbGRzLWFzc2lzdGl2ZS10ZXh0Jz57Y29tcGxldGVkVGV4dH08L3NwYW4+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdzbGRzLXRhYnMtLXBhdGhfX3RpdGxlJz57dGl0bGV9PC9zcGFuPlxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgU2FsZXNQYXRoUHJvcHMgPSB7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgZGVmYXVsdEFjdGl2ZUtleT86IGFueTtcbiAgYWN0aXZlS2V5PzogYW55O1xuICBvblNlbGVjdD86IChpdGVtS2V5OiBhbnkpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgdHlwZSBTYWxlc1BhdGhTdGF0ZSA9IHtcbiAgYWN0aXZlS2V5PzogYW55O1xufTtcblxuZXhwb3J0IGNsYXNzIFNhbGVzUGF0aCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxTYWxlc1BhdGhQcm9wcywgU2FsZXNQYXRoU3RhdGU+IHtcbiAgc3RhdGljIFBhdGhJdGVtID0gUGF0aEl0ZW07XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IFJlYWRvbmx5PFNhbGVzUGF0aFByb3BzPikge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge307XG5cbiAgICB0aGlzLm9uSXRlbUNsaWNrID0gdGhpcy5vbkl0ZW1DbGljay5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25JdGVtQ2xpY2soaXRlbUtleTogYW55KSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25TZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMub25TZWxlY3QoaXRlbUtleSk7XG4gICAgfVxuICAgIC8vIFVuY29udHJvbGxlZFxuICAgIHRoaXMuc2V0U3RhdGUoeyBhY3RpdmVLZXk6IGl0ZW1LZXkgfSk7XG4gIH1cblxuICByZW5kZXJTYWxlc1BhdGgoYWN0aXZlS2V5OiBhbnksIHBhdGhzOiBhbnkpIHtcbiAgICBsZXQgdHlwZVRyYWNrZXIgPSAtMTtcblxuICAgIHJldHVybiBSZWFjdC5DaGlsZHJlbi5tYXAocGF0aHMsIChwYXRoKSA9PiB7XG4gICAgICBjb25zdCB7IGV2ZW50S2V5LCB0eXBlLCAuLi5wcm9wcyB9ID0gcGF0aC5wcm9wcztcbiAgICAgIGNvbnN0IGlzQWN0aXZlID0gZXZlbnRLZXkgPT09IGFjdGl2ZUtleTtcblxuICAgICAgdHlwZVRyYWNrZXIgPSBpc0FjdGl2ZSA/IDAgOiB0eXBlVHJhY2tlciA+PSAwID8gMSA6IC0xO1xuXG4gICAgICBjb25zdCBldmFsdWF0ZWRUeXBlID1cbiAgICAgICAgdHlwZSB8fFxuICAgICAgICAoaXNBY3RpdmUgPyAnY3VycmVudCcgOiB0eXBlVHJhY2tlciA9PT0gLTEgPyAnY29tcGxldGUnIDogJ2luY29tcGxldGUnKTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFBhdGhJdGVtXG4gICAgICAgICAgZXZlbnRLZXk9e2V2ZW50S2V5fVxuICAgICAgICAgIHR5cGU9e2V2YWx1YXRlZFR5cGV9XG4gICAgICAgICAgb25TZWxlY3Q9e3RoaXMub25JdGVtQ2xpY2t9XG4gICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNsYXNzTmFtZSwgY2hpbGRyZW4gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgYWN0aXZlS2V5ID1cbiAgICAgIHRoaXMucHJvcHMuYWN0aXZlS2V5IHx8XG4gICAgICB0aGlzLnN0YXRlLmFjdGl2ZUtleSB8fFxuICAgICAgdGhpcy5wcm9wcy5kZWZhdWx0QWN0aXZlS2V5O1xuXG4gICAgY29uc3Qgc2FsZXNQYXRoQ2xhc3NOYW1lcyA9IGNsYXNzbmFtZXMoY2xhc3NOYW1lLCAnc2xkcy10YWJzLS1wYXRoJyk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzYWxlc1BhdGhDbGFzc05hbWVzfSByb2xlPSdhcHBsaWNhdGlvbiB0YWJsaXN0Jz5cbiAgICAgICAgPHVsIGNsYXNzTmFtZT0nc2xkcy10YWJzLS1wYXRoX19uYXYnIHJvbGU9J3ByZXNlbnRhdGlvbic+XG4gICAgICAgICAge3RoaXMucmVuZGVyU2FsZXNQYXRoKGFjdGl2ZUtleSwgY2hpbGRyZW4pfVxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19