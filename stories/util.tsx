import React, { CSSProperties } from 'react';
import { StoryObj } from '@storybook/react';
import { ButtonType } from '../src/scripts';

export type Decorator<Props> = NonNullable<
  StoryObj<Props>['decorators']
>[number];

/**
 *
 */
export function containerDecorator<Props>(
  style: CSSProperties
): Decorator<Props> {
  const decorator: Decorator<Props> = (story) => (
    <div style={style}>{story()}</div>
  );
  return decorator;
}

/**
 *
 */
export function buildContainerDecorator<Props>(
  builderFunc: (args: Props) => CSSProperties | null | undefined
): Decorator<Props> {
  const decorator: Decorator<Props> = (story, ctx) => {
    const style = builderFunc(ctx.args);
    return style ? <div style={style}>{story()}</div> : story();
  };
  return decorator;
}

/**
 *
 */
export const buttonBgDecorator = buildContainerDecorator<{
  type?: ButtonType;
}>((args) => {
  const type = args.type;
  return type === 'inverse' ||
    type === 'icon-inverse' ||
    type === 'icon-border-inverse'
    ? {
        backgroundColor: '#16325c',
        padding: 4,
      }
    : type === 'icon-border-filled'
    ? {
        backgroundColor: '#cccccc',
        padding: 4,
      }
    : null;
});
