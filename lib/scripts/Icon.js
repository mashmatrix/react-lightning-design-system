"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Icon = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _svg4everybody = _interopRequireDefault(require("svg4everybody"));

var _util = require("./util");

(0, _svg4everybody.default)();
/* eslint-disable max-len */

var STANDARD_ICONS = "\naccount,announcement,answer_best,answer_private,answer_public,approval,apps,apps_admin,\narticle,avatar,avatar_loading,calibration,call,call_history,campaign,campaign_members,\ncanvas,case,case_change_status,case_comment,case_email,case_log_a_call,case_transcript,\nclient,coaching,connected_apps,contact,contract,custom,dashboard,default,document,\ndrafts,email,email_IQ,email_chatter,empty,endorsement,environment_hub,event,feed,feedback,\nfile,flow,folder,generic_loading,goals,group_loading,groups,hierarchy,home,household,insights,investment_account,\nlead,link,log_a_call,marketing_actions,metrics,news,note,opportunity,\norders,people,performance,person_account,photo,poll,portal,post,pricebook,process,product,question_best,\nquestion_feed,quotes,recent,record,related_list,report,reward,scan_card,skill_entity,\nsocial,solution,sossession,task,task2,team_member,thanks,thanks_loading,today,topic,\nunmatched,user,work_order,work_order_item\n".replace(/^\s+|\s+$/g, '').split(/[\s,]+/);
var CUSTOM_ICONS = new Array(101).join('_').split('').map(function (a, i) {
  return "custom".concat(i + 1);
});
var ACTION_ICONS = "\nadd_contact,announcement,apex,approval,back,call,canvas,change_owner,change_record_type,\ncheck,clone,close,defer,delete,description,dial_in,download,edit,edit_groups,edit_relationship,\nemail,fallback,filter,flow,follow,following,freeze_user,goal,google_news,info,join_group,\nlead_convert,leave_group,log_a_call,log_event,manage_perm_sets,map,more,new,new_account,\nnew_campaign,new_case,new_child_case,new_contact,new_event,new_group,new_lead,new_note,\nnew_notebook,new_opportunity,new_person_account,new_task,password_unlock,preview,priority,question_post_action,\nquote,record,refresh,reject,remove,reset_password,share,share_file,share_link,share_poll,\nshare_post,share_thanks,sort,submit_for_approval,update,update_status,upload,user,user_activation,\nweb_link,\nnew_custom7,new_custom8,new_custom9,new_custom10,new_custom11,new_custom12,new_custom13,\nnew_custom14,new_custom15,new_custom16,new_custom17,new_custom18,new_custom19,new_custom20,\nnew_custom21,new_custom22,new_custom23,new_custom24,new_custom25,new_custom26,new_custom27,\nnew_custom28,new_custom29,new_custom30,new_custom31,new_custom32,new_custom33,new_custom34,\nnew_custom35,new_custom36,new_custom37,new_custom38,new_custom39,new_custom40,new_custom41,\nnew_custom42,new_custom43,new_custom44,new_custom45,new_custom46,new_custom47,new_custom48,\nnew_custom49,new_custom50,new_custom51,new_custom52,new_custom53,new_custom54,new_custom55,\nnew_custom56,new_custom57,new_custom58,new_custom59,new_custom60,new_custom61,new_custom62,\nnew_custom63,new_custom64,new_custom65,new_custom66,new_custom67,new_custom68,new_custom69,\nnew_custom70,new_custom71,new_custom72,new_custom73,new_custom74,new_custom75,new_custom76,\nnew_custom77,new_custom78,new_custom79,new_custom80,new_custom81,new_custom82,new_custom83,\nnew_custom84,new_custom85,new_custom86,new_custom87,new_custom88,new_custom89,new_custom90,\nnew_custom91,new_custom92,new_custom93,new_custom94,new_custom95,new_custom96,new_custom97,\nnew_custom98,new_custom99,new_custom100\n".replace(/^\s+|\s+$/g, '').split(/[\s,]+/);
var DOCTYPE_ICONS = "\nai,attachment,audio,box_notes,csv,eps,excel,exe,flash,gdoc,gdocs,gpres,gsheet,html,image,keynote,\nlink,mp4,overlay,pack,pages,pdf,ppt,psd,rtf,slide,stypi,txt,unknown,video,visio,\nwebex,word,xml,zip\n".replace(/^\s+|\s+$/g, '').split(/[\s,]+/);
var UTILITY_ICONS = "\nadd,adduser,announcement,answer,apps,arrowdown,arrowup,attach,back,ban,bold,bookmark,brush,\nbucket,builder,call,capslock,cases,center_align_text,chart,chat,check,checkin,chevrondown,\nchevronleft,chevronright,chevronup,clear,clock,close,comments,company,connected_apps,\ncontract,contract_alt,copy,crossfilter,custom_apps,cut,dash,datadotcom,dayview,delete,deprecate,\ndescription,desktop,down,download,edit,edit_form,email,end_call,erect_window,error,event,expand,\nexpand_alt,favorite,feed,file,filter,filterList,forward,frozen,groups,help,home,identity,image,inbox,info,\ninsert_tag_field,insert_template,italic,justify_text,kanban,knowledge_base,layers,layout,\nleft,left_align_text,like,link,list,location,lock,log_a_call,logout,magicwand,matrix,metrics,minimize_window,\nmoneybag,monthlyview,move,muted,new,new_window,news,note,notebook,notification,office365,offline,\nopen,open_folder,opened_folder,overflow,package,package_org,package_org_beta,page,palette,paste,\npeople,phone_landscape,phone_portrait,photo,picklist,power,preview,priority,process,push,puzzle,\nquestion,questions_and_answers,record,redo,refresh,relate,remove_formatting,remove_link,\nreplace,reply,reset_password,retweet,richtextbulletedlist,richtextindent,richtextnumberedlist,\nrichtextoutdent,right,right_align_text,rotate,rows,salesforce1,search,settings,setup,setup_assistant_guide,\nshare,share_post,shield,side_list,signpost,sms,snippet,socialshare,sort,spinner,standard_objects,\nstop,strikethrough,success,summary,summarydetail,switch,table,tablet_landscape,tablet_portrait,\ntabset,task,text_background_color,text_color,threedots,tile_card_list,topic,touch_action,trail,undelete,undeprecate,\nunderline,undo,unlock,unmuted,up,upload,user,user_role,volume_high,volume_low,volume_off,warning,\nweeklyview,world,zoomin,zoomout\n".replace(/^\s+|\s+$/g, '').split(/[\s,]+/);
/* eslint-enable max-len */

