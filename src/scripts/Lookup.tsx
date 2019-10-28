import React, { Component } from 'react';
import classnames from 'classnames';
import { autoAlign, InjectedProps } from './AutoAlign';
import { FormElement, FormElementProps } from './FormElement';
import { Input } from './Input';
import { Icon, IconCategory } from './Icon';
import { Spinner } from './Spinner';
import { Pill } from './Pill';
import { DropdownButton } from './DropdownButton';
import { DropdownMenuItem } from './DropdownMenu';
import { uuid, isElInChildren, registerStyle } from './util';

/**
 *
 */
export type LookupEntry = {
  scope?: string;
  category?: IconCategory;
  icon: string;
  label: string;
  value: string;
  meta?: string;
};

export type LookupSelectionProps = {
  id?: string;
  selected?: LookupEntry;
  hidden?: boolean;
  onResetSelection?: (e?: any) => void;
  lookupSelectionRef?: (node: HTMLDivElement) => void;
};

/**
 *
 */
export class LookupSelection extends Component<LookupSelectionProps> {
  pill: HTMLElement | null = null;

  onKeyDown(e: any) {
    if (e.keyCode === 8 || e.keyCode === 46) {
      // Bacspace / DEL
      e.preventDefault();
      e.stopPropagation();
      if (this.props.onResetSelection) {
        this.props.onResetSelection();
      }
    }
  }

  renderPill(selected: LookupEntry) {
    const onPillClick = (e: any) => {
      e.target.focus();
      e.preventDefault();
      e.stopPropagation();
    };
    return (
      <Pill
        id={this.props.id}
        truncate
        pillRef={(node) => (this.pill = node)}
        onKeyDown={this.onKeyDown.bind(this)}
        onClick={onPillClick}
        tabIndex={0}
        icon={
          selected.icon
            ? {
                category: selected.category,
                icon: selected.icon,
              }
            : undefined
        }
        label={selected.label}
        onRemove={this.props.onResetSelection}
      />
    );
  }

  render() {
    const { hidden, selected, lookupSelectionRef } = this.props;
    const lookupClassNames = classnames({ 'slds-hide': hidden });
    return (
      <div ref={lookupSelectionRef} className={lookupClassNames}>
        <div className='slds-pill__container'>
          {selected ? this.renderPill(selected) : undefined}
        </div>
      </div>
    );
  }
}

export type LookupScope = {
  label: string;
  value: string;
  icon: string;
};

export type LookupSearchProps = {
  id?: string;
  className?: string;
  hidden?: boolean;
  searchText?: string;
  scopes?: LookupScope[];
  targetScope?: any;
  iconAlign?: 'left' | 'right';
  disabled?: boolean;
  onKeyDown?: (e: any) => void;
  onBlur?: (e: any) => void;
  onChange?: (searchText: string) => void;
  onScopeMenuClick?: (e: any) => void;
  onScopeChange?: (value: string) => void;
  onPressDown?: () => void;
  onSubmit?: () => void;
  onComplete?: (cancel?: boolean) => void;
  lookupSearchRef?: (node: HTMLDivElement) => void;
};

/**
 *
 */
export class LookupSearch extends Component<LookupSearchProps> {
  input: HTMLInputElement | null = null;

  node: HTMLDivElement | null = null;

  constructor(props: Readonly<LookupSearchProps>) {
    super(props);
    /* eslint-disable max-len */
    registerStyle('lookupSearch', [
      [
        '.slds-lookup[data-scope="multi"] .react-slds-lookup-scope-selector',
        '{ min-width: 3rem; }',
      ],
      [
        '.slds-lookup[data-scope="multi"] .react-slds-lookup-scope-selector .slds-dropdown-trigger',
        '{ margin-left: 0; }',
      ],
      [
        '.slds-lookup[data-scope="multi"] .react-slds-lookup-scope-selector .slds-dropdown-trigger .slds-button',
        '{ padding: 0 0.25rem; }',
      ],
      [
        '.slds-lookup[data-scope="multi"] .slds-box--border',
        '{ background-color: white; }',
      ],
      [
        '.slds-lookup[data-scope="multi"] .slds-box--border.react-slds-box-disabled',
        '{ background-color: #e0e5ee; border-color: #a8b7c7; cursor: not-allowed; }',
      ],
      [
        '.slds-lookup[data-scope="multi"] .slds-box--border .slds-input--bare',
        '{ height: 2.15rem; width: 100%; }',
      ],
    ]);
  }

