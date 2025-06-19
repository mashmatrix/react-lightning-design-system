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
import { Button } from './Button';
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
  iconAlign?: 'left' | 'right';

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
  tooltip?: ReactNode;
  tooltipIcon?: string;

  // Multi Entity Lookup (scope) props
  scopes?: LookupScope[];
  targetScope?: string;
  defaultTargetScope?: string;
  cols?: number;

  elementRef?: Ref<HTMLDivElement>;
  inputRef?: Ref<HTMLInputElement>;
  dropdownRef?: Ref<HTMLDivElement>;

  onSearchTextChange?: (searchText: string) => void;
  onScopeMenuClick?: () => void;
  onScopeSelect?: (scope: string) => void;
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
      // Icon alignment
      iconAlign = 'right',
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
    const comboboxId = id_ && `${fallbackId}-combobox`;
    const listboxId = `${fallbackId}-listbox`;

    const labelId = label ? `${comboboxId}-label` : undefined;
    const scopeId = `${comboboxId}-scope`;

    const optionIdPrefix = `${comboboxId}-option`;
    const getOptionId = (value: string) => `${optionIdPrefix}-${value}`;

    const scopeListboxId = `${comboboxId}-scope-listbox`;
    const getScopeOptionId = (index: number) =>
      `${scopeListboxId}-option-${index}`;

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
    const [targetScope, setTargetScope] = useControlledValue(
      targetScope_,
      defaultTargetScope ??
        (scopes && scopes.length > 0 ? scopes[0].label : undefined)
    );
    const [focusedValue, setFocusedValue] = useState<string | undefined>();
    const [scopeOpened, setScopeOpened] = useState(false);
    const [scopeFocusedIndex, setScopeFocusedIndex] = useState<number>(-1);

    const { getActiveElement } = useContext(ComponentSettingsContext);

    // Get option values from data
    const getOptionValues = useCallback(() => {
      const filteredData = lookupFilter
        ? data.filter((entry) => lookupFilter(entry, searchText, targetScope))
        : data;
      return filteredData.map((entry) => entry.value);
    }, [data, lookupFilter, searchText, targetScope]);

    // Get next option value for keyboard navigation
    const getNextValue = useCallback(
      (currentValue?: string) => {
        const optionValues = getOptionValues();
        if (optionValues.length === 0) return undefined;

        if (!currentValue) return optionValues[0];

        const currentIndex = optionValues.indexOf(currentValue);
        return optionValues[
          Math.min(currentIndex + 1, optionValues.length - 1)
        ]; // not wrap around
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
        return optionValues[Math.max(currentIndex - 1, 0)]; // not wrap around
      },
      [getOptionValues]
    );

    // Common scroll utility
    const scrollElementIntoView = useEventCallback(
      (container: Element, targetElement: Element) => {
        if (!(targetElement instanceof HTMLElement)) {
          return;
        }

        // Calculate element position within container
        const elementTopPosition = targetElement.offsetTop;
        const elementBottomPosition =
          elementTopPosition + targetElement.offsetHeight;

        // Calculate currently visible area
        const currentScrollPosition = container.scrollTop;
        const visibleAreaHeight = container.clientHeight;
        const visibleAreaTop = currentScrollPosition;
        const visibleAreaBottom = currentScrollPosition + visibleAreaHeight;

        // Check if element is outside the visible area
        const isAbove = elementTopPosition < visibleAreaTop;
        const isBelow = elementBottomPosition > visibleAreaBottom;

        // Scroll only if element is not currently visible
        if (isAbove || isBelow) {
          targetElement.scrollIntoView({
            block: 'center',
          });
        }
      }
    );

    // Scroll focused element into view
    const scrollFocusedElementIntoView = useEventCallback(
      (nextFocusedValue: string | undefined) => {
        if (!nextFocusedValue || !dropdownElRef.current) {
          return;
        }

        const dropdownContainer = dropdownElRef.current;
        const targetElement = dropdownContainer.querySelector(
          `#${CSS.escape(getOptionId(nextFocusedValue))}`
        );

        if (targetElement) {
          scrollElementIntoView(dropdownContainer, targetElement);
        }
      }
    );

    // Scroll focused scope element into view
    const scrollFocusedScopeIntoView = useEventCallback(
      (nextFocusedIndex: number) => {
        if (nextFocusedIndex < 0 || !scopes) {
          return;
        }

        const scopeDropdown = document.getElementById(scopeListboxId);
        if (!scopeDropdown) {
          return;
        }

        const targetElement = scopeDropdown.querySelector(
          `#${CSS.escape(getScopeOptionId(nextFocusedIndex))}`
        );

        if (targetElement) {
          scrollElementIntoView(scopeDropdown, targetElement);
        }
      }
    );

    // Set initial focus when dropdown opens
    useEffect(() => {
      if (opened && !focusedValue) {
        const initialFocus = getOptionValues()[0];
        setFocusedValue(initialFocus);
        scrollFocusedElementIntoView(initialFocus);
      } else if (!opened) {
        setFocusedValue(undefined);
      }
    }, [opened, getOptionValues, focusedValue, scrollFocusedElementIntoView]);

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

    // Common keyboard handler utility
    const createKeyHandler = useCallback(
      (config: {
        type: 'search' | 'scope';
        opened: boolean;
        onOpen: () => void;
        onClose: () => void;
        onNavigateDown: () => void;
        onNavigateUp: () => void;
        onSelect: () => void;
        onTabNavigation?: (direction: 'forward' | 'backward') => void;
      }) => {
        return (e: KeyboardEvent<HTMLInputElement>) => {
          if (e.keyCode === 40) {
            // down
            e.preventDefault();
            e.stopPropagation();
            if (!config.opened) {
              config.onOpen();
            } else {
              config.onNavigateDown();
            }
          } else if (e.keyCode === 38) {
            // up
            e.preventDefault();
            e.stopPropagation();
            if (!config.opened) {
              config.onOpen();
            } else {
              config.onNavigateUp();
            }
          } else if (e.keyCode === 9 && config.onTabNavigation) {
            // Tab or Shift+Tab
            if (config.opened) {
              e.preventDefault();
              e.stopPropagation();
              config.onTabNavigation(e.shiftKey ? 'backward' : 'forward');
            }
          } else if (e.keyCode === 27) {
            // ESC
            e.preventDefault();
            e.stopPropagation();
            config.onClose();
          } else if (e.keyCode === 13) {
            // Enter
            e.preventDefault();
            e.stopPropagation();
            config.onSelect();
          }
        };
      },
      []
    );

    const onInputKeyDown = useEventCallback(
      createKeyHandler({
        type: 'search',
        opened,
        onOpen: () => {
          setOpened(true);
          onLookupRequest_?.(searchText);
        },
        onClose: () => {
          setOpened(false);
          onComplete?.(true);
        },
        onNavigateDown: () => {
          const nextValue = getNextValue(focusedValue);
          setFocusedValue(nextValue);
          scrollFocusedElementIntoView(nextValue);
        },
        onNavigateUp: () => {
          const prevValue = getPrevValue(focusedValue);
          setFocusedValue(prevValue);
          scrollFocusedElementIntoView(prevValue);
        },
        onSelect: () => {
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
        },
        onTabNavigation: (direction) => {
          const optionValues = getOptionValues();
          const currentIndex = focusedValue
            ? optionValues.indexOf(focusedValue)
            : -1;

          if (direction === 'backward') {
            if (currentIndex <= 0) {
              setOpened(false);
              onComplete?.();
            } else {
              const prevValue = getPrevValue(focusedValue);
              setFocusedValue(prevValue);
              scrollFocusedElementIntoView(prevValue);
            }
          } else {
            if (currentIndex >= optionValues.length - 1) {
              setOpened(false);
              onComplete?.();
            } else {
              const nextValue = getNextValue(focusedValue);
              setFocusedValue(nextValue);
              scrollFocusedElementIntoView(nextValue);
            }
          }
        },
      })
    );

    const onOptionClick = useEventCallback((entry: LookupEntry) => {
      onSelect(entry);
      setOpened(false);
      setTimeout(() => {
        inputElRef.current?.focus();
        onComplete?.();
      }, 10);
    });

    const onRemoveSelection = useEventCallback(() => {
      onSelect(null);
      setSearchText('');
      setTimeout(() => {
        inputElRef.current?.focus();
      }, 10);
    });

    const onScopeSelect = useEventCallback((scope: string) => {
      setTargetScope(scope);
      setScopeOpened(false);
      onScopeSelect_?.(scope);
    });

    const onScopeMenuClick = useEventCallback(() => {
      setScopeOpened(!scopeOpened);
      onScopeMenuClick_?.();
    });

    const onScopeKeyDown = useEventCallback(
      createKeyHandler({
        type: 'scope',
        opened: scopeOpened,
        onOpen: () => {
          if (!scopes) return;
          setScopeOpened(true);
          setScopeFocusedIndex(0);
        },
        onClose: () => {
          setScopeOpened(false);
          setScopeFocusedIndex(-1);
        },
        onNavigateDown: () => {
          if (!scopes) return;
          const nextIndex = Math.min(scopeFocusedIndex + 1, scopes.length - 1);
          setScopeFocusedIndex(nextIndex);
          scrollFocusedScopeIntoView(nextIndex);
        },
        onNavigateUp: () => {
          if (!scopes) return;
          const prevIndex = Math.max(scopeFocusedIndex - 1, 0);
          setScopeFocusedIndex(prevIndex);
          scrollFocusedScopeIntoView(prevIndex);
        },
        onSelect: () => {
          if (!scopes) return;
          if (scopeOpened && scopeFocusedIndex >= 0) {
            const selectedScope = scopes[scopeFocusedIndex];
            if (selectedScope) {
              onScopeSelect(selectedScope.label);
              setScopeOpened(false);
              setScopeFocusedIndex(-1);
            }
          } else {
            setScopeOpened(!scopeOpened);
          }
        },
        onTabNavigation: (direction) => {
          if (!scopes) return;
          if (direction === 'backward') {
            if (scopeFocusedIndex <= 0) {
              setScopeOpened(false);
              setScopeFocusedIndex(-1);
            } else {
              const prevIndex = Math.max(scopeFocusedIndex - 1, 0);
              setScopeFocusedIndex(prevIndex);
              scrollFocusedScopeIntoView(prevIndex);
            }
          } else {
            if (scopeFocusedIndex >= scopes.length - 1) {
              setScopeOpened(false);
              setScopeFocusedIndex(-1);
            } else {
              const nextIndex = Math.min(
                scopeFocusedIndex + 1,
                scopes.length - 1
              );
              setScopeFocusedIndex(nextIndex);
              scrollFocusedScopeIntoView(nextIndex);
            }
          }
        },
      })
    );

    const onScopeBlur = useEventCallback(() => {
      setTimeout(() => {
        setScopeOpened(false);
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
      ? data.filter((entry) => lookupFilter(entry, searchText, targetScope))
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
              id={getOptionId(entry.value)}
              className={itemClassNames}
              role='option'
              aria-selected={isFocused}
              onClick={() => onOptionClick(entry)}
            >
              <span className='slds-media__figure slds-listbox__option-icon'>
                {entry.icon && (
                  <Icon
                    container={true}
                    category={entry.category}
                    icon={entry.icon}
                    size='small'
                  />
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

    // Render selected state
    if (hasSelection && selected) {
      return (
        <FormElement {...formElemProps}>
          <div className={containerClassNames}>
            <div className={comboboxClassNames} ref={elementRef}>
              <div
                className='slds-combobox__form-element slds-input-has-icon slds-input-has-icon_left-right'
                role='none'
              >
                {selected.icon && (
                  <Icon
                    container={true}
                    containerClassName='slds-combobox__input-entity-icon'
                    category={selected.category}
                    icon={selected.icon}
                    size='small'
                  />
                )}
                <div
                  role='combobox'
                  tabIndex={disabled ? -1 : 0}
                  className='slds-input_faux slds-combobox__input slds-combobox__input-value'
                  aria-labelledby={labelId}
                  aria-controls={listboxId}
                  aria-haspopup='listbox'
                  aria-expanded='false'
                >
                  <span className='slds-truncate'>{selected.label}</span>
                </div>
                <Button
                  type='icon'
                  icon='close'
                  className='slds-input__icon slds-input__icon_right'
                  title='Remove selected option'
                  onClick={onRemoveSelection}
                >
                  <span className='slds-assistive-text'>
                    Remove selected option
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </FormElement>
      );
    }

    // Render search state with optional scope selector
    if (scopes && scopes.length > 0) {
      // Multi Entity Lookup with scope selector
      return (
        <FormElement {...formElemProps}>
          <div className={containerClassNames}>
            <div className='slds-combobox-group'>
              <div className='slds-combobox_object-switcher slds-combobox-addon_start'>
                <div className='slds-form-element'>
                  <label
                    className='slds-form-element__label slds-assistive-text'
                    htmlFor={scopeId}
                  >
                    Filter Search by:
                  </label>
                  <div className='slds-form-element__control'>
                    <div className='slds-combobox_container slds-has-icon-only'>
                      <div
                        className={classnames(
                          'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click',
                          {
                            'slds-is-open': scopeOpened,
                          }
                        )}
                      >
                        <div
                          className='slds-combobox__form-element slds-input-has-icon slds-input-has-icon_left-right'
                          role='none'
                        >
                          {(() => {
                            const currentScope = scopes.find(
                              (scope) => scope.label === targetScope
                            );
                            return currentScope?.icon ? (
                              <div
                                className='slds-is-absolute'
                                style={{
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  left: '0.5rem',
                                  pointerEvents: 'none',
                                }}
                              >
                                <Icon
                                  container={true}
                                  category={currentScope.category}
                                  icon={currentScope.icon}
                                  size='small'
                                />
                              </div>
                            ) : null;
                          })()}
                          <input
                            type='text'
                            className='slds-input slds-combobox__input slds-combobox__input-value'
                            style={{
                              paddingLeft: '1.5rem',
                              background: 'transparent',
                              cursor: 'pointer',
                            }}
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
                            onKeyDown={onScopeKeyDown}
                            readOnly
                          />
                          <div
                            className='slds-is-absolute'
                            style={{
                              bottom: '0.2rem',
                              right: '0.55rem',
                              pointerEvents: 'none',
                            }}
                          >
                            <Icon
                              container={true}
                              icon='down'
                              size='x-small'
                              style={{ width: '0.8rem', height: '0.8rem' }}
                            />
                          </div>
                        </div>
                        {scopeOpened && (
                          <div
                            id={scopeListboxId}
                            className='slds-dropdown slds-dropdown_length-with-icon-7 slds-dropdown_fluid'
                            role='listbox'
                            aria-label='Scope Options'
                            style={{ left: 0, transform: 'translateX(0)' }}
                          >
                            <ul
                              className='slds-listbox slds-listbox_vertical'
                              role='presentation'
                            >
                              {scopes.map((scope, index) => (
                                <li
                                  key={scope.label}
                                  role='presentation'
                                  className='slds-listbox__item'
                                >
                                  <div
                                    id={getScopeOptionId(index)}
                                    className={classnames(
                                      'slds-media slds-media_center slds-listbox__option slds-listbox__option_entity',
                                      {
                                        'slds-has-focus':
                                          scopeFocusedIndex === index,
                                      }
                                    )}
                                    role='option'
                                    aria-selected={scope.label === targetScope}
                                    onClick={() => onScopeSelect(scope.label)}
                                  >
                                    <span className='slds-media__figure slds-listbox__option-icon'>
                                      {scope.icon && (
                                        <Icon
                                          container={true}
                                          category={scope.category}
                                          icon={scope.icon}
                                          size='small'
                                        />
                                      )}
                                    </span>
                                    <span className='slds-media__body'>
                                      <span className='slds-listbox__option-text slds-listbox__option-text_entity'>
                                        {scope.label}
                                      </span>
                                    </span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='slds-combobox_container slds-combobox-addon_end'>
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
                        focusedValue
                          ? `${optionIdPrefix}-${focusedValue}`
                          : undefined
                      }
                      autoComplete='off'
                      role='combobox'
                      onChange={onInputChange}
                      onFocus={onInputFocus}
                      onBlur={onInputBlur}
                      onKeyDown={onInputKeyDown}
                    />
                    <Icon
                      container={true}
                      containerClassName={classnames(
                        'slds-input__icon',
                        'slds-input__icon_right'
                      )}
                      category='utility'
                      icon='search'
                      size='x-small'
                    />
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
    }

    // Render simple search state (no scopes)
    const inputIconClasses =
      iconAlign === 'left'
        ? 'slds-combobox__form-element slds-input-has-icon slds-input-has-icon_left'
        : 'slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right';

    return (
      <FormElement {...formElemProps}>
        <div className={containerClassNames}>
          <div className={comboboxClassNames} ref={elementRef}>
            <div className={inputIconClasses} role='none'>
              {iconAlign === 'left' && (
                <Icon
                  container={true}
                  containerClassName={classnames(
                    'slds-input__icon',
                    `slds-input__icon_${iconAlign}`
                  )}
                  category='utility'
                  icon='search'
                  size='x-small'
                />
              )}
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
                  focusedValue ? `${optionIdPrefix}-${focusedValue}` : undefined
                }
                autoComplete='off'
                role='combobox'
                onChange={onInputChange}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                onKeyDown={onInputKeyDown}
              />
              {iconAlign === 'right' && (
                <Icon
                  container={true}
                  containerClassName={classnames(
                    'slds-input__icon',
                    `slds-input__icon_${iconAlign}`
                  )}
                  category='utility'
                  icon='search'
                  size='x-small'
                />
              )}
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
