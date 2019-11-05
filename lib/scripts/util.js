"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAssetRoot = setAssetRoot;
exports.getAssetRoot = getAssetRoot;
exports.registerStyle = registerStyle;
exports.isElInChildren = isElInChildren;
exports.offset = offset;
exports.cleanProps = cleanProps;
exports.default = exports.getToday = exports.uuid = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var uuid = process.env.NODE_ENV === 'test' ? function () {
  return '$uuid$';
} : _uuid.default;
exports.uuid = uuid;
var getToday = process.env.NODE_ENV === 'test' ? function () {
  return '2017-02-23';
} : function () {
  return new Date().toISOString().substring(0, 10);
};
exports.getToday = getToday;
var assetRoot = '/assets';

function setAssetRoot(path) {
  assetRoot = path;
}

function getAssetRoot() {
  return assetRoot;
}

function registerStyle(styleName, rules) {
  var styleId = "react-slds-cssfix-".concat(styleName);

  if (document.getElementById(styleId)) {
    return;
  }

  var style = document.createElement('style');
  style.id = styleId;
  style.appendChild(document.createTextNode(''));
  document.documentElement.appendChild(style);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = rules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var ruleSet = _step.value;
      var declaration = ruleSet.pop();
      var selectors = ruleSet;
      selectors = selectors.concat(selectors.map(function (s) {
        return ".slds ".concat(s);
      }));
      var rule = "".concat(selectors.join(', '), " ").concat(declaration);
      style.sheet.insertRule(rule, 0);
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
}

function isElInChildren(rootEl, targetEl) {
  /* eslint-disable no-param-reassign */
  while (targetEl && targetEl !== rootEl) {
    targetEl = targetEl.parentNode;
  }

  return !!targetEl;
}

function offset(el) {
  var rect = el.getBoundingClientRect();
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };
}

function cleanProps(props, propTypes) {
  var newProps = props;
  Object.keys(propTypes).forEach(function (key) {
    // @ts-ignore
    delete newProps[key];
  });
  return newProps;
}

