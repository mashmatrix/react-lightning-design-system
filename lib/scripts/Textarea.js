"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Textarea = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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

var Textarea =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Textarea, _Component);

  function Textarea(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Textarea);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Textarea).call(this, props));
    _this.state = {
      id: "form-element-".concat((0, _util.uuid)())
    };
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(Textarea, [{
    key: "onChange",
    value: function onChange(e) {
      var value = e.target.value;

      if (this.props.onChange) {
        this.props.onChange(e, value);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var id = this.props.id || this.state.id;
      var _this$props = this.props,
          label = _this$props.label,
          required = _this$props.required,
          error = _this$props.error,
          totalCols = _this$props.totalCols,
          cols = _this$props.cols,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["label", "required", "error", "totalCols", "cols"]);

      if (label || required || error || totalCols || cols) {
        var formElemProps = {
          id: id,
          label: label,
          required: required,
          error: error,
          totalCols: totalCols,
          cols: cols
        };
        return _react.default.createElement(_FormElement.FormElement, formElemProps, _react.default.createElement(Textarea, (0, _objectSpread2.default)({}, props, {
          id: id
        })));
      }

      var className = props.className,
          textareaRef = props.textareaRef,
          onChange = props.onChange,
          pprops = (0, _objectWithoutProperties2.default)(props, ["className", "textareaRef", "onChange"]);
      var taClassNames = (0, _classnames.default)(className, 'slds-input');
      return _react.default.createElement("textarea", (0, _extends2.default)({
        id: id,
        ref: textareaRef,
        className: taClassNames,
        onChange: this.onChange
      }, pprops));
    }
  }]);
  return Textarea;
}(_react.Component);

