"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageHeader = exports.PageHeaderHeading = exports.PageHeaderHeadingTitle = exports.PageHeaderDetail = exports.PageHeaderDetailItem = exports.PageHeaderDetailLabel = exports.PageHeaderDetailBody = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _MediaObject = require("./MediaObject");

var _Text = require("./Text");

var _Grid = require("./Grid");

var _BreadCrumbs = require("./BreadCrumbs");

var PageHeaderDetailBody = function PageHeaderDetailBody(_ref) {
  var children = _ref.children,
      props = (0, _objectWithoutProperties2.default)(_ref, ["children"]);
  return typeof children === 'string' ? _react.default.createElement(_Text.Text, (0, _extends2.default)({
    category: "body",
    type: "regular",
    truncate: true
  }, props), children) : _react.default.createElement(_react.default.Fragment, null, children);
};

exports.PageHeaderDetailBody = PageHeaderDetailBody;

var PageHeaderDetailLabel = function PageHeaderDetailLabel(_ref2) {
  var children = _ref2.children,
      props = (0, _objectWithoutProperties2.default)(_ref2, ["children"]);
  return typeof children === 'string' ? _react.default.createElement(_Text.Text, (0, _extends2.default)({
    category: "title",
    truncate: true,
    className: "slds-m-bottom--xx-small"
  }, props), children) : _react.default.createElement(_react.default.Fragment, null, children);
};

exports.PageHeaderDetailLabel = PageHeaderDetailLabel;

var PageHeaderDetailItem = function PageHeaderDetailItem(props) {
  var children = props.children,
      label = props.label,
      pprops = (0, _objectWithoutProperties2.default)(props, ["children", "label"]);
  var manuallyAssembled = !label;
  return _react.default.createElement("li", (0, _extends2.default)({
    className: "slds-page-header__detail-block"
  }, pprops), !manuallyAssembled ? [_react.default.createElement(PageHeaderDetailLabel, {
    key: 0
  }, label), _react.default.createElement(PageHeaderDetailBody, {
    key: 1
  }, children)] : [children]);
};

exports.PageHeaderDetailItem = PageHeaderDetailItem;

var PageHeaderDetail = function PageHeaderDetail(_ref3) {
  var children = _ref3.children,
      props = (0, _objectWithoutProperties2.default)(_ref3, ["children"]);
  return _react.default.createElement(_Grid.Grid, (0, _extends2.default)({
    tag: "ul",
    vertical: false,
    className: "slds-page-header__detail-row"
  }, props), children);
};

exports.PageHeaderDetail = PageHeaderDetail;

var PageHeaderHeadingTitle = function PageHeaderHeadingTitle(props) {
  var className = props.className,
      children = props.children;
  var titleClassNames = (0, _classnames.default)(className, 'slds-page-header__title slds-truncate slds-align-middle');
  return _react.default.createElement("h1", (0, _extends2.default)({}, props, {
    className: titleClassNames
  }), children);
};

exports.PageHeaderHeadingTitle = PageHeaderHeadingTitle;

