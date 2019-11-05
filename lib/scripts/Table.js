"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = exports.TableRowColumnActions = exports.TableRowColumn = exports.TableHeaderColumn = exports.TableRow = exports.TableBody = exports.TableHeader = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _Icon = require("./Icon");

var TableHeader =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TableHeader, _Component);

  function TableHeader() {
    (0, _classCallCheck2.default)(this, TableHeader);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TableHeader).apply(this, arguments));
  }

  (0, _createClass2.default)(TableHeader, [{
    key: "renderBaseHeaderRow",
    value: function renderBaseHeaderRow() {
      var _this$props = this.props,
          children = _this$props.children,
          sortable = _this$props.sortable,
          hasActions = _this$props.hasActions,
          _this$props$actionsPo = _this$props.actionsPosition,
          actionsPosition = _this$props$actionsPo === void 0 ? 0 : _this$props$actionsPo;
      var nextChildren = [];
      var props = {
        className: 'slds-text-title--caps'
      };

      _react.default.Children.forEach(children.props.children, function (child, index) {
        var childSortable = child.props.sortable;
        nextChildren.push(_react.default.cloneElement(child, {
          // eslint-disable-next-line react/no-array-index-key
          key: index,
          sortable: typeof childSortable === 'undefined' ? sortable : childSortable
        }));
      });

      if (hasActions) {
        nextChildren = [].concat((0, _toConsumableArray2.default)(nextChildren.slice(0, actionsPosition)), [_react.default.createElement(TableHeaderColumn, {
          sortable: false,
          width: 50,
          key: -1,
          className: "slds-cell-shrink"
        })], (0, _toConsumableArray2.default)(nextChildren.slice(actionsPosition)));
      }

      return _react.default.cloneElement(children, props, nextChildren);
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("thead", null, this.renderBaseHeaderRow());
    }
  }]);
  return TableHeader;
}(_react.Component);

exports.TableHeader = TableHeader;

