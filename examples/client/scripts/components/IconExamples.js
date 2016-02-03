import React from 'react';

import { Icon } from 'react-lightning-design-system';

const STANDARD_ICONS = `
account,announcement,answer_best,answer_private,answer_public,approval,apps_admin,
apps,article,avatar_loading,avatar,calibration,call_history,call,campaign_members,
campaign,canvas,case_change_status,case_comment,case_email,case_log_a_call,case_transcript,
case,client,coaching,connected_apps,contact,contract,custom,dashboard,default,document,
drafts,email_chatter,email,empty,endorsement,environment_hub,event,feed,feedback,
file,flow,generic_loading,goals,group_loading,groups,home,household,insights,investment_account,
lead,link,log_a_call,marketing_actions,marketing_resources,metrics,news,note,opportunity,
orders,people,performance,photo,poll,portal,post,pricebook,process,product,question_best,
question_feed,quotes,recent,record,related_list,report,reward,scan_card,skill_entity,
social,solution,sossession,task,task2,team_member,thanks_loading,thanks,today,topic,
unmatched,user
`
.replace(/^\s+|\s+$/g, '').split(/[\s,]+/);

const CUSTOM_ICONS =
  new Array(101).join('_').split('').map((a, i) => 'custom' + (i + 1));

const ACTION_ICONS = `
add_contact,announcement,apex,approval,back,call,canvas,change_owner,change_record_type,
check,clone,close,defer,delete,description,dial_in,download,edit_groups,edit_relationship,
edit,email,fallback,filter,flow,follow,following,freeze_user,goal,google_news,join_group,
lead_convert,leave_group,log_a_call,log_event,manage_perm_sets,map,more,new_account,
new_campaign,new_case,new_child_case,new_contact,new_event,new_group,new_lead,new_note,
new_notebook,new_opportunity,new_task,new,password_unlock,preview,priority,question_post_action,
quote,record,refresh,reject,remove,reset_password,share_file,share_link,share_poll,
share_post,share_thanks,sort,submit_for_approval,update_status,update,user_activation,
web_link,new_custom1,new_custom2,new_custom3,new_custom4,new_custom5,new_custom6,
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
.replace(/^\s+|\s+$/g, '').split(/[\s,]+/);


const DOCTYPE_ICONS = `
ai,attachment,audio,csv,eps,excel,exe,flash,gdoc,gdocs,gpres,gsheet,html,image,keynote,
link,mp4,overlay,pack,pages,pdf,ppt,psd,rtf,slide,stypi,txt,unknown,video,visio,
webex,word,xml,zip
`
.replace(/^\s+|\s+$/g, '').split(/[\s,]+/);


const UTILITY_ICONS = `
add,adduser,announcement,apps,arrowdown,arrowup,attach,back,ban,bold,bookmark,brush,
bucket,builder,call,capslock,cases,center_align_text,chart,chat,check,checkin,chevrondown,
chevronleft,chevronright,chevronup,clear,clock,close,comments,company,connected_apps,
contract_alt,contract,copy,crossfilter,custom_apps,cut,dash,dayview,delete,deprecate,
desktop,down,download,edit,email,end_call,erect_window,error,event,expand_alt,expand,
favorite,filter,filterList,forward,frozen,groups,help,home,identity,image,inbox,info,
insert_tag_field,insert_template,italic,justify_text,kanban,knowledge_base,layout,
left_align_text,left,like,link,list,location,lock,logout,magicwand,matrix,minimize_window,
monthlyview,move,muted,new_window,new,news,notebook,notification,office365,offline,
open_folder,open,opened_folder,package_org_beta,package_org,package,page,palette,paste,
people,phone_landscape,phone_portrait,photo,power,preview,priority,process,push,puzzle,
question,questions_and_answers,record,redo,refresh,relate,remove_formatting,remove_link,
replace,reply,reset_password,retweet,richtextbulletedlist,richtextindent,richtextnumberedlist,
richtextoutdent,right_align_text,right,rotate,rows,salesforce1,search,settings,setup_assistant_guide,
setup,share,shield,side_list,signpost,sms,snippet,socialshare,sort,spinner,standard_objects,
stop,strikethrough,success,summary,summarydetail,switch,table,tablet_landscape,tablet_portrait,
text_background_color,text_color,threedots,tile_card_list,topic,trail,undelete,undeprecate,
underline,undo,unlock,unmuted,up,upload,user,volume_high,volume_low,volume_off,warning,
weeklyview,world,zoomin,zoomout
`
.replace(/^\s+|\s+$/g, '').split(/[\s,]+/);

export default class IconExamples extends React.Component {

  render() {
    const styles = { padding: '12px' };
    const iconListStyles = { float: 'left', width: '10rem', height: '5rem', padding: '1.5rem', textAlign: 'center' };
    return (
      <div>
        <h2 className='slds-m-vertical--medium'>Icon Sizes</h2>
        <div style={ styles }>
          <Icon category='standard' icon='account' size='x-small' className='slds-m-right--small' />
          <Icon category='standard' icon='account' size='small' className='slds-m-right--small' />
          <Icon category='standard' icon='account' className='slds-m-right--small' />
          <Icon category='standard' icon='account' size='large' className='slds-m-right--small' />
        </div>
        <div style={ styles }>
          <Icon category='utility' icon='clock' size='x-small' className='slds-m-right--small' />
          <Icon category='utility' icon='clock' size='small' className='slds-m-right--small' />
          <Icon category='utility' icon='clock' className='slds-m-right--small' />
          <Icon category='utility' icon='clock' size='large' className='slds-m-right--small' />
        </div>
        <div style={ styles }>
          <Icon category='utility' icon='warning' size='x-small' textColor='warning' className='slds-m-right--small' />
          <Icon category='utility' icon='warning' size='small' textColor='warning' className='slds-m-right--small' />
          <Icon category='utility' icon='warning' textColor='warning' className='slds-m-right--small' />
          <Icon category='utility' icon='warning' size='large' textColor='warning' className='slds-m-right--small' />
        </div>
        <div style={ styles }>
          <Icon category='utility' icon='warning' size='x-small' textColor='error' className='slds-m-right--small' />
          <Icon category='utility' icon='warning' size='small' textColor='error' className='slds-m-right--small' />
          <Icon category='utility' icon='warning' textColor='error' className='slds-m-right--small' />
          <Icon category='utility' icon='warning' size='large' textColor='error' className='slds-m-right--small' />
        </div>

        <h2 className='slds-m-vertical--medium'>Icon Container</h2>
        <div style={ styles }>
          <Icon category='standard' icon='account' container='default' className='slds-m-right--small'/>
          <Icon category='action' icon='call' container='default' className='slds-m-right--small'/>
          <Icon category='custom' icon='custom1' container='default' className='slds-m-right--small'/>
        </div>
        <div style={ styles }>
          <Icon category='standard' icon='account' container='circle' className='slds-m-right--small'/>
          <Icon category='action' icon='call' container='circle' className='slds-m-right--small'/>
          <Icon category='custom' icon='custom1' container='circle' className='slds-m-right--small'/>
        </div>

        <h2 className='slds-m-vertical--medium'>Standard Icons</h2>
        <div style={ styles }>
          <ul className='slds-clearfix'>
            {
              STANDARD_ICONS.map((icon, index) => {
                return (
                  <li style={ iconListStyles } key={ index }>
                    <figure>
                      <Icon key={ icon } category='standard' icon={ icon } />
                      <figcaption>{ icon }</figcaption>
                    </figure>
                  </li>
                );
              })
            }
          </ul>
        </div>

        <h2 className='slds-m-vertical--medium'>Custom Icons</h2>
        <div style={ styles }>
          <ul className='slds-clearfix'>
            {
              CUSTOM_ICONS.map((icon, index) => {
                return (
                  <li style={ iconListStyles } key={ index }>
                    <figure>
                      <Icon key={ icon } category='custom' icon={ icon } />
                      <figcaption>{ icon }</figcaption>
                    </figure>
                  </li>
                );
              })
            }
          </ul>
        </div>

        <h2 className='slds-m-vertical--medium'>Action Icons</h2>
        <div style={ styles }>
          <ul className='slds-clearfix'>
            {
              ACTION_ICONS.map((icon, index) => {
                return (
                  <li style={ iconListStyles } key={ index }>
                    <figure>
                      <Icon key={ icon } category='action' container='circle' icon={ icon } />
                      <figcaption>{ icon }</figcaption>
                    </figure>
                  </li>
                );
              })
            }
          </ul>
        </div>

        <h2 className='slds-m-vertical--medium'>DocType Icons</h2>
        <div style={ styles }>
          <ul className='slds-clearfix'>
            {
              DOCTYPE_ICONS.map((icon, index) => {
                return (
                  <li style={ iconListStyles } key={ index }>
                    <figure>
                      <Icon key={ icon } category='doctype' icon={ icon } />
                      <figcaption>{ icon }</figcaption>
                    </figure>
                  </li>
                );
              })
            }
          </ul>
        </div>

        <h2 className='slds-m-vertical--medium'>Utility Icons</h2>
        <div style={ styles }>
          <ul className='slds-clearfix'>
            {
              UTILITY_ICONS.map((icon, index) => {
                return (
                  <li style={ iconListStyles } key={ index }>
                    <figure>
                      <Icon key={ icon } icon={ icon } />
                      <figcaption>{ icon }</figcaption>
                    </figure>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}
