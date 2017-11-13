import React from 'react';
import classnames from 'classnames';
import Button from './Button';
import Icon from './Icon';
import PropTypes from './propTypesImport';


const NOTIFICATION_TYPES = ['alert', 'toast'];

const NOTIFICATION_LEVELS = [
  'info',
  'success',
  'warning',
  'error',
  'offline',
];

const getIcon = (icon, iconSize, level, type) => (
  icon ? (
    <Icon
      className='slds-m-right--small slds-col slds-no-flex'
      icon={ icon }
      size={ iconSize }
      fillColor='none'
      textColor={ level === 'warning' ? 'default' : null }
      style={type === 'alert' ? { 'margin-top': '-4px' } : null}
    />) :
    null
);

const Notification = (props) => {
  const {
    className,
    type,
    level,
    alt,
    alertTexture = true,
    icon,
    iconSize = 'small',
    description,
    onClose,
    children,
    ...pprops,
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
          null
      }
      {
        onClose ?
          <Button
            className='slds-notify__close'
            type='icon-inverse'
            icon='close'
            iconSize='large' alt='Close'
            onClick={ onClose }
          /> :
          null
    }
    { type === 'toast' ? (
      <div className='slds-notify__content slds-grid'>
        { getIcon(icon, iconSize, level, type) }
        <div className='slds-col slds-align-middle'>
          <h2 className='slds-text-heading--small'>
            { children }
          </h2>
          { description ? <p>{description}</p> : null }
        </div>
      </div>) : (
      <h2>
        { getIcon(icon, iconSize, level, type) }
        { children }
      </h2>)
    }
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
  description: PropTypes.string,
};

export default Notification;

const propTypes = { ...Notification.propTypes };
delete propTypes.type;

export const Alert = (props) => <Notification { ...props } type='alert' />;

Alert.propTypes = propTypes;


export const Toast = (props) => <Notification { ...props } type='toast' />;

Toast.propTypes = propTypes;
