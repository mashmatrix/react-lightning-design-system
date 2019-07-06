import React, { Component, ReactHTML } from 'react';
import classnames from 'classnames';

import { Icon, IconCategory } from './Icon';
import { Button } from './Button';

export type PillProps = {
  className?: string;
  label?: string;
  truncate?: boolean;
  disabled?: boolean;
  tag?: keyof ReactHTML;
  icon?: {
    category?: IconCategory;
    icon?: string;
  };
  pillRef?: (node?: HTMLElement) => void;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onRemove?: (e: any) => void;
};

export class Pill extends Component<PillProps> {
  onPillClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  onPillRemove(e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.onRemove) {
      this.props.onRemove(e);
    }
  }

  onKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (e.keyCode === 8 || e.keyCode === 46) {
      // Bacspace / DEL
      e.preventDefault();
      e.stopPropagation();
      this.onPillRemove({});
    }
  }

  render() {
    const {
      icon,
      disabled,
      label,
      tag,
      pillRef,
      truncate,
      className,
    } = this.props;
    const Tag: any = disabled ? 'span' : tag || 'a';
    const pillClassNames = classnames(
      'slds-pill',
      { 'slds-truncate': truncate },
      className
    );
    return (
      <Tag
        ref={(node: HTMLElement) => {
          if (pillRef) pillRef(node);
        }}
        className={pillClassNames}
        onKeyDown={this.onKeyDown.bind(this)}
        onClick={this.onPillClick.bind(this)}
      >
        {icon && icon.icon ? (
          <Icon
            className='slds-pill__icon'
            category={icon.category}
            icon={icon.icon}
          />
        ) : (
          undefined
        )}
        <span className='slds-pill__label'>{label}</span>
        <Button
          disabled={disabled}
          className='slds-pill__remove'
          type='icon-bare'
          icon='close'
          alt='Remove'
          tabIndex={-1}
          onClick={this.onPillRemove.bind(this)}
        />
      </Tag>
    );
  }
}
