"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toggle = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _FormElement = require("./FormElement");

var Toggle =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Toggle, _Component);

  function Toggle() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Toggle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Toggle)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "node", null);
    return _this;
  }

  (0, _createClass2.default)(Toggle, [{
    key: "renderToggle",
    value: function renderToggle(_ref) {
      var className = _ref.className,
          label = _ref.label,
          props = (0, _objectWithoutProperties2.default)(_ref, ["className", "label"]);
      var toggleClassNames = (0, _classnames.default)(className, 'slds-checkbox--toggle slds-grid');
      return _react.default.createElement("label", {
        className: toggleClassNames
      }, _react.default.createElement("span", {
        className: "slds-form-element__label slds-m-bottom--none"
      }, label), _react.default.createElement("input", (0, _extends2.default)({
        name: "checkbox",
        type: "checkbox",
        "aria-describedby": "toggle-desc"
      }, props)), _react.default.createElement("span", {
        className: "slds-checkbox--faux_container",
        "aria-live": "assertive"
      }, _react.default.createElement("span", {
        className: "slds-checkbox--faux"
      }), _react.default.createElement("span", {
        className: "slds-checkbox--on"
      }, "Enabled"), _react.default.createElement("span", {
        className: "slds-checkbox--off"
      }, "Disabled")));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          required = _this$props.required,
          error = _this$props.error,
          totalCols = _this$props.totalCols,
          cols = _this$props.cols,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["required", "error", "totalCols", "cols"]);
      var formElemProps = {
        required: required,
        error: error,
        totalCols: totalCols,
        cols: cols
      };
      return _react.default.createElement(_FormElement.FormElement, (0, _extends2.default)({
        formElementRef: function formElementRef(node) {
          return _this2.node = node;
        }
      }, formElemProps), this.renderToggle(props));
    }
  }]);
  return Toggle;
}(_react.Component);

