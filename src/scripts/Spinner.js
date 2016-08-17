import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { registerStyle } from './util';

export default class Spinner extends React.Component {

  constructor(props) {
    super(props);
    registerStyle('spinner-overlay', [
      [
        'body .slds .slds-spinner_container',
        '{ z-index: 9002 }',
      ],
    ]);
  }

  render() {
    const { className, size, type, ...props } = this.props;
    const spinnerClassNames = classnames(className,
      'slds-spinner',
      `slds-spinner--${size}`,
      type ? `slds-spinner--${type}` : null
    );

    return (
      <div className='slds-spinner_container'>
        <div
          className={ spinnerClassNames }
          aria-hidden='false'
          role='alert'
          { ...props }
        >
          <div className='slds-spinner__dot-a' />
          <div className='slds-spinner__dot-b' />
        </div>
      </div>
    );
  }
}

const SPINNER_SIZES = ['small', 'medium', 'large'];
const SPINNER_TYPES = ['brand', 'inverse'];

Spinner.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(SPINNER_TYPES),
  size: PropTypes.oneOf(SPINNER_SIZES),
};

Spinner.defaultProps = {
  size: 'small',
};
