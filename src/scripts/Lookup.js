import React, { Component, PropTypes } from 'react';
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

  render() {
    const { className, selected, ...props } = this.props;
    const lookupClassNames = classnames(
      'slds-lookup',
      'slds-has-selection',
      className
    );
    return (
      <div className={ lookupClassNames } data-select='single' data-scope='single' data-typeahead={ false }>
        <div className='slds-pill__container'>
          <a href='javascript:void(0)' className='slds-pill'>
            {
              selected.icon ?
              <Icon className='slds-pill_icon' category={ selected.category } icon={ selected.icon } /> :
              undefined
            }
            <span className='slds-pill__label'>{ selected.label }</span>
            <Button className='slds-pill__remove' type='icon-bare' icon='close' alt='Remove'
              onClick={ this.props.onResetSelection }
            />
          </a>
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
      this.props.onSubmit();
    } else if (e.keyCode === 40) { // down key
      e.preventDefault();
      e.stopPropagation();
      this.props.onSubmit();
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
    const { className, searchText, ...props } = this.props;
    const lookupClassNames = classnames(
      'slds-lookup',
      'slds-has-selection',
      className
    );
    return (
      <div className='slds-input-has-icon slds-input-has-icon--right'>
        <Input ref='input' value={ searchText } { ...props }
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
  searchText: PropTypes.string,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

/**
 *
 */
class LookupCandidateList extends Component {

  onSelect(entry) {
    if (this.props.onSelect) {
      this.props.onSelect(entry);
    }
  }

  renderCandidate(entry) {
    return (
      <li className='slds-lookup__item' key={ entry.value }>
        <a onClick={ () => this.onSelect(entry) } role='option'>
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
    const { data = [], loading } = this.props;
    const [firstEntry, lastEntry] = React.Children.toArray(this.props.children);
    return (
      <div className='slds-lookup__menu' role='listbox'>
        {
          firstEntry ?
          <div className='slds-lookup__item'>{ firstEntry }</div> :
          undefined
        }
        <ul className='slds-lookup__list' role='presentation'>
          { data.map(this.renderCandidate.bind(this)) }
          {
            loading ?
            <li className='slds-lookup__item' key='loading'>
              <Spinner size='small' style={ { margin: '0 auto' } } />
            </li> :
            undefined
          }
        </ul>
        {
          lastEntry ?
          <div className='slds-lookup__item'>{ lastEntry }</div> :
          undefined
        }
      </div>
    );
  }

}

LookupCandidateList.propTypes = {
  data: PropTypes.arrayOf(LookupEntryType),
  loading: PropTypes.bool,
  onSelect: PropTypes.func,
  children: PropTypes.node,
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
    };
  }

  onSearchTextChange(searchText) {
    if (this.props.onChange) {
      this.props.onChange(searchText);
    }
    this.setState({ searchText });
  }

  onLookupRequest(searchText) {
    if (this.props.onLookupRequest) {
      this.props.onLookupRequest(searchText);
    } else { // Uncontrolled
      this.setState({ opened: true });
    }
  }

  onResetSelection() {
    if (this.props.onSelect) {
      this.props.onSelect(null);
    }
    this.setState({ selected: null });
  }

  onLookupItemSelect(selected) {
    if (this.props.onSelect) {
      this.props.onSelect(selected);
    }
    if (this.props.onClose) {
      this.props.onClose();
    }
    this.setState({ selected, opened: false });
  }

  render() {
    const {
      totalCols, cols, label,
      selected = this.state.selected, defaultSelected,
      opened = this.state.opened, defaultOpened,
      searchText = this.state.searchText, defaultSearchText,
      children, ...props
    } = this.props;
    const dropdown =
      opened && !selected ?
      <LookupCandidateList { ...props }
        filterText={ searchText }
        onSelect={ this.onLookupItemSelect.bind(this) }
      >
        { children }
      </LookupCandidateList> :
      undefined;
    const formElemProps = { id: props.id, totalCols, cols, label, dropdown };
    return (
      <FormElement { ...formElemProps }>
        {
          selected ?
          <LookupSelection selected={ selected } { ...props }
            onResetSelection={ this.onResetSelection.bind(this) }
          /> :
          <LookupSearch { ...props }
            searchText={ searchText }
            onChange={ this.onSearchTextChange.bind(this) }
            onSubmit={ this.onLookupRequest.bind(this) }
          />
        }
      </FormElement>
    );
  }
}


LookupInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  data: PropTypes.arrayOf(LookupEntryType),
  selected: LookupEntryType,
  defaultSelected: LookupEntryType,
  opened: PropTypes.bool,
  defaultOpened: PropTypes.bool,
  searchText: PropTypes.string,
  defaultSearchText: PropTypes.string,
  children: PropTypes.node,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onLookupRequest: PropTypes.func,
  onSelect: PropTypes.func,
  onClose: PropTypes.func,
  onComplete: PropTypes.func,
  totalCols: PropTypes.number,
  cols: PropTypes.number,
};

LookupInput.isFormElement = true;
