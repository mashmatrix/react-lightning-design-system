import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default class ButtonGroup extends React.Component {
  render() {
    console.log('ButtonGroup#render()');
    const { className, children, ...props } = this.props;
    const btnGrpClassNames = classnames(className, 'slds-button-group');
    return (
      <div className={ btnGrpClassNames } role='group' { ...props }>
        { children }
      </div>
    );
  }
}

ButtonGroup.propTypes = {
  className: PropTypes.string
};
