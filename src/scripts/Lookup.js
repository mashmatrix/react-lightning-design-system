import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import FormElement from './FormElement';
import Input from './Input';
import Icon from './Icon';
import Spinner from './Spinner';
import Button from './Button';

/**
 *
 */
class LookupSelection extends Component {
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
      <a className='slds-pill'
        ref='pill'
        onKeyDown={ this.onKeyDown.bind(this) }
        onClick={ onPillClick }
        tabIndex={ 0 }
      >
        {
          selected.icon ?
          <Icon className='slds-pill__icon' category={ selected.category } icon={ selected.icon } /> :
          undefined
        }
        <span className='slds-pill__label'>{ selected.label }</span>
        <Button className='slds-pill__remove' type='icon-bare' icon='close' alt='Remove'
          tabIndex={ -1 }
          onClick={ this.props.onResetSelection }
        />
      </a>
    );
  }

  render() {
    const { className, hidden, selected, ...props } = this.props;
    const lookupClassNames = classnames(
      'slds-lookup',
      'slds-has-selection',
      className,
      { 'slds-hide': hidden }
    );
    return (
      <div className={ lookupClassNames } data-select='single' data-scope='single' data-typeahead={ false }>
        <div className='slds-pill__container'>
          { selected ? this.renderPill(selected) : undefined }
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
});

LookupSelection.propTypes = {
  className: PropTypes.string,
  selected: LookupEntryType,
  hidden: PropTypes.bool,
  onResetSelection: PropTypes.func,
};


/**
 *
 */
class LookupSearch extends Component {

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

  render() {
    const { className, hidden, searchText, ...props } = this.props;
    const lookupSearchClassNames = classnames(
      'slds-input-has-icon',
      'slds-input-has-icon--right',
      className,
      { 'slds-hide': hidden }
    );
    return (
      <div className={ lookupSearchClassNames }>
        <Input { ...props }
          ref='input'
          value={ searchText }
          onKeyDown={ this.onInputKeyDown.bind(this) }
          onChange={ this.onInputChange.bind(this) }
          onBlur={ this.onInputBlur.bind(this) }
        />
        <Icon icon='search' className='slds-input__icon' style={ { cursor: 'pointer' } }
          onClick={ this.onLookupIconClick.bind(this) }
        />
      </div>
    );
  }

}


LookupSearch.propTypes = {
  className: PropTypes.string,
  hidden: PropTypes.bool,
  searchText: PropTypes.string,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onPressDown: PropTypes.func,
  onSubmit: PropTypes.func,
  onComplete: PropTypes.func,
};

/**
 *
 */
class LookupCandidateList extends Component {

  componentDidMount() {
    if (this.props.focus) {
      this.focusToTargetItemEl(0);
    }
  }

  componentDidUpdate(oldProps) {
    if (this.props.focus && !oldProps.focus) {
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

  renderCandidate(entry) {
    return (
      <li className='slds-lookup__item' key={ entry.value }>
        <a className='slds-truncate react-slds-candidate' tabIndex={ -1 } role='option'
          onKeyDown={ (e) => e.keyCode === 13 && this.onSelect(entry) }
          onBlur={ this.props.onBlur }
          onClick={ () => this.onSelect(entry) }
        >
          {
            entry.icon ?
            <Icon category={ entry.category } icon={ entry.icon } size='small' /> :
            undefined
          }
          { entry.label }
        </a>
      </li>
    );
  }

  render() {
    const { data = [], hidden, loading, header, footer, filter = () => true } = this.props;
    const lookupMenuClassNames = classnames(
      'slds-lookup__menu',
      { 'slds-hide': hidden }
    );
    return (
      <div className={ lookupMenuClassNames } role='listbox'
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
  filter: PropTypes.func,
  onSelect: PropTypes.func,
  onBlur: PropTypes.func,
  header: PropTypes.node,
  footer: PropTypes.node,
};


/**
 *
 */
export default class LookupInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.defaultSelected,
      opened: props.defaultOpened,
      searchText: props.defaultSearchText,
      focusFirstCandidate: false,
    };
  }

  onSearchTextChange(searchText) {
    if (this.props.onChange) {
      this.props.onChange(searchText);
    }
    this.setState({ searchText });
  }

  onLookupRequest(searchText) {
    if (this.props.onLookupRequest) { // Controlled
      this.props.onLookupRequest(searchText);
    } else { // Uncontrolled
      this.setState({ opened: true });
    }
  }

  onLookupCancel() {
    if (this.props.onLookupCancel) { // Controlled
      this.props.onLookupCancel();
    } else { // Uncontrolled
      this.setState({ opened: false });
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
        const pillElem = selectionElem.querySelector('a');
        if (pillElem) { pillElem.focus(); }
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

  onBlur() {
    setTimeout(() => {
      if (!this.isFocusedInComponent()) {
        this.setState({ opened: false });
        if (this.props.onBlur) {
          this.props.onBlur();
        }
        if (this.props.onComplete) {
          this.props.onComplete();
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
    const {
      totalCols, cols, label,
      selected = this.state.selected, defaultSelected,
      opened = this.state.opened, defaultOpened,
      searchText = this.state.searchText, defaultSearchText,
      lookupFilter,
      listHeader,
      listFooter,
      data, ...props,
    } = this.props;
    const dropdown = (
      <LookupCandidateList { ...props }
        ref='candidateList'
        data={ data }
        focus={ this.state.focusFirstCandidate }
        hidden={ !opened }
        filter={ lookupFilter ? (entry) => lookupFilter(entry, searchText) : undefined }
        header={ listHeader }
        footer={ listFooter }
        onSelect={ this.onLookupItemSelect.bind(this) }
        onBlur={ this.onBlur.bind(this) }
      />
    );
    const formElemProps = { id: props.id, totalCols, cols, label, dropdown };
    return (
      <FormElement { ...formElemProps }>
        <div>
          <LookupSelection { ...props }
            ref='selection'
            selected={ selected }
            hidden={ !selected }
            onResetSelection={ this.onResetSelection.bind(this) }
          />
          <LookupSearch { ...props }
            ref='search'
            hidden={ !!selected }
            searchText={ searchText }
            onChange={ this.onSearchTextChange.bind(this) }
            onSubmit={ () => this.onLookupRequest(searchText) }
            onPressDown={ this.onFocusFirstCandidate.bind(this) }
            onComplete={ this.onLookupCancel.bind(this) }
            onBlur={ this.onBlur.bind(this) }
          />
        </div>
      </FormElement>
    );
  }
}


LookupInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  selected: LookupEntryType,
  defaultSelected: LookupEntryType,
  opened: PropTypes.bool,
  defaultOpened: PropTypes.bool,
  searchText: PropTypes.string,
  defaultSearchText: PropTypes.string,
  data: PropTypes.arrayOf(LookupEntryType),
  lookupFilter: PropTypes.func,
  listHeader: PropTypes.node,
  listFooter: PropTypes.node,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onLookupRequest: PropTypes.func,
  onLookupCancel: PropTypes.func,
  onSelect: PropTypes.func,
  onComplete: PropTypes.func,
  totalCols: PropTypes.number,
  cols: PropTypes.number,
};

LookupInput.isFormElement = true;
