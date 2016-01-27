import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import Badge from 'Badge';

describe('Badge', () => {
  it('should render badge with className', () => {
    const badge = renderIntoDocument(<Badge>Label</Badge>);
    expect(findDOMNode(badge).className).to.be.equal('slds-badge');
  });

  it('should render badge based on a type', () => {
    const type = 'shade';
    const badge = renderIntoDocument(<Badge type={ type }>Label</Badge>);
    expect(findDOMNode(badge).className).to.be.equal(`slds-badge slds-theme--${type}`);
  });
});