exports.Textarea = Textarea;
(0, _defineProperty2.default)(Textarea, "isFormElement", true);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL1RleHRhcmVhLnRzeCJdLCJuYW1lcyI6WyJUZXh0YXJlYSIsInByb3BzIiwic3RhdGUiLCJpZCIsIm9uQ2hhbmdlIiwiYmluZCIsImUiLCJ2YWx1ZSIsInRhcmdldCIsImxhYmVsIiwicmVxdWlyZWQiLCJlcnJvciIsInRvdGFsQ29scyIsImNvbHMiLCJmb3JtRWxlbVByb3BzIiwiY2xhc3NOYW1lIiwidGV4dGFyZWFSZWYiLCJwcHJvcHMiLCJ0YUNsYXNzTmFtZXMiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7SUFrQmFBLFE7Ozs7O0FBR1gsb0JBQVlDLEtBQVosRUFBNEM7QUFBQTs7QUFBQTtBQUMxQyw4R0FBTUEsS0FBTjtBQUNBLFVBQUtDLEtBQUwsR0FBYTtBQUFFQyxNQUFBQSxFQUFFLHlCQUFrQixpQkFBbEI7QUFBSixLQUFiO0FBQ0EsVUFBS0MsUUFBTCxHQUFnQixNQUFLQSxRQUFMLENBQWNDLElBQWQsNkNBQWhCO0FBSDBDO0FBSTNDOzs7OzZCQUVRQyxDLEVBQTJDO0FBQUEsVUFDMUNDLEtBRDBDLEdBQ2hDRCxDQUFDLENBQUNFLE1BRDhCLENBQzFDRCxLQUQwQzs7QUFFbEQsVUFBSSxLQUFLTixLQUFMLENBQVdHLFFBQWYsRUFBeUI7QUFDdkIsYUFBS0gsS0FBTCxDQUFXRyxRQUFYLENBQW9CRSxDQUFwQixFQUF1QkMsS0FBdkI7QUFDRDtBQUNGOzs7NkJBRVE7QUFDUCxVQUFNSixFQUFFLEdBQUcsS0FBS0YsS0FBTCxDQUFXRSxFQUFYLElBQWlCLEtBQUtELEtBQUwsQ0FBV0MsRUFBdkM7QUFETyx3QkFFdUQsS0FBS0YsS0FGNUQ7QUFBQSxVQUVDUSxLQUZELGVBRUNBLEtBRkQ7QUFBQSxVQUVRQyxRQUZSLGVBRVFBLFFBRlI7QUFBQSxVQUVrQkMsS0FGbEIsZUFFa0JBLEtBRmxCO0FBQUEsVUFFeUJDLFNBRnpCLGVBRXlCQSxTQUZ6QjtBQUFBLFVBRW9DQyxJQUZwQyxlQUVvQ0EsSUFGcEM7QUFBQSxVQUU2Q1osS0FGN0M7O0FBR1AsVUFBSVEsS0FBSyxJQUFJQyxRQUFULElBQXFCQyxLQUFyQixJQUE4QkMsU0FBOUIsSUFBMkNDLElBQS9DLEVBQXFEO0FBQ25ELFlBQU1DLGFBQWEsR0FBRztBQUFFWCxVQUFBQSxFQUFFLEVBQUZBLEVBQUY7QUFBTU0sVUFBQUEsS0FBSyxFQUFMQSxLQUFOO0FBQWFDLFVBQUFBLFFBQVEsRUFBUkEsUUFBYjtBQUF1QkMsVUFBQUEsS0FBSyxFQUFMQSxLQUF2QjtBQUE4QkMsVUFBQUEsU0FBUyxFQUFUQSxTQUE5QjtBQUF5Q0MsVUFBQUEsSUFBSSxFQUFKQTtBQUF6QyxTQUF0QjtBQUNBLGVBQ0UsNkJBQUMsd0JBQUQsRUFBaUJDLGFBQWpCLEVBQ0UsNkJBQUMsUUFBRCxrQ0FBbUJiLEtBQW5CO0FBQTBCRSxVQUFBQSxFQUFFLEVBQUZBO0FBQTFCLFdBREYsQ0FERjtBQUtEOztBQVZNLFVBWUxZLFNBWkssR0FnQkhkLEtBaEJHLENBWUxjLFNBWks7QUFBQSxVQWFMQyxXQWJLLEdBZ0JIZixLQWhCRyxDQWFMZSxXQWJLO0FBQUEsVUFjTFosUUFkSyxHQWdCSEgsS0FoQkcsQ0FjTEcsUUFkSztBQUFBLFVBZUZhLE1BZkUsMENBZ0JIaEIsS0FoQkc7QUFpQlAsVUFBTWlCLFlBQVksR0FBRyx5QkFBV0gsU0FBWCxFQUFzQixZQUF0QixDQUFyQjtBQUNBLGFBQ0U7QUFDRSxRQUFBLEVBQUUsRUFBRVosRUFETjtBQUVFLFFBQUEsR0FBRyxFQUFFYSxXQUZQO0FBR0UsUUFBQSxTQUFTLEVBQUVFLFlBSGI7QUFJRSxRQUFBLFFBQVEsRUFBRSxLQUFLZDtBQUpqQixTQUtNYSxNQUxOLEVBREY7QUFTRDs7O0VBM0MyQkUsZ0I7Ozs4QkFBakJuQixRLG1CQUNZLEkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBUZXh0YXJlYUhUTUxBdHRyaWJ1dGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBGb3JtRWxlbWVudCwgRm9ybUVsZW1lbnRQcm9wcyB9IGZyb20gJy4vRm9ybUVsZW1lbnQnO1xuaW1wb3J0IHsgdXVpZCB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCB0eXBlIFRleHRhcmVhUHJvcHMgPSB7XG4gIGlkPzogc3RyaW5nO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGxhYmVsPzogc3RyaW5nO1xuICByZXF1aXJlZD86IGJvb2xlYW47XG4gIGVycm9yPzogRm9ybUVsZW1lbnRQcm9wc1snZXJyb3InXTtcbiAgdG90YWxDb2xzPzogbnVtYmVyO1xuICBjb2xzPzogbnVtYmVyO1xuICBvbkNoYW5nZT86IChlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MVGV4dEFyZWFFbGVtZW50PiwgdmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgdGV4dGFyZWFSZWY/OiAoLi4uYXJnczogYW55W10pID0+IGFueTtcbn0gJiBUZXh0YXJlYUhUTUxBdHRyaWJ1dGVzPEhUTUxUZXh0QXJlYUVsZW1lbnQ+O1xuXG50eXBlIFRleHRhcmVhU3RhdGUgPSB7XG4gIGlkOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY2xhc3MgVGV4dGFyZWEgZXh0ZW5kcyBDb21wb25lbnQ8VGV4dGFyZWFQcm9wcywgVGV4dGFyZWFTdGF0ZT4ge1xuICBzdGF0aWMgaXNGb3JtRWxlbWVudCA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IFJlYWRvbmx5PFRleHRhcmVhUHJvcHM+KSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7IGlkOiBgZm9ybS1lbGVtZW50LSR7dXVpZCgpfWAgfTtcbiAgICB0aGlzLm9uQ2hhbmdlID0gdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25DaGFuZ2UoZTogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTFRleHRBcmVhRWxlbWVudD4pIHtcbiAgICBjb25zdCB7IHZhbHVlIH0gPSBlLnRhcmdldDtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShlLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGlkID0gdGhpcy5wcm9wcy5pZCB8fCB0aGlzLnN0YXRlLmlkO1xuICAgIGNvbnN0IHsgbGFiZWwsIHJlcXVpcmVkLCBlcnJvciwgdG90YWxDb2xzLCBjb2xzLCAuLi5wcm9wcyB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAobGFiZWwgfHwgcmVxdWlyZWQgfHwgZXJyb3IgfHwgdG90YWxDb2xzIHx8IGNvbHMpIHtcbiAgICAgIGNvbnN0IGZvcm1FbGVtUHJvcHMgPSB7IGlkLCBsYWJlbCwgcmVxdWlyZWQsIGVycm9yLCB0b3RhbENvbHMsIGNvbHMgfTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxGb3JtRWxlbWVudCB7Li4uZm9ybUVsZW1Qcm9wc30+XG4gICAgICAgICAgPFRleHRhcmVhIHsuLi57IC4uLnByb3BzLCBpZCB9fSAvPlxuICAgICAgICA8L0Zvcm1FbGVtZW50PlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3Qge1xuICAgICAgY2xhc3NOYW1lLFxuICAgICAgdGV4dGFyZWFSZWYsXG4gICAgICBvbkNoYW5nZSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICAgIC4uLnBwcm9wc1xuICAgIH0gPSBwcm9wcztcbiAgICBjb25zdCB0YUNsYXNzTmFtZXMgPSBjbGFzc25hbWVzKGNsYXNzTmFtZSwgJ3NsZHMtaW5wdXQnKTtcbiAgICByZXR1cm4gKFxuICAgICAgPHRleHRhcmVhXG4gICAgICAgIGlkPXtpZH1cbiAgICAgICAgcmVmPXt0ZXh0YXJlYVJlZn1cbiAgICAgICAgY2xhc3NOYW1lPXt0YUNsYXNzTmFtZXN9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuICAgICAgICB7Li4ucHByb3BzfVxuICAgICAgLz5cbiAgICApO1xuICB9XG59XG4iXX0=