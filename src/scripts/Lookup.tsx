import React, {
  InputHTMLAttributes,
  ChangeEvent,
  KeyboardEvent,
  Ref,
  useRef,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useId,
  useCallback,
} from 'react';
import classnames from 'classnames';
import { FormElement, FormElementProps } from './FormElement';
import { Icon, IconCategory } from './Icon';
import { Spinner } from './Spinner';
import { isElInChildren } from './util';
import { ComponentSettingsContext } from './ComponentSettings';
import { useControlledValue, useEventCallback, useMergeRefs } from './hooks';
import { createFC } from './common';
import { Bivariant } from './typeUtils';

/**
 *
 */
export type LookupEntry = {
  label: string;
  value: string;
  icon?: string;
  scope?: string;
  category?: IconCategory;
  meta?: string;
};

/**
 *
 */
export type LookupScope = {
  label: string;
  value?: string;
  icon?: string;
  category?: IconCategory;
};

/**
 *
 */
export type LookupProps = {
  label?: string;
  disabled?: boolean;
  required?: boolean;
  error?: FormElementProps['error'];

  value?: string | null;
  defaultValue?: string | null;

  selected?: LookupEntry | null;
  defaultSelected?: LookupEntry | null;

  opened?: boolean;
  defaultOpened?: boolean;

  searchText?: string;
  defaultSearchText?: string;

  loading?: boolean;
  data?: LookupEntry[];
  lookupFilter?: Bivariant<
    (entry: LookupEntry, searchText?: string, scope?: string) => boolean
  >;
  listHeader?: JSX.Element;
  listFooter?: JSX.Element;
  cols?: number;
  tooltip?: ReactNode;
  tooltipIcon?: string;

  elementRef?: Ref<HTMLDivElement>;
  inputRef?: Ref<HTMLInputElement>;
  dropdownRef?: Ref<HTMLDivElement>;

  onSearchTextChange?: (searchText: string) => void;
  onLookupRequest?: (searchText: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onSelect?: Bivariant<(entry: LookupEntry | null) => void>;
  onValueChange?: (value: string | null, prevValue?: string | null) => void;
  onComplete?: (cancel?: boolean) => void;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'onBlur' | 'onFocus' | 'onSelect' | 'value' | 'defaultValue'
>;

/**
 *
 */
export const Lookup = createFC<LookupProps, { isFormElement: boolean }>(
  (props) => {
    const {
      id: id_,
      value: value_,
      defaultValue,
      selected: selected_,
      defaultSelected,
      opened: opened_,
      defaultOpened,
      searchText: searchText_,
      defaultSearchText,
      cols,
      label,
      required,
      error,
      className,
      disabled,
      loading,
      lookupFilter,
      listHeader,
      listFooter,
      data = [],
      tooltip,
      tooltipIcon,
      onSelect: onSelect_,
      onSearchTextChange: onSearchTextChange_,
      onLookupRequest: onLookupRequest_,
      onBlur: onBlur_,
      onFocus: onFocus_,
      onValueChange,
      onComplete,
      elementRef: elementRef_,
      inputRef: inputRef_,
      dropdownRef: dropdownRef_,
      ...rprops
    } = props;

    const id = useId();
    const comboboxId = id_ || `combobox-${id}`;
    const listboxId = `listbox-${id}`;

    const [value, setValue] = useControlledValue<string | null>(
      value_,
      defaultValue ?? null
    );
    const [selected, setSelected] = useControlledValue<LookupEntry | null>(
      selected_,
      defaultSelected ?? data?.find((entry) => entry.value === value) ?? null
    );
    const [opened, setOpened] = useControlledValue(
      opened_,
      defaultOpened ?? false
    );
    const [searchText, setSearchText] = useControlledValue(
      searchText_,
      defaultSearchText ?? ''
    );
    const [focusedValue, setFocusedValue] = useState<string | undefined>();

    const { getActiveElement } = useContext(ComponentSettingsContext);

    // Get option values from data
    const getOptionValues = useCallback(() => {
      const filteredData = lookupFilter
        ? data.filter((entry) => lookupFilter(entry, searchText))
        : data;
      return filteredData.map((entry) => entry.value);
    }, [data, lookupFilter, searchText]);

    // Get next option value for keyboard navigation
    const getNextValue = useCallback(
      (currentValue?: string) => {
        const optionValues = getOptionValues();
        if (optionValues.length === 0) return undefined;

        if (!currentValue) return optionValues[0];

        const currentIndex = optionValues.indexOf(currentValue);
        return optionValues[currentIndex + 1] || optionValues[0]; // wrap around
      },
      [getOptionValues]
    );

    // Get previous option value for keyboard navigation
    const getPrevValue = useCallback(
      (currentValue?: string) => {
        const optionValues = getOptionValues();
        if (optionValues.length === 0) return undefined;

        if (!currentValue) return optionValues[optionValues.length - 1];

        const currentIndex = optionValues.indexOf(currentValue);
        return (
          optionValues[currentIndex - 1] ||
          optionValues[optionValues.length - 1]
        ); // wrap around
      },
      [getOptionValues]
    );

    // Set initial focus when dropdown opens
    useEffect(() => {
      if (opened && !focusedValue) {
        const initialFocus = getOptionValues()[0];
        setFocusedValue(initialFocus);
      } else if (!opened) {
        setFocusedValue(undefined);
      }
    }, [opened, getOptionValues, focusedValue]);

    const elRef = useRef<HTMLDivElement | null>(null);
    const elementRef = useMergeRefs([elRef, elementRef_]);
    const inputElRef = useRef<HTMLInputElement | null>(null);
    const inputRef = useMergeRefs([inputElRef, inputRef_]);
    const dropdownElRef = useRef<HTMLDivElement | null>(null);
    const dropdownRef = useMergeRefs([dropdownElRef, dropdownRef_]);

    const isFocusedInComponent = useEventCallback(() => {
      const targetEl = getActiveElement();
      return (
        isElInChildren(elRef.current, targetEl) ||
        isElInChildren(dropdownElRef.current, targetEl)
      );
    });

    const onSelect = useEventCallback((selectedEntry: LookupEntry | null) => {
      const currValue = selectedEntry?.value ?? null;
      setValue(currValue);
      setSelected(selectedEntry);
      onValueChange?.(currValue, value);
      onSelect_?.(selectedEntry);
    });

    const onSearchTextChange = useEventCallback((newSearchText: string) => {
      setSearchText(newSearchText);
      onSearchTextChange_?.(newSearchText);
      if (newSearchText && !opened) {
        setOpened(true);
        onLookupRequest_?.(newSearchText);
      }
    });

    const onInputChange = useEventCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const newSearchText = e.target.value;
        onSearchTextChange(newSearchText);
      }
    );

    const onInputFocus = useEventCallback(() => {
      onFocus_?.();
      if (searchText && !opened) {
        setOpened(true);
        onLookupRequest_?.(searchText);
      }
    });

    const onInputBlur = useEventCallback(() => {
      setTimeout(() => {
        if (!isFocusedInComponent()) {
          setOpened(false);
          onBlur_?.();
          onComplete?.(true);
        }
      }, 10);
    });

    const onInputKeyDown = useEventCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 40) {
          // down
          e.preventDefault();
          e.stopPropagation();
          if (!opened) {
            setOpened(true);
            onLookupRequest_?.(searchText);
          } else {
            const nextValue = getNextValue(focusedValue);
            setFocusedValue(nextValue);
          }
        } else if (e.keyCode === 38) {
          // up
          e.preventDefault();
          e.stopPropagation();
          if (!opened) {
            setOpened(true);
            onLookupRequest_?.(searchText);
          } else {
            const prevValue = getPrevValue(focusedValue);
            setFocusedValue(prevValue);
          }
        } else if (e.keyCode === 27) {
          // ESC
          e.preventDefault();
          e.stopPropagation();
          setOpened(false);
          onComplete?.(true);
        } else if (e.keyCode === 13) {
          // Enter
          e.preventDefault();
          e.stopPropagation();
          if (opened && focusedValue) {
            const selectedEntry = data.find(
              (entry) => entry.value === focusedValue
            );
            if (selectedEntry) {
              onSelect(selectedEntry);
              setOpened(false);
              onComplete?.();
            }
          } else if (searchText) {
            setOpened(true);
            onLookupRequest_?.(searchText);
          }
        }
      }
    );

    const onOptionClick = useEventCallback((entry: LookupEntry) => {
      onSelect(entry);
      setOpened(false);
      setTimeout(() => {
        inputElRef.current?.focus();
        onComplete?.();
      }, 10);
    });

    const hasSelection = selected != null;
    const hasValue = searchText.length > 0;

    const containerClassNames = classnames(
      'slds-combobox_container',
      {
        'slds-has-selection': hasSelection,
      },
      className
    );

    const comboboxClassNames = classnames(
      'slds-combobox',
      'slds-dropdown-trigger',
      'slds-dropdown-trigger_click',
      {
        'slds-is-open': opened,
      }
    );

    const inputClassNames = classnames('slds-input', 'slds-combobox__input', {
      'slds-has-focus': opened,
      'slds-combobox__input-value': hasValue,
    });

    const dropdownClassNames = classnames(
      'slds-dropdown',
      'slds-dropdown_length-with-icon-7',
      'slds-dropdown_fluid'
    );

    const formElemProps = {
      id,
      label,
      required,
      error,
      cols,
      tooltip,
      tooltipIcon,
      elementRef,
    };

    const filteredData = lookupFilter
      ? data.filter((entry) => lookupFilter(entry, searchText))
      : data;

    const renderListHeader = () => {
      if (!listHeader) return null;
      return (
        <li role='presentation' className='slds-listbox__item'>
          <div
            className='slds-media slds-media_center slds-listbox__option slds-listbox__option_entity slds-listbox__option_term'
            role='option'
            aria-selected='true'
          >
            {listHeader}
          </div>
        </li>
      );
    };

    const renderListFooter = () => {
      if (!listFooter) return null;
      return (
        <li role='presentation' className='slds-listbox__item'>
          <div
            className='slds-media slds-media_center slds-listbox__option slds-listbox__option_entity'
            role='option'
          >
            {listFooter}
          </div>
        </li>
      );
    };

    const renderDataItems = () => {
      return filteredData.map((entry) => {
        const isFocused = focusedValue === entry.value;
        const itemClassNames = classnames(
          'slds-media',
          'slds-media_center',
          'slds-listbox__option',
          'slds-listbox__option_entity',
          {
            'slds-listbox__option_has-meta': entry.meta,
            'slds-has-focus': isFocused,
          }
        );

        return (
          <li
            key={entry.value}
            role='presentation'
            className='slds-listbox__item'
          >
            <div
              id={`option-${entry.value}`}
              className={itemClassNames}
              role='option'
              aria-selected={isFocused}
              onClick={() => onOptionClick(entry)}
            >
              <span className='slds-media__figure slds-listbox__option-icon'>
                {entry.icon && (
                  <span
                    className={`slds-icon_container slds-icon-${entry.category || 'standard'}-${entry.icon}`}
                  >
                    <Icon
                      category={entry.category}
                      icon={entry.icon}
                      className='slds-icon slds-icon_small'
                    />
                  </span>
                )}
              </span>
              <span className='slds-media__body'>
                <span className='slds-listbox__option-text slds-listbox__option-text_entity'>
                  {entry.label}
                </span>
                {entry.meta && (
                  <span className='slds-listbox__option-meta slds-listbox__option-meta_entity'>
                    {entry.meta}
                  </span>
                )}
              </span>
            </div>
          </li>
        );
      });
    };

    const renderLoadingSpinner = () => {
      if (!loading) return null;
      return (
        <li role='option' className='slds-listbox__item'>
          <div className='slds-align_absolute-center slds-p-top_medium'>
            <Spinner container={false} size='x-small' layout='inline' />
          </div>
        </li>
      );
    };

    // Render search state
    return (
      <FormElement {...formElemProps}>
        <div className={containerClassNames}>
          <div className={comboboxClassNames} ref={elementRef}>
            <div
              className='slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right'
              role='none'
            >
              <input
                {...rprops}
                type='text'
                className={inputClassNames}
                id={comboboxId}
                ref={inputRef}
                value={searchText}
                disabled={disabled}
                aria-autocomplete='list'
                aria-controls={listboxId}
                aria-expanded={opened}
                aria-haspopup='listbox'
                aria-activedescendant={
                  focusedValue ? `option-${focusedValue}` : undefined
                }
                autoComplete='off'
                role='combobox'
                onChange={onInputChange}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                onKeyDown={onInputKeyDown}
              />
              <span className='slds-icon_container slds-icon-utility-search slds-input__icon slds-input__icon_right'>
                <Icon
                  icon='search'
                  className='slds-icon slds-icon_x-small slds-icon-text-default'
                />
              </span>
            </div>
            {opened && (
              <div
                id={listboxId}
                className={dropdownClassNames}
                role='listbox'
                aria-label='Search Results'
                tabIndex={0}
                aria-busy={loading}
                ref={dropdownRef}
              >
                <ul
                  className='slds-listbox slds-listbox_vertical'
                  role='presentation'
                >
                  {renderListHeader()}
                  {renderDataItems()}
                  {renderLoadingSpinner()}
                  {renderListFooter()}
                </ul>
              </div>
            )}
          </div>
        </div>
      </FormElement>
    );
  },
  { isFormElement: true }
);
