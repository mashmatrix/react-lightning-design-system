import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import uuid from 'uuid';
import FormElement from './FormElement';
import LookupSearch from './LookupSearch';
import LookupCandidateList from './LookupCandidateList';
import LookupSelection from './LookupSelection';

export default class Lookup extends Component {
  constructor(props) {
    super(props);
    // this.searchText = props.searchText;
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
    this.props.onBlur();
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

  onSearchTextChange(searchText, page) {
    this.setState({ searchText });
    if (this.props.onSearchTextChange) {
      console.log('lookup searchText', this.state.searchText);
      this.props.onSearchTextChange(searchText, page);
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
      const searchElem = ReactDOM.findDOMNode(this.refs.search);
      const inputElem = searchElem.querySelector('input');
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
        const selectionElem = ReactDOM.findDOMNode(this.refs.selection);
        if (selectionElem) {
          const pillElem = selectionElem.querySelector('a');
          if (pillElem) { pillElem.focus(); }
        }
      }, 10);
    } else {
      this.setState({ opened: false });
      setTimeout(() => {
        const searchElem = ReactDOM.findDOMNode(this.refs.search);
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
      ...props,
    } = this.props;
    const dropdown = (
      <LookupCandidateList
        ref='candidateList'
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
        onSearchTextChange={ this.onSearchTextChange.bind(this) }
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
                autoFocus={props.autoFocus}
                id={ id }
                ref='selection'
                selected={ selected }
                onResetSelection={ this.onResetSelection.bind(this) }
              /> :
              <LookupSearch
                { ...props }
                id={ id }
                ref='search'
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

const LookupEntryType = PropTypes.shape({
  category: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  context: PropTypes.object,
});

const ICON_ALIGNS = ['left', 'right'];

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
};

Lookup.isFormElement = true;
