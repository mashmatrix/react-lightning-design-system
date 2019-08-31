import React from 'react';
import classnames from 'classnames';
import { findDOMNode } from 'react-dom';
import { isElInChildren } from './util';

export const PopoverHeader: React.FC = (props) => (
  <div className='slds-popover__header'>{props.children}</div>
);

export type PopoverBodyProps = React.HTMLAttributes<HTMLDivElement>;

export const PopoverBody: React.FC<PopoverBodyProps> = (props) => (
  <div className='slds-popover__body' {...props}>
    {props.children}
  </div>
);

export type PopoverPosition =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'left-top'
  | 'left-bottom'
  | 'right'
  | 'right-top'
  | 'right-bottom';

export type PopoverTheme = 'info' | 'success' | 'warning' | 'error';

export type PopoverProps = {
  position?: PopoverPosition;
  hidden?: boolean;
  theme?: PopoverTheme;
  tooltip?: boolean;
  hover?: boolean;
  bodyStyle?: object;
  trigger?: () => any;
} & React.HTMLAttributes<HTMLDivElement>;

export type PopoverState = {
  hidden?: boolean;
};

export default class Popover extends React.Component<
  PopoverProps,
  PopoverState
> {
  private isMouseEntered: boolean = false;

  constructor(props: Readonly<PopoverProps>) {
    super(props);

    this.state = {
      hidden: props.hidden,
    };

    this.documentClick = this.documentClick.bind(this);

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  componentDidMount() {
    if (this.props.trigger) {
      document.addEventListener('click', this.documentClick);
    }
  }

  componentWillUnmount() {
    if (this.props.trigger) {
      document.removeEventListener('click', this.documentClick);
    }
  }

  onMouseEnter() {
    this.isMouseEntered = true;
  }

  onMouseLeave() {
    if (!this.props.hover) return;
    this.isMouseEntered = false;
    this.toggle(false);
  }

  documentClick(e: any) {
    let triggerEl;
    const { trigger } = this.props;
    if (trigger) {
      const triggerElement = trigger();
      if (triggerElement && triggerElement.isReactComponent) {
        triggerEl = findDOMNode(triggerElement);
      } else {
        triggerEl = triggerElement;
      }
    }
    if (this.state.hidden || (triggerEl && isElInChildren(triggerEl, e.target)))
      return;
    const rootEl = findDOMNode(this);
    if (!isElInChildren(rootEl, e.target)) {
      this.setState({
        hidden: true,
      });
    }
  }

  toggle(value: boolean) {
    this.setState((prevState) => ({
      hidden: typeof value !== 'undefined' ? !value : !prevState.hidden,
    }));
  }

  mouseEntered() {
    return this.isMouseEntered;
  }

  hidden() {
    return this.state.hidden;
  }

  render() {
    const {
      children,
      position,
      /* eslint-disable @typescript-eslint/no-unused-vars */
      hidden = true,
      hover,
      trigger,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      theme,
      tooltip,
      bodyStyle,
      ...props
    } = this.props;
    const popoverClassNames = classnames('slds-popover', {
      'slds-hide': this.state.hidden,
      'slds-popover--tooltip': tooltip,
      [`slds-nubbin--${position}`]: position,
      [`slds-theme--${theme}`]: theme,
    });
    return (
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        className={popoverClassNames}
        role='dialog'
        {...props}
      >
        <PopoverBody style={bodyStyle}>{children}</PopoverBody>
      </div>
    );
  }
}