var Icon =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Icon, _Component);

  // eslint-disable-next-line react/sort-comp
  function Icon(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Icon);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Icon).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "context", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "iconContainer", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "svgIcon", void 0);
    _this.state = {};
    _this.iconContainer = null;
    _this.svgIcon = null;
    (0, _util.registerStyle)('icon', [['.slds-icon use', '{ pointer-events: none; }']]);
    return _this;
  }

  (0, _createClass2.default)(Icon, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.checkIconColor();
      var svgEl = this.svgIcon;

      if (svgEl && this.props.tabIndex !== undefined) {
        svgEl.setAttribute('focusable', (this.props.tabIndex >= 0).toString());
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.checkIconColor();
    }
  }, {
    key: "getIconColor",
    value: function getIconColor(fillColor, category, icon) {
      /* eslint-disable no-unneeded-ternary */
      return this.state.iconColor ? this.state.iconColor : category === 'doctype' ? null : fillColor === 'none' ? null : fillColor ? fillColor : category === 'utility' ? null : category === 'custom' ? icon.replace(/^custom/, 'custom-') : category === 'action' && /^new_custom/.test(icon) ? icon.replace(/^new_custom/, 'custom-') : "".concat(category, "-").concat((icon || '').replace(/_/g, '-'));
      /* eslint-enable no-unneeded-ternary */
    }
  }, {
    key: "checkIconColor",
    value: function checkIconColor() {
      var _this$props = this.props,
          fillColor = _this$props.fillColor,
          _this$props$category = _this$props.category,
          category = _this$props$category === void 0 ? 'utility' : _this$props$category,
          container = _this$props.container;
      var iconColor = this.state.iconColor;

      if (fillColor || category === 'doctype' || !fillColor && category === 'utility' || iconColor === 'standard-default') {
        return;
      }

      var el = container ? this.iconContainer : this.svgIcon;

      if (!el) {
        return;
      }

      var bgColorStyle = getComputedStyle(el).backgroundColor; // if no background color set to the icon

      if (bgColorStyle && /^(transparent|rgba\(0,\s*0,\s*0,\s*0\))$/.test(bgColorStyle)) {
        this.setState({
          iconColor: 'standard-default'
        });
      }
    }
  }, {
    key: "renderSVG",
    value: function renderSVG(_ref) {
      var _classnames,
          _this2 = this;

      var className = _ref.className,
          _ref$category = _ref.category,
          category = _ref$category === void 0 ? 'utility' : _ref$category,
          icon = _ref.icon,
          size = _ref.size,
          align = _ref.align,
          fillColor = _ref.fillColor,
          container = _ref.container,
          _ref$textColor = _ref.textColor,
          textColor = _ref$textColor === void 0 ? 'default' : _ref$textColor,
          style = _ref.style,
          assetRoot = _ref.assetRoot,
          props = (0, _objectWithoutProperties2.default)(_ref, ["className", "category", "icon", "size", "align", "fillColor", "container", "textColor", "style", "assetRoot"]);
      var iconColor = this.getIconColor(fillColor, category, icon);
      var iconClassNames = (0, _classnames2.default)((_classnames = {
        'slds-icon': !/slds-button__icon/.test(className)
      }, (0, _defineProperty2.default)(_classnames, "slds-icon--".concat(size), /^(x-small|small|medium|large)$/.test(size)), (0, _defineProperty2.default)(_classnames, "slds-icon-text-".concat(textColor), /^(default|warning|error)$/.test(textColor) && !iconColor), (0, _defineProperty2.default)(_classnames, "slds-icon-".concat(iconColor), !container && iconColor), (0, _defineProperty2.default)(_classnames, 'slds-m-left--x-small', align === 'right'), (0, _defineProperty2.default)(_classnames, 'slds-m-right--x-small', align === 'left'), _classnames), className); // icon and category prop should not include chars other than alphanumerics, underscore, and hyphen

      icon = (icon || '').replace(/[^\w-]/g, ''); // eslint-disable-line no-param-reassign

      category = (category || '').replace(/[^\w-]/g, ''); // eslint-disable-line no-param-reassign

      var iconUrl = "".concat(assetRoot, "/icons/").concat(category, "-sprite/svg/symbols.svg#").concat(icon);
      return _react.default.createElement("svg", (0, _extends2.default)({
        className: iconClassNames,
        "aria-hidden": true,
        ref: function ref(node) {
          return _this2.svgIcon = node;
        },
        style: style
      }, props), _react.default.createElement("use", {
        xlinkHref: iconUrl
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          container = _this$props2.container,
          props = (0, _objectWithoutProperties2.default)(_this$props2, ["container"]);
      var _this$context$assetRo = this.context.assetRoot,
          assetRoot = _this$context$assetRo === void 0 ? (0, _util.getAssetRoot)() : _this$context$assetRo;
      var category = props.category,
          icon = props.icon;

      if (icon.indexOf(':') > 0) {
        var _ref2 = icon.split(':');

        var _ref3 = (0, _slicedToArray2.default)(_ref2, 2);

        category = _ref3[0];
        icon = _ref3[1];
      }

      if (container) {
        var containerClassName = props.containerClassName,
            fillColor = props.fillColor,
            pprops = (0, _objectWithoutProperties2.default)(props, ["containerClassName", "fillColor"]);
        var iconColor = this.getIconColor(fillColor, category, icon);
        var ccontainerClassName = (0, _classnames2.default)(containerClassName, 'slds-icon__container', container === 'circle' ? 'slds-icon__container--circle' : null, iconColor ? "slds-icon-".concat(iconColor) : null);
        return _react.default.createElement("span", {
          className: ccontainerClassName,
          ref: function ref(node) {
            return _this3.iconContainer = node;
          }
        }, this.renderSVG((0, _objectSpread2.default)({
          category: category,
          icon: icon,
          fillColor: iconColor,
          container: container,
          assetRoot: assetRoot
        }, pprops)));
      }

      return this.renderSVG((0, _objectSpread2.default)({}, props, {
        category: category,
        icon: icon,
        assetRoot: assetRoot
      }));
    }
  }]);
  return Icon;
}(_react.Component);

