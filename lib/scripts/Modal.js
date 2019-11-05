"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = exports.ModalFooter = exports.ModalContent = exports.ModalHeader = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

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

var _Button = require("./Button");

var ModalHeader =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ModalHeader, _Component);

  function ModalHeader(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ModalHeader);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ModalHeader).call(this, props));
    _this.onClose = _this.onClose.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(ModalHeader, [{
    key: "onClose",
    value: function onClose() {
      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          title = _this$props.title,
          tagline = _this$props.tagline,
          closeButton = _this$props.closeButton,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["className", "title", "tagline", "closeButton"]);
      delete props.onClose;
      var hdClassNames = (0, _classnames.default)(className, 'slds-modal__header');
      return _react.default.createElement("div", (0, _extends2.default)({
        className: hdClassNames
      }, props), _react.default.createElement("h2", {
        className: "slds-text-heading--medium"
      }, title), tagline ? _react.default.createElement("p", {
        className: "slds-m-top--x-small"
      }, tagline) : null, closeButton ? _react.default.createElement(_Button.Button, {
        className: "slds-modal__close",
        icon: "close",
        iconSize: "large",
        alt: "Close",
        inverse: true,
        onClick: this.onClose
      }) : null);
    }
  }]);
  return ModalHeader;
}(_react.Component);

exports.ModalHeader = ModalHeader;

var ModalContent = function ModalContent(_ref) {
  var className = _ref.className,
      children = _ref.children,
      props = (0, _objectWithoutProperties2.default)(_ref, ["className", "children"]);
  var ctClassNames = (0, _classnames.default)(className, 'slds-modal__content');
  return _react.default.createElement("div", (0, _extends2.default)({
    className: ctClassNames
  }, props), children);
};

exports.ModalContent = ModalContent;

var ModalFooter = function ModalFooter(_ref2) {
  var className = _ref2.className,
      directional = _ref2.directional,
      children = _ref2.children,
      props = (0, _objectWithoutProperties2.default)(_ref2, ["className", "directional", "children"]);
  var ftClassNames = (0, _classnames.default)(className, 'slds-modal__footer', {
    'slds-modal__footer--directional': directional
  });
  return _react.default.createElement("div", (0, _extends2.default)({
    className: ftClassNames
  }, props), children);
};

exports.ModalFooter = ModalFooter;

var Modal =
/*#__PURE__*/
function (_Component2) {
  (0, _inherits2.default)(Modal, _Component2);

  function Modal(props) {
    var _this2;

    (0, _classCallCheck2.default)(this, Modal);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Modal).call(this, props));
    _this2.renderChildComponent = _this2.renderChildComponent.bind((0, _assertThisInitialized2.default)(_this2));
    return _this2;
  }

  (0, _createClass2.default)(Modal, [{
    key: "hide",
    value: function hide() {
      if (this.props.onHide) {
        this.props.onHide();
      }
    }
  }, {
    key: "renderChildComponent",
    value: function renderChildComponent(comp) {
      if (comp.type === ModalHeader) {
        return _react.default.cloneElement(comp, {
          onClose: this.hide.bind(this)
        });
      }

      return comp;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          opened = _this$props2.opened,
          children = _this$props2.children,
          size = _this$props2.size,
          containerStyle = _this$props2.containerStyle,
          props = (0, _objectWithoutProperties2.default)(_this$props2, ["className", "opened", "children", "size", "containerStyle"]);
      delete props.onHide;
      var modalClassNames = (0, _classnames.default)(className, 'slds-modal', {
        'slds-fade-in-open': opened,
        'slds-modal--large': size === 'large'
      });
      var backdropClassNames = (0, _classnames.default)(className, 'slds-modal-backdrop', {
        'slds-modal-backdrop--open': opened
      });
      return _react.default.createElement("div", null, _react.default.createElement("div", (0, _extends2.default)({
        className: modalClassNames,
        "aria-hidden": !opened,
        role: "dialog"
      }, props), _react.default.createElement("div", {
        className: "slds-modal__container",
        style: containerStyle
      }, _react.default.Children.map(children, this.renderChildComponent))), _react.default.createElement("div", {
        className: backdropClassNames
      }));
    }
  }]);
  return Modal;
}(_react.Component);

