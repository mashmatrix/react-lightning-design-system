"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Checkbox = void 0;

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

var Checkbox =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Checkbox, _Component);

  function Checkbox() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Checkbox);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Checkbox)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "node", null);
    return _this;
  }

  (0, _createClass2.default)(Checkbox, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.node) {
        var input = this.node.getElementsByTagName('input')[0];

        if (nextProps.defaultChecked !== undefined && nextProps.defaultChecked !== input.checked) {
          input.checked = nextProps.defaultChecked;
        }
      }
    }
  }, {
    key: "renderCheckbox",
    value: function renderCheckbox(_ref) {
      var _this2 = this;

      var className = _ref.className,
          label = _ref.label,
          checkboxRef = _ref.checkboxRef,
          props = (0, _objectWithoutProperties2.default)(_ref, ["className", "label", "checkboxRef"]);
      var checkClassNames = (0, _classnames.default)(className, 'slds-checkbox');
      return _react.default.createElement("label", {
        ref: function ref(node) {
          _this2.node = node;
          if (checkboxRef) checkboxRef(node);
        },
        className: checkClassNames
      }, _react.default.createElement("input", (0, _extends2.default)({
        type: "checkbox"
      }, props)), _react.default.createElement("span", {
        className: "slds-checkbox--faux"
      }), _react.default.createElement("span", {
        className: "slds-form-element__label"
      }, label));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          grouped = _this$props.grouped,
          required = _this$props.required,
          error = _this$props.error,
          totalCols = _this$props.totalCols,
          cols = _this$props.cols,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["grouped", "required", "error", "totalCols", "cols"]);
      var formElemProps = {
        required: required,
        error: error,
        totalCols: totalCols,
        cols: cols
      };
      return grouped ? this.renderCheckbox(props) : _react.default.createElement(_FormElement.FormElement, (0, _extends2.default)({
        formElementRef: function formElementRef(node) {
          return _this3.node = node;
        }
      }, formElemProps), this.renderCheckbox(props));
    }
  }]);
  return Checkbox;
}(_react.Component);

