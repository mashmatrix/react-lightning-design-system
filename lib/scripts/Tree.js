"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tree = void 0;

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

var Tree =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Tree, _Component);

  function Tree(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Tree);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Tree).call(this, props));
    _this.renderTreeNode = _this.renderTreeNode.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(Tree, [{
    key: "renderTreeNode",
    value: function renderTreeNode(tnode) {
      var _this$props = this.props,
          onNodeClick = _this$props.onNodeClick,
          onNodeToggle = _this$props.onNodeToggle,
          onNodeLabelClick = _this$props.onNodeLabelClick,
          toggleOnNodeClick = _this$props.toggleOnNodeClick;
      return (0, _react.cloneElement)(tnode, {
        level: 1,
        onNodeClick: onNodeClick,
        onNodeToggle: onNodeToggle,
        onNodeLabelClick: onNodeLabelClick,
        toggleOnNodeClick: toggleOnNodeClick
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          label = _this$props2.label,
          children = _this$props2.children,
          onNodeClick = _this$props2.onNodeClick,
          onNodeToggle = _this$props2.onNodeToggle,
          onNodeLabelClick = _this$props2.onNodeLabelClick,
          toggleOnNodeClick = _this$props2.toggleOnNodeClick,
          props = (0, _objectWithoutProperties2.default)(_this$props2, ["className", "label", "children", "onNodeClick", "onNodeToggle", "onNodeLabelClick", "toggleOnNodeClick"]);
      var treeClassNames = (0, _classnames.default)(className, 'slds-tree-container');
      return _react.default.createElement("div", (0, _extends2.default)({
        className: treeClassNames,
        role: "application"
      }, props), label ? _react.default.createElement("h4", {
        className: "slds-text-heading--label"
      }, label) : null, _react.default.createElement("ul", {
        className: "slds-tree",
        role: "tree"
      }, _react.Children.map(children, this.renderTreeNode)));
    }
  }]);
  return Tree;
}(_react.Component);

exports.Tree = Tree;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL1RyZWUudHN4Il0sIm5hbWVzIjpbIlRyZWUiLCJwcm9wcyIsInJlbmRlclRyZWVOb2RlIiwiYmluZCIsInRub2RlIiwib25Ob2RlQ2xpY2siLCJvbk5vZGVUb2dnbGUiLCJvbk5vZGVMYWJlbENsaWNrIiwidG9nZ2xlT25Ob2RlQ2xpY2siLCJsZXZlbCIsImNsYXNzTmFtZSIsImxhYmVsIiwiY2hpbGRyZW4iLCJ0cmVlQ2xhc3NOYW1lcyIsIkNoaWxkcmVuIiwibWFwIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFNQTs7SUFXYUEsSTs7Ozs7QUFDWCxnQkFBWUMsS0FBWixFQUF3QztBQUFBOztBQUFBO0FBQ3RDLDBHQUFNQSxLQUFOO0FBQ0EsVUFBS0MsY0FBTCxHQUFzQixNQUFLQSxjQUFMLENBQW9CQyxJQUFwQiw2Q0FBdEI7QUFGc0M7QUFHdkM7Ozs7bUNBRWNDLEssRUFBWTtBQUFBLHdCQU1yQixLQUFLSCxLQU5nQjtBQUFBLFVBRXZCSSxXQUZ1QixlQUV2QkEsV0FGdUI7QUFBQSxVQUd2QkMsWUFIdUIsZUFHdkJBLFlBSHVCO0FBQUEsVUFJdkJDLGdCQUp1QixlQUl2QkEsZ0JBSnVCO0FBQUEsVUFLdkJDLGlCQUx1QixlQUt2QkEsaUJBTHVCO0FBT3pCLGFBQU8seUJBQWFKLEtBQWIsRUFBb0I7QUFDekJLLFFBQUFBLEtBQUssRUFBRSxDQURrQjtBQUV6QkosUUFBQUEsV0FBVyxFQUFYQSxXQUZ5QjtBQUd6QkMsUUFBQUEsWUFBWSxFQUFaQSxZQUh5QjtBQUl6QkMsUUFBQUEsZ0JBQWdCLEVBQWhCQSxnQkFKeUI7QUFLekJDLFFBQUFBLGlCQUFpQixFQUFqQkE7QUFMeUIsT0FBcEIsQ0FBUDtBQU9EOzs7NkJBRVE7QUFBQSx5QkFZSCxLQUFLUCxLQVpGO0FBQUEsVUFFTFMsU0FGSyxnQkFFTEEsU0FGSztBQUFBLFVBR0xDLEtBSEssZ0JBR0xBLEtBSEs7QUFBQSxVQUlMQyxRQUpLLGdCQUlMQSxRQUpLO0FBQUEsVUFNTFAsV0FOSyxnQkFNTEEsV0FOSztBQUFBLFVBT0xDLFlBUEssZ0JBT0xBLFlBUEs7QUFBQSxVQVFMQyxnQkFSSyxnQkFRTEEsZ0JBUks7QUFBQSxVQVNMQyxpQkFUSyxnQkFTTEEsaUJBVEs7QUFBQSxVQVdGUCxLQVhFO0FBYVAsVUFBTVksY0FBYyxHQUFHLHlCQUFXSCxTQUFYLEVBQXNCLHFCQUF0QixDQUF2QjtBQUNBLGFBQ0U7QUFBSyxRQUFBLFNBQVMsRUFBRUcsY0FBaEI7QUFBZ0MsUUFBQSxJQUFJLEVBQUM7QUFBckMsU0FBdURaLEtBQXZELEdBQ0dVLEtBQUssR0FBRztBQUFJLFFBQUEsU0FBUyxFQUFDO0FBQWQsU0FBMENBLEtBQTFDLENBQUgsR0FBMkQsSUFEbkUsRUFFRTtBQUFJLFFBQUEsU0FBUyxFQUFDLFdBQWQ7QUFBMEIsUUFBQSxJQUFJLEVBQUM7QUFBL0IsU0FDR0csZ0JBQVNDLEdBQVQsQ0FBYUgsUUFBYixFQUF1QixLQUFLVixjQUE1QixDQURILENBRkYsQ0FERjtBQVFEOzs7RUE1Q3VCYyxnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1xuICBDb21wb25lbnQsXG4gIENoaWxkcmVuLFxuICBjbG9uZUVsZW1lbnQsXG4gIEhUTUxBdHRyaWJ1dGVzLFxufSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuZXhwb3J0IHR5cGUgVHJlZVByb3BzID0ge1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGxhYmVsPzogc3RyaW5nO1xuICB0b2dnbGVPbk5vZGVDbGljaz86IGJvb2xlYW47XG4gIG9uTm9kZUNsaWNrPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG4gIG9uTm9kZVRvZ2dsZT86ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55O1xuICBvbk5vZGVMYWJlbENsaWNrPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG59ICYgSFRNTEF0dHJpYnV0ZXM8SFRNTERpdkVsZW1lbnQ+O1xuXG5leHBvcnQgY2xhc3MgVHJlZSBleHRlbmRzIENvbXBvbmVudDxUcmVlUHJvcHMsIHt9PiB7XG4gIGNvbnN0cnVjdG9yKHByb3BzOiBSZWFkb25seTxUcmVlUHJvcHM+KSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMucmVuZGVyVHJlZU5vZGUgPSB0aGlzLnJlbmRlclRyZWVOb2RlLmJpbmQodGhpcyk7XG4gIH1cblxuICByZW5kZXJUcmVlTm9kZSh0bm9kZTogYW55KSB7XG4gICAgY29uc3Qge1xuICAgICAgb25Ob2RlQ2xpY2ssXG4gICAgICBvbk5vZGVUb2dnbGUsXG4gICAgICBvbk5vZGVMYWJlbENsaWNrLFxuICAgICAgdG9nZ2xlT25Ob2RlQ2xpY2ssXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGNsb25lRWxlbWVudCh0bm9kZSwge1xuICAgICAgbGV2ZWw6IDEsXG4gICAgICBvbk5vZGVDbGljayxcbiAgICAgIG9uTm9kZVRvZ2dsZSxcbiAgICAgIG9uTm9kZUxhYmVsQ2xpY2ssXG4gICAgICB0b2dnbGVPbk5vZGVDbGljayxcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjbGFzc05hbWUsXG4gICAgICBsYWJlbCxcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG4gICAgICBvbk5vZGVDbGljayxcbiAgICAgIG9uTm9kZVRvZ2dsZSxcbiAgICAgIG9uTm9kZUxhYmVsQ2xpY2ssXG4gICAgICB0b2dnbGVPbk5vZGVDbGljayxcbiAgICAgIC8qIGVzbGludC1lbmFibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG4gICAgICAuLi5wcm9wc1xuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHRyZWVDbGFzc05hbWVzID0gY2xhc3NuYW1lcyhjbGFzc05hbWUsICdzbGRzLXRyZWUtY29udGFpbmVyJyk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXt0cmVlQ2xhc3NOYW1lc30gcm9sZT0nYXBwbGljYXRpb24nIHsuLi5wcm9wc30+XG4gICAgICAgIHtsYWJlbCA/IDxoNCBjbGFzc05hbWU9J3NsZHMtdGV4dC1oZWFkaW5nLS1sYWJlbCc+e2xhYmVsfTwvaDQ+IDogbnVsbH1cbiAgICAgICAgPHVsIGNsYXNzTmFtZT0nc2xkcy10cmVlJyByb2xlPSd0cmVlJz5cbiAgICAgICAgICB7Q2hpbGRyZW4ubWFwKGNoaWxkcmVuLCB0aGlzLnJlbmRlclRyZWVOb2RlKX1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==