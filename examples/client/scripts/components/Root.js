import React from 'react';

import ButtonExamples from './ButtonExamples';
import ButtonGroupExamples from './ButtonGroupExamples';

export default class Root extends React.Component {
  render() {
    const headingStyles = {
      marginTop: '48px',
      fontSize: '24px',
    };
    return (
      <div style={ { padding: '8px' } }>
        <h1 style={ headingStyles }>Button</h1>
        <ButtonExamples />
        <h1 style={ headingStyles }>Button Group</h1>
        <ButtonGroupExamples />
      </div>
    );
  }
}
