import React, { Component, HTMLAttributes, CSSProperties } from 'react';
import classnames from 'classnames';
import { Button } from './Button';

export type ModalHeaderProps = {
  className?: string;
  title?: string;
  tagline?: string;
  closeButton?: boolean;
  onClose?: () => void;
};

export class ModalHeader extends Component<ModalHeaderProps> {
  constructor(props: Readonly<ModalHeaderProps>) {
    super(props);

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
      <div className={hdClassNames} {...props}>
        <h2 className='slds-text-heading_medium'>{title}</h2>
        {tagline ? <p className='slds-m-top_x-small'>{tagline}</p> : null}
        {closeButton ? (
          <Button
            type='icon-inverse'
            className='slds-modal__close'
            icon='close'
            iconSize='large'
            alt='Close'
            inverse
            onClick={this.onClose}
          />
        ) : null}
      </div>
    );
  }
}

export type ModalContentProps = {
  className?: string;
};

export const ModalContent: React.FC<ModalContentProps> = ({
  className,
  children,
  ...props
}) => {
  const ctClassNames = classnames(className, 'slds-modal__content');
  return (
    <div className={ctClassNames} {...props}>
      {children}
    </div>
  );
};

export type ModalFooterProps = {
  className?: string;
  directional?: boolean;
};

export const ModalFooter: React.FC<ModalFooterProps> = ({
  className,
  directional,
  children,
  ...props
}) => {
  const ftClassNames = classnames(className, 'slds-modal__footer', {
    'slds-modal__footer_directional': directional,
  });
  return (
    <div className={ftClassNames} {...props}>
      {children}
    </div>
  );
};

export type ModalSize = 'large';

export type ModalProps = {
  size?: ModalSize;
  opened?: boolean;
  containerStyle?: CSSProperties;
  onHide?: () => void;
} & HTMLAttributes<HTMLDivElement>;

export class Modal extends Component<ModalProps> {
  static Header = ModalHeader;

  static Content = ModalContent;

  static Footer = ModalFooter;

  constructor(props: Readonly<ModalProps>) {
    super(props);

    this.renderChildComponent = this.renderChildComponent.bind(this);
  }

  hide() {
    if (this.props.onHide) {
      this.props.onHide();
    }
  }

  renderChildComponent(comp: any) {
    if (comp.type === ModalHeader) {
      return React.cloneElement(comp, { onClose: this.hide.bind(this) } as any);
    }
    return comp;
  }

  render() {
    const { className, opened, children, size, containerStyle, ...props } =
      this.props;
    delete props.onHide;
    const modalClassNames = classnames(className, 'slds-modal', {
      'slds-fade-in-open': opened,
      'slds-modal_large': size === 'large',
    });
    const backdropClassNames = classnames(className, 'slds-backdrop', {
      'slds-backdrop_open': opened,
    });
    return (
      <div>
        <div
          className={modalClassNames}
          aria-hidden={!opened}
          role='dialog'
          {...props}
        >
          <div className='slds-modal__container' style={containerStyle}>
            {React.Children.map(children, this.renderChildComponent)}
          </div>
        </div>
        <div className={backdropClassNames} />
      </div>
    );
  }
}
