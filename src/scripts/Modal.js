import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from './Button';

export class ModalHeader extends Component {
  constructor() {
    super();

    this.onClose = this.onClose.bind(this);
  }
  onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    const { className, title, tagline, closeButton, ...props } = this.props;
    delete props.onClose;
    const hdClassNames = classnames(className, 'slds-modal__header');
    return (
      <div className={ hdClassNames } { ...props }>
        <h2 className='slds-text-heading--medium'>{ title }</h2>
        {
          tagline ?
            <p className='slds-m-top--x-small'>{ tagline }</p> :
            null
        }
        {
          closeButton ?
            <Button
              className='slds-modal__close'
              icon='close'
              iconSize='large'
              alt='Close'
              inverse
              onClick={ this.onClose }
            /> :
            null
        }
      </div>
    );
  }

}

ModalHeader.propTypes = {
  title: PropTypes.string,
  tagline: PropTypes.string,
  onClose: PropTypes.func,
  className: PropTypes.string,
  closeButton: PropTypes.bool,
};

class Modal extends Component {
  constructor() {
    super();

    this.renderChildComponent = this.renderChildComponent.bind(this);
  }
  hide() {
    if (this.props.onHide) {
      this.props.onHide();
    }
  }

  renderChildComponent(comp) {
    if (comp.type === ModalHeader) {
      return React.cloneElement(comp, { onClose: this.hide.bind(this) });
    }
    return comp;
  }

  render() {
    const { className, opened, children, size, containerStyle, ...props } = this.props;
    delete props.onHide;
    const modalClassNames = classnames(className, 'slds-modal', {
      'slds-fade-in-open': opened,
      'slds-modal--large': size === 'large',
    });
    const backdropClassNames = classnames(className, 'slds-modal-backdrop', {
      'slds-modal-backdrop--open': opened,
    });
    return (
      <div>
        <div className={ modalClassNames } aria-hidden={ !opened } role='dialog' { ...props }>
          <div className='slds-modal__container' style={ containerStyle }>
            { React.Children.map(children, this.renderChildComponent) }
          </div>
        </div>
        <div className={ backdropClassNames } />
      </div>
    );
  }
}

const MODAL_SIZES = ['large'];

Modal.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(MODAL_SIZES),
  opened: PropTypes.bool,
  onHide: PropTypes.func,
  children: PropTypes.node,
  /* eslint-disable react/forbid-prop-types */
  containerStyle: PropTypes.object,
};


export const ModalContent = ({ className, children, ...props }) => {
  const ctClassNames = classnames(className, 'slds-modal__content');
  return (
    <div className={ ctClassNames } { ...props }>{ children }</div>
  );
};

ModalContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};


export const ModalFooter = ({ className, directional, children, ...props }) => {
  const ftClassNames = classnames(
    className,
    'slds-modal__footer',
    { 'slds-modal__footer--directional': directional }
  );
  return (
    <div className={ ftClassNames } { ...props }>{ children }</div>
  );
};

ModalFooter.propTypes = {
  className: PropTypes.string,
  directional: PropTypes.bool,
  children: PropTypes.node,
};


Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;
