import React from 'react';

import { DropdownButton, MenuItem, ButtonGroup } from 'react-lightning-design-system';


export default class DropdownButtonExamples extends React.Component {
  render() {
    const styles = { padding: '12px' };
    const click = () => alert('Clicked');
    return (
      <div>
        <h2 className='slds-m-vertical--medium'>Dropdown Buttons</h2>
        <div style={ styles }>
          <DropdownButton label='Simple' menuAlign='left'>
            <MenuItem onClick={ click }>Menu Item #1</MenuItem>
            <MenuItem onClick={ click }>Menu Item #2</MenuItem>
            <MenuItem onClick={ click }>Menu Item #3</MenuItem>
          </DropdownButton>
          <DropdownButton type='neutral' label='Neutral' menuAlign='left' onMenuItemClick={ click }>
            <MenuItem icon='check' iconRight='attach'>Menu Item #1</MenuItem>
            <MenuItem icon='none' iconRight='apps'>Menu Item #2</MenuItem>
            <MenuItem icon='none' iconRight='bookmark' disabled>Menu Item #3</MenuItem>
          </DropdownButton>
          <DropdownButton type='icon-bare' icon='settings' iconSize='small' menuAlign='left' menuHeader='Icon Menu'>
            <MenuItem>Menu Item #1</MenuItem>
            <MenuItem>Menu Item #2</MenuItem>
            <MenuItem>Menu Item #3</MenuItem>
          </DropdownButton>
          <DropdownButton type='icon-more' icon='palette' menuHeader='Icon Menu'>
            <MenuItem>Menu Item #1</MenuItem>
            <MenuItem>Menu Item #2</MenuItem>
            <MenuItem>Menu Item #3</MenuItem>
          </DropdownButton>
          <DropdownButton type='icon-border-filled' menuAlign='right' menuSize='small' menuHeader='Right-Aligned Icon Menu'>
            <MenuItem>Menu Item #1</MenuItem>
            <MenuItem>Menu Item #2</MenuItem>
            <MenuItem>Menu Item #3</MenuItem>
          </DropdownButton>
        </div>
        <h2 className='slds-m-vertical--medium'>Dropdown Buttons (hover popup)</h2>
        <div style={ styles }>
          <DropdownButton label='Simple' menuAlign='left' hoverPopup>
            <MenuItem onClick={ click }>Menu Item #1</MenuItem>
            <MenuItem onClick={ click }>Menu Item #2</MenuItem>
            <MenuItem onClick={ click }>Menu Item #3</MenuItem>
          </DropdownButton>
          <DropdownButton type='neutral' label='Neutral' menuAlign='left' onMenuItemClick={ click } hoverPopup>
            <MenuItem icon='check' iconRight='attach'>Menu Item #1</MenuItem>
            <MenuItem icon='none' iconRight='apps'>Menu Item #2</MenuItem>
            <MenuItem icon='none' iconRight='bookmark' disabled>Menu Item #3</MenuItem>
          </DropdownButton>
          <DropdownButton type='icon-bare' icon='settings' iconSize='small' menuAlign='left' menuHeader='Icon Menu' hoverPopup>
            <MenuItem>Menu Item #1</MenuItem>
            <MenuItem>Menu Item #2</MenuItem>
            <MenuItem>Menu Item #3</MenuItem>
          </DropdownButton>
          <DropdownButton type='icon-more' icon='palette' menuHeader='Icon Menu' hoverPopup>
            <MenuItem>Menu Item #1</MenuItem>
            <MenuItem>Menu Item #2</MenuItem>
            <MenuItem>Menu Item #3</MenuItem>
          </DropdownButton>
          <DropdownButton type='icon-border-filled' menuAlign='right' menuSize='small' menuHeader='Right-Aligned Icon Menu' hoverPopup>
            <MenuItem>Menu Item #1</MenuItem>
            <MenuItem>Menu Item #2</MenuItem>
            <MenuItem>Menu Item #3</MenuItem>
          </DropdownButton>
        </div>
        <h2 className='slds-m-vertical--medium'>Dropdown Buttons (nubbin in top of the menu)</h2>
        <div style={ styles }>
          <DropdownButton label='Simple' menuAlign='left' nubbinTop>
            <MenuItem onClick={ click }>Menu Item #1</MenuItem>
            <MenuItem onClick={ click }>Menu Item #2</MenuItem>
            <MenuItem onClick={ click }>Menu Item #3</MenuItem>
          </DropdownButton>
          <DropdownButton type='neutral' label='Neutral' menuAlign='left' onMenuItemClick={ click } nubbinTop>
            <MenuItem icon='check' iconRight='attach'>Menu Item #1</MenuItem>
            <MenuItem icon='none' iconRight='apps'>Menu Item #2</MenuItem>
            <MenuItem icon='none' iconRight='bookmark' disabled>Menu Item #3</MenuItem>
          </DropdownButton>
          <DropdownButton type='icon-bare' icon='settings' iconSize='small' menuAlign='center' menuHeader='Icon Menu' nubbinTop>
            <MenuItem>Menu Item #1</MenuItem>
            <MenuItem>Menu Item #2</MenuItem>
            <MenuItem>Menu Item #3</MenuItem>
          </DropdownButton>
          <DropdownButton type='icon-more' icon='palette' menuHeader='Icon Menu' nubbinTop>
            <MenuItem>Menu Item #1</MenuItem>
            <MenuItem>Menu Item #2</MenuItem>
            <MenuItem>Menu Item #3</MenuItem>
          </DropdownButton>
          <DropdownButton type='icon-border-filled' menuAlign='right' menuSize='small' menuHeader='Right-Aligned Icon Menu' nubbinTop>
            <MenuItem>Menu Item #1</MenuItem>
            <MenuItem>Menu Item #2</MenuItem>
            <MenuItem>Menu Item #3</MenuItem>
          </DropdownButton>
        </div>
        <h2 className='slds-m-vertical--medium'>Dropdown Buttons in Button Group</h2>
        <div style={ styles }>
          <ButtonGroup>
            <DropdownButton type='neutral' label='Menu #1'>
              <MenuItem>A Menu Item</MenuItem>
              <MenuItem>A Long Text Menu Item</MenuItem>
              <MenuItem>A Very Long Text Menu Item</MenuItem>
            </DropdownButton>
            <DropdownButton type='neutral' label='Menu #2'>
              <MenuItem>A Menu Item</MenuItem>
              <MenuItem>A Long Text Menu Item</MenuItem>
              <MenuItem>A Very Long Text Menu Item</MenuItem>
            </DropdownButton>
            <DropdownButton type='icon-border' menuSize='large'>
              <MenuItem>A Menu Item</MenuItem>
              <MenuItem>A Long Text Menu Item</MenuItem>
              <MenuItem>A Very Long Text Menu Item</MenuItem>
            </DropdownButton>
          </ButtonGroup>
        </div>
        <div className='spacer' style={{ height: '200px' }}></div>
      </div>
    );
  }
}
