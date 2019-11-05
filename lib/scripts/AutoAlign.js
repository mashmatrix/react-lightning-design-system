"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autoAlign = autoAlign;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactRelativePortal = _interopRequireDefault(require("react-relative-portal"));

function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

function getViewportRect() {
  var _ref = window || {},
      _ref$innerHeight = _ref.innerHeight,
      height = _ref$innerHeight === void 0 ? Infinity : _ref$innerHeight,
      _ref$innerWidth = _ref.innerWidth,
      width = _ref$innerWidth === void 0 ? Infinity : _ref$innerWidth;

  return {
    top: 0,
    left: 0,
    width: width,
    height: height
  };
}

function getCenterPoint(rect) {
  return {
    x: rect.left + 0.5 * rect.width,
    y: rect.top + 0.5 * rect.height
  };
}

function getPreferAlignment(rect) {
  var _getCenterPoint = getCenterPoint(rect),
      rx = _getCenterPoint.x,
      ry = _getCenterPoint.y;

  var _getCenterPoint2 = getCenterPoint(getViewportRect()),
      vx = _getCenterPoint2.x,
      vy = _getCenterPoint2.y;

  return {
    h: rx < vx ? 'left' : 'right',
    v: ry < vy ? 'top' : 'bottom'
  };
}

function calcAlignmentRect(target, rect, vertAlign, horizAlign) {
  return (0, _objectSpread2.default)({}, rect, {
    top: vertAlign === 'top' ? target.top + target.height : vertAlign === 'bottom' ? target.top - rect.height : vertAlign === 'bottom-absolute' ? getViewportRect().height - rect.height : 0,
    left: horizAlign === 'left' ? target.left : horizAlign === 'right' ? target.left + target.width - rect.width : vertAlign === 'right-absolute' ? getViewportRect().width - rect.height : 0
  });
}

function hasViewportIntersection(_ref2) {
  var top = _ref2.top,
      left = _ref2.left,
      width = _ref2.width,
      height = _ref2.height;

  var _getViewportRect = getViewportRect(),
      viewportWidth = _getViewportRect.width,
      viewportHeight = _getViewportRect.height;

  return top < 0 || top + height > viewportHeight || left < 0 || left + width > viewportWidth;
}

function isEqualRect(aRect, bRect) {
  return aRect.top === bRect.top && aRect.left === bRect.left && aRect.width === bRect.width && aRect.height === bRect.height;
}

function throttle(func, ms) {
  var last = 0;
  return function () {
    var now = Date.now();

    if (last + ms < now) {
      func.apply(void 0, arguments);
      last = now;
    }
  };
}

function ignoreFirstCall(func) {
  var called = false;
  return function () {
    if (called) {
      func.apply(void 0, arguments);
    }

    called = true;
  };
}

/**
 *
 */
