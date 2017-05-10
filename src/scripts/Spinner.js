import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { registerStyle } from './util';

export default class Spinner extends React.Component {

  constructor() {
    super();
    registerStyle('spinner-overlay', [
      [
        'body .slds .slds-spinner_container',
        '{ z-index: 9002 }',
      ],
    ]);
  }

  renderSpinner(props) {
    const { className, size, type, ...pprops } = props;
    const spinnerClassNames = classnames(className,
      'slds-spinner',
      `slds-spinner--${size}`,
      type ? `slds-spinner--${type}` : null
    );

    return (
      <div
        className={ spinnerClassNames }
        aria-hidden='false'
        role='alert'
        { ...pprops }
      >
        <div className='slds-spinner__dot-a' />
        <div className='slds-spinner__dot-b' />
      </div>
    );
  }

  render() {
    const { container, ...props } = this.props;

    return container ? (
      <div className='slds-spinner_container'>
        {this.renderSpinner(props)}
      </div>
    ) : this.renderSpinner(props);
  }
}

const SPINNER_SIZES = ['small', 'medium', 'large'];
const SPINNER_TYPES = ['brand', 'inverse'];

Spinner.propTypes = {
  container: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.oneOf(SPINNER_TYPES),
  size: PropTypes.oneOf(SPINNER_SIZES),
};

Spinner.defaultProps = {
  container: true,
  size: 'small',
};
