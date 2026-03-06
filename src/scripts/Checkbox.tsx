import React, {
  FC,
  InputHTMLAttributes,
  Ref,
  useCallback,
  useEffect,
  useId,
  useContext,
  useRef,
  ReactNode,
} from 'react';
import classnames from 'classnames';
import { FormElement } from './FormElement';
import { CheckboxGroupContext, CheckboxValueType } from './CheckboxGroup';

/**
 *
 */
export type CheckboxProps = {
  label?: string;
  required?: boolean;
  cols?: number;
  name?: string;
  value?: CheckboxValueType;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  tooltip?: ReactNode;
  tooltipIcon?: string;
  elementRef?: Ref<HTMLDivElement>;
  inputRef?: Ref<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>;

/**
 *
 */
export const Checkbox: FC<CheckboxProps> = (props) => {
  const {
    type, // eslint-disable-line @typescript-eslint/no-unused-vars
    id: id_,
    className,
    label,
    required,
    cols,
    tooltip,
    tooltipIcon,
    elementRef,
    inputRef,
    indeterminate,
    children,
    ...rprops
  } = props;

  const prefix = useId();
  const id = id_ ?? `${prefix}-id`;

  // `indeterminate` is a DOM-only property (no HTML attribute),
  // so we need an internal ref to set it imperatively while keeping `inputRef` working.
  const internalRef = useRef<HTMLInputElement>(null);
  const mergedRef = useCallback(
    (node: HTMLInputElement | null) => {
      (internalRef as React.MutableRefObject<HTMLInputElement | null>).current =
        node;
      if (typeof inputRef === 'function') {
        inputRef(node);
      } else if (inputRef) {
        (inputRef as React.MutableRefObject<HTMLInputElement | null>).current =
          node;
      }
    },
    [inputRef]
  );

  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = indeterminate === true;
    }
  }, [indeterminate]);

  const { grouped, error, errorId } = useContext(CheckboxGroupContext);
  const formElemProps = {
    required,
    error,
    errorId,
    cols,
    tooltip,
    tooltipIcon,
    elementRef,
  };
  const checkClassNames = classnames(className, 'slds-checkbox');
  const check = (
    <div className={checkClassNames}>
      <input
        ref={mergedRef}
        type='checkbox'
        {...rprops}
        id={id}
        aria-describedby={error ? errorId : undefined}
      />
      <label className='slds-checkbox__label' htmlFor={id}>
        <span className='slds-checkbox_faux' />
        <span className='slds-form-element__label'>{label || children}</span>
      </label>
    </div>
  );
  return grouped ? (
    check
  ) : (
    <FormElement {...formElemProps}>{check}</FormElement>
  );
};
