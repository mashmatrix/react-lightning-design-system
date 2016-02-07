import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Button from './Button';
import Icon from './Icon';


const NOTIFICATION_TYPES = ['alert', 'toast'];

const NOTIFICATION_LEVELS = [
  'info',
  'success',
  'warning',
  'error',
];


export default class Notification extends Component {
  render() {
    const {
      className, type, level, alt,
      alertTexture = true,
      icon, iconSize = 'small',
      onClose, children, ...props,
    } = this.props;
    const typeClassName = type && NOTIFICATION_TYPES.indexOf(type) >= 0 ? `slds-notify--${type}` : null;
    const levelClassName = type && NOTIFICATION_LEVELS.indexOf(level) >= 0 ? `slds-theme--${level}` : null;
    const alertClassNames = classnames(
      className,
      'slds-notify',
      typeClassName,
      levelClassName,
      alertTexture ? 'slds-theme--alert-texture' : null
    );
    return (
      <div className={ alertClassNames } role='alert' { ...props }>
        {
          alt ?
          <span className='slds-assistive-text'>{ alt }</span> :
          undefined
        }
        {
          onClose ?
          <Button className='slds-notify__close' type='icon-inverse'
            icon='close' iconSize='small' alt='Close'
            onClick={ onClose }
          /> :
          undefined
        }
        {
          icon ?
          <Icon className='slds-m-right--x-small'
            icon={ icon } size={ iconSize }
            fillColor='none' textColor={ level === 'warning' ? 'default' : null }
          /> :
          undefined
        }
        { children }
      </div>
    );
  }
}

Notification.propTypes = {
  type: PropTypes.oneOf(NOTIFICATION_TYPES).isRequired,
  className: PropTypes.string,
  level: PropTypes.oneOf(NOTIFICATION_LEVELS),
  alt: PropTypes.string,
  icon: PropTypes.string,
  iconSize: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

const propTypes = { ...Notification.propTypes };
delete propTypes.type;

export class Alert extends Component {
  render() {
    return <Notification { ...this.props } type='alert' />;
  }
}

Alert.propTypes = propTypes;


export class Toast extends Component {
  render() {
    return <Notification { ...this.props } type='toast' />;
  }
}

Toast.propTypes = propTypes;