var TableBody =
/*#__PURE__*/
function (_Component2) {
  (0, _inherits2.default)(TableBody, _Component2);

  function TableBody() {
    (0, _classCallCheck2.default)(this, TableBody);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TableBody).apply(this, arguments));
  }

  (0, _createClass2.default)(TableBody, [{
    key: "renderRows",
    value: function renderRows() {
      return _react.default.Children.map(this.props.children, function (child) {
        var children = [];

        _react.default.Children.forEach(child.props.children, function (innerChild, index) {
          if (!_react.default.isValidElement(innerChild)) return;
          var _ref = innerChild.props,
              truncate = _ref.truncate;
          var props = {
            key: index
          };
          if (typeof truncate !== 'undefined') props.truncate = truncate;
          children.push(_react.default.cloneElement(innerChild, props));
        });

        return _react.default.cloneElement(child, {
          className: 'slds-hint-parent'
        }, children);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("tbody", null, this.renderRows());
    }
  }]);
  return TableBody;
}(_react.Component);

exports.TableBody = TableBody;

var TableRow = function TableRow(_ref2) {
  var selected = _ref2.selected,
      props = (0, _objectWithoutProperties2.default)(_ref2, ["selected"]);
  var style = props.style;

  if (selected) {
    style = Object.assign({}, style, {
      backgroundColor: '#F8FCF5',
      borderLeft: '2px solid #7db450'
    });
  }

  return _react.default.createElement("tr", (0, _extends2.default)({}, props, {
    style: style
  }), props.children);
};

exports.TableRow = TableRow;

var TableHeaderColumn = function TableHeaderColumn(props) {
  var sortable = props.sortable,
      resizable = props.resizable,
      children = props.children,
      className = props.className,
      width = props.width,
      sortDir = props.sortDir,
      onSort = props.onSort,
      sorted = props.sorted,
      align = props.align,
      pprops = (0, _objectWithoutProperties2.default)(props, ["sortable", "resizable", "children", "className", "width", "sortDir", "onSort", "sorted", "align"]);
  var oClassNames = (0, _classnames2.default)(className, 'slds-text-title--caps slds-truncate', (0, _defineProperty2.default)({
    'slds-is-sortable': sortable,
    'slds-is-resizable': resizable,
    'slds-is-sorted': sorted
  }, "slds-text-align--".concat(align), align));
  var style = {
    minWidth: width || 'auto'
  };
  var icon = sortDir === 'DESC' ? 'arrowdown' : 'arrowup';
  return _react.default.createElement("th", (0, _extends2.default)({}, pprops, {
    className: oClassNames,
    scope: "col",
    style: style
  }), sortable ? _react.default.createElement("a", {
    onClick: function onClick(e) {
      e.preventDefault();

      if (onSort) {
        onSort();
      }
    },
    className: "slds-th__action slds-text-link--reset"
  }, _react.default.createElement("span", {
    className: "slds-assistive-text"
  }, "Sort "), _react.default.createElement("span", {
    className: "slds-truncate"
  }, children), _react.default.createElement(_Icon.Icon, {
    className: "slds-is-sortable__icon",
    textColor: "default",
    container: true,
    size: "x-small",
    category: "utility",
    icon: icon,
    style: {
      position: 'absolute'
    }
  }), _react.default.createElement("span", {
    className: "slds-assistive-text",
    "aria-live": "assertive",
    "aria-atomic": "true"
  })) : children);
};

exports.TableHeaderColumn = TableHeaderColumn;

var TableRowColumn = function TableRowColumn(props) {
  var _props$truncate = props.truncate,
      truncate = _props$truncate === void 0 ? true : _props$truncate,
      className = props.className,
      width = props.width,
      children = props.children,
      pprops = (0, _objectWithoutProperties2.default)(props, ["truncate", "className", "width", "children"]);
  var oClassNames = (0, _classnames2.default)(className, {
    'slds-truncate': truncate
  });
  var style = {};
  if (width !== undefined) style.width = width;
  if (!truncate) style.position = 'static';
  return _react.default.createElement("td", (0, _extends2.default)({
    role: "gridcell",
    style: style,
    className: oClassNames
  }, pprops), children);
};

exports.TableRowColumn = TableRowColumn;

var TableRowColumnActions = function TableRowColumnActions(props) {
  return _react.default.createElement(TableRowColumn, {
    className: "slds-cell-shrink",
    "data-label": "Actions",
    truncate: false,
    width: 50,
    style: {
      position: 'static'
    }
  }, props.children);
};

exports.TableRowColumnActions = TableRowColumnActions;

var Table =
/*#__PURE__*/
function (_Component3) {
  (0, _inherits2.default)(Table, _Component3);

  function Table() {
    (0, _classCallCheck2.default)(this, Table);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Table).apply(this, arguments));
  }

  (0, _createClass2.default)(Table, [{
    key: "onScroll",
    value: function onScroll() {
      var elements = document.getElementsByClassName('react-slds-dropdown-opened');
      if (elements.length) elements[0].childNodes[0].blur();
    }
  }, {
    key: "renderTableHeader",
    value: function renderTableHeader(base) {
      var sortable = this.props.sortable;
      return _react.default.cloneElement(base, {
        sortable: sortable
      });
    }
  }, {
    key: "renderTableBody",
    value: function renderTableBody(base) {
      return base;
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props2 = this.props,
          className = _this$props2.className,
          bordered = _this$props2.bordered,
          verticalBorders = _this$props2.verticalBorders,
          noRowHover = _this$props2.noRowHover,
          striped = _this$props2.striped,
          fixedLayout = _this$props2.fixedLayout,
          children = _this$props2.children,
          autoWidth = _this$props2.autoWidth,
          wrapperStyle = _this$props2.wrapperStyle,
          pprops = (0, _objectWithoutProperties2.default)(_this$props2, ["className", "bordered", "verticalBorders", "noRowHover", "striped", "fixedLayout", "children", "autoWidth", "wrapperStyle"]);
      delete pprops.sortable;
      var tableClassNames = (0, _classnames2.default)(className, 'slds-table slds-table--cell-buffer', {
        'slds-table--bordered': bordered,
        'slds-no-row-hover': noRowHover,
        'slds-table--striped': striped,
        'slds-table--fixed-layout': fixedLayout,
        'slds-table--col-bordered': verticalBorders
      });
      var wrapStyle = Object.assign({
        overflowY: 'hidden',
        overflowX: 'auto'
      }, wrapperStyle);
      var style = {};
      if (autoWidth) style.width = 'auto';
      var tBody;
      var tHead;

      _react.default.Children.forEach(children, function (child) {
        if (!_react.default.isValidElement(child)) return;

        if (child.type === TableHeader) {
          tHead = _this.renderTableHeader(child);
        } else if (child.type === TableBody) {
          tBody = _this.renderTableBody(child);
        }
      });

      return _react.default.createElement("div", null, _react.default.createElement("div", {
        style: wrapStyle,
        onScroll: this.onScroll.bind(this)
      }, _react.default.createElement("table", (0, _extends2.default)({
        className: tableClassNames,
        style: style
      }, pprops), tHead, tBody)));
    }
  }]);
  return Table;
}(_react.Component);