  onLookupIconClick = () => {
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  };

  onInputKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      // return key
      e.preventDefault();
      e.stopPropagation();
      const searchText = e.target.value;
      if (searchText) {
        if (this.props.onSubmit) {
          this.props.onSubmit();
        }
      } else if (this.props.onComplete) {
        // if no search text, quit lookup search
        this.props.onComplete();
      }
    } else if (e.keyCode === 40) {
      // down key
      e.preventDefault();
      e.stopPropagation();
      if (this.props.onPressDown) {
        this.props.onPressDown();
      }
    } else if (e.keyCode === 27) {
      // ESC
      e.preventDefault();
      e.stopPropagation();
      // quit lookup search (cancel)
      const cancel = true;
      if (this.props.onComplete) {
        this.props.onComplete(cancel);
      }
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  };

  onInputChange = (e: any) => {
    const searchText = e.target.value;
    if (this.props.onChange) {
      this.props.onChange(searchText);
    }
  };

  onInputBlur = (e: any) => {
    setTimeout(() => {
      if (!this.isFocusedInComponent()) {
        if (this.props.onBlur) {
          this.props.onBlur(e);
        }
      }
    }, 10);
  };

  onScopeMenuClick = (e: any) => {
    if (this.props.onScopeMenuClick) {
      this.props.onScopeMenuClick(e);
    }
  };

  onMenuItemClick = (scope: LookupScope) => {
    if (this.props.onScopeChange) {
      this.props.onScopeChange(scope.value);
    }
  };

  handleLookupSearchRef = (node: HTMLDivElement) => {
    this.node = node;
    const { lookupSearchRef } = this.props;
    if (lookupSearchRef) {
      lookupSearchRef(node);
    }
  };

  isFocusedInComponent() {
    return isElInChildren(this.node, document.activeElement);
  }

  renderSearchInput(props: any) {
    const { className, hidden, searchText, iconAlign = 'right' } = props;
    const searchInputClassNames = classnames(
      'slds-grid',
      'slds-input-has-icon',
      `slds-input-has-icon--${iconAlign}`,
      { 'slds-hide': hidden },
      className
    );
    const pprops = Object.assign({}, props);
    delete pprops.iconAlign;
    delete pprops.searchText;
    delete pprops.targetScope;
    delete pprops.onScopeMenuClick;
    delete pprops.onScopeChange;
    delete pprops.onPressDown;
    delete pprops.onComplete;
    delete pprops.defaultTargetScope;
    delete pprops.onSearchTextChange;
    delete pprops.scopes;
    delete pprops.onLookupRequest;
    delete pprops.defaultSearchText;
    delete pprops.onValueChange;
    delete pprops.lookupSearchRef;
    return (
      <div ref={this.handleLookupSearchRef} className={searchInputClassNames}>
        <Input
          {...pprops}
          inputRef={(node) => (this.input = node)}
          value={searchText}
          onKeyDown={this.onInputKeyDown}
          onChange={this.onInputChange}
          onBlur={this.onInputBlur}
        />
        <span
          tabIndex={-1}
          style={
            props.disabled
              ? undefined
              : { position: 'relative', cursor: 'pointer', outline: 'none' }
          }
          onClick={props.disabled ? undefined : this.onLookupIconClick}
          onBlur={this.onInputBlur}
        >
          <Icon icon='search' className='slds-input__icon' />
        </span>
      </div>
    );
  }

  renderScopeSelector({ scopes, targetScope: target, disabled }: any) {
    let targetScope = scopes[0] || {};
    for (const scope of scopes) {
      if (scope.value === target) {
        targetScope = scope;
        break;
      }
    }
    const icon = <Icon icon={targetScope.icon || 'none'} size='x-small' />;
    const selectorClassNames = classnames(
      'slds-grid',
      'slds-grid--align-center',
      'slds-grid--vertical-align-center',
      'react-slds-lookup-scope-selector'
    );
    return (
      <div className={selectorClassNames}>
        <DropdownButton
          label={icon}
          disabled={disabled}
          onClick={this.onScopeMenuClick}
          onMenuItemClick={this.onMenuItemClick}
          onBlur={this.onInputBlur}
        >
          {scopes.map((scope: LookupScope) => (
            <DropdownMenuItem key={scope.value} {...scope} />
          ))}
        </DropdownButton>
      </div>
    );
  }

  render() {
    const { scopes, hidden, disabled, targetScope, ...props } = this.props;
    if (scopes) {
      const lookupSearchClassNames = classnames(
        'slds-grid',
        'slds-form-element__control',
        'slds-box--border',
        { 'react-slds-box-disabled': disabled },
        { 'slds-hide': hidden }
      );
      const styles = {
        WebkitFlexWrap: 'nowrap' as const,
        msFlexWrap: 'nowrap',
        flexWrap: 'nowrap' as const,
      };
      return (
        <div
          ref={this.handleLookupSearchRef}
          className={lookupSearchClassNames}
          style={styles}
        >
          {this.renderScopeSelector({ scopes, targetScope, disabled })}
          {this.renderSearchInput({
            ...props,
            disabled,
            className: 'slds-col',
            bare: true,
          })}
        </div>
      );
    }
    return this.renderSearchInput(this.props);
  }
}

