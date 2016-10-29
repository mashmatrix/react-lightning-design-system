import React from 'react';
import { shallow } from 'enzyme';

import BreadCrumbs, { Crumb } from '../src/scripts/BreadCrumbs';

describe('Crumb', () => {
  it('should have classNames', () => {
    const wrapper = shallow(<Crumb />);
    expect(wrapper.prop('className')).toEqual('slds-list__item slds-text-heading--label');
  });
  it('should render link', () => {
    const href = '#';
    const label = 'label';
    const wrapper = shallow(<Crumb href={ href }>{ label }</Crumb>);

    expect(wrapper.contains(<a href={ href }>{ label }</a>)).toBe(true);
  });
});

describe('BreadCrumbs', () => {
  it('should render breadcrumbs with items', () => {
    const items = [{
      label: 'test0',
      href: 'test0',
    }, {
      label: 'test1',
      href: 'test1',
    }];

    const wrapper = shallow(
      <BreadCrumbs>
        {items.map((item, index) =>
          <Crumb key={index} href={ item.href }>{ item.label }</Crumb>
        )}
      </BreadCrumbs>
    );

    expect(wrapper.find(Crumb).length).toEqual(2);
  });

  it('should render breadcrumbs with label', () => {
    const label = 'Label';
    const wrapper = shallow(
      <BreadCrumbs label={ label }>
        <Crumb href='#'>Test</Crumb>
      </BreadCrumbs>
    );

    expect(wrapper.contains(
      <p id='bread-crumb-label' className='slds-assistive-text'>{ label }</p>
    )).toBe(true);
  });
});
