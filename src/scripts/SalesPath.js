import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Icon from './Icon';

class SalesPath extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onItemClick(itemKey) {
    if (this.props.onSelect) {
      this.props.onSelect(itemKey);
    }
    // Uncontrolled
    this.setState({ activeKey: itemKey });
  }

  renderSalesPath(activeKey, paths) {
    let typeTracker = -1;

    return React.Children.map(paths, (path) => {
      const { eventKey, type, onSelect, ...props } = path.props;
      const isActive = eventKey === activeKey;

      typeTracker = (isActive) ? 0 :
        (typeTracker >= 0) ? 1 : -1;

      const evaluatedType = type || (
        (isActive) ? 'current' :
        ((typeTracker === -1) ? 'complete' : 'incomplete')
      );

      return (<PathItem eventKey={ eventKey } type={ evaluatedType } onSelect={ this.onItemClick.bind(this) } { ...props } />);
    });
  }

  render() {
    const { className, children, ...props } = this.props;
    const activeKey = this.props.activeKey || this.state.activeKey || this.props.defaultActiveKey;

    const salesPathClassNames = classnames(className, 'slds-tabs--path');
    return (
      <div className={ salesPathClassNames } role='application tablist'>
        <ul className='slds-tabs--path__nav' role='presentation'>
          { this.renderSalesPath(activeKey, children) }
        </ul>
      </div>
    );
  }
}

SalesPath.propTypes = {
  className: PropTypes.string,
  defaultActiveKey: PropTypes.any,
  activeKey: PropTypes.any,
  onSelect: PropTypes.func,
  children: PropTypes.node,
};


class PathItem extends React.Component {

  onItemClick(itemKey) {
    if (this.props.onSelect) {
      this.props.onSelect(itemKey);
    }
  }

  render() {
    const { className, eventKey, title, completedTitle, type } = this.props;

    const pathItemClassName = classnames(
      'slds-tabs--path__item',
      `slds-is-${type}`,
      className
    );

    const tabIndex = (type === 'current') ? 0 : -1;
    const completedText = completedTitle || 'Stage Complete';

    return (
      <li className={ pathItemClassName } role='presentation'>
        <a className='slds-tabs--path__link' aria-selected='false' tabIndex={ tabIndex } role='tab' aria-live='assertive' onClick={ this.onItemClick.bind(this, eventKey) }>
          <span className='slds-tabs--path__stage'>
            <Icon category='utility' icon='check' size='x-small' />
            { (type === 'complete') ? (<span className='slds-assistive-text'>{ completedText }</span>) : null }
          </span>
          <span className='slds-tabs--path__title'>{ title }</span>
        </a>
      </li>
    );
  }
}

PathItem.propTypes = {
  className: PropTypes.string,
  eventKey: PropTypes.any,
  type: PropTypes.oneOf(['complete', 'current', 'incomplete']),
  title: PropTypes.string,
  completedTitle: PropTypes.string,
  onSelect: PropTypes.func,
};

SalesPath.PathItem = PathItem;

export default SalesPath;
