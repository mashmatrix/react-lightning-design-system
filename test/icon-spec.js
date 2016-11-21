import assert from 'power-assert';
import React from 'react';
import { shallow } from 'enzyme';

import Icon from '../src/scripts/Icon';

describe('Icon', () => {
  it('should render icon', () => {
    const icon = 'check';
    const wrapper = shallow(<Icon icon={ icon } />);
    assert(wrapper.hasClass('slds-icon'));
    assert(wrapper.html().indexOf(`/assets/icons/utility-sprite/svg/symbols.svg#${icon}`) > 0);
  });

  it('should render icon with size', () => {
    const size = 'small';
    const wrapper = shallow(<Icon icon='icon' size={ size } />);
    assert(wrapper.hasClass(`slds-icon--${size}`));
  });

  it('should render icon with category', () => {
    const category = 'standard';
    const icon = 'account';
    const wrapper = shallow(<Icon category={ category } icon={ icon } />);
    assert(wrapper.html().indexOf(`/assets/icons/${category}-sprite/svg/symbols.svg#${icon}`) > 0);
  });

  it('should render icon with category:icon notation', () => {
    const category = 'action';
    const icon = 'add_contact';
    const categoryIcon = `${category}:${icon}`;
    const wrapper = shallow(<Icon icon={ categoryIcon } />);
    assert(wrapper.html().indexOf(`/assets/icons/${category}-sprite/svg/symbols.svg#${icon}`) > 0);
  });
});
