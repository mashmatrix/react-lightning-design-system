import {
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { FormElementContext } from './FormElement';
import { uuid } from './util';

/**
 *
 */
export function useControlledValue<T>(value: T | undefined, defaultValue: T) {
  const initValue = typeof value !== 'undefined' ? value : defaultValue;
  const [stateValue, setStateValue] = useState<T>(initValue);
  return [typeof value !== 'undefined' ? value : stateValue, setStateValue] as [
    T,
    typeof setStateValue
  ];
}

/**
 *
 */
export function useFormElementId(
  propsId: string | undefined,
  prefix = 'form-element'
) {
  const { id: formElemId } = useContext(FormElementContext);
  const [generatedId] = useState(`${prefix}-${uuid()}`);
  return propsId ?? formElemId ?? generatedId;
}

/**
 *
 */
export function useEventCallback<A extends unknown[], R>(
  callback: (...args: A) => R
) {
  const ref = useRef<typeof callback>(() => {
    throw new Error('Should not call function in render');
  });
  useLayoutEffect(() => {
    ref.current = callback;
  });
  return useCallback((...args: A) => ref.current(...args), []);
}
