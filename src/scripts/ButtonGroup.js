import React, { PropTypes } from 'react';
import classnames from 'classnames';
import DropdownButton from './DropdownButton';

export default class ButtonGroup extends React.Component {
  render() {
    const { className, children, ...props } = this.props;
    const btnGrpClassNames = classnames(className, 'slds-button-group');
    return (
      <div className={ btnGrpClassNames } role='group' { ...props }>
        { React.Children.map(children, this.renderButton.bind(this)) }
      </div>
    );
  }

  renderButton(button, index) {
    const cnt = React.Children.count(this.props.children);
    if (button.type === DropdownButton) {
      return React.cloneElement(button, { grouped: true, isFirstInGroup: index === 0, isLastInGroup: index === cnt - 1 });
    } else {
      return button;
    }
  }
}

ButtonGroup.propTypes = {
  className: PropTypes.string
};
