"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Lookup = exports.LookupCandidateListPortal = exports.LookupSearch = exports.LookupSelection = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf4 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _AutoAlign = require("./AutoAlign");

var _FormElement = require("./FormElement");

var _Input = require("./Input");

var _Icon = require("./Icon");

var _Spinner = require("./Spinner");

var _Pill = require("./Pill");

var _DropdownButton = require("./DropdownButton");

var _DropdownMenu = require("./DropdownMenu");

var _util = require("./util");

/**
 *
 */
var LookupSelection =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(LookupSelection, _Component);

  function LookupSelection() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, LookupSelection);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf4.default)(LookupSelection)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "pill", null);
    return _this;
  }

  (0, _createClass2.default)(LookupSelection, [{
    key: "onKeyDown",
    value: function onKeyDown(e) {
      if (e.keyCode === 8 || e.keyCode === 46) {
        // Bacspace / DEL
        e.preventDefault();
        e.stopPropagation();

        if (this.props.onResetSelection) {
          this.props.onResetSelection();
        }
      }
    }
  }, {
    key: "renderPill",
    value: function renderPill(selected) {
      var _this2 = this;

      var onPillClick = function onPillClick(e) {
        e.target.focus();
        e.preventDefault();
        e.stopPropagation();
      };

      return _react.default.createElement(_Pill.Pill, {
        id: this.props.id,
        truncate: true,
        pillRef: function pillRef(node) {
          return _this2.pill = node;
        },
        onKeyDown: this.onKeyDown.bind(this),
        onClick: onPillClick,
        tabIndex: 0,
        icon: selected.icon ? {
          category: selected.category,
          icon: selected.icon
        } : undefined,
        label: selected.label,
        onRemove: this.props.onResetSelection
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          hidden = _this$props.hidden,
          selected = _this$props.selected,
          lookupSelectionRef = _this$props.lookupSelectionRef;
      var lookupClassNames = (0, _classnames.default)({
        'slds-hide': hidden
      });
      return _react.default.createElement("div", {
        ref: lookupSelectionRef,
        className: lookupClassNames
      }, _react.default.createElement("div", {
        className: "slds-pill__container"
      }, selected ? this.renderPill(selected) : undefined));
    }
  }]);
  return LookupSelection;
}(_react.Component);

exports.LookupSelection = LookupSelection;

/**
 *
 */
var LookupSearch =
/*#__PURE__*/
function (_Component2) {
  (0, _inherits2.default)(LookupSearch, _Component2);

  function LookupSearch(props) {
    var _this3;

    (0, _classCallCheck2.default)(this, LookupSearch);
    _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf4.default)(LookupSearch).call(this, props));
    /* eslint-disable max-len */

    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this3), "input", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this3), "node", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this3), "onLookupIconClick", function () {
      if (_this3.props.onSubmit) {
        _this3.props.onSubmit();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this3), "onInputKeyDown", function (e) {
      if (e.keyCode === 13) {
        // return key
        e.preventDefault();
        e.stopPropagation();
        var _searchText = e.target.value;

        if (_searchText) {
          if (_this3.props.onSubmit) {
            _this3.props.onSubmit();
          }
        } else if (_this3.props.onComplete) {
          // if no search text, quit lookup search
          _this3.props.onComplete();
        }
      } else if (e.keyCode === 40) {
        // down key
        e.preventDefault();
        e.stopPropagation();

        if (_this3.props.onPressDown) {
          _this3.props.onPressDown();
        }
      } else if (e.keyCode === 27) {
        // ESC
        e.preventDefault();
        e.stopPropagation(); // quit lookup search (cancel)

        var _cancel = true;

        if (_this3.props.onComplete) {
          _this3.props.onComplete(_cancel);
        }
      }

      if (_this3.props.onKeyDown) {
        _this3.props.onKeyDown(e);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this3), "onInputChange", function (e) {
      var searchText = e.target.value;

      if (_this3.props.onChange) {
        _this3.props.onChange(searchText);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this3), "onInputBlur", function (e) {
      setTimeout(function () {
        if (!_this3.isFocusedInComponent()) {
          if (_this3.props.onBlur) {
            _this3.props.onBlur(e);
          }
        }
      }, 10);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this3), "onScopeMenuClick", function (e) {
      if (_this3.props.onScopeMenuClick) {
        _this3.props.onScopeMenuClick(e);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this3), "onMenuItemClick", function (scope) {
      if (_this3.props.onScopeChange) {
        _this3.props.onScopeChange(scope.value);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this3), "handleLookupSearchRef", function (node) {
      _this3.node = node;
      var lookupSearchRef = _this3.props.lookupSearchRef;

      if (lookupSearchRef) {
        lookupSearchRef(node);
      }
    });
    (0, _util.registerStyle)('lookupSearch', [['.slds-lookup[data-scope="multi"] .react-slds-lookup-scope-selector', '{ min-width: 3rem; }'], ['.slds-lookup[data-scope="multi"] .react-slds-lookup-scope-selector .slds-dropdown-trigger', '{ margin-left: 0; }'], ['.slds-lookup[data-scope="multi"] .react-slds-lookup-scope-selector .slds-dropdown-trigger .slds-button', '{ padding: 0 0.25rem; }'], ['.slds-lookup[data-scope="multi"] .slds-box--border', '{ background-color: white; }'], ['.slds-lookup[data-scope="multi"] .slds-box--border.react-slds-box-disabled', '{ background-color: #e0e5ee; border-color: #a8b7c7; cursor: not-allowed; }'], ['.slds-lookup[data-scope="multi"] .slds-box--border .slds-input--bare', '{ height: 2.15rem; width: 100%; }']]);
    return _this3;
  }

  (0, _createClass2.default)(LookupSearch, [{
    key: "isFocusedInComponent",
    value: function isFocusedInComponent() {
      return (0, _util.isElInChildren)(this.node, document.activeElement);
    }
  }, {
    key: "renderSearchInput",
    value: function renderSearchInput(props) {
      var _this4 = this;

      var className = props.className,
          hidden = props.hidden,
          searchText = props.searchText,
          _props$iconAlign = props.iconAlign,
          iconAlign = _props$iconAlign === void 0 ? 'right' : _props$iconAlign;
      var searchInputClassNames = (0, _classnames.default)('slds-grid', 'slds-input-has-icon', "slds-input-has-icon--".concat(iconAlign), {
        'slds-hide': hidden
      }, className);
      var pprops = Object.assign({}, props);
      delete pprops.iconAlign;
      delete pprops.searchText;
      delete pprops.targetScope;
      delete pprops.onScopeMenuClick;
      delete pprops.onScopeChange;
      delete pprops.onPressDown;
      delete pprops.onComplete;
      delete pprops.defaultTargetScope;
      delete pprops.onSearchTextChange;
      delete pprops.scopes;
      delete pprops.onLookupRequest;
      delete pprops.defaultSearchText;
      delete pprops.onValueChange;
      delete pprops.lookupSearchRef;
      return _react.default.createElement("div", {
        ref: this.handleLookupSearchRef,
        className: searchInputClassNames
      }, _react.default.createElement(_Input.Input, (0, _extends2.default)({}, pprops, {
        inputRef: function inputRef(node) {
          return _this4.input = node;
        },
        value: searchText,
        onKeyDown: this.onInputKeyDown,
        onChange: this.onInputChange,
        onBlur: this.onInputBlur
      })), _react.default.createElement("span", {
        tabIndex: -1,
        style: props.disabled ? undefined : {
          position: 'relative',
          cursor: 'pointer',
          outline: 'none'
        },
        onClick: props.disabled ? undefined : this.onLookupIconClick,
        onBlur: this.onInputBlur
      }, _react.default.createElement(_Icon.Icon, {
        icon: "search",
        className: "slds-input__icon"
      })));
    }
  }, {
    key: "renderScopeSelector",
    value: function renderScopeSelector(_ref) {
      var scopes = _ref.scopes,
          target = _ref.targetScope,
          disabled = _ref.disabled;
      var targetScope = scopes[0] || {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = scopes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var scope = _step.value;

          if (scope.value === target) {
            targetScope = scope;
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var icon = _react.default.createElement(_Icon.Icon, {
        icon: targetScope.icon || 'none',
        size: "x-small"
      });

      var selectorClassNames = (0, _classnames.default)('slds-grid', 'slds-grid--align-center', 'slds-grid--vertical-align-center', 'react-slds-lookup-scope-selector');
      return _react.default.createElement("div", {
        className: selectorClassNames
      }, _react.default.createElement(_DropdownButton.DropdownButton, {
        label: icon,
        disabled: disabled,
        onClick: this.onScopeMenuClick,
        onMenuItemClick: this.onMenuItemClick,
        onBlur: this.onInputBlur
      }, scopes.map(function (scope) {
        return _react.default.createElement(_DropdownMenu.DropdownMenuItem, (0, _extends2.default)({
          key: scope.value
        }, scope));
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          scopes = _this$props2.scopes,
          hidden = _this$props2.hidden,
          disabled = _this$props2.disabled,
          targetScope = _this$props2.targetScope,
          props = (0, _objectWithoutProperties2.default)(_this$props2, ["scopes", "hidden", "disabled", "targetScope"]);

      if (scopes) {
        var lookupSearchClassNames = (0, _classnames.default)('slds-grid', 'slds-form-element__control', 'slds-box--border', {
          'react-slds-box-disabled': disabled
        }, {
          'slds-hide': hidden
        });
        var styles = {
          WebkitFlexWrap: 'nowrap',
          msFlexWrap: 'nowrap',
          flexWrap: 'nowrap'
        };
        return _react.default.createElement("div", {
          ref: this.handleLookupSearchRef,
          className: lookupSearchClassNames,
          style: styles
        }, this.renderScopeSelector({
          scopes: scopes,
          targetScope: targetScope,
          disabled: disabled
        }), this.renderSearchInput((0, _objectSpread2.default)({}, props, {
          disabled: disabled,
          className: 'slds-col',
          bare: true
        })));
      }

      return this.renderSearchInput(this.props);
    }
  }]);
  return LookupSearch;
}(_react.Component);

exports.LookupSearch = LookupSearch;

/**
 *
 */
var LookupCandidateList =
/*#__PURE__*/
function (_Component3) {
  (0, _inherits2.default)(LookupCandidateList, _Component3);

  function LookupCandidateList() {
    var _getPrototypeOf3;

    var _this5;

    (0, _classCallCheck2.default)(this, LookupCandidateList);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this5 = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf3 = (0, _getPrototypeOf4.default)(LookupCandidateList)).call.apply(_getPrototypeOf3, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this5), "node", null);
    return _this5;
  }

  (0, _createClass2.default)(LookupCandidateList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.focus) {
        this.focusToTargetItemEl(0);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this6 = this;

      if (this.props.focus && !prevProps.focus) {
        setTimeout(function () {
          _this6.focusToTargetItemEl(0);
        }, 10);
      }
    }
  }, {
    key: "onSelect",
    value: function onSelect(entry) {
      if (this.props.onSelect) {
        this.props.onSelect(entry);
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      if (e.keyCode === 38 || e.keyCode === 40) {
        // UP/DOWN
        e.preventDefault();
        e.stopPropagation();
        var currentEl = e.target.parentElement;
        var itemEl = e.keyCode === 40 ? currentEl.nextSibling : currentEl.previousSibling;

        while (itemEl) {
          var anchorEl = itemEl.querySelector('.react-slds-candidate[tabIndex]');

          if (anchorEl && !anchorEl.disabled) {
            anchorEl.focus();
            return;
          }

          itemEl = e.keyCode === 40 ? itemEl.nextSibling : itemEl.previousSibling;
        }
      } else if (e.keyCode === 27) {
        // ESC
        e.preventDefault();
        e.stopPropagation();
        this.onSelect(null);
      }
    }
  }, {
    key: "focusToTargetItemEl",
    value: function focusToTargetItemEl(index) {
      var el = this.node;

      if (!el) {
        return;
      }

      var anchors = el.querySelectorAll('.react-slds-candidate[tabIndex]');

      if (anchors[index]) {
        anchors[index].focus();
      }
    }
  }, {
    key: "renderCandidate",
    value: function renderCandidate(entry) {
      var _this7 = this;

      var category = entry.category,
          icon = entry.icon,
          label = entry.label,
          value = entry.value,
          meta = entry.meta;
      return _react.default.createElement("li", {
        key: value,
        role: "presentation"
      }, _react.default.createElement("a", {
        className: "slds-lookup__item-action react-slds-candidate",
        tabIndex: -1,
        role: "option",
        "aria-selected": false,
        onKeyDown: function onKeyDown(e) {
          return e.keyCode === 13 && _this7.onSelect(entry);
        },
        onBlur: this.props.onBlur,
        onClick: function onClick() {
          return _this7.onSelect(entry);
        }
      }, _react.default.createElement("span", {
        className: "slds-truncate",
        style: {
          display: 'inline-flex',
          alignItems: 'center'
        }
      }, icon ? _react.default.createElement(_Icon.Icon, {
        style: {
          minWidth: '1.5rem'
        },
        className: "slds-m-right--x-small",
        category: category,
        icon: icon,
        size: "small"
      }) : undefined, _react.default.createElement("div", {
        className: "slds-truncate"
      }, _react.default.createElement("span", {
        className: "slds-lookup__result-text slds-truncate"
      }, label), meta ? _react.default.createElement("span", {
        className: "slds-lookup__result-meta slds-truncate"
      }, meta) : undefined))));
    }
  }, {
    key: "render",
    value: function render() {
      var _this8 = this;

      var trueFilter = function trueFilter() {
        return true;
      };

      var _this$props3 = this.props,
          _this$props3$data = _this$props3.data,
          data = _this$props3$data === void 0 ? [] : _this$props3$data,
          loading = _this$props3.loading,
          header = _this$props3.header,
          footer = _this$props3.footer,
          _this$props3$filter = _this$props3.filter,
          filter = _this$props3$filter === void 0 ? trueFilter : _this$props3$filter,
          align = _this$props3.align,
          vertAlign = _this$props3.vertAlign,
          listRef = _this$props3.listRef;
      var lookupMenuClassNames = (0, _classnames.default)('slds-lookup__menu', 'slds-show');
      var listStyles = (0, _objectSpread2.default)({
        minWidth: '15rem'
      }, vertAlign === 'bottom' ? {
        bottom: '100%'
      } : {}, align === 'right' ? {
        left: 'auto',
        right: 0
      } : {});

      var handleDOMRef = function handleDOMRef(node) {
        _this8.node = node;

        if (listRef) {
          listRef(node);
        }
      };

      return (// eslint-disable-next-line jsx-a11y/interactive-supports-focus
        _react.default.createElement("div", {
          ref: handleDOMRef,
          className: lookupMenuClassNames,
          style: listStyles,
          role: "listbox",
          onKeyDown: this.onKeyDown.bind(this)
        }, header ? _react.default.createElement("div", {
          className: "slds-lookup__item"
        }, header) : undefined, _react.default.createElement("ul", {
          className: "slds-lookup__list",
          role: "presentation"
        }, data.filter(filter).map(this.renderCandidate.bind(this)), loading ? _react.default.createElement("li", {
          className: "slds-lookup__item",
          key: "loading",
          style: {
            height: 20
          }
        }, _react.default.createElement(_Spinner.Spinner, {
          container: false,
          size: "small",
          style: {
            margin: '0 auto'
          }
        })) : undefined), footer ? _react.default.createElement("div", {
          className: "slds-lookup__item"
        }, footer) : undefined)
      );
    }
  }]);
  return LookupCandidateList;
}(_react.Component);

var LookupCandidateListPortal = (0, _AutoAlign.autoAlign)({
  triggerSelector: '.slds-lookup'
})(LookupCandidateList);
exports.LookupCandidateListPortal = LookupCandidateListPortal;

/**
 *
 */
var Lookup =
/*#__PURE__*/
function (_Component4) {
  (0, _inherits2.default)(Lookup, _Component4);

  // eslint-disable-next-line react/sort-comp
  function Lookup(props) {
    var _this9;

    (0, _classCallCheck2.default)(this, Lookup);
    _this9 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf4.default)(Lookup).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this9), "node", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this9), "selection", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this9), "candidateList", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this9), "search", void 0);
    _this9.state = {
      id: "form-element-".concat((0, _util.uuid)()),
      selected: props.defaultSelected,
      opened: props.defaultOpened,
      searchText: props.defaultSearchText,
      targetScope: props.defaultTargetScope,
      focusFirstCandidate: false
    };
    return _this9;
  }

  (0, _createClass2.default)(Lookup, [{
    key: "onScopeMenuClick",
    value: function onScopeMenuClick(e) {
      this.setState({
        opened: false
      });

      if (this.props.onScopeMenuClick) {
        this.props.onScopeMenuClick(e);
      }
    }
  }, {
    key: "onScopeChange",
    value: function onScopeChange(targetScope) {
      this.setState({
        targetScope: targetScope
      });

      if (this.props.onScopeChange) {
        this.props.onScopeChange(targetScope);
      }
    }
  }, {
    key: "onSearchTextChange",
    value: function onSearchTextChange(searchText) {
      this.setState({
        searchText: searchText
      });

      if (this.props.onSearchTextChange) {
        this.props.onSearchTextChange(searchText);
      }
    }
  }, {
    key: "onLookupRequest",
    value: function onLookupRequest(searchText) {
      this.setState({
        opened: true
      });

      if (this.props.onLookupRequest) {
        this.props.onLookupRequest(searchText);
      }
    }
  }, {
    key: "onResetSelection",
    value: function onResetSelection() {
      var _this10 = this;

      this.setState({
        selected: null
      });

      if (this.props.onSelect) {
        this.props.onSelect(null);
      }

      this.onSearchTextChange('');
      this.onLookupRequest('');
      setTimeout(function () {
        var searchElem = _this10.search;
        var inputElem = searchElem && searchElem.querySelector('input');

        if (!inputElem) {
          return;
        }

        inputElem.focus();
      }, 10);
    }
  }, {
    key: "onLookupItemSelect",
    value: function onLookupItemSelect(selected) {
      var _this11 = this;

      if (selected) {
        this.setState({
          selected: selected,
          opened: false
        });

        if (this.props.onSelect) {
          this.props.onSelect(selected);
        }

        setTimeout(function () {
          var selectionElem = _this11.selection;
          var pillElem = selectionElem && selectionElem.querySelector('a');

          if (pillElem) {
            pillElem.focus();
          }
        }, 10);
      } else {
        this.setState({
          opened: false
        });
        setTimeout(function () {
          var searchElem = _this11.search;
          var inputElem = searchElem.querySelector('input');
          inputElem.focus();
        }, 10);
      }

      if (this.props.onComplete) {
        this.props.onComplete(); // tell the component container to quit lookup
      }
    }
  }, {
    key: "onFocusFirstCandidate",
    value: function onFocusFirstCandidate() {
      var _this12 = this;

      var _this$props$opened = this.props.opened,
          opened = _this$props$opened === void 0 ? this.state.opened : _this$props$opened;

      if (!opened) {
        this.onLookupRequest(this.state.searchText);
      } else {
        this.setState({
          focusFirstCandidate: true
        });
        setTimeout(function () {
          _this12.setState({
            focusFirstCandidate: false
          });
        }, 10);
      }
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      var _this13 = this;

      setTimeout(function () {
        if (!_this13.isFocusedInComponent()) {
          _this13.setState({
            opened: false
          });

          if (_this13.props.onBlur) {
            _this13.props.onBlur();
          }

          if (_this13.props.onComplete) {
            _this13.props.onComplete(true); // quit lookup (cancel)

          }
        }
      }, 10);
    }
  }, {
    key: "isFocusedInComponent",
    value: function isFocusedInComponent() {
      var targetEl = document.activeElement;
      return (0, _util.isElInChildren)(this.node, targetEl) || (0, _util.isElInChildren)(this.candidateList, targetEl);
    }
  }, {
    key: "render",
    value: function render() {
      var _this14 = this;

      var id = this.props.id || this.state.id;
      var _this$props4 = this.props,
          totalCols = _this$props4.totalCols,
          cols = _this$props4.cols,
          label = _this$props4.label,
          required = _this$props4.required,
          error = _this$props4.error,
          className = _this$props4.className,
          _this$props4$selected = _this$props4.selected,
          selected = _this$props4$selected === void 0 ? this.state.selected : _this$props4$selected,
          _this$props4$opened = _this$props4.opened,
          opened = _this$props4$opened === void 0 ? this.state.opened : _this$props4$opened,
          _this$props4$searchTe = _this$props4.searchText,
          searchText = _this$props4$searchTe === void 0 ? this.state.searchText : _this$props4$searchTe,
          _this$props4$targetSc = _this$props4.targetScope,
          targetScope = _this$props4$targetSc === void 0 ? this.state.targetScope : _this$props4$targetSc,
          loading = _this$props4.loading,
          lookupFilter = _this$props4.lookupFilter,
          listHeader = _this$props4.listHeader,
          listFooter = _this$props4.listFooter,
          data = _this$props4.data,
          onComplete = _this$props4.onComplete,
          props = (0, _objectWithoutProperties2.default)(_this$props4, ["totalCols", "cols", "label", "required", "error", "className", "selected", "opened", "searchText", "targetScope", "loading", "lookupFilter", "listHeader", "listFooter", "data", "onComplete"]);
      var lookupClassNames = (0, _classnames.default)('slds-lookup', {
        'slds-has-selection': selected
      }, className);
      var formElemProps = {
        id: id,
        totalCols: totalCols,
        cols: cols,
        label: label,
        required: required,
        error: error
      };
      /* eslint-disable @typescript-eslint/no-unused-vars */

      var defaultSelected = props.defaultSelected,
          defaultOpened = props.defaultOpened,
          defaultSearchText = props.defaultSearchText,
          defaultTargetScope = props.defaultTargetScope,
          onSelect = props.onSelect,
          onBlur = props.onBlur,
          onScopeChange = props.onScopeChange,
          onScopeMenuClick = props.onScopeMenuClick,
          onSearchTextChange = props.onSearchTextChange,
          onLookupRequest = props.onLookupRequest,
          searchProps = (0, _objectWithoutProperties2.default)(props, ["defaultSelected", "defaultOpened", "defaultSearchText", "defaultTargetScope", "onSelect", "onBlur", "onScopeChange", "onScopeMenuClick", "onSearchTextChange", "onLookupRequest"]);
      /* eslint-enable @typescript-eslint/no-unused-vars */

      return _react.default.createElement(_FormElement.FormElement, (0, _extends2.default)({
        formElementRef: function formElementRef(node) {
          return _this14.node = node;
        }
      }, formElemProps), _react.default.createElement("div", {
        className: lookupClassNames,
        ref: function ref(node) {
          return _this14.node = node;
        },
        "data-select": "single",
        "data-scope": props.scopes ? 'multi' : 'single',
        "data-typeahead": false
      }, selected ? _react.default.createElement(LookupSelection, {
        id: id,
        lookupSelectionRef: function lookupSelectionRef(node) {
          return _this14.selection = node;
        },
        selected: selected,
        onResetSelection: this.onResetSelection.bind(this)
      }) : _react.default.createElement(LookupSearch, (0, _extends2.default)({}, searchProps, {
        id: id,
        lookupSearchRef: function lookupSearchRef(node) {
          return _this14.search = node;
        },
        searchText: searchText,
        targetScope: targetScope,
        onScopeMenuClick: this.onScopeMenuClick.bind(this),
        onScopeChange: this.onScopeChange.bind(this),
        onChange: this.onSearchTextChange.bind(this),
        onSubmit: function onSubmit() {
          return _this14.onLookupRequest(searchText);
        },
        onPressDown: this.onFocusFirstCandidate.bind(this),
        onComplete: onComplete,
        onBlur: this.onBlur.bind(this)
      })), opened ? _react.default.createElement(LookupCandidateListPortal, {
        portalClassName: lookupClassNames,
        listRef: function listRef(node) {
          return _this14.candidateList = node;
        },
        data: data,
        focus: this.state.focusFirstCandidate,
        loading: loading,
        filter: lookupFilter ? function (entry) {
          return lookupFilter(entry, searchText, targetScope);
        } : undefined,
        header: listHeader,
        footer: listFooter,
        onSelect: this.onLookupItemSelect.bind(this),
        onBlur: this.onBlur.bind(this)
      }) : undefined));
    }
  }]);
  return Lookup;
}(_react.Component);

