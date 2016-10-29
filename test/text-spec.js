import React from 'react';
import { shallow } from 'enzyme';

import Text from '../src/scripts/Text';

describe('Text', () => {
  const category = 'heading';
  const type = 'regular';
  it('should render badge with category and type', () => {
    const wrapper = shallow(<Text category={ category } type={ type } />);
    expect(wrapper.prop('className')).toContain(`slds-text-${category}--${type}`);
  });
  it('should render badge with align', () => {
    const align = 'left';
    const wrapper = shallow(<Text category={ category } type={ type } align={ align } />);
    expect(wrapper.prop('className')).toContain(`slds-text-align--${align}`);
  });
  it('should render truncated', () => {
    const wrapper = shallow(<Text category={ category } type={ type } truncate />);
    expect(wrapper.prop('className')).toContain('slds-truncate');
  });
  it('should render badge with tag', () => {
    const tag = 'span';
    const wrapper = shallow(<Text category={ category } type={ type } tag='span' />);
    expect(wrapper.type()).toEqual(tag);
  });
});
