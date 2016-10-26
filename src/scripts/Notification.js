import React, { PropTypes } from 'react';
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


const Notification = (props) => {
  const {
    className, type, level, alt,
    alertTexture = true,
    icon, iconSize = 'small',
    onClose, children, ...pprops
  } = props;
  const typeClassName = type && NOTIFICATION_TYPES.indexOf(type) >= 0 ?
    `slds-notify--${type}` : null;
  const levelClassName = type && NOTIFICATION_LEVELS.indexOf(level) >= 0 ?
    `slds-theme--${level}` : null;
  const alertClassNames = classnames(
    className,
    'slds-notify',
    typeClassName,
    levelClassName,
    alertTexture ? 'slds-theme--alert-texture' : null
  );
  return (
    <div className={ alertClassNames } role='alert' { ...pprops }>
      {
        alt ?
          <span className='slds-assistive-text'>{ alt }</span> :
          undefined
      }
      {
        onClose ?
          <Button
            className='slds-notify__close'
            type='icon-inverse'
            icon='close'
            iconSize='small' alt='Close'
            onClick={ onClose }
          /> :
          undefined
      }
      {
        icon ?
          <Icon
            className='slds-m-right--x-small'
            icon={ icon }
            size={ iconSize }
            fillColor='none'
            textColor={ level === 'warning' ? 'default' : null }
          /> :
          undefined
      }
      { children }
    </div>
  );
};

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

export default Notification;

const propTypes = { ...Notification.propTypes };
delete propTypes.type;

export const Alert = props => <Notification { ...props } type='alert' />;

Alert.propTypes = propTypes;


export const Toast = props => <Notification { ...props } type='toast' />;

Toast.propTypes = propTypes;