exports.Lookup = Lookup;
(0, _defineProperty2.default)(Lookup, "isFormElement", true);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL0xvb2t1cC50c3giXSwibmFtZXMiOlsiTG9va3VwU2VsZWN0aW9uIiwiZSIsImtleUNvZGUiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsInByb3BzIiwib25SZXNldFNlbGVjdGlvbiIsInNlbGVjdGVkIiwib25QaWxsQ2xpY2siLCJ0YXJnZXQiLCJmb2N1cyIsImlkIiwibm9kZSIsInBpbGwiLCJvbktleURvd24iLCJiaW5kIiwiaWNvbiIsImNhdGVnb3J5IiwidW5kZWZpbmVkIiwibGFiZWwiLCJoaWRkZW4iLCJsb29rdXBTZWxlY3Rpb25SZWYiLCJsb29rdXBDbGFzc05hbWVzIiwicmVuZGVyUGlsbCIsIkNvbXBvbmVudCIsIkxvb2t1cFNlYXJjaCIsIm9uU3VibWl0Iiwic2VhcmNoVGV4dCIsInZhbHVlIiwib25Db21wbGV0ZSIsIm9uUHJlc3NEb3duIiwiY2FuY2VsIiwib25DaGFuZ2UiLCJzZXRUaW1lb3V0IiwiaXNGb2N1c2VkSW5Db21wb25lbnQiLCJvbkJsdXIiLCJvblNjb3BlTWVudUNsaWNrIiwic2NvcGUiLCJvblNjb3BlQ2hhbmdlIiwibG9va3VwU2VhcmNoUmVmIiwiZG9jdW1lbnQiLCJhY3RpdmVFbGVtZW50IiwiY2xhc3NOYW1lIiwiaWNvbkFsaWduIiwic2VhcmNoSW5wdXRDbGFzc05hbWVzIiwicHByb3BzIiwiT2JqZWN0IiwiYXNzaWduIiwidGFyZ2V0U2NvcGUiLCJkZWZhdWx0VGFyZ2V0U2NvcGUiLCJvblNlYXJjaFRleHRDaGFuZ2UiLCJzY29wZXMiLCJvbkxvb2t1cFJlcXVlc3QiLCJkZWZhdWx0U2VhcmNoVGV4dCIsIm9uVmFsdWVDaGFuZ2UiLCJoYW5kbGVMb29rdXBTZWFyY2hSZWYiLCJpbnB1dCIsIm9uSW5wdXRLZXlEb3duIiwib25JbnB1dENoYW5nZSIsIm9uSW5wdXRCbHVyIiwiZGlzYWJsZWQiLCJwb3NpdGlvbiIsImN1cnNvciIsIm91dGxpbmUiLCJvbkxvb2t1cEljb25DbGljayIsInNlbGVjdG9yQ2xhc3NOYW1lcyIsIm9uTWVudUl0ZW1DbGljayIsIm1hcCIsImxvb2t1cFNlYXJjaENsYXNzTmFtZXMiLCJzdHlsZXMiLCJXZWJraXRGbGV4V3JhcCIsIm1zRmxleFdyYXAiLCJmbGV4V3JhcCIsInJlbmRlclNjb3BlU2VsZWN0b3IiLCJyZW5kZXJTZWFyY2hJbnB1dCIsImJhcmUiLCJMb29rdXBDYW5kaWRhdGVMaXN0IiwiZm9jdXNUb1RhcmdldEl0ZW1FbCIsInByZXZQcm9wcyIsImVudHJ5Iiwib25TZWxlY3QiLCJjdXJyZW50RWwiLCJwYXJlbnRFbGVtZW50IiwiaXRlbUVsIiwibmV4dFNpYmxpbmciLCJwcmV2aW91c1NpYmxpbmciLCJhbmNob3JFbCIsInF1ZXJ5U2VsZWN0b3IiLCJpbmRleCIsImVsIiwiYW5jaG9ycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJtZXRhIiwiZGlzcGxheSIsImFsaWduSXRlbXMiLCJtaW5XaWR0aCIsInRydWVGaWx0ZXIiLCJkYXRhIiwibG9hZGluZyIsImhlYWRlciIsImZvb3RlciIsImZpbHRlciIsImFsaWduIiwidmVydEFsaWduIiwibGlzdFJlZiIsImxvb2t1cE1lbnVDbGFzc05hbWVzIiwibGlzdFN0eWxlcyIsImJvdHRvbSIsImxlZnQiLCJyaWdodCIsImhhbmRsZURPTVJlZiIsInJlbmRlckNhbmRpZGF0ZSIsImhlaWdodCIsIm1hcmdpbiIsIkxvb2t1cENhbmRpZGF0ZUxpc3RQb3J0YWwiLCJ0cmlnZ2VyU2VsZWN0b3IiLCJMb29rdXAiLCJzdGF0ZSIsImRlZmF1bHRTZWxlY3RlZCIsIm9wZW5lZCIsImRlZmF1bHRPcGVuZWQiLCJmb2N1c0ZpcnN0Q2FuZGlkYXRlIiwic2V0U3RhdGUiLCJzZWFyY2hFbGVtIiwic2VhcmNoIiwiaW5wdXRFbGVtIiwic2VsZWN0aW9uRWxlbSIsInNlbGVjdGlvbiIsInBpbGxFbGVtIiwidGFyZ2V0RWwiLCJjYW5kaWRhdGVMaXN0IiwidG90YWxDb2xzIiwiY29scyIsInJlcXVpcmVkIiwiZXJyb3IiLCJsb29rdXBGaWx0ZXIiLCJsaXN0SGVhZGVyIiwibGlzdEZvb3RlciIsImZvcm1FbGVtUHJvcHMiLCJzZWFyY2hQcm9wcyIsIm9uRm9jdXNGaXJzdENhbmRpZGF0ZSIsIm9uTG9va3VwSXRlbVNlbGVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQXNCQTs7O0lBR2FBLGU7Ozs7Ozs7Ozs7Ozs7Ozs7O3VGQUNnQixJOzs7Ozs7OEJBRWpCQyxDLEVBQVE7QUFDaEIsVUFBSUEsQ0FBQyxDQUFDQyxPQUFGLEtBQWMsQ0FBZCxJQUFtQkQsQ0FBQyxDQUFDQyxPQUFGLEtBQWMsRUFBckMsRUFBeUM7QUFDdkM7QUFDQUQsUUFBQUEsQ0FBQyxDQUFDRSxjQUFGO0FBQ0FGLFFBQUFBLENBQUMsQ0FBQ0csZUFBRjs7QUFDQSxZQUFJLEtBQUtDLEtBQUwsQ0FBV0MsZ0JBQWYsRUFBaUM7QUFDL0IsZUFBS0QsS0FBTCxDQUFXQyxnQkFBWDtBQUNEO0FBQ0Y7QUFDRjs7OytCQUVVQyxRLEVBQXVCO0FBQUE7O0FBQ2hDLFVBQU1DLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUNQLENBQUQsRUFBWTtBQUM5QkEsUUFBQUEsQ0FBQyxDQUFDUSxNQUFGLENBQVNDLEtBQVQ7QUFDQVQsUUFBQUEsQ0FBQyxDQUFDRSxjQUFGO0FBQ0FGLFFBQUFBLENBQUMsQ0FBQ0csZUFBRjtBQUNELE9BSkQ7O0FBS0EsYUFDRSw2QkFBQyxVQUFEO0FBQ0UsUUFBQSxFQUFFLEVBQUUsS0FBS0MsS0FBTCxDQUFXTSxFQURqQjtBQUVFLFFBQUEsUUFBUSxNQUZWO0FBR0UsUUFBQSxPQUFPLEVBQUUsaUJBQUNDLElBQUQ7QUFBQSxpQkFBVyxNQUFJLENBQUNDLElBQUwsR0FBWUQsSUFBdkI7QUFBQSxTQUhYO0FBSUUsUUFBQSxTQUFTLEVBQUUsS0FBS0UsU0FBTCxDQUFl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eyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IGF1dG9BbGlnbiwgSW5qZWN0ZWRQcm9wcyB9IGZyb20gJy4vQXV0b0FsaWduJztcbmltcG9ydCB7IEZvcm1FbGVtZW50LCBGb3JtRWxlbWVudFByb3BzIH0gZnJvbSAnLi9Gb3JtRWxlbWVudCc7XG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gJy4vSW5wdXQnO1xuaW1wb3J0IHsgSWNvbiwgSWNvbkNhdGVnb3J5IH0gZnJvbSAnLi9JY29uJztcbmltcG9ydCB7IFNwaW5uZXIgfSBmcm9tICcuL1NwaW5uZXInO1xuaW1wb3J0IHsgUGlsbCB9IGZyb20gJy4vUGlsbCc7XG5pbXBvcnQgeyBEcm9wZG93bkJ1dHRvbiB9IGZyb20gJy4vRHJvcGRvd25CdXR0b24nO1xuaW1wb3J0IHsgRHJvcGRvd25NZW51SXRlbSB9IGZyb20gJy4vRHJvcGRvd25NZW51JztcbmltcG9ydCB7IHV1aWQsIGlzRWxJbkNoaWxkcmVuLCByZWdpc3RlclN0eWxlIH0gZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKlxuICovXG5leHBvcnQgdHlwZSBMb29rdXBFbnRyeSA9IHtcbiAgc2NvcGU/OiBzdHJpbmc7XG4gIGNhdGVnb3J5PzogSWNvbkNhdGVnb3J5O1xuICBpY29uOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIG1ldGE/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBMb29rdXBTZWxlY3Rpb25Qcm9wcyA9IHtcbiAgaWQ/OiBzdHJpbmc7XG4gIHNlbGVjdGVkPzogTG9va3VwRW50cnk7XG4gIGhpZGRlbj86IGJvb2xlYW47XG4gIG9uUmVzZXRTZWxlY3Rpb24/OiAoZT86IGFueSkgPT4gdm9pZDtcbiAgbG9va3VwU2VsZWN0aW9uUmVmPzogKG5vZGU6IEhUTUxEaXZFbGVtZW50KSA9PiB2b2lkO1xufTtcblxuLyoqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgTG9va3VwU2VsZWN0aW9uIGV4dGVuZHMgQ29tcG9uZW50PExvb2t1cFNlbGVjdGlvblByb3BzPiB7XG4gIHBpbGw6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgb25LZXlEb3duKGU6IGFueSkge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDggfHwgZS5rZXlDb2RlID09PSA0Nikge1xuICAgICAgLy8gQmFjc3BhY2UgLyBERUxcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vblJlc2V0U2VsZWN0aW9uKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25SZXNldFNlbGVjdGlvbigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlclBpbGwoc2VsZWN0ZWQ6IExvb2t1cEVudHJ5KSB7XG4gICAgY29uc3Qgb25QaWxsQ2xpY2sgPSAoZTogYW55KSA9PiB7XG4gICAgICBlLnRhcmdldC5mb2N1cygpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8UGlsbFxuICAgICAgICBpZD17dGhpcy5wcm9wcy5pZH1cbiAgICAgICAgdHJ1bmNhdGVcbiAgICAgICAgcGlsbFJlZj17KG5vZGUpID0+ICh0aGlzLnBpbGwgPSBub2RlKX1cbiAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uS2V5RG93bi5iaW5kKHRoaXMpfVxuICAgICAgICBvbkNsaWNrPXtvblBpbGxDbGlja31cbiAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgIGljb249e1xuICAgICAgICAgIHNlbGVjdGVkLmljb25cbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiBzZWxlY3RlZC5jYXRlZ29yeSxcbiAgICAgICAgICAgICAgICBpY29uOiBzZWxlY3RlZC5pY29uLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgICAgIGxhYmVsPXtzZWxlY3RlZC5sYWJlbH1cbiAgICAgICAgb25SZW1vdmU9e3RoaXMucHJvcHMub25SZXNldFNlbGVjdGlvbn1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGhpZGRlbiwgc2VsZWN0ZWQsIGxvb2t1cFNlbGVjdGlvblJlZiB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBsb29rdXBDbGFzc05hbWVzID0gY2xhc3NuYW1lcyh7ICdzbGRzLWhpZGUnOiBoaWRkZW4gfSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgcmVmPXtsb29rdXBTZWxlY3Rpb25SZWZ9IGNsYXNzTmFtZT17bG9va3VwQ2xhc3NOYW1lc30+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzbGRzLXBpbGxfX2NvbnRhaW5lcic+XG4gICAgICAgICAge3NlbGVjdGVkID8gdGhpcy5yZW5kZXJQaWxsKHNlbGVjdGVkKSA6IHVuZGVmaW5lZH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIExvb2t1cFNjb3BlID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBpY29uOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBMb29rdXBTZWFyY2hQcm9wcyA9IHtcbiAgaWQ/OiBzdHJpbmc7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgaGlkZGVuPzogYm9vbGVhbjtcbiAgc2VhcmNoVGV4dD86IHN0cmluZztcbiAgc2NvcGVzPzogTG9va3VwU2NvcGVbXTtcbiAgdGFyZ2V0U2NvcGU/OiBhbnk7XG4gIGljb25BbGlnbj86ICdsZWZ0JyB8ICdyaWdodCc7XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgb25LZXlEb3duPzogKGU6IGFueSkgPT4gdm9pZDtcbiAgb25CbHVyPzogKGU6IGFueSkgPT4gdm9pZDtcbiAgb25DaGFuZ2U/OiAoc2VhcmNoVGV4dDogc3RyaW5nKSA9PiB2b2lkO1xuICBvblNjb3BlTWVudUNsaWNrPzogKGU6IGFueSkgPT4gdm9pZDtcbiAgb25TY29wZUNoYW5nZT86ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvblByZXNzRG93bj86ICgpID0+IHZvaWQ7XG4gIG9uU3VibWl0PzogKCkgPT4gdm9pZDtcbiAgb25Db21wbGV0ZT86IChjYW5jZWw/OiBib29sZWFuKSA9PiB2b2lkO1xuICBsb29rdXBTZWFyY2hSZWY/OiAobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHZvaWQ7XG59O1xuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBMb29rdXBTZWFyY2ggZXh0ZW5kcyBDb21wb25lbnQ8TG9va3VwU2VhcmNoUHJvcHM+IHtcbiAgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICBub2RlOiBIVE1MRGl2RWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBSZWFkb25seTxMb29rdXBTZWFyY2hQcm9wcz4pIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuICAgIHJlZ2lzdGVyU3R5bGUoJ2xvb2t1cFNlYXJjaCcsIFtcbiAgICAgIFtcbiAgICAgICAgJy5zbGRzLWxvb2t1cFtkYXRhLXNjb3BlPVwibXVsdGlcIl0gLnJlYWN0LXNsZHMtbG9va3VwLXNjb3BlLXNlbGVjdG9yJyxcbiAgICAgICAgJ3sgbWluLXdpZHRoOiAzcmVtOyB9JyxcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICcuc2xkcy1sb29rdXBbZGF0YS1zY29wZT1cIm11bHRpXCJdIC5yZWFjdC1zbGRzLWxvb2t1cC1zY29wZS1zZWxlY3RvciAuc2xkcy1kcm9wZG93bi10cmlnZ2VyJyxcbiAgICAgICAgJ3sgbWFyZ2luLWxlZnQ6IDA7IH0nLFxuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJy5zbGRzLWxvb2t1cFtkYXRhLXNjb3BlPVwibXVsdGlcIl0gLnJlYWN0LXNsZHMtbG9va3VwLXNjb3BlLXNlbGVjdG9yIC5zbGRzLWRyb3Bkb3duLXRyaWdnZXIgLnNsZHMtYnV0dG9uJyxcbiAgICAgICAgJ3sgcGFkZGluZzogMCAwLjI1cmVtOyB9JyxcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgICcuc2xkcy1sb29rdXBbZGF0YS1zY29wZT1cIm11bHRpXCJdIC5zbGRzLWJveC0tYm9yZGVyJyxcbiAgICAgICAgJ3sgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7IH0nLFxuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJy5zbGRzLWxvb2t1cFtkYXRhLXNjb3BlPVwibXVsdGlcIl0gLnNsZHMtYm94LS1ib3JkZXIucmVhY3Qtc2xkcy1ib3gtZGlzYWJsZWQnLFxuICAgICAgICAneyBiYWNrZ3JvdW5kLWNvbG9yOiAjZTBlNWVlOyBib3JkZXItY29sb3I6ICNhOGI3Yzc7IGN1cnNvcjogbm90LWFsbG93ZWQ7IH0nLFxuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgJy5zbGRzLWxvb2t1cFtkYXRhLXNjb3BlPVwibXVsdGlcIl0gLnNsZHMtYm94LS1ib3JkZXIgLnNsZHMtaW5wdXQtLWJhcmUnLFxuICAgICAgICAneyBoZWlnaHQ6IDIuMTVyZW07IHdpZHRoOiAxMDAlOyB9JyxcbiAgICAgIF0sXG4gICAgXSk7XG4gIH1cblxuICBvbkxvb2t1cEljb25DbGljayA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblN1Ym1pdCkge1xuICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdCgpO1xuICAgIH1cbiAgfTtcblxuICBvbklucHV0S2V5RG93biA9IChlOiBhbnkpID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgLy8gcmV0dXJuIGtleVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGNvbnN0IHNlYXJjaFRleHQgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgIGlmIChzZWFyY2hUZXh0KSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uU3VibWl0KSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMub25Db21wbGV0ZSkge1xuICAgICAgICAvLyBpZiBubyBzZWFyY2ggdGV4dCwgcXVpdCBsb29rdXAgc2VhcmNoXG4gICAgICAgIHRoaXMucHJvcHMub25Db21wbGV0ZSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSA0MCkge1xuICAgICAgLy8gZG93biBrZXlcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vblByZXNzRG93bikge1xuICAgICAgICB0aGlzLnByb3BzLm9uUHJlc3NEb3duKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAvLyBFU0NcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAvLyBxdWl0IGxvb2t1cCBzZWFyY2ggKGNhbmNlbClcbiAgICAgIGNvbnN0IGNhbmNlbCA9IHRydWU7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vbkNvbXBsZXRlKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25Db21wbGV0ZShjYW5jZWwpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5wcm9wcy5vbktleURvd24pIHtcbiAgICAgIHRoaXMucHJvcHMub25LZXlEb3duKGUpO1xuICAgIH1cbiAgfTtcblxuICBvbklucHV0Q2hhbmdlID0gKGU6IGFueSkgPT4ge1xuICAgIGNvbnN0IHNlYXJjaFRleHQgPSBlLnRhcmdldC52YWx1ZTtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShzZWFyY2hUZXh0KTtcbiAgICB9XG4gIH07XG5cbiAgb25JbnB1dEJsdXIgPSAoZTogYW55KSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuaXNGb2N1c2VkSW5Db21wb25lbnQoKSkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkJsdXIpIHtcbiAgICAgICAgICB0aGlzLnByb3BzLm9uQmx1cihlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIDEwKTtcbiAgfTtcblxuICBvblNjb3BlTWVudUNsaWNrID0gKGU6IGFueSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uU2NvcGVNZW51Q2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25TY29wZU1lbnVDbGljayhlKTtcbiAgICB9XG4gIH07XG5cbiAgb25NZW51SXRlbUNsaWNrID0gKHNjb3BlOiBMb29rdXBTY29wZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uU2NvcGVDaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25TY29wZUNoYW5nZShzY29wZS52YWx1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUxvb2t1cFNlYXJjaFJlZiA9IChub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4ge1xuICAgIHRoaXMubm9kZSA9IG5vZGU7XG4gICAgY29uc3QgeyBsb29rdXBTZWFyY2hSZWYgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGxvb2t1cFNlYXJjaFJlZikge1xuICAgICAgbG9va3VwU2VhcmNoUmVmKG5vZGUpO1xuICAgIH1cbiAgfTtcblxuICBpc0ZvY3VzZWRJbkNvbXBvbmVudCgpIHtcbiAgICByZXR1cm4gaXNFbEluQ2hpbGRyZW4odGhpcy5ub2RlLCBkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcbiAgfVxuXG4gIHJlbmRlclNlYXJjaElucHV0KHByb3BzOiBhbnkpIHtcbiAgICBjb25zdCB7IGNsYXNzTmFtZSwgaGlkZGVuLCBzZWFyY2hUZXh0LCBpY29uQWxpZ24gPSAncmlnaHQnIH0gPSBwcm9wcztcbiAgICBjb25zdCBzZWFyY2hJbnB1dENsYXNzTmFtZXMgPSBjbGFzc25hbWVzKFxuICAgICAgJ3NsZHMtZ3JpZCcsXG4gICAgICAnc2xkcy1pbnB1dC1oYXMtaWNvbicsXG4gICAgICBgc2xkcy1pbnB1dC1oYXMtaWNvbi0tJHtpY29uQWxpZ259YCxcbiAgICAgIHsgJ3NsZHMtaGlkZSc6IGhpZGRlbiB9LFxuICAgICAgY2xhc3NOYW1lXG4gICAgKTtcbiAgICBjb25zdCBwcHJvcHMgPSBPYmplY3QuYXNzaWduKHt9LCBwcm9wcyk7XG4gICAgZGVsZXRlIHBwcm9wcy5pY29uQWxpZ247XG4gICAgZGVsZXRlIHBwcm9wcy5zZWFyY2hUZXh0O1xuICAgIGRlbGV0ZSBwcHJvcHMudGFyZ2V0U2NvcGU7XG4gICAgZGVsZXRlIHBwcm9wcy5vblNjb3BlTWVudUNsaWNrO1xuICAgIGRlbGV0ZSBwcHJvcHMub25TY29wZUNoYW5nZTtcbiAgICBkZWxldGUgcHByb3BzLm9uUHJlc3NEb3duO1xuICAgIGRlbGV0ZSBwcHJvcHMub25Db21wbGV0ZTtcbiAgICBkZWxldGUgcHByb3BzLmRlZmF1bHRUYXJnZXRTY29wZTtcbiAgICBkZWxldGUgcHByb3BzLm9uU2VhcmNoVGV4dENoYW5nZTtcbiAgICBkZWxldGUgcHByb3BzLnNjb3BlcztcbiAgICBkZWxldGUgcHByb3BzLm9uTG9va3VwUmVxdWVzdDtcbiAgICBkZWxldGUgcHByb3BzLmRlZmF1bHRTZWFyY2hUZXh0O1xuICAgIGRlbGV0ZSBwcHJvcHMub25WYWx1ZUNoYW5nZTtcbiAgICBkZWxldGUgcHByb3BzLmxvb2t1cFNlYXJjaFJlZjtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiByZWY9e3RoaXMuaGFuZGxlTG9va3VwU2VhcmNoUmVmfSBjbGFzc05hbWU9e3NlYXJjaElucHV0Q2xhc3NOYW1lc30+XG4gICAgICAgIDxJbnB1dFxuICAgICAgICAgIHsuLi5wcHJvcHN9XG4gICAgICAgICAgaW5wdXRSZWY9eyhub2RlKSA9PiAodGhpcy5pbnB1dCA9IG5vZGUpfVxuICAgICAgICAgIHZhbHVlPXtzZWFyY2hUZXh0fVxuICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5vbklucHV0S2V5RG93bn1cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0Q2hhbmdlfVxuICAgICAgICAgIG9uQmx1cj17dGhpcy5vbklucHV0Qmx1cn1cbiAgICAgICAgLz5cbiAgICAgICAgPHNwYW5cbiAgICAgICAgICB0YWJJbmRleD17LTF9XG4gICAgICAgICAgc3R5bGU9e1xuICAgICAgICAgICAgcHJvcHMuZGlzYWJsZWRcbiAgICAgICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgOiB7IHBvc2l0aW9uOiAncmVsYXRpdmUnLCBjdXJzb3I6ICdwb2ludGVyJywgb3V0bGluZTogJ25vbmUnIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgb25DbGljaz17cHJvcHMuZGlzYWJsZWQgPyB1bmRlZmluZWQgOiB0aGlzLm9uTG9va3VwSWNvbkNsaWNrfVxuICAgICAgICAgIG9uQmx1cj17dGhpcy5vbklucHV0Qmx1cn1cbiAgICAgICAgPlxuICAgICAgICAgIDxJY29uIGljb249J3NlYXJjaCcgY2xhc3NOYW1lPSdzbGRzLWlucHV0X19pY29uJyAvPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyU2NvcGVTZWxlY3Rvcih7IHNjb3BlcywgdGFyZ2V0U2NvcGU6IHRhcmdldCwgZGlzYWJsZWQgfTogYW55KSB7XG4gICAgbGV0IHRhcmdldFNjb3BlID0gc2NvcGVzWzBdIHx8IHt9O1xuICAgIGZvciAoY29uc3Qgc2NvcGUgb2Ygc2NvcGVzKSB7XG4gICAgICBpZiAoc2NvcGUudmFsdWUgPT09IHRhcmdldCkge1xuICAgICAgICB0YXJnZXRTY29wZSA9IHNjb3BlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgaWNvbiA9IDxJY29uIGljb249e3RhcmdldFNjb3BlLmljb24gfHwgJ25vbmUnfSBzaXplPSd4LXNtYWxsJyAvPjtcbiAgICBjb25zdCBzZWxlY3RvckNsYXNzTmFtZXMgPSBjbGFzc25hbWVzKFxuICAgICAgJ3NsZHMtZ3JpZCcsXG4gICAgICAnc2xkcy1ncmlkLS1hbGlnbi1jZW50ZXInLFxuICAgICAgJ3NsZHMtZ3JpZC0tdmVydGljYWwtYWxpZ24tY2VudGVyJyxcbiAgICAgICdyZWFjdC1zbGRzLWxvb2t1cC1zY29wZS1zZWxlY3RvcidcbiAgICApO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c2VsZWN0b3JDbGFzc05hbWVzfT5cbiAgICAgICAgPERyb3Bkb3duQnV0dG9uXG4gICAgICAgICAgbGFiZWw9e2ljb259XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25TY29wZU1lbnVDbGlja31cbiAgICAgICAgICBvbk1lbnVJdGVtQ2xpY2s9e3RoaXMub25NZW51SXRlbUNsaWNrfVxuICAgICAgICAgIG9uQmx1cj17dGhpcy5vbklucHV0Qmx1cn1cbiAgICAgICAgPlxuICAgICAgICAgIHtzY29wZXMubWFwKChzY29wZTogTG9va3VwU2NvcGUpID0+IChcbiAgICAgICAgICAgIDxEcm9wZG93bk1lbnVJdGVtIGtleT17c2NvcGUudmFsdWV9IHsuLi5zY29wZX0gLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9Ecm9wZG93bkJ1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBzY29wZXMsIGhpZGRlbiwgZGlzYWJsZWQsIHRhcmdldFNjb3BlLCAuLi5wcm9wcyB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoc2NvcGVzKSB7XG4gICAgICBjb25zdCBsb29rdXBTZWFyY2hDbGFzc05hbWVzID0gY2xhc3NuYW1lcyhcbiAgICAgICAgJ3NsZHMtZ3JpZCcsXG4gICAgICAgICdzbGRzLWZvcm0tZWxlbWVudF9fY29udHJvbCcsXG4gICAgICAgICdzbGRzLWJveC0tYm9yZGVyJyxcbiAgICAgICAgeyAncmVhY3Qtc2xkcy1ib3gtZGlzYWJsZWQnOiBkaXNhYmxlZCB9LFxuICAgICAgICB7ICdzbGRzLWhpZGUnOiBoaWRkZW4gfVxuICAgICAgKTtcbiAgICAgIGNvbnN0IHN0eWxlcyA9IHtcbiAgICAgICAgV2Via2l0RmxleFdyYXA6ICdub3dyYXAnIGFzIGNvbnN0LFxuICAgICAgICBtc0ZsZXhXcmFwOiAnbm93cmFwJyxcbiAgICAgICAgZmxleFdyYXA6ICdub3dyYXAnIGFzIGNvbnN0LFxuICAgICAgfTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e3RoaXMuaGFuZGxlTG9va3VwU2VhcmNoUmVmfVxuICAgICAgICAgIGNsYXNzTmFtZT17bG9va3VwU2VhcmNoQ2xhc3NOYW1lc31cbiAgICAgICAgICBzdHlsZT17c3R5bGVzfVxuICAgICAgICA+XG4gICAgICAgICAge3RoaXMucmVuZGVyU2NvcGVTZWxlY3Rvcih7IHNjb3BlcywgdGFyZ2V0U2NvcGUsIGRpc2FibGVkIH0pfVxuICAgICAgICAgIHt0aGlzLnJlbmRlclNlYXJjaElucHV0KHtcbiAgICAgICAgICAgIC4uLnByb3BzLFxuICAgICAgICAgICAgZGlzYWJsZWQsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdzbGRzLWNvbCcsXG4gICAgICAgICAgICBiYXJlOiB0cnVlLFxuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlbmRlclNlYXJjaElucHV0KHRoaXMucHJvcHMpO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIExvb2t1cENhbmRpZGF0ZUxpc3RQcm9wcyA9IHtcbiAgZGF0YT86IExvb2t1cEVudHJ5W107XG4gIGZvY3VzPzogYm9vbGVhbjtcbiAgbG9hZGluZz86IGJvb2xlYW47XG4gIGZpbHRlcj86IChlbnRyeTogTG9va3VwRW50cnkpID0+IGJvb2xlYW47XG4gIGxpc3RSZWY/OiAobm9kZTogSFRNTERpdkVsZW1lbnQpID0+IHZvaWQ7XG4gIG9uU2VsZWN0PzogKGVudHJ5OiBMb29rdXBFbnRyeSB8IG51bGwpID0+IHZvaWQ7XG4gIG9uQmx1cj86IChlOiBSZWFjdC5Gb2N1c0V2ZW50PEhUTUxBbmNob3JFbGVtZW50PikgPT4gdm9pZDtcbiAgaGVhZGVyPzogSlNYLkVsZW1lbnQ7XG4gIGZvb3Rlcj86IEpTWC5FbGVtZW50O1xufSAmIEluamVjdGVkUHJvcHM7XG5cbi8qKlxuICpcbiAqL1xuY2xhc3MgTG9va3VwQ2FuZGlkYXRlTGlzdCBleHRlbmRzIENvbXBvbmVudDxMb29rdXBDYW5kaWRhdGVMaXN0UHJvcHM+IHtcbiAgbm9kZTogSFRNTERpdkVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5mb2N1cykge1xuICAgICAgdGhpcy5mb2N1c1RvVGFyZ2V0SXRlbUVsKDApO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHM6IFJlYWRvbmx5PExvb2t1cENhbmRpZGF0ZUxpc3RQcm9wcz4pIHtcbiAgICBpZiAodGhpcy5wcm9wcy5mb2N1cyAmJiAhcHJldlByb3BzLmZvY3VzKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5mb2N1c1RvVGFyZ2V0SXRlbUVsKDApO1xuICAgICAgfSwgMTApO1xuICAgIH1cbiAgfVxuXG4gIG9uU2VsZWN0KGVudHJ5OiBMb29rdXBFbnRyeSB8IG51bGwpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblNlbGVjdCkge1xuICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChlbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgb25LZXlEb3duKGU6IGFueSkge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDM4IHx8IGUua2V5Q29kZSA9PT0gNDApIHtcbiAgICAgIC8vIFVQL0RPV05cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBjb25zdCBjdXJyZW50RWwgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgICAgbGV0IGl0ZW1FbCA9XG4gICAgICAgIGUua2V5Q29kZSA9PT0gNDAgPyBjdXJyZW50RWwubmV4dFNpYmxpbmcgOiBjdXJyZW50RWwucHJldmlvdXNTaWJsaW5nO1xuICAgICAgd2hpbGUgKGl0ZW1FbCkge1xuICAgICAgICBjb25zdCBhbmNob3JFbCA9IGl0ZW1FbC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICcucmVhY3Qtc2xkcy1jYW5kaWRhdGVbdGFiSW5kZXhdJ1xuICAgICAgICApO1xuICAgICAgICBpZiAoYW5jaG9yRWwgJiYgIWFuY2hvckVsLmRpc2FibGVkKSB7XG4gICAgICAgICAgYW5jaG9yRWwuZm9jdXMoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaXRlbUVsID0gZS5rZXlDb2RlID09PSA0MCA/IGl0ZW1FbC5uZXh0U2libGluZyA6IGl0ZW1FbC5wcmV2aW91c1NpYmxpbmc7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAvLyBFU0NcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLm9uU2VsZWN0KG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIGZvY3VzVG9UYXJnZXRJdGVtRWwoaW5kZXg6IG51bWJlcikge1xuICAgIGNvbnN0IGVsID0gdGhpcy5ub2RlO1xuICAgIGlmICghZWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYW5jaG9ycyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEFuY2hvckVsZW1lbnQ+KFxuICAgICAgJy5yZWFjdC1zbGRzLWNhbmRpZGF0ZVt0YWJJbmRleF0nXG4gICAgKTtcbiAgICBpZiAoYW5jaG9yc1tpbmRleF0pIHtcbiAgICAgIGFuY2hvcnNbaW5kZXhdLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyQ2FuZGlkYXRlKGVudHJ5OiBMb29rdXBFbnRyeSkge1xuICAgIGNvbnN0IHsgY2F0ZWdvcnksIGljb24sIGxhYmVsLCB2YWx1ZSwgbWV0YSB9ID0gZW50cnk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBrZXk9e3ZhbHVlfSByb2xlPSdwcmVzZW50YXRpb24nPlxuICAgICAgICA8YVxuICAgICAgICAgIGNsYXNzTmFtZT0nc2xkcy1sb29rdXBfX2l0ZW0tYWN0aW9uIHJlYWN0LXNsZHMtY2FuZGlkYXRlJ1xuICAgICAgICAgIHRhYkluZGV4PXstMX1cbiAgICAgICAgICByb2xlPSdvcHRpb24nXG4gICAgICAgICAgYXJpYS1zZWxlY3RlZD17ZmFsc2V9XG4gICAgICAgICAgb25LZXlEb3duPXsoZSkgPT4gZS5rZXlDb2RlID09PSAxMyAmJiB0aGlzLm9uU2VsZWN0KGVudHJ5KX1cbiAgICAgICAgICBvbkJsdXI9e3RoaXMucHJvcHMub25CbHVyfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMub25TZWxlY3QoZW50cnkpfVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgIGNsYXNzTmFtZT0nc2xkcy10cnVuY2F0ZSdcbiAgICAgICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2ljb24gPyAoXG4gICAgICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgbWluV2lkdGg6ICcxLjVyZW0nIH19XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdzbGRzLW0tcmlnaHQtLXgtc21hbGwnXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk9e2NhdGVnb3J5fVxuICAgICAgICAgICAgICAgIGljb249e2ljb259XG4gICAgICAgICAgICAgICAgc2l6ZT0nc21hbGwnXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICB1bmRlZmluZWRcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2xkcy10cnVuY2F0ZSc+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nc2xkcy1sb29rdXBfX3Jlc3VsdC10ZXh0IHNsZHMtdHJ1bmNhdGUnPlxuICAgICAgICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICB7bWV0YSA/IChcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3NsZHMtbG9va3VwX19yZXN1bHQtbWV0YSBzbGRzLXRydW5jYXRlJz5cbiAgICAgICAgICAgICAgICAgIHttZXRhfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICB1bmRlZmluZWRcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9hPlxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHRydWVGaWx0ZXIgPSAoKSA9PiB0cnVlO1xuICAgIGNvbnN0IHtcbiAgICAgIGRhdGEgPSBbXSxcbiAgICAgIGxvYWRpbmcsXG4gICAgICBoZWFkZXIsXG4gICAgICBmb290ZXIsXG4gICAgICBmaWx0ZXIgPSB0cnVlRmlsdGVyLFxuICAgICAgYWxpZ24sXG4gICAgICB2ZXJ0QWxpZ24sXG4gICAgICBsaXN0UmVmLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGxvb2t1cE1lbnVDbGFzc05hbWVzID0gY2xhc3NuYW1lcygnc2xkcy1sb29rdXBfX21lbnUnLCAnc2xkcy1zaG93Jyk7XG4gICAgY29uc3QgbGlzdFN0eWxlcyA9IHtcbiAgICAgIG1pbldpZHRoOiAnMTVyZW0nLFxuICAgICAgLi4uKHZlcnRBbGlnbiA9PT0gJ2JvdHRvbScgPyB7IGJvdHRvbTogJzEwMCUnIH0gOiB7fSksXG4gICAgICAuLi4oYWxpZ24gPT09ICdyaWdodCcgPyB7IGxlZnQ6ICdhdXRvJywgcmlnaHQ6IDAgfSA6IHt9KSxcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZURPTVJlZiA9IChub2RlOiBIVE1MRGl2RWxlbWVudCkgPT4ge1xuICAgICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgICAgIGlmIChsaXN0UmVmKSB7XG4gICAgICAgIGxpc3RSZWYobm9kZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGpzeC1hMTF5L2ludGVyYWN0aXZlLXN1cHBvcnRzLWZvY3VzXG4gICAgICA8ZGl2XG4gICAgICAgIHJlZj17aGFuZGxlRE9NUmVmfVxuICAgICAgICBjbGFzc05hbWU9e2xvb2t1cE1lbnVDbGFzc05hbWVzfVxuICAgICAgICBzdHlsZT17bGlzdFN0eWxlc31cbiAgICAgICAgcm9sZT0nbGlzdGJveCdcbiAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uS2V5RG93bi5iaW5kKHRoaXMpfVxuICAgICAgPlxuICAgICAgICB7aGVhZGVyID8gPGRpdiBjbGFzc05hbWU9J3NsZHMtbG9va3VwX19pdGVtJz57aGVhZGVyfTwvZGl2PiA6IHVuZGVmaW5lZH1cbiAgICAgICAgPHVsIGNsYXNzTmFtZT0nc2xkcy1sb29rdXBfX2xpc3QnIHJvbGU9J3ByZXNlbnRhdGlvbic+XG4gICAgICAgICAge2RhdGEuZmlsdGVyKGZpbHRlcikubWFwKHRoaXMucmVuZGVyQ2FuZGlkYXRlLmJpbmQodGhpcykpfVxuICAgICAgICAgIHtsb2FkaW5nID8gKFxuICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT0nc2xkcy1sb29rdXBfX2l0ZW0nXG4gICAgICAgICAgICAgIGtleT0nbG9hZGluZydcbiAgICAgICAgICAgICAgc3R5bGU9e3sgaGVpZ2h0OiAyMCB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8U3Bpbm5lclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lcj17ZmFsc2V9XG4gICAgICAgICAgICAgICAgc2l6ZT0nc21hbGwnXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgbWFyZ2luOiAnMCBhdXRvJyB9fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgdW5kZWZpbmVkXG4gICAgICAgICAgKX1cbiAgICAgICAgPC91bD5cbiAgICAgICAge2Zvb3RlciA/IDxkaXYgY2xhc3NOYW1lPSdzbGRzLWxvb2t1cF9faXRlbSc+e2Zvb3Rlcn08L2Rpdj4gOiB1bmRlZmluZWR9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBMb29rdXBDYW5kaWRhdGVMaXN0UG9ydGFsID0gYXV0b0FsaWduKHtcbiAgdHJpZ2dlclNlbGVjdG9yOiAnLnNsZHMtbG9va3VwJyxcbn0pKExvb2t1cENhbmRpZGF0ZUxpc3QpO1xuXG5leHBvcnQgdHlwZSBMb29rdXBQcm9wcyA9IHtcbiAgaWQ/OiBzdHJpbmc7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgbGFiZWw/OiBzdHJpbmc7XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgcmVxdWlyZWQ/OiBib29sZWFuO1xuICBlcnJvcj86IEZvcm1FbGVtZW50UHJvcHNbJ2Vycm9yJ107XG4gIGljb25BbGlnbj86ICdsZWZ0JyB8ICdyaWdodCc7XG5cbiAgdmFsdWU/OiBzdHJpbmc7XG4gIGRlZmF1bHRWYWx1ZT86IHN0cmluZztcblxuICBzZWxlY3RlZD86IExvb2t1cEVudHJ5IHwgbnVsbDtcbiAgZGVmYXVsdFNlbGVjdGVkPzogTG9va3VwRW50cnk7XG5cbiAgb3BlbmVkPzogYm9vbGVhbjtcbiAgZGVmYXVsdE9wZW5lZD86IGJvb2xlYW47XG5cbiAgc2VhcmNoVGV4dD86IHN0cmluZztcbiAgZGVmYXVsdFNlYXJjaFRleHQ/OiBzdHJpbmc7XG5cbiAgbG9hZGluZz86IGJvb2xlYW47XG4gIGRhdGE/OiBMb29rdXBFbnRyeVtdO1xuICBsb29rdXBGaWx0ZXI/OiAoXG4gICAgZW50cnk6IExvb2t1cEVudHJ5LFxuICAgIHNlYXJjaFRleHQ/OiBzdHJpbmcsXG4gICAgdGFyZ2V0U2NvcGU/OiBzdHJpbmdcbiAgKSA9PiBib29sZWFuO1xuICBsaXN0SGVhZGVyPzogSlNYLkVsZW1lbnQ7XG4gIGxpc3RGb290ZXI/OiBKU1guRWxlbWVudDtcbiAgc2NvcGVzPzogTG9va3VwU2NvcGVbXTtcbiAgdGFyZ2V0U2NvcGU/OiBzdHJpbmc7XG4gIGRlZmF1bHRUYXJnZXRTY29wZT86IHN0cmluZztcbiAgdG90YWxDb2xzPzogbnVtYmVyO1xuICBjb2xzPzogbnVtYmVyO1xuXG4gIG9uU2VhcmNoVGV4dENoYW5nZT86IChzZWFyY2hUZXh0OiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uU2NvcGVNZW51Q2xpY2s/OiAoZTogYW55KSA9PiB2b2lkO1xuICBvblNjb3BlQ2hhbmdlPzogKHRhcmdldFNjb3BlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uTG9va3VwUmVxdWVzdD86IChzZWFyY2hUZXh0Pzogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkJsdXI/OiAoKSA9PiB2b2lkO1xuICBvblNlbGVjdD86IChlOiBhbnkpID0+IHZvaWQ7XG4gIG9uQ29tcGxldGU/OiAoY2FuY2VsPzogYm9vbGVhbikgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIExvb2t1cFN0YXRlID0ge1xuICBpZDogc3RyaW5nO1xuICBzZWxlY3RlZD86IExvb2t1cEVudHJ5IHwgbnVsbDtcbiAgb3BlbmVkPzogYm9vbGVhbjtcbiAgc2VhcmNoVGV4dD86IHN0cmluZztcbiAgdGFyZ2V0U2NvcGU/OiBzdHJpbmc7XG4gIGZvY3VzRmlyc3RDYW5kaWRhdGU6IGJvb2xlYW47XG59O1xuLyoqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgTG9va3VwIGV4dGVuZHMgQ29tcG9uZW50PExvb2t1cFByb3BzLCBMb29rdXBTdGF0ZT4ge1xuICBzdGF0aWMgaXNGb3JtRWxlbWVudCA9IHRydWU7XG5cbiAgbm9kZTogSFRNTERpdkVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICBzZWxlY3Rpb246IEhUTUxEaXZFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgY2FuZGlkYXRlTGlzdDogSFRNTERpdkVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3Qvc29ydC1jb21wXG4gIHByaXZhdGUgc2VhcmNoOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IFJlYWRvbmx5PExvb2t1cFByb3BzPikge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaWQ6IGBmb3JtLWVsZW1lbnQtJHt1dWlkKCl9YCxcbiAgICAgIHNlbGVjdGVkOiBwcm9wcy5kZWZhdWx0U2VsZWN0ZWQsXG4gICAgICBvcGVuZWQ6IHByb3BzLmRlZmF1bHRPcGVuZWQsXG4gICAgICBzZWFyY2hUZXh0OiBwcm9wcy5kZWZhdWx0U2VhcmNoVGV4dCxcbiAgICAgIHRhcmdldFNjb3BlOiBwcm9wcy5kZWZhdWx0VGFyZ2V0U2NvcGUsXG4gICAgICBmb2N1c0ZpcnN0Q2FuZGlkYXRlOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgb25TY29wZU1lbnVDbGljayhlOiBhbnkpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgb3BlbmVkOiBmYWxzZSB9KTtcbiAgICBpZiAodGhpcy5wcm9wcy5vblNjb3BlTWVudUNsaWNrKSB7XG4gICAgICB0aGlzLnByb3BzLm9uU2NvcGVNZW51Q2xpY2soZSk7XG4gICAgfVxuICB9XG5cbiAgb25TY29wZUNoYW5nZSh0YXJnZXRTY29wZTogc3RyaW5nKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHRhcmdldFNjb3BlIH0pO1xuICAgIGlmICh0aGlzLnByb3BzLm9uU2NvcGVDaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25TY29wZUNoYW5nZSh0YXJnZXRTY29wZSk7XG4gICAgfVxuICB9XG5cbiAgb25TZWFyY2hUZXh0Q2hhbmdlKHNlYXJjaFRleHQ6IHN0cmluZykge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hUZXh0IH0pO1xuICAgIGlmICh0aGlzLnByb3BzLm9uU2VhcmNoVGV4dENoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vblNlYXJjaFRleHRDaGFuZ2Uoc2VhcmNoVGV4dCk7XG4gICAgfVxuICB9XG5cbiAgb25Mb29rdXBSZXF1ZXN0KHNlYXJjaFRleHQ/OiBzdHJpbmcpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgb3BlbmVkOiB0cnVlIH0pO1xuICAgIGlmICh0aGlzLnByb3BzLm9uTG9va3VwUmVxdWVzdCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkxvb2t1cFJlcXVlc3Qoc2VhcmNoVGV4dCk7XG4gICAgfVxuICB9XG5cbiAgb25SZXNldFNlbGVjdGlvbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWQ6IG51bGwgfSk7XG4gICAgaWYgKHRoaXMucHJvcHMub25TZWxlY3QpIHtcbiAgICAgIHRoaXMucHJvcHMub25TZWxlY3QobnVsbCk7XG4gICAgfVxuICAgIHRoaXMub25TZWFyY2hUZXh0Q2hhbmdlKCcnKTtcbiAgICB0aGlzLm9uTG9va3VwUmVxdWVzdCgnJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCBzZWFyY2hFbGVtID0gdGhpcy5zZWFyY2g7XG4gICAgICBjb25zdCBpbnB1dEVsZW0gPSBzZWFyY2hFbGVtICYmIHNlYXJjaEVsZW0ucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcbiAgICAgIGlmICghaW5wdXRFbGVtKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlucHV0RWxlbS5mb2N1cygpO1xuICAgIH0sIDEwKTtcbiAgfVxuXG4gIG9uTG9va3VwSXRlbVNlbGVjdChzZWxlY3RlZDogTG9va3VwRW50cnkgfCBudWxsKSB7XG4gICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWQsIG9wZW5lZDogZmFsc2UgfSk7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vblNlbGVjdCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHNlbGVjdGVkKTtcbiAgICAgIH1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3Rpb25FbGVtID0gdGhpcy5zZWxlY3Rpb247XG4gICAgICAgIGNvbnN0IHBpbGxFbGVtID0gc2VsZWN0aW9uRWxlbSAmJiBzZWxlY3Rpb25FbGVtLnF1ZXJ5U2VsZWN0b3IoJ2EnKTtcbiAgICAgICAgaWYgKHBpbGxFbGVtKSB7XG4gICAgICAgICAgcGlsbEVsZW0uZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfSwgMTApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgb3BlbmVkOiBmYWxzZSB9KTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBzZWFyY2hFbGVtID0gdGhpcy5zZWFyY2g7XG4gICAgICAgIGNvbnN0IGlucHV0RWxlbSA9IHNlYXJjaEVsZW0ucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcbiAgICAgICAgaW5wdXRFbGVtLmZvY3VzKCk7XG4gICAgICB9LCAxMCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLm9uQ29tcGxldGUpIHtcbiAgICAgIHRoaXMucHJvcHMub25Db21wbGV0ZSgpOyAvLyB0ZWxsIHRoZSBjb21wb25lbnQgY29udGFpbmVyIHRvIHF1aXQgbG9va3VwXG4gICAgfVxuICB9XG5cbiAgb25Gb2N1c0ZpcnN0Q2FuZGlkYXRlKCkge1xuICAgIGNvbnN0IHsgb3BlbmVkID0gdGhpcy5zdGF0ZS5vcGVuZWQgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFvcGVuZWQpIHtcbiAgICAgIHRoaXMub25Mb29rdXBSZXF1ZXN0KHRoaXMuc3RhdGUuc2VhcmNoVGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBmb2N1c0ZpcnN0Q2FuZGlkYXRlOiB0cnVlIH0pO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBmb2N1c0ZpcnN0Q2FuZGlkYXRlOiBmYWxzZSB9KTtcbiAgICAgIH0sIDEwKTtcbiAgICB9XG4gIH1cblxuICBvbkJsdXIoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuaXNGb2N1c2VkSW5Db21wb25lbnQoKSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgb3BlbmVkOiBmYWxzZSB9KTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25CbHVyKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5vbkJsdXIoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNvbXBsZXRlKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5vbkNvbXBsZXRlKHRydWUpOyAvLyBxdWl0IGxvb2t1cCAoY2FuY2VsKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgMTApO1xuICB9XG5cbiAgaXNGb2N1c2VkSW5Db21wb25lbnQoKSB7XG4gICAgY29uc3QgdGFyZ2V0RWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgIHJldHVybiAoXG4gICAgICBpc0VsSW5DaGlsZHJlbih0aGlzLm5vZGUsIHRhcmdldEVsKSB8fFxuICAgICAgaXNFbEluQ2hpbGRyZW4odGhpcy5jYW5kaWRhdGVMaXN0LCB0YXJnZXRFbClcbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGlkID0gdGhpcy5wcm9wcy5pZCB8fCB0aGlzLnN0YXRlLmlkO1xuICAgIGNvbnN0IHtcbiAgICAgIHRvdGFsQ29scyxcbiAgICAgIGNvbHMsXG4gICAgICBsYWJlbCxcbiAgICAgIHJlcXVpcmVkLFxuICAgICAgZXJyb3IsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICBzZWxlY3RlZCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQsXG4gICAgICBvcGVuZWQgPSB0aGlzLnN0YXRlLm9wZW5lZCxcbiAgICAgIHNlYXJjaFRleHQgPSB0aGlzLnN0YXRlLnNlYXJjaFRleHQsXG4gICAgICB0YXJnZXRTY29wZSA9IHRoaXMuc3RhdGUudGFyZ2V0U2NvcGUsXG4gICAgICBsb2FkaW5nLFxuICAgICAgbG9va3VwRmlsdGVyLFxuICAgICAgbGlzdEhlYWRlcixcbiAgICAgIGxpc3RGb290ZXIsXG4gICAgICBkYXRhLFxuICAgICAgb25Db21wbGV0ZSxcbiAgICAgIC4uLnByb3BzXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbG9va3VwQ2xhc3NOYW1lcyA9IGNsYXNzbmFtZXMoXG4gICAgICAnc2xkcy1sb29rdXAnLFxuICAgICAgeyAnc2xkcy1oYXMtc2VsZWN0aW9uJzogc2VsZWN0ZWQgfSxcbiAgICAgIGNsYXNzTmFtZVxuICAgICk7XG4gICAgY29uc3QgZm9ybUVsZW1Qcm9wcyA9IHsgaWQsIHRvdGFsQ29scywgY29scywgbGFiZWwsIHJlcXVpcmVkLCBlcnJvciB9O1xuICAgIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuICAgIGNvbnN0IHtcbiAgICAgIGRlZmF1bHRTZWxlY3RlZCxcbiAgICAgIGRlZmF1bHRPcGVuZWQsXG4gICAgICBkZWZhdWx0U2VhcmNoVGV4dCxcbiAgICAgIGRlZmF1bHRUYXJnZXRTY29wZSxcbiAgICAgIG9uU2VsZWN0LFxuICAgICAgb25CbHVyLFxuICAgICAgb25TY29wZUNoYW5nZSxcbiAgICAgIG9uU2NvcGVNZW51Q2xpY2ssXG4gICAgICBvblNlYXJjaFRleHRDaGFuZ2UsXG4gICAgICBvbkxvb2t1cFJlcXVlc3QsXG4gICAgICAuLi5zZWFyY2hQcm9wc1xuICAgIH0gPSBwcm9wcztcbiAgICAvKiBlc2xpbnQtZW5hYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuICAgIHJldHVybiAoXG4gICAgICA8Rm9ybUVsZW1lbnRcbiAgICAgICAgZm9ybUVsZW1lbnRSZWY9eyhub2RlKSA9PiAodGhpcy5ub2RlID0gbm9kZSl9XG4gICAgICAgIHsuLi5mb3JtRWxlbVByb3BzfVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtsb29rdXBDbGFzc05hbWVzfVxuICAgICAgICAgIHJlZj17KG5vZGUpID0+ICh0aGlzLm5vZGUgPSBub2RlKX1cbiAgICAgICAgICBkYXRhLXNlbGVjdD0nc2luZ2xlJ1xuICAgICAgICAgIGRhdGEtc2NvcGU9e3Byb3BzLnNjb3BlcyA/ICdtdWx0aScgOiAnc2luZ2xlJ31cbiAgICAgICAgICBkYXRhLXR5cGVhaGVhZD17ZmFsc2V9XG4gICAgICAgID5cbiAgICAgICAgICB7c2VsZWN0ZWQgPyAoXG4gICAgICAgICAgICA8TG9va3VwU2VsZWN0aW9uXG4gICAgICAgICAgICAgIGlkPXtpZH1cbiAgICAgICAgICAgICAgbG9va3VwU2VsZWN0aW9uUmVmPXsobm9kZSkgPT4gKHRoaXMuc2VsZWN0aW9uID0gbm9kZSl9XG4gICAgICAgICAgICAgIHNlbGVjdGVkPXtzZWxlY3RlZH1cbiAgICAgICAgICAgICAgb25SZXNldFNlbGVjdGlvbj17dGhpcy5vblJlc2V0U2VsZWN0aW9uLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8TG9va3VwU2VhcmNoXG4gICAgICAgICAgICAgIHsuLi5zZWFyY2hQcm9wc31cbiAgICAgICAgICAgICAgaWQ9e2lkfVxuICAgICAgICAgICAgICBsb29rdXBTZWFyY2hSZWY9eyhub2RlKSA9PiAodGhpcy5zZWFyY2ggPSBub2RlKX1cbiAgICAgICAgICAgICAgc2VhcmNoVGV4dD17c2VhcmNoVGV4dH1cbiAgICAgICAgICAgICAgdGFyZ2V0U2NvcGU9e3RhcmdldFNjb3BlfVxuICAgICAgICAgICAgICBvblNjb3BlTWVudUNsaWNrPXt0aGlzLm9uU2NvcGVNZW51Q2xpY2suYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgb25TY29wZUNoYW5nZT17dGhpcy5vblNjb3BlQ2hhbmdlLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uU2VhcmNoVGV4dENoYW5nZS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICBvblN1Ym1pdD17KCkgPT4gdGhpcy5vbkxvb2t1cFJlcXVlc3Qoc2VhcmNoVGV4dCl9XG4gICAgICAgICAgICAgIG9uUHJlc3NEb3duPXt0aGlzLm9uRm9jdXNGaXJzdENhbmRpZGF0ZS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtvbkNvbXBsZXRlfVxuICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMub25CbHVyLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge29wZW5lZCA/IChcbiAgICAgICAgICAgIDxMb29rdXBDYW5kaWRhdGVMaXN0UG9ydGFsXG4gICAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT17bG9va3VwQ2xhc3NOYW1lc31cbiAgICAgICAgICAgICAgbGlzdFJlZj17KG5vZGUpID0+ICh0aGlzLmNhbmRpZGF0ZUxpc3QgPSBub2RlKX1cbiAgICAgICAgICAgICAgZGF0YT17ZGF0YX1cbiAgICAgICAgICAgICAgZm9jdXM9e3RoaXMuc3RhdGUuZm9jdXNGaXJzdENhbmRpZGF0ZX1cbiAgICAgICAgICAgICAgbG9hZGluZz17bG9hZGluZ31cbiAgICAgICAgICAgICAgZmlsdGVyPXtcbiAgICAgICAgICAgICAgICBsb29rdXBGaWx0ZXJcbiAgICAgICAgICAgICAgICAgID8gKGVudHJ5OiBMb29rdXBFbnRyeSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICBsb29rdXBGaWx0ZXIoZW50cnksIHNlYXJjaFRleHQsIHRhcmdldFNjb3BlKVxuICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBoZWFkZXI9e2xpc3RIZWFkZXJ9XG4gICAgICAgICAgICAgIGZvb3Rlcj17bGlzdEZvb3Rlcn1cbiAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMub25Mb29rdXBJdGVtU2VsZWN0LmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5vbkJsdXIuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIHVuZGVmaW5lZFxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9Gb3JtRWxlbWVudD5cbiAgICApO1xuICB9XG59XG4iXX0=