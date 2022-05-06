import { useState } from 'react';

type NotUndefined<T> = T extends undefined ? never : T;

/**
 *
 */
export function useControlledValue<T>(
  value: NotUndefined<T> | undefined,
  defaultValue: NotUndefined<T>
) {
  const initValue = typeof value !== 'undefined' ? value : defaultValue;
  const [stateValue, setStateValue] = useState<NotUndefined<T>>(initValue);
  return [typeof value !== 'undefined' ? value : stateValue, setStateValue] as [
    NotUndefined<T>,
    typeof setStateValue
  ];
}
