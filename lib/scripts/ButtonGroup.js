"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonGroup = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _DropdownButton = require("./DropdownButton");

var ButtonGroup =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ButtonGroup, _Component);

  function ButtonGroup(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ButtonGroup);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ButtonGroup).call(this, props));
    _this.renderButton = _this.renderButton.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(ButtonGroup, [{
    key: "renderButton",
    value: function renderButton(button, index) {
      var cnt = _react.default.Children.count(this.props.children);

      if (button.type && (button.type === _DropdownButton.DropdownButton || button.type.isGroupable)) {
        return _react.default.cloneElement(button, {
          key: index,
          grouped: true,
          isFirstInGroup: index === 0,
          isLastInGroup: index === cnt - 1
        });
      }

      return button;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          children = _this$props.children,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["className", "children"]);
      var btnGrpClassNames = (0, _classnames.default)(className, 'slds-button-group');
      return _react.default.createElement("div", (0, _extends2.default)({
        className: btnGrpClassNames,
        role: "group"
      }, props), _react.Children.map(children, this.renderButton));
    }
  }]);
  return ButtonGroup;
}(_react.Component);

exports.ButtonGroup = ButtonGroup;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL0J1dHRvbkdyb3VwLnRzeCJdLCJuYW1lcyI6WyJCdXR0b25Hcm91cCIsInByb3BzIiwicmVuZGVyQnV0dG9uIiwiYmluZCIsImJ1dHRvbiIsImluZGV4IiwiY250IiwiUmVhY3QiLCJDaGlsZHJlbiIsImNvdW50IiwiY2hpbGRyZW4iLCJ0eXBlIiwiRHJvcGRvd25CdXR0b24iLCJpc0dyb3VwYWJsZSIsImNsb25lRWxlbWVudCIsImtleSIsImdyb3VwZWQiLCJpc0ZpcnN0SW5Hcm91cCIsImlzTGFzdEluR3JvdXAiLCJjbGFzc05hbWUiLCJidG5HcnBDbGFzc05hbWVzIiwibWFwIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7SUFNYUEsVzs7Ozs7QUFDWCx1QkFBWUMsS0FBWixFQUErQztBQUFBOztBQUFBO0FBQzdDLGlIQUFNQSxLQUFOO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQixNQUFLQSxZQUFMLENBQWtCQyxJQUFsQiw2Q0FBcEI7QUFGNkM7QUFHOUM7Ozs7aUNBRVlDLE0sRUFBYUMsSyxFQUFlO0FBQ3ZDLFVBQU1DLEdBQUcsR0FBR0MsZUFBTUMsUUFBTixDQUFlQyxLQUFmLENBQXFCLEtBQUtSLEtBQUwsQ0FBV1MsUUFBaEMsQ0FBWjs7QUFDQSxVQUNFTixNQUFNLENBQUNPLElBQVAsS0FDQ1AsTUFBTSxDQUFDTyxJQUFQLEtBQWdCQyw4QkFBaEIsSUFBa0NSLE1BQU0sQ0FBQ08sSUFBUCxDQUFZRSxXQUQvQyxDQURGLEVBR0U7QUFDQSxlQUFPTixlQUFNTyxZQUFOLENBQW1CVixNQUFuQixFQUEyQjtBQUNoQ1csVUFBQUEsR0FBRyxFQUFFVixLQUQyQjtBQUVoQ1csVUFBQUEsT0FBTyxFQUFFLElBRnVCO0FBR2hDQyxVQUFBQSxjQUFjLEVBQUVaLEtBQUssS0FBSyxDQUhNO0FBSWhDYSxVQUFBQSxhQUFhLEVBQUViLEtBQUssS0FBS0MsR0FBRyxHQUFHO0FBSkMsU0FBM0IsQ0FBUDtBQU1EOztBQUVELGFBQU9GLE1BQVA7QUFDRDs7OzZCQUVRO0FBQUEsd0JBQ21DLEtBQUtILEtBRHhDO0FBQUEsVUFDQ2tCLFNBREQsZUFDQ0EsU0FERDtBQUFBLFVBQ1lULFFBRFosZUFDWUEsUUFEWjtBQUFBLFVBQ3lCVCxLQUR6QjtBQUVQLFVBQU1tQixnQkFBZ0IsR0FBRyx5QkFBV0QsU0FBWCxFQUFzQixtQkFBdEIsQ0FBekI7QUFDQSxhQUNFO0FBQUssUUFBQSxTQUFTLEVBQUVDLGdCQUFoQjtBQUFrQyxRQUFBLElBQUksRUFBQztBQUF2QyxTQUFtRG5CLEtBQW5ELEdBQ0dPLGdCQUFTYSxHQUFULENBQWFYLFFBQWIsRUFBdUIsS0FBS1IsWUFBNUIsQ0FESCxDQURGO0FBS0Q7OztFQS9COEJvQixnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIENoaWxkcmVuIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBEcm9wZG93bkJ1dHRvbiB9IGZyb20gJy4vRHJvcGRvd25CdXR0b24nO1xuXG5leHBvcnQgdHlwZSBCdXR0b25Hcm91cFByb3BzID0ge1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY2xhc3MgQnV0dG9uR3JvdXAgZXh0ZW5kcyBDb21wb25lbnQ8QnV0dG9uR3JvdXBQcm9wcywge30+IHtcbiAgY29uc3RydWN0b3IocHJvcHM6IFJlYWRvbmx5PEJ1dHRvbkdyb3VwUHJvcHM+KSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMucmVuZGVyQnV0dG9uID0gdGhpcy5yZW5kZXJCdXR0b24uYmluZCh0aGlzKTtcbiAgfVxuXG4gIHJlbmRlckJ1dHRvbihidXR0b246IGFueSwgaW5kZXg6IG51bWJlcikge1xuICAgIGNvbnN0IGNudCA9IFJlYWN0LkNoaWxkcmVuLmNvdW50KHRoaXMucHJvcHMuY2hpbGRyZW4pO1xuICAgIGlmIChcbiAgICAgIGJ1dHRvbi50eXBlICYmXG4gICAgICAoYnV0dG9uLnR5cGUgPT09IERyb3Bkb3duQnV0dG9uIHx8IGJ1dHRvbi50eXBlLmlzR3JvdXBhYmxlKVxuICAgICkge1xuICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChidXR0b24sIHtcbiAgICAgICAga2V5OiBpbmRleCxcbiAgICAgICAgZ3JvdXBlZDogdHJ1ZSxcbiAgICAgICAgaXNGaXJzdEluR3JvdXA6IGluZGV4ID09PSAwLFxuICAgICAgICBpc0xhc3RJbkdyb3VwOiBpbmRleCA9PT0gY250IC0gMSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBidXR0b247XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjbGFzc05hbWUsIGNoaWxkcmVuLCAuLi5wcm9wcyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBidG5HcnBDbGFzc05hbWVzID0gY2xhc3NuYW1lcyhjbGFzc05hbWUsICdzbGRzLWJ1dHRvbi1ncm91cCcpO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YnRuR3JwQ2xhc3NOYW1lc30gcm9sZT0nZ3JvdXAnIHsuLi5wcm9wc30+XG4gICAgICAgIHtDaGlsZHJlbi5tYXAoY2hpbGRyZW4sIHRoaXMucmVuZGVyQnV0dG9uKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==