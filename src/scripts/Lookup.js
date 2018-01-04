import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import autoAlign from './AutoAlign';
import FormElement from './FormElement';
import Input from './Input';
import Icon from './Icon';
import Spinner from './Spinner';
import Pill from './Pill';
import DropdownButton from './DropdownButton';
import { DropdownMenuItem } from './DropdownMenu';
import { uuid, isElInChildren, registerStyle } from './util';


/**
 *
 */
const LookupEntryType = PropTypes.shape({
  category: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  meta: PropTypes.string,
});

/**
 *
 */
export class LookupSelection extends Component {
  static propTypes = {
    id: PropTypes.string,
    selected: LookupEntryType,
    hidden: PropTypes.bool,
    onResetSelection: PropTypes.func,
    lookupSelectionRef: PropTypes.func,
  }

  onKeyDown(e) {
    if (e.keyCode === 8 || e.keyCode === 46) { // Bacspace / DEL
      e.preventDefault();
      e.stopPropagation();
      if (this.props.onResetSelection) {
        this.props.onResetSelection();
      }
    }
  }

  renderPill(selected) {
    const onPillClick = (e) => {
      e.target.focus();
      e.preventDefault();
      e.stopPropagation();
    };
    return (
      <Pill
        id={ this.props.id }
        truncate
        pillRef={ node => (this.pill = node) }
        onKeyDown={ this.onKeyDown.bind(this) }
        onClick={ onPillClick }
        tabIndex={ 0 }
        icon={selected.icon ? {
          category: selected.category,
          icon: selected.icon,
        } : undefined}
        label={ selected.label }
        onRemove={ this.props.onResetSelection }
      />
    );
  }

  render() {
    const { hidden, selected, lookupSelectionRef } = this.props;
    const lookupClassNames = classnames(
      { 'slds-hide': hidden }
    );
    return (
      <div ref={ lookupSelectionRef } className={ lookupClassNames }>
        <div className='slds-pill__container'>
          { selected ? this.renderPill(selected) : undefined }
        </div>
      </div>
    );
  }

}


/**
 *
 */
const ICON_ALIGNS = ['left', 'right'];

/**
 *
 */
