import React from 'react';
import { shallow } from 'enzyme';

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