var PageHeaderHeading =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PageHeaderHeading, _Component);

  function PageHeaderHeading() {
    (0, _classCallCheck2.default)(this, PageHeaderHeading);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PageHeaderHeading).apply(this, arguments));
  }

  (0, _createClass2.default)(PageHeaderHeading, [{
    key: "renderInfo",
    value: function renderInfo(info) {
      return info ? _react.default.createElement(_Text.Text, {
        category: "body",
        type: "small"
      }, info) : null;
    }
  }, {
    key: "renderWithMedia",
    value: function renderWithMedia(figure) {
      var content = this.renderContent();
      return figure ? _react.default.createElement(_MediaObject.MediaObject, {
        figureLeft: figure
      }, content) : content;
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this$props = this.props,
          rightActions = _this$props.rightActions,
          info = _this$props.info,
          legend = _this$props.legend,
          title = _this$props.title,
          breadCrumbs = _this$props.breadCrumbs,
          leftActions = _this$props.leftActions;
      var infoPart = info && !breadCrumbs && !legend && !rightActions ? this.renderInfo(info) : null;
      var titlePart = typeof title === 'string' ? _react.default.createElement(PageHeaderHeadingTitle, {
        className: "slds-m-right--small"
      }, title) : title;
      var breadCrumbsPart = null;

      if (breadCrumbs) {
        breadCrumbsPart = breadCrumbs.length && breadCrumbs[0].type === _BreadCrumbs.Crumb ? _react.default.createElement(_BreadCrumbs.BreadCrumbs, null, breadCrumbs) : breadCrumbs;
      }

      return _react.default.createElement("div", null, breadCrumbsPart, legend ? _react.default.createElement(_Text.Text, {
        category: "title",
        type: "caps",
        className: "slds-line-height--reset"
      }, legend) : null, leftActions ? _react.default.createElement(_Grid.Grid, {
        vertical: false
      }, titlePart, _react.default.createElement(_Grid.Col, {
        className: "slds-shrink-none"
      }, leftActions)) : titlePart, infoPart);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          rightActions = _this$props2.rightActions,
          info = _this$props2.info,
          breadCrumbs = _this$props2.breadCrumbs,
          figure = _this$props2.figure,
          legend = _this$props2.legend;
      var content = this.renderWithMedia(figure);
      var infoPart = info && (breadCrumbs || legend || rightActions) ? this.renderInfo(info) : null;
      return rightActions ? _react.default.createElement("div", null, _react.default.createElement(_Grid.Grid, {
        vertical: false
      }, _react.default.createElement(_Grid.Col, {
        className: "slds-has-flexi-truncate"
      }, content), _react.default.createElement(_Grid.Col, {
        align: "top",
        noFlex: true
      }, _react.default.createElement(_Grid.Grid, null, _react.default.createElement(_Grid.Row, {
        cols: 1
      }, rightActions)))), infoPart) : _react.default.createElement("div", null, content, infoPart);
    }
  }]);
  return PageHeaderHeading;
}(_react.Component);

exports.PageHeaderHeading = PageHeaderHeading;

var PageHeader = function PageHeader(props) {
  return _react.default.createElement("div", (0, _extends2.default)({
    className: "slds-page-header",
    role: "banner"
  }, props), props.children);
};

