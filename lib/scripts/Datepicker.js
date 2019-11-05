"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Datepicker = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _moment = _interopRequireDefault(require("moment"));

var _Button = require("./Button");

var _Select = require("./Select");

var _util = require("./util");

function createCalendarObject(date, mnDate, mxDate) {
  var minDate;
  var maxDate;
  var d = (0, _moment.default)(date, 'YYYY-MM-DD');

  if (!d.isValid()) {
    d = (0, _moment.default)((0, _util.getToday)(), 'YYYY-MM-DD');
  }

  if (mnDate) {
    var minD = (0, _moment.default)(mnDate, 'YYYY-MM-DD');

    if (minD.isValid()) {
      minDate = {
        year: minD.year(),
        month: minD.month(),
        date: minD.date(),
        value: minD.format('YYYY-MM-DD')
      };
    }
  }

  if (mxDate) {
    var maxD = (0, _moment.default)(mxDate, 'YYYY-MM-DD');

    if (maxD.isValid()) {
      maxDate = {
        year: maxD.year(),
        month: maxD.month(),
        date: maxD.date(),
        value: maxD.format('YYYY-MM-DD')
      };
    }
  }

  var year = d.year();
  var month = d.month();
  var first = (0, _moment.default)(d).startOf('month').startOf('week');
  var last = (0, _moment.default)(d).endOf('month').endOf('week');
  var weeks = [];
  var days = [];

  for (var dd = first; dd.isBefore(last); dd = dd.add(1, 'd')) {
    days.push({
      year: dd.year(),
      month: dd.month(),
      date: dd.date(),
      value: dd.format('YYYY-MM-DD')
    });

    if (days.length === 7) {
      weeks.push(days);
      days = [];
    }
  }

  var cal = {
    year: year,
    month: month,
    weeks: weeks
  };

  if (minDate) {
    cal.minDate = minDate;
  }

  if (maxDate) {
    cal.maxDate = maxDate;
  }

  return cal;
}

function cancelEvent(e) {
  e.preventDefault();
  e.stopPropagation();
}