var _default = {
  setAssetRoot: setAssetRoot,
  getAssetRoot: getAssetRoot,
  registerStyle: registerStyle,
  isElInChildren: isElInChildren,
  offset: offset,
  cleanProps: cleanProps
};
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL3V0aWwudHMiXSwibmFtZXMiOlsidXVpZCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImNyZWF0ZVVVSUQiLCJnZXRUb2RheSIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsInN1YnN0cmluZyIsImFzc2V0Um9vdCIsInNldEFzc2V0Um9vdCIsInBhdGgiLCJnZXRBc3NldFJvb3QiLCJyZWdpc3RlclN0eWxlIiwic3R5bGVOYW1lIiwicnVsZXMiLCJzdHlsZUlkIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwiY3JlYXRlRWxlbWVudCIsImlkIiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVUZXh0Tm9kZSIsImRvY3VtZW50RWxlbWVudCIsInJ1bGVTZXQiLCJkZWNsYXJhdGlvbiIsInBvcCIsInNlbGVjdG9ycyIsImNvbmNhdCIsIm1hcCIsInMiLCJydWxlIiwiam9pbiIsInNoZWV0IiwiaW5zZXJ0UnVsZSIsImlzRWxJbkNoaWxkcmVuIiwicm9vdEVsIiwidGFyZ2V0RWwiLCJwYXJlbnROb2RlIiwib2Zmc2V0IiwiZWwiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwiYm9keSIsInNjcm9sbFRvcCIsImxlZnQiLCJzY3JvbGxMZWZ0IiwiY2xlYW5Qcm9wcyIsInByb3BzIiwicHJvcFR5cGVzIiwibmV3UHJvcHMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRU8sSUFBTUEsSUFBSSxHQUNmQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixNQUF6QixHQUFrQztBQUFBLFNBQU0sUUFBTjtBQUFBLENBQWxDLEdBQW1EQyxhQUQ5Qzs7QUFHQSxJQUFNQyxRQUFRLEdBQ25CSixPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixNQUF6QixHQUNJO0FBQUEsU0FBTSxZQUFOO0FBQUEsQ0FESixH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YUFBYSxFQUFiQSxhQUhhO0FBSWJ1QixFQUFBQSxjQUFjLEVBQWRBLGNBSmE7QUFLYkksRUFBQUEsTUFBTSxFQUFOQSxNQUxhO0FBTWJTLEVBQUFBLFVBQVUsRUFBVkE7QUFOYSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyZWF0ZVVVSUQgZnJvbSAndXVpZCc7XG5cbmV4cG9ydCBjb25zdCB1dWlkID1cbiAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICd0ZXN0JyA/ICgpID0+ICckdXVpZCQnIDogY3JlYXRlVVVJRDtcblxuZXhwb3J0IGNvbnN0IGdldFRvZGF5ID1cbiAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICd0ZXN0J1xuICAgID8gKCkgPT4gJzIwMTctMDItMjMnXG4gICAgOiAoKSA9PiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDEwKTtcblxubGV0IGFzc2V0Um9vdCA9ICcvYXNzZXRzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNldEFzc2V0Um9vdChwYXRoOiBzdHJpbmcpIHtcbiAgYXNzZXRSb290ID0gcGF0aDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFzc2V0Um9vdCgpIHtcbiAgcmV0dXJuIGFzc2V0Um9vdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyU3R5bGUoc3R5bGVOYW1lOiBzdHJpbmcsIHJ1bGVzOiBzdHJpbmdbXVtdKSB7XG4gIGNvbnN0IHN0eWxlSWQgPSBgcmVhY3Qtc2xkcy1jc3NmaXgtJHtzdHlsZU5hbWV9YDtcbiAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHN0eWxlSWQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgc3R5bGUuaWQgPSBzdHlsZUlkO1xuICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJykpO1xuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICBmb3IgKGNvbnN0IHJ1bGVTZXQgb2YgcnVsZXMpIHtcbiAgICBjb25zdCBkZWNsYXJhdGlvbiA9IHJ1bGVTZXQucG9wKCk7XG4gICAgbGV0IHNlbGVjdG9ycyA9IHJ1bGVTZXQ7XG4gICAgc2VsZWN0b3JzID0gc2VsZWN0b3JzLmNvbmNhdChzZWxlY3RvcnMubWFwKChzKSA9PiBgLnNsZHMgJHtzfWApKTtcbiAgICBjb25zdCBydWxlID0gYCR7c2VsZWN0b3JzLmpvaW4oJywgJyl9ICR7ZGVjbGFyYXRpb259YDtcbiAgICAoc3R5bGUuc2hlZXQgYXMgQ1NTU3R5bGVTaGVldCkuaW5zZXJ0UnVsZShydWxlLCAwKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFbEluQ2hpbGRyZW4ocm9vdEVsOiBhbnksIHRhcmdldEVsOiBhbnkpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbiAgd2hpbGUgKHRhcmdldEVsICYmIHRhcmdldEVsICE9PSByb290RWwpIHtcbiAgICB0YXJnZXRFbCA9IHRhcmdldEVsLnBhcmVudE5vZGU7XG4gIH1cblxuICByZXR1cm4gISF0YXJnZXRFbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9mZnNldChlbDogSFRNTEVsZW1lbnQpIHtcbiAgY29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIHJldHVybiB7XG4gICAgdG9wOiByZWN0LnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wLFxuICAgIGxlZnQ6IHJlY3QubGVmdCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuUHJvcHMocHJvcHM6IG9iamVjdCwgcHJvcFR5cGVzOiBvYmplY3QpIHtcbiAgY29uc3QgbmV3UHJvcHMgPSBwcm9wcztcbiAgT2JqZWN0LmtleXMocHJvcFR5cGVzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgZGVsZXRlIG5ld1Byb3BzW2tleV07XG4gIH0pO1xuICByZXR1cm4gbmV3UHJvcHM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc2V0QXNzZXRSb290LFxuICBnZXRBc3NldFJvb3QsXG4gIHJlZ2lzdGVyU3R5bGUsXG4gIGlzRWxJbkNoaWxkcmVuLFxuICBvZmZzZXQsXG4gIGNsZWFuUHJvcHMsXG59O1xuIl19