function autoAlign(options) {
  var triggerSelector = options.triggerSelector;
  return function (Cmp) {
    var _class, _temp;

    return _temp = _class =
    /*#__PURE__*/
    function (_React$Component) {
      (0, _inherits2.default)(_class, _React$Component);

      function _class() {
        var _getPrototypeOf2;

        var _this;

        (0, _classCallCheck2.default)(this, _class);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(_class)).call.apply(_getPrototypeOf2, [this].concat(args)));
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "pid", null);
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "node", void 0);
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "content", void 0);
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "context", void 0);
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
          triggerRect: {
            top: 0,
            left: 0,
            width: 0,
            height: 0
          },
          horizAlign: 'left',
          vertAlign: 'top'
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "requestRecalcAlignment", throttle(
        /*#__PURE__*/
        (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee() {
          var pid, _arr, _i, ms;

          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  pid = (_this.pid || 0) + 1;
                  _this.pid = pid;
                  _arr = [0, 300, 400, 300, 200];
                  _i = 0;

                case 4:
                  if (!(_i < _arr.length)) {
                    _context.next = 14;
                    break;
                  }

                  ms = _arr[_i];
                  _context.next = 8;
                  return delay(ms);

                case 8:
                  if (!(_this.pid !== pid)) {
                    _context.next = 10;
                    break;
                  }

                  return _context.abrupt("return");

                case 10:
                  _this.recalcAlignment();

                case 11:
                  _i++;
                  _context.next = 4;
                  break;

                case 14:
                  _this.pid = 0;

                case 15:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        })), 100));
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "recalcAlignment", function () {
          if (_this.node) {
            var targetEl = _this.node;
            var matches = targetEl.matches || targetEl.matchesSelector || targetEl.msMatchesSelector;

            try {
              while (targetEl) {
                if (matches.call(targetEl, triggerSelector)) {
                  break;
                }

                targetEl = targetEl.parentNode;
              }
            } catch (e) {
              targetEl = null;
            } // eslint-disable-next-line react/destructuring-assignment


            var oldTriggerRect = _this.state.triggerRect;

            if (targetEl) {
              var _targetEl$getBounding = targetEl.getBoundingClientRect(),
                  top = _targetEl$getBounding.top,
                  left = _targetEl$getBounding.left,
                  width = _targetEl$getBounding.width,
                  height = _targetEl$getBounding.height;

              if (!isEqualRect(oldTriggerRect, {
                top: top,
                left: left,
                width: width,
                height: height
              })) {
                _this.updateAlignment({
                  top: top,
                  left: left,
                  width: width,
                  height: height
                });
              } else {
                _this.updateAlignment(oldTriggerRect);
              }
            } else {
              _this.updateAlignment(oldTriggerRect);
            }
          }
        });
        return _this;
      }

      (0, _createClass2.default)(_class, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.recalcAlignment();
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.pid = null;
          this.node = null;
          this.content = null;
        }
      }, {
        key: "updateAlignment",
        value: function updateAlignment(triggerRect) {
          if (this.content && this.content.node) {
            var _this$state = this.state,
                oldHorizAlign = _this$state.horizAlign,
                oldVertAlign = _this$state.vertAlign,
                oldTriggerRect = _this$state.triggerRect;

            var _this$content$node$ge = this.content.node.getBoundingClientRect(),
                width = _this$content$node$ge.width,
                height = _this$content$node$ge.height;

            var vertAlign = null;
            var horizAlign = null;
            var preferAlign = getPreferAlignment(triggerRect);
            var _arr2 = ['top', 'bottom', "".concat(preferAlign.v, "-absolute")];

            for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
              var vAlign = _arr2[_i2];
              var _arr3 = ['left', 'right', "".concat(preferAlign.h, "-absolute")];

              for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
                var hAlign = _arr3[_i3];
                var aRect = calcAlignmentRect(triggerRect, {
                  width: width,
                  height: height
                }, vAlign, hAlign);

                if (!hasViewportIntersection(aRect)) {
                  vertAlign = vAlign;
                  horizAlign = hAlign;
                  break;
                }
              }

              if (vertAlign !== null && horizAlign !== null) {
                break;
              }
            }

            vertAlign = vertAlign || 'top-absolute';
            horizAlign = horizAlign || 'left-absolute';

            if (vertAlign !== oldVertAlign || horizAlign !== oldHorizAlign) {
              this.setState({
                vertAlign: vertAlign,
                horizAlign: horizAlign,
                triggerRect: triggerRect
              });
            } else if (triggerRect.width !== oldTriggerRect.width || triggerRect.height !== oldTriggerRect.height || /absolute$/.test(vertAlign) || /absolute$/.test(horizAlign)) {
              this.setState({
                triggerRect: triggerRect
              });
            }
          }
        }
      }, {
        key: "render",
        value: function render() {
          var _this2 = this;

          var triggerRect = this.state.triggerRect;
          var _this$props = this.props,
              _this$props$align = _this$props.align,
              align = _this$props$align === void 0 ? this.state.horizAlign : _this$props$align,
              _this$props$vertAlign = _this$props.vertAlign,
              vertAlign = _this$props$vertAlign === void 0 ? this.state.vertAlign : _this$props$vertAlign,
              additionalPortalClassName = _this$props.portalClassName,
              _this$props$portalSty = _this$props.portalStyle,
              additionalPortalStyle = _this$props$portalSty === void 0 ? {} : _this$props$portalSty,
              preventPortalize = _this$props.preventPortalize,
              children = _this$props.children,
              pprops = (0, _objectWithoutProperties2.default)(_this$props, ["align", "vertAlign", "portalClassName", "portalStyle", "preventPortalize", "children"]);
          var _this$context = this.context,
              _this$context$portalC = _this$context.portalClassName,
              portalClassName = _this$context$portalC === void 0 ? 'slds-scope' : _this$context$portalC,
              _this$context$portalS = _this$context.portalStyle,
              portalStyle = _this$context$portalS === void 0 ? {
            position: 'absolute',
            top: 0,
            left: 0
          } : _this$context$portalS;
          var triggerTop = triggerRect.top,
              triggerLeft = triggerRect.left,
              triggerWidth = triggerRect.width,
              triggerHeight = triggerRect.height;

          var _getViewportRect2 = getViewportRect(),
              viewportWidth = _getViewportRect2.width,
              viewportHeight = _getViewportRect2.height;

          var offsetTop = vertAlign === 'bottom' ? -triggerHeight : vertAlign === 'top-absolute' ? -(triggerTop + triggerHeight) : vertAlign === 'bottom-absolute' ? viewportHeight - (triggerTop + triggerHeight) : 0;
          var offsetLeft = align === 'left-absolute' ? -triggerLeft : align === 'right-absolute' ? viewportWidth - (triggerLeft + triggerWidth) : 0;

          var content = _react.default.createElement(Cmp, (0, _extends2.default)({
            align: align.split('-')[0],
            vertAlign: vertAlign.split('-')[0],
            ref: function ref(cmp) {
              return _this2.content = cmp;
            }
          }, pprops), children);

          return preventPortalize || process.env.NODE_ENV === 'test' ? content : _react.default.createElement("div", {
            ref: function ref(node) {
              return _this2.node = node;
            }
          }, _react.default.createElement(_reactRelativePortal.default, {
            fullWidth: true,
            left: offsetLeft,
            right: -offsetLeft,
            top: offsetTop,
            onScroll: ignoreFirstCall(this.requestRecalcAlignment),
            component: "div",
            className: (0, _classnames.default)(portalClassName, additionalPortalClassName),
            style: (0, _objectSpread2.default)({}, portalStyle, additionalPortalStyle)
          }, content));
        }
      }]);
      return _class;
    }(_react.default.Component), (0, _defineProperty2.default)(_class, "contextTypes", {
      portalClassName: _propTypes.default.string,
      portalStyle: _propTypes.default.object // eslint-disable-line react/forbid-prop-types

    }), _temp;
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL0F1dG9BbGlnbi50c3giXSwibmFtZXMiOlsiZGVsYXkiLCJtcyIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCIsImdldFZpZXdwb3J0UmVjdCIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiaGVpZ2h0IiwiSW5maW5pdHkiLCJpbm5lcldpZHRoIiwid2lkdGgiLCJ0b3AiLCJsZWZ0IiwiZ2V0Q2VudGVyUG9pbnQiLCJyZWN0IiwieCIsInkiLCJnZXRQcmVmZXJBbGlnbm1lbnQiLCJyeCIsInJ5IiwidngiLCJ2eSIsImgiLCJ2IiwiY2FsY0FsaWdubWVudFJlY3QiLCJ0YXJnZXQiLCJ2ZXJ0QWxpZ24iLCJob3JpekFsaWduIiwiaGFzVmlld3BvcnRJbnRlcnNlY3Rpb24iLCJ2aWV3cG9ydFdpZHRoIiwidmlld3BvcnRIZWlnaHQiLCJpc0VxdWFsUmVjdCIsImFSZWN0IiwiYlJlY3QiLCJ0aHJvdHRsZSIsImZ1bmMiLCJsYXN0Iiwibm93IiwiRGF0ZSIsImlnbm9yZUZpcnN0Q2FsbCIsImNhbGxlZCIsImF1dG9BbGlnbiIsIm9wdGlvbnMiLCJ0cmlnZ2VyU2VsZWN0b3IiLCJDbXAiLCJ0cmlnZ2VyUmVjdCIsInBpZCIsInJlY2FsY0FsaWdubWVudCIsIm5vZGUiLCJ0YXJnZXRFbCIsIm1hdGNoZXMiLCJtYXRjaGVzU2VsZWN0b3IiLCJtc01hdGNoZXNTZWxlY3RvciIsImNhbGwiLCJwYXJlbnROb2RlIiwiZSIsIm9sZFRyaWdnZXJSZWN0Iiwic3RhdGUiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ1cGRhdGVBbGlnbm1lbnQiLCJjb250ZW50Iiwib2xkSG9yaXpBbGlnbiIsIm9sZFZlcnRBbGlnbiIsInByZWZlckFsaWduIiwidkFsaWduIiwiaEFsaWduIiwic2V0U3RhdGUiLCJ0ZXN0IiwicHJvcHMiLCJhbGlnbiIsImFkZGl0aW9uYWxQb3J0YWxDbGFzc05hbWUiLCJwb3J0YWxDbGFzc05hbWUiLCJwb3J0YWxTdHlsZSIsImFkZGl0aW9uYWxQb3J0YWxTdHlsZSIsInByZXZlbnRQb3J0YWxpemUiLCJjaGlsZHJlbiIsInBwcm9wcyIsImNvbnRleHQiLCJwb3NpdGlvbiIsInRyaWdnZXJUb3AiLCJ0cmlnZ2VyTGVmdCIsInRyaWdnZXJXaWR0aCIsInRyaWdnZXJIZWlnaHQiLCJvZmZzZXRUb3AiLCJvZmZzZXRMZWZ0Iiwic3BsaXQiLCJjbXAiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJyZXF1ZXN0UmVjYWxjQWxpZ25tZW50IiwiUmVhY3QiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUdBLFNBQVNBLEtBQVQsQ0FBZUMsRUFBZixFQUEyQjtBQUN6QixTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQWE7QUFDOUJDLElBQUFBLFVBQVUsQ0FBQ0QsT0FBRCxFQUFVRixFQUFWLENBQVY7QUFDRCxHQUZNLENBQVA7QUFHRDs7QUFFRCxTQUFTSSxlQUFULEdBQWlDO0FBQUEsYUFFN0JDLE1BQU0sSUFBSSxFQUZtQjtBQUFBLDhCQUN2QkMsV0FEdUI7QUFBQSxNQUNWQyxNQURVLGlDQUNEQyxRQURDO0FBQUEsNkJBQ1NDLFVBRFQ7QUFBQSxNQUNxQkMsS0FEckIsZ0NBQzZCRixRQUQ3Qjs7QUFHL0IsU0FBTztBQUFFRyxJQUFBQSxHQUFHLEVBQUUsQ0FBUDtBQUFVQyxJQUFBQSxJQUFJLEVBQUUsQ0FBaEI7QUFBbUJGLElBQUFBLEtBQUssRUFBTEEsS0FBbkI7QUFBMEJILElBQUFBLE1BQU0sRUFBTkE7QUFBMUIsR0FBUDtBQUNEOztBQVNELFNBQVNNLGNBQVQsQ0FBd0JDLElBQXhCLEVBQW9DO0FBQ2xDLFNBQU87QUFDTEMsSUFBQUEsQ0FBQyxFQUFFRCxJQUFJLENBQUNGLElBQUwsR0FBWSxNQUFNRSxJQUFJLENBQUNKLEtBRHJCO0FB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TUFKTixHQU1HRCxRQU5ILENBREY7O0FBVUEsaUJBQU9ELGdCQUFnQixJQUFJYSxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixNQUE3QyxHQUNMN0IsT0FESyxHQUdMO0FBQUssWUFBQSxHQUFHLEVBQUUsYUFBQ1osSUFBRDtBQUFBLHFCQUFXLE1BQUksQ0FBQ0EsSUFBTCxHQUFZQSxJQUF2QjtBQUFBO0FBQVYsYUFDRSw2QkFBQyw0QkFBRDtBQUNFLFlBQUEsU0FBUyxNQURYO0FBRUUsWUFBQSxJQUFJLEVBQUVvQyxVQUZSO0FBR0UsWUFBQSxLQUFLLEVBQUUsQ0FBQ0EsVUFIVjtBQUlFLFlBQUEsR0FBRyxFQUFFRCxTQUpQO0FBS0UsWUFBQSxRQUFRLEVBQUU1QyxlQUFlLENBQUMsS0FBS21ELHNCQUFOLENBTDNCO0FBTUUsWUFBQSxTQUFTLEVBQUMsS0FOWjtBQU9FLFlBQUEsU0FBUyxFQUFFLHlCQUFXbkIsZUFBWCxFQUE0QkQseUJBQTVCLENBUGI7QUFRRSxZQUFBLEtBQUssa0NBQU9FLFdBQVAsRUFBdUJDLHFCQUF2QjtBQVJQLGFBVUdiLE9BVkgsQ0FERixDQUhGO0FBa0JEO0FBMU1IO0FBQUE7QUFBQSxNQUFxQitCLGVBQU1DLFNBQTNCLHlEQWN3QjtBQUNwQnJCLE1BQUFBLGVBQWUsRUFBRXNCLG1CQUFVQyxNQURQO0FBRXBCdEIsTUFBQUEsV0FBVyxFQUFFcUIsbUJBQVVFLE1BRkgsQ0FFVzs7QUFGWCxLQWR4QjtBQTRNRCxHQWpORDtBQWtORCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnRUeXBlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IFJlbGF0aXZlUG9ydGFsIGZyb20gJ3JlYWN0LXJlbGF0aXZlLXBvcnRhbCc7XG5pbXBvcnQgeyBDb21wb25lbnRTZXR0aW5nc0NvbnRleHQgfSBmcm9tICcuL0NvbXBvbmVudFNldHRpbmdzJztcblxuZnVuY3Rpb24gZGVsYXkobXM6IG51bWJlcikge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFZpZXdwb3J0UmVjdCgpOiBSZWN0IHtcbiAgY29uc3QgeyBpbm5lckhlaWdodDogaGVpZ2h0ID0gSW5maW5pdHksIGlubmVyV2lkdGg6IHdpZHRoID0gSW5maW5pdHkgfSA9XG4gICAgd2luZG93IHx8IHt9O1xuICByZXR1cm4geyB0b3A6IDAsIGxlZnQ6IDAsIHdpZHRoLCBoZWlnaHQgfTtcbn1cblxudHlwZSBSZWN0ID0ge1xuICB0b3A6IG51bWJlcjtcbiAgbGVmdDogbnVtYmVyO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbn07XG5cbmZ1bmN0aW9uIGdldENlbnRlclBvaW50KHJlY3Q6IFJlY3QpIHtcbiAgcmV0dXJuIHtcbiAgICB4OiByZWN0LmxlZnQgKyAwLjUgKiByZWN0LndpZHRoLFxuICAgIHk6IHJlY3QudG9wICsgMC41ICogcmVjdC5oZWlnaHQsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFByZWZlckFsaWdubWVudChyZWN0OiBSZWN0KSB7XG4gIGNvbnN0IHsgeDogcngsIHk6IHJ5IH0gPSBnZXRDZW50ZXJQb2ludChyZWN0KTtcbiAgY29uc3QgeyB4OiB2eCwgeTogdnkgfSA9IGdldENlbnRlclBvaW50KGdldFZpZXdwb3J0UmVjdCgpKTtcbiAgcmV0dXJuIHtcbiAgICBoOiByeCA8IHZ4ID8gJ2xlZnQnIDogJ3JpZ2h0JyxcbiAgICB2OiByeSA8IHZ5ID8gJ3RvcCcgOiAnYm90dG9tJyxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY2FsY0FsaWdubWVudFJlY3QoXG4gIHRhcmdldDogUmVjdCxcbiAgcmVjdDogeyB3aWR0aDogbnVtYmVyOyBoZWlnaHQ6IG51bWJlciB9LFxuICB2ZXJ0QWxpZ246IHN0cmluZyxcbiAgaG9yaXpBbGlnbjogc3RyaW5nXG4pIHtcbiAgcmV0dXJuIHtcbiAgICAuLi5yZWN0LFxuICAgIHRvcDpcbiAgICAgIHZlcnRBbGlnbiA9PT0gJ3RvcCdcbiAgICAgICAgPyB0YXJnZXQudG9wICsgdGFyZ2V0LmhlaWdodFxuICAgICAgICA6IHZlcnRBbGlnbiA9PT0gJ2JvdHRvbSdcbiAgICAgICAgPyB0YXJnZXQudG9wIC0gcmVjdC5oZWlnaHRcbiAgICAgICAgOiB2ZXJ0QWxpZ24gPT09ICdib3R0b20tYWJzb2x1dGUnXG4gICAgICAgID8gZ2V0Vmlld3BvcnRSZWN0KCkuaGVpZ2h0IC0gcmVjdC5oZWlnaHRcbiAgICAgICAgOiAwLFxuICAgIGxlZnQ6XG4gICAgICBob3JpekFsaWduID09PSAnbGVmdCdcbiAgICAgICAgPyB0YXJnZXQubGVmdFxuICAgICAgICA6IGhvcml6QWxpZ24gPT09ICdyaWdodCdcbiAgICAgICAgPyB0YXJnZXQubGVmdCArIHRhcmdldC53aWR0aCAtIHJlY3Qud2lkdGhcbiAgICAgICAgOiB2ZXJ0QWxpZ24gPT09ICdyaWdodC1hYnNvbHV0ZSdcbiAgICAgICAgPyBnZXRWaWV3cG9ydFJlY3QoKS53aWR0aCAtIHJlY3QuaGVpZ2h0XG4gICAgICAgIDogMCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gaGFzVmlld3BvcnRJbnRlcnNlY3Rpb24oeyB0b3AsIGxlZnQsIHdpZHRoLCBoZWlnaHQgfTogUmVjdCkge1xuICBjb25zdCB7IHdpZHRoOiB2aWV3cG9ydFdpZHRoLCBoZWlnaHQ6IHZpZXdwb3J0SGVpZ2h0IH0gPSBnZXRWaWV3cG9ydFJlY3QoKTtcbiAgcmV0dXJuIChcbiAgICB0b3AgPCAwIHx8XG4gICAgdG9wICsgaGVpZ2h0ID4gdmlld3BvcnRIZWlnaHQgfHxcbiAgICBsZWZ0IDwgMCB8fFxuICAgIGxlZnQgKyB3aWR0aCA+IHZpZXdwb3J0V2lkdGhcbiAgKTtcbn1cblxuZnVuY3Rpb24gaXNFcXVhbFJlY3QoYVJlY3Q6IFJlY3QsIGJSZWN0OiBSZWN0KSB7XG4gIHJldHVybiAoXG4gICAgYVJlY3QudG9wID09PSBiUmVjdC50b3AgJiZcbiAgICBhUmVjdC5sZWZ0ID09PSBiUmVjdC5sZWZ0ICYmXG4gICAgYVJlY3Qud2lkdGggPT09IGJSZWN0LndpZHRoICYmXG4gICAgYVJlY3QuaGVpZ2h0ID09PSBiUmVjdC5oZWlnaHRcbiAgKTtcbn1cblxuZnVuY3Rpb24gdGhyb3R0bGUoZnVuYzogRnVuY3Rpb24sIG1zOiBudW1iZXIpIHtcbiAgbGV0IGxhc3QgPSAwO1xuICByZXR1cm4gKC4uLmFyZ3M6IGFueSkgPT4ge1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgaWYgKGxhc3QgKyBtcyA8IG5vdykge1xuICAgICAgZnVuYyguLi5hcmdzKTtcbiAgICAgIGxhc3QgPSBub3c7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBpZ25vcmVGaXJzdENhbGwoZnVuYzogRnVuY3Rpb24pIHtcbiAgbGV0IGNhbGxlZCA9IGZhbHNlO1xuICByZXR1cm4gKC4uLmFyZ3M6IGFueSkgPT4ge1xuICAgIGlmIChjYWxsZWQpIHtcbiAgICAgIGZ1bmMoLi4uYXJncyk7XG4gICAgfVxuICAgIGNhbGxlZCA9IHRydWU7XG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIEF1dG9BbGlnbk9wdGlvbnMgPSB7XG4gIHRyaWdnZXJTZWxlY3Rvcjogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgQXV0b0FsaWduUHJvcHMgPSB7XG4gIHBvcnRhbENsYXNzTmFtZT86IHN0cmluZztcbiAgcG9ydGFsU3R5bGU/OiBvYmplY3Q7XG4gIHNpemU/OiAnc21hbGwnIHwgJ21lZGl1bScgfCAnbGFyZ2UnO1xuICBwcmV2ZW50UG9ydGFsaXplPzogYm9vbGVhbjtcbn0gJiBQYXJ0aWFsPEluamVjdGVkUHJvcHM+O1xuXG5leHBvcnQgdHlwZSBJbmplY3RlZFByb3BzID0ge1xuICBhbGlnbjogJ2xlZnQnIHwgJ3JpZ2h0JztcbiAgdmVydEFsaWduOiAndG9wJyB8ICdib3R0b20nO1xufTtcblxuZXhwb3J0IHR5cGUgQXV0b0FsaWduU3RhdGUgPSB7XG4gIHRyaWdnZXJSZWN0OiBSZWN0O1xuICBob3JpekFsaWduOiBzdHJpbmc7XG4gIHZlcnRBbGlnbjogc3RyaW5nO1xufTtcblxuLyoqXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXV0b0FsaWduKG9wdGlvbnM6IEF1dG9BbGlnbk9wdGlvbnMpIHtcbiAgY29uc3QgeyB0cmlnZ2VyU2VsZWN0b3IgfSA9IG9wdGlvbnM7XG5cbiAgcmV0dXJuIDxUT3JpZ2luYWxQcm9wcyBleHRlbmRzIHt9PihcbiAgICBDbXA6IENvbXBvbmVudFR5cGU8VE9yaWdpbmFsUHJvcHMgJiBJbmplY3RlZFByb3BzPlxuICApID0+IHtcbiAgICB0eXBlIFJlc3VsdFByb3BzID0gVE9yaWdpbmFsUHJvcHMgJiBBdXRvQWxpZ25Qcm9wcztcblxuICAgIHJldHVybiBjbGFzcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxSZXN1bHRQcm9wcywgQXV0b0FsaWduU3RhdGU+IHtcbiAgICAgIHBpZDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3NvcnQtY29tcCAqL1xuICAgICAgbm9kZTogYW55O1xuXG4gICAgICBjb250ZW50OiBhbnk7XG4gICAgICAvKiBlc2xpbnQtZW5hYmxlIHJlYWN0L3NvcnQtY29tcCAqL1xuXG4gICAgICBjb250ZXh0ITogUGljazxcbiAgICAgICAgQ29tcG9uZW50U2V0dGluZ3NDb250ZXh0LFxuICAgICAgICAncG9ydGFsQ2xhc3NOYW1lJyB8ICdwb3J0YWxTdHlsZSdcbiAgICAgID47XG5cbiAgICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XG4gICAgICAgIHBvcnRhbENsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgcG9ydGFsU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXNcbiAgICAgIH07XG5cbiAgICAgIHN0YXRlOiBBdXRvQWxpZ25TdGF0ZSA9IHtcbiAgICAgICAgdHJpZ2dlclJlY3Q6IHsgdG9wOiAwLCBsZWZ0OiAwLCB3aWR0aDogMCwgaGVpZ2h0OiAwIH0sXG4gICAgICAgIGhvcml6QWxpZ246ICdsZWZ0JyxcbiAgICAgICAgdmVydEFsaWduOiAndG9wJyxcbiAgICAgIH07XG5cbiAgICAgIHJlcXVlc3RSZWNhbGNBbGlnbm1lbnQgPSB0aHJvdHRsZShhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBpZCA9ICh0aGlzLnBpZCB8fCAwKSArIDE7XG4gICAgICAgIHRoaXMucGlkID0gcGlkO1xuICAgICAgICBmb3IgKGNvbnN0IG1zIG9mIFswLCAzMDAsIDQwMCwgMzAwLCAyMDBdKSB7XG4gICAgICAgICAgYXdhaXQgZGVsYXkobXMpO1xuICAgICAgICAgIGlmICh0aGlzLnBpZCAhPT0gcGlkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMucmVjYWxjQWxpZ25tZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5waWQgPSAwO1xuICAgICAgfSwgMTAwKTtcblxuICAgICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucmVjYWxjQWxpZ25tZW50KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnBpZCA9IG51bGw7XG4gICAgICAgIHRoaXMubm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udGVudCA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJlY2FsY0FsaWdubWVudCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubm9kZSkge1xuICAgICAgICAgIGxldCB0YXJnZXRFbCA9IHRoaXMubm9kZTtcbiAgICAgICAgICBjb25zdCBtYXRjaGVzID1cbiAgICAgICAgICAgIHRhcmdldEVsLm1hdGNoZXMgfHxcbiAgICAgICAgICAgIHRhcmdldEVsLm1hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgdGFyZ2V0RWwubXNNYXRjaGVzU2VsZWN0b3I7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHdoaWxlICh0YXJnZXRFbCkge1xuICAgICAgICAgICAgICBpZiAobWF0Y2hlcy5jYWxsKHRhcmdldEVsLCB0cmlnZ2VyU2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGFyZ2V0RWwgPSB0YXJnZXRFbC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRhcmdldEVsID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L2Rlc3RydWN0dXJpbmctYXNzaWdubWVudFxuICAgICAgICAgIGNvbnN0IG9sZFRyaWdnZXJSZWN0ID0gdGhpcy5zdGF0ZS50cmlnZ2VyUmVjdDtcbiAgICAgICAgICBpZiAodGFyZ2V0RWwpIHtcbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgdG9wLFxuICAgICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgfSA9IHRhcmdldEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgaWYgKCFpc0VxdWFsUmVjdChvbGRUcmlnZ2VyUmVjdCwgeyB0b3AsIGxlZnQsIHdpZHRoLCBoZWlnaHQgfSkpIHtcbiAgICAgICAgICAgICAgdGhpcy51cGRhdGVBbGlnbm1lbnQoeyB0b3AsIGxlZnQsIHdpZHRoLCBoZWlnaHQgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUFsaWdubWVudChvbGRUcmlnZ2VyUmVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQWxpZ25tZW50KG9sZFRyaWdnZXJSZWN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHVwZGF0ZUFsaWdubWVudCh0cmlnZ2VyUmVjdDogUmVjdCkge1xuICAgICAgICBpZiAodGhpcy5jb250ZW50ICYmIHRoaXMuY29udGVudC5ub2RlKSB7XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgaG9yaXpBbGlnbjogb2xkSG9yaXpBbGlnbixcbiAgICAgICAgICAgIHZlcnRBbGlnbjogb2xkVmVydEFsaWduLFxuICAgICAgICAgICAgdHJpZ2dlclJlY3Q6IG9sZFRyaWdnZXJSZWN0LFxuICAgICAgICAgIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5jb250ZW50Lm5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgbGV0IHZlcnRBbGlnbiA9IG51bGw7XG4gICAgICAgICAgbGV0IGhvcml6QWxpZ24gPSBudWxsO1xuICAgICAgICAgIGNvbnN0IHByZWZlckFsaWduID0gZ2V0UHJlZmVyQWxpZ25tZW50KHRyaWdnZXJSZWN0KTtcbiAgICAgICAgICBmb3IgKGNvbnN0IHZBbGlnbiBvZiBbJ3RvcCcsICdib3R0b20nLCBgJHtwcmVmZXJBbGlnbi52fS1hYnNvbHV0ZWBdKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGhBbGlnbiBvZiBbXG4gICAgICAgICAgICAgICdsZWZ0JyxcbiAgICAgICAgICAgICAgJ3JpZ2h0JyxcbiAgICAgICAgICAgICAgYCR7cHJlZmVyQWxpZ24uaH0tYWJzb2x1dGVgLFxuICAgICAgICAgICAgXSkge1xuICAgICAgICAgICAgICBjb25zdCBhUmVjdCA9IGNhbGNBbGlnbm1lbnRSZWN0KFxuICAgICAgICAgICAgICAgIHRyaWdnZXJSZWN0LFxuICAgICAgICAgICAgICAgIHsgd2lkdGgsIGhlaWdodCB9LFxuICAgICAgICAgICAgICAgIHZBbGlnbixcbiAgICAgICAgICAgICAgICBoQWxpZ25cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgaWYgKCFoYXNWaWV3cG9ydEludGVyc2VjdGlvbihhUmVjdCkpIHtcbiAgICAgICAgICAgICAgICB2ZXJ0QWxpZ24gPSB2QWxpZ247XG4gICAgICAgICAgICAgICAgaG9yaXpBbGlnbiA9IGhBbGlnbjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZlcnRBbGlnbiAhPT0gbnVsbCAmJiBob3JpekFsaWduICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB2ZXJ0QWxpZ24gPSB2ZXJ0QWxpZ24gfHwgJ3RvcC1hYnNvbHV0ZSc7XG4gICAgICAgICAgaG9yaXpBbGlnbiA9IGhvcml6QWxpZ24gfHwgJ2xlZnQtYWJzb2x1dGUnO1xuICAgICAgICAgIGlmICh2ZXJ0QWxpZ24gIT09IG9sZFZlcnRBbGlnbiB8fCBob3JpekFsaWduICE9PSBvbGRIb3JpekFsaWduKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmVydEFsaWduLCBob3JpekFsaWduLCB0cmlnZ2VyUmVjdCB9KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdHJpZ2dlclJlY3Qud2lkdGggIT09IG9sZFRyaWdnZXJSZWN0LndpZHRoIHx8XG4gICAgICAgICAgICB0cmlnZ2VyUmVjdC5oZWlnaHQgIT09IG9sZFRyaWdnZXJSZWN0LmhlaWdodCB8fFxuICAgICAgICAgICAgL2Fic29sdXRlJC8udGVzdCh2ZXJ0QWxpZ24pIHx8XG4gICAgICAgICAgICAvYWJzb2x1dGUkLy50ZXN0KGhvcml6QWxpZ24pXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdHJpZ2dlclJlY3QgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyB0cmlnZ2VyUmVjdCB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9kZXN0cnVjdHVyaW5nLWFzc2lnbm1lbnRcbiAgICAgICAgICBhbGlnbiA9IHRoaXMuc3RhdGUuaG9yaXpBbGlnbixcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QvZGVzdHJ1Y3R1cmluZy1hc3NpZ25tZW50XG4gICAgICAgICAgdmVydEFsaWduID0gdGhpcy5zdGF0ZS52ZXJ0QWxpZ24sXG4gICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lOiBhZGRpdGlvbmFsUG9ydGFsQ2xhc3NOYW1lLFxuICAgICAgICAgIHBvcnRhbFN0eWxlOiBhZGRpdGlvbmFsUG9ydGFsU3R5bGUgPSB7fSxcbiAgICAgICAgICBwcmV2ZW50UG9ydGFsaXplLFxuICAgICAgICAgIGNoaWxkcmVuLFxuICAgICAgICAgIC4uLnBwcm9wc1xuICAgICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHBvcnRhbENsYXNzTmFtZSA9ICdzbGRzLXNjb3BlJyxcbiAgICAgICAgICBwb3J0YWxTdHlsZSA9IHsgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogMCwgbGVmdDogMCB9LFxuICAgICAgICB9ID0gdGhpcy5jb250ZXh0O1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgdG9wOiB0cmlnZ2VyVG9wLFxuICAgICAgICAgIGxlZnQ6IHRyaWdnZXJMZWZ0LFxuICAgICAgICAgIHdpZHRoOiB0cmlnZ2VyV2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiB0cmlnZ2VySGVpZ2h0LFxuICAgICAgICB9ID0gdHJpZ2dlclJlY3Q7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICB3aWR0aDogdmlld3BvcnRXaWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IHZpZXdwb3J0SGVpZ2h0LFxuICAgICAgICB9ID0gZ2V0Vmlld3BvcnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IG9mZnNldFRvcCA9XG4gICAgICAgICAgdmVydEFsaWduID09PSAnYm90dG9tJ1xuICAgICAgICAgICAgPyAtdHJpZ2dlckhlaWdodFxuICAgICAgICAgICAgOiB2ZXJ0QWxpZ24gPT09ICd0b3AtYWJzb2x1dGUnXG4gICAgICAgICAgICA/IC0odHJpZ2dlclRvcCArIHRyaWdnZXJIZWlnaHQpXG4gICAgICAgICAgICA6IHZlcnRBbGlnbiA9PT0gJ2JvdHRvbS1hYnNvbHV0ZSdcbiAgICAgICAgICAgID8gdmlld3BvcnRIZWlnaHQgLSAodHJpZ2dlclRvcCArIHRyaWdnZXJIZWlnaHQpXG4gICAgICAgICAgICA6IDA7XG4gICAgICAgIGNvbnN0IG9mZnNldExlZnQgPVxuICAgICAgICAgIGFsaWduID09PSAnbGVmdC1hYnNvbHV0ZSdcbiAgICAgICAgICAgID8gLXRyaWdnZXJMZWZ0XG4gICAgICAgICAgICA6IGFsaWduID09PSAncmlnaHQtYWJzb2x1dGUnXG4gICAgICAgICAgICA/IHZpZXdwb3J0V2lkdGggLSAodHJpZ2dlckxlZnQgKyB0cmlnZ2VyV2lkdGgpXG4gICAgICAgICAgICA6IDA7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSAoXG4gICAgICAgICAgPENtcFxuICAgICAgICAgICAgYWxpZ249e2FsaWduLnNwbGl0KCctJylbMF0gYXMgSW5qZWN0ZWRQcm9wc1snYWxpZ24nXX1cbiAgICAgICAgICAgIHZlcnRBbGlnbj17dmVydEFsaWduLnNwbGl0KCctJylbMF0gYXMgSW5qZWN0ZWRQcm9wc1sndmVydEFsaWduJ119XG4gICAgICAgICAgICByZWY9eyhjbXA6IGFueSkgPT4gKHRoaXMuY29udGVudCA9IGNtcCl9XG4gICAgICAgICAgICB7Li4ucHByb3BzIGFzIFRPcmlnaW5hbFByb3BzfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICA8L0NtcD5cbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHByZXZlbnRQb3J0YWxpemUgfHwgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICd0ZXN0JyA/IChcbiAgICAgICAgICBjb250ZW50XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPGRpdiByZWY9eyhub2RlKSA9PiAodGhpcy5ub2RlID0gbm9kZSl9PlxuICAgICAgICAgICAgPFJlbGF0aXZlUG9ydGFsXG4gICAgICAgICAgICAgIGZ1bGxXaWR0aFxuICAgICAgICAgICAgICBsZWZ0PXtvZmZzZXRMZWZ0fVxuICAgICAgICAgICAgICByaWdodD17LW9mZnNldExlZnR9XG4gICAgICAgICAgICAgIHRvcD17b2Zmc2V0VG9wfVxuICAgICAgICAgICAgICBvblNjcm9sbD17aWdub3JlRmlyc3RDYWxsKHRoaXMucmVxdWVzdFJlY2FsY0FsaWdubWVudCl9XG4gICAgICAgICAgICAgIGNvbXBvbmVudD0nZGl2J1xuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMocG9ydGFsQ2xhc3NOYW1lLCBhZGRpdGlvbmFsUG9ydGFsQ2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgc3R5bGU9e3sgLi4ucG9ydGFsU3R5bGUsIC4uLmFkZGl0aW9uYWxQb3J0YWxTdHlsZSB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7Y29udGVudH1cbiAgICAgICAgICAgIDwvUmVsYXRpdmVQb3J0YWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbn1cbiJdfQ==