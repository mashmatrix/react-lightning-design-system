import React, {
  ForwardedRef,
  forwardRef,
  SVGAttributes,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import classnames from 'classnames';
import svg4everybody from 'svg4everybody';
import { registerStyle, getAssetRoot } from './util';
import { ComponentSettingsContext } from './ComponentSettings';
import { useEventCallback } from './hooks';
import { createFC } from './common';

svg4everybody();

/* eslint-disable max-len */
const STANDARD_ICONS = `
account,announcement,answer_best,answer_private,answer_public,approval,apps,apps_admin,
article,avatar,avatar_loading,calibration,call,call_history,campaign,campaign_members,
canvas,case,case_change_status,case_comment,case_email,case_log_a_call,case_transcript,
client,coaching,connected_apps,contact,contract,custom,dashboard,default,document,
drafts,email,email_IQ,email_chatter,empty,endorsement,environment_hub,event,feed,feedback,
file,flow,folder,generic_loading,goals,group_loading,groups,hierarchy,home,household,insights,investment_account,
lead,link,log_a_call,marketing_actions,metrics,news,note,opportunity,
orders,people,performance,person_account,photo,poll,portal,post,pricebook,process,product,question_best,
question_feed,quotes,recent,record,related_list,report,reward,scan_card,skill_entity,
social,solution,sossession,task,task2,team_member,thanks,thanks_loading,today,topic,
unmatched,user,work_order,work_order_item
`
  .replace(/^\s+|\s+$/g, '')
  .split(/[\s,]+/);

const CUSTOM_ICONS = new Array(101)
  .join('_')
  .split('')
  .map((a, i) => `custom${i + 1}`);

const ACTION_ICONS = `
add_contact,announcement,apex,approval,back,call,canvas,change_owner,change_record_type,
check,clone,close,defer,delete,description,dial_in,download,edit,edit_groups,edit_relationship,
email,fallback,filter,flow,follow,following,freeze_user,goal,google_news,info,join_group,
lead_convert,leave_group,log_a_call,log_event,manage_perm_sets,map,more,new,new_account,
new_campaign,new_case,new_child_case,new_contact,new_event,new_group,new_lead,new_note,
new_notebook,new_opportunity,new_person_account,new_task,password_unlock,preview,priority,question_post_action,
quote,record,refresh,reject,remove,reset_password,share,share_file,share_link,share_poll,
share_post,share_thanks,sort,submit_for_approval,update,update_status,upload,user,user_activation,
web_link,
new_custom7,new_custom8,new_custom9,new_custom10,new_custom11,new_custom12,new_custom13,
new_custom14,new_custom15,new_custom16,new_custom17,new_custom18,new_custom19,new_custom20,
new_custom21,new_custom22,new_custom23,new_custom24,new_custom25,new_custom26,new_custom27,
new_custom28,new_custom29,new_custom30,new_custom31,new_custom32,new_custom33,new_custom34,
new_custom35,new_custom36,new_custom37,new_custom38,new_custom39,new_custom40,new_custom41,
new_custom42,new_custom43,new_custom44,new_custom45,new_custom46,new_custom47,new_custom48,
new_custom49,new_custom50,new_custom51,new_custom52,new_custom53,new_custom54,new_custom55,
new_custom56,new_custom57,new_custom58,new_custom59,new_custom60,new_custom61,new_custom62,
new_custom63,new_custom64,new_custom65,new_custom66,new_custom67,new_custom68,new_custom69,
new_custom70,new_custom71,new_custom72,new_custom73,new_custom74,new_custom75,new_custom76,
new_custom77,new_custom78,new_custom79,new_custom80,new_custom81,new_custom82,new_custom83,
new_custom84,new_custom85,new_custom86,new_custom87,new_custom88,new_custom89,new_custom90,
new_custom91,new_custom92,new_custom93,new_custom94,new_custom95,new_custom96,new_custom97,
new_custom98,new_custom99,new_custom100
`
  .replace(/^\s+|\s+$/g, '')
  .split(/[\s,]+/);

const DOCTYPE_ICONS = `
ai,attachment,audio,box_notes,csv,eps,excel,exe,flash,gdoc,gdocs,gpres,gsheet,html,image,keynote,
link,mp4,overlay,pack,pages,pdf,ppt,psd,rtf,slide,stypi,txt,unknown,video,visio,
webex,word,xml,zip
`
  .replace(/^\s+|\s+$/g, '')
  .split(/[\s,]+/);

const UTILITY_ICONS = `
add,adduser,announcement,answer,apps,arrowdown,arrowup,attach,back,ban,bold,bookmark,brush,
bucket,builder,call,capslock,cases,center_align_text,chart,chat,check,checkin,chevrondown,
chevronleft,chevronright,chevronup,clear,clock,close,comments,company,connected_apps,
contract,contract_alt,copy,crossfilter,custom_apps,cut,dash,datadotcom,dayview,delete,deprecate,
description,desktop,down,download,edit,edit_form,email,end_call,erect_window,error,event,expand,
expand_alt,favorite,feed,file,filter,filterList,forward,frozen,groups,help,home,identity,image,inbox,info,
insert_tag_field,insert_template,italic,justify_text,kanban,knowledge_base,layers,layout,
left,left_align_text,like,link,list,location,lock,log_a_call,logout,magicwand,matrix,metrics,minimize_window,
moneybag,monthlyview,move,muted,new,new_window,news,note,notebook,notification,office365,offline,
open,open_folder,opened_folder,overflow,package,package_org,package_org_beta,page,palette,paste,
people,phone_landscape,phone_portrait,photo,picklist,power,preview,priority,process,push,puzzle,
question,questions_and_answers,record,redo,refresh,relate,remove_formatting,remove_link,
replace,reply,reset_password,retweet,richtextbulletedlist,richtextindent,richtextnumberedlist,
richtextoutdent,right,right_align_text,rotate,rows,salesforce1,search,settings,setup,setup_assistant_guide,
share,share_post,shield,side_list,signpost,sms,snippet,socialshare,sort,spinner,standard_objects,
stop,strikethrough,success,summary,summarydetail,switch,table,tablet_landscape,tablet_portrait,
tabset,task,text_background_color,text_color,threedots,tile_card_list,topic,touch_action,trail,undelete,undeprecate,
underline,undo,unlock,unmuted,up,upload,user,user_role,volume_high,volume_low,volume_off,warning,
weeklyview,world,zoomin,zoomout
`
  .replace(/^\s+|\s+$/g, '')
  .split(/[\s,]+/);
/* eslint-enable max-len */

/**
 *
 */
const ICONS = {
  STANDARD_ICONS,
  CUSTOM_ICONS,
  ACTION_ICONS,
  DOCTYPE_ICONS,
  UTILITY_ICONS,
};

/**
 *
 */
function useInitComponentStyle() {
  useEffect(() => {
    registerStyle('icon', [
      ['.slds-icon.react-slds-icon use', '{ pointer-events: none; }'],
    ]);
  }, []);
}

function getIconColor(
  fillColor: string | undefined,
  category: string | undefined,
  icon: string
) {
  /* eslint-disable no-unneeded-ternary */
  return category === 'doctype'
    ? null
    : fillColor === 'none'
    ? null
    : fillColor
    ? fillColor
    : category === 'utility'
    ? null
    : category === 'custom'
    ? icon.replace(/^custom/, 'custom-')
    : category === 'action' && /^new_custom/.test(icon)
    ? icon.replace(/^new_custom/, 'custom-')
    : `${category ?? ''}-${(icon ?? '').replace(/_/g, '-')}`;
  /* eslint-enable no-unneeded-ternary */
}

/**
 *
 */
export type IconCategory =
  | 'action'
  | 'custom'
  | 'doctype'
  | 'standard'
  | 'utility';
export type IconSize = 'x-small' | 'small' | 'medium' | 'large';
export type IconContainer = boolean | 'default' | 'circle';
export type IconTextColor = 'default' | 'warning' | 'error' | null;

/**
 *
 */
export type IconProps = {
  containerClassName?: string;
  category?: IconCategory;
  icon: string;
  size?: IconSize;
  align?: 'left' | 'right';
  container?: IconContainer;
  color?: string;
  textColor?: IconTextColor;
  tabIndex?: number;
  fillColor?: string;
} & SVGAttributes<SVGElement>;

/**
 *
 */
type SvgIconProps = IconProps & {
  iconColor: string | null;
};

/**
 *
 */
const SvgIcon = forwardRef(
  (props: SvgIconProps, ref: ForwardedRef<SVGSVGElement | null>) => {
    const {
      className = '',
      category: category_ = 'utility',
      icon: icon_,
      iconColor,
      size = '',
      align,
      container,
      textColor = 'default',
      style,
      ...rprops
    } = props;
    const { assetRoot = getAssetRoot() } = useContext(ComponentSettingsContext);
    const iconClassNames = classnames(
      'react-slds-icon',
      {
        'slds-icon': !/slds-button__icon/.test(className),
        [`slds-icon_${size}`]: /^(x-small|small|medium|large)$/.test(size),
        [`slds-icon-text-${textColor ?? 'default'}`]:
          /^(default|warning|error)$/.test(textColor ?? '') && !iconColor,
        [`slds-icon-${iconColor ?? ''}`]: !container && iconColor,
        'slds-m-left_x-small': align === 'right',
        'slds-m-right_x-small': align === 'left',
      },
      className
    );
    // icon and category prop should not include chars other than alphanumerics, underscore, and hyphen
    const icon = (icon_ ?? '').replace(/[^\w-]/g, ''); // eslint-disable-line no-param-reassign
    const category = (category_ ?? '').replace(/[^\w-]/g, ''); // eslint-disable-line no-param-reassign
    const iconUrl = `${assetRoot}/icons/${category}-sprite/svg/symbols.svg#${icon}`;
    return (
      <svg
        ref={ref}
        className={iconClassNames}
        aria-hidden
        style={style}
        {...rprops}
      >
        <use xlinkHref={iconUrl} />
      </svg>
    );
  }
);

/**
 *
 */
export const Icon = createFC<IconProps, { ICONS: typeof ICONS }>(
  (props) => {
    const { container, containerClassName, fillColor, ...rprops } = props;
    let { category = 'utility', icon } = props;

    useInitComponentStyle();

    const iconContainerRef = useRef<HTMLSpanElement | null>(null);

    const svgIconRef = useRef<SVGSVGElement | null>(null);

    const svgIconRefCallback = useCallback(
      (svgEl: SVGSVGElement | null) => {
        svgIconRef.current = svgEl;
        if (svgEl && props.tabIndex !== undefined) {
          svgEl.setAttribute('focusable', (props.tabIndex >= 0).toString());
        }
      },
      [props.tabIndex]
    );

    const [iconColor, setIconColor] = useState<string | null>(null);

    const checkIconColor = useEventCallback(() => {
      if (
        fillColor ||
        category === 'doctype' ||
        (!fillColor && category === 'utility') ||
        iconColor === 'standard-default'
      ) {
        return;
      }
      const el = container ? iconContainerRef.current : svgIconRef.current;
      if (!el) {
        return;
      }
      const bgColorStyle = getComputedStyle(el).backgroundColor;
      // if no background color set to the icon
      if (
        bgColorStyle &&
        /^(transparent|rgba\(0,\s*0,\s*0,\s*0\))$/.test(bgColorStyle)
      ) {
        setIconColor('standard-default');
      }
    });

    useEffect(() => {
      svgIconRefCallback(svgIconRef.current);
    }, [svgIconRefCallback]);

    useEffect(() => {
      checkIconColor();
    }, [checkIconColor]);

    if (icon.indexOf(':') > 0) {
      [category, icon] = icon.split(':') as [IconCategory, string];
    }

    const fillIconColor =
      iconColor || container ? getIconColor(fillColor, category, icon) : null;

    const svgIcon = (
      <SvgIcon
        ref={svgIconRefCallback}
        {...rprops}
        {...{
          container,
          category,
          icon,
          iconColor: fillIconColor,
        }}
      />
    );
    if (container) {
      const ccontainerClassName = classnames(
        containerClassName,
        'slds-icon_container',
        container === 'circle' ? 'slds-icon_container_circle' : null,
        fillIconColor ? `slds-icon-${fillIconColor}` : null
      );
      return (
        <span className={ccontainerClassName} ref={iconContainerRef}>
          {svgIcon}
        </span>
      );
    }
    return svgIcon;
  },
  { ICONS }
);
