import React, { PropTypes } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { text, boolean, object } from '@storybook/addon-knobs';
import { Button, Lookup } from '../src/scripts';
import COMPANIES from './data/COMPANIES';
import OPPORTUNITIES from './data/OPPORTUNITIES';
import CAMPAIGNS from './data/CAMPAIGNS';
import CASES from './data/CASES';
import SCOPES from './data/SCOPES';

/**
 * example data set used for lookup datasource
 */
const COMPANY_DATA = COMPANIES.map((label, i) => ({
  icon: 'standard:account',
  label,
  value: `10000${i}`,
  meta: '(888)000-0000 / 1234 XXX Ave, BBB City, CA, 90210 USA',
  scope: 'Account',
}));

const OPP_DATA = COMPANIES.map((label, i) => ({
  icon: 'standard:opportunity',
  label: `${label} - ${OPPORTUNITIES[i % OPPORTUNITIES.length]}`,
  value: `20000${i}`,
  scope: 'Opportunity',
}));

const CAMPAIGN_DATA = CAMPAIGNS.map((label, i) => ({
  icon: 'standard:campaign',
  label,
  value: `30000${i}`,
  scope: 'Campaign',
}));

const CASE_DATA = CASES.map((label, i) => ({
  icon: 'standard:case',
  label,
  value: `40000${i}`,
  scope: 'Case',
}));

const LOOKUP_SCOPES = SCOPES.map(label => ({
  label,
  value: label,
  icon: `standard:${label.toLowerCase()}`,
}));

const LOOKUP_DATASET = [
  ...COMPANY_DATA,
  ...OPP_DATA,
  ...CAMPAIGN_DATA,
  ...CASE_DATA,
];

/**
 * Async function to load datasets
 */
function queryData(searchText, targetScope, callback) {
  setTimeout(() => {
    const data = LOOKUP_DATASET.filter(
      entry => (
        entry.scope === targetScope &&
        entry.label.toUpperCase().indexOf(searchText.toUpperCase()) === 0
      )
    );
    callback(data);
  }, 1000);
}

/**
 * state wrapper class for showing controlled behavior
 */
class LookupControlled extends React.Component {
  static propTypes = {
    scopes: PropTypes.arrayOf(PropTypes.object),
    targetScope: PropTypes.string,
    onScopeMenuClick: PropTypes.func,
    onScopeChange: PropTypes.func,
    onSearchTextChange: PropTypes.func,
    onLookupRequest: PropTypes.func,
    onSelect: PropTypes.func,
    onComplete: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchText: '',
      selected: null,
      loading: false,
      opened: false,
      scopes: props.scopes,
      targetScope: props.targetScope,
    };
  }
  onScopeMenuClick = (...args) => {
    if (this.props.onScopeMenuClick) { this.props.onScopeMenuClick(...args); }
    this.setState({ opened: false });
  }
  onScopeChange = (targetScope) => {
    if (this.props.onScopeChange) { this.props.onScopeChange(targetScope); }
    this.setState({ targetScope });
  }
  onSearchTextChange = (searchText) => {
    if (this.props.onSearchTextChange) { this.props.onSearchTextChange(searchText); }
    this.setState({ searchText });
  }
  onLookupRequest = (searchText) => {
    if (this.props.onLookupRequest) { this.props.onLookupRequest(searchText); }
    this.setState({ data: [], loading: true, opened: true });
    queryData(searchText || '', this.state.targetScope || 'Account', (data) => {
      this.setState({ data, loading: false });
    });
  }
  onSelect = (selected) => {
    if (this.props.onSelect) { this.props.onSelect(selected); }
    this.setState({ selected });
  }
  onComplete = (...args) => {
    this.props.onComplete(...args);
    this.setState({ opened: false });
  }
  render() {
    return (
      <Lookup
        { ...this.props }
        opened={ this.state.opened }
        searchText={ this.state.searchText }
        selected={ this.state.selected }
        data={ this.state.data }
        loading={ this.state.loading }
        scopes={ this.state.scopes }
        targetScope={ this.state.targetScope }
        onScopeChange={ this.onScopeChange }
        onScopeMenuClick={ this.onScopeMenuClick }
        onSearchTextChange={ this.onSearchTextChange }
        onLookupRequest={ this.onLookupRequest }
        onSelect={ this.onSelect }
        onComplete={ this.onComplete }
      />
    );
  }
}


/**
 * Lookup stories
 */
