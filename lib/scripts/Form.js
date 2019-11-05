"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = void 0;

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

var _FormElement = require("./FormElement");

var _util = require("./util");

var Form =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Form, _Component);

  function Form(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Form);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Form).call(this, props));
    _this.renderFormElement = _this.renderFormElement.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(Form, [{
    key: "renderFormElement",
    value: function renderFormElement(element) {
      if (element && !element.type.isFormElement) {
        var _element$props$id = element.props.id,
            id = _element$props$id === void 0 ? "form-element-".concat((0, _util.uuid)()) : _element$props$id;
        var formElemProps = {
          id: id
        };
        return _react.default.createElement(_FormElement.FormElement, formElemProps, _react.default.cloneElement(element, {
          id: id
        }));
      }

      return element;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          type = _this$props.type,
          children = _this$props.children,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["className", "type", "children"]);
      var formClassNames = (0, _classnames.default)(className, "slds-form--".concat(type));
      return _react.default.createElement("form", (0, _extends2.default)({
        className: formClassNames
      }, props), _react.default.Children.map(children, this.renderFormElement));
    }
  }]);
  return Form;
}(_react.Component);

exports.Form = Form;
(0, _defineProperty2.default)(Form, "defaultProps", {
  type: 'stacked'
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL0Zvcm0udHN4Il0sIm5hbWVzIjpbIkZvcm0iLCJwcm9wcyIsInJlbmRlckZvcm1FbGVtZW50IiwiYmluZCIsImVsZW1lbnQiLCJ0eXBlIiwiaXNGb3JtRWxlbWVudCIsImlkIiwiZm9ybUVsZW1Qcm9wcyIsIlJlYWN0IiwiY2xvbmVFbGVtZW50IiwiY2xhc3NOYW1lIiwiY2hpbGRyZW4iLCJmb3JtQ2xhc3NOYW1lcyIsIkNoaWxkcmVuIiwibWFwIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztJQU9hQSxJOzs7OztBQUtYLGdCQUFZQyxLQUFaLEVBQXdDO0FBQUE7O0FBQUE7QUFDdEMsMEdBQU1BLEtBQU47QUFFQSxVQUFLQyxpQkFBTCxHQUF5QixNQUFLQSxpQkFBTCxDQUF1QkMsSUFBdkIsNkNBQXpCO0FBSHNDO0FBSXZDOzs7O3NDQUVpQkMsTyxFQUFjO0FBQzlCLFVBQUlBLE9BQU8sSUFBSSxDQUFDQSxPQUFPLENBQUNDLElBQVIsQ0FBYUMsYUFBN0IsRUFBNEM7QUFBQSxnQ0FDQUYsT0FBTyxDQUFDSCxLQURSLENBQ2xDTSxFQURrQztBQUFBLFlBQ2xDQSxFQURrQyx5REFDYixpQkFEYTtBQUUxQyxZQUFNQyxhQUFhLEdBQUc7QUFBRUQsVUFBQUEsRUFBRSxFQUFGQTtBQUFGLFNBQXRCO0FBQ0EsZUFDRSw2QkFBQyx3QkFBRCxFQUFpQkMsYUFBakIsRUFDR0MsZUFBTUMsWUFBTixDQUFtQk4sT0FBbkIsRUFBNEI7QUFBRUcsVUFBQUEsRUFBRSxFQUFGQTtBQUFGLFNBQTVCLENBREgsQ0FERjtBQUtEOztBQUNELGFBQU9ILE9BQVA7QUFDRDs7OzZCQUVRO0FBQUEsd0JBQ3lDLEtBQUtILEtBRDlDO0FBQUEsVUFDQ1UsU0FERCxlQUNDQSxTQUREO0FBQUEsVUFDWU4sSUFEWixlQUNZQSxJQURaO0FBQUEsVUFDa0JPLFFBRGxCLGVBQ2tCQSxRQURsQjtBQUFBLFVBQytCWCxLQUQvQjtBQUVQLFVBQU1ZLGNBQWMsR0FBRyx5QkFBV0YsU0FBWCx1QkFBb0NOLElBQXBDLEVBQXZCO0FBQ0EsYUFDRTtBQUFNLFFBQUEsU0FBUyxFQUFFUTtBQUFqQixTQUFxQ1osS0FBckMsR0FDR1EsZUFBTUssUUFBTixDQUFlQyxHQUFmLENBQW1CSCxRQUFuQixFQUE2QixLQUFLVixpQkFBbEMsQ0FESCxDQURGO0FBS0Q7OztFQWhDdUJjLGdCOzs7OEJBQWJoQixJLGtCQUNvQztBQUM3Q0ssRUFBQUEsSUFBSSxFQUFFO0FBRHVDLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBGb3JtSFRNTEF0dHJpYnV0ZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IEZvcm1FbGVtZW50IH0gZnJvbSAnLi9Gb3JtRWxlbWVudCc7XG5pbXBvcnQgeyB1dWlkIH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IHR5cGUgRm9ybVByb3BzID0ge1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIHR5cGU/OiAnc3RhY2tlZCcgfCAnaG9yaXpvbnRhbCcgfCAnaW5saW5lJyB8ICdjb21wb3VuZCc7XG59ICYgRm9ybUhUTUxBdHRyaWJ1dGVzPEhUTUxGb3JtRWxlbWVudD47XG5cbmV4cG9ydCBjbGFzcyBGb3JtIGV4dGVuZHMgQ29tcG9uZW50PEZvcm1Qcm9wcywge30+IHtcbiAgc3RhdGljIGRlZmF1bHRQcm9wczogUGljazxGb3JtUHJvcHMsICd0eXBlJz4gPSB7XG4gICAgdHlwZTogJ3N0YWNrZWQnLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBSZWFkb25seTxGb3JtUHJvcHM+KSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5yZW5kZXJGb3JtRWxlbWVudCA9IHRoaXMucmVuZGVyRm9ybUVsZW1lbnQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIHJlbmRlckZvcm1FbGVtZW50KGVsZW1lbnQ6IGFueSkge1xuICAgIGlmIChlbGVtZW50ICYmICFlbGVtZW50LnR5cGUuaXNGb3JtRWxlbWVudCkge1xuICAgICAgY29uc3QgeyBpZCA9IGBmb3JtLWVsZW1lbnQtJHt1dWlkKCl9YCB9ID0gZWxlbWVudC5wcm9wcztcbiAgICAgIGNvbnN0IGZvcm1FbGVtUHJvcHMgPSB7IGlkIH07XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Rm9ybUVsZW1lbnQgey4uLmZvcm1FbGVtUHJvcHN9PlxuICAgICAgICAgIHtSZWFjdC5jbG9uZUVsZW1lbnQoZWxlbWVudCwgeyBpZCB9KX1cbiAgICAgICAgPC9Gb3JtRWxlbWVudD5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2xhc3NOYW1lLCB0eXBlLCBjaGlsZHJlbiwgLi4ucHJvcHMgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZm9ybUNsYXNzTmFtZXMgPSBjbGFzc25hbWVzKGNsYXNzTmFtZSwgYHNsZHMtZm9ybS0tJHt0eXBlfWApO1xuICAgIHJldHVybiAoXG4gICAgICA8Zm9ybSBjbGFzc05hbWU9e2Zvcm1DbGFzc05hbWVzfSB7Li4ucHJvcHN9PlxuICAgICAgICB7UmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCB0aGlzLnJlbmRlckZvcm1FbGVtZW50KX1cbiAgICAgIDwvZm9ybT5cbiAgICApO1xuICB9XG59XG4iXX0=