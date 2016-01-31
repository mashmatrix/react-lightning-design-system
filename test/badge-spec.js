import React from 'react';
import { shallow } from 'enzyme';

import Badge from 'Badge';

describe('Badge', () => {
  it('should render badge with className', () => {
    const wrapper = shallow(<Badge />);
    expect(wrapper.prop('className')).to.eql('slds-badge');
  });

  it('should render badge with label', () => {
    const label = 'Label';
    const wrapper = shallow(<Badge label={ label } />);
    expect(wrapper.text()).to.equal(label);
  });

  it('should render button with children', () => {
    const children = <span>Test</span>;
    const wrapper = shallow(<Badge>{ children }</Badge>);
    expect(wrapper.contains(children)).to.be.true;
  });

  it('should render badge based on a type', () => {
    const type = 'shade';
    const wrapper = shallow(<Badge type={ type } />);
    expect(wrapper.hasClass(`slds-theme--${type}`)).to.be.true;
  });
});
