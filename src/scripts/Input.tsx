import React, {
  ReactElement,
  InputHTMLAttributes,
  KeyboardEvent,
  ChangeEvent,
  FC,
  useEffect,
  useCallback,
  useContext,
  Ref,
} from 'react';
import classnames from 'classnames';
import keycoder from 'keycoder';
import { Icon } from './Icon';
import { FormElement, FormElementProps } from './FormElement';
import { Text } from './Text';
import { FieldSetColumnContext } from './FieldSet';
import { registerStyle } from './util';
import { useFormElementId } from './hooks';

/**
 *
 */
function useInitComponentStyle() {
  useEffect(() => {
    registerStyle('input-icons', [
      // fix styles of double-iconed input
      [
        '.slds-input-has-icon_left-right .react-slds-icon.slds-input__icon_right',
        '{ left: auto; }',
      ],
    ]);
  }, []);
}

/**
 *
 */
const InputAddon = ({ content }: { content: string }) => (
  <Text
    tag='span'
    className='slds-form-element__addon'
    category='body'
    type='regular'
  >
    {content}
  </Text>
);

/**
 *
 */
const InputIcon = ({
  icon,
  align,
}: {
  icon: string | ReactElement;
  align: 'left' | 'right';
}) => {
  return React.isValidElement(icon) ? (
    icon
  ) : (
    <Icon
      icon={icon}
      className={classnames(
        'slds-input__icon',
        `slds-input__icon_${align}`,
        'slds-icon-text-default'
      )}
    />
  );
};

/**
 *
 */
export type InputProps = {
  label?: string;
  required?: boolean;
  error?: FormElementProps['error'];
  cols?: number;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  bare?: boolean;
  symbolPattern?: string;
  readOnly?: boolean;
  htmlReadOnly?: boolean;
  iconLeft?: string | JSX.Element;
  iconRight?: string | JSX.Element;
  addonLeft?: string;
  addonRight?: string;
  onValueChange?: (value: string) => void;
  inputRef?: Ref<HTMLInputElement>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue'>;

/**
 *
 */
export const Input: FC<InputProps> = (props) => {
  const {
    symbolPattern,
    onKeyDown: onKeyDown_,
    onChange: onChange_,
    onValueChange,
  } = props;

  useInitComponentStyle();

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (symbolPattern) {
        const { keyCode, shiftKey } = e;
        const value = keycoder.toCharacter(keyCode, shiftKey);
        if (value && !value.match(new RegExp(symbolPattern))) {
          e.preventDefault();
          return;
        }
      }
      onKeyDown_?.(e);
    },
    [symbolPattern, onKeyDown_]
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange_?.(e);
      onValueChange?.(e.target.value);
    },
    [onChange_, onValueChange]
  );

  const { id: id_, label, required, error, readOnly, cols, ...rprops } = props;
  const id = useFormElementId(id_, 'input');
  const { totalCols } = useContext(FieldSetColumnContext);
  if (label || required || error || totalCols || cols) {
    const formElemProps = {
      id,
      label,
      required,
      error,
      readOnly,
      cols,
    };
    return (
      <FormElement {...formElemProps}>
        <Input {...{ id, readOnly, ...rprops }} />
      </FormElement>
    );
  }

  const {
    className,
    inputRef,
    type,
    bare,
    value,
    defaultValue,
    htmlReadOnly,
    ...rprops2
  } = rprops;
  const inputClassNames = classnames(
    className,
    bare ? 'slds-input_bare' : 'slds-input'
  );
  const inputElem = readOnly ? (
    <Text
      id={id}
      type='regular'
      category='body'
      className='slds-form-element__static'
    >
      {value}
    </Text>
  ) : (
    <input
      ref={inputRef}
      className={inputClassNames}
      id={id}
      type={type}
      value={value}
      defaultValue={defaultValue}
      readOnly={htmlReadOnly}
      {...rprops2}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );

  const { iconLeft, iconRight, addonLeft, addonRight } = props;
  if (iconLeft || iconRight || addonLeft || addonRight) {
    const wrapperClassName = classnames(
      'slds-form-element__control',
      { 'slds-input-has-icon': iconLeft || iconRight },
      { 'slds-input-has-icon_left-right': iconLeft && iconRight },
      { 'slds-input-has-icon_left': iconLeft },
      { 'slds-input-has-icon_right': iconRight },
      { 'slds-input-has-fixed-addon': addonLeft || addonRight }
    );
    return (
      <div className={wrapperClassName}>
        {addonLeft ? <InputAddon content={addonLeft} /> : undefined}
        {iconLeft ? <InputIcon icon={iconLeft} align='left' /> : undefined}
        {inputElem}
        {iconRight ? <InputIcon icon={iconRight} align='right' /> : undefined}
        {addonRight ? <InputAddon content={addonRight} /> : undefined}
      </div>
    );
  }
  return inputElem;
};

(Input as unknown as { isFormElement?: boolean }).isFormElement = true;
