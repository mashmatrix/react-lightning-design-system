import { useContext, useState } from 'react';
import { FormElementContext } from './FormElement';
import { uuid } from './util';

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

/**
 *
 */
export function useFormElementId(
  propsId: string | undefined,
  prefix = 'form-element'
) {
  const { id: formElemId } = useContext(FormElementContext) ?? {};
  const [generatedId] = useState(`${prefix}-${uuid()}`);
  return propsId ?? formElemId ?? generatedId;
}
