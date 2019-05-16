import React, { Component, Children } from 'react';
import classnames from 'classnames';
import DropdownButton from './DropdownButton';

export type ButtonGroupProps = {
  className?: string;
};

export default class ButtonGroup extends Component<ButtonGroupProps, {}> {
  constructor(props: Readonly<ButtonGroupProps>) {
    super(props);
    this.renderButton = this.renderButton.bind(this);
  }

  renderButton(button: any, index: number) {
    const cnt = React.Children.count(this.props.children);
    if (
      button.type &&
      (button.type === DropdownButton || button.type.isGroupable)
    ) {
      return React.cloneElement(button, {
        key: index,
        grouped: true,
        isFirstInGroup: index === 0,
        isLastInGroup: index === cnt - 1,
      });
    }

    return button;
  }

  render() {
    const { className, children, ...props } = this.props;
    const btnGrpClassNames = classnames(className, 'slds-button-group');
    return (
      <div className={btnGrpClassNames} role='group' {...props}>
        {Children.map(children, this.renderButton)}
      </div>
    );
  }
}
