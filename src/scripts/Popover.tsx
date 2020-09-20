import React, { HTMLAttributes, CSSProperties, ComponentType } from 'react';
import classnames from 'classnames';
import { autoAlign, InjectedProps, RectangleAlignment } from './AutoAlign';

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
  bodyStyle?: CSSProperties;
} & HTMLAttributes<HTMLDivElement>;

class PopoverInner extends React.Component<PopoverProps & InjectedProps> {
  node: HTMLDivElement | null = null;

  render() {
    const {
      children,
      alignment,
      hidden,
      theme,
      tooltip,
      style,
      bodyStyle,
      ...props
    } = this.props;
    const nubbinPosition = alignment.join('-');
    const [firstAlign, secondAlign] = alignment;
    const popoverClassNames = classnames(
      'slds-popover',
      {
        'slds-hide': hidden,
        'slds-popover--tooltip': tooltip,
      },
      `slds-nubbin--${nubbinPosition}`,
      `slds-m-${firstAlign}--small`,
      theme ? `slds-theme--${theme}` : undefined
    );
    const rootStyle: typeof style = {
      ...style,
      position: 'absolute',
      [firstAlign]: 0,
      ...(secondAlign ? { [secondAlign]: 0 } : {}),
      ...(tooltip ? { width: 'max-content' } : {}),
      transform:
        secondAlign === undefined
          ? firstAlign === 'top' || firstAlign === 'bottom'
            ? 'translateX(-50%)'
            : firstAlign === 'left' || firstAlign === 'right'
            ? 'translateY(-50%)'
            : undefined
          : undefined,
    };
    return (
      <div
        ref={(node: HTMLDivElement | null) => (this.node = node)}
        className={popoverClassNames}
        role={tooltip ? 'tooltip' : 'dialog'}
        style={rootStyle}
        {...props}
      >
        <PopoverBody style={bodyStyle}>{children}</PopoverBody>
      </div>
    );
  }
}

/**
 *
 */
function map<P1 extends {}, P2 extends {}>(
  Cmp: ComponentType<P2>,
  fn: (p1: P1) => P2
): ComponentType<P1> {
  return (p1: P1) => <Cmp {...fn(p1)} />;
}

/**
 *
 */
export const Popover = map(
  autoAlign({
    triggerSelector: '.slds-dropdown-trigger',
    alignmentStyle: 'popover',
  })(PopoverInner),
  ({ position, ...props }: PopoverProps) => {
    const alignment = position
      ? ((position.split('-') as unknown) as RectangleAlignment)
      : undefined;
    return { alignment, ...props };
  }
);

Popover.displayName = 'Popover';