storiesOf('Lookup', module)
  .add('Controlled with knobs', withInfo('Lookup controlled with knobs')(() => (
    <Lookup
      label={ text('label', 'Lookup Label') }
      error={ text('error') }
      required={ boolean('required') }
      disabled={ boolean('disabled') }
      data={ COMPANY_DATA }
      selected={ object('selected') }
      loading={ boolean('loading') }
      opened={ boolean('opened') }
      onSearchTextChange={ action('searchTextChange') }
      onLookupRequest={ action('lookupRequest') }
      onSelect={ action('select') }
      onBlur={ action('blur') }
      onComplete={ action('complete') }
    />
  )))
  .add('With search text', withInfo('Lookup component with search input text')(() => (
    <Lookup
      label='Lookup Label'
      searchText='A'
      onSearchTextChange={ action('searchTextChange') }
      onLookupRequest={ action('lookupRequest') }
      onSelect={ action('select') }
      onBlur={ action('blur') }
      onComplete={ action('complete') }
    />
  )))
  .add('With search icon in left', withInfo('Lookup component with search text and search icon in left side')(() => (
    <Lookup
      label='Lookup Label'
      searchText='A'
      iconAlign='left'
      onSearchTextChange={ action('searchTextChange') }
      onLookupRequest={ action('lookupRequest') }
      onSelect={ action('select') }
      onBlur={ action('blur') }
      onComplete={ action('complete') }
    />
  )))
  .add('With selection', withInfo('Lookup component with item selected')(() => (
    <Lookup
      label='Lookup Label'
      selected={ COMPANY_DATA[0] }
      onSearchTextChange={ action('searchTextChange') }
      onLookupRequest={ action('lookupRequest') }
      onSelect={ action('select') }
      onBlur={ action('blur') }
      onComplete={ action('complete') }
    />
  )))
  .add('In Loading', withInfo('Lookup component in loading candidates')(() => (
    <Lookup
      label='Lookup Label'
      searchText='A'
      opened
      loading
      onSearchTextChange={ action('searchTextChange') }
      onLookupRequest={ action('lookupRequest') }
      onSelect={ action('select') }
      onBlur={ action('blur') }
      onComplete={ action('complete') }
    />
  )))
  .add('Active', withInfo('Lookup component with candidates in dropdown')(() => (
    <div style={ { height: 350 } }>
      <Lookup
        label='Lookup Label'
        searchText='A'
        opened
        data={ COMPANY_DATA }
        selected={ null }
        onSearchTextChange={ action('searchTextChange') }
        onLookupRequest={ action('lookupRequest') }
        onSelect={ action('select') }
        onBlur={ action('blur') }
        onComplete={ action('complete') }
      />
    </div>
  )))
  .add('With list header/footer', withInfo('Lookup component with header/footer component in the candidate list')(() => (
    <div style={ { height: 420 } }>
      <Lookup
        label='Lookup Label'
        searchText='A'
        opened
        data={ COMPANY_DATA }
        selected={ null }
        listHeader={ <Button icon='search' iconAlign='left'>&quot;A&quot; in Account</Button> }
        listFooter={ <Button icon='add' iconAlign='left'>Add new Account</Button> }
        onSearchTextChange={ action('searchTextChange') }
        onLookupRequest={ action('lookupRequest') }
        onSelect={ action('select') }
        onBlur={ action('blur') }
        onComplete={ action('complete') }
      />
    </div>
  )))
  .add('Multi Scope', withInfo('Lookup component which allows multiples scopes to select as lookup datasource')(() => (
    <Lookup
      label='Lookup (multiple scope)'
      opened={ false }
      selected={ null }
      searchText='A'
      scopes={ LOOKUP_SCOPES }
      onScopeMenuClick={ action('scopeMenuClick') }
      onScopeChange={ action('scopeChange') }
      onSearchTextChange={ action('searchTextChange') }
      onLookupRequest={ action('lookupRequest') }
      onSelect={ action('select') }
      onBlur={ action('blur') }
      onComplete={ action('complete') }
    />
  )))
  .add('Multi Scope - Disabled', withInfo('Lookup component which allows multiples scopes selection, but in disabled status')(() => (
    <Lookup
      label='Lookup (multiple scope, disabled)'
      opened={ false }
      selected={ null }
      disabled
      scopes={ LOOKUP_SCOPES }
      onScopeMenuClick={ action('scopeMenuClick') }
      onScopeChange={ action('scopeChange') }
      onSearchTextChange={ action('searchTextChange') }
      onLookupRequest={ action('lookupRequest') }
      onSelect={ action('select') }
      onBlur={ action('blur') }
      onComplete={ action('complete') }
    />
  )))
  .add('Controlled', withInfo('Lookup component whose state is controlled from outside')(() => (
    <LookupControlled
      label='Lookup (Controlled)'
      onSearchTextChange={ action('searchTextChange') }
      onLookupRequest={ action('lookupRequest') }
      onSelect={ action('select') }
      onComplete={ action('complete') }
    />
  )))
  .add('Uncontrolled', withInfo('Lookup component whose state is managed inside of the component')(() => (
    <Lookup
      label='Lookup (Uncontrolled)'
      defaultSearchText='A'
      data={ COMPANY_DATA }
      lookupFilter={
        (entry, searchText) => entry.label.toUpperCase().indexOf(searchText.toUpperCase()) === 0
      }
      onSearchTextChange={ action('searchTextChange') }
      onLookupRequest={ action('lookupRequest') }
      onSelect={ action('select') }
      onComplete={ action('complete') }
    />
  )))
  .add('Controlled with Multi Scope', withInfo('Lookup component whose state is controlled from outside, search scope is selectable from multiple scope')(() => (
    <LookupControlled
      label='Lookup (Controlled, Multi Scope)'
      scopes={ LOOKUP_SCOPES }
      onScopeMenuClick={ action('scopeMenuClick') }
      onScopeChange={ action('scopeChange') }
      onSearchTextChange={ action('searchTextChange') }
      onLookupRequest={ action('lookupRequest') }
      onSelect={ action('select') }
      onComplete={ action('complete') }
    />
  )))
  .add('Uncontrolled with Multi Scope', withInfo('Lookup component whose state is managed inside of the component, search scope is selectable from multiple scope')(() => (
    <Lookup
      label='Lookup (Uncontrolled, Multi Scope)'
      scopes={ LOOKUP_SCOPES }
      defaultTargetScope='Opportunity'
      defaultSearchText='A'
      data={ LOOKUP_DATASET }
      lookupFilter={ (entry, searchText, scope) => (
        entry.scope === scope &&
        entry.label.toUpperCase().indexOf(searchText.toUpperCase()) === 0
      ) }
      onScopeMenuClick={ action('scopeMenuClick') }
      onScopeChange={ action('scopeChange') }
      onSearchTextChange={ action('searchTextChange') }
      onLookupRequest={ action('lookupRequest') }
      onSelect={ action('select') }
      onComplete={ action('complete') }
    />
  )))
;