exports.Icon = Icon;
(0, _defineProperty2.default)(Icon, "contextTypes", {
  assetRoot: _propTypes.default.string
});
(0, _defineProperty2.default)(Icon, "ICONS", {
  STANDARD_ICONS: STANDARD_ICONS,
  CUSTOM_ICONS: CUSTOM_ICONS,
  ACTION_ICONS: ACTION_ICONS,
  DOCTYPE_ICONS: DOCTYPE_ICONS,
  UTILITY_ICONS: UTILITY_ICONS
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL0ljb24udHN4Il0sIm5hbWVzIjpbIlNUQU5EQVJEX0lDT05TIiwicmVwbGFjZSIsInNwbGl0IiwiQ1VTVE9NX0lDT05TIiwiQXJyYXkiLCJqb2luIiwibWFwIiwiYSIsImkiLCJBQ1RJT05fSUNPTlMiLCJET0NUWVBFX0lDT05TIiwiVVRJTElUWV9JQ09OUyIsIkljb24iLCJwcm9wcyIsInN0YXRlIiwiaWNvbkNvbnRhaW5lciIsInN2Z0ljb24iLCJjaGVja0ljb25Db2xvciIsInN2Z0VsIiwidGFiSW5kZXgiLCJ1bmRlZmluZWQiLCJzZXRBdHRyaWJ1dGUiLCJ0b1N0cmluZyIsImZpbGxDb2xvciIsImNhdGVnb3J5IiwiaWNvbiIsImljb25Db2xvciIsInRlc3QiLCJjb250YWluZXIiLCJlbCIsImJnQ29sb3JTdHlsZSIsImdldENvbXB1dGVkU3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJzZXRTdGF0ZSIsImNsYXNzTmFtZSIsInNpemUiLCJhbGlnbiIsInRleHRDb2xvciIsInN0eWxlIiwiYXNzZXRSb290IiwiZ2V0SWNvbkNvbG9yIiwiaWNvbkNsYXNzTmFtZXMiLCJpY29uVXJsIiwibm9kZSIsImNvbnRleHQiLCJpbmRleE9mIiwiY29udGFpbmVyQ2xhc3NOYW1lIiwicHByb3BzIiwiY2NvbnRhaW5lckNsYXNzTmFtZSIsInJlbmRlclNWRyIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsInN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0E7QUFFQTs7QUFDQSxJQUFNQSxjQUFjLEdBQUcsMjdCQWFwQkMsT0Fib0IsQ0FhWixZQWJZLEVBYUUsRUFiRixFQWNwQkMsS0Fkb0IsQ0FjZCxRQWRjLENBQXZCO0FBZ0JBLElBQU1DLFlBQVksR0FBRyxJQUFJQyxLQUFKLENBQVUsR0FBVixFQUNsQkMsSUFEa0IsQ0FDYixH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LFlBQVksRUFBWkEsWUFGYTtBQUdiTSxFQUFBQSxZQUFZLEVBQVpBLFlBSGE7QUFJYkMsRUFBQUEsYUFBYSxFQUFiQSxhQUphO0FBS2JDLEVBQUFBLGFBQWEsRUFBYkE7QUFMYSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgU1ZHQXR0cmlidXRlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzdmc0ZXZlcnlib2R5IGZyb20gJ3N2ZzRldmVyeWJvZHknO1xuaW1wb3J0IHsgcmVnaXN0ZXJTdHlsZSwgZ2V0QXNzZXRSb290IH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7IENvbXBvbmVudFNldHRpbmdzQ29udGV4dCB9IGZyb20gJy4vQ29tcG9uZW50U2V0dGluZ3MnO1xuXG5zdmc0ZXZlcnlib2R5KCk7XG5cbi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmNvbnN0IFNUQU5EQVJEX0lDT05TID0gYFxuYWNjb3VudCxhbm5vdW5jZW1lbnQsYW5zd2VyX2Jlc3QsYW5zd2VyX3ByaXZhdGUsYW5zd2VyX3B1YmxpYyxhcHByb3ZhbCxhcHBzLGFwcHNfYWRtaW4sXG5hcnRpY2xlLGF2YXRhcixhdmF0YXJfbG9hZGluZyxjYWxpYnJhdGlvbixjYWxsLGNhbGxfaGlzdG9yeSxjYW1wYWlnbixjYW1wYWlnbl9tZW1iZXJzLFxuY2FudmFzLGNhc2UsY2FzZV9jaGFuZ2Vfc3RhdHVzLGNhc2VfY29tbWVudCxjYXNlX2VtYWlsLGNhc2VfbG9nX2FfY2FsbCxjYXNlX3RyYW5zY3JpcHQsXG5jbGllbnQsY29hY2hpbmcsY29ubmVjdGVkX2FwcHMsY29udGFjdCxjb250cmFjdCxjdXN0b20sZGFzaGJvYXJkLGRlZmF1bHQsZG9jdW1lbnQsXG5kcmFmdHMsZW1haWwsZW1haWxfSVEsZW1haWxfY2hhdHRlcixlbXB0eSxlbmRvcnNlbWVudCxlbnZpcm9ubWVudF9odWIsZXZlbnQsZmVlZCxmZWVkYmFjayxcbmZpbGUsZmxvdyxmb2xkZXIsZ2VuZXJpY19sb2FkaW5nLGdvYWxzLGdyb3VwX2xvYWRpbmcsZ3JvdXBzLGhpZXJhcmNoeSxob21lLGhvdXNlaG9sZCxpbnNpZ2h0cyxpbnZlc3RtZW50X2FjY291bnQsXG5sZWFkLGxpbmssbG9nX2FfY2FsbCxtYXJrZXRpbmdfYWN0aW9ucyxtZXRyaWNzLG5ld3Msbm90ZSxvcHBvcnR1bml0eSxcbm9yZGVycyxwZW9wbGUscGVyZm9ybWFuY2UscGVyc29uX2FjY291bnQscGhvdG8scG9sbCxwb3J0YWwscG9zdCxwcmljZWJvb2sscHJvY2Vzcyxwcm9kdWN0LHF1ZXN0aW9uX2Jlc3QsXG5xdWVzdGlvbl9mZWVkLHF1b3RlcyxyZWNlbnQscmVjb3JkLHJlbGF0ZWRfbGlzdCxyZXBvcnQscmV3YXJkLHNjYW5fY2FyZCxza2lsbF9lbnRpdHksXG5zb2NpYWwsc29sdXRpb24sc29zc2Vzc2lvbix0YXNrLHRhc2syLHRlYW1fbWVtYmVyLHRoYW5rcyx0aGFua3NfbG9hZGluZyx0b2RheSx0b3BpYyxcbnVubWF0Y2hlZCx1c2VyLHdvcmtfb3JkZXIsd29ya19vcmRlcl9pdGVtXG5gXG4gIC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbiAgLnNwbGl0KC9bXFxzLF0rLyk7XG5cbmNvbnN0IENVU1RPTV9JQ09OUyA9IG5ldyBBcnJheSgxMDEpXG4gIC5qb2luKCdfJylcbiAgLnNwbGl0KCcnKVxuICAubWFwKChhLCBpKSA9PiBgY3VzdG9tJHtpICsgMX1gKTtcblxuY29uc3QgQUNUSU9OX0lDT05TID0gYFxuYWRkX2NvbnRhY3QsYW5ub3VuY2VtZW50LGFwZXgsYXBwcm92YWwsYmFjayxjYWxsLGNhbnZhcyxjaGFuZ2Vfb3duZXIsY2hhbmdlX3JlY29yZF90eXBlLFxuY2hlY2ssY2xvbmUsY2xvc2UsZGVmZXIsZGVsZXRlLGRlc2NyaXB0aW9uLGRpYWxfaW4sZG93bmxvYWQsZWRpdCxlZGl0X2dyb3VwcyxlZGl0X3JlbGF0aW9uc2hpcCxcbmVtYWlsLGZhbGxiYWNrLGZpbHRlcixmbG93LGZvbGxvdyxmb2xsb3dpbmcsZnJlZXplX3VzZXIsZ29hbCxnb29nbGVfbmV3cyxpbmZvLGpvaW5fZ3JvdXAsXG5sZWFkX2NvbnZlcnQsbGVhdmVfZ3JvdXAsbG9nX2FfY2FsbCxsb2dfZXZlbnQsbWFuYWdlX3Blcm1fc2V0cyxtYXAsbW9yZSxuZXcsbmV3X2FjY291bnQsXG5uZXdfY2FtcGFpZ24sbmV3X2Nhc2UsbmV3X2NoaWxkX2Nhc2UsbmV3X2NvbnRhY3QsbmV3X2V2ZW50LG5ld19ncm91cCxuZXdfbGVhZCxuZXdfbm90ZSxcbm5ld19ub3RlYm9vayxuZXdfb3Bwb3J0dW5pdHksbmV3X3BlcnNvbl9hY2NvdW50LG5ld190YXNrLHBhc3N3b3JkX3VubG9jayxwcmV2aWV3LHByaW9yaXR5LHF1ZXN0aW9uX3Bvc3RfYWN0aW9uLFxucXVvdGUscmVjb3JkLHJlZnJlc2gscmVqZWN0LHJlbW92ZSxyZXNldF9wYXNzd29yZCxzaGFyZSxzaGFyZV9maWxlLHNoYXJlX2xpbmssc2hhcmVfcG9sbCxcbnNoYXJlX3Bvc3Qsc2hhcmVfdGhhbmtzLHNvcnQsc3VibWl0X2Zvcl9hcHByb3ZhbCx1cGRhdGUsdXBkYXRlX3N0YXR1cyx1cGxvYWQsdXNlcix1c2VyX2FjdGl2YXRpb24sXG53ZWJfbGluayxcbm5ld19jdXN0b203LG5ld19jdXN0b204LG5ld19jdXN0b205LG5ld19jdXN0b20xMCxuZXdfY3VzdG9tMTEsbmV3X2N1c3RvbTEyLG5ld19jdXN0b20xMyxcbm5ld19jdXN0b20xNCxuZXdfY3VzdG9tMTUsbmV3X2N1c3RvbTE2LG5ld19jdXN0b20xNyxuZXdfY3VzdG9tMTgsbmV3X2N1c3RvbTE5LG5ld19jdXN0b20yMCxcbm5ld19jdXN0b20yMSxuZXdfY3VzdG9tMjIsbmV3X2N1c3RvbTIzLG5ld19jdXN0b20yNCxuZXdfY3VzdG9tMjUsbmV3X2N1c3RvbTI2LG5ld19jdXN0b20yNyxcbm5ld19jdXN0b20yOCxuZXdfY3VzdG9tMjksbmV3X2N1c3RvbTMwLG5ld19jdXN0b20zMSxuZXdfY3VzdG9tMzIsbmV3X2N1c3RvbTMzLG5ld19jdXN0b20zNCxcbm5ld19jdXN0b20zNSxuZXdfY3VzdG9tMzYsbmV3X2N1c3RvbTM3LG5ld19jdXN0b20zOCxuZXdfY3VzdG9tMzksbmV3X2N1c3RvbTQwLG5ld19jdXN0b200MSxcbm5ld19jdXN0b200MixuZXdfY3VzdG9tNDMsbmV3X2N1c3RvbTQ0LG5ld19jdXN0b200NSxuZXdfY3VzdG9tNDYsbmV3X2N1c3RvbTQ3LG5ld19jdXN0b200OCxcbm5ld19jdXN0b200OSxuZXdfY3VzdG9tNTAsbmV3X2N1c3RvbTUxLG5ld19jdXN0b201MixuZXdfY3VzdG9tNTMsbmV3X2N1c3RvbTU0LG5ld19jdXN0b201NSxcbm5ld19jdXN0b201NixuZXdfY3VzdG9tNTcsbmV3X2N1c3RvbTU4LG5ld19jdXN0b201OSxuZXdfY3VzdG9tNjAsbmV3X2N1c3RvbTYxLG5ld19jdXN0b202Mixcbm5ld19jdXN0b202MyxuZXdfY3VzdG9tNjQsbmV3X2N1c3RvbTY1LG5ld19jdXN0b202NixuZXdfY3VzdG9tNjcsbmV3X2N1c3RvbTY4LG5ld19jdXN0b202OSxcbm5ld19jdXN0b203MCxuZXdfY3VzdG9tNzEsbmV3X2N1c3RvbTcyLG5ld19jdXN0b203MyxuZXdfY3VzdG9tNzQsbmV3X2N1c3RvbTc1LG5ld19jdXN0b203Nixcbm5ld19jdXN0b203NyxuZXdfY3VzdG9tNzgsbmV3X2N1c3RvbTc5LG5ld19jdXN0b204MCxuZXdfY3VzdG9tODEsbmV3X2N1c3RvbTgyLG5ld19jdXN0b204Myxcbm5ld19jdXN0b204NCxuZXdfY3VzdG9tODUsbmV3X2N1c3RvbTg2LG5ld19jdXN0b204NyxuZXdfY3VzdG9tODgsbmV3X2N1c3RvbTg5LG5ld19jdXN0b205MCxcbm5ld19jdXN0b205MSxuZXdfY3VzdG9tOTIsbmV3X2N1c3RvbTkzLG5ld19jdXN0b205NCxuZXdfY3VzdG9tOTUsbmV3X2N1c3RvbTk2LG5ld19jdXN0b205Nyxcbm5ld19jdXN0b205OCxuZXdfY3VzdG9tOTksbmV3X2N1c3RvbTEwMFxuYFxuICAucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXG4gIC5zcGxpdCgvW1xccyxdKy8pO1xuXG5jb25zdCBET0NUWVBFX0lDT05TID0gYFxuYWksYXR0YWNobWVudCxhdWRpbyxib3hfbm90ZXMsY3N2LGVwcyxleGNlbCxleGUsZmxhc2gsZ2RvYyxnZG9jcyxncHJlcyxnc2hlZXQsaHRtbCxpbWFnZSxrZXlub3RlLFxubGluayxtcDQsb3ZlcmxheSxwYWNrLHBhZ2VzLHBkZixwcHQscHNkLHJ0ZixzbGlkZSxzdHlwaSx0eHQsdW5rbm93bix2aWRlbyx2aXNpbyxcbndlYmV4LHdvcmQseG1sLHppcFxuYFxuICAucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXG4gIC5zcGxpdCgvW1xccyxdKy8pO1xuXG5jb25zdCBVVElMSVRZX0lDT05TID0gYFxuYWRkLGFkZHVzZXIsYW5ub3VuY2VtZW50LGFuc3dlcixhcHBzLGFycm93ZG93bixhcnJvd3VwLGF0dGFjaCxiYWNrLGJhbixib2xkLGJvb2ttYXJrLGJydXNoLFxuYnVja2V0LGJ1aWxkZXIsY2FsbCxjYXBzbG9jayxjYXNlcyxjZW50ZXJfYWxpZ25fdGV4dCxjaGFydCxjaGF0LGNoZWNrLGNoZWNraW4sY2hldnJvbmRvd24sXG5jaGV2cm9ubGVmdCxjaGV2cm9ucmlnaHQsY2hldnJvbnVwLGNsZWFyLGNsb2NrLGNsb3NlLGNvbW1lbnRzLGNvbXBhbnksY29ubmVjdGVkX2FwcHMsXG5jb250cmFjdCxjb250cmFjdF9hbHQsY29weSxjcm9zc2ZpbHRlcixjdXN0b21fYXBwcyxjdXQsZGFzaCxkYXRhZG90Y29tLGRheXZpZXcsZGVsZXRlLGRlcHJlY2F0ZSxcbmRlc2NyaXB0aW9uLGRlc2t0b3AsZG93bixkb3dubG9hZCxlZGl0LGVkaXRfZm9ybSxlbWFpbCxlbmRfY2FsbCxlcmVjdF93aW5kb3csZXJyb3IsZXZlbnQsZXhwYW5kLFxuZXhwYW5kX2FsdCxmYXZvcml0ZSxmZWVkLGZpbGUsZmlsdGVyLGZpbHRlckxpc3QsZm9yd2FyZCxmcm96ZW4sZ3JvdXBzLGhlbHAsaG9tZSxpZGVudGl0eSxpbWFnZSxpbmJveCxpbmZvLFxuaW5zZXJ0X3RhZ19maWVsZCxpbnNlcnRfdGVtcGxhdGUsaXRhbGljLGp1c3RpZnlfdGV4dCxrYW5iYW4sa25vd2xlZGdlX2Jhc2UsbGF5ZXJzLGxheW91dCxcbmxlZnQsbGVmdF9hbGlnbl90ZXh0LGxpa2UsbGluayxsaXN0LGxvY2F0aW9uLGxvY2ssbG9nX2FfY2FsbCxsb2dvdXQsbWFnaWN3YW5kLG1hdHJpeCxtZXRyaWNzLG1pbmltaXplX3dpbmRvdyxcbm1vbmV5YmFnLG1vbnRobHl2aWV3LG1vdmUsbXV0ZWQsbmV3LG5ld193aW5kb3csbmV3cyxub3RlLG5vdGVib29rLG5vdGlmaWNhdGlvbixvZmZpY2UzNjUsb2ZmbGluZSxcbm9wZW4sb3Blbl9mb2xkZXIsb3BlbmVkX2ZvbGRlcixvdmVyZmxvdyxwYWNrYWdlLHBhY2thZ2Vfb3JnLHBhY2thZ2Vfb3JnX2JldGEscGFnZSxwYWxldHRlLHBhc3RlLFxucGVvcGxlLHBob25lX2xhbmRzY2FwZSxwaG9uZV9wb3J0cmFpdCxwaG90byxwaWNrbGlzdCxwb3dlcixwcmV2aWV3LHByaW9yaXR5LHByb2Nlc3MscHVzaCxwdXp6bGUsXG5xdWVzdGlvbixxdWVzdGlvbnNfYW5kX2Fuc3dlcnMscmVjb3JkLHJlZG8scmVmcmVzaCxyZWxhdGUscmVtb3ZlX2Zvcm1hdHRpbmcscmVtb3ZlX2xpbmssXG5yZXBsYWNlLHJlcGx5LHJlc2V0X3Bhc3N3b3JkLHJldHdlZXQscmljaHRleHRidWxsZXRlZGxpc3QscmljaHRleHRpbmRlbnQscmljaHRleHRudW1iZXJlZGxpc3QsXG5yaWNodGV4dG91dGRlbnQscmlnaHQscmlnaHRfYWxpZ25fdGV4dCxyb3RhdGUscm93cyxzYWxlc2ZvcmNlMSxzZWFyY2gsc2V0dGluZ3Msc2V0dXAsc2V0dXBfYXNzaXN0YW50X2d1aWRlLFxuc2hhcmUsc2hhcmVfcG9zdCxzaGllbGQsc2lkZV9saXN0LHNpZ25wb3N0LHNtcyxzbmlwcGV0LHNvY2lhbHNoYXJlLHNvcnQsc3Bpbm5lcixzdGFuZGFyZF9vYmplY3RzLFxuc3RvcCxzdHJpa2V0aHJvdWdoLHN1Y2Nlc3Msc3VtbWFyeSxzdW1tYXJ5ZGV0YWlsLHN3aXRjaCx0YWJsZSx0YWJsZXRfbGFuZHNjYXBlLHRhYmxldF9wb3J0cmFpdCxcbnRhYnNldCx0YXNrLHRleHRfYmFja2dyb3VuZF9jb2xvcix0ZXh0X2NvbG9yLHRocmVlZG90cyx0aWxlX2NhcmRfbGlzdCx0b3BpYyx0b3VjaF9hY3Rpb24sdHJhaWwsdW5kZWxldGUsdW5kZXByZWNhdGUsXG51bmRlcmxpbmUsdW5kbyx1bmxvY2ssdW5tdXRlZCx1cCx1cGxvYWQsdXNlcix1c2VyX3JvbGUsdm9sdW1lX2hpZ2gsdm9sdW1lX2xvdyx2b2x1bWVfb2ZmLHdhcm5pbmcsXG53ZWVrbHl2aWV3LHdvcmxkLHpvb21pbix6b29tb3V0XG5gXG4gIC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbiAgLnNwbGl0KC9bXFxzLF0rLyk7XG4vKiBlc2xpbnQtZW5hYmxlIG1heC1sZW4gKi9cblxuZXhwb3J0IHR5cGUgSWNvbkNhdGVnb3J5ID1cbiAgfCAnYWN0aW9uJ1xuICB8ICdjdXN0b20nXG4gIHwgJ2RvY3R5cGUnXG4gIHwgJ3N0YW5kYXJkJ1xuICB8ICd1dGlsaXR5JztcbmV4cG9ydCB0eXBlIEljb25TaXplID0gJ3gtc21hbGwnIHwgJ3NtYWxsJyB8ICdtZWRpdW0nIHwgJ2xhcmdlJztcbmV4cG9ydCB0eXBlIEljb25Db250YWluZXIgPSBib29sZWFuIHwgJ2RlZmF1bHQnIHwgJ2NpcmNsZSc7XG5leHBvcnQgdHlwZSBJY29uVGV4dENvbG9yID0gJ2RlZmF1bHQnIHwgJ3dhcm5pbmcnIHwgJ2Vycm9yJyB8IG51bGw7XG5cbmV4cG9ydCB0eXBlIEljb25Qcm9wcyA9IHtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBjb250YWluZXJDbGFzc05hbWU/OiBzdHJpbmc7XG4gIGNhdGVnb3J5PzogSWNvbkNhdGVnb3J5O1xuICBpY29uOiBzdHJpbmc7XG4gIHNpemU/OiBJY29uU2l6ZTtcbiAgYWxpZ24/OiAnbGVmdCcgfCAncmlnaHQnO1xuICBjb250YWluZXI/OiBJY29uQ29udGFpbmVyO1xuICBjb2xvcj86IHN0cmluZztcbiAgdGV4dENvbG9yPzogSWNvblRleHRDb2xvcjtcbiAgdGFiSW5kZXg/OiBudW1iZXI7XG4gIGZpbGxDb2xvcj86IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIEljb25TdGF0ZSA9IHtcbiAgaWNvbkNvbG9yPzogc3RyaW5nO1xufTtcblxuZXhwb3J0IGNsYXNzIEljb24gZXh0ZW5kcyBDb21wb25lbnQ8XG4gIEljb25Qcm9wcyAmIFNWR0F0dHJpYnV0ZXM8U1ZHRWxlbWVudD4sXG4gIEljb25TdGF0ZVxuPiB7XG4gIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7IGFzc2V0Um9vdDogUHJvcFR5cGVzLnN0cmluZyB9O1xuXG4gIHN0YXRpYyBJQ09OUyA9IHtcbiAgICBTVEFOREFSRF9JQ09OUyxcbiAgICBDVVNUT01fSUNPTlMsXG4gICAgQUNUSU9OX0lDT05TLFxuICAgIERPQ1RZUEVfSUNPTlMsXG4gICAgVVRJTElUWV9JQ09OUyxcbiAgfTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3Qvc29ydC1jb21wXG4gIGNvbnRleHQhOiBQaWNrPENvbXBvbmVudFNldHRpbmdzQ29udGV4dCwgJ2Fzc2V0Um9vdCc+O1xuXG4gIGljb25Db250YWluZXI6IEhUTUxTcGFuRWxlbWVudCB8IG51bGw7XG5cbiAgc3ZnSWNvbjogU1ZHRWxlbWVudCB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IFJlYWRvbmx5PEljb25Qcm9wcyAmIFNWR0F0dHJpYnV0ZXM8U1ZHRWxlbWVudD4+KSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgICB0aGlzLmljb25Db250YWluZXIgPSBudWxsO1xuICAgIHRoaXMuc3ZnSWNvbiA9IG51bGw7XG4gICAgcmVnaXN0ZXJTdHlsZSgnaWNvbicsIFtbJy5zbGRzLWljb24gdXNlJywgJ3sgcG9pbnRlci1ldmVudHM6IG5vbmU7IH0nXV0pO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5jaGVja0ljb25Db2xvcigpO1xuICAgIGNvbnN0IHN2Z0VsID0gdGhpcy5zdmdJY29uO1xuICAgIGlmIChzdmdFbCAmJiB0aGlzLnByb3BzLnRhYkluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHN2Z0VsLnNldEF0dHJpYnV0ZSgnZm9jdXNhYmxlJywgKHRoaXMucHJvcHMudGFiSW5kZXggPj0gMCkudG9TdHJpbmcoKSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIHRoaXMuY2hlY2tJY29uQ29sb3IoKTtcbiAgfVxuXG4gIGdldEljb25Db2xvcihcbiAgICBmaWxsQ29sb3I6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICBjYXRlZ29yeTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIGljb246IHN0cmluZ1xuICApIHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bm5lZWRlZC10ZXJuYXJ5ICovXG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaWNvbkNvbG9yXG4gICAgICA/IHRoaXMuc3RhdGUuaWNvbkNvbG9yXG4gICAgICA6IGNhdGVnb3J5ID09PSAnZG9jdHlwZSdcbiAgICAgID8gbnVsbFxuICAgICAgOiBmaWxsQ29sb3IgPT09ICdub25lJ1xuICAgICAgPyBudWxsXG4gICAgICA6IGZpbGxDb2xvclxuICAgICAgPyBmaWxsQ29sb3JcbiAgICAgIDogY2F0ZWdvcnkgPT09ICd1dGlsaXR5J1xuICAgICAgPyBudWxsXG4gICAgICA6IGNhdGVnb3J5ID09PSAnY3VzdG9tJ1xuICAgICAgPyBpY29uLnJlcGxhY2UoL15jdXN0b20vLCAnY3VzdG9tLScpXG4gICAgICA6IGNhdGVnb3J5ID09PSAnYWN0aW9uJyAmJiAvXm5ld19jdXN0b20vLnRlc3QoaWNvbilcbiAgICAgID8gaWNvbi5yZXBsYWNlKC9ebmV3X2N1c3RvbS8sICdjdXN0b20tJylcbiAgICAgIDogYCR7Y2F0ZWdvcnl9LSR7KGljb24gfHwgJycpLnJlcGxhY2UoL18vZywgJy0nKX1gO1xuICAgIC8qIGVzbGludC1lbmFibGUgbm8tdW5uZWVkZWQtdGVybmFyeSAqL1xuICB9XG5cbiAgY2hlY2tJY29uQ29sb3IoKSB7XG4gICAgY29uc3QgeyBmaWxsQ29sb3IsIGNhdGVnb3J5ID0gJ3V0aWxpdHknLCBjb250YWluZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBpY29uQ29sb3IgfSA9IHRoaXMuc3RhdGU7XG4gICAgaWYgKFxuICAgICAgZmlsbENvbG9yIHx8XG4gICAgICBjYXRlZ29yeSA9PT0gJ2RvY3R5cGUnIHx8XG4gICAgICAoIWZpbGxDb2xvciAmJiBjYXRlZ29yeSA9PT0gJ3V0aWxpdHknKSB8fFxuICAgICAgaWNvbkNvbG9yID09PSAnc3RhbmRhcmQtZGVmYXVsdCdcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZWwgPSBjb250YWluZXIgPyB0aGlzLmljb25Db250YWluZXIgOiB0aGlzLnN2Z0ljb247XG4gICAgaWYgKCFlbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBiZ0NvbG9yU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsKS5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgLy8gaWYgbm8gYmFja2dyb3VuZCBjb2xvciBzZXQgdG8gdGhlIGljb25cbiAgICBpZiAoXG4gICAgICBiZ0NvbG9yU3R5bGUgJiZcbiAgICAgIC9eKHRyYW5zcGFyZW50fHJnYmFcXCgwLFxccyowLFxccyowLFxccyowXFwpKSQvLnRlc3QoYmdDb2xvclN0eWxlKVxuICAgICkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGljb25Db2xvcjogJ3N0YW5kYXJkLWRlZmF1bHQnIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlclNWRyh7XG4gICAgY2xhc3NOYW1lLFxuICAgIGNhdGVnb3J5ID0gJ3V0aWxpdHknLFxuICAgIGljb24sXG4gICAgc2l6ZSxcbiAgICBhbGlnbixcbiAgICBmaWxsQ29sb3IsXG4gICAgY29udGFpbmVyLFxuICAgIHRleHRDb2xvciA9ICdkZWZhdWx0JyxcbiAgICBzdHlsZSxcbiAgICBhc3NldFJvb3QsXG4gICAgLi4ucHJvcHNcbiAgfTogYW55KSB7XG4gICAgY29uc3QgaWNvbkNvbG9yID0gdGhpcy5nZXRJY29uQ29sb3IoZmlsbENvbG9yLCBjYXRlZ29yeSwgaWNvbik7XG4gICAgY29uc3QgaWNvbkNsYXNzTmFtZXMgPSBjbGFzc25hbWVzKFxuICAgICAge1xuICAgICAgICAnc2xkcy1pY29uJzogIS9zbGRzLWJ1dHRvbl9faWNvbi8udGVzdChjbGFzc05hbWUpLFxuICAgICAgICBbYHNsZHMtaWNvbi0tJHtzaXplfWBdOiAvXih4LXNtYWxsfHNtYWxsfG1lZGl1bXxsYXJnZSkkLy50ZXN0KHNpemUpLFxuICAgICAgICBbYHNsZHMtaWNvbi10ZXh0LSR7dGV4dENvbG9yfWBdOlxuICAgICAgICAgIC9eKGRlZmF1bHR8d2FybmluZ3xlcnJvcikkLy50ZXN0KHRleHRDb2xvcikgJiYgIWljb25Db2xvcixcbiAgICAgICAgW2BzbGRzLWljb24tJHtpY29uQ29sb3J9YF06ICFjb250YWluZXIgJiYgaWNvbkNvbG9yLFxuICAgICAgICAnc2xkcy1tLWxlZnQtLXgtc21hbGwnOiBhbGlnbiA9PT0gJ3JpZ2h0JyxcbiAgICAgICAgJ3NsZHMtbS1yaWdodC0teC1zbWFsbCc6IGFsaWduID09PSAnbGVmdCcsXG4gICAgICB9LFxuICAgICAgY2xhc3NOYW1lXG4gICAgKTtcblxuICAgIC8vIGljb24gYW5kIGNhdGVnb3J5IHByb3Agc2hvdWxkIG5vdCBpbmNsdWRlIGNoYXJzIG90aGVyIHRoYW4gYWxwaGFudW1lcmljcywgdW5kZXJzY29yZSwgYW5kIGh5cGhlblxuICAgIGljb24gPSAoaWNvbiB8fCAnJykucmVwbGFjZSgvW15cXHctXS9nLCAnJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICBjYXRlZ29yeSA9IChjYXRlZ29yeSB8fCAnJykucmVwbGFjZSgvW15cXHctXS9nLCAnJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cblxuICAgIGNvbnN0IGljb25VcmwgPSBgJHthc3NldFJvb3R9L2ljb25zLyR7Y2F0ZWdvcnl9LXNwcml0ZS9zdmcvc3ltYm9scy5zdmcjJHtpY29ufWA7XG4gICAgcmV0dXJuIChcbiAgICAgIDxzdmdcbiAgICAgICAgY2xhc3NOYW1lPXtpY29uQ2xhc3NOYW1lc31cbiAgICAgICAgYXJpYS1oaWRkZW5cbiAgICAgICAgcmVmPXsobm9kZSkgPT4gKHRoaXMuc3ZnSWNvbiA9IG5vZGUpfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgIHsuLi5wcm9wc31cbiAgICAgID5cbiAgICAgICAgPHVzZSB4bGlua0hyZWY9e2ljb25Vcmx9IC8+XG4gICAgICA8L3N2Zz5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY29udGFpbmVyLCAuLi5wcm9wcyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGFzc2V0Um9vdCA9IGdldEFzc2V0Um9vdCgpIH0gPSB0aGlzLmNvbnRleHQ7XG4gICAgbGV0IHsgY2F0ZWdvcnksIGljb24gfSA9IHByb3BzO1xuXG4gICAgaWYgKGljb24uaW5kZXhPZignOicpID4gMCkge1xuICAgICAgW2NhdGVnb3J5LCBpY29uXSA9IGljb24uc3BsaXQoJzonKSBhcyBbSWNvblByb3BzWydjYXRlZ29yeSddLCBzdHJpbmddO1xuICAgIH1cbiAgICBpZiAoY29udGFpbmVyKSB7XG4gICAgICBjb25zdCB7IGNvbnRhaW5lckNsYXNzTmFtZSwgZmlsbENvbG9yLCAuLi5wcHJvcHMgfSA9IHByb3BzO1xuICAgICAgY29uc3QgaWNvbkNvbG9yID0gdGhpcy5nZXRJY29uQ29sb3IoZmlsbENvbG9yLCBjYXRlZ29yeSwgaWNvbik7XG4gICAgICBjb25zdCBjY29udGFpbmVyQ2xhc3NOYW1lID0gY2xhc3NuYW1lcyhcbiAgICAgICAgY29udGFpbmVyQ2xhc3NOYW1lLFxuICAgICAgICAnc2xkcy1pY29uX19jb250YWluZXInLFxuICAgICAgICBjb250YWluZXIgPT09ICdjaXJjbGUnID8gJ3NsZHMtaWNvbl9fY29udGFpbmVyLS1jaXJjbGUnIDogbnVsbCxcbiAgICAgICAgaWNvbkNvbG9yID8gYHNsZHMtaWNvbi0ke2ljb25Db2xvcn1gIDogbnVsbFxuICAgICAgKTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgY2xhc3NOYW1lPXtjY29udGFpbmVyQ2xhc3NOYW1lfVxuICAgICAgICAgIHJlZj17KG5vZGUpID0+ICh0aGlzLmljb25Db250YWluZXIgPSBub2RlKX1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnJlbmRlclNWRyh7XG4gICAgICAgICAgICBjYXRlZ29yeSxcbiAgICAgICAgICAgIGljb24sXG4gICAgICAgICAgICBmaWxsQ29sb3I6IGljb25Db2xvcixcbiAgICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICAgIGFzc2V0Um9vdCxcbiAgICAgICAgICAgIC4uLnBwcm9wcyxcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZW5kZXJTVkcoeyAuLi5wcm9wcywgY2F0ZWdvcnksIGljb24sIGFzc2V0Um9vdCB9KTtcbiAgfVxufVxuIl19