import React from 'react';
import classnames from 'classnames';
import { registerStyle } from './util';

export type SpinnerSize = 'small' | 'medium' | 'large';
export type SpinnerType = 'brand' | 'inverse';
export type SpinnerProps = {
  container?: boolean;
  className?: string;
  size?: SpinnerSize;
  type?: SpinnerType;
};

export default class Spinner extends React.Component<SpinnerProps, {}> {
  static defaultProps: Pick<SpinnerProps, 'container' | 'size'> = {
    container: true,
    size: 'small',
  };

  constructor(props: Readonly<SpinnerProps>) {
    super(props);
    registerStyle('spinner-overlay', [
      ['body .slds .slds-spinner_container', '{ z-index: 9002 }'],
    ]);
  }

  renderSpinner(props: any) {
    const { className, size, type, ...pprops } = props;
    const spinnerClassNames = classnames(
      className,
      'slds-spinner',
      `slds-spinner--${size}`,
      type ? `slds-spinner--${type}` : null
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
    const { container, ...props } = this.props;

    return container ? (
      <div className='slds-spinner_container'>{this.renderSpinner(props)}</div>
    ) : (
      this.renderSpinner(props)
    );
  }
}
