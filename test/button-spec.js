import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Button from 'Button';

describe('Button', () => {
  it('should render button with className', () => {
    const button = TestUtils.renderIntoDocument(<Button>Label</Button>);
    expect(ReactDOM.findDOMNode(button).className).to.be.equal('slds-button slds-button-space-left');
  });
});
