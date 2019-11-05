"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pill = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Icon = require("./Icon");

var _Button = require("./Button");

var Pill =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Pill, _Component);

  function Pill() {
    (0, _classCallCheck2.default)(this, Pill);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Pill).apply(this, arguments));
  }

  (0, _createClass2.default)(Pill, [{
    key: "onPillClick",
    value: function onPillClick(e) {
      if (this.props.onClick) {
        this.props.onClick(e);
      }
    }
  }, {
    key: "onPillRemove",
    value: function onPillRemove(e) {
      e.preventDefault();
      e.stopPropagation();

      if (this.props.onRemove) {
        this.props.onRemove(e);
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      if (e.keyCode === 8 || e.keyCode === 46) {
        // Bacspace / DEL
        e.preventDefault();
        e.stopPropagation();
        this.onPillRemove({});
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          icon = _this$props.icon,
          disabled = _this$props.disabled,
          label = _this$props.label,
          tag = _this$props.tag,
          pillRef = _this$props.pillRef,
          truncate = _this$props.truncate,
          className = _this$props.className;
      var Tag = disabled ? 'span' : tag || 'a';
      var pillClassNames = (0, _classnames.default)('slds-pill', {
        'slds-truncate': truncate
      }, className);
      return _react.default.createElement(Tag, {
        ref: function ref(node) {
          if (pillRef) pillRef(node);
        },
        className: pillClassNames,
        onKeyDown: this.onKeyDown.bind(this),
        onClick: this.onPillClick.bind(this)
      }, icon && icon.icon ? _react.default.createElement(_Icon.Icon, {
        className: "slds-pill__icon",
        category: icon.category,
        icon: icon.icon
      }) : undefined, _react.default.createElement("span", {
        className: "slds-pill__label"
      }, label), _react.default.createElement(_Button.Button, {
        disabled: disabled,
        className: "slds-pill__remove",
        type: "icon-bare",
        icon: "close",
        alt: "Remove",
        tabIndex: -1,
        onClick: this.onPillRemove.bind(this)
      }));
    }
  }]);
  return Pill;
}(_react.Component);

exports.Pill = Pill;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL1BpbGwudHN4Il0sIm5hbWVzIjpbIlBpbGwiLCJlIiwicHJvcHMiLCJvbkNsaWNrIiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJvblJlbW92ZSIsImtleUNvZGUiLCJvblBpbGxSZW1vdmUiLCJpY29uIiwiZGlzYWJsZWQiLCJsYWJlbCIsInRhZyIsInBpbGxSZWYiLCJ0cnVuY2F0ZSIsImNsYXNzTmFtZSIsIlRhZyIsInBpbGxDbGFzc05hbWVzIiwibm9kZSIsIm9uS2V5RG93biIsImJpbmQiLCJvblBpbGxDbGljayIsImNhdGVnb3J5IiwidW5kZWZpbmVkIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7QUFDQTs7SUFpQmFBLEk7Ozs7Ozs7Ozs7OztnQ0FDQ0MsQyxFQUE4QztBQUN4RCxVQUFJLEtBQUtDLEtBQUwsQ0FBV0MsT0FBZixFQUF3QjtBQUN0QixhQUFLRCxLQUFMLENBQVdDLE9BQVgsQ0FBbUJGLENBQW5CO0FBQ0Q7QUFDRjs7O2lDQUVZQSxDLEVBQVE7QUFDbkJBLE1BQUFBLENBQUMsQ0FBQ0csY0FBRjtBQUNBSCxNQUFBQSxDQUFDLENBQUNJLGVBQUY7O0FBQ0EsVUFBSSxLQUFLSCxLQUFMLENBQVdJLFFBQWYsRUFBeUI7QUFDdkIsYUFBS0osS0FBTCxDQUFXSSxRQUFYLENBQW9CTCxDQUFwQjtBQUNEO0FBQ0Y7Ozs4QkFFU0EsQyxFQUFxQztBQUM3QyxVQUFJQSxDQUFDLENBQUNNLE9BQUYsS0FBYyxDQUFkLElBQW1CTixDQUFDLENBQUNNLE9BQUYsS0FBYyxFQUFyQyxFQUF5QztBQUN2QztBQUNBTixRQUFBQSxDQUFDLENBQUNHLGNBQUY7QUFDQUgsUUFBQUEsQ0FBQyxDQUFDSSxlQUFGO0FBQ0EsYUFBS0csWUFBTCxDQUFrQixFQUFsQjtBQUNEO0FBQ0Y7Ozs2QkFFUTtBQUFBLHdCQVNILEtBQUtOLEtBVEY7QUFBQSxVQUVMTyxJQUZLLGVBRUxBLElBRks7QUFBQSxVQUdMQyxRQUhLLGVBR0xBLFFBSEs7QUFBQSxVQUlMQyxLQUpLLGVBSUxBLEtBSks7QUFBQSxVQUtMQyxHQUxLLGVBS0xBLEdBTEs7QUFBQSxVQU1MQyxPQU5LLGVBTUxBLE9BTks7QUFBQSxVQU9MQyxRQVBLLGVBT0xBLFFBUEs7QUFBQSxVQVFMQyxTQVJLLGVBUUxBLFNBUks7QUFVUCxVQUFNQyxHQUFRLEdBQUdOLFFBQVEsR0FBRyxNQUFILEdBQVlFLEdBQUcsSUFBSSxHQUE1QztBQUNBLFVBQU1LLGNBQWMsR0FBRyx5QkFDckIsV0FEcUIsRUFFckI7QUFBRSx5QkFBaUJIO0FBQW5CLE9BRnFCLEVBR3JCQyxTQUhxQixDQUF2QjtBQUtBLGFBQ0UsNkJBQUMsR0FBRDtBQUNFLFFBQUEsR0FBRyxFQUFFLGFBQUNHLElBQUQsRUFBdUI7QUFDMUIsY0FBSUwsT0FBSixFQUFhQSxPQUFPLENBQUNLLElBQUQsQ0FBUDtBQUNkLFNBSEg7QUFJRSxRQUFBLFNBQVMsRUFBRUQsY0FKYjtBQUtFLFFBQUEsU0FBUyxFQUFFLEtBQUtFLFNBQUwsQ0FBZUMsSUFBZixDQUFvQixJQUFwQixDQUxiO0FBTUUsUUFBQSxPQUFPLEVBQUUsS0FBS0MsV0FBTCxDQUFpQkQsSUFBakIsQ0FBc0IsSUFBdEI7QUFOWCxTQVFHWCxJQUFJLElBQUlBLElBQUksQ0FBQ0EsSUFBYixHQUNDLDZCQUFDLFVBQUQ7QUFDRSxRQUFBLFNBQVMsRUFBQyxpQkFEWjtBQUVFLFFBQUEsUUFBUSxFQUFFQSxJQUFJLENBQUNhLFFBRmpCO0FBR0UsUUFBQSxJQUFJLEVBQUViLElBQUksQ0FBQ0E7QUFIYixRQURELEdBT0NjLFNBZkosRUFpQkU7QUFBTSxRQUFBLFNBQVMsRUFBQztBQUFoQixTQUFvQ1osS0FBcEMsQ0FqQkYsRUFrQkUsNkJBQUMsY0FBRDtBQUNFLFFBQUEsUUFBUSxFQUFFRCxRQURaO0FBRUUsUUFBQSxTQUFTLEVBQUMsbUJBRlo7QUFHRSxRQUFBLElBQUksRUFBQyxXQUhQO0FBSUUsUUFBQSxJQUFJLEVBQUMsT0FKUDtBQUtFLFFBQUEsR0FBRyxFQUFDLFFBTE47QUFNRSxRQUFBLFFBQVEsRUFBRSxDQUFDLENBTmI7QUFPRSxRQUFBLE9BQU8sRUFBRSxLQUFLRixZQUFMLENBQWtCWSxJQUFsQixDQUF1QixJQUF2QjtBQVBYLFFBbEJGLENBREY7QUE4QkQ7OztFQXRFdUJJLGdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUmVhY3RIVE1MLCBIVE1MQXR0cmlidXRlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgeyBJY29uLCBJY29uQ2F0ZWdvcnkgfSBmcm9tICcuL0ljb24nO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi9CdXR0b24nO1xuXG5leHBvcnQgdHlwZSBQaWxsUHJvcHMgPSB7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgbGFiZWw/OiBzdHJpbmc7XG4gIHRydW5jYXRlPzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICB0YWc/OiBrZXlvZiBSZWFjdEhUTUw7XG4gIGljb24/OiB7XG4gICAgY2F0ZWdvcnk/OiBJY29uQ2F0ZWdvcnk7XG4gICAgaWNvbj86IHN0cmluZztcbiAgfTtcbiAgcGlsbFJlZj86IChub2RlOiBIVE1MRWxlbWVudCkgPT4gdm9pZDtcbiAgb25DbGljaz86IChlOiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxFbGVtZW50LCBNb3VzZUV2ZW50PikgPT4gdm9pZDtcbiAgb25SZW1vdmU/OiAoZTogYW55KSA9PiB2b2lkO1xufSAmIEhUTUxBdHRyaWJ1dGVzPEhUTUxTcGFuRWxlbWVudD47XG5cbmV4cG9ydCBjbGFzcyBQaWxsIGV4dGVuZHMgQ29tcG9uZW50PFBpbGxQcm9wcz4ge1xuICBvblBpbGxDbGljayhlOiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxFbGVtZW50LCBNb3VzZUV2ZW50Pikge1xuICAgIGlmICh0aGlzLnByb3BzLm9uQ2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25DbGljayhlKTtcbiAgICB9XG4gIH1cblxuICBvblBpbGxSZW1vdmUoZTogYW55KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKHRoaXMucHJvcHMub25SZW1vdmUpIHtcbiAgICAgIHRoaXMucHJvcHMub25SZW1vdmUoZSk7XG4gICAgfVxuICB9XG5cbiAgb25LZXlEb3duKGU6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTEVsZW1lbnQ+KSB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gOCB8fCBlLmtleUNvZGUgPT09IDQ2KSB7XG4gICAgICAvLyBCYWNzcGFjZSAvIERFTFxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXMub25QaWxsUmVtb3ZlKHt9KTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgaWNvbixcbiAgICAgIGRpc2FibGVkLFxuICAgICAgbGFiZWwsXG4gICAgICB0YWcsXG4gICAgICBwaWxsUmVmLFxuICAgICAgdHJ1bmNhdGUsXG4gICAgICBjbGFzc05hbWUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgVGFnOiBhbnkgPSBkaXNhYmxlZCA/ICdzcGFuJyA6IHRhZyB8fCAnYSc7XG4gICAgY29uc3QgcGlsbENsYXNzTmFtZXMgPSBjbGFzc25hbWVzKFxuICAgICAgJ3NsZHMtcGlsbCcsXG4gICAgICB7ICdzbGRzLXRydW5jYXRlJzogdHJ1bmNhdGUgfSxcbiAgICAgIGNsYXNzTmFtZVxuICAgICk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxUYWdcbiAgICAgICAgcmVmPXsobm9kZTogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICBpZiAocGlsbFJlZikgcGlsbFJlZihub2RlKTtcbiAgICAgICAgfX1cbiAgICAgICAgY2xhc3NOYW1lPXtwaWxsQ2xhc3NOYW1lc31cbiAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uS2V5RG93bi5iaW5kKHRoaXMpfVxuICAgICAgICBvbkNsaWNrPXt0aGlzLm9uUGlsbENsaWNrLmJpbmQodGhpcyl9XG4gICAgICA+XG4gICAgICAgIHtpY29uICYmIGljb24uaWNvbiA/IChcbiAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgY2xhc3NOYW1lPSdzbGRzLXBpbGxfX2ljb24nXG4gICAgICAgICAgICBjYXRlZ29yeT17aWNvbi5jYXRlZ29yeX1cbiAgICAgICAgICAgIGljb249e2ljb24uaWNvbn1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogKFxuICAgICAgICAgIHVuZGVmaW5lZFxuICAgICAgICApfVxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3NsZHMtcGlsbF9fbGFiZWwnPntsYWJlbH08L3NwYW4+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgY2xhc3NOYW1lPSdzbGRzLXBpbGxfX3JlbW92ZSdcbiAgICAgICAgICB0eXBlPSdpY29uLWJhcmUnXG4gICAgICAgICAgaWNvbj0nY2xvc2UnXG4gICAgICAgICAgYWx0PSdSZW1vdmUnXG4gICAgICAgICAgdGFiSW5kZXg9ey0xfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25QaWxsUmVtb3ZlLmJpbmQodGhpcyl9XG4gICAgICAgIC8+XG4gICAgICA8L1RhZz5cbiAgICApO1xuICB9XG59XG4iXX0=