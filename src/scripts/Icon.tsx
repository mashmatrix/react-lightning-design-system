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
// from: https://v1.lightningdesignsystem.com/icons/#standard
const STANDARD_ICONS = `
account_info,account_score,account,action_list_component,actions_and_buttons,activation_target,activations,
ad_event_action,ad_event_cause,ad_event_effect,ad_event_factor,ad_event_info,ad_event_outcome,ad_event_party,
address,adverse_event,agent_home,agent_session,aggregate,aggregation_policy,ai_accelerator_card,all,announcement,
answer_best,answer_private,answer_public,apex_plugin,apex,app_form_participant,app_form_product_participant,app,
approval,apps_admin,apps,article,asset_action_source,asset_action,asset_audit,asset_downtime_period,asset_hierarchy,
asset_object,asset_relationship,asset_state_period,asset_warranty,assigned_resource,assignment,attach,
attribute_based_pricing,avatar_loading,avatar,bill_of_materials,billing,bot_training,bot,branch_merge,brand,budget_allocation,
budget_category_value,budget_period,budget,bundle_config,bundle_policy,bundles_pricing,business_hours,buyer_account,
buyer_group_qualifier,buyer_group,calculated_dimension,calculated_insights,calculated_measure,calibration,call_coaching,
call_history,call,campaign_members,campaign,cancel_checkout,canvas,capacity_plan,care_request_reviewer,carousel,
case_change_status,case_comment,case_email,case_log_a_call,case_milestone,case_transcript,case_wrap_up,case,catalog,
category,change_request,changes,channel_program_history,channel_program_levels,channel_program_members,channel_programs,
chart,checkout,choice,client,cms,coaching,code_playground,code_set_bundle,code_set,collection_variable,collection,
connect_wallet,connected_apps,constant,contact_list,contact_request,contact,contract_line_item,contract_line_outcome_data,
contract_line_outcome,contract_payment,contract,cost_model,coupon_codes,crypto_category_wallet_group,crypto_product_category_wallet_role,
crypto_product,crypto_transaction_envelope_change_snapshot,crypto_transaction_envelope_item,crypto_transaction_envelope,
crypto_transaction,crypto_wallet_group_item,crypto_wallet_group,crypto_wallet,currency_input,currency,custody_chain_entry,
custody_entry_verification,custody_override,custom_component_task,custom_notification,custom,customer_360,
customer_lifecycle_analytics,customer_portal_users,customer_workspace,customer,customers,dashboard_component,dashboard_ea,
dashboard,data_cloud,data_governance,data_graph,data_integration_hub,data_lake_objects,data_mapping,data_model,data_streams,
data_transforms,datadotcom,dataset,datashare_target,datashares,date_input,date_time,decision,default,delegated_account,
device,digital_verification_config_group,digital_verification_config,disclosure_and_compliance,discounts,
disease_definition_criteria,disease_investigation,disease_outbreak,display_rich_text,display_text,document_preview,
document_reference,document,drafts,duration_downscale,dynamic_highlights_panel,dynamic_record_choice,edit_form,education,
einstein_replies,email_chatter,email,employee_asset,employee_contact,employee_job_position,employee_job,employee_organization,
employee,empty,endorsement,enrollee_status,entitlement_policy,entitlement_process,entitlement_template,entitlement,
entity_milestone,entity,environment_hub,eval_result,event_ext,event,events,expense_report_entry,expense_report,expense,
facility_bed,feed,feedback,field_sales,file,filter_criteria_rule,filter_criteria,filter,first_non_empty,flow,folder,
forecasts,form,formula,fulfillment_order,funding_award_adjustment,funding_requirement,generic_loading,global_constant,
goals,group_loading,groups,guidance_center,header_discounts,hierarchy,high_velocity_sales,historical_adherence,holiday_operating_hours,
home,household,identifier,immunization,impact_outcome,impact_strategy_assignment,impact_strategy,inbox,incident,indicator_assignment,
indicator_definition,indicator_performance_period,indicator_result,individual,insights,instore_locations,investment_account,
invocable_action,iot_context,iot_orchestrations,javascript_button,job_family,job_position,job_profile,kanban,key_dates,
knowledge,labels,lead_insights,lead_list,lead,learner_program,letterhead,life_sciences,lightning_component,lightning_usage,
link,linked,list_email,list_fee,list_rate,live_chat_visitor,live_chat,location_permit,location,log_a_call,logging,loop,macros,
maintenance_asset,maintenance_plan,maintenance_work_rule,manual_discounts,map_line_item,market,marketing_actions,
med_rec_recommendation,med_rec_statement_recommendation,medication_administration,medication_dispense,medication_ingredient,
medication_reconciliation,medication_statement,medication,member_period,merge,messaging_conversation,messaging_session,messaging_user,
metric_definition,metric,metrics,mulesoft,multi_picklist,multi_select_checkbox,network_contract,news,nft_settings,nft_studio,
no_code_model,note,number_input,observation_component,omni_channel,omni_supervisor,operating_hours,operation_plan_execution,
operation_plan_request,operation_plan_step_execution,operation_plan_step,operation_plan,opportunity_contact_role,
opportunity_splits,opportunity,orchestrator,order_item,orders,outcome_activity,outcome,output,panel_detail,partner_fund_allocation,
partner_fund_claim,partner_fund_request,partner_marketing_budget,partners,party_profile,password,past_chat,path_experiment,
patient_medication_dosage,patient_service,payment_gateway,people_score,people,performance,person_account,person_language,
person_name,photo,picklist_choice,picklist_type,planogram,policy,poll,portal_roles_and_subordinates,portal_roles,portal,
post,practitioner_role,prep_flow,price_adjustment_matrix,price_adjustment_schedule,price_adjustment_tier,price_book_entries,
price_books,price_sheet,pricebook,pricing_workspace,problem,procedure_detail,procedure_output_resolution,procedure,process_exception,
process,product_consumed_state,product_consumed,product_item_transaction,product_item,product_quantity_rules,product_request_line_item,
product_request,product_required,product_service_campaign_item,product_service_campaign,product_transfer_state,product_transfer,
product_warranty_term,product_workspace,product,products,program_cohort_member,program_cohort,program_detail,program_site,program_status,
promotion_segments,promotion_tiers,promotions_workspace,promotions,prompt_builder,prompt,propagation_policy,proposition,prospect,qualifications,
query_editor,question_best,question_feed,queue,quick_text,quip_sheet,quip,quotes,radio_button,rate_adjustment,read_receipts,real_time,recent,
recipe,record_consent,record_create,record_delete,record_lookup,record_signature_task,record_update,record,recycle_bin,registered_model,related_list,
relationship,repeaters,replace,reply_text,report_type,report,reset_password,resource_absence,resource_capacity,resource_preference,resource_skill,
restriction_policy,return_order_line_item,return_order,reward,robot,rtc_presence,sales_cadence_target,sales_cadence,sales_channel,sales_path,sales_value,
salesforce_cms,scan_card,schedule_objective,scheduling_constraint,scheduling_policy,scheduling_workspace_territory,scheduling_workspace,screen,search,
section,segments,selling_model,send_log,serialized_product_transaction,serialized_product,service_appointment_capacity_usage,service_appointment,
service_contract,service_crew_member,service_crew,service_report,service_request_detail,service_request,service_resource,
service_territory_location,service_territory_member,service_territory_policy,service_territory,settings,setup_modal,shift_pattern_entry,
shift_pattern,shift_preference,shift_scheduling_operation,shift_template,shift_type,shift,shipment,skill_entity,skill_requirement,skill,
slack_conversations,slack,slider,sms,snippet_alt,snippet,snippets,sobject_collection,sobject,social,solution,sort_policy,sort,sossession,
stage_collection,stage,steps,store_group,store,story,strategy,study_candidate,study_related,study,sub_metric,survey,swarm_request,swarm_session,
system_and_global_variable,table,tableau,task,task2,tax_policy,tax_rate,tax_treatment,taxonomy,team_member,template,text_template,text,textarea,
textbox,thanks_loading,thanks,time_period,timesheet_entry,timesheet,timeslot,title_party,today,toggle,topic,topic2,tour_check,tour,trailhead_alt,trailhead,
transaction_usage_entitlement,travel_mode,unified_health_score,unmatched,uploaded_model,usage_billing_period_item,usage_entitlement_account,
usage_entitlement_bucket,usage_entitlement_entry,usage_ratable_summary,usage_summary,user_role,user,variable,variation_attribute_setup,
variation_products,video,visit_templates,visits,visualforce_page,visualization,voice_call,volume_discounts,waits,walkthroughs,
warranty_term,water,webcart,whatsapp,work_capacity_limit,work_capacity_usage,work_contract,work_forecast,work_order_item,
work_order,work_plan_rule,work_plan_template_entry,work_plan_template,work_plan,work_queue,work_step_template,work_step,work_summary,
work_type_group,work_type,workforce_engagement,workspace,your_account
`
  .replace(/^\s+|\s+$/g, '')
  .split(/[\s,]+/);

