import React, { Component } from 'react';
import classnames from 'classnames';
import Button from './Button';
import PropTypes from 'prop-types';

export class ModalHeader extends Component {
  onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    const { className, title, tagline, closeButton, ...props } = this.props;
    const hdClassNames = classnames(className, 'slds-modal__header');
    const pprops = props;
    delete pprops.onClose;
    delete pprops.iconSize;
    delete pprops.inverse;
    return (
      <div className={ hdClassNames } { ...pprops }>
        <h2 className='slds-text-heading--medium'>{ title }</h2>
        {
          tagline ?
            <p className='slds-m-top--x-small'>{ tagline }</p> :
            null
        }
        {
          closeButton ?
            <Button
              className='slds-button--icon-inverse slds-modal__close'
              icon='close'
              iconSize='large'
              size='large'
              alt='Close'
              inverse
              onClick={ this.onClose.bind(this) }
            /> :
            null
        }
      </div>
    );
  }

}

ModalHeader.propTypes = {
  className: PropTypes.string,
  closeButton: PropTypes.bool,
  isError: PropTypes.bool,
  onClose: PropTypes.func,
  tagline: PropTypes.any,
  title: PropTypes.node,
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

class Modal extends Component {
  hide() {
    if (this.props.onHide) {
      this.props.onHide();
    }
  }

  renderChildComponent(comp) {
    if (comp.type === ModalHeader) {
      let className = comp.props.className;
      if (this.props.isError) {
        className = classnames(className, 'slds-theme--error', 'slds-theme--alert-texture');
      }
      return React.cloneElement(comp, { onClose: this.hide.bind(this), className });
    }
    if (comp.type === ModalContent) {
      let className = comp.props.className;
      if (this.props.isError) {
        className = classnames(className, 'slds-p-around--medium');
      }
      return React.cloneElement(comp, { className });
    }
    return comp;
  }

  render() {
    const { className, opened, children, size, isError, ...props } = this.props;
    const pprops = { ...props };
    delete pprops.onHide;
    const modalClassNames = classnames(className, 'slds-modal', {
      'slds-fade-in-open': opened,
      'slds-modal--large': size === 'large',
      'slds-modal--prompt': isError,
    });
    const backdropClassNames = classnames(className, 'slds-modal-backdrop', {
      'slds-modal-backdrop--open': opened,
    });
    return (
      <div>
        <div
          className={ modalClassNames }
          aria-hidden={ !opened }
          role='dialog'
          { ...pprops }
        >
          <div className='slds-modal__container'>
            { React.Children.map(children, this.renderChildComponent.bind(this)) }
          </div>
        </div>
        <div className={ backdropClassNames }></div>
      </div>
    );
  }
}

const MODAL_SIZES = ['large'];

Modal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isError: PropTypes.bool,
  onHide: PropTypes.func,
  opened: PropTypes.bool,
  size: PropTypes.oneOf(MODAL_SIZES),
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