exports.Checkbox = Checkbox;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL0NoZWNrYm94LnRzeCJdLCJuYW1lcyI6WyJDaGVja2JveCIsIm5leHRQcm9wcyIsIm5vZGUiLCJpbnB1dCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiZGVmYXVsdENoZWNrZWQiLCJ1bmRlZmluZWQiLCJjaGVja2VkIiwiY2xhc3NOYW1lIiwibGFiZWwiLCJjaGVja2JveFJlZiIsInByb3BzIiwiY2hlY2tDbGFzc05hbWVzIiwiZ3JvdXBlZCIsInJlcXVpcmVkIiwiZXJyb3IiLCJ0b3RhbENvbHMiLCJjb2xzIiwiZm9ybUVsZW1Qcm9wcyIsInJlbmRlckNoZWNrYm94IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztJQWlCYUEsUTs7Ozs7Ozs7Ozs7Ozs7Ozs7dUZBQ3NDLEk7Ozs7Ozs4Q0FFdkJDLFMsRUFBb0M7QUFDNUQsVUFBSSxLQUFLQyxJQUFULEVBQWU7QUFDYixZQUFNQyxLQUFLLEdBQUcsS0FBS0QsSUFBTCxDQUFVRSxvQkFBVixDQUErQixPQUEvQixFQUF3QyxDQUF4QyxDQUFkOztBQUNBLFlBQ0VILFNBQVMsQ0FBQ0ksY0FBVixLQUE2QkMsU0FBN0IsSUFDQUwsU0FBUyxDQUFDSSxjQUFWLEtBQTZCRixLQUFLLENBQUNJLE9BRnJDLEVBR0U7QUFDQUosVUFBQUEsS0FBSyxDQUFDSSxPQUFOLEdBQWdCTixTQUFTLENBQUNJLGNBQTFCO0FBQ0Q7QUFDRjtBQUNGOzs7eUNBRTBFO0FBQUE7O0FBQUEsVUFBMURHLFNBQTBELFFBQTFEQSxTQUEwRDtBQUFBLFVBQS9DQyxLQUErQyxRQUEvQ0EsS0FBK0M7QUFBQSxVQUF4Q0MsV0FBd0MsUUFBeENBLFdBQXdDO0FBQUEsVUFBeEJDLEtBQXdCO0FBQ3pFLFVBQU1DLGVBQWUsR0FBRyx5QkFBV0osU0FBWCxFQUFzQixlQUF0QixDQUF4QjtBQUNBLGFBQ0U7QUFDRSxRQUFBLEdBQUcsRUFBRSxhQUFDTixJQUFELEVBQVU7QUFDYixVQUFBLE1BQUksQ0FBQ0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsY0FBSVEsV0FBSixFQUFpQkEsV0FBVyxDQUFDUixJQUFELENBQVg7QUFDbEIsU0FKSDtBQUtFLFFBQUEsU0FBUyxFQUFFVTtBQUxiLFNBT0U7QUFBTyxRQUFBLElBQUksRUFBQztBQUFaLFNBQTJCRCxLQUEzQixFQVBGLEVBUUU7QUFBTSxRQUFBLFNBQVMsRUFBQztBQUFoQixRQVJGLEVBU0U7QUFBTSxRQUFBLFNBQVMsRUFBQztBQUFoQixTQUE0Q0YsS0FBNUMsQ0FURixDQURGO0FBYUQ7Ozs2QkFFUTtBQUFBOztBQUFBLHdCQUN5RCxLQUFLRSxLQUQ5RDtBQUFBLFVBQ0NFLE9BREQsZUFDQ0EsT0FERDtBQUFBLFVBQ1VDLFFBRFYsZUFDVUEsUUFEVjtBQUFBLFVBQ29CQyxLQURwQixlQUNvQkEsS0FEcEI7QUFBQSxVQUMyQkMsU0FEM0IsZUFDMkJBLFNBRDNCO0FBQUEsVUFDc0NDLElBRHRDLGVBQ3NDQSxJQUR0QztBQUFBLFVBQytDTixLQUQvQztBQUVQLFVBQU1PLGFBQWEsR0FBRztBQUFFSixRQUFBQSxRQUFRLEVBQVJBLFFBQUY7QUFBWUMsUUFBQUEsS0FBSyxFQUFMQSxLQUFaO0FBQW1CQyxRQUFBQSxTQUFTLEVBQVRBLFNBQW5CO0FBQThCQyxRQUFBQSxJQUFJLEVBQUpBO0FBQTlCLE9BQXRCO0FBQ0EsYUFBT0osT0FBTyxHQUNaLEtBQUtNLGNBQUwsQ0FBb0JSLEtBQXBCLENBRFksR0FHWiw2QkFBQyx3QkFBRDtBQUNFLFFBQUEsY0FBYyxFQUFFLHdCQUFDVCxJQUFEO0FBQUEsaUJBQVcsTUFBSSxDQUFDQSxJQUFMLEdBQVlBLElBQXZCO0FBQUE7QUFEbEIsU0FFTWdCLGFBRk4sR0FJRyxLQUFLQyxjQUFMLENBQW9CUixLQUFwQixDQUpILENBSEY7QUFVRDs7O0VBN0MyQlMsZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBJbnB1dEhUTUxBdHRyaWJ1dGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBGb3JtRWxlbWVudCwgRm9ybUVsZW1lbnRQcm9wcyB9IGZyb20gJy4vRm9ybUVsZW1lbnQnO1xuXG5leHBvcnQgdHlwZSBDaGVja2JveFByb3BzID0ge1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGxhYmVsPzogc3RyaW5nO1xuICByZXF1aXJlZD86IGJvb2xlYW47XG4gIGVycm9yPzogRm9ybUVsZW1lbnRQcm9wc1snZXJyb3InXTtcbiAgdG90YWxDb2xzPzogbnVtYmVyO1xuICBjb2xzPzogbnVtYmVyO1xuICBncm91cGVkPzogYm9vbGVhbjtcbiAgbmFtZT86IHN0cmluZztcbiAgdmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XG4gIGNoZWNrZWQ/OiBib29sZWFuO1xuICBkZWZhdWx0Q2hlY2tlZD86IGJvb2xlYW47XG4gIGNoZWNrYm94UmVmPzogKG5vZGU6IEhUTUxMYWJlbEVsZW1lbnQgfCBudWxsKSA9PiB2b2lkO1xufSAmIElucHV0SFRNTEF0dHJpYnV0ZXM8SFRNTElucHV0RWxlbWVudD47XG5cbmV4cG9ydCBjbGFzcyBDaGVja2JveCBleHRlbmRzIENvbXBvbmVudDxDaGVja2JveFByb3BzPiB7XG4gIG5vZGU6IEhUTUxEaXZFbGVtZW50IHwgSFRNTExhYmVsRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzOiBSZWFkb25seTxDaGVja2JveFByb3BzPikge1xuICAgIGlmICh0aGlzLm5vZGUpIHtcbiAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5ub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpWzBdO1xuICAgICAgaWYgKFxuICAgICAgICBuZXh0UHJvcHMuZGVmYXVsdENoZWNrZWQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBuZXh0UHJvcHMuZGVmYXVsdENoZWNrZWQgIT09IGlucHV0LmNoZWNrZWRcbiAgICAgICkge1xuICAgICAgICBpbnB1dC5jaGVja2VkID0gbmV4dFByb3BzLmRlZmF1bHRDaGVja2VkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlckNoZWNrYm94KHsgY2xhc3NOYW1lLCBsYWJlbCwgY2hlY2tib3hSZWYsIC4uLnByb3BzIH06IENoZWNrYm94UHJvcHMpIHtcbiAgICBjb25zdCBjaGVja0NsYXNzTmFtZXMgPSBjbGFzc25hbWVzKGNsYXNzTmFtZSwgJ3NsZHMtY2hlY2tib3gnKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGxhYmVsXG4gICAgICAgIHJlZj17KG5vZGUpID0+IHtcbiAgICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xuICAgICAgICAgIGlmIChjaGVja2JveFJlZikgY2hlY2tib3hSZWYobm9kZSk7XG4gICAgICAgIH19XG4gICAgICAgIGNsYXNzTmFtZT17Y2hlY2tDbGFzc05hbWVzfVxuICAgICAgPlxuICAgICAgICA8aW5wdXQgdHlwZT0nY2hlY2tib3gnIHsuLi5wcm9wc30gLz5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdzbGRzLWNoZWNrYm94LS1mYXV4JyAvPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3NsZHMtZm9ybS1lbGVtZW50X19sYWJlbCc+e2xhYmVsfTwvc3Bhbj5cbiAgICAgIDwvbGFiZWw+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGdyb3VwZWQsIHJlcXVpcmVkLCBlcnJvciwgdG90YWxDb2xzLCBjb2xzLCAuLi5wcm9wcyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBmb3JtRWxlbVByb3BzID0geyByZXF1aXJlZCwgZXJyb3IsIHRvdGFsQ29scywgY29scyB9O1xuICAgIHJldHVybiBncm91cGVkID8gKFxuICAgICAgdGhpcy5yZW5kZXJDaGVja2JveChwcm9wcylcbiAgICApIDogKFxuICAgICAgPEZvcm1FbGVtZW50XG4gICAgICAgIGZvcm1FbGVtZW50UmVmPXsobm9kZSkgPT4gKHRoaXMubm9kZSA9IG5vZGUpfVxuICAgICAgICB7Li4uZm9ybUVsZW1Qcm9wc31cbiAgICAgID5cbiAgICAgICAge3RoaXMucmVuZGVyQ2hlY2tib3gocHJvcHMpfVxuICAgICAgPC9Gb3JtRWxlbWVudD5cbiAgICApO1xuICB9XG59XG4iXX0=