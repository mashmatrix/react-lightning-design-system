"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaObject = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var MediaObject =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(MediaObject, _Component);

  function MediaObject() {
    (0, _classCallCheck2.default)(this, MediaObject);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MediaObject).apply(this, arguments));
  }

  (0, _createClass2.default)(MediaObject, [{
    key: "renderFigure",
    value: function renderFigure(figure, className) {
      if (!figure) return null;
      return _react.default.createElement("div", {
        className: (0, _classnames.default)('slds-media__figure', className)
      }, figure);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          figureLeft = _this$props.figureLeft,
          figureRight = _this$props.figureRight,
          figureCenter = _this$props.figureCenter,
          children = _this$props.children;
      var className = 'slds-media';
      return _react.default.createElement("div", {
        className: className
      }, this.renderFigure(figureCenter, 'slds-media__figure--stacked'), this.renderFigure(figureLeft), _react.default.createElement("div", {
        className: "slds-media__body"
      }, children), this.renderFigure(figureRight, 'slds-media__figure--reverse'));
    }
  }]);
  return MediaObject;
}(_react.Component);

exports.MediaObject = MediaObject;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL01lZGlhT2JqZWN0LnRzeCJdLCJuYW1lcyI6WyJNZWRpYU9iamVjdCIsImZpZ3VyZSIsImNsYXNzTmFtZSIsInByb3BzIiwiZmlndXJlTGVmdCIsImZpZ3VyZVJpZ2h0IiwiZmlndXJlQ2VudGVyIiwiY2hpbGRyZW4iLCJyZW5kZXJGaWd1cmUiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztJQVFhQSxXOzs7Ozs7Ozs7Ozs7aUNBQ0VDLE0sRUFBbUJDLFMsRUFBb0I7QUFDbEQsVUFBSSxDQUFDRCxNQUFMLEVBQWEsT0FBTyxJQUFQO0FBQ2IsYUFDRTtBQUFLLFFBQUEsU0FBUyxFQUFFLHlCQUFXLG9CQUFYLEVBQWlDQyxTQUFqQztBQUFoQixTQUNHRCxNQURILENBREY7QUFLRDs7OzZCQUVRO0FBQUEsd0JBQ3FELEtBQUtFLEtBRDFEO0FBQUEsVUFDQ0MsVUFERCxlQUNDQSxVQUREO0FBQUEsVUFDYUMsV0FEYixlQUNhQSxXQURiO0FBQUEsVUFDMEJDLFlBRDFCLGVBQzBCQSxZQUQxQjtBQUFBLFVBQ3dDQyxRQUR4QyxlQUN3Q0EsUUFEeEM7QUFFUCxVQUFNTCxTQUFTLEdBQUcsWUFBbEI7QUFDQSxhQUNFO0FBQUssUUFBQSxTQUFTLEVBQUVBO0FBQWhCLFNBQ0csS0FBS00sWUFBTCxDQUFrQkYsWUFBbEIsRUFBZ0MsNkJBQWhDLENBREgsRUFFRyxLQUFLRSxZQUFMLENBQWtCSixVQUFsQixDQUZILEVBR0U7QUFBSyxRQUFBLFNBQVMsRUFBQztBQUFmLFNBQW1DRyxRQUFuQyxDQUhGLEVBSUcsS0FBS0MsWUFBTCxDQUFrQkgsV0FBbEIsRUFBK0IsNkJBQS9CLENBSkgsQ0FERjtBQVFEOzs7RUFyQjhCSSxnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5leHBvcnQgdHlwZSBNZWRpYU9iamVjdFByb3BzID0ge1xuICBmaWd1cmVMZWZ0PzogUmVhY3ROb2RlO1xuICBmaWd1cmVSaWdodD86IFJlYWN0Tm9kZTtcbiAgZmlndXJlQ2VudGVyPzogUmVhY3ROb2RlO1xufTtcblxuZXhwb3J0IGNsYXNzIE1lZGlhT2JqZWN0IGV4dGVuZHMgQ29tcG9uZW50PE1lZGlhT2JqZWN0UHJvcHMsIHt9PiB7XG4gIHJlbmRlckZpZ3VyZShmaWd1cmU6IFJlYWN0Tm9kZSwgY2xhc3NOYW1lPzogc3RyaW5nKSB7XG4gICAgaWYgKCFmaWd1cmUpIHJldHVybiBudWxsO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnc2xkcy1tZWRpYV9fZmlndXJlJywgY2xhc3NOYW1lKX0+XG4gICAgICAgIHtmaWd1cmV9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgZmlndXJlTGVmdCwgZmlndXJlUmlnaHQsIGZpZ3VyZUNlbnRlciwgY2hpbGRyZW4gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gJ3NsZHMtbWVkaWEnO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgICAge3RoaXMucmVuZGVyRmlndXJlKGZpZ3VyZUNlbnRlciwgJ3NsZHMtbWVkaWFfX2ZpZ3VyZS0tc3RhY2tlZCcpfVxuICAgICAgICB7dGhpcy5yZW5kZXJGaWd1cmUoZmlndXJlTGVmdCl9XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzbGRzLW1lZGlhX19ib2R5Jz57Y2hpbGRyZW59PC9kaXY+XG4gICAgICAgIHt0aGlzLnJlbmRlckZpZ3VyZShmaWd1cmVSaWdodCwgJ3NsZHMtbWVkaWFfX2ZpZ3VyZS0tcmV2ZXJzZScpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19