import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';

export type SpinnerSize = 'small' | 'medium' | 'large';
export type SpinnerType = 'brand' | 'inverse';
export type SpinnerProps = {
  container?: boolean;
  size?: SpinnerSize;
  type?: SpinnerType;
} & HTMLAttributes<HTMLDivElement>;

export class Spinner extends React.Component<SpinnerProps, {}> {
  renderSpinner(props: any) {
    const { className, size, type, ...pprops } = props;
    const spinnerClassNames = classnames(
      className,
      'slds-spinner',
      `slds-spinner_${size}`,
      type ? `slds-spinner_${type}` : null
    );

    return (
      <div
        className={spinnerClassNames}
        aria-hidden='false'
        role='alert'
        {...pprops}
      >
        <div className='slds-spinner__dot-a' />
        <div className='slds-spinner__dot-b' />
      </div>
    );
  }

  render() {
    const {
      container = true,
      size = 'small',
      ...props
    }: SpinnerProps = this.props;

    return container ? (
      <div className='slds-spinner_container'>
        {this.renderSpinner({ size, ...props })}
      </div>
    ) : (
      this.renderSpinner({ size, ...props })
    );
  }
}
