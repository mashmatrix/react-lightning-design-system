import React from 'react';
import { shallow } from 'enzyme';

import Form from 'Form';

describe('Form', () => {
  it('should not render null children', () => {
    const wrapper = shallow(
      <Form>
        <span></span>
        {null}
      </Form>
    );
    expect(wrapper.find('span')).to.have.length(1);
    expect(wrapper.children()).to.have.length(1);
  });
});