var Datepicker =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Datepicker, _Component);

  function Datepicker(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Datepicker);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Datepicker).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "node", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "month", null);
    _this.state = {};
    _this.onBlur = _this.onBlur.bind((0, _assertThisInitialized2.default)(_this));
    _this.onKeyDown = _this.onKeyDown.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(Datepicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.autoFocus) {
        var targetDate = this.props.selectedDate || (0, _util.getToday)();
        setTimeout(function () {
          _this2.focusDate(targetDate);
        }, 10);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.state.focusDate && (this.state.targetDate || this.props.selectedDate)) {
        this.focusDate(this.state.targetDate || this.props.selectedDate);
        /* eslint-disable react/no-did-update-set-state */

        this.setState({
          focusDate: false
        });
      }
    }
  }, {
    key: "onDateKeyDown",
    value: function onDateKeyDown(date, e) {
      var targetDate = this.state.targetDate || this.props.selectedDate;

      if (e.keyCode === 13 || e.keyCode === 32) {
        // return / space
        this.onDateClick(date);
        e.preventDefault();
        e.stopPropagation();
      } else if (e.keyCode >= 37 && e.keyCode <= 40) {
        // cursor key
        if (e.keyCode === 37) {
          targetDate = (0, _moment.default)(targetDate).add(-1, e.shiftKey ? 'months' : 'days');
        } else if (e.keyCode === 39) {
          // right arrow key
          targetDate = (0, _moment.default)(targetDate).add(1, e.shiftKey ? 'months' : 'days');
        } else if (e.keyCode === 38) {
          // up arrow key
          targetDate = (0, _moment.default)(targetDate).add(-1, e.shiftKey ? 'years' : 'weeks');
        } else if (e.keyCode === 40) {
          // down arrow key
          targetDate = (0, _moment.default)(targetDate).add(1, e.shiftKey ? 'years' : 'weeks');
        }

        targetDate = targetDate.format('YYYY-MM-DD');
        this.setState({
          targetDate: targetDate,
          focusDate: true
        });
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }, {
    key: "onDateClick",
    value: function onDateClick(date) {
      if (this.props.onSelect) {
        this.props.onSelect(date);
      }
    }
  }, {
    key: "onDateFocus",
    value: function onDateFocus(date) {
      var _this3 = this;

      if (this.state.targetDate !== date) {
        setTimeout(function () {
          _this3.setState({
            targetDate: date
          });
        }, 10);
      }
    }
  }, {
    key: "onYearChange",
    value: function onYearChange(e) {
      // eslint-disable-next-line react/no-access-state-in-setstate
      var targetDate = this.state.targetDate || this.props.selectedDate;
      targetDate = (0, _moment.default)(targetDate).year(Number(e.target.value)).format('YYYY-MM-DD');
      this.setState({
        targetDate: targetDate
      });
    }
  }, {
    key: "onMonthChange",
    value: function onMonthChange(month) {
      // eslint-disable-next-line react/no-access-state-in-setstate
      var targetDate = this.state.targetDate || this.props.selectedDate;
      targetDate = (0, _moment.default)(targetDate).add(month, 'months').format('YYYY-MM-DD');
      this.setState({
        targetDate: targetDate
      });
    }
  }, {
    key: "onBlur",
    value: function onBlur(e) {
      var _this4 = this;

      setTimeout(function () {
        if (!_this4.isFocusedInComponent()) {
          if (_this4.props.onBlur) {
            _this4.props.onBlur(e);
          }
        }
      }, 10);
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      if (e.keyCode === 27) {
        // ESC
        if (this.props.onClose) {
          this.props.onClose();
        }
      }
    }
  }, {
    key: "focusDate",
    value: function focusDate(date) {
      var el = this.month;

      if (!el) {
        return;
      }

      var dateEl = el.querySelector(".slds-day[data-date-value=\"".concat(date, "\"]"));

      if (dateEl) {
        dateEl.focus();
      }
    }
  }, {
    key: "isFocusedInComponent",
    value: function isFocusedInComponent() {
      return (0, _util.isElInChildren)(this.node, document.activeElement);
    }
  }, {
    key: "renderFilter",
    value: function renderFilter(cal) {
      return _react.default.createElement("div", {
        className: "slds-datepicker__filter slds-grid"
      }, _react.default.createElement("div", {
        className: "slds-datepicker__filter--month slds-grid slds-grid--align-spread slds-size--2-of-3"
      }, _react.default.createElement("div", {
        className: "slds-align-middle"
      }, _react.default.createElement(_Button.Button, {
        className: "slds-align-middle",
        type: "icon-container",
        icon: "left",
        size: "small",
        alt: "Previous Month",
        onClick: this.onMonthChange.bind(this, -1)
      })), _react.default.createElement("h2", {
        className: "slds-align-middle"
      }, _moment.default.monthsShort()[cal.month]), _react.default.createElement("div", {
        className: "slds-align-middle"
      }, _react.default.createElement(_Button.Button, {
        className: "slds-align-middle",
        type: "icon-container",
        icon: "right",
        size: "small",
        alt: "Next Month",
        onClick: this.onMonthChange.bind(this, 1)
      }))), _react.default.createElement("div", {
        className: "slds-size--1-of-3"
      }, _react.default.createElement(_Select.Select, {
        value: cal.year,
        onChange: this.onYearChange.bind(this)
      }, new Array(11).join('_').split('_').map(function (a, i) {
        var year = cal.year + i - 5;
        return _react.default.createElement(_Select.Option, {
          key: year,
          label: year,
          value: year
        });
      }))));
    }
  }, {
    key: "renderMonth",
    value: function renderMonth(cal, selectedDate, today) {
      var _this5 = this;

      return _react.default.createElement("table", {
        className: "datepicker__month",
        role: "grid",
        "aria-labelledby": "month",
        ref: function ref(node) {
          return _this5.month = node;
        }
      }, _react.default.createElement("thead", null, _react.default.createElement("tr", null, _moment.default.weekdaysMin(true).map(function (wd, i) {
        return (// eslint-disable-next-line react/no-array-index-key
          _react.default.createElement("th", {
            key: i
          }, _react.default.createElement("abbr", {
            title: _moment.default.weekdays(true, i)
          }, wd))
        );
      }))), _react.default.createElement("tbody", null, cal.weeks.map(function (days, i) {
        return (// eslint-disable-next-line react/no-array-index-key
          _react.default.createElement("tr", {
            key: i
          }, days.map(_this5.renderDate.bind(_this5, cal, selectedDate, today)))
        );
      })));
    }
  }, {
    key: "renderDate",
    value: function renderDate(cal, selectedDate, today, d, i) {
      var selectable = true;
      var enabled = d.year === cal.year && d.month === cal.month;

      if (cal.minDate) {
        var min = (0, _moment.default)(d.value, 'YYYY-MM-DD').isAfter((0, _moment.default)(cal.minDate.value, 'YYYY-MM-DD'));
        selectable = selectable && min;
        enabled = enabled && min;
      }

      if (cal.maxDate) {
        var max = (0, _moment.default)(d.value, 'YYYY-MM-DD').isBefore((0, _moment.default)(cal.maxDate.value, 'YYYY-MM-DD'));
        selectable = selectable && max;
        enabled = enabled && max;
      }

      var selected = d.value === selectedDate;
      var isToday = d.value === today;
      var dateClassName = (0, _classnames.default)({
        'slds-disabled-text': !enabled,
        'slds-is-selected': selected,
        'slds-is-today': isToday
      });
      return _react.default.createElement("td", {
        className: dateClassName,
        key: i,
        headers: _moment.default.weekdays(i),
        role: "gridcell",
        "aria-disabled": !enabled,
        "aria-selected": selected
      }, _react.default.createElement("span", {
        className: "slds-day" // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        ,
        tabIndex: selectable ? 0 : -1,
        onClick: selectable ? this.onDateClick.bind(this, d.value) : undefined,
        onKeyDown: selectable ? this.onDateKeyDown.bind(this, d.value) : undefined,
        onFocus: enabled ? this.onDateFocus.bind(this, d.value) : cancelEvent,
        "data-date-value": d.value
      }, d.date));
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _this$props = this.props,
          className = _this$props.className,
          selectedDate = _this$props.selectedDate,
          minDate = _this$props.minDate,
          maxDate = _this$props.maxDate,
          elementRef = _this$props.elementRef,
          ExtensionRenderer = _this$props.extensionRenderer;
      var today = (0, _util.getToday)();
      var targetDate = this.state.targetDate || selectedDate;
      var cal = createCalendarObject(targetDate, minDate, maxDate);
      var datepickerClassNames = (0, _classnames.default)('slds-datepicker', className);

      var handleDOMRef = function handleDOMRef(node) {
        _this6.node = node;

        if (elementRef) {
          elementRef(node);
        }
      };

      return _react.default.createElement("div", {
        className: datepickerClassNames,
        ref: handleDOMRef,
        tabIndex: -1,
        "aria-hidden": false,
        onBlur: this.onBlur,
        onKeyDown: this.onKeyDown
      }, this.renderFilter(cal), this.renderMonth(cal, selectedDate, today), ExtensionRenderer ? _react.default.createElement(ExtensionRenderer, this.props) : undefined);
    }
  }]);
  return Datepicker;
}(_react.Component);