exports.PageHeader = PageHeader;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL1BhZ2VIZWFkZXIudHN4Il0sIm5hbWVzIjpbIlBhZ2VIZWFkZXJEZXRhaWxCb2R5IiwiY2hpbGRyZW4iLCJwcm9wcyIsIlBhZ2VIZWFkZXJEZXRhaWxMYWJlbCIsIlBhZ2VIZWFkZXJEZXRhaWxJdGVtIiwibGFiZWwiLCJwcHJvcHMiLCJtYW51YWxseUFzc2VtYmxlZCIsIlBhZ2VIZWFkZXJEZXRhaWwiLCJQYWdlSGVhZGVySGVhZGluZ1RpdGxlIiwiY2xhc3NOYW1lIiwidGl0bGVDbGFzc05hbWVzIiwiUGFnZUhlYWRlckhlYWRpbmciLCJpbmZvIiwiZmlndXJlIiwiY29udGVudCIsInJlbmRlckNvbnRlbnQiLCJyaWdodEFjdGlvbnMiLCJsZWdlbmQiLCJ0aXRsZSIsImJyZWFkQ3J1bWJzIiwibGVmdEFjdGlvbnMiLCJpbmZvUGFydCIsInJlbmRlckluZm8iLCJ0aXRsZVBhcnQiLCJicmVhZENydW1ic1BhcnQiLCJsZW5ndGgiLCJ0eXBlIiwiQ3J1bWIiLCJyZW5kZXJXaXRoTWVkaWEiLCJDb21wb25lbnQiLCJQYWdlSGVhZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBSU8sSUFBTUEsb0JBQXlELEdBQUcsU0FBNURBLG9CQUE0RDtBQUFBLE1BQ3ZFQyxRQUR1RSxRQUN2RUEsUUFEdUU7QUFBQSxNQUVwRUMsS0FGb0U7QUFBQSxTQUl2RSxPQUFPRCxRQUFQLEtBQW9CLFFBQXBCLEdBQ0UsNkJBQUMsVUFBRDtBQUFNLElBQUEsUUFBUSxFQUFDLE1BQWY7QUFBc0IsSUFBQSxJQUFJLEVBQUMsU0FBM0I7QUFBcUMsSUFBQSxRQUFRO0FBQTdDLEtBQWtEQyxLQUFsRCxHQUNHRCxRQURILENBREYsR0FLRSw0REFBR0EsUUFBSCxDQVRxRTtBQUFBLENBQWxFOzs7O0FBY0EsSUFBTUUscUJBQTJELEdBQUcsU0FBOURBLHFCQUE4RDtB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LFlBQTlCLENBQUosR0FDSSxLQUFLTSxVQUFMLENBQWdCVixJQUFoQixDQURKLEdBRUksSUFITjtBQUtBLGFBQU9JLFlBQVksR0FDakIsMENBQ0UsNkJBQUMsVUFBRDtBQUFNLFFBQUEsUUFBUSxFQUFFO0FBQWhCLFNBQ0UsNkJBQUMsU0FBRDtBQUFLLFFBQUEsU0FBUyxFQUFDO0FBQWYsU0FBMENGLE9BQTFDLENBREYsRUFFRSw2QkFBQyxTQUFEO0FBQUssUUFBQSxLQUFLLEVBQUMsS0FBWDtBQUFpQixRQUFBLE1BQU07QUFBdkIsU0FDRSw2QkFBQyxVQUFELFFBQ0UsNkJBQUMsU0FBRDtBQUFLLFFBQUEsSUFBSSxFQUFFO0FBQVgsU0FBZUUsWUFBZixDQURGLENBREYsQ0FGRixDQURGLEVBU0dLLFFBVEgsQ0FEaUIsR0FhakIsMENBQ0dQLE9BREgsRUFFR08sUUFGSCxDQWJGO0FBa0JEOzs7RUFyR29DUSxnQjs7OztBQTBHaEMsSUFBTUMsVUFBcUMsR0FBRyxTQUF4Q0EsVUFBd0MsQ0FBQzdCLEtBQUQ7QUFBQSxTQUNuRDtBQUFLLElBQUEsU0FBUyxFQUFDLGtCQUFmO0FBQWtDLElBQUEsSUFBSSxFQUFDO0FBQXZDLEtBQW9EQSxLQUFwRCxHQUNHQSxLQUFLLENBQUNELFFBRFQsQ0FEbUQ7QUFBQSxDQUE5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IHsgTWVkaWFPYmplY3QgfSBmcm9tICcuL01lZGlhT2JqZWN0JztcbmltcG9ydCB7IFRleHQsIFRleHRQcm9wcyB9IGZyb20gJy4vVGV4dCc7XG5pbXBvcnQgeyBHcmlkLCBSb3csIENvbCwgR3JpZFByb3BzIH0gZnJvbSAnLi9HcmlkJztcbmltcG9ydCB7IEJyZWFkQ3J1bWJzLCBDcnVtYiB9IGZyb20gJy4vQnJlYWRDcnVtYnMnO1xuXG5leHBvcnQgdHlwZSBQYWdlSGVhZGVyRGV0YWlsQm9keVByb3BzID0gVGV4dFByb3BzO1xuXG5leHBvcnQgY29uc3QgUGFnZUhlYWRlckRldGFpbEJvZHk6IFJlYWN0LkZDPFBhZ2VIZWFkZXJEZXRhaWxCb2R5UHJvcHM+ID0gKHtcbiAgY2hpbGRyZW4sXG4gIC4uLnByb3BzXG59KSA9PlxuICB0eXBlb2YgY2hpbGRyZW4gPT09ICdzdHJpbmcnID8gKFxuICAgIDxUZXh0IGNhdGVnb3J5PSdib2R5JyB0eXBlPSdyZWd1bGFyJyB0cnVuY2F0ZSB7Li4ucHJvcHN9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvVGV4dD5cbiAgKSA6IChcbiAgICA8PntjaGlsZHJlbn08Lz5cbiAgKTtcblxuZXhwb3J0IHR5cGUgUGFnZUhlYWRlckRldGFpbExhYmVsUHJvcHMgPSBUZXh0UHJvcHM7XG5cbmV4cG9ydCBjb25zdCBQYWdlSGVhZGVyRGV0YWlsTGFiZWw6IFJlYWN0LkZDPFBhZ2VIZWFkZXJEZXRhaWxMYWJlbFByb3BzPiA9ICh7XG4gIGNoaWxkcmVuLFxuICAuLi5wcm9wc1xufSkgPT5cbiAgdHlwZW9mIGNoaWxkcmVuID09PSAnc3RyaW5nJyA/IChcbiAgICA8VGV4dFxuICAgICAgY2F0ZWdvcnk9J3RpdGxlJ1xuICAgICAgdHJ1bmNhdGVcbiAgICAgIGNsYXNzTmFtZT0nc2xkcy1tLWJvdHRvbS0teHgtc21hbGwnXG4gICAgICB7Li4ucHJvcHN9XG4gICAgPlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvVGV4dD5cbiAgKSA6IChcbiAgICA8PntjaGlsZHJlbn08Lz5cbiAgKTtcblxuZXhwb3J0IHR5cGUgUGFnZUhlYWRlckRldGFpbEl0ZW1Qcm9wcyA9IHtcbiAgbGFiZWw/OiBzdHJpbmc7XG59ICYgUmVhY3QuTGlIVE1MQXR0cmlidXRlczxIVE1MTElFbGVtZW50PjtcblxuZXhwb3J0IGNvbnN0IFBhZ2VIZWFkZXJEZXRhaWxJdGVtOiBSZWFjdC5GQzxQYWdlSGVhZGVyRGV0YWlsSXRlbVByb3BzPiA9IChcbiAgcHJvcHNcbikgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBsYWJlbCwgLi4ucHByb3BzIH0gPSBwcm9wcztcbiAgY29uc3QgbWFudWFsbHlBc3NlbWJsZWQgPSAhbGFiZWw7XG4gIHJldHVybiAoXG4gICAgPGxpIGNsYXNzTmFtZT0nc2xkcy1wYWdlLWhlYWRlcl9fZGV0YWlsLWJsb2NrJyB7Li4ucHByb3BzfT5cbiAgICAgIHshbWFudWFsbHlBc3NlbWJsZWRcbiAgICAgICAgPyBbXG4gICAgICAgICAgICA8UGFnZUhlYWRlckRldGFpbExhYmVsIGtleT17MH0+e2xhYmVsfTwvUGFnZUhlYWRlckRldGFpbExhYmVsPixcbiAgICAgICAgICAgIDxQYWdlSGVhZGVyRGV0YWlsQm9keSBrZXk9ezF9PntjaGlsZHJlbn08L1BhZ2VIZWFkZXJEZXRhaWxCb2R5PixcbiAgICAgICAgICBdXG4gICAgICAgIDogW2NoaWxkcmVuXX1cbiAgICA8L2xpPlxuICApO1xufTtcblxuZXhwb3J0IHR5cGUgUGFnZUhlYWRlckRldGFpbFByb3BzID0gR3JpZFByb3BzO1xuXG5leHBvcnQgY29uc3QgUGFnZUhlYWRlckRldGFpbDogUmVhY3QuRkM8R3JpZFByb3BzPiA9ICh7XG4gIGNoaWxkcmVuLFxuICAuLi5wcm9wc1xufSkgPT4gKFxuICA8R3JpZFxuICAgIHRhZz0ndWwnXG4gICAgdmVydGljYWw9e2ZhbHNlfVxuICAgIGNsYXNzTmFtZT0nc2xkcy1wYWdlLWhlYWRlcl9fZGV0YWlsLXJvdydcbiAgICB7Li4ucHJvcHN9XG4gID5cbiAgICB7Y2hpbGRyZW59XG4gIDwvR3JpZD5cbik7XG5cbmV4cG9ydCB0eXBlIFBhZ2VIZWFkZXJIZWFkaW5nVGl0bGVQcm9wcyA9IHtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xufSAmIFJlYWN0LkhUTUxBdHRyaWJ1dGVzPEhUTUxIZWFkaW5nRWxlbWVudD47XG5cbmV4cG9ydCBjb25zdCBQYWdlSGVhZGVySGVhZGluZ1RpdGxlOiBSZWFjdC5GQzxQYWdlSGVhZGVySGVhZGluZ1RpdGxlUHJvcHM+ID0gKFxuICBwcm9wc1xuKSA9PiB7XG4gIGNvbnN0IHsgY2xhc3NOYW1lLCBjaGlsZHJlbiB9ID0gcHJvcHM7XG4gIGNvbnN0IHRpdGxlQ2xhc3NOYW1lcyA9IGNsYXNzTmFtZXMoXG4gICAgY2xhc3NOYW1lLFxuICAgICdzbGRzLXBhZ2UtaGVhZGVyX190aXRsZSBzbGRzLXRydW5jYXRlIHNsZHMtYWxpZ24tbWlkZGxlJ1xuICApO1xuICByZXR1cm4gKFxuICAgIDxoMSB7Li4ucHJvcHN9IGNsYXNzTmFtZT17dGl0bGVDbGFzc05hbWVzfT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2gxPlxuICApO1xufTtcblxuZXhwb3J0IHR5cGUgUGFnZUhlYWRlckhlYWRpbmdQcm9wcyA9IHtcbiAgaW5mbz86IHN0cmluZztcbiAgbGVnZW5kPzogc3RyaW5nO1xuICB0aXRsZT86IHN0cmluZyB8IEpTWC5FbGVtZW50O1xuICBicmVhZENydW1icz86IEFycmF5PEpTWC5FbGVtZW50PjtcbiAgbGVmdEFjdGlvbnM/OiBKU1guRWxlbWVudDtcbiAgZmlndXJlPzogSlNYLkVsZW1lbnQ7XG4gIHJpZ2h0QWN0aW9ucz86IEpTWC5FbGVtZW50IHwgQXJyYXk8SlNYLkVsZW1lbnQ+O1xufTtcblxuZXhwb3J0IGNsYXNzIFBhZ2VIZWFkZXJIZWFkaW5nIGV4dGVuZHMgQ29tcG9uZW50PFBhZ2VIZWFkZXJIZWFkaW5nUHJvcHM+IHtcbiAgcmVuZGVySW5mbyhpbmZvOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gaW5mbyA/IChcbiAgICAgIDxUZXh0IGNhdGVnb3J5PSdib2R5JyB0eXBlPSdzbWFsbCc+XG4gICAgICAgIHtpbmZvfVxuICAgICAgPC9UZXh0PlxuICAgICkgOiBudWxsO1xuICB9XG5cbiAgcmVuZGVyV2l0aE1lZGlhKGZpZ3VyZTogSlNYLkVsZW1lbnQgfCB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5yZW5kZXJDb250ZW50KCk7XG4gICAgcmV0dXJuIGZpZ3VyZSA/IChcbiAgICAgIDxNZWRpYU9iamVjdCBmaWd1cmVMZWZ0PXtmaWd1cmV9Pntjb250ZW50fTwvTWVkaWFPYmplY3Q+XG4gICAgKSA6IChcbiAgICAgIGNvbnRlbnRcbiAgICApO1xuICB9XG5cbiAgcmVuZGVyQ29udGVudCgpIHtcbiAgICBjb25zdCB7XG4gICAgICByaWdodEFjdGlvbnMsXG4gICAgICBpbmZvLFxuICAgICAgbGVnZW5kLFxuICAgICAgdGl0bGUsXG4gICAgICBicmVhZENydW1icyxcbiAgICAgIGxlZnRBY3Rpb25zLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGluZm9QYXJ0ID1cbiAgICAgIGluZm8gJiYgIWJyZWFkQ3J1bWJzICYmICFsZWdlbmQgJiYgIXJpZ2h0QWN0aW9uc1xuICAgICAgICA/IHRoaXMucmVuZGVySW5mbyhpbmZvKVxuICAgICAgICA6IG51bGw7XG4gICAgY29uc3QgdGl0bGVQYXJ0ID1cbiAgICAgIHR5cGVvZiB0aXRsZSA9PT0gJ3N0cmluZycgPyAoXG4gICAgICAgIDxQYWdlSGVhZGVySGVhZGluZ1RpdGxlIGNsYXNzTmFtZT0nc2xkcy1tLXJpZ2h0LS1zbWFsbCc+XG4gICAgICAgICAge3RpdGxlfVxuICAgICAgICA8L1BhZ2VIZWFkZXJIZWFkaW5nVGl0bGU+XG4gICAgICApIDogKFxuICAgICAgICB0aXRsZVxuICAgICAgKTtcblxuICAgIGxldCBicmVhZENydW1ic1BhcnQgPSBudWxsO1xuICAgIGlmIChicmVhZENydW1icykge1xuICAgICAgYnJlYWRDcnVtYnNQYXJ0ID1cbiAgICAgICAgYnJlYWRDcnVtYnMubGVuZ3RoICYmIGJyZWFkQ3J1bWJzWzBdLnR5cGUgPT09IENydW1iID8gKFxuICAgICAgICAgIDxCcmVhZENydW1icz57YnJlYWRDcnVtYnN9PC9CcmVhZENydW1icz5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICBicmVhZENydW1ic1xuICAgICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7YnJlYWRDcnVtYnNQYXJ0fVxuICAgICAgICB7bGVnZW5kID8gKFxuICAgICAgICAgIDxUZXh0XG4gICAgICAgICAgICBjYXRlZ29yeT0ndGl0bGUnXG4gICAgICAgICAgICB0eXBlPSdjYXBzJ1xuICAgICAgICAgICAgY2xhc3NOYW1lPSdzbGRzLWxpbmUtaGVpZ2h0LS1yZXNldCdcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bGVnZW5kfVxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHtsZWZ0QWN0aW9ucyA/IChcbiAgICAgICAgICA8R3JpZCB2ZXJ0aWNhbD17ZmFsc2V9PlxuICAgICAgICAgICAge3RpdGxlUGFydH1cbiAgICAgICAgICAgIDxDb2wgY2xhc3NOYW1lPSdzbGRzLXNocmluay1ub25lJz57bGVmdEFjdGlvbnN9PC9Db2w+XG4gICAgICAgICAgPC9HcmlkPlxuICAgICAgICApIDogKFxuICAgICAgICAgIHRpdGxlUGFydFxuICAgICAgICApfVxuICAgICAgICB7aW5mb1BhcnR9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcmlnaHRBY3Rpb25zLCBpbmZvLCBicmVhZENydW1icywgZmlndXJlLCBsZWdlbmQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY29udGVudCA9IHRoaXMucmVuZGVyV2l0aE1lZGlhKGZpZ3VyZSk7XG4gICAgY29uc3QgaW5mb1BhcnQgPVxuICAgICAgaW5mbyAmJiAoYnJlYWRDcnVtYnMgfHwgbGVnZW5kIHx8IHJpZ2h0QWN0aW9ucylcbiAgICAgICAgPyB0aGlzLnJlbmRlckluZm8oaW5mbylcbiAgICAgICAgOiBudWxsO1xuXG4gICAgcmV0dXJuIHJpZ2h0QWN0aW9ucyA/IChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxHcmlkIHZlcnRpY2FsPXtmYWxzZX0+XG4gICAgICAgICAgPENvbCBjbGFzc05hbWU9J3NsZHMtaGFzLWZsZXhpLXRydW5jYXRlJz57Y29udGVudH08L0NvbD5cbiAgICAgICAgICA8Q29sIGFsaWduPSd0b3AnIG5vRmxleD5cbiAgICAgICAgICAgIDxHcmlkPlxuICAgICAgICAgICAgICA8Um93IGNvbHM9ezF9PntyaWdodEFjdGlvbnN9PC9Sb3c+XG4gICAgICAgICAgICA8L0dyaWQ+XG4gICAgICAgICAgPC9Db2w+XG4gICAgICAgIDwvR3JpZD5cbiAgICAgICAge2luZm9QYXJ0fVxuICAgICAgPC9kaXY+XG4gICAgKSA6IChcbiAgICAgIDxkaXY+XG4gICAgICAgIHtjb250ZW50fVxuICAgICAgICB7aW5mb1BhcnR9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIFBhZ2VIZWFkZXJQcm9wcyA9IFJlYWN0LkhUTUxBdHRyaWJ1dGVzPEhUTUxEaXZFbGVtZW50PjtcblxuZXhwb3J0IGNvbnN0IFBhZ2VIZWFkZXI6IFJlYWN0LkZDPFBhZ2VIZWFkZXJQcm9wcz4gPSAocHJvcHMpID0+IChcbiAgPGRpdiBjbGFzc05hbWU9J3NsZHMtcGFnZS1oZWFkZXInIHJvbGU9J2Jhbm5lcicgey4uLnByb3BzfT5cbiAgICB7cHJvcHMuY2hpbGRyZW59XG4gIDwvZGl2PlxuKTtcbiJdfQ==