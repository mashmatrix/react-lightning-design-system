import React, { CSSProperties } from 'react';
import { DecoratorFn } from '@storybook/react';
import { ButtonType } from '../src/scripts';

/**
 *
 */
export function containerDecorator(style: CSSProperties): DecoratorFn {
  const decorator: DecoratorFn = (story) => <div style={style}>{story()}</div>;
  return decorator;
}

/**
 *
 */
export function buildContainerDecorator<Props>(
  builderFunc: (args: Props) => CSSProperties | null | undefined
): DecoratorFn {
  const decorator: DecoratorFn = (story, ctx) => {
    ctx.args;
    const style = builderFunc(ctx.args as Props);
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
