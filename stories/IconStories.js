import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { text, select } from '@storybook/addon-knobs';
import { Icon } from '../src/scripts';

const iconListItemStyle = {
  float: 'left', width: '10rem', height: '5rem', padding: '1.5rem', textAlign: 'center',
};

storiesOf('Icon', module)
  .add('Controlled with knobs', withInfo('Icon controlled with knobs')(() => {
    const categoryOptions = {
      '': '(none)',
      standard: 'standard',
      custom: 'custom',
      action: 'action',
      doctype: 'doctype',
      utility: 'utility',
    };
    const category = select('category', categoryOptions, 'standard');
    const sizeOptions = {
      '': '(none)',
      'x-small': 'x-small',
      small: 'small',
      medium: 'medium',
      large: 'large',
    };
    const size = select('size', sizeOptions, 'medium');
    const icon = text('icon', 'account');
    const textColor = text('textColor');
    const fillColor = text('fillColor');
    const containerOptions = {
      '': '(none)',
      default: 'default',
      circle: 'circle',
    };
    const container = select('container', containerOptions);
    return (
      <Icon
        category={ category }
        size={ size }
        icon={ icon }
        textColor={ textColor }
        fillColor={ fillColor }
        container={ container }
      />
    );
  }))
  .add('Sizes', withInfo('Icon with different size (x-small, small, medium, large)')(() => (
    <div>
      <Icon icon='standard:case' size='x-small' onClick={ action('x-small:click') } />
      <span className='slds-p-right--small' />
      <Icon icon='standard:case' size='small' onClick={ action('small:click') } />
      <span className='slds-p-right--small' />
      <Icon icon='standard:case' size='medium' onClick={ action('medium:click') } />
      <span className='slds-p-right--small' />
      <Icon icon='standard:case' size='large' onClick={ action('large:click') } />
    </div>
  )))
  .add('Standard Icons', withInfo('Icons in standard category')(() => (
    <ul className='slds-clearfix'>
      {
        Icon.ICONS.STANDARD_ICONS.map((icon, i) => (
          <li key={ i } className='slds-p-around--small' style={ iconListItemStyle }>
            <figure>
              <Icon category='standard' icon={ icon } onClick={ action(`${icon}:click`) } />
              <figcaption>{ icon }</figcaption>
            </figure>
          </li>
        ))
      }
    </ul>
  )))
  .add('Custom Icons', withInfo('Icons in custom category')(() => (
    <ul className='slds-clearfix'>
      {
        Icon.ICONS.CUSTOM_ICONS.map((icon, i) => (
          <li key={ i } className='slds-p-around--small' style={ iconListItemStyle }>
            <figure>
              <Icon category='custom' icon={ icon } onClick={ action(`${icon}:click`) } />
              <figcaption>{ icon }</figcaption>
            </figure>
          </li>
        ))
      }
    </ul>
  )))
  .add('Action Icons', withInfo('Icons in action category')(() => (
    <ul className='slds-clearfix'>
      {
        Icon.ICONS.ACTION_ICONS.map((icon, i) => (
          <li key={ i } className='slds-p-around--small' style={ iconListItemStyle }>
            <figure>
              <Icon category='action' icon={ icon } container='circle' size='small' onClick={ action(`${icon}:click`) } />
              <figcaption>{ icon }</figcaption>
            </figure>
          </li>
        ))
      }
    </ul>
  )))
  .add('Doctype Icons', withInfo('Icons in doctype category')(() => (
    <ul className='slds-clearfix'>
      {
        Icon.ICONS.DOCTYPE_ICONS.map((icon, i) => (
          <li key={ i } className='slds-p-around--small' style={ iconListItemStyle }>
            <figure>
              <Icon category='doctype' icon={ icon } onClick={ action(`${icon}:click`) } />
              <figcaption>{ icon }</figcaption>
            </figure>
          </li>
        ))
      }
    </ul>
  )))
  .add('Utility Icons', withInfo('Icons in utility category')(() => (
    <ul className='slds-clearfix'>
      {
        Icon.ICONS.UTILITY_ICONS.map((icon, i) => (
          <li key={ i } className='slds-p-around--small' style={ iconListItemStyle }>
            <figure>
              <Icon category='utility' icon={ icon } onClick={ action(`${icon}:click`) } />
              <figcaption>{ icon }</figcaption>
            </figure>
          </li>
        ))
      }
    </ul>
  )))
;