// from: https://v1.lightningdesignsystem.com/icons/#custom
const CUSTOM_ICONS = new Array(113 + 1)
  .join('_')
  .split('')
  .map((a, i) => `custom${i + 1}`);

// from: https://v1.lightningdesignsystem.com/icons/#action
const ACTION_ICONS = `
add_contact,add_file,add_photo_video,add_relationship,adjust_value,announcement,apex,approval,back,bug,call,
canvas,change_owner,change_record_type,check,clone,close,defer,delete,description,dial_in,download,edit_groups,
edit_relationship,edit,email,fallback,filter,flow,follow,following,freeze_user,goal,google_news,info,join_group,
lead_convert,leave_group,log_a_call,log_event,manage_perm_sets,map,more,new_account,new_campaign,new_case,
new_child_case,new_contact,new_event,new_group,new_lead,new_note,new_notebook,new_opportunity,new_person_account,
new_task,new,password_unlock,preview,priority,question_post_action,quote,recall,record,refresh,reject,remove_relationship,
remove,reset_password,scan_disabled,scan_enabled,script,share_file,share_link,share_poll,share_post,share_thanks,
share,sort,submit_for_approval,update_status,update,upload,user_activation,user,view_relationship,web_link
`
  .replace(/^\s+|\s+$/g, '')
  .split(/[\s,]+/);

