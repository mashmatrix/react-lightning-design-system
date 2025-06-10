import React, {
  Ref,
  useContext,
  useMemo,
  ReactNode,
  CSSProperties,
  useRef,
  useCallback,
} from 'react';
import classnames from 'classnames';
import { FormTypeContext } from './Form';
import { FieldSetColumnContext } from './FieldSet';
import { createFC } from './common';
import { TooltipContent } from './TooltipContent';

/**
 *
 */
export type FormElementProps = {
  id?: string;
  className?: string;
  controlId?: string;
  label?: string;
  required?: boolean;
  error?: boolean | string | { message: string };
  errorId?: string;
  readOnly?: boolean;
  cols?: number;
  dropdown?: JSX.Element;
  elementRef?: Ref<HTMLDivElement>;
  style?: CSSProperties;
  children?: ReactNode;
  tooltip?: ReactNode;
  tooltipIcon?: string;
  type?: 'stacked' | 'horizontal' | 'inline' | 'compound';
};

/**
 *
 */
export const FormElement = createFC<
  FormElementProps,
  { isFormElement: boolean }
>(
  (props) => {
    const {
      id,
      className,
      controlId,
      cols = 1,
      elementRef,
      label,
      required,
      error,
      errorId,
      dropdown,
      children,
      readOnly,
      tooltip,
      tooltipIcon,
      type: propsType,
    } = props;

    const contextType = useContext(FormTypeContext);
    const type = propsType ?? contextType;

    const controlElRef = useRef<HTMLDivElement>(null);

    const { totalCols } = useContext(FieldSetColumnContext);

    const errorMessage = error
      ? typeof error === 'string'
        ? error
        : typeof error === 'object'
        ? error.message
        : undefined
      : undefined;

    const formElementClassNames = classnames(
      'slds-form-element',
      type ? `slds-form-element_${type}` : null,
      readOnly ? 'slds-form-element_readonly' : null,
      error ? 'slds-has-error' : null,
      typeof totalCols === 'number'
        ? `slds-size_${cols}-of-${totalCols}`
        : null,
      className
    );

    const onClickLabel = useCallback(() => {
      if (controlElRef.current) {
        const inputEl = controlElRef.current.querySelector<HTMLElement>(
          'input,select,button'
        );
        inputEl?.focus();
      }
    }, []);

    const emptyCtx = useMemo(() => ({}), []);

    const LabelTag = readOnly ? 'span' : 'label';

    return (
      <FieldSetColumnContext.Provider value={emptyCtx}>
        <div ref={elementRef} className={formElementClassNames}>
          {label ? (
            <LabelTag
              id={id}
              className='slds-form-element__label'
              {...(LabelTag === 'label' ? { htmlFor: controlId } : {})}
              onClick={id ? undefined : onClickLabel}
            >
              {required ? (
                <abbr
                  className='slds-required'
                  title='required'
                  aria-hidden='true'
                >
                  *
                </abbr>
              ) : undefined}
              {label}
            </LabelTag>
          ) : null}
          {tooltip ? (
            <TooltipContent icon={tooltipIcon}>{tooltip}</TooltipContent>
          ) : null}
          <div ref={controlElRef} className='slds-form-element__control'>
            {readOnly ? (
              <div className='slds-form-element__static'>{children}</div>
            ) : (
              children
            )}
            {dropdown}
            {errorMessage ? (
              <span
                className='slds-form-element__help'
                id={error ? errorId : undefined}
              >
                {errorMessage}
              </span>
            ) : undefined}
          </div>
        </div>
      </FieldSetColumnContext.Provider>
    );
  },
  { isFormElement: true }
);
