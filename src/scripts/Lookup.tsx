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

  // Multi Entity Lookup (scope) props
  scopes?: LookupScope[];
  targetScope?: string;
  defaultTargetScope?: string;
  onScopeMenuClick?: () => void;
  onScopeSelect?: (scope: string) => void;

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
      // Multi Entity Lookup props
      scopes,
      targetScope: targetScope_,
      defaultTargetScope,
      onScopeMenuClick: onScopeMenuClick_,
      onScopeSelect: onScopeSelect_,
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

    const fallbackId = useId();
    const comboboxId = id_ || `${fallbackId}-combobox`;
    const listboxId = `${fallbackId}-listbox`;

    const labelId = label ? `${comboboxId}-label` : undefined;
    const scopeId = `${comboboxId}-scope`;

    const [value, setValue] = useControlledValue<string | null>(
      value_,
      defaultValue ?? null
    );
    const [targetScope, setTargetScope] = useControlledValue(
      targetScope_,
      defaultTargetScope ?? (scopes?.[0]?.value || scopes?.[0]?.label)
    );
    const [scopeOpened, setScopeOpened] = useState(false);
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

    const onScopeMenuClick = useEventCallback(() => {
      setScopeOpened(!scopeOpened);
      onScopeMenuClick_?.();
    });

    const onScopeBlur = useEventCallback(() => {
      setTimeout(() => {
        setScopeOpened(false);
      }, 10);
    });

    const onScopeSelect = useEventCallback((scope: string) => {
      setTargetScope(scope);
      setScopeOpened(false);
      onScopeSelect_?.(scope);
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
      id: labelId,
      htmlFor: comboboxId,
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

    // Render scope selection UI
    const renderScopeSelection = () => {
      if (!scopes || scopes.length === 0) return null;

      const currentScope = scopes.find(
        (scope) => (scope.value || scope.label) === targetScope
      );

      return (
        <div className='slds-combobox_container slds-combobox-addon_start slds-has-icon-only'>
          <div className='slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click'>
            <div className='slds-combobox__form-element' role='none'>
              <label
                className='slds-form-element__label slds-assistive-text'
                htmlFor={scopeId}
              >
                Filter Search by:
              </label>
              <div className='slds-input_faux slds-combobox__input'>
                <div className='slds-combobox__input-entity-icon'>
                  {currentScope?.icon && (
                    <Icon
                      category={currentScope.category}
                      icon={currentScope.icon}
                      className='slds-icon slds-icon_x-small'
                      container={true}
                    />
                  )}
                  <input
                    type='text'
                    className='slds-input slds-combobox__input slds-combobox__input-value'
                    id={scopeId}
                    aria-controls='objectswitcher-listbox-id'
                    aria-expanded={scopeOpened}
                    aria-haspopup='listbox'
                    autoComplete='off'
                    role='combobox'
                    placeholder=' '
                    value={targetScope || ''}
                    disabled={disabled}
                    onClick={onScopeMenuClick}
                    onBlur={onScopeBlur}
                    readOnly
                  />
                </div>
                <span className='slds-icon_container slds-icon-utility-down slds-input__icon slds-input__icon_right'>
                  <Icon
                    icon='down'
                    className='slds-icon slds-icon_x-small slds-icon-text-default'
                  />
                </span>
              </div>
            </div>
            {scopeOpened && (
              <div
                className='slds-dropdown slds-dropdown_left slds-dropdown_small'
                role='listbox'
                aria-label='Scope Selection'
              >
                <ul
                  className='slds-listbox slds-listbox_vertical'
                  role='presentation'
                >
                  {scopes.map((scope) => {
                    const scopeValue = scope.value || scope.label;
                    const isSelected = scopeValue === targetScope;
                    return (
                      <li
                        key={scopeValue}
                        role='presentation'
                        className='slds-listbox__item'
                      >
                        <div
                          className={classnames(
                            'slds-media',
                            'slds-listbox__option',
                            'slds-listbox__option_entity',
                            'slds-listbox__option_has-meta',
                            {
                              'slds-is-selected': isSelected,
                            }
                          )}
                          role='option'
                          aria-selected={isSelected}
                          onClick={() => onScopeSelect(scopeValue)}
                        >
                          <span className='slds-media__figure slds-listbox__option-icon'>
                            {scope.icon && (
                              <Icon
                                category={scope.category}
                                icon={scope.icon}
                                className='slds-icon slds-icon_small'
                                container={true}
                              />
                            )}
                          </span>
                          <span className='slds-media__body'>
                            <span className='slds-listbox__option-text slds-listbox__option-text_entity'>
                              {scope.label}
                            </span>
                          </span>
                          {isSelected && (
                            <span className='slds-media__figure slds-media__figure_reverse'>
                              <Icon
                                icon='check'
                                className='slds-icon slds-icon_x-small slds-icon-text-default'
                              />
                            </span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      );
    };

    // Render search state
    return (
      <FormElement {...formElemProps}>
        <div className={containerClassNames}>
          <div className='slds-form-element__control'>
            <div className='slds-combobox-group'>
              {renderScopeSelection()}
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
                    aria-labelledby={labelId}
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
          </div>
        </div>
      </FormElement>
    );
  },
  { isFormElement: true }
);
