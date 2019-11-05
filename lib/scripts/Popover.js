"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Popover = exports.PopoverBody = exports.PopoverHeader = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _reactDom = require("react-dom");

var _util = require("./util");

var PopoverHeader = function PopoverHeader(props) {
  return _react.default.createElement("div", {
    className: "slds-popover__header"
  }, props.children);
};

exports.PopoverHeader = PopoverHeader;

var PopoverBody = function PopoverBody(props) {
  return _react.default.createElement("div", (0, _extends2.default)({
    className: "slds-popover__body"
  }, props), props.children);
};

exports.PopoverBody = PopoverBody;

var Popover =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Popover, _React$Component);

  function Popover(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Popover);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Popover).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "isMouseEntered", false);
    _this.state = {
      hidden: props.hidden
    };
    _this.documentClick = _this.documentClick.bind((0, _assertThisInitialized2.default)(_this));
    _this.onMouseEnter = _this.onMouseEnter.bind((0, _assertThisInitialized2.default)(_this));
    _this.onMouseLeave = _this.onMouseLeave.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(Popover, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.trigger) {
        document.addEventListener('click', this.documentClick);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.trigger) {
        document.removeEventListener('click', this.documentClick);
      }
    }
  }, {
    key: "onMouseEnter",
    value: function onMouseEnter() {
      this.isMouseEntered = true;
    }
  }, {
    key: "onMouseLeave",
    value: function onMouseLeave() {
      if (!this.props.hover) return;
      this.isMouseEntered = false;
      this.toggle(false);
    }
  }, {
    key: "documentClick",
    value: function documentClick(e) {
      var triggerEl;
      var trigger = this.props.trigger;

      if (trigger) {
        var triggerElement = trigger();

        if (triggerElement && triggerElement.isReactComponent) {
          triggerEl = (0, _reactDom.findDOMNode)(triggerElement);
        } else {
          triggerEl = triggerElement;
        }
      }

      if (this.state.hidden || triggerEl && (0, _util.isElInChildren)(triggerEl, e.target)) return;
      var rootEl = (0, _reactDom.findDOMNode)(this);

      if (!(0, _util.isElInChildren)(rootEl, e.target)) {
        this.setState({
          hidden: true
        });
      }
    }
  }, {
    key: "toggle",
    value: function toggle(value) {
      this.setState(function (prevState) {
        return {
          hidden: typeof value !== 'undefined' ? !value : !prevState.hidden
        };
      });
    }
  }, {
    key: "mouseEntered",
    value: function mouseEntered() {
      return this.isMouseEntered;
    }
  }, {
    key: "hidden",
    value: function hidden() {
      return this.state.hidden;
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props = this.props,
          children = _this$props.children,
          position = _this$props.position,
          _this$props$hidden = _this$props.hidden,
          hidden = _this$props$hidden === void 0 ? true : _this$props$hidden,
          hover = _this$props.hover,
          trigger = _this$props.trigger,
          theme = _this$props.theme,
          tooltip = _this$props.tooltip,
          bodyStyle = _this$props.bodyStyle,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["children", "position", "hidden", "hover", "trigger", "theme", "tooltip", "bodyStyle"]);
      var popoverClassNames = (0, _classnames2.default)('slds-popover', (_classnames = {
        'slds-hide': this.state.hidden,
        'slds-popover--tooltip': tooltip
      }, (0, _defineProperty2.default)(_classnames, "slds-nubbin--".concat(position), position), (0, _defineProperty2.default)(_classnames, "slds-theme--".concat(theme), theme), _classnames));
      return _react.default.createElement("div", (0, _extends2.default)({
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave,
        className: popoverClassNames,
        role: "dialog"
      }, props), _react.default.createElement(PopoverBody, {
        style: bodyStyle
      }, children));
    }
  }]);
  return Popover;
}(_react.default.Component);

