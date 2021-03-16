import assert from 'power-assert';
import React from 'react';
import { mount } from 'enzyme';

import { Icon } from '../src/scripts/Icon';

describe('Icon', () => {
  it('should render icon', () => {
    const icon = 'check';
    const wrapper = mount(<Icon icon={icon} />);
    assert(wrapper.exists('.slds-icon'));
    assert(
      wrapper
        .html()
        .indexOf(`/assets/icons/utility-sprite/svg/symbols.svg#${icon}`) > 0
    );
  });

  it('should render icon with size', () => {
    const size = 'small';
    const wrapper = mount(<Icon icon='icon' size={size} />);
    assert(wrapper.exists(`.slds-icon_${size}`));
  });

  it('should render icon with category', () => {
    const category = 'standard';
    const icon = 'account';
    const wrapper = mount(<Icon category={category} icon={icon} />);
    assert(
      wrapper
        .html()
        .indexOf(`/assets/icons/${category}-sprite/svg/symbols.svg#${icon}`) > 0
    );
  });

  it('should render icon with category:icon notation', () => {
    const category = 'action';
    const icon = 'add_contact';
    const categoryIcon = `${category}:${icon}`;
    const wrapper = mount(<Icon icon={categoryIcon} />);
    assert(
      wrapper
        .html()
        .indexOf(`/assets/icons/${category}-sprite/svg/symbols.svg#${icon}`) > 0
    );
  });
});
