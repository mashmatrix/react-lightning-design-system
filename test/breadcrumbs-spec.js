import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


import Breadcrumbs from 'Breadcrumbs';

describe('Breadcrumbs', () => {
  it('should render breadcrumbs with items', () => {
    const items = [{
      label: 'test0',
      href: 'test0',
    }, {
      label: 'test1',
      href: 'test1',
    }];

    const wrapper = shallow(<Breadcrumbs items={items} />);

    items.forEach((item) => {
      expect(wrapper.contains(<a href={ item.href }>{ item.label }</a>)).to.be.true;
    });
  });
});
