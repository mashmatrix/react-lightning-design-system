import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import uuid from 'uuid';
import FormElement from './FormElement';
import Input from './Input';
import Icon from './Icon';
import Spinner from './Spinner';
import Button from './Button';
import DropdownButton from './DropdownButton';
import { DropdownMenuItem } from './DropdownMenu';
import { registerStyle } from './util';
import InfiniteScroll from 'react-infinite-scroll-container';
import PropTypes from './propTypesImport';
/**
 *
 */
class LookupSelection extends Component {
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.pillRef = this.pillRef.bind(this);
  }

  componentDidMount() {
    if (this.props.autoFocus) ReactDOM.findDOMNode(this.pill).focus();
  }

  onKeyDown(e) {
    if (e.keyCode === 8 || e.keyCode === 46) { // Bacspace / DEL
      e.preventDefault();
      e.stopPropagation();
      if (this.props.onResetSelection) {
        this.props.onResetSelection(true);
      }
    }
  }

  pillRef(ref) {
    this.pill = ref;
  }

  renderPillResetButton() {
    return (<Button
      className='slds-pill__remove'
      type='icon-bare'
      icon='close'
      alt='Remove'
      tabIndex={ -1 }
      onClick={ this.props.onResetSelection }
      key={'resetButton'}
    />);
  }

  renderPillSelectedLabel() {
    const { selected, htmlAttributes } = this.props;
    return (<span
      className='slds-pill__label'
      {...htmlAttributes}
      key={'selectedLabel'}
    >{ selected.label }</span>);
  }

  renderPillSelectedIcon() {
    const { selected } = this.props;
    return (selected.icon ?
      <Icon
        className='slds-pill__icon'
        category={ selected.category }
        icon={ selected.icon }
        key={'selectedIcon'}
      /> :
      undefined);
  }

  renderLookUpData() {
    const { selected, htmlAttributes } = this.props;
    return [
      this.renderPillSelectedIcon(selected),
      this.renderPillSelectedLabel(selected, htmlAttributes),
      this.renderPillResetButton(),
    ];
  }

  renderPill() {
    const onPillClick = (e) => {
      e.target.focus();
      e.preventDefault();
      e.stopPropagation();
    };
    const { lookupReadOnly } = this.props;
    const styles = { height: '28px' };
    const lookupProps = { style: styles, className: 'slds-pill slds-truncate',
      id: this.props.id, ref: this.pillRef, tabIndex: 0 };

    return (
      lookupReadOnly ? <span {...lookupProps}>
        {this.renderLookUpData()}
      </span> :
        <a {...lookupProps} onKeyDown={this.onKeyDown} onClick={onPillClick}>
          {this.renderLookUpData()}
        </a>
    );
  }

  render() {
    const { hidden, selected } = this.props;
    const lookupClassNames = classnames(
      { 'slds-hide': hidden }
    );
    return (
      <div className={ lookupClassNames }>
        <div className='slds-pill__container'>
          { selected ? this.renderPill() : undefined }
        </div>
      </div>
    );
  }

}

const LookupEntryType = PropTypes.shape({
  category: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  context: PropTypes.object,
});

LookupSelection.propTypes = {
  id: PropTypes.string,
  selected: LookupEntryType,
  hidden: PropTypes.bool,
  onResetSelection: PropTypes.func,
  autoFocus: PropTypes.bool,
  htmlAttributes: PropTypes.object,
  lookupReadOnly: PropTypes.bool,
};


/**
 *
 */