exports.Datepicker = Datepicker;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL0RhdGVwaWNrZXIudHN4Il0sIm5hbWVzIjpbImNyZWF0ZUNhbGVuZGFyT2JqZWN0IiwiZGF0ZSIsIm1uRGF0ZSIsIm14RGF0ZSIsIm1pbkRhdGUiLCJtYXhEYXRlIiwiZCIsImlzVmFsaWQiLCJtaW5EIiwieWVhciIsIm1vbnRoIiwidmFsdWUiLCJmb3JtYXQiLCJtYXhEIiwiZmlyc3QiLCJzdGFydE9mIiwibGFzdCIsImVuZE9mIiwid2Vla3MiLCJkYXlzIiwiZGQiLCJpc0JlZm9yZSIsImFkZCIsInB1c2giLCJsZW5ndGgiLCJjYWwiLCJjYW5jZWxFdmVudCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsIkRhdGVwaWNrZXIiLCJwcm9wcyIsInN0YXRlIiwib25CbHVyIiwiYmluZCIsIm9uS2V5RG93biIsImF1dG9Gb2N1cyIsInRhcmdldERhdGUiLCJzZWxlY3RlZERhdGUiLCJzZXRUaW1lb3V0IiwiZm9jdXNEYXRlIiwic2V0U3RhdGUiLCJrZXlDb2RlIiwib25EYXRlQ2xpY2siLCJzaGlmdEtleSIsIm9uU2VsZWN0IiwiTnVtYmVyIiwidGFyZ2V0IiwiaXNGb2N1c2VkSW5Db21wb25lbnQiLCJvbkNsb3NlIiwiZWwiLCJkYXRlRWwiLCJxdWVyeVNlbGVjdG9yIiwiZm9jdXMiLCJub2RlIiwiZG9jdW1lbnQiLCJhY3RpdmVFbGVtZW50Iiwib25Nb250aENoYW5nZSIsIm1vbWVudCIsIm1vbnRoc1Nob3J0Iiwib25ZZWFyQ2hhbmdlIiwiQXJyYXkiLCJqb2luIiwic3BsaXQiLCJtYXAiLCJhIiwiaSIsInRvZGF5Iiwid2Vla2RheXNNaW4iLCJ3ZCIsIndlZWtkYXlzIiwicmVuZGVyRGF0ZSIsInNlbGVjdGFibGUiLCJlbmFibGVkIiwibWluIiwiaXNBZnRlciIsIm1heCIsInNlbGVjdGVkIiwiaXNUb2RheSIsImRhdGVDbGFzc05hbWUiLCJ1bmRlZmluZWQiLCJvbkRhdGVLZXlEb3duIiwib25EYXRlRm9jdXMiLCJjbGFzc05hbWUiLCJlbGVtZW50UmVmIiwiRXh0ZW5zaW9uUmVuZGVyZXIiLCJleHRlbnNpb25SZW5kZXJlciIsImRhdGVwaWNrZXJDbGFzc05hbWVzIiwiaGFuZGxlRE9NUmVmIiwicmVuZGVyRmlsdGVyIiwicmVuZGVyTW9udGgiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFpQkEsU0FBU0Esb0JBQVQsQ0FBOEJDLElBQTlCLEVBQTZDQyxNQUE3QyxFQUE4REMsTUFBOUQsRUFBK0U7QUFDN0UsTUFBSUMsT0FBSjtBQUNBLE1BQUlDLE9BQUo7QUFDQSxNQUFJQyxDQUFDLEdBQUcscUJBQU9MLElBQVAsRUFBYSxZQUFiLENBQVI7O0FBQ0EsTUFBSSxDQUFDSyxDQUFDLENBQUNDLE9BQUYsRUFBTCxFQUFrQjtBQUNoQkQsSUFBQUEsQ0FBQyxHQUFHLHFCQUFPLHFCQUFQLEVBQW1CLFlBQW5CLENBQUo7QUFDRDs7QUFDRCxNQUFJSixNQUFKLEVBQVk7QUFDVixRQUFNTSxJQUFJLEdBQUcscUJBQU9OLE1BQVAsRUFBZSxZQUFmLENBQWI7O0FBQ0EsUUFBSU0sSUFBSSxDQUFDRCxPQUFMLEVBQUosRUFBb0I7QUFDbEJILE1BQUFBLE9BQU8sR0FBRztBQUNSSyxRQUFBQSxJQUFJLEVBQUVELElBQUksQ0FBQ0MsSUFBTCxFQURFO0FBRVJDLFFBQUFBLEtBQUssRUFBRUYsSUFBSSxDQUFDRSxLQUFMLEVBRkM7QUFHUlQsUUFBQUEsSUFBSSxFQUFFTyxJQUFJLENBQUNQLElBQUwsRUFIRTtBQUlSVSxRQUFBQSxLQUFLLEVBQUVILElBQUksQ0FBQ0ksTUFBTCxDQUFZLFlBQVo7QUFKQyxPQUFWO0FBTUQ7QUFDRjs7QUFDRCxNQUFJVCxNQUFKLEVBQVk7QUFDVixRQUFNVSxJQUFJLEdBQUcscUJBQU9WLE1BQVAsRUFBZSxZQUFmLENBQWI7O0FBQ0EsUUFBSVUsSUFBSSxDQUFDTixP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QUFJRSx1QkFBYSxLQUpmO0FBS0UsUUFBQSxNQUFNLEVBQUUsS0FBS3ZELE1BTGY7QUFNRSxRQUFBLFNBQVMsRUFBRSxLQUFLRTtBQU5sQixTQVFHLEtBQUtzRCxZQUFMLENBQWtCaEUsR0FBbEIsQ0FSSCxFQVNHLEtBQUtpRSxXQUFMLENBQWlCakUsR0FBakIsRUFBc0JhLFlBQXRCLEVBQW9DNkIsS0FBcEMsQ0FUSCxFQVVHa0IsaUJBQWlCLEdBQUcsNkJBQUMsaUJBQUQsRUFBdUIsS0FBS3RELEtBQTVCLENBQUgsR0FBMkNpRCxTQVYvRCxDQURGO0FBY0Q7OztFQXJTNkJXLGdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi9CdXR0b24nO1xuaW1wb3J0IHsgU2VsZWN0LCBPcHRpb24gfSBmcm9tICcuL1NlbGVjdCc7XG5pbXBvcnQgeyBnZXRUb2RheSwgaXNFbEluQ2hpbGRyZW4gfSBmcm9tICcuL3V0aWwnO1xuXG50eXBlIERhdGUgPSB7XG4gIHllYXI6IG51bWJlcjtcbiAgbW9udGg6IG51bWJlcjtcbiAgZGF0ZTogbnVtYmVyO1xuICB2YWx1ZTogc3RyaW5nO1xufTtcblxudHlwZSBDYWxlbmRhciA9IHtcbiAgeWVhcjogbnVtYmVyO1xuICBtb250aDogbnVtYmVyO1xuICB3ZWVrczogRGF0ZVtdW107XG4gIG1pbkRhdGU/OiBEYXRlO1xuICBtYXhEYXRlPzogRGF0ZTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUNhbGVuZGFyT2JqZWN0KGRhdGU/OiBzdHJpbmcsIG1uRGF0ZT86IHN0cmluZywgbXhEYXRlPzogc3RyaW5nKSB7XG4gIGxldCBtaW5EYXRlO1xuICBsZXQgbWF4RGF0ZTtcbiAgbGV0IGQgPSBtb21lbnQoZGF0ZSwgJ1lZWVktTU0tREQnKTtcbiAgaWYgKCFkLmlzVmFsaWQoKSkge1xuICAgIGQgPSBtb21lbnQoZ2V0VG9kYXkoKSwgJ1lZWVktTU0tREQnKTtcbiAgfVxuICBpZiAobW5EYXRlKSB7XG4gICAgY29uc3QgbWluRCA9IG1vbWVudChtbkRhdGUsICdZWVlZLU1NLUREJyk7XG4gICAgaWYgKG1pbkQuaXNWYWxpZCgpKSB7XG4gICAgICBtaW5EYXRlID0ge1xuICAgICAgICB5ZWFyOiBtaW5ELnllYXIoKSxcbiAgICAgICAgbW9udGg6IG1pbkQubW9udGgoKSxcbiAgICAgICAgZGF0ZTogbWluRC5kYXRlKCksXG4gICAgICAgIHZhbHVlOiBtaW5ELmZvcm1hdCgnWVlZWS1NTS1ERCcpLFxuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgaWYgKG14RGF0ZSkge1xuICAgIGNvbnN0IG1heEQgPSBtb21lbnQobXhEYXRlLCAnWVlZWS1NTS1ERCcpO1xuICAgIGlmIChtYXhELmlzVmFsaWQoKSkge1xuICAgICAgbWF4RGF0ZSA9IHtcbiAgICAgICAgeWVhcjogbWF4RC55ZWFyKCksXG4gICAgICAgIG1vbnRoOiBtYXhELm1vbnRoKCksXG4gICAgICAgIGRhdGU6IG1heEQuZGF0ZSgpLFxuICAgICAgICB2YWx1ZTogbWF4RC5mb3JtYXQoJ1lZWVktTU0tREQnKSxcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIGNvbnN0IHllYXIgPSBkLnllYXIoKTtcbiAgY29uc3QgbW9udGggPSBkLm1vbnRoKCk7XG4gIGNvbnN0IGZpcnN0ID0gbW9tZW50KGQpXG4gICAgLnN0YXJ0T2YoJ21vbnRoJylcbiAgICAuc3RhcnRPZignd2VlaycpO1xuICBjb25zdCBsYXN0ID0gbW9tZW50KGQpXG4gICAgLmVuZE9mKCdtb250aCcpXG4gICAgLmVuZE9mKCd3ZWVrJyk7XG4gIGNvbnN0IHdlZWtzID0gW107XG4gIGxldCBkYXlzID0gW107XG4gIGZvciAobGV0IGRkID0gZmlyc3Q7IGRkLmlzQmVmb3JlKGxhc3QpOyBkZCA9IGRkLmFkZCgxLCAnZCcpKSB7XG4gICAgZGF5cy5wdXNoKHtcbiAgICAgIHllYXI6IGRkLnllYXIoKSxcbiAgICAgIG1vbnRoOiBkZC5tb250aCgpLFxuICAgICAgZGF0ZTogZGQuZGF0ZSgpLFxuICAgICAgdmFsdWU6IGRkLmZvcm1hdCgnWVlZWS1NTS1ERCcpLFxuICAgIH0pO1xuICAgIGlmIChkYXlzLmxlbmd0aCA9PT0gNykge1xuICAgICAgd2Vla3MucHVzaChkYXlzKTtcbiAgICAgIGRheXMgPSBbXTtcbiAgICB9XG4gIH1cbiAgY29uc3QgY2FsOiBDYWxlbmRhciA9IHsgeWVhciwgbW9udGgsIHdlZWtzIH07XG4gIGlmIChtaW5EYXRlKSB7XG4gICAgY2FsLm1pbkRhdGUgPSBtaW5EYXRlO1xuICB9XG4gIGlmIChtYXhEYXRlKSB7XG4gICAgY2FsLm1heERhdGUgPSBtYXhEYXRlO1xuICB9XG4gIHJldHVybiBjYWw7XG59XG5cbmZ1bmN0aW9uIGNhbmNlbEV2ZW50KGU6IFJlYWN0LkZvY3VzRXZlbnQ8SFRNTFNwYW5FbGVtZW50Pikge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG59XG5cbmV4cG9ydCB0eXBlIERhdGVwaWNrZXJQcm9wcyA9IHtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBzZWxlY3RlZERhdGU/OiBzdHJpbmc7XG4gIGF1dG9Gb2N1cz86IGJvb2xlYW47XG4gIG1pbkRhdGU/OiBzdHJpbmc7XG4gIG1heERhdGU/OiBzdHJpbmc7XG4gIGV4dGVuc2lvblJlbmRlcmVyPzogKC4uLnByb3BzOiBhbnlbXSkgPT4gSlNYLkVsZW1lbnQ7XG4gIGVsZW1lbnRSZWY/OiAobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHZvaWQ7XG4gIG9uU2VsZWN0PzogKGRhdGU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25CbHVyPzogKGU6IFJlYWN0LkZvY3VzRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xuICBvbkNsb3NlPzogKCkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIERhdGVwaWNrZXJTdGF0ZSA9IHtcbiAgZm9jdXNEYXRlPzogYm9vbGVhbjtcbiAgdGFyZ2V0RGF0ZT86IHN0cmluZztcbn07XG5cbmV4cG9ydCBjbGFzcyBEYXRlcGlja2VyIGV4dGVuZHMgQ29tcG9uZW50PERhdGVwaWNrZXJQcm9wcywgRGF0ZXBpY2tlclN0YXRlPiB7XG4gIG5vZGU6IEhUTUxEaXZFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgbW9udGg6IEhUTUxUYWJsZUVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwcm9wczogUmVhZG9ubHk8RGF0ZXBpY2tlclByb3BzPikge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge307XG5cbiAgICB0aGlzLm9uQmx1ciA9IHRoaXMub25CbHVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbktleURvd24gPSB0aGlzLm9uS2V5RG93bi5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuYXV0b0ZvY3VzKSB7XG4gICAgICBjb25zdCB0YXJnZXREYXRlID0gdGhpcy5wcm9wcy5zZWxlY3RlZERhdGUgfHwgZ2V0VG9kYXkoKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmZvY3VzRGF0ZSh0YXJnZXREYXRlKTtcbiAgICAgIH0sIDEwKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5zdGF0ZS5mb2N1c0RhdGUgJiZcbiAgICAgICh0aGlzLnN0YXRlLnRhcmdldERhdGUgfHwgdGhpcy5wcm9wcy5zZWxlY3RlZERhdGUpXG4gICAgKSB7XG4gICAgICB0aGlzLmZvY3VzRGF0ZSh0aGlzLnN0YXRlLnRhcmdldERhdGUgfHwgdGhpcy5wcm9wcy5zZWxlY3RlZERhdGUpO1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGUgKi9cbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBmb2N1c0RhdGU6IGZhbHNlIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uRGF0ZUtleURvd24oZGF0ZTogc3RyaW5nLCBlOiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxTcGFuRWxlbWVudD4pIHtcbiAgICBsZXQgdGFyZ2V0RGF0ZTogYW55ID0gdGhpcy5zdGF0ZS50YXJnZXREYXRlIHx8IHRoaXMucHJvcHMuc2VsZWN0ZWREYXRlO1xuICAgIGlmIChlLmtleUNvZGUgPT09IDEzIHx8IGUua2V5Q29kZSA9PT0gMzIpIHtcbiAgICAgIC8vIHJldHVybiAvIHNwYWNlXG4gICAgICB0aGlzLm9uRGF0ZUNsaWNrKGRhdGUpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA+PSAzNyAmJiBlLmtleUNvZGUgPD0gNDApIHtcbiAgICAgIC8vIGN1cnNvciBrZXlcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDM3KSB7XG4gICAgICAgIHRhcmdldERhdGUgPSBtb21lbnQodGFyZ2V0RGF0ZSkuYWRkKC0xLCBlLnNoaWZ0S2V5ID8gJ21vbnRocycgOiAnZGF5cycpO1xuICAgICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT09IDM5KSB7XG4gICAgICAgIC8vIHJpZ2h0IGFycm93IGtleVxuICAgICAgICB0YXJnZXREYXRlID0gbW9tZW50KHRhcmdldERhdGUpLmFkZCgxLCBlLnNoaWZ0S2V5ID8gJ21vbnRocycgOiAnZGF5cycpO1xuICAgICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT09IDM4KSB7XG4gICAgICAgIC8vIHVwIGFycm93IGtleVxuICAgICAgICB0YXJnZXREYXRlID0gbW9tZW50KHRhcmdldERhdGUpLmFkZCgtMSwgZS5zaGlmdEtleSA/ICd5ZWFycycgOiAnd2Vla3MnKTtcbiAgICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSA0MCkge1xuICAgICAgICAvLyBkb3duIGFycm93IGtleVxuICAgICAgICB0YXJnZXREYXRlID0gbW9tZW50KHRhcmdldERhdGUpLmFkZCgxLCBlLnNoaWZ0S2V5ID8gJ3llYXJzJyA6ICd3ZWVrcycpO1xuICAgICAgfVxuICAgICAgdGFyZ2V0RGF0ZSA9IHRhcmdldERhdGUuZm9ybWF0KCdZWVlZLU1NLUREJyk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgdGFyZ2V0RGF0ZSwgZm9jdXNEYXRlOiB0cnVlIH0pO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBvbkRhdGVDbGljayhkYXRlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblNlbGVjdCkge1xuICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChkYXRlKTtcbiAgICB9XG4gIH1cblxuICBvbkRhdGVGb2N1cyhkYXRlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS50YXJnZXREYXRlICE9PSBkYXRlKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHRhcmdldERhdGU6IGRhdGUgfSk7XG4gICAgICB9LCAxMCk7XG4gICAgfVxuICB9XG5cbiAgb25ZZWFyQ2hhbmdlKGU6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxTZWxlY3RFbGVtZW50Pikge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9uby1hY2Nlc3Mtc3RhdGUtaW4tc2V0c3RhdGVcbiAgICBsZXQgdGFyZ2V0RGF0ZSA9IHRoaXMuc3RhdGUudGFyZ2V0RGF0ZSB8fCB0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZTtcbiAgICB0YXJnZXREYXRlID0gbW9tZW50KHRhcmdldERhdGUpXG4gICAgICAueWVhcihOdW1iZXIoZS50YXJnZXQudmFsdWUpKVxuICAgICAgLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyB0YXJnZXREYXRlIH0pO1xuICB9XG5cbiAgb25Nb250aENoYW5nZShtb250aDogbnVtYmVyKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L25vLWFjY2Vzcy1zdGF0ZS1pbi1zZXRzdGF0ZVxuICAgIGxldCB0YXJnZXREYXRlID0gdGhpcy5zdGF0ZS50YXJnZXREYXRlIHx8IHRoaXMucHJvcHMuc2VsZWN0ZWREYXRlO1xuICAgIHRhcmdldERhdGUgPSBtb21lbnQodGFyZ2V0RGF0ZSlcbiAgICAgIC5hZGQobW9udGgsICdtb250aHMnKVxuICAgICAgLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyB0YXJnZXREYXRlIH0pO1xuICB9XG5cbiAgb25CbHVyKGU6IFJlYWN0LkZvY3VzRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuaXNGb2N1c2VkSW5Db21wb25lbnQoKSkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkJsdXIpIHtcbiAgICAgICAgICB0aGlzLnByb3BzLm9uQmx1cihlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIDEwKTtcbiAgfVxuXG4gIG9uS2V5RG93bihlOiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50Pikge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAvLyBFU0NcbiAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2xvc2UpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNsb3NlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9jdXNEYXRlKGRhdGU6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGVsID0gdGhpcy5tb250aDtcbiAgICBpZiAoIWVsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGRhdGVFbDogSFRNTFNwYW5FbGVtZW50IHwgbnVsbCA9IGVsLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLnNsZHMtZGF5W2RhdGEtZGF0ZS12YWx1ZT1cIiR7ZGF0ZX1cIl1gXG4gICAgKTtcbiAgICBpZiAoZGF0ZUVsKSB7XG4gICAgICBkYXRlRWwuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBpc0ZvY3VzZWRJbkNvbXBvbmVudCgpIHtcbiAgICByZXR1cm4gaXNFbEluQ2hpbGRyZW4odGhpcy5ub2RlLCBkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcbiAgfVxuXG4gIHJlbmRlckZpbHRlcihjYWw6IENhbGVuZGFyKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdzbGRzLWRhdGVwaWNrZXJfX2ZpbHRlciBzbGRzLWdyaWQnPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2xkcy1kYXRlcGlja2VyX19maWx0ZXItLW1vbnRoIHNsZHMtZ3JpZCBzbGRzLWdyaWQtLWFsaWduLXNwcmVhZCBzbGRzLXNpemUtLTItb2YtMyc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NsZHMtYWxpZ24tbWlkZGxlJz5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPSdzbGRzLWFsaWduLW1pZGRsZSdcbiAgICAgICAgICAgICAgdHlwZT0naWNvbi1jb250YWluZXInXG4gICAgICAgICAgICAgIGljb249J2xlZnQnXG4gICAgICAgICAgICAgIHNpemU9J3NtYWxsJ1xuICAgICAgICAgICAgICBhbHQ9J1ByZXZpb3VzIE1vbnRoJ1xuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uTW9udGhDaGFuZ2UuYmluZCh0aGlzLCAtMSl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9J3NsZHMtYWxpZ24tbWlkZGxlJz5cbiAgICAgICAgICAgIHttb21lbnQubW9udGhzU2hvcnQoKVtjYWwubW9udGhdfVxuICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NsZHMtYWxpZ24tbWlkZGxlJz5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPSdzbGRzLWFsaWduLW1pZGRsZSdcbiAgICAgICAgICAgICAgdHlwZT0naWNvbi1jb250YWluZXInXG4gICAgICAgICAgICAgIGljb249J3JpZ2h0J1xuICAgICAgICAgICAgICBzaXplPSdzbWFsbCdcbiAgICAgICAgICAgICAgYWx0PSdOZXh0IE1vbnRoJ1xuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uTW9udGhDaGFuZ2UuYmluZCh0aGlzLCAxKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2xkcy1zaXplLS0xLW9mLTMnPlxuICAgICAgICAgIDxTZWxlY3QgdmFsdWU9e2NhbC55ZWFyfSBvbkNoYW5nZT17dGhpcy5vblllYXJDaGFuZ2UuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICB7bmV3IEFycmF5KDExKVxuICAgICAgICAgICAgICAuam9pbignXycpXG4gICAgICAgICAgICAgIC5zcGxpdCgnXycpXG4gICAgICAgICAgICAgIC5tYXAoKGEsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB5ZWFyID0gY2FsLnllYXIgKyBpIC0gNTtcbiAgICAgICAgICAgICAgICByZXR1cm4gPE9wdGlvbiBrZXk9e3llYXJ9IGxhYmVsPXt5ZWFyfSB2YWx1ZT17eWVhcn0gLz47XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvU2VsZWN0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZW5kZXJNb250aChjYWw6IENhbGVuZGFyLCBzZWxlY3RlZERhdGU6IHN0cmluZyB8IHVuZGVmaW5lZCwgdG9kYXk6IHN0cmluZykge1xuICAgIHJldHVybiAoXG4gICAgICA8dGFibGVcbiAgICAgICAgY2xhc3NOYW1lPSdkYXRlcGlja2VyX19tb250aCdcbiAgICAgICAgcm9sZT0nZ3JpZCdcbiAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PSdtb250aCdcbiAgICAgICAgcmVmPXsobm9kZSkgPT4gKHRoaXMubW9udGggPSBub2RlKX1cbiAgICAgID5cbiAgICAgICAgPHRoZWFkPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgIHttb21lbnQud2Vla2RheXNNaW4odHJ1ZSkubWFwKCh3ZCwgaSkgPT4gKFxuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3Qvbm8tYXJyYXktaW5kZXgta2V5XG4gICAgICAgICAgICAgIDx0aCBrZXk9e2l9PlxuICAgICAgICAgICAgICAgIDxhYmJyIHRpdGxlPXttb21lbnQud2Vla2RheXModHJ1ZSwgaSl9Pnt3ZH08L2FiYnI+XG4gICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3RoZWFkPlxuICAgICAgICA8dGJvZHk+XG4gICAgICAgICAge2NhbC53ZWVrcy5tYXAoKGRheXMsIGkpID0+IChcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9uby1hcnJheS1pbmRleC1rZXlcbiAgICAgICAgICAgIDx0ciBrZXk9e2l9PlxuICAgICAgICAgICAgICB7ZGF5cy5tYXAodGhpcy5yZW5kZXJEYXRlLmJpbmQodGhpcywgY2FsLCBzZWxlY3RlZERhdGUsIHRvZGF5KSl9XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L3Rib2R5PlxuICAgICAgPC90YWJsZT5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyRGF0ZShcbiAgICBjYWw6IENhbGVuZGFyLFxuICAgIHNlbGVjdGVkRGF0ZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIHRvZGF5OiBzdHJpbmcsXG4gICAgZDogRGF0ZSxcbiAgICBpOiBudW1iZXJcbiAgKSB7XG4gICAgbGV0IHNlbGVjdGFibGUgPSB0cnVlO1xuICAgIGxldCBlbmFibGVkID0gZC55ZWFyID09PSBjYWwueWVhciAmJiBkLm1vbnRoID09PSBjYWwubW9udGg7XG4gICAgaWYgKGNhbC5taW5EYXRlKSB7XG4gICAgICBjb25zdCBtaW4gPSBtb21lbnQoZC52YWx1ZSwgJ1lZWVktTU0tREQnKS5pc0FmdGVyKFxuICAgICAgICBtb21lbnQoY2FsLm1pbkRhdGUudmFsdWUsICdZWVlZLU1NLUREJylcbiAgICAgICk7XG4gICAgICBzZWxlY3RhYmxlID0gc2VsZWN0YWJsZSAmJiBtaW47XG4gICAgICBlbmFibGVkID0gZW5hYmxlZCAmJiBtaW47XG4gICAgfVxuICAgIGlmIChjYWwubWF4RGF0ZSkge1xuICAgICAgY29uc3QgbWF4ID0gbW9tZW50KGQudmFsdWUsICdZWVlZLU1NLUREJykuaXNCZWZvcmUoXG4gICAgICAgIG1vbWVudChjYWwubWF4RGF0ZS52YWx1ZSwgJ1lZWVktTU0tREQnKVxuICAgICAgKTtcbiAgICAgIHNlbGVjdGFibGUgPSBzZWxlY3RhYmxlICYmIG1heDtcbiAgICAgIGVuYWJsZWQgPSBlbmFibGVkICYmIG1heDtcbiAgICB9XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSBkLnZhbHVlID09PSBzZWxlY3RlZERhdGU7XG4gICAgY29uc3QgaXNUb2RheSA9IGQudmFsdWUgPT09IHRvZGF5O1xuICAgIGNvbnN0IGRhdGVDbGFzc05hbWUgPSBjbGFzc25hbWVzKHtcbiAgICAgICdzbGRzLWRpc2FibGVkLXRleHQnOiAhZW5hYmxlZCxcbiAgICAgICdzbGRzLWlzLXNlbGVjdGVkJzogc2VsZWN0ZWQsXG4gICAgICAnc2xkcy1pcy10b2RheSc6IGlzVG9kYXksXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDx0ZFxuICAgICAgICBjbGFzc05hbWU9e2RhdGVDbGFzc05hbWV9XG4gICAgICAgIGtleT17aX1cbiAgICAgICAgaGVhZGVycz17bW9tZW50LndlZWtkYXlzKGkpfVxuICAgICAgICByb2xlPSdncmlkY2VsbCdcbiAgICAgICAgYXJpYS1kaXNhYmxlZD17IWVuYWJsZWR9XG4gICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3NlbGVjdGVkfVxuICAgICAgPlxuICAgICAgICA8c3BhblxuICAgICAgICAgIGNsYXNzTmFtZT0nc2xkcy1kYXknXG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGpzeC1hMTF5L25vLW5vbmludGVyYWN0aXZlLXRhYmluZGV4XG4gICAgICAgICAgdGFiSW5kZXg9e3NlbGVjdGFibGUgPyAwIDogLTF9XG4gICAgICAgICAgb25DbGljaz17XG4gICAgICAgICAgICBzZWxlY3RhYmxlID8gdGhpcy5vbkRhdGVDbGljay5iaW5kKHRoaXMsIGQudmFsdWUpIDogdW5kZWZpbmVkXG4gICAgICAgICAgfVxuICAgICAgICAgIG9uS2V5RG93bj17XG4gICAgICAgICAgICBzZWxlY3RhYmxlID8gdGhpcy5vbkRhdGVLZXlEb3duLmJpbmQodGhpcywgZC52YWx1ZSkgOiB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgICAgb25Gb2N1cz17ZW5hYmxlZCA/IHRoaXMub25EYXRlRm9jdXMuYmluZCh0aGlzLCBkLnZhbHVlKSA6IGNhbmNlbEV2ZW50fVxuICAgICAgICAgIGRhdGEtZGF0ZS12YWx1ZT17ZC52YWx1ZX1cbiAgICAgICAgPlxuICAgICAgICAgIHtkLmRhdGV9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvdGQ+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjbGFzc05hbWUsXG4gICAgICBzZWxlY3RlZERhdGUsXG4gICAgICBtaW5EYXRlLFxuICAgICAgbWF4RGF0ZSxcbiAgICAgIGVsZW1lbnRSZWYsXG4gICAgICBleHRlbnNpb25SZW5kZXJlcjogRXh0ZW5zaW9uUmVuZGVyZXIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgdG9kYXkgPSBnZXRUb2RheSgpO1xuICAgIGNvbnN0IHRhcmdldERhdGUgPSB0aGlzLnN0YXRlLnRhcmdldERhdGUgfHwgc2VsZWN0ZWREYXRlO1xuICAgIGNvbnN0IGNhbCA9IGNyZWF0ZUNhbGVuZGFyT2JqZWN0KHRhcmdldERhdGUsIG1pbkRhdGUsIG1heERhdGUpO1xuICAgIGNvbnN0IGRhdGVwaWNrZXJDbGFzc05hbWVzID0gY2xhc3NuYW1lcygnc2xkcy1kYXRlcGlja2VyJywgY2xhc3NOYW1lKTtcbiAgICBjb25zdCBoYW5kbGVET01SZWYgPSAobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHtcbiAgICAgIHRoaXMubm9kZSA9IG5vZGU7XG4gICAgICBpZiAoZWxlbWVudFJlZikge1xuICAgICAgICBlbGVtZW50UmVmKG5vZGUpO1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtkYXRlcGlja2VyQ2xhc3NOYW1lc31cbiAgICAgICAgcmVmPXtoYW5kbGVET01SZWZ9XG4gICAgICAgIHRhYkluZGV4PXstMX1cbiAgICAgICAgYXJpYS1oaWRkZW49e2ZhbHNlfVxuICAgICAgICBvbkJsdXI9e3RoaXMub25CbHVyfVxuICAgICAgICBvbktleURvd249e3RoaXMub25LZXlEb3dufVxuICAgICAgPlxuICAgICAgICB7dGhpcy5yZW5kZXJGaWx0ZXIoY2FsKX1cbiAgICAgICAge3RoaXMucmVuZGVyTW9udGgoY2FsLCBzZWxlY3RlZERhdGUsIHRvZGF5KX1cbiAgICAgICAge0V4dGVuc2lvblJlbmRlcmVyID8gPEV4dGVuc2lvblJlbmRlcmVyIHsuLi50aGlzLnByb3BzfSAvPiA6IHVuZGVmaW5lZH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==