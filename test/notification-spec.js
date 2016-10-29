import React from 'react';
import { shallow, mount } from 'enzyme';
import assert from 'power-assert';

import Notification, { Alert, Toast } from '../src/scripts/Notification';

describe('Notification', () => {
  it('should render notification with className', () => {
    const wrapper = shallow(<Notification type='alert' />);
    assert(wrapper.hasClass('slds-notify--alert'));
  });

  it('should render notification with inner content', () => {
    const wrapper = shallow(<Notification type='alert'>This is alert</Notification>);
    assert(wrapper.text() === 'This is alert');
  });

  it('should render notification with level', () => {
    const wrapper = shallow(<Notification type='alert' level='success' />);
    assert(wrapper.hasClass('slds-theme--success'));
  });

  it('should render notification with icon', () => {
    const wrapper = shallow(<Notification type='alert' icon='warning' />);
    assert(wrapper.html().indexOf('slds-icon') > 1);
  });

  it('should render notification with onClose callback', () => {
    let called = 0;
    const onClose = () => (called += 1);
    const wrapper = shallow(<Notification type='alert' onClose={ onClose } />);
    assert(wrapper.find('.slds-notify__close').length === 1);
    wrapper.find('.slds-notify__close').simulate('click');
    assert(called === 1);
  });

  it('should render alert', () => {
    const wrapper = mount(<Alert />);
    assert(wrapper.find('.slds-notify--alert').length === 1);
  });

  it('should render toast', () => {
    const wrapper = mount(<Toast />);
    assert(wrapper.find('.slds-notify--toast').length === 1);
  });
});
