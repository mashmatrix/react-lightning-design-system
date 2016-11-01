import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Input from './Input';
import Icon from './Icon';
import DropdownButton from './DropdownButton';
import { DropdownMenuItem } from './DropdownMenu';
import { registerStyle } from './util';

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
        '{ width: 100%; }',
      ],
    ]);
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
      this.props.onInputClicked();
    }
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
          ref='input'
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
