import React, { HTMLAttributes, CSSProperties, FC, ReactNode } from 'react';
import classnames from 'classnames';
import { Button } from './Button';
import { Text } from './Text';
import { useEventCallback } from './hooks';

/**
 *
 */
export type ModalHeaderProps = {
  className?: string;
  title?: string;
  tagline?: string;
};

/**
 *
 */
export const ModalHeader: FC<ModalHeaderProps> = (props) => {
  const { className, title, tagline, ...rprops } = props;
  const hdClassNames = classnames(className, 'slds-modal__header');
  return (
    <div className={hdClassNames} {...rprops}>
      <Text tag='h2' category='heading' type='medium' tabIndex={-1}>
        {title}
      </Text>
      {tagline ? <p className='slds-var-m-top_x-small'>{tagline}</p> : null}
    </div>
  );
};

/**
 *
 */
export type ModalContentProps = {
  className?: string;
  children?: ReactNode;
};

/**
 *
 */
export const ModalContent: FC<ModalContentProps> = ({
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

/**
 *
 */
export type ModalFooterProps = {
  className?: string;
  directional?: boolean;
  children?: ReactNode;
};

/**
 *
 */
export const ModalFooter: FC<ModalFooterProps> = ({
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

/**
 *
 */
export type ModalSize = 'large';

export type ModalProps = {
  size?: ModalSize;
  opened?: boolean;
  containerStyle?: CSSProperties;
  onHide?: () => void;
  closeButton?: boolean;
  onClose?: () => void;
} & HTMLAttributes<HTMLDivElement>;

/**
 *
 */
const Modal_: FC<ModalProps> = (props) => {
  const {
    className,
    opened,
    children,
    size,
    containerStyle,
    onHide,
    closeButton,
    onClose: onClose_,
    ...rprops
  } = props;
  const modalClassNames = classnames(className, 'slds-modal', {
    'slds-fade-in-open': opened,
    'slds-modal_large': size === 'large',
  });
  const backdropClassNames = classnames(className, 'slds-backdrop', {
    'slds-backdrop_open': opened,
  });
  const onClose = useEventCallback(() => {
    onClose_?.();
    onHide?.();
  });
  return (
    <>
      <section
        className={modalClassNames}
        aria-hidden={!opened}
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
        {...rprops}
      >
        <div className='slds-modal__container' style={containerStyle}>
          {closeButton ? (
            <Button
              type='icon'
              className='slds-modal__close'
              icon='close'
              iconSize='large'
              alt='Close'
              inverse
              onClick={onClose}
            />
          ) : null}
          {children}
        </div>
      </section>
      <div className={backdropClassNames} role='presentation' />
    </>
  );
};

type ModalType = FC<ModalProps> & {
  Header: typeof ModalHeader;
  Content: typeof ModalContent;
  Footer: typeof ModalFooter;
};

(Modal_ as unknown as ModalType).Header = ModalHeader;
(Modal_ as unknown as ModalType).Content = ModalContent;
(Modal_ as unknown as ModalType).Footer = ModalFooter;

export const Modal: ModalType = Modal_ as ModalType;
