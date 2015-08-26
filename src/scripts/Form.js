import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default class Form extends React.Component {
  render() {
    const { className, type, children, ...props } = this.props;
    const formClassNames = classnames(className, `slds-form--${type}`);
    return (
      <form className={ formClassNames } { ...props }>
        { children }
      </form>
    );
  }
}

const FORM_TYPES = [ 'stacked', 'horizontal', 'inline' ];

Form.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(FORM_TYPES),
};

Form.defaultProps = {
  type: 'stacked'
};
