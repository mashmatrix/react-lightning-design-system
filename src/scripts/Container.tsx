import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';

export type ContainerProps = {
  size: 'small' | 'medium' | 'large';
  align: 'left' | 'center' | 'right';
} & HTMLAttributes<HTMLDivElement>;

export const Container: React.FC<ContainerProps> = ({
  className,
  size,
  align,
  children,
  ...props
}) => {
  const ctClassNames = classnames(
    className,
    `slds-container_${size || 'fluid'}`,
    align ? `slds-container_${align}` : null
  );
  return (
    <div className={ctClassNames} {...props}>
      {children}
    </div>
  );
};
