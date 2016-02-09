import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Button from './Button';


class Modal extends Component {
  hide() {
    if (this.props.onHide) {
      this.props.onHide();
    }
  }

  renderChildComponent(comp) {
    /* eslint-disable no-use-before-define */
    if (comp.type === ModalHeader) {
      return React.cloneElement(comp, { onClose: this.hide.bind(this) });
    }
    return comp;
  }

  render() {
    const { className, opened, children, size, ...props } = this.props;
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
  className: PropTypes.string,
  size: PropTypes.oneOf(MODAL_SIZES),
  opened: PropTypes.bool,
  onHide: PropTypes.func,
  children: PropTypes.node,
};


export class ModalHeader extends Component {
  onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    const { className, title, closeButton, ...props } = this.props;
    const hdClassNames = classnames(className, 'slds-modal__header');
    return (
      <div className={ hdClassNames } { ...props }>
        <h2 className='slds-text-heading--medium'>{ title }</h2>
        {
          closeButton ?
          <Button
            className='slds-modal__close'
            icon='close'
            iconSize='large'
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
  title: PropTypes.string,
  onClose: PropTypes.func,
  className: PropTypes.string,
  closeButton: PropTypes.bool,
};


export class ModalContent extends Component {
  render() {
    const { className, children, ...props } = this.props;
    const ctClassNames = classnames(className, 'slds-modal__content');
    return (
      <div className={ ctClassNames } { ...props }>{ children }</div>
    );
  }
}

ModalContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};


export class ModalFooter extends Component {
  render() {
    const { className, directional, children, ...props } = this.props;
    const ftClassNames = classnames(
      className,
      'slds-modal__footer',
      { 'slds-modal__footer--directional': directional }
    );
    return (
      <div className={ ftClassNames } { ...props }>{ children }</div>
    );
  }
}

ModalFooter.propTypes = {
  className: PropTypes.string,
  directional: PropTypes.bool,
  children: PropTypes.node,
};


Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;
