// TODO: fix linter
/* eslint-disable */
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import classnames from 'classnames';
import uuid from 'uuid';

import FormElement from './FormElement';
import Input from './Input';
import Icon from './Icon';
import Spinner from './Spinner';
import Pill from './Pill';
import Tree from './Tree';
import TreeNode from './TreeNode';
import DropdownButton from './DropdownButton';
import { DropdownMenuItem } from './DropdownMenu';

import { registerStyle } from './util';

// TODO lookup-refactor(1) do we need this ?
const NO_RESULTS_FOUND = 'No results found';
const TEMP_EMPTY_VALUE = 'TEMP_EMPTY_VALUE';

export class LookupSelection extends Component {
  onKeyDown(e) {
    if (e.keyCode === 8 || e.keyCode === 46) { // Bacspace / DEL
      e.preventDefault();
      e.stopPropagation();
      if (this.props.onResetSelection) {
        this.props.onResetSelection();
      }
    }
  }

  renderPill() {
    const { selected, disabled, disableResetSelection, selectedPickRender } = this.props;
    const onPillClick = (e) => {
      e.target.focus();
      e.preventDefault();
      e.stopPropagation();
      this.props.onResetSelection();
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
        selectedRender={ selectedPickRender ? selectedPickRender.bind(this, selected) : null }
        disabled={ disabled || disableResetSelection }
      />
    );
  }

  render() {
    const { selected, lookupSelectionRef } = this.props;
    const lookupClassNames = classnames(
      'slds-lookup',
      'slds-has-selection',
    );
    return (
      <div
        className={ lookupClassNames }
        data-select='single'
        data-scope='single'
        data-typeahead={ false }
        ref={ lookupSelectionRef }
      >
        <div className='slds-pill__container'>
          { selected ?
            this.renderPill()
            :
            undefined
          }
        </div>
      </div>
    );
  }

}
/* eslint-disable no-use-before-define */
const LookupEntryType = PropTypes.shape({
  category: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  items: PropTypes.arrayOf(LookupEntryType),
  splitter: PropTypes.bool,
});

LookupSelection.propTypes = {
  id: PropTypes.string,
  selected: LookupEntryType,
  onResetSelection: PropTypes.func,
  lookupSelectionRef: PropTypes.func,
  disabled: PropTypes.bool,
  disableResetSelection: PropTypes.bool,
  selectedPickRender: PropTypes.func,
};


/**
 *
 */
export class LookupSearch extends Component {
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
        '.slds-lookup[data-scope="multi"] .slds-box--border .slds-input--bare',
        '{ height: 2.15rem; width: 100%; }',
      ],
    ]);
  }

  onLookupIconClick() {
    if (this.props.disabled) return;
    this.props.onSubmit();
    setTimeout(() => {
      this.input.focus();
    }, 10);
  }

  onInputKeyDown(e) {
    if (e.keyCode === 13) { // return key
      e.preventDefault();
      e.stopPropagation();
      const searchText = e.target.value;
      if (searchText) {
        this.props.onSubmit();
      } else {
        this.props.onComplete();
      }
    } else if (e.keyCode === 40) { // down key
      e.preventDefault();
      e.stopPropagation();
      this.props.onPressDown();
    } else if (e.keyCode === 27) { // ESC
      e.preventDefault();
      e.stopPropagation();
      this.props.onComplete();
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  }

  onInputChange(e) {
    const searchText = e.target.value;
    this.props.onChange(searchText);
  }

  onInputBlur(e) {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  onScopeMenuClick(e) {
    if (this.props.onScopeMenuClick) {
      this.props.onScopeMenuClick(e);
    }
  }

  onMenuItemClick(scope) {
    if (this.props.onScopeChange) {
      this.props.onScopeChange(scope.value);
    }
  }

  renderSearchInput(props) {
    const {
      className, disabled, searchText, iconAlign = 'right', lookupSearchRef, placeholder,
    } = props;
    const searchInputClassNames = classnames(
      'slds-grid',
      'slds-input-has-icon',
      `slds-input-has-icon--${iconAlign}`,
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
      <div ref={ lookupSearchRef } className={ searchInputClassNames }>
        <Input
          { ...pprops }
          disabled={ disabled }
          inputRef={ node => (this.input = node) }
          value={ searchText }
          onKeyDown={ this.onInputKeyDown.bind(this) }
          onChange={ this.onInputChange.bind(this) }
          onBlur={ this.onInputBlur.bind(this) }
          placeholder={ placeholder }
        />
        <Icon
          icon='search'
          className='slds-input__icon'
          style={ { cursor: 'pointer' } }
          onClick={ this.onLookupIconClick.bind(this) }
        />
      </div>
    );
  }
  
  renderScopeSelector(scopes, target) {
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
          onClick={ this.onScopeMenuClick.bind(this) }
          onMenuItemClick={ this.onMenuItemClick.bind(this) }
          onBlur={ this.onInputBlur.bind(this) }
        >
          { scopes.map(scope => <DropdownMenuItem key={ scope.value } { ...scope } />) }
        </DropdownButton>
      </div>
    );
  }
  
  render() {
    const { scopes, targetScope, lookupSearchRef, ...props } = this.props;
    if (scopes) {
      const lookupSearchClassNames = classnames(
        'slds-grid',
        'slds-form-element__control',
        'slds-box--border',
      );
      const styles = { WebkitFlexWrap: 'nowrap', msFlexWrap: 'nowrap', flexWrap: 'nowrap' };
      return (
        <div ref={ lookupSearchRef } className={ lookupSearchClassNames } style={ styles }>
          { this.renderScopeSelector(scopes, targetScope) }
          { this.renderSearchInput({ ...props, className: 'slds-col', bare: true }) }
        </div>
      );
    }
    return this.renderSearchInput(this.props);
  }

}