export class LookupSearch extends Component {
  static propTypes = {
    className: PropTypes.string,
    hidden: PropTypes.bool,
    searchText: PropTypes.string,
    scopes: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
        icon: PropTypes.string,
      })
    ),
    targetScope: PropTypes.any, // eslint-disable-line
    iconAlign: PropTypes.oneOf(ICON_ALIGNS),
    disabled: PropTypes.bool,
    onKeyDown: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onScopeMenuClick: PropTypes.func,
    onScopeChange: PropTypes.func,
    onPressDown: PropTypes.func,
    onSubmit: PropTypes.func,
    onComplete: PropTypes.func,
    lookupSearchRef: PropTypes.func,
  }

  constructor(props) {
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
    this.props.onSubmit();
  }

  onInputKeyDown = (e) => {
    if (e.keyCode === 13) { // return key
      e.preventDefault();
      e.stopPropagation();
      const searchText = e.target.value;
      if (searchText) {
        this.props.onSubmit();
      } else {
        // if no search text, quit lookup search
        this.props.onComplete();
      }
    } else if (e.keyCode === 40) { // down key
      e.preventDefault();
      e.stopPropagation();
      this.props.onPressDown();
    } else if (e.keyCode === 27) { // ESC
      e.preventDefault();
      e.stopPropagation();
      // quit lookup search (cancel)
      const cancel = true;
      this.props.onComplete(cancel);
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  }

  onInputChange = (e) => {
    const searchText = e.target.value;
    this.props.onChange(searchText);
  }

  onInputBlur = (e) => {
    setTimeout(() => {
      if (!this.isFocusedInComponent()) {
        if (this.props.onBlur) {
          this.props.onBlur(e);
        }
      }
    }, 10);
  }

  onScopeMenuClick = (e) => {
    if (this.props.onScopeMenuClick) {
      this.props.onScopeMenuClick(e);
    }
  }

  onMenuItemClick = (scope) => {
    if (this.props.onScopeChange) {
      this.props.onScopeChange(scope.value);
    }
  }

  isFocusedInComponent() {
    return isElInChildren(this.node, document.activeElement);
  }

  handleLookupSearchRef = (node) => {
    this.node = node;
    const { lookupSearchRef } = this.props;
    if (lookupSearchRef) { lookupSearchRef(node); }
  }

  renderSearchInput(props) {
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
      <div ref={ this.handleLookupSearchRef } className={ searchInputClassNames }>
        <Input
          { ...pprops }
          inputRef={ node => (this.input = node) }
          value={ searchText }
          onKeyDown={ this.onInputKeyDown }
          onChange={ this.onInputChange }
          onBlur={ this.onInputBlur }
        />
        <span
          tabIndex={ -1 }
          style={ props.disabled ? undefined : { position: 'relative', cursor: 'pointer', outline: 'none' } }
          onClick={ props.disabled ? undefined : this.onLookupIconClick }
          onBlur={ this.onInputBlur }
        >
          <Icon
            icon='search'
            className='slds-input__icon'
          />
        </span>
      </div>
    );
  }

  renderScopeSelector({ scopes, targetScope: target, disabled }) {
    let targetScope = scopes[0] || {};
    for (const scope of scopes) {
      if (scope.value === target) {
        targetScope = scope;
        break;
      }
    }
    const icon = <Icon icon={ targetScope.icon || 'none' } size='x-small' />;
    const selectorClassNames = classnames(
      'slds-grid',
      'slds-grid--align-center',
      'slds-grid--vertical-align-center',
      'react-slds-lookup-scope-selector'
    );
    return (
      <div className={ selectorClassNames }>
        <DropdownButton
          label={ icon }
          disabled={ disabled }
          onClick={ this.onScopeMenuClick }
          onMenuItemClick={ this.onMenuItemClick }
          onBlur={ this.onInputBlur }
        >
          { scopes.map(scope => <DropdownMenuItem key={ scope.value } { ...scope } />) }
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
      const styles = { WebkitFlexWrap: 'nowrap', msFlexWrap: 'nowrap', flexWrap: 'nowrap' };
      return (
        <div ref={ this.handleLookupSearchRef } className={ lookupSearchClassNames } style={ styles }>
          { this.renderScopeSelector({ scopes, targetScope, disabled }) }
          { this.renderSearchInput({ ...props, disabled, className: 'slds-col', bare: true }) }
        </div>
      );
    }
    return this.renderSearchInput(this.props);
  }

}

/**
 *
 */