export type LookupCandidateListProps = {
  data?: LookupEntry[];
  focus?: boolean;
  loading?: boolean;
  filter?: (entry: LookupEntry) => boolean;
  listRef?: (node: HTMLDivElement) => void;
  onSelect?: (entry: LookupEntry | null) => void;
  onBlur?: (e: React.FocusEvent<HTMLAnchorElement>) => void;
  header?: JSX.Element;
  footer?: JSX.Element;
} & InjectedProps;

/**
 *
 */
class LookupCandidateList extends Component<LookupCandidateListProps> {
  node: HTMLDivElement | null = null;

  componentDidMount() {
    if (this.props.focus) {
      this.focusToTargetItemEl(0);
    }
  }

  componentDidUpdate(prevProps: Readonly<LookupCandidateListProps>) {
    if (this.props.focus && !prevProps.focus) {
      setTimeout(() => {
        this.focusToTargetItemEl(0);
      }, 10);
    }
  }

  onSelect(entry: LookupEntry | null) {
    if (this.props.onSelect) {
      this.props.onSelect(entry);
    }
  }

  onKeyDown(e: any) {
    if (e.keyCode === 38 || e.keyCode === 40) {
      // UP/DOWN
      e.preventDefault();
      e.stopPropagation();
      const currentEl = e.target.parentElement;
      let itemEl =
        e.keyCode === 40 ? currentEl.nextSibling : currentEl.previousSibling;
      while (itemEl) {
        const anchorEl = itemEl.querySelector(
          '.react-slds-candidate[tabIndex]'
        );
        if (anchorEl && !anchorEl.disabled) {
          anchorEl.focus();
          return;
        }
        itemEl = e.keyCode === 40 ? itemEl.nextSibling : itemEl.previousSibling;
      }
    } else if (e.keyCode === 27) {
      // ESC
      e.preventDefault();
      e.stopPropagation();
      this.onSelect(null);
    }
  }

  focusToTargetItemEl(index: number) {
    const el = this.node;
    if (!el) {
      return;
    }
    const anchors = el.querySelectorAll<HTMLAnchorElement>(
      '.react-slds-candidate[tabIndex]'
    );
    if (anchors[index]) {
      anchors[index].focus();
    }
  }

  renderCandidate(entry: LookupEntry) {
    const { category, icon, label, value, meta } = entry;
    return (
      <li key={value} role='presentation'>
        <a
          className='slds-lookup__item-action react-slds-candidate'
          tabIndex={-1}
          role='option'
          aria-selected={false}
          onKeyDown={(e) => e.keyCode === 13 && this.onSelect(entry)}
          onBlur={this.props.onBlur}
          onClick={() => this.onSelect(entry)}
        >
          <span
            className='slds-truncate'
            style={{ display: 'inline-flex', alignItems: 'center' }}
          >
            {icon ? (
              <Icon
                style={{ minWidth: '1.5rem' }}
                className='slds-m-right--x-small'
                category={category}
                icon={icon}
                size='small'
              />
            ) : (
              undefined
            )}
            <div className='slds-truncate'>
              <span className='slds-lookup__result-text slds-truncate'>
                {label}
              </span>
              {meta ? (
                <span className='slds-lookup__result-meta slds-truncate'>
                  {meta}
                </span>
              ) : (
                undefined
              )}
            </div>
          </span>
        </a>
      </li>
    );
  }

