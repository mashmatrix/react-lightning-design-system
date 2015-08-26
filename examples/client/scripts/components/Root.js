import React from 'react';

import ButtonExamples from './ButtonExamples';

export default class Root extends React.Component {
  render() {
    return (
      <div style={ { padding: '4px' } }>
        <h1>Button</h1>
        <ButtonExamples />
      </div>
    );
  }
}