class LookupCandidateList extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(LookupEntryType),
    focus: PropTypes.bool,
    loading: PropTypes.bool,
    filter: PropTypes.func,
    align: PropTypes.oneOf(['left', 'right']),
    vertAlign: PropTypes.oneOf(['top', 'bottom']),
    listRef: PropTypes.func,
    onSelect: PropTypes.func,
    onBlur: PropTypes.func,
    header: PropTypes.node,
    footer: PropTypes.node,
  }

  componentDidMount() {
    if (this.props.focus) {
      this.focusToTargetItemEl(0);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.focus && !prevProps.focus) {
      setTimeout(() => {
        this.focusToTargetItemEl(0);
      }, 10);
    }
  }

  onSelect(entry) {
    if (this.props.onSelect) {
      this.props.onSelect(entry);
    }
  }

  onKeyDown(e) {
    if (e.keyCode === 38 || e.keyCode === 40) { // UP/DOWN
      e.preventDefault();
      e.stopPropagation();
      const currentEl = e.target.parentElement;
      let itemEl = e.keyCode === 40 ? currentEl.nextSibling : currentEl.previousSibling;
      while (itemEl) {
        const anchorEl = itemEl.querySelector('.react-slds-candidate[tabIndex]');
        if (anchorEl && !anchorEl.disabled) {
          anchorEl.focus();
          return;
        }
        itemEl = e.keyCode === 40 ? itemEl.nextSibling : itemEl.previousSibling;
      }
    } else if (e.keyCode === 27) { // ESC
      e.preventDefault();
      e.stopPropagation();
      this.onSelect(null);
    }
  }

  focusToTargetItemEl(index) {
    const el = this.node;
    if (!el) { return; }
    const anchors = el.querySelectorAll('.react-slds-candidate[tabIndex]');
    if (anchors[index]) {
      anchors[index].focus();
    }
  }

  renderCandidate(entry) {
    const { category, icon, label, value, meta } = entry;
    return (
      <li key={ value } role='presentation'>
        <a
          className='slds-lookup__item-action react-slds-candidate'
          tabIndex={ -1 }
          role='option'
          onKeyDown={ e => e.keyCode === 13 && this.onSelect(entry) }
          onBlur={ this.props.onBlur }
          onClick={ () => this.onSelect(entry) }
        >
          <span className='slds-truncate' style={ { display: 'inline-flex', alignItems: 'center' } }>
            {
              icon ?
                <Icon
                  style={ { minWidth: '1.5rem' } }
                  className='slds-m-right--x-small'
                  category={ category }
                  icon={ icon }
                  size='small'
                /> :
                undefined
            }
            <div className='slds-truncate'>
              <span className='slds-lookup__result-text slds-truncate'>{ label }</span>
              {
                meta ?
                  <span className='slds-lookup__result-meta slds-truncate'>{ meta }</span> :
                  undefined
              }
            </div>
          </span>
        </a>
      </li>
    );
  }

  render() {
    const trueFilter = () => true;
    const {
      data = [], loading, header, footer, filter = trueFilter,
      align, vertAlign,
      listRef,
    } = this.props;
    const lookupMenuClassNames = classnames('slds-lookup__menu', 'slds-show');
    const listStyles = {
      minWidth: '15rem',
      ...(vertAlign === 'bottom' ? { bottom: '100%' } : {}),
      ...(align === 'right' ? { left: 'auto', right: 0 } : {}),
    };
    const handleDOMRef = (node) => {
      this.node = node;
      if (listRef) { listRef(node); }
    };
    return (
      <div
        ref={ handleDOMRef }
        className={ lookupMenuClassNames }
        style={ listStyles }
        role='listbox'
        onKeyDown={ this.onKeyDown.bind(this) }
      >
        {
          header ?
            <div className='slds-lookup__item'>{ header }</div> :
            undefined
        }
        <ul className='slds-lookup__list' role='presentation'>
          {
            data.filter(filter).map(this.renderCandidate.bind(this))
          }
          {
            loading ?
              <li className='slds-lookup__item' key='loading' style={ { height: 20 } }>
                <Spinner container={false} size='small' style={ { margin: '0 auto' } } />
              </li> :
              undefined
          }
        </ul>
        {
          footer ?
            <div className='slds-lookup__item'>{ footer }</div> :
            undefined
        }
      </div>
    );
  }
}

export const LookupCandidateListPortal = autoAlign({
  triggerSelector: '.slds-lookup',
})(LookupCandidateList);

/**
 *
 */
