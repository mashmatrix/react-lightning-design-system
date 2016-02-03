import React, { PropTypes } from 'react';
import classnames from 'classnames';
import DropdownButton from './DropdownButton';

export default class ButtonGroup extends React.Component {
  renderButton(button, index) {
    const cnt = React.Children.count(this.props.children);
    if (button.type === DropdownButton) {
      return React.cloneElement(button, { key: index, grouped: true, isFirstInGroup: index === 0, isLastInGroup: index === cnt - 1 });
    }

    return button;
  }

  render() {
    const { className, children, ...props } = this.props;
    const btnGrpClassNames = classnames(className, 'slds-button-group');
    return (
      <div className={ btnGrpClassNames } role='group' { ...props }>
        { React.Children.map(children, this.renderButton.bind(this)) }
      </div>
    );
  }
}

ButtonGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
