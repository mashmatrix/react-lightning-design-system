import { FC } from 'react';

/**
 *
 */
export function createFC<P, T>(componentFn: FC<P>, statics: T): FC<P> & T {
  return Object.assign(componentFn, statics);
}
