import React, {
  InputHTMLAttributes,
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  Ref,
  useRef,
  useState,
  useEffect,
  ReactNode,
  useId,
  useMemo,
  useCallback,
  FC,
} from 'react';
import classnames from 'classnames';
import { AutoAlign } from './AutoAlign';
import { Button } from './Button';
import { FormElement, FormElementProps } from './FormElement';
import { Icon, IconCategory } from './Icon';
import { Spinner } from './Spinner';
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
  value: string;
  icon: string;
  category?: IconCategory;
};

/**
 * Key handler configuration for keyboard navigation
 */
type KeyHandlerConfig = {
  type: 'search' | 'scope';
  opened: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNavigateDown: () => void;
  onNavigateUp: () => void;
  onSelect: () => void;
  isTabNavigationIgnored: (direction: 'forward' | 'backward') => boolean;
  onTabNavigation: (direction: 'forward' | 'backward') => void;
};

/**
 * Custom hook for keyboard event handling in lookup components
 */
const useKeyHandler = (config: KeyHandlerConfig) => {
  return useEventCallback((e: KeyboardEvent) => {
    const {
      opened,
      onOpen,
      onClose,
      onNavigateDown,
      onNavigateUp,
      onSelect,
      isTabNavigationIgnored,
      onTabNavigation,
    } = config;

    switch (e.keyCode) {
      case 40: // ArrowDown
        e.preventDefault();
        e.stopPropagation();
        if (!opened) {
          onOpen();
        } else {
          onNavigateDown();
        }
        break;
      case 38: // ArrowUp
        e.preventDefault();
        e.stopPropagation();
        if (opened) {
          onNavigateUp();
        }
        break;
      case 13: // Enter
        e.preventDefault();
        e.stopPropagation();
        onSelect();
        break;
      case 27: // Escape
        e.preventDefault();
        e.stopPropagation();
        if (opened) {
          onClose();
        }
        break;
      case 9: // Tab
        if (!isTabNavigationIgnored(e.shiftKey ? 'backward' : 'forward')) {
          e.preventDefault();
          e.stopPropagation();
          onTabNavigation(e.shiftKey ? 'backward' : 'forward');
        } else {
          onClose();
        }
        break;
    }
  });
};

/**
 * Props for LookupSelectedState component
 */
type LookupSelectedStateProps = {
  selected: LookupEntry;
  disabled?: boolean;
  listboxId: string;
  onRemoveSelection: () => void;
};

/**
 * Component for displaying selected state
 */
