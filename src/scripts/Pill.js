import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from './Icon';
import Button from './Button';

class Pill extends Component {
  onPillClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  onPillRemove(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.onRemove) {
      this.props.onRemove(e);
    }
  }

  onKeyDown(e) {
    if (e.keyCode === 8 || e.keyCode === 46) { // Bacspace / DEL
      e.preventDefault();
      e.stopPropagation();
      this.onPillRemove({});
    }
  }

  render() {
    const { icon, disabled, label, tag, pillRef, truncate, className } = this.props;
    const Tag = disabled ? 'span' : (tag || 'a');
    const pillClassNames = classnames(
      'slds-pill',
      { 'slds-truncate': truncate },
      className
    );
    return (
      <Tag
        ref={ (node) => {
          if (pillRef) pillRef(node);
        }}
        className={pillClassNames}
        onKeyDown={ this.onKeyDown.bind(this) }
        onClick={ this.onPillClick.bind(this) }
      >
        { icon ?
          <Icon
            className='slds-pill__icon'
            category={ icon.category }
            icon={ icon.icon }
          /> :
          undefined
        }
        <span className='slds-pill__label'>
          { label }
        </span>
        <Button
          disabled={ disabled }
          className='slds-pill__remove'
          type='icon-bare'
          icon='close'
          alt='Remove'
          tabIndex={ -1 }
          onClick={ this.onPillRemove.bind(this) }
        />
      </Tag>
    );
  }
}

Pill.propTypes = {
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
  truncate: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
  tag: PropTypes.string,
  pillRef: PropTypes.func,
  icon: PropTypes.shape({
    category: PropTypes.string,
    icon: PropTypes.string,
  }),
  disabled: PropTypes.bool,
};

export default Pill;