export default class Lookup extends Component {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    error: FormElement.propTypes.error,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    selected: LookupEntryType,
    defaultSelected: LookupEntryType,
    opened: PropTypes.bool,
    defaultOpened: PropTypes.bool,
    searchText: PropTypes.string,
    defaultSearchText: PropTypes.string,
    loading: PropTypes.bool,
    data: PropTypes.arrayOf(LookupEntryType),
    lookupFilter: PropTypes.func,
    listHeader: PropTypes.node,
    listFooter: PropTypes.node,
    scopes: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
        icon: PropTypes.string,
      })
    ),
    targetScope: PropTypes.string,
    iconAlign: PropTypes.oneOf(ICON_ALIGNS),
    defaultTargetScope: PropTypes.string,
    onSearchTextChange: PropTypes.func,
    onScopeMenuClick: PropTypes.func,
    onScopeChange: PropTypes.func,
    onLookupRequest: PropTypes.func,
    onBlur: PropTypes.func,
    onSelect: PropTypes.func,
    onComplete: PropTypes.func,
    totalCols: PropTypes.number,
    cols: PropTypes.number,
  }

  static isFormElement = true;

  constructor(props) {
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

  onScopeMenuClick(e) {
    this.setState({ opened: false });
    if (this.props.onScopeMenuClick) {
      this.props.onScopeMenuClick(e);
    }
  }

  onScopeChange(targetScope) {
    this.setState({ targetScope });
    if (this.props.onScopeChange) {
      this.props.onScopeChange(targetScope);
    }
  }

  onSearchTextChange(searchText) {
    this.setState({ searchText });
    if (this.props.onSearchTextChange) {
      this.props.onSearchTextChange(searchText);
    }
  }

  onLookupRequest(searchText) {
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
      if (!inputElem) { return; }
      inputElem.focus();
    }, 10);
  }

  onLookupItemSelect(selected) {
    if (selected) {
      this.setState({ selected, opened: false });
      if (this.props.onSelect) {
        this.props.onSelect(selected);
      }
      setTimeout(() => {
        const selectionElem = this.selection;
        const pillElem = selectionElem && selectionElem.querySelector('a');
        if (pillElem) { pillElem.focus(); }
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
    return isElInChildren(this.node, targetEl) ||
      isElInChildren(this.candidateList, targetEl);
  }

  render() {
    const id = this.props.id || this.state.id;
    const {
      totalCols, cols,
      label, required, error,
      className,
      selected = this.state.selected,
      opened = this.state.opened,
      searchText = this.state.searchText,
      targetScope = this.state.targetScope,
      loading, lookupFilter,
      listHeader, listFooter,
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
    /* eslint-disable no-unused-vars */
    const {
      defaultSelected, defaultOpened, defaultSearchText, defaultTargetScope,
      onSelect, onBlur, onScopeChange, onScopeMenuClick, onSearchTextChange, onLookupRequest,
      ...searchProps
    } = props;
    /* eslint-enable no-unused-vars */
    return (
      <FormElement formElementRef={ node => (this.node = node) } { ...formElemProps }>
        <div
          className={ lookupClassNames }
          ref={ node => (this.node = node) }
          data-select='single'
          data-scope={ props.scopes ? 'multi' : 'single' }
          data-typeahead={ false }
        >
          {
            selected ?
              <LookupSelection
                id={ id }
                lookupSelectionRef={ node => (this.selection = node) }
                selected={ selected }
                onResetSelection={ this.onResetSelection.bind(this) }
              /> :
                <LookupSearch
                  { ...searchProps }
                  id={ id }
                  lookupSearchRef={ node => (this.search = node) }
                  searchText={ searchText }
                  targetScope={ targetScope }
                  onScopeMenuClick={ this.onScopeMenuClick.bind(this) }
                  onScopeChange={ this.onScopeChange.bind(this) }
                  onChange={ this.onSearchTextChange.bind(this) }
                  onSubmit={ () => this.onLookupRequest(searchText) }
                  onPressDown={ this.onFocusFirstCandidate.bind(this) }
                  onComplete={ onComplete }
                  onBlur={ this.onBlur.bind(this) }
                />
          }
          {
            opened ?
              <LookupCandidateListPortal
                portalClassName={ lookupClassNames }
                listRef={ node => (this.candidateList = node) }
                data={ data }
                focus={ this.state.focusFirstCandidate }
                loading={ loading }
                filter={ lookupFilter ? entry => lookupFilter(entry, searchText, targetScope) : undefined }
                header={ listHeader }
                footer={ listFooter }
                onSelect={ this.onLookupItemSelect.bind(this) }
                onBlur={ this.onBlur.bind(this) }
              /> :
              undefined
          }
        </div>
      </FormElement>
    );
  }
}
