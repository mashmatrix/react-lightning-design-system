import React, {
  HTMLAttributes,
  CSSProperties,
  FC,
  createContext,
  useContext,
  useMemo,
  ReactNode,
} from 'react';
import classnames from 'classnames';
import { Button } from './Button';
import { useEventCallback } from './hooks';

/**
 *
 */
const ModalHandlersContext = createContext<{
  onHide?: () => void;
}>({});

/**
 *
 */
export type ModalHeaderProps = {
  className?: string;
  title?: string;
  tagline?: string;
  closeButton?: boolean;
  onClose?: () => void;
};

/**
 *
 */
export const ModalHeader: FC<ModalHeaderProps> = (props) => {
  const {
    className,
    title,
    tagline,
    closeButton,
    onClose: onClose_,
    ...rprops
  } = props;
  const { onHide: onHideModal } = useContext(ModalHandlersContext);
  const onClose = useEventCallback(() => {
    onClose_?.();
    onHideModal?.();
  });
  const hdClassNames = classnames(className, 'slds-modal__header');
  return (
    <div className={hdClassNames} {...rprops}>
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
          onClick={onClose}
        />
      ) : null}
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
    ...rprops
  } = props;
  const modalClassNames = classnames(className, 'slds-modal', {
    'slds-fade-in-open': opened,
    'slds-modal_large': size === 'large',
  });
  const backdropClassNames = classnames(className, 'slds-backdrop', {
    'slds-backdrop_open': opened,
  });
  const handlers = useMemo(() => ({ onHide }), [onHide]);
  return (
    <ModalHandlersContext.Provider value={handlers}>
      <div
        className={modalClassNames}
        aria-hidden={!opened}
        role='dialog'
        {...rprops}
      >
        <div className='slds-modal__container' style={containerStyle}>
          {children}
        </div>
      </div>
      <div className={backdropClassNames} />
    </ModalHandlersContext.Provider>
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
