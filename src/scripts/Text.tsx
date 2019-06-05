import React, { ReactHTML } from 'react';
import classnames from 'classnames';

export type TextProps = {
  tag?: keyof ReactHTML;
  category?: 'body' | 'heading' | 'title';
  type?: 'small' | 'regular' | 'medium' | 'large' | 'caps';
  align?: 'left' | 'center' | 'right';
  className?: string;
  truncate?: boolean;
  section?: boolean;
};

export const Text: React.FC<TextProps> = ({
  tag,
  category,
  type,
  align,
  truncate,
  section,
  children,
  className,
  ...props
}) => {
  const textClassNames = classnames(
    {
      [`slds-text-${category}--${type}`]: type && category,
      [`slds-text-${category}`]: category && !type,
      'slds-truncate': truncate,
      [`slds-text-align--${align}`]: align,
      'slds-section-title--divider': section,
    },
    className
  );
  const Tag = tag || 'p';
  return (
    <Tag {...props} className={textClassNames}>
      {children}
    </Tag>
  );
};
