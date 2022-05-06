import React, { FC, ReactHTML, HTMLAttributes } from 'react';
import classnames from 'classnames';

/**
 *
 */
export type TextProps = {
  tag?: keyof ReactHTML;
  category?: 'body' | 'heading' | 'title';
  type?: 'small' | 'regular' | 'medium' | 'large' | 'caps' | 'label';
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  section?: boolean;
} & HTMLAttributes<HTMLElement>;

/**
 *
 */
export const Text: FC<TextProps> = ({
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
    type && category ? `slds-text-${category}_${type}` : undefined,
    category && !type ? `slds-text-${category}` : undefined,
    align ? `slds-text-align_${align}` : undefined,
    {
      'slds-truncate': truncate,
      'slds-section-title_divider': section,
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