class LookupSearch extends Component {
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
        '{ width: 100%; }',
      ],
    ]);

    this.inputRef = this.inputRef.bind(this);
  }

  onLookupIconClick() {
    this.props.onSubmit();
  }

  onInputKeyDown(e) {
    if (e.keyCode === 13) { // return key
      e.preventDefault();
      e.stopPropagation();
      const searchText = e.target.value;
      if (searchText) {
        this.props.onSubmit();
      } else {
        // if no search text, quit lookup search
        if (this.props.onComplete) {
          this.props.onComplete();
        }
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
      if (this.props.onComplete) {
        this.props.onComplete(cancel);
      }
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
  onInputClicked(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
    if (this.props.onInputClicked) {
      this.props.onInputClicked(e.target.value);
    }
  }

  inputRef(ref) {
    this.input = ref;
  }

  renderSearchInput(props) {
    const { className, hidden, searchText, iconAlign = 'left', ...pprops } = props;
    delete pprops.onInputClicked;
    const searchInputClassNames = classnames(
      'slds-grid',
      'slds-input-has-icon',
      `slds-input-has-icon--${iconAlign}`,
      { 'slds-hide': hidden },
      className
    );
    return (
      <div className={ searchInputClassNames }>
        <Input
          { ...pprops }
          ref={this.inputRef}
          value={ searchText }
          onKeyDown={ this.onInputKeyDown.bind(this) }
          onChange={ this.onInputChange.bind(this) }
          onBlur={ this.onInputBlur.bind(this) }
          onClick={ this.onInputClicked.bind(this) }
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
    const icon = <Icon icon={ targetScope.icon || 'none' } className={'slds-pill__icon'} />;
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
          { scopes.map((scope) => <DropdownMenuItem key={ scope.value } { ...scope } />) }
        </DropdownButton>
      </div>
    );
  }

  render() {
    const { scopes, hidden, targetScope, ...props } = this.props;
    if (scopes) {
      const lookupSearchClassNames = classnames(
        'slds-grid',
        'slds-form-element__control',
        'slds-box--border',
        { 'slds-hide': hidden }
      );
      const styles = { WebkitFlexWrap: 'nowrap', msFlexWrap: 'nowrap', flexWrap: 'nowrap', height: '32px' };
      return (
        <div className={ lookupSearchClassNames } style={ styles }>
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
  hidden: PropTypes.bool,
  searchText: PropTypes.string,
  scopes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      icon: PropTypes.string,
      externalIcon: PropTypes.object,
    })
  ),
  targetScope: PropTypes.any,
  iconAlign: PropTypes.arrayOf(ICON_ALIGNS),
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onScopeMenuClick: PropTypes.func,
  onScopeChange: PropTypes.func,
  onPressDown: PropTypes.func,
  onSubmit: PropTypes.func,
  onComplete: PropTypes.func,
  onInputClicked: PropTypes.func,
  onFocus: PropTypes.func,
};

/**
 *
 */
class LookupCandidateList extends Component {

  componentDidMount() {
    this.reset = false;
    if (this.props.focus) {
      this.focusToTargetItemEl(0);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.searchText !== this.props.searchText) this.reset = true;
    else this.reset = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.focus && !prevProps.focus) {
      this.focusToTargetItemEl(0);
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
    const el = ReactDOM.findDOMNode(this);
    const anchors = el.querySelectorAll('.react-slds-candidate[tabIndex]');
    if (anchors[index]) {
      anchors[index].focus();
    }
  }

  loadMoreData(page) {
    if (this.props.onScroll) this.props.onScroll(page);
  }

  renderCustomIcon(entry) {
    const customClasses = classnames(
      'slds-avatar',
      { 'slds-avatar--circle': entry.context.img },
      'slds-avatar--small'
    );
    return (
      <div key={ entry.label } className={'custom_icon'}>
        {(entry.context.img || entry.icon) && <div className={'slds-show--inline-block'}>
          <span className={customClasses} >
            {
              (entry.context.img)
              ? (<img src={ entry.context.img } alt='entry.context.title' />)
              : (<Icon category={ entry.category } icon={ entry.icon } size='small' />)
            }
          </span>
        </div>}
        <div
          className={classnames('slds-text-body--regular',
            'slds-show--inline-block',
            'slds-p-left--x-small')}
          style={ { verticalAlign: 'top' } }
        >
          <div >{ entry.context.title }</div>
          <div className='slds-text-body--small'>{entry.context.sub_title}</div>
        </div>
      </div>);
  }

  renderCandidate(entry) {
    const icon = entry.context ?
      this.renderCustomIcon(entry) :
      <Icon category={ entry.category } icon={ entry.icon } size='small' />;
    return (
      <li className='slds-lookup__item' key={ `${entry.value}_${entry.label}` }>
        <a
          className='slds-truncate react-slds-candidate'
          tabIndex={ -1 }
          role='option'
          onKeyDown={ (e) => e.keyCode === 13 && this.onSelect(entry) }
          onBlur={ this.props.onBlur }
          onClick={ () => this.onSelect(entry) }
        >
        { icon }
        { !this.props.hideLabel ? entry.label : null }
        </a>
      </li>
    );
  }

  render() {
    const { data = [], hidden, loading, header, footer, filter = () => true } = this.props;
    const lookupMenuClassNames = classnames(
      'slds-lookup__menu',
      { 'slds-hide': hidden, 'slds-show': !hidden }
    );
    return (
      <div
        className={ lookupMenuClassNames }
        role='listbox'
        onKeyDown={ this.onKeyDown.bind(this) }
      >
        {
          header ?
            <div className='slds-lookup__item'>{ header }</div> :
            undefined
        }
        <ul className='slds-lookup__list' role='presentation'>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMoreData.bind(this)}
            hasMore={this.props.hasMore}
            useWindow={false}
            element='div'
            initialLoad={false}
            threshold={20}
            resetPageLoader={this.reset}
            loader={<li className='slds-lookup__item' key='loading'>
              <Spinner size='small' style={ { margin: '0 auto' } } />
            </li>}
          >
          {
            data.filter(filter).map(this.renderCandidate.bind(this))
          }
          </InfiniteScroll>
          {
            loading ?
              <li className='slds-lookup__item' key='loading'>
                <Spinner size='small' style={ { margin: '0 auto' } } />
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

LookupCandidateList.propTypes = {
  data: PropTypes.arrayOf(LookupEntryType),
  focus: PropTypes.bool,
  loading: PropTypes.bool,
  hidden: PropTypes.bool,
  hideLabel: PropTypes.bool,
  filter: PropTypes.func,
  onSelect: PropTypes.func,
  onBlur: PropTypes.func,
  header: PropTypes.node,
  footer: PropTypes.node,
  hasMore: PropTypes.bool,
  searchText: PropTypes.string,
  onScroll: PropTypes.func,
};

/**
 *
 */
export default class Lookup extends Component {
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
    this.onResetSelectionByX = this.onResetSelectionByX.bind(this);
    this.candidateListRef = this.candidateListRef.bind(this);
    this.selectionRef = this.selectionRef.bind(this);
    this.searchRef = this.searchRef.bind(this);
  }

  onScopeMenuClick(e) {
    this.props.onBlur();
    if (this.props.onScopeMenuClick) {
      this.props.onScopeMenuClick(e);
    }
  }

  onScopeChange(targetScope) {
    this.setState({ targetScope, searchText: '' });
    if (this.props.onScopeChange) {
      this.props.onScopeChange(targetScope);
    }
  }

  onSearchTextChange(searchText, page) {
    this.setState({ searchText });
    if (this.props.onSearchTextChange) {
      this.props.onSearchTextChange(searchText, page);
    }
  }

  onScroll(page) {
    if (this.props.onScroll) {
      this.props.onScroll(this.state.searchText, page);
    }
  }

  onLookupRequest(searchText) {
    this.setState({ opened: true });
    if (this.props.onLookupRequest) {
      this.props.onLookupRequest(searchText);
    }
  }

  onResetSelectionByX() {
    this.onResetSelection(this.state.searchText !== '');
  }

  onResetSelection(invokeSearchByText) {
    this.setState({ selected: null });
    if (this.props.onSelect) {
      this.props.onSelect(null);
    }
    if (invokeSearchByText) this.onSearchTextChange('');
    this.onLookupRequest('');
    setTimeout(() => {
      const searchElem = ReactDOM.findDOMNode(this.search);
      if (searchElem) {
        const inputElem = searchElem.querySelector('input');
        inputElem.focus();
      }
    }, 10);
  }

  onLookupItemSelect(selected) {
    if (selected) {
      this.setState({ selected, opened: false });
      if (this.props.onSelect) {
        this.props.onSelect(selected);
      }
      setTimeout(() => {
        const selectionElem = ReactDOM.findDOMNode(this.selection);
        if (selectionElem) {
          const pillElem = selectionElem.querySelector('a');
          if (pillElem) { pillElem.focus(); }
        }
      }, 10);
    } else {
      this.setState({ opened: false });
      setTimeout(() => {
        const searchElem = ReactDOM.findDOMNode(this.search);
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
    const rootEl = ReactDOM.findDOMNode(this);
    let targetEl = document.activeElement;
    while (targetEl && targetEl !== rootEl) {
      targetEl = targetEl.parentNode;
    }
    return !!targetEl;
  }

  candidateListRef(ref) {
    this.candidateList = ref;
  }

  selectionRef(ref) {
    this.selection = ref;
  }

  searchRef(ref) {
    this.search = ref;
  }

  render() {
    const id = this.props.id || this.state.id;
    const {
      totalCols, cols,
      label, required, error,
      className,
      hideLabel,
      selected = this.state.selected,
      opened = this.state.opened,
      searchText = this.state.searchText,
      targetScope = this.state.targetScope,
      loading, lookupFilter,
      listHeader, listFooter,
      data,
      onComplete,
      hasMore,
      htmlAttributes,
      lookupReadOnly,
      ...props,
    } = this.props;
    const dropdown = (
      <LookupCandidateList
        ref={this.candidateListRef}
        data={ data }
        focus={ this.state.focusFirstCandidate }
        hidden={ !opened }
        loading={ loading }
        hideLabel={ hideLabel }
        filter={ lookupFilter ? (entry) => lookupFilter(entry, searchText, targetScope) : undefined }
        header={ listHeader }
        footer={ listFooter }
        onSelect={ this.onLookupItemSelect.bind(this) }
        onBlur={ this.onBlur.bind(this) }
        searchText={ searchText }
        onScroll={ this.onScroll.bind(this) }
        hasMore={hasMore}
      />
    );
    const lookupClassNames = classnames(
      'slds-lookup',
      { 'slds-has-selection': selected },
      className
    );
    const formElemProps = { id, totalCols, cols, label, required, error, dropdown };
    return (
      <FormElement { ...formElemProps }>
        <div
          className={ lookupClassNames }
          data-select='single'
          data-scope={ props.scopes ? 'multi' : 'single' }
          data-typeahead={ false }
        >
          {
            (selected) ?
              <LookupSelection
                htmlAttributes={htmlAttributes}
                autoFocus={props.autoFocus}
                id={ id }
                ref={this.selectionRef}
                selected={ selected }
                onResetSelection={ this.onResetSelectionByX.bind(this) }
                lookupReadOnly={ lookupReadOnly }
              /> :
              <LookupSearch
                { ...props }
                id={ id }
                ref={this.searchRef}
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
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.shape({
      message: PropTypes.string,
    }),
  ]),
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  selected: LookupEntryType,
  defaultSelected: LookupEntryType,
  opened: PropTypes.bool,
  hideLabel: PropTypes.bool,
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
  iconAlign: PropTypes.arrayOf(ICON_ALIGNS),
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
  onInputClicked: PropTypes.func,
  autoFocus: PropTypes.bool,
  hasMore: PropTypes.bool,
  onScroll: PropTypes.func,
  htmlAttributes: PropTypes.object,
  lookupReadOnly: PropTypes.bool,
};

Lookup.isFormElement = true;
