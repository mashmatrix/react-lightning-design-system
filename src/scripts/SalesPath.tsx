import React from 'react';
import classnames from 'classnames';
import { Icon } from './Icon';

export type PathItemProps = {
  className?: string;
  eventKey?: any;
  type?: 'complete' | 'current' | 'incomplete';
  title?: string;
  completedTitle?: string;
  onSelect?: (itemKey: any) => void;
};

class PathItem extends React.Component<PathItemProps> {
  onItemClick(itemKey: any) {
    if (this.props.onSelect) {
      this.props.onSelect(itemKey);
    }
  }

  render() {
    const { className, eventKey, title, completedTitle, type } = this.props;

    const pathItemClassName = classnames(
      'slds-tabs_path__item',
      `slds-is-${type}`,
      className
    );

    const tabIndex = type === 'current' ? 0 : -1;
    const completedText = completedTitle || 'Stage Complete';

    return (
      <li className={pathItemClassName} role='presentation'>
        <a
          className='slds-tabs_path__link'
          aria-selected='false'
          tabIndex={tabIndex}
          role='tab'
          aria-live='assertive'
          onClick={this.onItemClick.bind(this, eventKey)}
        >
          <span className='slds-tabs_path__stage'>
            <Icon category='utility' icon='check' size='x-small' />
            {type === 'complete' ? (
              <span className='slds-assistive-text'>{completedText}</span>
            ) : null}
          </span>
          <span className='slds-tabs_path__title'>{title}</span>
        </a>
      </li>
    );
  }
}

export type SalesPathProps = {
  className?: string;
  defaultActiveKey?: any;
  activeKey?: any;
  onSelect?: (itemKey: any) => void;
};

export type SalesPathState = {
  activeKey?: any;
};

export class SalesPath extends React.Component<SalesPathProps, SalesPathState> {
  static PathItem = PathItem;

  constructor(props: Readonly<SalesPathProps>) {
    super(props);
    this.state = {};

    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick(itemKey: any) {
    if (this.props.onSelect) {
      this.props.onSelect(itemKey);
    }
    // Uncontrolled
    this.setState({ activeKey: itemKey });
  }

  renderSalesPath(activeKey: any, paths: any) {
    let typeTracker = -1;

    return React.Children.map(paths, (path) => {
      const { eventKey, type, ...props } = path.props;
      const isActive = eventKey === activeKey;

      typeTracker = isActive ? 0 : typeTracker >= 0 ? 1 : -1;

      const evaluatedType =
        type ||
        (isActive ? 'current' : typeTracker === -1 ? 'complete' : 'incomplete');

      return (
        <PathItem
          eventKey={eventKey}
          type={evaluatedType}
          onSelect={this.onItemClick}
          {...props}
        />
      );
    });
  }

  render() {
    const { className, children } = this.props;
    const activeKey =
      this.props.activeKey ||
      this.state.activeKey ||
      this.props.defaultActiveKey;

    const salesPathClassNames = classnames(className, 'slds-tabs_path');
    return (
      <div className={salesPathClassNames} role='application tablist'>
        <ul className='slds-tabs_path__nav' role='presentation'>
          {this.renderSalesPath(activeKey, children)}
        </ul>
      </div>
    );
  }
}
