import React, { FC, HTMLAttributes } from 'react';
import classnames from 'classnames';

/**
 *
 */
export type SpinnerSize = 'x-small' | 'small' | 'medium' | 'large';
export type SpinnerType = 'brand' | 'inverse';
export type SpinnerProps = {
  container?: boolean;
  size?: SpinnerSize;
  type?: SpinnerType;
} & HTMLAttributes<HTMLDivElement>;

/**
 *
 */
export const Spinner: FC<SpinnerProps> = (props) => {
  const {
    className,
    container = true,
    size = 'small',
    type,
    ...rprops
  } = props;
  const spinnerClassNames = classnames(
    className,
    'slds-spinner',
    `slds-spinner_${size}`,
    type ? `slds-spinner_${type}` : null
  );
  const spinner = (
    <div className={spinnerClassNames} role='status' {...rprops}>
      <span className='slds-assistive-text'>Loading</span>
      <div className='slds-spinner__dot-a' />
      <div className='slds-spinner__dot-b' />
    </div>
  );
  return container ? (
    <div className='slds-spinner_container'>{spinner}</div>
  ) : (
    spinner
  );
};
