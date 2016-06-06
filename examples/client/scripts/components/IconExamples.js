import React from 'react';

import { Icon } from 'react-lightning-design-system';

const { STANDARD_ICONS, CUSTOM_ICONS, ACTION_ICONS, DOCTYPE_ICONS, UTILITY_ICONS } = Icon.ICONS;

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
