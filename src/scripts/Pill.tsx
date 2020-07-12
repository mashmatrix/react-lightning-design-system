import React, {
  Component,
  ReactHTML,
  HTMLAttributes,
  MouseEvent,
  KeyboardEvent,
} from 'react';
import classnames from 'classnames';
import { Icon, IconCategory } from './Icon';
import { Button } from './Button';

export type PillProps = {
  label?: string;
  truncate?: boolean;
  disabled?: boolean;
  tag?: keyof ReactHTML;
  icon?: {
    category?: IconCategory;
    icon?: string;
  };
  pillRef?: (node: HTMLElement) => void;
  onRemove?: () => void;
} & HTMLAttributes<HTMLSpanElement>;

export class Pill extends Component<PillProps> {
  onPillClick = (e: MouseEvent<HTMLElement>) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  onPillRemove = (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.onRemove) {
      this.props.onRemove();
    }
  };

  onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === 8 || e.keyCode === 46) {
      // Bacspace / DEL
      this.onPillRemove(e);
    }
  };

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
        onKeyDown={this.onKeyDown}
        onClick={this.onPillClick}
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
          onClick={this.onPillRemove}
        />
      </Tag>
    );
  }
}