const ICON_ALIGNS = ['left', 'right'];

LookupSearch.propTypes = {
  className: PropTypes.string,
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
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onScopeMenuClick: PropTypes.func,
  onScopeChange: PropTypes.func,
  onPressDown: PropTypes.func,
  onSubmit: PropTypes.func,
  onComplete: PropTypes.func,
  lookupSearchRef: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

/**
 *
 */
export class LookupCandidateList extends Component {

  componentDidMount() {
    if (this.props.focus) {
      this.focusToTargetItemEl(0);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.focus && !prevProps.focus) {
      this.focusToTargetItemEl(0);
    }
  }

  onSelect(entry) {
    if (entry.splitter || entry.disabled) {
      return;
    }
    if (this.props.onSelect) {
      this.props.onSelect(entry);
    }
  }

  getStyles() {
    return {
      lookupMenu: {
        overflow: 'auto',
        maxHeight: 240,
      },
    };
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
    const anchors = el.querySelectorAll('.react-slds-candidate[tabIndex]');
    if (anchors[index]) {
      anchors[index].focus();
    }
  }

  renderCandidate(filter, entry) {
    if (!entry) return [];
    const candidates = [];
    const haveLeaves = (entry.items && entry.items.length !== 0);
    const splitterHaveItems = haveLeaves && entry.splitter;
    const parentHaveItems = haveLeaves && !entry.splitter;
    const { itemRender } = this.props;
    candidates.push(
      <TreeNode
        extra={ entry.extra }
        label={ entry.label }
        subLabel={ entry.subLabel }
        leaf={ entry.splitter ? true : !haveLeaves }
        onClick={ () => { this.onSelect(entry); } }
        splitter={ entry.splitter }
        itemRender={ itemRender }
        tabIndex={ -1 }
        toggleOnNodeClick={entry.disabled}
      >
        { parentHaveItems ?
          entry.items.map(this.renderCandidate.bind(this, filter)) : null
        }
      </TreeNode>
    );
    if (splitterHaveItems) {
      entry.items.map((item) => candidates.push(this.renderCandidate(filter, item)));
    }

    return candidates;
  }

  render() {
    const { data = [], hidden, loading, header, footer, noDataLabel, searchText, filter = () => true } = this.props;
    var noDataText = NO_RESULTS_FOUND;
    if (!searchText || searchText === '') {
      noDataText = noDataLabel ? noDataLabel : NO_RESULTS_FOUND;
    }
    let content = Array.isArray(data) ?
      data.map(filter)
        .filter((item) => item)
        .map(this.renderCandidate.bind(this, filter)) : null;
    const italicTextStyle = {
      fontStyle: 'italic',
    };
    if (!content || content.length === 0) {
      content = (
        <div
          className='slds-text-align--center'
          style={italicTextStyle}
        >
          { noDataText }
        </div>);
    }
    const lookupMenuClassNames = classnames(
      'slds-lookup__menu',
      { 'slds-hide': hidden || (!loading && !content), 'slds-show': !hidden }
    );
    const styles = this.getStyles();
    return (
      <div
        ref={ node => (this.node = node) }
        className={ lookupMenuClassNames }
        style={ styles.lookupMenu }
        role='listbox'
        onKeyDown={ this.onKeyDown.bind(this) }
      >
        {header ?
          <div className='slds-lookup__item'>{ header }</div> :
          undefined
        }
        <Tree
          treeContainerStyles={{maxWidth: 'none'}}
        >
          {loading ?
            <TreeNode leaf>
              <Spinner size='small' style={ { margin: '0 auto' } } />
            </TreeNode> :
            content
          }
        </Tree>

        {footer ?
          <div className='slds-lookup__item'>{ footer }</div> :
          undefined
        }
      </div>
    );
  }

}

LookupCandidateList.propTypes = {
  data: PropTypes.arrayOf(LookupEntryType),
  focus: PropTypes.bool,
  loading: PropTypes.bool,
  hidden: PropTypes.bool,
  filter: PropTypes.func,
  noDataLabel: PropTypes.string,
  itemRender: PropTypes.func,
  onSelect: PropTypes.func,
  onBlur: PropTypes.func,
  header: PropTypes.node,
  footer: PropTypes.node,
};

/**
 *
 */
export default class Lookup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: `form-element-${uuid()}`,
      selected: props.selected || props.defaultSelected || null,
      opened: props.defaultOpened,
      searchText: props.defaultSearchText ? props.defaultSearchText : '',
      prevSelected: props.selected || props.defaultSelected || null,
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

  // onResetSelection() {
  //   const { allowEmpty } = this.props;
  //   if (this.props.disabled) return;
  //   // Save previous selected entry value, to show it if no other entry will be selected
  //   if (allowEmpty) {
  //     this.setState({ selected: null });
  //   } else {
  //     this.setState({ prevSelected: this.state.selected, selected: -1 });
  //   }
  //
  //   if (this.props.onSelect) {
  //     this.props.onSelect(-1);
  //   }
  //   this.onSearchTextChange('');
  //   this.onLookupRequest('');
  //   setTimeout(() => {
  //     const searchElem = this.search;
  //     debugger;
  //     const inputElem = searchElem.querySelector('input');
  //     inputElem.focus();
  //   }, 10);
  // }

  onResetSelection() {
    // this.setState({ selected: null });
      const { allowEmpty } = this.props;
      if (this.props.disabled) return;
      // Save previous selected entry value, to show it if no other entry will be selected
      if (allowEmpty) {
        this.setState({ selected: null });
      } else {
        this.setState({ prevSelected: this.state.selected, selected: TEMP_EMPTY_VALUE });
      }
    if (this.props.onSelect) {
      // TODO TEMP_EMPTY_VALUE or null and why ?
      this.props.onSelect(TEMP_EMPTY_VALUE);
    }
    this.onSearchTextChange('');
    this.onLookupRequest('');
    setTimeout(() => {
      const searchElem = this.search;
      const inputElem = searchElem.querySelector('input');
      inputElem.focus();
    }, 10);
  }

  onLookupItemSelect(selected) {
    if (selected) {
      this.setState({ selected: selected.value, opened: false });
      if (this.props.onSelect) {
        this.props.onSelect(selected);
      }
      setTimeout(() => {
        const selectionElem = findDOMNode(this.refs.selection);
        if (!selectionElem) return;
        const pillElem = (selectionElem) ? selectionElem.querySelector('a') : null;
        if (pillElem) { pillElem.focus(); }
      }, 10);
    } else {
      this.setState({ opened: false });
      setTimeout(() => {
        const searchElem = this.search;
        if (!searchElem) return;
        const inputElem = searchElem.querySelector('input');
        inputElem.focus();
      }, 10);
    }
    if (this.props.onComplete) {
      this.props.onComplete();
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

  onClick() {
    setTimeout(() => {
      this.setState({ opened: true });
      if (this.props.onClick) {
        this.props.onClick();
      }
    }, 10);
  }

  onBlur() {
    const { allowEmpty } = this.props;
    setTimeout(() => {
      if (!this.isFocusedInComponent()) {
        this.setState({ opened: false });
        // Show pervious selected value in case any other entry was not selected
        if (this.state.selected === TEMP_EMPTY_VALUE && !allowEmpty) {
          this.onLookupItemSelect(
            this.getSelectedLookupEntry(this.props.data, this.state.prevSelected)
          );
        }
        if (this.props.onBlur) {
          this.props.onBlur();
        }
        // this.setState({ selected: null });
        // if (this.props.onSelect) {
        //   this.props.onSelect(null);
        // }
        if (this.props.onComplete) {
          this.props.onComplete();
        }
      }
    }, 10);
  }

  getSelectedLookupEntry(data, value) {
    if (!data) return null;
    let result;
    for (let i = 0; i < data.length; i++) {
      if (typeof value !== 'undefined' && data[i].value === value) {
        result = data[i];
        break;
      } else if (data[i].items && data[i].items.length > 0) {
        result = this.getSelectedLookupEntry(data[i].items, value);
        if (result) { return result; }
      }
    }
    return result;
  }

  isFocusedInComponent() {
    const rootEl = this.node;
    let targetEl = document.activeElement;
    while (targetEl && targetEl !== rootEl) {
      targetEl = targetEl.parentNode;
    }
    return !!targetEl;
  }

  // TODO Refactor this(make shorter) in future
  nestedFilter(item, text, targetScope) {
    let result = JSON.parse(JSON.stringify(item));
    let iter = 0;

    const getSearchField = (obj) => {
      if (typeof obj.searchField !== 'undefined') {
        return obj.searchField;
      }
      return obj.label;
    };

    const compare = (searchField) => {
      return searchField.toLowerCase().indexOf(text.toLowerCase()) !== -1 &&
        (!targetScope || item.scope === targetScope);
    };

    const searchField = getSearchField(item);
    if (item.items && item.items.length > 0) {
      if (!result) result = {};
      result.items = [];
      for (iter; iter < item.items.length; iter++) {
        const subItem = item.items[iter];
        const subItemSearchField = getSearchField(subItem);

        if (compare(subItemSearchField)) {
          if (subItem) {
            result.items.push(subItem);
          }
        } else {
          if (this.nestedFilter(subItem, text)) {
            result.items.push(this.nestedFilter(subItem, text));
          }
        }
      }
      if (result.items) {
        if (result.items.length > 0) {
          return result;
        } else if (compare(searchField)) {
          result.items = item.items;
          return result;
        }
      }
    } else {
      if (compare(searchField)) {
        return item;
      }
    }
    return null;
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
      disableResetSelection,
      itemRender,
      disabled,
      wrapperStyle,
      noDataLabel,
      selectedPickRender,
      onComplete,
      placeholder,
      ...props
    } = this.props;
    delete props.onSelect;

    // Getting selected Lookup entry by value
    const selectedLookupEntry = this.getSelectedLookupEntry(data, selected);

    const dropdown = (
      <LookupCandidateList
        data={ data }
        focus={ this.state.focusFirstCandidate }
        hidden={ !opened }
        loading={ loading }
        filter={ lookupFilter ?
        (entry) => lookupFilter(entry, searchText, targetScope)
        :
        (entry) => this.nestedFilter(entry, searchText, targetScope)
        }
        noDataLabel={ noDataLabel }
        itemRender={ itemRender }
        header={ listHeader }
        footer={ listFooter }
        onSelect={ this.onLookupItemSelect.bind(this) }
        onBlur={ this.onBlur.bind(this) }
      />
    );
    const hasSelection = (selected && selected !== TEMP_EMPTY_VALUE);
    const lookupClassNames = classnames(
      'slds-lookup',
      { 'slds-has-selection': hasSelection },
      className
    );
    const formElemProps = {
      id, totalCols, cols, label, required, error, dropdown, style: wrapperStyle,
    };
    debugger;
    return (
      <FormElement formElementRef={ node => (this.node = node) } { ...formElemProps }>
        <div
          className={ lookupClassNames }
          data-select='single'
          data-scope={ props.scopes ? 'multi' : 'single' }
          data-typeahead={ false }
        >
          {
            hasSelection ?
              <LookupSelection
                id={ id }
                disabled={ disabled }
                disableResetSelection={ disableResetSelection }
                lookupSelectionRef={ node => (this.selection = node) }
                selected={ selectedLookupEntry }
                onResetSelection={ this.onResetSelection.bind(this) }
                selectedPickRender={ selectedPickRender }
              /> :
              <LookupSearch
                { ...props }
                id={ id }
                disabled={ disabled }
                lookupSearchRef={ node => (this.search = node) }
                searchText={ searchText }
                targetScope={ targetScope }
                onScopeMenuClick={ this.onScopeMenuClick.bind(this) }
                onScopeChange={ this.onScopeChange.bind(this) }
                onChange={ this.onSearchTextChange.bind(this) }
                onSubmit={ () => this.onLookupRequest(searchText) }
                onPressDown={ this.onFocusFirstCandidate.bind(this) }
                onComplete={ onComplete }
                onClick={ this.onClick.bind(this) }
                onBlur={ this.onBlur.bind(this) }
                placeholder={ placeholder }
              />
          }
        </div>
      </FormElement>
    );
  }
}


Lookup.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: FormElement.propTypes.error,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
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
  placeholder: PropTypes.string,

  selected: PropTypes.string,
  defaultSelected: PropTypes.string,
  onClick: PropTypes.func,
  selectedPickRender: PropTypes.func,
  disabled: PropTypes.bool,
  disableResetSelection: PropTypes.bool,
  allowEmpty: PropTypes.bool,
  itemRender: PropTypes.func,
  wrapperStyle: PropTypes.object,
  noDataLabel: PropTypes.string,
};

Lookup.defaultProps = {
  allowEmpty: false,
};

Lookup.isFormElement = true;
