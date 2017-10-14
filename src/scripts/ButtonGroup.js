import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DropdownButton from './DropdownButton';

export default class ButtonGroup extends Component {
  constructor() {
    super();
    this.renderButton = this.renderButton.bind(this);
  }
  renderButton(button, index) {
    const cnt = React.Children.count(this.props.children);
    if (button.type && (button.type === DropdownButton || button.type.isGroupable)) {
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
    const pprops = Object.assign({}, props);
    delete pprops.component;
    delete pprops.items;
    return (
      <div className={ btnGrpClassNames } role='group' { ...props }>
        { Children.map(children, this.renderButton) }
      </div>
    );
  }
}

ButtonGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