  render() {
    const trueFilter = () => true;
    const {
      data = [],
      loading,
      header,
      footer,
      filter = trueFilter,
      align,
      vertAlign,
      listRef,
    } = this.props;
    const lookupMenuClassNames = classnames('slds-lookup__menu', 'slds-show');
    const listStyles = {
      minWidth: '15rem',
      ...(vertAlign === 'bottom' ? { bottom: '100%' } : {}),
      ...(align === 'right' ? { left: 'auto', right: 0 } : {}),
    };
    const handleDOMRef = (node: HTMLDivElement) => {
      this.node = node;
      if (listRef) {
        listRef(node);
      }
    };
    return (
      // eslint-disable-next-line jsx-a11y/interactive-supports-focus
      <div
        ref={handleDOMRef}
        className={lookupMenuClassNames}
        style={listStyles}
        role='listbox'
        onKeyDown={this.onKeyDown.bind(this)}
      >
        {header ? <div className='slds-lookup__item'>{header}</div> : undefined}
        <ul className='slds-lookup__list' role='presentation'>
          {data.filter(filter).map(this.renderCandidate.bind(this))}
          {loading ? (
            <li
              className='slds-lookup__item'
              key='loading'
              style={{ height: 20 }}
            >
              <Spinner
                container={false}
                size='small'
                style={{ margin: '0 auto' }}
              />
            </li>
          ) : (
            undefined
          )}
        </ul>
        {footer ? <div className='slds-lookup__item'>{footer}</div> : undefined}
      </div>
    );
  }
}

export const LookupCandidateListPortal = autoAlign({
  triggerSelector: '.slds-lookup',
})(LookupCandidateList);

export type LookupProps = {
  id?: string;
  className?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  error?: FormElementProps['error'];
  iconAlign?: 'left' | 'right';

  value?: string;
  defaultValue?: string;

  selected?: LookupEntry | null;
  defaultSelected?: LookupEntry;

  opened?: boolean;
  defaultOpened?: boolean;

  searchText?: string;
  defaultSearchText?: string;

  loading?: boolean;
  data?: LookupEntry[];
  lookupFilter?: (
    entry: LookupEntry,
    searchText?: string,
    targetScope?: string
  ) => boolean;
  listHeader?: JSX.Element;
  listFooter?: JSX.Element;
  scopes?: LookupScope[];
  targetScope?: string;
  defaultTargetScope?: string;
  totalCols?: number;
  cols?: number;

  onSearchTextChange?: (searchText: string) => void;
  onScopeMenuClick?: (e: any) => void;
  onScopeChange?: (targetScope: string) => void;
  onLookupRequest?: (searchText?: string) => void;
  onBlur?: () => void;
  onSelect?: (e: any) => void;
  onComplete?: (cancel?: boolean) => void;
};

export type LookupState = {
  id: string;
  selected?: LookupEntry | null;
  opened?: boolean;
  searchText?: string;
  targetScope?: string;
  focusFirstCandidate: boolean;
};
/**
 *
 */
export class Lookup extends Component<LookupProps, LookupState> {
  static isFormElement = true;

  node: HTMLDivElement | null = null;

  selection: HTMLDivElement | null = null;

  candidateList: HTMLDivElement | null = null;

  // eslint-disable-next-line react/sort-comp
  private search: any;

  constructor(props: Readonly<LookupProps>) {
    super(props);
    this.state = {
      id: `form-element-${uuid()}`,
      selected: props.defaultSelected,
      opened: props.defaultOpened,
      searchText: props.defaultSearchText,
      targetScope: props.defaultTargetScope,
      focusFirstCandidate: false,
    };
  }

  onScopeMenuClick(e: any) {
    this.setState({ opened: false });
    if (this.props.onScopeMenuClick) {
      this.props.onScopeMenuClick(e);
    }
  }

  onScopeChange(targetScope: string) {
    this.setState({ targetScope });
    if (this.props.onScopeChange) {
      this.props.onScopeChange(targetScope);
    }
  }

  onSearchTextChange(searchText: string) {
    this.setState({ searchText });
    if (this.props.onSearchTextChange) {
      this.props.onSearchTextChange(searchText);
    }
  }

  onLookupRequest(searchText?: string) {
    this.setState({ opened: true });
    if (this.props.onLookupRequest) {
      this.props.onLookupRequest(searchText);
    }
  }

  onResetSelection() {
    this.setState({ selected: null });
    if (this.props.onSelect) {
      this.props.onSelect(null);
    }
    this.onSearchTextChange('');
    this.onLookupRequest('');
    setTimeout(() => {
      const searchElem = this.search;
      const inputElem = searchElem && searchElem.querySelector('input');
      if (!inputElem) {
        return;
      }
      inputElem.focus();
    }, 10);
  }

