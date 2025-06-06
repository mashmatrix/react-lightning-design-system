import React, {
  createContext,
  FieldsetHTMLAttributes,
  Ref,
  useContext,
  useMemo,
  useRef,
  ReactNode,
} from 'react';
import classnames from 'classnames';
import { FormElementProps } from './FormElement';
import { FieldSetColumnContext } from './FieldSet';
import { TooltipContent } from './TooltipContent';
import { useEventCallback } from './hooks';
import { createFC } from './common';
import { Bivariant } from './typeUtils';

/**
 *
 */
export type CheckboxValueType = string | number;

/**
 *
 */
export const CheckboxGroupContext = createContext<{ grouped?: boolean }>({});

/**
 *
 */
export type CheckboxGroupProps = {
  label?: string;
  required?: boolean;
  error?: FormElementProps['error'];
  name?: string;
  cols?: number;
  tooltip?: ReactNode;
  tooltipIcon?: string;
  elementRef?: Ref<HTMLFieldSetElement>;
  onValueChange?: Bivariant<(values: CheckboxValueType[]) => void>;
} & FieldsetHTMLAttributes<HTMLFieldSetElement>;

/**
 *
 */
export const CheckboxGroup = createFC<
  CheckboxGroupProps,
  { isFormElement: boolean }
>(
  (props) => {
    const {
      className,
      label,
      cols,
      style,
      required,
      error,
      tooltip,
      tooltipIcon,
      elementRef,
      onValueChange,
      onChange: onChange_,
      children,
      ...rprops
    } = props;
    const { totalCols } = useContext(FieldSetColumnContext);
    const controlElRef = useRef<HTMLDivElement | null>(null);

    const onChange = useEventCallback(
      (e: React.FormEvent<HTMLFieldSetElement>) => {
        if (onValueChange) {
          const checkboxes =
            controlElRef.current?.querySelectorAll<HTMLInputElement>(
              'input[type=checkbox]'
            );
          if (!checkboxes) {
            return;
          }
          const values = [...checkboxes]
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);
          onValueChange?.(values);
        }
        onChange_?.(e);
      }
    );

    const grpClassNames = classnames(
      className,
      'slds-form-element',
      {
        'slds-has-error': error,
        'slds-is-required': required,
      },
      typeof totalCols === 'number'
        ? `slds-size_${cols || 1}-of-${totalCols}`
        : null
    );
    const grpStyles =
      typeof totalCols === 'number'
        ? { display: 'inline-block', ...style }
        : style;
    const errorMessage = error
      ? typeof error === 'string'
        ? error
        : typeof error === 'object'
        ? error.message
        : undefined
      : undefined;
    const grpCtx = useMemo(() => ({ grouped: true }), []);

    return (
      <fieldset
        ref={elementRef}
        className={grpClassNames}
        style={grpStyles}
        {...rprops}
        onChange={onChange}
      >
        <legend className='slds-form-element__label'>
          {required ? (
            <abbr className='slds-required' title='required'>
              *
            </abbr>
          ) : undefined}
          {label}
          {tooltip ? (
            <span className='slds-m-left_x-small'>
              <TooltipContent icon={tooltipIcon}>{tooltip}</TooltipContent>
            </span>
          ) : null}
        </legend>
        <div className='slds-form-element__control' ref={controlElRef}>
          <CheckboxGroupContext.Provider value={grpCtx}>
            {children}
          </CheckboxGroupContext.Provider>
          {errorMessage ? (
            <div className='slds-form-element__help'>{errorMessage}</div>
          ) : undefined}
        </div>
      </fieldset>
    );
  },
  { isFormElement: true }
);
