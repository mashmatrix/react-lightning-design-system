// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Bivariant<M extends (...args: any[]) => any> = {
  bivarianceHack(...args: Parameters<M>): ReturnType<M>;
}['bivarianceHack'];