  onLookupItemSelect(selected: LookupEntry | null) {
    if (selected) {
      this.setState({ selected, opened: false });
      if (this.props.onSelect) {
        this.props.onSelect(selected);
      }
      setTimeout(() => {
        const selectionElem = this.selection;
        const pillElem = selectionElem && selectionElem.querySelector('a');
        if (pillElem) {
          pillElem.focus();
        }
      }, 10);
    } else {
      this.setState({ opened: false });
      setTimeout(() => {
        const searchElem = this.search;
        const inputElem = searchElem.querySelector('input');
        inputElem.focus();
      }, 10);
    }
    if (this.props.onComplete) {
      this.props.onComplete(); // tell the component container to quit lookup
    }
  }

  onFocusFirstCandidate() {
    const { opened = this.state.opened } = this.props;
    if (!opened) {
      this.onLookupRequest(this.state.searchText);
    } else {
      this.setState({ focusFirstCandidate: true });
      setTimeout(() => {
        this.setState({ focusFirstCandidate: false });
      }, 10);
    }
  }

  onBlur() {
    setTimeout(() => {
      if (!this.isFocusedInComponent()) {
        this.setState({ opened: false });
        if (this.props.onBlur) {
          this.props.onBlur();
        }
        if (this.props.onComplete) {
          this.props.onComplete(true); // quit lookup (cancel)
        }
      }
    }, 10);
  }

  isFocusedInComponent() {
    const targetEl = document.activeElement;
    return (
      isElInChildren(this.node, targetEl) ||
      isElInChildren(this.candidateList, targetEl)
    );
  }

  render() {
    const id = this.props.id || this.state.id;
    const {
      totalCols,
      cols,
      label,
      required,
      error,
      className,
      selected = this.state.selected,
      opened = this.state.opened,
      searchText = this.state.searchText,
      targetScope = this.state.targetScope,
      loading,
      lookupFilter,
      listHeader,
      listFooter,
      data,
      onComplete,
      ...props
    } = this.props;
    const lookupClassNames = classnames(
      'slds-lookup',
      { 'slds-has-selection': selected },
      className
    );
    const formElemProps = { id, totalCols, cols, label, required, error };
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
      defaultSelected,
      defaultOpened,
      defaultSearchText,
      defaultTargetScope,
      onSelect,
      onBlur,
      onScopeChange,
      onScopeMenuClick,
      onSearchTextChange,
      onLookupRequest,
      ...searchProps
    } = props;
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return (
      <FormElement
        formElementRef={(node) => (this.node = node)}
        {...formElemProps}
      >
        <div
          className={lookupClassNames}
          ref={(node) => (this.node = node)}
          data-select='single'
          data-scope={props.scopes ? 'multi' : 'single'}
          data-typeahead={false}
        >
          {selected ? (
            <LookupSelection
              id={id}
              lookupSelectionRef={(node) => (this.selection = node)}
              selected={selected}
              onResetSelection={this.onResetSelection.bind(this)}
            />
          ) : (
            <LookupSearch
              {...searchProps}
              id={id}
              lookupSearchRef={(node) => (this.search = node)}
              searchText={searchText}
              targetScope={targetScope}
              onScopeMenuClick={this.onScopeMenuClick.bind(this)}
              onScopeChange={this.onScopeChange.bind(this)}
              onChange={this.onSearchTextChange.bind(this)}
              onSubmit={() => this.onLookupRequest(searchText)}
              onPressDown={this.onFocusFirstCandidate.bind(this)}
              onComplete={onComplete}
              onBlur={this.onBlur.bind(this)}
            />
          )}
          {opened ? (
            <LookupCandidateListPortal
              portalClassName={lookupClassNames}
              listRef={(node) => (this.candidateList = node)}
              data={data}
              focus={this.state.focusFirstCandidate}
              loading={loading}
              filter={
                lookupFilter
                  ? (entry: LookupEntry) =>
                      lookupFilter(entry, searchText, targetScope)
                  : undefined
              }
              header={listHeader}
              footer={listFooter}
              onSelect={this.onLookupItemSelect.bind(this)}
              onBlur={this.onBlur.bind(this)}
            />
          ) : (
            undefined
          )}
        </div>
      </FormElement>
    );
  }
}
