import React, {
  HTMLAttributes,
  CSSProperties,
  FC,
  useRef,
  ReactNode,
} from 'react';
import classnames from 'classnames';
import {
  AutoAlign,
  AutoAlignInjectedProps,
  RectangleAlignment,
} from './AutoAlign';

/**
 *
 */
export const PopoverHeader: FC<{ children?: ReactNode }> = (props) => (
  <div className='slds-popover__header'>{props.children}</div>
);

/**
 *
 */
export type PopoverBodyProps = React.HTMLAttributes<HTMLDivElement>;

export const PopoverBody: FC<PopoverBodyProps> = (props) => (
  <div className='slds-popover__body' {...props}>
    {props.children}
  </div>
);

/**
 *
 */
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

/**
 *
 */
export const PopoverInner: FC<PopoverProps & AutoAlignInjectedProps> = (
  props
) => {
  const {
    children,
    alignment,
    hidden,
    theme,
    tooltip,
    style,
    bodyStyle,
    ...rprops
  } = props;
  const elRef = useRef<HTMLDivElement | null>(null);
  const nubbinPosition = alignment.join('-');
  const [firstAlign, secondAlign] = alignment;
  const popoverClassNames = classnames(
    'slds-popover',
    {
      'slds-hide': hidden,
      'slds-popover_tooltip': tooltip,
    },
    `slds-nubbin_${nubbinPosition}`,
    `slds-m-${firstAlign}_small`,
    theme ? `slds-theme_${theme}` : undefined
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
      ref={elRef}
      className={popoverClassNames}
      role={tooltip ? 'tooltip' : 'dialog'}
      style={rootStyle}
      {...rprops}
    >
      <PopoverBody style={bodyStyle}>{children}</PopoverBody>
    </div>
  );
};

/**
 *
 */
export const Popover: FC<PopoverProps> = ({ position, ...props }) => {
  const alignment: RectangleAlignment | undefined = position?.split('-') as
    | RectangleAlignment
    | undefined;
  return (
    <AutoAlign
      triggerSelector='.slds-dropdown-trigger'
      alignmentStyle='popover'
      alignment={alignment}
    >
      {(injectedProps) => <PopoverInner {...props} {...injectedProps} />}
    </AutoAlign>
  );
};