const LookupSelectedState: FC<LookupSelectedStateProps> = ({
  selected,
  disabled,
  listboxId,
  onRemoveSelection,
}) => {
  return (
    <div className='slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click'>
      <div
        className='slds-combobox__form-element slds-input-has-icon slds-input-has-icon_left-right'
        role='none'
      >
        {selected.icon && (
          <Icon
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
          <span className='slds-assistive-text'>Remove selected option</span>
        </Button>
      </div>
    </div>
  );
};

/**
 * Props for LookupScopeSelectorContainer component
 */
type LookupScopeSelectorContainerProps = {
  scopeListboxId: string;
  autoAlignContentRef: Ref<HTMLElement | null>;
  children: React.ReactNode;
};

/**
 * Container component for scope selector dropdown with AutoAlign
 */
const LookupScopeSelectorContainer: FC<LookupScopeSelectorContainerProps> = ({
  scopeListboxId,
  autoAlignContentRef,
  children,
}) => {
  return (
    <div
      id={scopeListboxId}
      className='slds-dropdown slds-dropdown_length-with-icon-7 slds-dropdown_fluid'
      role='listbox'
      aria-label='Scope Options'
      style={{ left: 0, transform: 'translateX(0)' }}
      ref={useMergeRefs([autoAlignContentRef])}
    >
      {children}
    </div>
  );
};

/**
 * Props for LookupScopeSelector component
 */
type LookupScopeSelectorProps = {
  scopes: LookupScope[];
  targetScope?: string;
  disabled?: boolean;
  scopeListboxId: string;
  getScopeOptionId: (index: number) => string;
  onScopeMenuClick?: () => void;
  onScopeSelect?: (scope: string) => void;
};

/**
 * Component for scope selector in multi-entity lookup
 */
const LookupScopeSelector: FC<LookupScopeSelectorProps> = ({
  scopes,
  targetScope,
  disabled,
  scopeListboxId,
  getScopeOptionId,
  onScopeMenuClick: onScopeMenuClick_,
  onScopeSelect: onScopeSelect_,
}) => {
  const [scopeOpened, setScopeOpened] = useState(false);
  const [scopeFocusedIndex, setScopeFocusedIndex] = useState<number>(-1);

  const currentScope =
    scopes.find((scope) => scope.value === targetScope) ?? scopes[0];

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

      if (!(targetElement instanceof HTMLElement)) {
        return;
      }

      targetElement.focus();
    }
  );

  const onScopeSelect = useEventCallback((scope: string) => {
    setScopeOpened(false);
    onScopeSelect_?.(scope);
  });

  const onScopeMenuClick = useEventCallback(() => {
    setScopeOpened(!scopeOpened);
    onScopeMenuClick_?.();
  });

  const onScopeKeyDown = useKeyHandler({
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
          onScopeSelect(selectedScope.value);
          setScopeOpened(false);
          setScopeFocusedIndex(-1);
        }
      } else {
        setScopeOpened(!scopeOpened);
      }
    },
    isTabNavigationIgnored: (direction) => {
      if (!scopes) {
        return false;
      }

      return (
        scopeFocusedIndex === -1 ||
        (direction === 'backward' && scopeFocusedIndex <= 0) ||
        (direction === 'forward' && scopeFocusedIndex >= scopes.length - 1)
      );
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
          const nextIndex = Math.min(scopeFocusedIndex + 1, scopes.length - 1);
          setScopeFocusedIndex(nextIndex);
          scrollFocusedScopeIntoView(nextIndex);
        }
      }
    },
  });

  const onScopeBlur = useEventCallback((e: FocusEvent) => {
    if (e.relatedTarget !== null) {
      if (!scopes) {
        return;
      }

      const prevIndex = Math.max(scopeFocusedIndex - 1, 0);
      const nextIndex = Math.min(scopeFocusedIndex + 1, scopes.length - 1);

      if (
        e.relatedTarget.id === getScopeOptionId(prevIndex) ||
        e.relatedTarget.id === getScopeOptionId(nextIndex)
      ) {
        // catch keyborad event
        return;
      }
    }

    setTimeout(() => {
      setScopeOpened(false);
    }, 10);
  });

  return (
    <div className='slds-combobox_object-switcher slds-combobox-addon_start'>
      <div className='slds-form-element'>
        <label className='slds-form-element__label slds-assistive-text'>
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
                <div
                  className='slds-is-absolute'
                  style={{
                    top: '50%',
                    transform: 'translateY(-50%)',
                    left: '0.5rem',
                    pointerEvents: 'none',
                    zIndex: SCOPE_INPUT_ZINDEX + 1,
                  }}
                >
                  <Icon
                    category={currentScope.category}
                    icon={currentScope.icon}
                    size='small'
                  />
                </div>
                <input
                  type='text'
                  className='slds-input slds-combobox__input slds-combobox__input-value'
                  style={{
                    paddingLeft: '1.5rem',
                    cursor: !disabled ? 'pointer' : undefined,
                    zIndex: SCOPE_INPUT_ZINDEX,
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
                    zIndex: SCOPE_INPUT_ZINDEX + 1,
                  }}
                >
                  <Icon
                    icon='down'
                    size='x-small'
                    style={{ width: '0.8rem', height: '0.8rem' }}
                  />
                </div>
              </div>
              {scopeOpened && (
                <AutoAlign
                  triggerSelector='.react-slds-lookup'
                  alignmentStyle='menu'
                  portalClassName='slds-lookup-scope'
                >
                  {({ autoAlignContentRef }) => (
                    <LookupScopeSelectorContainer
                      scopeListboxId={scopeListboxId}
                      autoAlignContentRef={autoAlignContentRef}
                    >
                      <ul
                        className='slds-listbox slds-listbox_vertical'
                        role='presentation'
                        onBlur={onScopeBlur}
                        onKeyDown={onScopeKeyDown}
                      >
                        {scopes.map((scope, index) => (
                          <li
                            key={scope.value}
                            role='presentation'
                            className='slds-listbox__item'
                          >
                            <div
                              id={getScopeOptionId(index)}
                              className={classnames(
                                'slds-media slds-media_center slds-listbox__option slds-listbox__option_entity',
                                {
                                  'slds-has-focus': scopeFocusedIndex === index,
                                }
                              )}
                              role='option'
                              aria-selected={scope.value === targetScope}
                              tabIndex={0}
                              onClick={() => onScopeSelect(scope.value)}
                            >
                              <span className='slds-media__figure slds-listbox__option-icon'>
                                {scope.icon && (
                                  <Icon
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
                    </LookupScopeSelectorContainer>
                  )}
                </AutoAlign>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SCOPE_INPUT_ZINDEX = 1;

/**
 * Props for LookupSearchInput component
 */
type LookupSearchInputProps = {
  searchText: string;
  disabled?: boolean;
  opened: boolean;
  focusedValue?: string;
  iconAlign: 'left' | 'right';
  comboboxId?: string;
  listboxId: string;
  optionIdPrefix: string;
  inputRef: Ref<HTMLInputElement>;
  onInputClick: () => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onInputFocus: () => void;
  onInputBlur: (e: FocusEvent) => void;
  onInputKeyDown: (e: KeyboardEvent) => void;
  onSearchIconClick: () => void;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'onBlur' | 'onFocus' | 'onKeyDown' | 'value'
>;

/**
 * Component for search input
 */
const LookupSearchInput: FC<LookupSearchInputProps> = ({
  searchText,
  disabled,
  opened,
  focusedValue,
  iconAlign,
  comboboxId,
  listboxId,
  optionIdPrefix,
  inputRef,
  onInputClick,
  onInputChange,
  onInputFocus,
  onInputBlur,
  onInputKeyDown,
  onSearchIconClick,
  ...rprops
}) => {
  const hasValue = searchText.length > 0;

  const inputClassNames = classnames('slds-input', 'slds-combobox__input', {
    'slds-has-focus': opened,
    'slds-combobox__input-value': hasValue,
  });

  const inputIconClasses =
    iconAlign === 'left'
      ? 'slds-combobox__form-element slds-input-has-icon slds-input-has-icon_left'
      : 'slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right';

  return (
    <div className={inputIconClasses} role='none'>
      {iconAlign === 'left' && (
        <Button
          type='icon'
          icon='search'
          disabled={disabled}
          className={classnames(
            'slds-input__icon',
            `slds-input__icon_${iconAlign}`
          )}
          tabIndex={-1}
          onClick={disabled ? undefined : onSearchIconClick}
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
        onClick={onInputClick}
        onChange={onInputChange}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        onKeyDown={onInputKeyDown}
      />
      {iconAlign === 'right' && (
        <Button
          type='icon'
          icon='search'
          disabled={disabled}
          className={classnames(
            'slds-input__icon',
            `slds-input__icon_${iconAlign}`
          )}
          tabIndex={-1}
          onClick={disabled ? undefined : onSearchIconClick}
        />
      )}
    </div>
  );
};

/**
 * Props for LookupOption component
 */
type LookupOptionProps = {
  entry: LookupEntry;
  isFocused: boolean;
  getOptionId: (value: string) => string;
  onOptionClick: (entry: LookupEntry) => void;
  onOptionFocus: (value: string) => void;
};

/**
 * Component for individual lookup option
 */
const LookupOption: FC<LookupOptionProps> = ({
  entry,
  isFocused,
  getOptionId,
  onOptionClick,
  onOptionFocus,
}) => {
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
    <li key={entry.value} role='presentation' className='slds-listbox__item'>
      <div
        id={getOptionId(entry.value)}
        className={itemClassNames}
        role='option'
        aria-selected={isFocused}
        tabIndex={0}
        onFocus={() => onOptionFocus(entry.value)}
        onClick={() => onOptionClick(entry)}
      >
        <span className='slds-media__figure slds-listbox__option-icon'>
          {entry.icon && (
            <Icon category={entry.category} icon={entry.icon} size='small' />
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
};

/**
 * Props for LookupDropdownContainer component
 */
type LookupDropdownContainerProps = {
  listboxId: string;
  loading?: boolean;
  dropdownRef: Ref<HTMLDivElement>;
  autoAlignContentRef: Ref<HTMLElement | null>;
  children: React.ReactNode;
};

/**
 * Container component for dropdown with merged refs
 */
const LookupDropdownContainer: FC<LookupDropdownContainerProps> = ({
  listboxId,
  loading,
  dropdownRef,
  autoAlignContentRef,
  children,
}) => {
  return (
    <div
      id={listboxId}
      className='slds-dropdown slds-dropdown_length-with-icon-7 slds-dropdown_fluid slds-scrollable_none'
      style={{ maxHeight: LIST_PARENT_MAX_HEIGHT }}
      role='listbox'
      aria-label='Search Results'
      tabIndex={0}
      aria-busy={loading}
      ref={useMergeRefs([dropdownRef, autoAlignContentRef])}
    >
      {children}
    </div>
  );
};

/**
 * Props for LookupDropdown component
 */
type LookupDropdownProps = {
  opened: boolean;
  loading?: boolean;
  listboxId: string;
  dropdownRef: Ref<HTMLDivElement>;
  listHeader?: JSX.Element;
  listHeaderIdSeed: string;
  listFooter?: JSX.Element;
  listFooterIdSeed: string;
  filteredData: LookupEntry[];
  focusedValue?: string;
  getOptionId: (value: string) => string;
  onOptionClick: (entry: LookupEntry) => void;
  onOptionFocus: (value: string) => void;
  onBlur: (e: FocusEvent) => void;
  onKeyDown: (e: KeyboardEvent) => void;
};

/**
 * Component for dropdown menu
 */
const LookupDropdown: FC<LookupDropdownProps> = ({
  opened,
  loading,
  listboxId,
  dropdownRef,
  listHeader,
  listHeaderIdSeed,
  listFooter,
  listFooterIdSeed,
  filteredData,
  focusedValue,
  getOptionId,
  onOptionClick,
  onOptionFocus,
  onBlur,
  onKeyDown,
}) => {
  if (!opened) return null;

  return (
    <AutoAlign
      triggerSelector='.react-slds-lookup'
      alignmentStyle='menu'
      portalClassName='slds-lookup'
    >
      {({ autoAlignContentRef }) => (
        <LookupDropdownContainer
          listboxId={listboxId}
          loading={loading}
          dropdownRef={dropdownRef}
          autoAlignContentRef={autoAlignContentRef}
        >
          {listHeader ? (
            <ul
              className='slds-listbox slds-listbox_vertical'
              role='presentation'
              onKeyDown={onKeyDown}
              onBlur={onBlur}
            >
              <li role='presentation' className='slds-listbox__item'>
                <div
                  id={getOptionId(listHeaderIdSeed)}
                  className='slds-media slds-media_center slds-listbox__option slds-listbox__option_entity slds-listbox__option_term'
                  role='option'
                  aria-selected='true'
                  tabIndex={0}
                  onFocus={() => onOptionFocus(listHeaderIdSeed)}
                >
                  {listHeader}
                </div>
              </li>
            </ul>
          ) : null}
          <ul
            className='slds-listbox slds-listbox_vertical slds-scrollable_y'
            style={{ maxHeight: LIST_CONTENT_MAX_HEIGHT }}
            role='presentation'
            onKeyDown={onKeyDown}
            onBlur={onBlur}
          >
            {filteredData.map((entry) => (
              <LookupOption
                key={entry.value}
                entry={entry}
                isFocused={focusedValue === entry.value}
                getOptionId={getOptionId}
                onOptionClick={onOptionClick}
                onOptionFocus={onOptionFocus}
              />
            ))}
            {loading ? (
              <li role='option' className='slds-listbox__item'>
                <div className='slds-align_absolute-center slds-p-top_medium'>
                  <Spinner container={false} size='x-small' layout='inline' />
                </div>
              </li>
            ) : null}
          </ul>
          {listFooter ? (
            <ul
              className='slds-listbox slds-listbox_vertical'
              role='presentation'
              onKeyDown={onKeyDown}
              onBlur={onBlur}
            >
              <li role='presentation' className='slds-listbox__item'>
                <div
                  id={getOptionId(listFooterIdSeed)}
                  className='slds-media slds-media_center slds-listbox__option slds-listbox__option_entity slds-listbox__option_term'
                  role='option'
                  tabIndex={0}
                  onFocus={() => onOptionFocus(listFooterIdSeed)}
                >
                  {listFooter}
                </div>
              </li>
            </ul>
          ) : null}
        </LookupDropdownContainer>
      )}
    </AutoAlign>
  );
};

// manually replaces where `max-height` is specified
const LIST_PARENT_MAX_HEIGHT = 'unset';
const LIST_CONTENT_MAX_HEIGHT = 'calc((1.5rem + 1rem) * 7)'; // copied from `.slds-dropdown_length-with-icon-7`

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
    const comboboxId = id_ ?? `${fallbackId}-combobox`;
    const listboxId = `${fallbackId}-listbox`;

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
        (scopes && scopes.length > 0 ? scopes[0].value : undefined)
    );
    const [focusedValue, setFocusedValue] = useState<string | undefined>();

    const listHeaderIdSeed = useMemo(
      () => [...data.map((entry) => entry.value), 'header'].join('-'),
      [data]
    );
    const listFooterIdSeed = useMemo(
      () => [...data.map((entry) => entry.value), 'footer'].join('-'),
      [data]
    );

    // Memoized option values - filtered data with optional header and footer
    const optionValues = useMemo(() => {
      const filteredData = lookupFilter
        ? data.filter((entry) => lookupFilter(entry, searchText, targetScope))
        : data;
      return [
        listHeader ? listHeaderIdSeed : undefined,
        ...filteredData.map((entry) => entry.value),
        listFooter ? listFooterIdSeed : undefined,
      ].filter((value) => value !== undefined);
    }, [
      data,
      lookupFilter,
      searchText,
      targetScope,
      listHeader,
      listHeaderIdSeed,
      listFooter,
      listFooterIdSeed,
    ]);

    // Get next option value for keyboard navigation
    const getNextValue = useCallback(
      (currentValue?: string) => {
        if (optionValues.length === 0) return undefined;

        if (!currentValue) return optionValues[0];

        const currentIndex = optionValues.indexOf(currentValue);
        return optionValues[
          Math.min(currentIndex + 1, optionValues.length - 1)
        ]; // not wrap around
      },
      [optionValues]
    );

    // Get previous option value for keyboard navigation
    const getPrevValue = useCallback(
      (currentValue?: string) => {
        if (optionValues.length === 0) return undefined;

        if (!currentValue) return optionValues[optionValues.length - 1];

        const currentIndex = optionValues.indexOf(currentValue);
        return optionValues[Math.max(currentIndex - 1, 0)]; // not wrap around
      },
      [optionValues]
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

        if (!(targetElement instanceof HTMLElement)) {
          return;
        }

        targetElement.focus();
      }
    );

    // Set initial focus when dropdown opens
    useEffect(() => {
      if (!opened) {
        setFocusedValue(undefined);
      }
    }, [opened, optionValues, focusedValue, scrollFocusedElementIntoView]);

    const elRef = useRef<HTMLDivElement | null>(null);
    const elementRef = useMergeRefs([elRef, elementRef_]);
    const inputElRef = useRef<HTMLInputElement | null>(null);
    const inputRef = useMergeRefs([inputElRef, inputRef_]);
    const dropdownElRef = useRef<HTMLDivElement | null>(null);
    const dropdownRef = useMergeRefs([dropdownElRef, dropdownRef_]);

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

    const onInputClick = useEventCallback(() => {
      onFocus_?.();
    });

    const onInputChange = useEventCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const newSearchText = e.target.value;
        onSearchTextChange(newSearchText);

        setOpened(true);
        onLookupRequest_?.(newSearchText);
      }
    );

    const onInputFocus = useEventCallback(() => {
      onFocus_?.();
    });

    const onInputBlur = useEventCallback((e: FocusEvent) => {
      if (e.relatedTarget !== null) {
        const prevValue = getPrevValue(focusedValue);
        const nextValue = getNextValue(focusedValue);

        if (
          (prevValue && e.relatedTarget.id === getOptionId(prevValue)) ||
          (nextValue && e.relatedTarget.id === getOptionId(nextValue))
        ) {
          // catch keyborad event
          return;
        }
      }

      const isComplete = !containerRef.current?.contains(e.relatedTarget);

      setTimeout(() => {
        setOpened(false);
        onBlur_?.();

        if (isComplete) {
          onComplete?.(true);
        }
      }, 10);
    });

    const onInputKeyDown = useKeyHandler({
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
      isTabNavigationIgnored: (direction) => {
        const currentIndex = focusedValue
          ? optionValues.indexOf(focusedValue)
          : -1;

        return (
          currentIndex === -1 ||
          (direction === 'backward' && currentIndex <= 0) ||
          (direction === 'forward' && currentIndex >= optionValues.length - 1)
        );
      },
      onTabNavigation: (direction) => {
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
    });

    const onOptionClick = useEventCallback((entry: LookupEntry) => {
      onSelect(entry);
      setOpened(false);
      setTimeout(() => {
        inputElRef.current?.focus();
        onComplete?.();
      }, 10);
    });

    const onOptionFocus = useEventCallback((value: string) => {
      setFocusedValue(value);
    });

    const onSearchIconClick = useEventCallback(() => {
      inputElRef.current?.focus();

      setOpened(true);
      onLookupRequest_?.(searchText);
    });

    const onRemoveSelection = useEventCallback(() => {
      onSelect(null);
      setSearchText('');
      setOpened(true);
      onLookupRequest_?.('');
      setTimeout(() => {
        inputElRef.current?.focus();
      }, 10);
    });

    const hasSelection = selected != null;

    const containerRef = useRef<HTMLDivElement | null>(null);
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

    const formElemProps = {
      controlId: comboboxId,
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

    // Render selected state
    if (hasSelection && selected) {
      return (
        <FormElement {...formElemProps}>
          <div ref={containerRef} className={containerClassNames}>
            <LookupSelectedState
              selected={selected}
              disabled={disabled}
              listboxId={listboxId}
              onRemoveSelection={onRemoveSelection}
            />
          </div>
        </FormElement>
      );
    }

    // Render search state with optional scope selector
    if (scopes && scopes.length > 0) {
      // Multi Entity Lookup with scope selector
      return (
        <FormElement {...formElemProps}>
          <div ref={containerRef} className={containerClassNames}>
            <div className='slds-combobox-group'>
              <LookupScopeSelector
                scopes={scopes}
                targetScope={targetScope}
                disabled={disabled}
                scopeListboxId={scopeListboxId}
                getScopeOptionId={getScopeOptionId}
                onScopeMenuClick={onScopeMenuClick_}
                onScopeSelect={(scope) => {
                  setTargetScope(scope);
                  onScopeSelect_?.(scope);
                }}
              />
              <div className='slds-combobox_container slds-combobox-addon_end'>
                <div className={comboboxClassNames} ref={elementRef}>
                  <LookupSearchInput
                    {...rprops}
                    searchText={searchText}
                    disabled={disabled}
                    opened={opened}
                    focusedValue={focusedValue}
                    iconAlign={iconAlign}
                    comboboxId={comboboxId}
                    listboxId={listboxId}
                    optionIdPrefix={optionIdPrefix}
                    inputRef={inputRef}
                    onInputClick={onInputClick}
                    onInputChange={onInputChange}
                    onInputFocus={onInputFocus}
                    onInputBlur={onInputBlur}
                    onInputKeyDown={onInputKeyDown}
                    onSearchIconClick={onSearchIconClick}
                  />
                </div>
              </div>
            </div>
            <LookupDropdown
              opened={opened}
              loading={loading}
              listboxId={listboxId}
              dropdownRef={dropdownRef}
              listHeader={listHeader}
              listHeaderIdSeed={listHeaderIdSeed}
              listFooter={listFooter}
              listFooterIdSeed={listFooterIdSeed}
              filteredData={filteredData}
              focusedValue={focusedValue}
              getOptionId={getOptionId}
              onOptionClick={onOptionClick}
              onOptionFocus={onOptionFocus}
              onBlur={onInputBlur}
              onKeyDown={onInputKeyDown}
            />
          </div>
        </FormElement>
      );
    }

    // Render simple search state (no scopes)
    return (
      <FormElement {...formElemProps}>
        <div ref={containerRef} className={containerClassNames}>
          <div className={comboboxClassNames} ref={elementRef}>
            <LookupSearchInput
              {...rprops}
              searchText={searchText}
              disabled={disabled}
              opened={opened}
              focusedValue={focusedValue}
              iconAlign={iconAlign}
              comboboxId={comboboxId}
              listboxId={listboxId}
              optionIdPrefix={optionIdPrefix}
              inputRef={inputRef}
              onInputClick={onInputClick}
              onInputChange={onInputChange}
              onInputFocus={onInputFocus}
              onInputBlur={onInputBlur}
              onInputKeyDown={onInputKeyDown}
              onSearchIconClick={onSearchIconClick}
            />
          </div>
          <LookupDropdown
            opened={opened}
            loading={loading}
            listboxId={listboxId}
            dropdownRef={dropdownRef}
            listHeader={listHeader}
            listHeaderIdSeed={listHeaderIdSeed}
            listFooter={listFooter}
            listFooterIdSeed={listFooterIdSeed}
            filteredData={filteredData}
            focusedValue={focusedValue}
            getOptionId={getOptionId}
            onOptionClick={onOptionClick}
            onOptionFocus={onOptionFocus}
            onBlur={onInputBlur}
            onKeyDown={onInputKeyDown}
          />
        </div>
      </FormElement>
    );
  },
  { isFormElement: true }
);