exports.Table = Table;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL1RhYmxlLnRzeCJdLCJuYW1lcyI6WyJUYWJsZUhlYWRlciIsInByb3BzIiwiY2hpbGRyZW4iLCJzb3J0YWJsZSIsImhhc0FjdGlvbnMiLCJhY3Rpb25zUG9zaXRpb24iLCJuZXh0Q2hpbGRyZW4iLCJjbGFzc05hbWUiLCJSZWFjdCIsIkNoaWxkcmVuIiwiZm9yRWFjaCIsImNoaWxkIiwiaW5kZXgiLCJjaGlsZFNvcnRhYmxlIiwicHVzaCIsImNsb25lRWxlbWVudCIsImtleSIsInNsaWNlIiwicmVuZGVyQmFzZUhlYWRlclJvdyIsIkNvbXBvbmVudCIsIlRhYmxlQm9keSIsIm1hcCIsImlubmVyQ2hpbGQiLCJpc1ZhbGlkRWxlbWVudCIsInRydW5jYXRlIiwicmVuZGVyUm93cyIsIlRhYmxlUm93Iiwic2VsZWN0ZWQiLCJzdHlsZSIsIk9iamVjdCIsImFzc2lnbiIsImJhY2tncm91bmRDb2xvciIsImJvcmRlckxlZnQiLCJUYWJsZUhlYWRlckNvbHVtbiIsInJlc2l6YWJsZSIsIndpZHRoIiwic29ydERpciIsIm9uU29ydCIsInNvcnRlZCIsImFsaWduIiwicHByb3BzIiwib0NsYXNzTmFtZXMiLCJtaW5XaWR0aCIsImljb24iLCJlIiwicHJldmVudERlZmF1bHQiLCJwb3NpdGlvbiIsIlRhYmxlUm93Q29sdW1uIiwidW5kZWZpbmVkIiwiVGFibGVSb3dDb2x1bW5BY3Rpb25zIiwiVGFibGUiLCJlbGVtZW50cyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImxlbmd0aCIsImNoaWxkTm9kZXMiLCJibHVyIiwiYmFzZSIsImJvcmRlcmVkIiwidmVydGljYWxCb3JkZXJzIiwibm9Sb3dIb3ZlciIsInN0cmlwZWQiLCJmaXhlZExheW91dCIsImF1dG9XaWR0aCIsIndyYXBwZXJTdHlsZSIsInRhYmxlQ2xhc3NOYW1lcyIsIndyYXBTdHlsZSIsIm92ZXJmbG93WSIsIm92ZXJmbG93WCIsInRCb2R5IiwidEhlYWQiLCJ0eXBlIiwicmVuZGVyVGFibGVIZWFkZXIiLCJyZW5kZXJUYWJsZUJvZHkiLCJvblNjcm9sbCIsImJpbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBUUE7O0FBRUE7O0lBUWFBLFc7Ozs7Ozs7Ozs7OzswQ0FDVztBQUFBLHdCQUM0QyxLQUFLQyxLQURqRDtBQUFBLFVBQ1pDLFFBRFksZUFDWkEsUUFEWTtBQUFBLFVBQ0ZDLFFBREUsZUFDRkEsUUFERTtBQUFBLFVBQ1FDLFVBRFIsZUFDUUEsVUFEUjtBQUFBLDhDQUNvQkMsZUFEcEI7QUFBQSxVQUNvQkEsZUFEcEIsc0NBQ3NDLENBRHRDO0FBRXBCLFVBQUlDLFlBQWlCLEdBQUcsRUFBeEI7QUFFQSxVQUFNTCxLQUFLLEdBQUc7QUFDWk0sUUFBQUEsU0FBUyxFQUFFO0FBREMsT0FBZDs7QUFJQUMscUJBQU1DLFFBQU4sQ0FBZUMsT0FBZixDQUF3QlIsUUFBRCxDQUFrQkQsS0FBbEIsQ0FBd0JDLFFBQS9DLEVBQXlELFVBQUNTLEtBQUQsRUFBUUMsS0FBUixFQUFrQjtBQUN6RSxZQUFNQyxhQUFhLEdBQUdGLEtBQUssQ0FBQ1YsS0FBTixDQUFZRSxRQUFsQztBQUNBRyxRQUFBQSxZQUFZLENBQUNRLElBQWIsQ0FDRU4sZUFBTU8sWUFBTixDQUFtQkosS0FBbkIsRUFBMEI7QUFDeEI7QUFDQUssVUFBQUEsR0FBRyxFQUFFSixLQUZtQjtBQUd4QlQsVUFBQUEsUUFBUSxFQUNOLE9BQU9VLGFBQVAsS0FBeUIsV0FBekIsR0FBdUNWLFFBQXZDLEdBQWtEVTtBQUo1QixTQUExQixDQURGO0FBUUQsT0FWRDs7QUFZQSxVQUFJVCxVQUFKLEVBQWdCO0FBQ2RFLFFBQUFBLFlBQVksOENBQ1BBLFlBQVksQ0FBQ1csS0FBYixDQUFtQixDQUFuQixFQUFzQlosZUFBdEIsQ0FETyxJQUVWLDZCQUFDLGlCQUFEO0FBQ0UsVUFBQSxRQUFRLEVBQUUsS0FEWjtBQUVFLFVBQUEsS0FBSyxFQUFFLEVBRlQ7QUFHRSxV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LEtBRkgsQ0FERixDQURGLENBREY7QUFVRDs7O0VBN0V3QmxELGdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7XG4gIENvbXBvbmVudCxcbiAgQ1NTUHJvcGVydGllcyxcbiAgVGhIVE1MQXR0cmlidXRlcyxcbiAgSFRNTEF0dHJpYnV0ZXMsXG4gIFRhYmxlSFRNTEF0dHJpYnV0ZXMsXG4gIFRkSFRNTEF0dHJpYnV0ZXMsXG59IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnLi9JY29uJztcblxuZXhwb3J0IHR5cGUgVGFibGVIZWFkZXJQcm9wcyA9IHtcbiAgaGFzQWN0aW9ucz86IGJvb2xlYW47XG4gIGFjdGlvbnNQb3NpdGlvbj86IG51bWJlcjtcbiAgc29ydGFibGU/OiBib29sZWFuO1xufTtcblxuZXhwb3J0IGNsYXNzIFRhYmxlSGVhZGVyIGV4dGVuZHMgQ29tcG9uZW50PFRhYmxlSGVhZGVyUHJvcHM+IHtcbiAgcmVuZGVyQmFzZUhlYWRlclJvdygpIHtcbiAgICBjb25zdCB7IGNoaWxkcmVuLCBzb3J0YWJsZSwgaGFzQWN0aW9ucywgYWN0aW9uc1Bvc2l0aW9uID0gMCB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgbmV4dENoaWxkcmVuOiBhbnkgPSBbXTtcblxuICAgIGNvbnN0IHByb3BzID0ge1xuICAgICAgY2xhc3NOYW1lOiAnc2xkcy10ZXh0LXRpdGxlLS1jYXBzJyxcbiAgICB9O1xuXG4gICAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaCgoY2hpbGRyZW4gYXMgYW55KS5wcm9wcy5jaGlsZHJlbiwgKGNoaWxkLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGRTb3J0YWJsZSA9IGNoaWxkLnByb3BzLnNvcnRhYmxlO1xuICAgICAgbmV4dENoaWxkcmVuLnB1c2goXG4gICAgICAgIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9uby1hcnJheS1pbmRleC1rZXlcbiAgICAgICAgICBrZXk6IGluZGV4LFxuICAgICAgICAgIHNvcnRhYmxlOlxuICAgICAgICAgICAgdHlwZW9mIGNoaWxkU29ydGFibGUgPT09ICd1bmRlZmluZWQnID8gc29ydGFibGUgOiBjaGlsZFNvcnRhYmxlLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGlmIChoYXNBY3Rpb25zKSB7XG4gICAgICBuZXh0Q2hpbGRyZW4gPSBbXG4gICAgICAgIC4uLm5leHRDaGlsZHJlbi5zbGljZSgwLCBhY3Rpb25zUG9zaXRpb24pLFxuICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW5cbiAgICAgICAgICBzb3J0YWJsZT17ZmFsc2V9XG4gICAgICAgICAgd2lkdGg9ezUwfVxuICAgICAgICAgIGtleT17LTF9XG4gICAgICAgICAgY2xhc3NOYW1lPSdzbGRzLWNlbGwtc2hyaW5rJ1xuICAgICAgICAvPixcbiAgICAgICAgLi4ubmV4dENoaWxkcmVuLnNsaWNlKGFjdGlvbnNQb3NpdGlvbiksXG4gICAgICBdO1xuICAgIH1cblxuICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGRyZW4gYXMgYW55LCBwcm9wcywgbmV4dENoaWxkcmVuKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gPHRoZWFkPnt0aGlzLnJlbmRlckJhc2VIZWFkZXJSb3coKX08L3RoZWFkPjtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGFibGVCb2R5IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyUm93cygpIHtcbiAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ubWFwKHRoaXMucHJvcHMuY2hpbGRyZW4sIChjaGlsZDogYW55KSA9PiB7XG4gICAgICBjb25zdCBjaGlsZHJlbjogYW55ID0gW107XG5cbiAgICAgIFJlYWN0LkNoaWxkcmVuLmZvckVhY2goY2hpbGQucHJvcHMuY2hpbGRyZW4sIChpbm5lckNoaWxkLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoIVJlYWN0LmlzVmFsaWRFbGVtZW50KGlubmVyQ2hpbGQpKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHsgdHJ1bmNhdGUgfSA9IGlubmVyQ2hpbGQucHJvcHMgYXMgYW55O1xuICAgICAgICBjb25zdCBwcm9wczogYW55ID0ge1xuICAgICAgICAgIGtleTogaW5kZXgsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0eXBlb2YgdHJ1bmNhdGUgIT09ICd1bmRlZmluZWQnKSBwcm9wcy50cnVuY2F0ZSA9IHRydW5jYXRlO1xuICAgICAgICBjaGlsZHJlbi5wdXNoKFJlYWN0LmNsb25lRWxlbWVudChpbm5lckNoaWxkLCBwcm9wcykpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoXG4gICAgICAgIGNoaWxkLFxuICAgICAgICB7IGNsYXNzTmFtZTogJ3NsZHMtaGludC1wYXJlbnQnIH0sXG4gICAgICAgIGNoaWxkcmVuXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiA8dGJvZHk+e3RoaXMucmVuZGVyUm93cygpfTwvdGJvZHk+O1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIFRhYmxlUm93UHJvcHMgPSB7XG4gIHNlbGVjdGVkPzogYm9vbGVhbjtcbiAgc3R5bGU/OiBvYmplY3Q7XG59ICYgSFRNTEF0dHJpYnV0ZXM8SFRNTFRhYmxlUm93RWxlbWVudD47XG5cbmV4cG9ydCBjb25zdCBUYWJsZVJvdzogUmVhY3QuRkM8VGFibGVSb3dQcm9wcz4gPSAoeyBzZWxlY3RlZCwgLi4ucHJvcHMgfSkgPT4ge1xuICBsZXQgeyBzdHlsZSB9ID0gcHJvcHM7XG5cbiAgaWYgKHNlbGVjdGVkKSB7XG4gICAgc3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZSwge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI0Y4RkNGNScsXG4gICAgICBib3JkZXJMZWZ0OiAnMnB4IHNvbGlkICM3ZGI0NTAnLFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8dHIgey4uLnByb3BzfSBzdHlsZT17c3R5bGV9PlxuICAgICAge3Byb3BzLmNoaWxkcmVufVxuICAgIDwvdHI+XG4gICk7XG59O1xuXG5leHBvcnQgdHlwZSBUYWJsZUhlYWRlckNvbHVtblByb3BzID0ge1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIHdpZHRoPzogc3RyaW5nIHwgbnVtYmVyO1xuICBzb3J0YWJsZT86IGJvb2xlYW47XG4gIHJlc2l6YWJsZT86IGJvb2xlYW47XG4gIHNvcnREaXI/OiBzdHJpbmc7XG4gIHNvcnRlZD86IGJvb2xlYW47XG4gIGFsaWduPzogJ2xlZnQnIHwgJ2NlbnRlcicgfCAncmlnaHQnO1xuICBvblNvcnQ/OiAoKSA9PiB2b2lkO1xufSAmIFRoSFRNTEF0dHJpYnV0ZXM8SFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnQ+O1xuXG5leHBvcnQgY29uc3QgVGFibGVIZWFkZXJDb2x1bW46IFJlYWN0LkZDPFRhYmxlSGVhZGVyQ29sdW1uUHJvcHM+ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBzb3J0YWJsZSxcbiAgICByZXNpemFibGUsXG4gICAgY2hpbGRyZW4sXG4gICAgY2xhc3NOYW1lLFxuICAgIHdpZHRoLFxuICAgIHNvcnREaXIsXG4gICAgb25Tb3J0LFxuICAgIHNvcnRlZCxcbiAgICBhbGlnbixcbiAgICAuLi5wcHJvcHNcbiAgfSA9IHByb3BzO1xuICBjb25zdCBvQ2xhc3NOYW1lcyA9IGNsYXNzbmFtZXMoXG4gICAgY2xhc3NOYW1lLFxuICAgICdzbGRzLXRleHQtdGl0bGUtLWNhcHMgc2xkcy10cnVuY2F0ZScsXG4gICAge1xuICAgICAgJ3NsZHMtaXMtc29ydGFibGUnOiBzb3J0YWJsZSxcbiAgICAgICdzbGRzLWlzLXJlc2l6YWJsZSc6IHJlc2l6YWJsZSxcbiAgICAgICdzbGRzLWlzLXNvcnRlZCc6IHNvcnRlZCxcbiAgICAgIFtgc2xkcy10ZXh0LWFsaWduLS0ke2FsaWdufWBdOiBhbGlnbixcbiAgICB9XG4gICk7XG5cbiAgY29uc3Qgc3R5bGUgPSB7IG1pbldpZHRoOiB3aWR0aCB8fCAnYXV0bycgfTtcblxuICBjb25zdCBpY29uID0gc29ydERpciA9PT0gJ0RFU0MnID8gJ2Fycm93ZG93bicgOiAnYXJyb3d1cCc7XG5cbiAgcmV0dXJuIChcbiAgICA8dGggey4uLnBwcm9wc30gY2xhc3NOYW1lPXtvQ2xhc3NOYW1lc30gc2NvcGU9J2NvbCcgc3R5bGU9e3N0eWxlfT5cbiAgICAgIHtzb3J0YWJsZSA/IChcbiAgICAgICAgPGFcbiAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKG9uU29ydCkge1xuICAgICAgICAgICAgICBvblNvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9fVxuICAgICAgICAgIGNsYXNzTmFtZT0nc2xkcy10aF9fYWN0aW9uIHNsZHMtdGV4dC1saW5rLS1yZXNldCdcbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nc2xkcy1hc3Npc3RpdmUtdGV4dCc+U29ydCA8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdzbGRzLXRydW5jYXRlJz57Y2hpbGRyZW59PC9zcGFuPlxuICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICBjbGFzc05hbWU9J3NsZHMtaXMtc29ydGFibGVfX2ljb24nXG4gICAgICAgICAgICB0ZXh0Q29sb3I9J2RlZmF1bHQnXG4gICAgICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgIHNpemU9J3gtc21hbGwnXG4gICAgICAgICAgICBjYXRlZ29yeT0ndXRpbGl0eSdcbiAgICAgICAgICAgIGljb249e2ljb259XG4gICAgICAgICAgICBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJyB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgIGNsYXNzTmFtZT0nc2xkcy1hc3Npc3RpdmUtdGV4dCdcbiAgICAgICAgICAgIGFyaWEtbGl2ZT0nYXNzZXJ0aXZlJ1xuICAgICAgICAgICAgYXJpYS1hdG9taWM9J3RydWUnXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9hPlxuICAgICAgKSA6IChcbiAgICAgICAgY2hpbGRyZW5cbiAgICAgICl9XG4gICAgPC90aD5cbiAgKTtcbn07XG5cbmV4cG9ydCB0eXBlIFRhYmxlUm93Q29sdW1uUHJvcHMgPSB7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgd2lkdGg/OiBzdHJpbmcgfCBudW1iZXI7XG4gIHRydW5jYXRlPzogYm9vbGVhbjtcbn0gJiBUZEhUTUxBdHRyaWJ1dGVzPEhUTUxUYWJsZURhdGFDZWxsRWxlbWVudD47XG5cbmV4cG9ydCBjb25zdCBUYWJsZVJvd0NvbHVtbjogUmVhY3QuRkM8VGFibGVSb3dDb2x1bW5Qcm9wcz4gPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyB0cnVuY2F0ZSA9IHRydWUsIGNsYXNzTmFtZSwgd2lkdGgsIGNoaWxkcmVuLCAuLi5wcHJvcHMgfSA9IHByb3BzO1xuICBjb25zdCBvQ2xhc3NOYW1lcyA9IGNsYXNzbmFtZXMoY2xhc3NOYW1lLCB7XG4gICAgJ3NsZHMtdHJ1bmNhdGUnOiB0cnVuY2F0ZSxcbiAgfSk7XG4gIGNvbnN0IHN0eWxlOiBDU1NQcm9wZXJ0aWVzID0ge307XG4gIGlmICh3aWR0aCAhPT0gdW5kZWZpbmVkKSBzdHlsZS53aWR0aCA9IHdpZHRoO1xuICBpZiAoIXRydW5jYXRlKSBzdHlsZS5wb3NpdGlvbiA9ICdzdGF0aWMnO1xuXG4gIHJldHVybiAoXG4gICAgPHRkIHJvbGU9J2dyaWRjZWxsJyBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT17b0NsYXNzTmFtZXN9IHsuLi5wcHJvcHN9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvdGQ+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgVGFibGVSb3dDb2x1bW5BY3Rpb25zOiBSZWFjdC5GQyA9IChwcm9wcykgPT4gKFxuICA8VGFibGVSb3dDb2x1bW5cbiAgICBjbGFzc05hbWU9J3NsZHMtY2VsbC1zaHJpbmsnXG4gICAgZGF0YS1sYWJlbD0nQWN0aW9ucydcbiAgICB0cnVuY2F0ZT17ZmFsc2V9XG4gICAgd2lkdGg9ezUwfVxuICAgIHN0eWxlPXt7IHBvc2l0aW9uOiAnc3RhdGljJyB9fVxuICA+XG4gICAge3Byb3BzLmNoaWxkcmVufVxuICA8L1RhYmxlUm93Q29sdW1uPlxuKTtcblxuZXhwb3J0IHR5cGUgVGFibGVQcm9wcyA9IHtcbiAgd3JhcHBlclN0eWxlPzogb2JqZWN0O1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGJvcmRlcmVkPzogYm9vbGVhbjtcbiAgdmVydGljYWxCb3JkZXJzPzogYm9vbGVhbjtcbiAgbm9Sb3dIb3Zlcj86IGJvb2xlYW47XG4gIHN0cmlwZWQ/OiBib29sZWFuO1xuICBmaXhlZExheW91dD86IGJvb2xlYW47XG4gIHNvcnRhYmxlPzogYm9vbGVhbjtcbiAgYXV0b1dpZHRoPzogYm9vbGVhbjtcbn0gJiBUYWJsZUhUTUxBdHRyaWJ1dGVzPEhUTUxUYWJsZUVsZW1lbnQ+O1xuXG5leHBvcnQgY2xhc3MgVGFibGUgZXh0ZW5kcyBDb21wb25lbnQ8VGFibGVQcm9wcz4ge1xuICBvblNjcm9sbCgpIHtcbiAgICBjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXG4gICAgICAncmVhY3Qtc2xkcy1kcm9wZG93bi1vcGVuZWQnXG4gICAgKTtcbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoKSAoZWxlbWVudHNbMF0uY2hpbGROb2Rlc1swXSBhcyBhbnkpLmJsdXIoKTtcbiAgfVxuXG4gIHJlbmRlclRhYmxlSGVhZGVyKGJhc2U6IGFueSkge1xuICAgIGNvbnN0IHsgc29ydGFibGUgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChiYXNlLCB7IHNvcnRhYmxlIH0pO1xuICB9XG5cbiAgcmVuZGVyVGFibGVCb2R5KGJhc2U6IGFueSkge1xuICAgIHJldHVybiBiYXNlO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIGJvcmRlcmVkLFxuICAgICAgdmVydGljYWxCb3JkZXJzLFxuICAgICAgbm9Sb3dIb3ZlcixcbiAgICAgIHN0cmlwZWQsXG4gICAgICBmaXhlZExheW91dCxcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgYXV0b1dpZHRoLFxuICAgICAgd3JhcHBlclN0eWxlLFxuICAgICAgLi4ucHByb3BzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgZGVsZXRlIHBwcm9wcy5zb3J0YWJsZTtcblxuICAgIGNvbnN0IHRhYmxlQ2xhc3NOYW1lcyA9IGNsYXNzbmFtZXMoXG4gICAgICBjbGFzc05hbWUsXG4gICAgICAnc2xkcy10YWJsZSBzbGRzLXRhYmxlLS1jZWxsLWJ1ZmZlcicsXG4gICAgICB7XG4gICAgICAgICdzbGRzLXRhYmxlLS1ib3JkZXJlZCc6IGJvcmRlcmVkLFxuICAgICAgICAnc2xkcy1uby1yb3ctaG92ZXInOiBub1Jvd0hvdmVyLFxuICAgICAgICAnc2xkcy10YWJsZS0tc3RyaXBlZCc6IHN0cmlwZWQsXG4gICAgICAgICdzbGRzLXRhYmxlLS1maXhlZC1sYXlvdXQnOiBmaXhlZExheW91dCxcbiAgICAgICAgJ3NsZHMtdGFibGUtLWNvbC1ib3JkZXJlZCc6IHZlcnRpY2FsQm9yZGVycyxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgY29uc3Qgd3JhcFN0eWxlID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHtcbiAgICAgICAgb3ZlcmZsb3dZOiAnaGlkZGVuJyxcbiAgICAgICAgb3ZlcmZsb3dYOiAnYXV0bycsXG4gICAgICB9LFxuICAgICAgd3JhcHBlclN0eWxlXG4gICAgKTtcblxuICAgIGNvbnN0IHN0eWxlOiBDU1NQcm9wZXJ0aWVzID0ge307XG4gICAgaWYgKGF1dG9XaWR0aCkgc3R5bGUud2lkdGggPSAnYXV0byc7XG5cbiAgICBsZXQgdEJvZHk7XG4gICAgbGV0IHRIZWFkO1xuXG4gICAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaChjaGlsZHJlbiwgKGNoaWxkKSA9PiB7XG4gICAgICBpZiAoIVJlYWN0LmlzVmFsaWRFbGVtZW50KGNoaWxkKSkgcmV0dXJuO1xuICAgICAgaWYgKGNoaWxkLnR5cGUgPT09IFRhYmxlSGVhZGVyKSB7XG4gICAgICAgIHRIZWFkID0gdGhpcy5yZW5kZXJUYWJsZUhlYWRlcihjaGlsZCk7XG4gICAgICB9IGVsc2UgaWYgKGNoaWxkLnR5cGUgPT09IFRhYmxlQm9keSkge1xuICAgICAgICB0Qm9keSA9IHRoaXMucmVuZGVyVGFibGVCb2R5KGNoaWxkKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt3cmFwU3R5bGV9IG9uU2Nyb2xsPXt0aGlzLm9uU2Nyb2xsLmJpbmQodGhpcyl9PlxuICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9e3RhYmxlQ2xhc3NOYW1lc30gc3R5bGU9e3N0eWxlfSB7Li4ucHByb3BzfT5cbiAgICAgICAgICAgIHt0SGVhZH1cbiAgICAgICAgICAgIHt0Qm9keX1cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==