exports.Toggle = Toggle;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL1RvZ2dsZS50c3giXSwibmFtZXMiOlsiVG9nZ2xlIiwiY2xhc3NOYW1lIiwibGFiZWwiLCJwcm9wcyIsInRvZ2dsZUNsYXNzTmFtZXMiLCJyZXF1aXJlZCIsImVycm9yIiwidG90YWxDb2xzIiwiY29scyIsImZvcm1FbGVtUHJvcHMiLCJub2RlIiwicmVuZGVyVG9nZ2xlIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztJQWVhQSxNOzs7Ozs7Ozs7Ozs7Ozs7Ozt1RkFDbUIsSTs7Ozs7O3VDQUU0QjtBQUFBLFVBQTNDQyxTQUEyQyxRQUEzQ0EsU0FBMkM7QUFBQSxVQUFoQ0MsS0FBZ0MsUUFBaENBLEtBQWdDO0FBQUEsVUFBdEJDLEtBQXNCO0FBQ3hELFVBQU1DLGdCQUFnQixHQUFHLHlCQUN2QkgsU0FEdUIsRUFFdkIsaUNBRnVCLENBQXpCO0FBSUEsYUFDRTtBQUFPLFFBQUEsU0FBUyxFQUFFRztBQUFsQixTQUNFO0FBQU0sUUFBQSxTQUFTLEVBQUM7QUFBaEIsU0FDR0YsS0FESCxDQURGLEVBSUU7QUFDRSxRQUFBLElBQUksRUFBQyxVQURQO0FBRUUsUUFBQSxJQUFJLEVBQUMsVUFGUDtBQUdFLDRCQUFpQjtBQUhuQixTQUlNQyxLQUpOLEVBSkYsRUFVRTtBQUFNLFFBQUEsU0FBUyxFQUFDLCtCQUFoQjtBQUFnRCxxQkFBVTtBQUExRCxTQUNFO0FBQU0sUUFBQSxTQUFTLEVBQUM7QUFBaEIsUUFERixFQUVFO0FBQU0sUUFBQSxTQUFTLEVBQUM7QUFBaEIsbUJBRkYsRUFHRTtBQUFNLFFBQUEsU0FBUyxFQUFDO0FBQWhCLG9CQUhGLENBVkYsQ0FERjtBQWtCRDs7OzZCQUVRO0FBQUE7O0FBQUEsd0JBQ2dELEtBQUtBLEtBRHJEO0FBQUEsVUFDQ0UsUUFERCxlQUNDQSxRQUREO0FBQUEsVUFDV0MsS0FEWCxlQUNXQSxLQURYO0FBQUEsVUFDa0JDLFNBRGxCLGVBQ2tCQSxTQURsQjtBQUFBLFVBQzZCQyxJQUQ3QixlQUM2QkEsSUFEN0I7QUFBQSxVQUNzQ0wsS0FEdEM7QUFFUCxVQUFNTSxhQUFhLEdBQUc7QUFBRUosUUFBQUEsUUFBUSxFQUFSQSxRQUFGO0FBQVlDLFFBQUFBLEtBQUssRUFBTEEsS0FBWjtBQUFtQkMsUUFBQUEsU0FBUyxFQUFUQSxTQUFuQjtBQUE4QkMsUUFBQUEsSUFBSSxFQUFKQTtBQUE5QixPQUF0QjtBQUNBLGFBQ0UsNkJBQUMsd0JBQUQ7QUFDRSxRQUFBLGNBQWMsRUFBRSx3QkFBQ0UsSUFBRDtBQUFBLGlCQUFXLE1BQUksQ0FBQ0EsSUFBTCxHQUFZQSxJQUF2QjtBQUFBO0FBRGxCLFNBRU1ELGFBRk4sR0FJRyxLQUFLRSxZQUFMLENBQWtCUixLQUFsQixDQUpILENBREY7QUFRRDs7O0VBdkN5QlMsZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBJbnB1dEhUTUxBdHRyaWJ1dGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBGb3JtRWxlbWVudCwgRm9ybUVsZW1lbnRQcm9wcyB9IGZyb20gJy4vRm9ybUVsZW1lbnQnO1xuXG5leHBvcnQgdHlwZSBUb2dnbGVQcm9wcyA9IHtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBsYWJlbD86IHN0cmluZztcbiAgcmVxdWlyZWQ/OiBib29sZWFuO1xuICBlcnJvcj86IEZvcm1FbGVtZW50UHJvcHNbJ2Vycm9yJ107XG4gIHRvdGFsQ29scz86IG51bWJlcjtcbiAgY29scz86IG51bWJlcjtcbiAgbmFtZT86IHN0cmluZztcbiAgdmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XG4gIGNoZWNrZWQ/OiBib29sZWFuO1xuICBkZWZhdWx0Q2hlY2tlZD86IGJvb2xlYW47XG59ICYgSW5wdXRIVE1MQXR0cmlidXRlczxIVE1MSW5wdXRFbGVtZW50PjtcblxuZXhwb3J0IGNsYXNzIFRvZ2dsZSBleHRlbmRzIENvbXBvbmVudDxUb2dnbGVQcm9wcz4ge1xuICBub2RlOiBIVE1MRGl2RWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIHJlbmRlclRvZ2dsZSh7IGNsYXNzTmFtZSwgbGFiZWwsIC4uLnByb3BzIH06IFRvZ2dsZVByb3BzKSB7XG4gICAgY29uc3QgdG9nZ2xlQ2xhc3NOYW1lcyA9IGNsYXNzbmFtZXMoXG4gICAgICBjbGFzc05hbWUsXG4gICAgICAnc2xkcy1jaGVja2JveC0tdG9nZ2xlIHNsZHMtZ3JpZCdcbiAgICApO1xuICAgIHJldHVybiAoXG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPXt0b2dnbGVDbGFzc05hbWVzfT5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdzbGRzLWZvcm0tZWxlbWVudF9fbGFiZWwgc2xkcy1tLWJvdHRvbS0tbm9uZSc+XG4gICAgICAgICAge2xhYmVsfVxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIG5hbWU9J2NoZWNrYm94J1xuICAgICAgICAgIHR5cGU9J2NoZWNrYm94J1xuICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9J3RvZ2dsZS1kZXNjJ1xuICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgLz5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdzbGRzLWNoZWNrYm94LS1mYXV4X2NvbnRhaW5lcicgYXJpYS1saXZlPSdhc3NlcnRpdmUnPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nc2xkcy1jaGVja2JveC0tZmF1eCcgLz5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3NsZHMtY2hlY2tib3gtLW9uJz5FbmFibGVkPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nc2xkcy1jaGVja2JveC0tb2ZmJz5EaXNhYmxlZDwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9sYWJlbD5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcmVxdWlyZWQsIGVycm9yLCB0b3RhbENvbHMsIGNvbHMsIC4uLnByb3BzIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGZvcm1FbGVtUHJvcHMgPSB7IHJlcXVpcmVkLCBlcnJvciwgdG90YWxDb2xzLCBjb2xzIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxGb3JtRWxlbWVudFxuICAgICAgICBmb3JtRWxlbWVudFJlZj17KG5vZGUpID0+ICh0aGlzLm5vZGUgPSBub2RlKX1cbiAgICAgICAgey4uLmZvcm1FbGVtUHJvcHN9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnJlbmRlclRvZ2dsZShwcm9wcyl9XG4gICAgICA8L0Zvcm1FbGVtZW50PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==