exports.Modal = Modal;
(0, _defineProperty2.default)(Modal, "Header", ModalHeader);
(0, _defineProperty2.default)(Modal, "Content", ModalContent);
(0, _defineProperty2.default)(Modal, "Footer", ModalFooter);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL01vZGFsLnRzeCJdLCJuYW1lcyI6WyJNb2RhbEhlYWRlciIsInByb3BzIiwib25DbG9zZSIsImJpbmQiLCJjbGFzc05hbWUiLCJ0aXRsZSIsInRhZ2xpbmUiLCJjbG9zZUJ1dHRvbiIsImhkQ2xhc3NOYW1lcyIsIkNvbXBvbmVudCIsIk1vZGFsQ29udGVudCIsImNoaWxkcmVuIiwiY3RDbGFzc05hbWVzIiwiTW9kYWxGb290ZXIiLCJkaXJlY3Rpb25hbCIsImZ0Q2xhc3NOYW1lcyIsIk1vZGFsIiwicmVuZGVyQ2hpbGRDb21wb25lbnQiLCJvbkhpZGUiLCJjb21wIiwidHlwZSIsIlJlYWN0IiwiY2xvbmVFbGVtZW50IiwiaGlkZSIsIm9wZW5lZCIsInNpemUiLCJjb250YWluZXJTdHlsZSIsIm1vZGFsQ2xhc3NOYW1lcyIsImJhY2tkcm9wQ2xhc3NOYW1lcyIsIkNoaWxkcmVuIiwibWFwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztJQVVhQSxXOzs7OztBQUNYLHVCQUFZQyxLQUFaLEVBQStDO0FBQUE7O0FBQUE7QUFDN0MsaUhBQU1BLEtBQU47QUFFQSxVQUFLQyxPQUFMLEdBQWUsTUFBS0EsT0FBTCxDQUFhQyxJQUFiLDZDQUFmO0FBSDZDO0FBSTlDOzs7OzhCQUVTO0FBQ1IsVUFBSSxLQUFLRixLQUFMLENBQVdDLE9BQWYsRUFBd0I7QUFDdEIsYUFBS0QsS0FBTCxDQUFXQyxPQUFYO0FBQ0Q7QUFDRjs7OzZCQUVRO0FBQUEsd0JBQ3NELEtBQUtELEtBRDNEO0FBQUEsVUFDQ0csU0FERCxlQUNDQSxTQUREO0FBQUEsVUFDWUMsS0FEWixlQUNZQSxLQURaO0FBQUEsVUFDbUJDLE9BRG5CLGVBQ21CQSxPQURuQjtBQUFBLFVBQzRCQyxXQUQ1QixlQUM0QkEsV0FENUI7QUFBQSxVQUM0Q04sS0FENUM7QUFFUCxhQUFPQSxLQUFLLENBQUNDLE9BQWI7QUFDQSxV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QUN0RSxxQ0FBNkJvQjtBQUR5QyxPQUE3QyxDQUEzQjtBQUdBLGFBQ0UsMENBQ0U7QUFDRSxRQUFBLFNBQVMsRUFBRUcsZUFEYjtBQUVFLHVCQUFhLENBQUNILE1BRmhCO0FBR0UsUUFBQSxJQUFJLEVBQUM7QUFIUCxTQUlNdkIsS0FKTixHQU1FO0FBQUssUUFBQSxTQUFTLEVBQUMsdUJBQWY7QUFBdUMsUUFBQSxLQUFLLEVBQUV5QjtBQUE5QyxTQUNHTCxlQUFNUSxRQUFOLENBQWVDLEdBQWYsQ0FBbUJuQixRQUFuQixFQUE2QixLQUFLTSxvQkFBbEMsQ0FESCxDQU5GLENBREYsRUFXRTtBQUFLLFFBQUEsU0FBUyxFQUFFVztBQUFoQixRQVhGLENBREY7QUFlRDs7O0VBMUR3Qm5CLGdCOzs7OEJBQWRPLEssWUFDS2hCLFc7OEJBRExnQixLLGFBR01OLFk7OEJBSE5NLEssWUFLS0gsVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4vQnV0dG9uJztcblxuZXhwb3J0IHR5cGUgTW9kYWxIZWFkZXJQcm9wcyA9IHtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICB0aXRsZT86IHN0cmluZztcbiAgdGFnbGluZT86IHN0cmluZztcbiAgY2xvc2VCdXR0b24/OiBib29sZWFuO1xuICBvbkNsb3NlPzogKCkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCBjbGFzcyBNb2RhbEhlYWRlciBleHRlbmRzIENvbXBvbmVudDxNb2RhbEhlYWRlclByb3BzPiB7XG4gIGNvbnN0cnVjdG9yKHByb3BzOiBSZWFkb25seTxNb2RhbEhlYWRlclByb3BzPikge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMub25DbG9zZSA9IHRoaXMub25DbG9zZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25DbG9zZSgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNsb3NlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjbGFzc05hbWUsIHRpdGxlLCB0YWdsaW5lLCBjbG9zZUJ1dHRvbiwgLi4ucHJvcHMgfSA9IHRoaXMucHJvcHM7XG4gICAgZGVsZXRlIHByb3BzLm9uQ2xvc2U7XG4gICAgY29uc3QgaGRDbGFzc05hbWVzID0gY2xhc3NuYW1lcyhjbGFzc05hbWUsICdzbGRzLW1vZGFsX19oZWFkZXInKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2hkQ2xhc3NOYW1lc30gey4uLnByb3BzfT5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT0nc2xkcy10ZXh0LWhlYWRpbmctLW1lZGl1bSc+e3RpdGxlfTwvaDI+XG4gICAgICAgIHt0YWdsaW5lID8gPHAgY2xhc3NOYW1lPSdzbGRzLW0tdG9wLS14LXNtYWxsJz57dGFnbGluZX08L3A+IDogbnVsbH1cbiAgICAgICAge2Nsb3NlQnV0dG9uID8gKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGNsYXNzTmFtZT0nc2xkcy1tb2RhbF9fY2xvc2UnXG4gICAgICAgICAgICBpY29uPSdjbG9zZSdcbiAgICAgICAgICAgIGljb25TaXplPSdsYXJnZSdcbiAgICAgICAgICAgIGFsdD0nQ2xvc2UnXG4gICAgICAgICAgICBpbnZlcnNlXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2xvc2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIE1vZGFsQ29udGVudFByb3BzID0ge1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY29uc3QgTW9kYWxDb250ZW50OiBSZWFjdC5GQzxNb2RhbENvbnRlbnRQcm9wcz4gPSAoe1xuICBjbGFzc05hbWUsXG4gIGNoaWxkcmVuLFxuICAuLi5wcm9wc1xufSkgPT4ge1xuICBjb25zdCBjdENsYXNzTmFtZXMgPSBjbGFzc25hbWVzKGNsYXNzTmFtZSwgJ3NsZHMtbW9kYWxfX2NvbnRlbnQnKTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y3RDbGFzc05hbWVzfSB7Li4ucHJvcHN9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IHR5cGUgTW9kYWxGb290ZXJQcm9wcyA9IHtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBkaXJlY3Rpb25hbD86IGJvb2xlYW47XG59O1xuXG5leHBvcnQgY29uc3QgTW9kYWxGb290ZXI6IFJlYWN0LkZDPE1vZGFsRm9vdGVyUHJvcHM+ID0gKHtcbiAgY2xhc3NOYW1lLFxuICBkaXJlY3Rpb25hbCxcbiAgY2hpbGRyZW4sXG4gIC4uLnByb3BzXG59KSA9PiB7XG4gIGNvbnN0IGZ0Q2xhc3NOYW1lcyA9IGNsYXNzbmFtZXMoY2xhc3NOYW1lLCAnc2xkcy1tb2RhbF9fZm9vdGVyJywge1xuICAgICdzbGRzLW1vZGFsX19mb290ZXItLWRpcmVjdGlvbmFsJzogZGlyZWN0aW9uYWwsXG4gIH0pO1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtmdENsYXNzTmFtZXN9IHsuLi5wcm9wc30+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgdHlwZSBNb2RhbFNpemUgPSAnbGFyZ2UnO1xuXG5leHBvcnQgdHlwZSBNb2RhbFByb3BzID0ge1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIHNpemU/OiBNb2RhbFNpemU7XG4gIG9wZW5lZD86IGJvb2xlYW47XG4gIGNvbnRhaW5lclN0eWxlPzogb2JqZWN0O1xuICBvbkhpZGU/OiAoKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IGNsYXNzIE1vZGFsIGV4dGVuZHMgQ29tcG9uZW50PE1vZGFsUHJvcHM+IHtcbiAgc3RhdGljIEhlYWRlciA9IE1vZGFsSGVhZGVyO1xuXG4gIHN0YXRpYyBDb250ZW50ID0gTW9kYWxDb250ZW50O1xuXG4gIHN0YXRpYyBGb290ZXIgPSBNb2RhbEZvb3RlcjtcblxuICBjb25zdHJ1Y3Rvcihwcm9wczogUmVhZG9ubHk8TW9kYWxQcm9wcz4pIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnJlbmRlckNoaWxkQ29tcG9uZW50ID0gdGhpcy5yZW5kZXJDaGlsZENvbXBvbmVudC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgaGlkZSgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkhpZGUpIHtcbiAgICAgIHRoaXMucHJvcHMub25IaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyQ2hpbGRDb21wb25lbnQoY29tcDogYW55KSB7XG4gICAgaWYgKGNvbXAudHlwZSA9PT0gTW9kYWxIZWFkZXIpIHtcbiAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY29tcCwgeyBvbkNsb3NlOiB0aGlzLmhpZGUuYmluZCh0aGlzKSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXA7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY2xhc3NOYW1lLFxuICAgICAgb3BlbmVkLFxuICAgICAgY2hpbGRyZW4sXG4gICAgICBzaXplLFxuICAgICAgY29udGFpbmVyU3R5bGUsXG4gICAgICAuLi5wcm9wc1xuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGRlbGV0ZSBwcm9wcy5vbkhpZGU7XG4gICAgY29uc3QgbW9kYWxDbGFzc05hbWVzID0gY2xhc3NuYW1lcyhjbGFzc05hbWUsICdzbGRzLW1vZGFsJywge1xuICAgICAgJ3NsZHMtZmFkZS1pbi1vcGVuJzogb3BlbmVkLFxuICAgICAgJ3NsZHMtbW9kYWwtLWxhcmdlJzogc2l6ZSA9PT0gJ2xhcmdlJyxcbiAgICB9KTtcbiAgICBjb25zdCBiYWNrZHJvcENsYXNzTmFtZXMgPSBjbGFzc25hbWVzKGNsYXNzTmFtZSwgJ3NsZHMtbW9kYWwtYmFja2Ryb3AnLCB7XG4gICAgICAnc2xkcy1tb2RhbC1iYWNrZHJvcC0tb3Blbic6IG9wZW5lZCxcbiAgICB9KTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17bW9kYWxDbGFzc05hbWVzfVxuICAgICAgICAgIGFyaWEtaGlkZGVuPXshb3BlbmVkfVxuICAgICAgICAgIHJvbGU9J2RpYWxvZydcbiAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2xkcy1tb2RhbF9fY29udGFpbmVyJyBzdHlsZT17Y29udGFpbmVyU3R5bGV9PlxuICAgICAgICAgICAge1JlYWN0LkNoaWxkcmVuLm1hcChjaGlsZHJlbiwgdGhpcy5yZW5kZXJDaGlsZENvbXBvbmVudCl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YmFja2Ryb3BDbGFzc05hbWVzfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19