exports.Popover = Popover;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL1BvcG92ZXIudHN4Il0sIm5hbWVzIjpbIlBvcG92ZXJIZWFkZXIiLCJwcm9wcyIsImNoaWxkcmVuIiwiUG9wb3ZlckJvZHkiLCJQb3BvdmVyIiwic3RhdGUiLCJoaWRkZW4iLCJkb2N1bWVudENsaWNrIiwiYmluZCIsIm9uTW91c2VFbnRlciIsIm9uTW91c2VMZWF2ZSIsInRyaWdnZXIiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaXNNb3VzZUVudGVyZWQiLCJob3ZlciIsInRvZ2dsZSIsImUiLCJ0cmlnZ2VyRWwiLCJ0cmlnZ2VyRWxlbWVudCIsImlzUmVhY3RDb21wb25lbnQiLCJ0YXJnZXQiLCJyb290RWwiLCJzZXRTdGF0ZSIsInZhbHVlIiwicHJldlN0YXRlIiwicG9zaXRpb24iLCJ0aGVtZSIsInRvb2x0aXAiLCJib2R5U3R5bGUiLCJwb3BvdmVyQ2xhc3NOYW1lcyIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFTyxJQUFNQSxhQUF1QixHQUFHLFNBQTFCQSxhQUEwQixDQUFDQyxLQUFEO0FBQUEsU0FDckM7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLEtBQXVDQSxLQUFLLENBQUNDLFFBQTdDLENBRHFDO0FBQUEsQ0FBaEM7Ozs7QUFNQSxJQUFNQyxXQUF1QyxHQUFHLFNBQTFDQSxXQUEwQyxDQUFDRixLQUFEO0FBQUEsU0FDckQ7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLEtBQXdDQSxLQUF4QyxHQUNHQSxLQUFLLENBQUNDLFFBRFQsQ0FEcUQ7QUFBQSxDQUFoRDs7OztJQW9DTUUsTzs7Ozs7QUFHWCxtQkFBWUgsS0FBWixFQUEyQztBQUFBOztBQUFBO0FBQ3pDLDZHQUFNQSxLQUFOO0FBRHlDLGlHQUZULEtBRVM7QUFHekMsVUFBS0ksS0FBTCxH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UUFITixvRUFJUkMsS0FKUSxHQUlFQSxLQUpGLGdCQUExQjtBQU1BLGFBQ0U7QUFDRSxRQUFBLFlBQVksRUFBRSxLQUFLbkIsWUFEckI7QUFFRSxRQUFBLFlBQVksRUFBRSxLQUFLQyxZQUZyQjtBQUdFLFFBQUEsU0FBUyxFQUFFcUIsaUJBSGI7QUFJRSxRQUFBLElBQUksRUFBQztBQUpQLFNBS005QixLQUxOLEdBT0UsNkJBQUMsV0FBRDtBQUFhLFFBQUEsS0FBSyxFQUFFNkI7QUFBcEIsU0FBZ0M1QixRQUFoQyxDQVBGLENBREY7QUFXRDs7O0VBeEcwQjhCLGVBQU1DLFMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBmaW5kRE9NTm9kZSB9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBpc0VsSW5DaGlsZHJlbiB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBjb25zdCBQb3BvdmVySGVhZGVyOiBSZWFjdC5GQyA9IChwcm9wcykgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT0nc2xkcy1wb3BvdmVyX19oZWFkZXInPntwcm9wcy5jaGlsZHJlbn08L2Rpdj5cbik7XG5cbmV4cG9ydCB0eXBlIFBvcG92ZXJCb2R5UHJvcHMgPSBSZWFjdC5IVE1MQXR0cmlidXRlczxIVE1MRGl2RWxlbWVudD47XG5cbmV4cG9ydCBjb25zdCBQb3BvdmVyQm9keTogUmVhY3QuRkM8UG9wb3ZlckJvZHlQcm9wcz4gPSAocHJvcHMpID0+IChcbiAgPGRpdiBjbGFzc05hbWU9J3NsZHMtcG9wb3Zlcl9fYm9keScgey4uLnByb3BzfT5cbiAgICB7cHJvcHMuY2hpbGRyZW59XG4gIDwvZGl2PlxuKTtcblxuZXhwb3J0IHR5cGUgUG9wb3ZlclBvc2l0aW9uID1cbiAgfCAndG9wJ1xuICB8ICd0b3AtbGVmdCdcbiAgfCAndG9wLXJpZ2h0J1xuICB8ICdib3R0b20nXG4gIHwgJ2JvdHRvbS1sZWZ0J1xuICB8ICdib3R0b20tcmlnaHQnXG4gIHwgJ2xlZnQnXG4gIHwgJ2xlZnQtdG9wJ1xuICB8ICdsZWZ0LWJvdHRvbSdcbiAgfCAncmlnaHQnXG4gIHwgJ3JpZ2h0LXRvcCdcbiAgfCAncmlnaHQtYm90dG9tJztcblxuZXhwb3J0IHR5cGUgUG9wb3ZlclRoZW1lID0gJ2luZm8nIHwgJ3N1Y2Nlc3MnIHwgJ3dhcm5pbmcnIHwgJ2Vycm9yJztcblxuZXhwb3J0IHR5cGUgUG9wb3ZlclByb3BzID0ge1xuICBwb3NpdGlvbj86IFBvcG92ZXJQb3NpdGlvbjtcbiAgaGlkZGVuPzogYm9vbGVhbjtcbiAgdGhlbWU/OiBQb3BvdmVyVGhlbWU7XG4gIHRvb2x0aXA/OiBib29sZWFuO1xuICBob3Zlcj86IGJvb2xlYW47XG4gIGJvZHlTdHlsZT86IG9iamVjdDtcbiAgdHJpZ2dlcj86ICgpID0+IGFueTtcbn0gJiBSZWFjdC5IVE1MQXR0cmlidXRlczxIVE1MRGl2RWxlbWVudD47XG5cbmV4cG9ydCB0eXBlIFBvcG92ZXJTdGF0ZSA9IHtcbiAgaGlkZGVuPzogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCBjbGFzcyBQb3BvdmVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFBvcG92ZXJQcm9wcywgUG9wb3ZlclN0YXRlPiB7XG4gIHByaXZhdGUgaXNNb3VzZUVudGVyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wczogUmVhZG9ubHk8UG9wb3ZlclByb3BzPikge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBoaWRkZW46IHByb3BzLmhpZGRlbixcbiAgICB9O1xuXG4gICAgdGhpcy5kb2N1bWVudENsaWNrID0gdGhpcy5kb2N1bWVudENsaWNrLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLm9uTW91c2VFbnRlciA9IHRoaXMub25Nb3VzZUVudGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbk1vdXNlTGVhdmUgPSB0aGlzLm9uTW91c2VMZWF2ZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMudHJpZ2dlcikge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmRvY3VtZW50Q2xpY2spO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGlmICh0aGlzLnByb3BzLnRyaWdnZXIpIHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5kb2N1bWVudENsaWNrKTtcbiAgICB9XG4gIH1cblxuICBvbk1vdXNlRW50ZXIoKSB7XG4gICAgdGhpcy5pc01vdXNlRW50ZXJlZCA9IHRydWU7XG4gIH1cblxuICBvbk1vdXNlTGVhdmUoKSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmhvdmVyKSByZXR1cm47XG4gICAgdGhpcy5pc01vdXNlRW50ZXJlZCA9IGZhbHNlO1xuICAgIHRoaXMudG9nZ2xlKGZhbHNlKTtcbiAgfVxuXG4gIGRvY3VtZW50Q2xpY2soZTogYW55KSB7XG4gICAgbGV0IHRyaWdnZXJFbDtcbiAgICBjb25zdCB7IHRyaWdnZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKHRyaWdnZXIpIHtcbiAgICAgIGNvbnN0IHRyaWdnZXJFbGVtZW50ID0gdHJpZ2dlcigpO1xuICAgICAgaWYgKHRyaWdnZXJFbGVtZW50ICYmIHRyaWdnZXJFbGVtZW50LmlzUmVhY3RDb21wb25lbnQpIHtcbiAgICAgICAgdHJpZ2dlckVsID0gZmluZERPTU5vZGUodHJpZ2dlckVsZW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJpZ2dlckVsID0gdHJpZ2dlckVsZW1lbnQ7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnN0YXRlLmhpZGRlbiB8fCAodHJpZ2dlckVsICYmIGlzRWxJbkNoaWxkcmVuKHRyaWdnZXJFbCwgZS50YXJnZXQpKSlcbiAgICAgIHJldHVybjtcbiAgICBjb25zdCByb290RWwgPSBmaW5kRE9NTm9kZSh0aGlzKTtcbiAgICBpZiAoIWlzRWxJbkNoaWxkcmVuKHJvb3RFbCwgZS50YXJnZXQpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaGlkZGVuOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9PiAoe1xuICAgICAgaGlkZGVuOiB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnID8gIXZhbHVlIDogIXByZXZTdGF0ZS5oaWRkZW4sXG4gICAgfSkpO1xuICB9XG5cbiAgbW91c2VFbnRlcmVkKCkge1xuICAgIHJldHVybiB0aGlzLmlzTW91c2VFbnRlcmVkO1xuICB9XG5cbiAgaGlkZGVuKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLmhpZGRlbjtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIHBvc2l0aW9uLFxuICAgICAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG4gICAgICBoaWRkZW4gPSB0cnVlLFxuICAgICAgaG92ZXIsXG4gICAgICB0cmlnZ2VyLFxuICAgICAgLyogZXNsaW50LWVuYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbiAgICAgIHRoZW1lLFxuICAgICAgdG9vbHRpcCxcbiAgICAgIGJvZHlTdHlsZSxcbiAgICAgIC4uLnByb3BzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgcG9wb3ZlckNsYXNzTmFtZXMgPSBjbGFzc25hbWVzKCdzbGRzLXBvcG92ZXInLCB7XG4gICAgICAnc2xkcy1oaWRlJzogdGhpcy5zdGF0ZS5oaWRkZW4sXG4gICAgICAnc2xkcy1wb3BvdmVyLS10b29sdGlwJzogdG9vbHRpcCxcbiAgICAgIFtgc2xkcy1udWJiaW4tLSR7cG9zaXRpb259YF06IHBvc2l0aW9uLFxuICAgICAgW2BzbGRzLXRoZW1lLS0ke3RoZW1lfWBdOiB0aGVtZSxcbiAgICB9KTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBvbk1vdXNlRW50ZXI9e3RoaXMub25Nb3VzZUVudGVyfVxuICAgICAgICBvbk1vdXNlTGVhdmU9e3RoaXMub25Nb3VzZUxlYXZlfVxuICAgICAgICBjbGFzc05hbWU9e3BvcG92ZXJDbGFzc05hbWVzfVxuICAgICAgICByb2xlPSdkaWFsb2cnXG4gICAgICAgIHsuLi5wcm9wc31cbiAgICAgID5cbiAgICAgICAgPFBvcG92ZXJCb2R5IHN0eWxlPXtib2R5U3R5bGV9PntjaGlsZHJlbn08L1BvcG92ZXJCb2R5PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19