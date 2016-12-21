import React, { PropTypes } from 'react';

import classnames from 'classnames';
import Button from './Button';
import Icon from './Icon';
import Text from './Text';
import MediaObject from './MediaObject';

const Card = ({ size, className, children }) => {
  const cardClassNames = classnames(className, 'slds-card', {
    'slds-card--narrow': size === 'narrow',
  });
  const relativeContainerStyle = {
    position: 'relative',
  };
  return (
    <article className={ cardClassNames } style={ relativeContainerStyle }>
      { children }
    </article>
  );
};

export const CardHeader = ({ cardIconCategory, cardIcon, closeButton, children }) => {
  const icon = <Icon category={ cardIconCategory } icon={ cardIcon } textColor={ null } />;

  const closeButtonPosition = {
    position: 'absolute',
    top: '5px',
    right: '5px',
  };
  return (
    <div className='slds-card__header slds-grid'>
      <MediaObject className='slds-media--center slds-has-flexi-truncate' figureLeft={ icon }>
        <Text tag='span' category='heading' type='small'>{ children }</Text>
      </MediaObject>
      {
        closeButton ?
          <div className='slds-no-flex' style={ closeButtonPosition }>
            <Button type='icon-bare' icon='close' iconSize='medium' />
          </div> :
          null
      }
    </div>
  );
};

CardHeader.propTypes = {
  cardIconCategory: PropTypes.string,
  cardIcon: PropTypes.string,
  closeButton: PropTypes.bool,
  children: PropTypes.node,
};

export const CardBody = ({ textAlign, children }) => {
  const styles = { textAlign };
  return (
    <div style={ styles } className='slds-card__body'>
      { children }
    </div>
  );
};

CardBody.propTypes = {
  children: PropTypes.node,
  textAlign: PropTypes.string,
};

export const CardFooter = ({ children }) => (
  <div className='slds-card__footer'>
    { children }
  </div>
);

CardFooter.propTypes = {
  children: PropTypes.node,
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

const CARD_SIZES = ['narrow'];

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.oneOf(CARD_SIZES),
};

export default Card;