// from: https://v1.lightningdesignsystem.com/icons/#doctype
const DOCTYPE_ICONS = `
ai,attachment,audio,box_notes,csv,eps,excel,exe,flash,folder,gdoc,gdocs,gform,gpres,gsheet,html,image,keynote,
library_folder,link,mp4,overlay,pack,pages,pdf,ppt,psd,quip_doc,quip_sheet,quip_slide,rtf,shared_folder,slide,
stypi,txt,unknown,video,visio,webex,word,xml,zip
`
  .replace(/^\s+|\s+$/g, '')
  .split(/[\s,]+/);

// from: https://v1.lightningdesignsystem.com/icons/#utility
const UTILITY_ICONS = `
activity,ad_set,add_above,add_below,add_source,add,adduser,adjust_value,advanced_function,advertising,
agent_astro,agent_home,agent_session,aggregate,aggregation_policy,alert,all,anchor,angle,animal_and_nature,
announcement,answer,answered_twice,anywhere_alert,anywhere_chat,apex_alt,apex_plugin,apex,app_web_messaging,
applied_amount,approval,apps,archive,array,arrow_bottom,arrow_left,arrow_right,arrow_top,arrowdown,arrowup,
asset_audit,asset_object,asset_repossessed,asset_warranty,assignment,attach,automate,away,back,ban,billing,
block_visitor,bold,bookmark_alt,bookmark_stroke,bookmark,border_all,border_bottom,border_left,border_right,border_top,
bottom_align,bottom_group_alignment,breadcrumbs,broadcast,brush,bucket,budget_category_value,budget_period,bug,builder,
bundle_config,bundle_policy,button_choice,buyer_group_qualifier,calculated_insights,call,campaign,cancel_file_request,
cancel_transfer,cant_sync,capacity_plan,capslock,captions,card_details,cart,case,cases,center_align_text,center_align,
center_group_alignment,change_owner,change_record_type,change_request,changes,chart,chat,check,checkin,checkout,
chevrondown,chevronleft,chevronright,chevronup,choice,circle,classic_interface,clear,clock,close,cms,co_ins_infusion,
co_insurance,collapse_all,collection_alt,collection_variable,collection,color_swatch,columns,comments,company,
component_customization,connected_apps,constant,contact_request,contact,contactless_pay,contract_alt,contract_doc,
contract_line_outcome_data,contract_line_outcome,contract_payment,contract,copay_infusion,copay,copy_to_clipboard,
copy,coupon_codes,coverage_type,crossfilter,currency_input,currency,custom_apps,customer_workspace,customer,cut,dash,
data_cloud,data_graph,data_mapping,data_model,data_transforms,database,datadotcom,date_input,date_time,dayview,
deductible_met,deductible,delete,deny_access_field,deny_access_object,deny_access_row,deprecate,description,
desktop_and_phone,desktop_console,desktop,detach,dialing,diamond,discounts,dislike,display_rich_text,display_text,
dock_panel,document_preview,donut_chart,down,download,drag_and_drop,drag,duration_downscale,dynamic_record_choice,
edit_form,edit_gpt,edit,education,einstein_alt,einstein,email_open,email,emoji_above_average,emoji_average,emoji_bad,
emoji_below_average,emoji_excellent,emoji_good,emoji_outstanding,emoji_very_bad,emoji_very_good,emoji_worst,emoji,
end_call,end_chat,end_messaging_session,engage,enter,entitlement,erect_window,error,event_ext,event,events,expand_all,
expand_alt,expand,expense_report,expense,expired,fallback,favorite_alt,favorite,feed,field_currency_calc,field_date_calc,
field_date_time_calc,field_dimension_calc,field_measure_calc,field_sales,file,filter_criteria_rule,filter_criteria,
filter,filterList,flow_alt,flow,food_and_drink,form,format,formula,forward_up,forward,freeze_column,frozen,
fulfillment_order,full_width_view,fully_synced,funding_award_adjustment,funding_requirement,global_constant,graph,
groups,guidance,hazmat_equipment,heart,height,help_center,help_doc_ext,help,hide_mobile,hide,hierarchy,high_velocity_sales,
highlight,holiday_operating_hours,home,hourglass,http,identity,image,in_app_assistant,inbox,incident,incoming_call,
indicator_performance_period,info_alt,info,inner_join,insert_tag_field,insert_template,inspector_panel,integration,
internal_share,italic,join,jump_to_bottom,jump_to_left,jump_to_right,jump_to_top,justify_text,kanban,key_dates,key,
keyboard_dismiss,keypad,knowledge_base,knowledge_smart_link,label,labels,layers,layout_banner,layout_card,layout_overlap,
layout_tile,layout,lead,leave_conference,left_align_text,left_align,left_join,left,level_down,level_up,light_bulb,
lightning_extension,lightning_inspector,like,line_chart,link,linked,list_email,list,listen,live_message,location_permit,
location,lock,locked_with_additions,locker_service_api_viewer,locker_service_console,log_a_call,logout,loop,lower_flag,lt_max,
lt_remaining,macros,magicwand,maintenance_plan,mark_all_as_read,market,mask_field,matrix,meet_content_source,meet_focus_content,
meet_focus_equal,meet_focus_presenter,meet_present_panel,merge_field,merge,messaging_conversation,metrics,middle_align,minimize_window,
missed_call,mixed_sources_mapping,money,moneybag,monthlyview,more,move,mulesoft,multi_picklist,multi_select_checkbox,muted,new_direct_message,
new_window,new,news,no_return,not_in_sync,not_saved,note,notebook,notification_off,notification_snoozed,notification,number_input,office365,
offline_briefcase,offline_cached,offline,omni_channel,oop_annual,oop_applied,oop_max,oop_total,open_folder,open,
opened_folder,opportunity,orchestrator,orders,org_chart,outbound_call,outcome,outer_join,output,overflow,package_org_beta,
package_org,package,page_structure,page,palette,partner_fund_request,password,paste,path_experiment,pause_alt,pause,
paused_call,payment_deferred,payment_gateway,pdf_ext,people_score,people,percent,phone_landscape,phone_portrait,photo,
picklist_choice,picklist_type,picklist,pin,pinned,plane,planning_poker,play,podcast_webinar,policy,pop_in,power,pre_auth,
preview,price_book_entries,price_books,pricing_workspace,print,priority,privately_shared,pro_network,problem,process,product_consumed_state,
product_quantity_rules,product_service_campaign_item,product_service_campaign,product_transfer_state,product_transfer,product_warranty_term,
product_workspace,product,products,profile_alt,profile,program_cohort_member,program_cohort,promotion_segments,promotion_tiers,promotions_workspace,
promotions,prompt_builder,prompt_edit,prompt,propagation_policy,proposition,push,puzzle,qualifications,question_mark,question,
questions_and_answers,queue,quick_text,quip,quotation_marks,quote,radio_button,rating,real_time,reassign,recipe,record_alt,
record_collection,record_consent,record_create,record_delete,record_lookup,record_update,record,recurring_exception,
recycle_bin_empty,recycle_bin_full,redo,refresh,regenerate,relate,reminder,remove_formatting,remove_link,replace,replay,
reply_all,reply,report_issue,reset_password,resource_absence,resource_capacity,resource_territory,response_date,restriction_policy,
retail_execution,retweet,ribbon,richtextbulletedlist,richtextindent,richtextnumberedlist,richtextoutdent,right_align_text,right_align,
right_join,right,robot,rotate,routing_offline,rows,rules,sales_channel,salesforce_page,salesforce1,save,scan,screen,search,section,
segments,send_log,send,sender_email,sentiment_negative,sentiment_neutral,serialized_product_transaction,serialized_product,
service_appointment,service_contract,service_report,service_territory_policy,settings,setup_assistant_guide,setup_modal,
setup,share_file,share_mobile,share_post,share,shield,shift_pattern_entry,shift_pattern,shift_scheduling_operation,
shift_ui,shopping_bag,shortcuts,side_list,signature,signpost,skill,skip_back,skip_forward,skip,slack_conversations,
slack,slider,smiley_and_people,sms,snippet,sobject_collection,sobject,socialshare,sort_ascending,sort_policy,sort,spacer,
sparkle,sparkles,spinner,stage_collection,stage,standard_objects,status_code,steps,stop,store,strategy,strikethrough,success,
suggested_for_you,summary,summarydetail,survey,swarm_request,swarm_session,switch,symbols,sync_in_progress,sync,system_and_global_variable,
table_settings,table,tableau,tablet_landscape,tablet_portrait,tabset,talent_development,target_mode,target,task,tax_policy,tax_rate,
tax_treatment,text_background_color,text_color,text_template,text,textarea,textbox,threedots_vertical,threedots,thunder,tile_card_list,toggle_off,
toggle_on,toggle_panel_bottom,toggle_panel_left,toggle_panel_right,toggle_panel_top,toggle,tollways,top_align,top_group_alignment,topic,topic2,touch_action,
tour_check,tour,tracker,trail,trailblazer_ext,trailhead_alt,trailhead_ext,trailhead,transparent,transport_bicycle,transport_heavy_truck,transport_light_truck,
transport_walking,travel_and_places,trending,truck,turn_off_notifications,type_tool,type,undelete,undeprecate,underline,undo,unlinked,
unlock,unmuted,up,upload,user_role,user,variable,variation_attribute_setup,variation_products,video_off,video,visibility_rule_assigned,
voicemail_drop,volume_high,volume_low,volume_off,waits,walkthroughs,warning,warranty_term,watchlist,water,weeklyview,wellness,width,wifi,
work_forecast,work_order_type,work_queue,workforce_engagement,world,your_account,yubi_key,zoomin,zoomout
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
export type IconSize = 'xx-small' | 'x-small' | 'small' | 'medium' | 'large';
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
        [`slds-icon_${size}`]: /^(xx-small|x-small|small|medium|large)$/.test(
          size
        ),
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
