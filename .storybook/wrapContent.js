import React from 'react';
import classnames from 'classnames';

export default function wrapContent(className) {
  return story => (
    <div className={ classnames('content-wrapper', className) }>{ story() }</div>
  );
}
