import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean, object } from '@storybook/addon-knobs';
import { Button, Lookup, LookupEntry, LookupScope } from '../src/scripts';
import COMPANIES from './data/COMPANIES';
import OPPORTUNITIES from './data/OPPORTUNITIES';
import CAMPAIGNS from './data/CAMPAIGNS';
import CASES from './data/CASES';
import SCOPES from './data/SCOPES';

/**
 * example data set used for lookup datasource
 */
const COMPANY_DATA: LookupEntry[] = COMPANIES.map((label, i) => ({
  icon: 'standard:account',
  label,
  value: `10000${i}`,
  meta: '(888)000-0000 / 1234 XXX Ave, BBB City, CA, 90210 USA',
  scope: 'Account',
}));
const OPP_DATA: LookupEntry[] = COMPANIES.map((label, i) => ({
  icon: 'standard:opportunity',
  label: `${label} - ${OPPORTUNITIES[i % OPPORTUNITIES.length]}`,
  value: `20000${i}`,
  scope: 'Opportunity',
}));

const CAMPAIGN_DATA: LookupEntry[] = CAMPAIGNS.map((label, i) => ({
  icon: 'standard:campaign',
  label,
  value: `30000${i}`,
  scope: 'Campaign',
}));

const CASE_DATA: LookupEntry[] = CASES.map((label, i) => ({
  icon: 'standard:case',
  label,
  value: `40000${i}`,
  scope: 'Case',
}));

const LOOKUP_SCOPES: LookupScope[] = SCOPES.map((label) => ({
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
function queryData(
  searchText: string,
  targetScope: string,
  callback: (data: LookupEntry[]) => void
) {
  setTimeout(() => {
    const data = LOOKUP_DATASET.filter(
      (entry) =>
        entry.scope === targetScope &&
        entry.label.toUpperCase().indexOf(searchText.toUpperCase()) === 0
    );
    callback(data);
  }, 1000);
}

type LookupControlledProps = {
  label?: string;
  scopes?: LookupScope[];
  targetScope?: string;
  onScopeMenuClick?: (...args: any[]) => void;
  onScopeSelect?: (targetScope: string) => void;
  onSearchTextChange?: (searchText: string) => void;
  onLookupRequest?: (searchText?: string) => any;
  onSelect?: (selected: LookupEntry | null) => void;
  onComplete?: (...args: any[]) => void;
};

type LookupControlledState = {
  data: LookupEntry[];
  searchText: string;
  selected: LookupEntry | null;
  loading: boolean;
  opened: boolean;
  scopes?: LookupScope[];
  targetScope?: string;
};

/**
 * state wrapper class for showing controlled behavior
 */
class LookupControlled extends React.Component<
  LookupControlledProps,
  LookupControlledState
> {
  constructor(props: Readonly<LookupControlledProps>) {
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

  onScopeMenuClick = (...args: any[]) => {
    if (this.props.onScopeMenuClick) {
      this.props.onScopeMenuClick(...args);
    }
    this.setState({ opened: false });
  };

  onScopeSelect = (targetScope: string) => {
    if (this.props.onScopeSelect) {
      this.props.onScopeSelect(targetScope);
    }
    this.setState({ targetScope });
  };

  onSearchTextChange = (searchText: string) => {
    if (this.props.onSearchTextChange) {
      this.props.onSearchTextChange(searchText);
    }
    this.setState({ searchText });
  };

  onLookupRequest = (searchText: string | undefined) => {
    if (this.props.onLookupRequest) {
      this.props.onLookupRequest(searchText);
    }
    this.setState({ data: [], loading: true, opened: true });
    queryData(searchText || '', this.state.targetScope || 'Account', (data) => {
      this.setState({ data, loading: false });
    });
  };

  onSelect = (selected: LookupEntry | null) => {
    if (this.props.onSelect) {
      this.props.onSelect(selected);
    }
    this.setState({ selected });
  };

  onComplete = (...args: any[]) => {
    if (this.props.onComplete) {
      this.props.onComplete(...args);
    }
    this.setState({ opened: false });
  };

  render() {
    return (
      <Lookup
        {...this.props}
        opened={this.state.opened}
        searchText={this.state.searchText}
        selected={this.state.selected}
        data={this.state.data}
        loading={this.state.loading}
        scopes={this.state.scopes}
        targetScope={this.state.targetScope}
        onScopeSelect={this.onScopeSelect}
        onScopeMenuClick={this.onScopeMenuClick}
        onSearchTextChange={this.onSearchTextChange}
        onLookupRequest={this.onLookupRequest}
        onSelect={this.onSelect}
        onComplete={this.onComplete}
      />
    );
  }
}

/**
 * Lookup stories
 */
storiesOf('Lookup', module)
  .add(
    'Controlled with knobs',
    () => (
      <Lookup
        label={text('label', 'Lookup Label')}
        error={text('error', '')}
        required={boolean('required', false)}
        disabled={boolean('disabled', false)}
        data={COMPANY_DATA}
        selected={object('selected', undefined)}
        loading={boolean('loading', false)}
        opened={boolean('opened', false)}
        onSearchTextChange={action('searchTextChange')}
        onLookupRequest={action('lookupRequest')}
        onSelect={action('select')}
        onBlur={action('blur')}
        onComplete={action('complete')}
      />
    ),
    { info: 'Lookup controlled with knobs' }
  )
  .add(
    'Required',
    () => (
      <Lookup
        label='Lookup Label'
        required
        onSearchTextChange={action('searchTextChange')}
        onLookupRequest={action('lookupRequest')}
        onSelect={action('select')}
        onBlur={action('blur')}
        onComplete={action('complete')}
      />
    ),
    { info: 'Lookup component with required attribute' }
  )
  .add(
    'Error',
    () => (
      <Lookup
        label='Lookup Label'
        required
        error='This field is required'
        onSearchTextChange={action('searchTextChange')}
        onLookupRequest={action('lookupRequest')}
        onSelect={action('select')}
        onBlur={action('blur')}
        onComplete={action('complete')}
      />
    ),
    { info: 'Lookup component with error message' }
  )
  .add(
    'Disabled',
    () => (
      <Lookup
        label='Lookup Label'
        disabled
        onSearchTextChange={action('searchTextChange')}
        onLookupRequest={action('lookupRequest')}
        onSelect={action('select')}
        onBlur={action('blur')}
        onComplete={action('complete')}
      />
    ),
    { info: 'Lookup component with disabled status' }
  )
  .add(
    'With search text',
    () => (
      <Lookup
        label='Lookup Label'
        searchText='A'
        onSearchTextChange={action('searchTextChange')}
        onLookupRequest={action('lookupRequest')}
        onSelect={action('select')}
        onBlur={action('blur')}
        onComplete={action('complete')}
      />
    ),
    { info: 'Lookup component with search input text' }
  )
  .add(
    'With search icon in left',
    () => (
      <Lookup
        label='Lookup Label'
        searchText='A'
        iconAlign='left'
        onSearchTextChange={action('searchTextChange')}
        onLookupRequest={action('lookupRequest')}
        onSelect={action('select')}
        onBlur={action('blur')}
        onComplete={action('complete')}
      />
    ),
    { info: 'Lookup component with search text and search icon in left side' }
  )
  .add(
    'With selection',
    () => (
      <Lookup
        label='Lookup Label'
        selected={COMPANY_DATA[0]}
        onSearchTextChange={action('searchTextChange')}
        onLookupRequest={action('lookupRequest')}
        onSelect={action('select')}
        onBlur={action('blur')}
        onComplete={action('complete')}
      />
    ),
    { info: 'Lookup component with item selected' }
  )
  .add(
    'Opened - In Loading',
    () => (
      <Lookup
        label='Lookup Label'
        searchText='A'
        opened
        loading
        onSearchTextChange={action('searchTextChange')}
        onLookupRequest={action('lookupRequest')}
        onSelect={action('select')}
        onBlur={action('blur')}
        onComplete={action('complete')}
      />
    ),
    { info: 'Lookup component in loading candidates' }
  )
  .add(
    'Opened - Active',
    () => (
      <div style={{ height: 350 }}>
        <Lookup
          label='Lookup Label'
          searchText='A'
          opened
          data={COMPANY_DATA}
          selected={null}
          onSearchTextChange={action('searchTextChange')}
          onLookupRequest={action('lookupRequest')}
          onSelect={action('select')}
          onBlur={action('blur')}
          onComplete={action('complete')}
        />
      </div>
    ),
    { info: 'Lookup component with candidates in dropdown' }
  )
  .add(
    'Opened - With list header/footer',
    () => (
      <div style={{ height: 420 }}>
        <Lookup
          label='Lookup Label'
          searchText='A'
          opened
          data={COMPANY_DATA}
          selected={null}
          listHeader={
            <Button icon='search' iconAlign='left'>
              &quot;A&quot; in Account
            </Button>
          }
          listFooter={
            <Button icon='add' iconAlign='left'>
              Add new Account
            </Button>
          }
          onSearchTextChange={action('searchTextChange')}
          onLookupRequest={action('lookupRequest')}
          onSelect={action('select')}
          onBlur={action('blur')}
          onComplete={action('complete')}
        />
      </div>
    ),
    {
      info:
        'Lookup component with header/footer component in the candidate list',
    }
  )
  .add(
    'defaultOpened - In Loading',
    () => (
      <Lookup
        label='Lookup Label'
        searchText='A'
        defaultOpened
        loading
        onSearchTextChange={action('searchTextChange')}
        onLookupRequest={action('lookupRequest')}
        onSelect={action('select')}
        onBlur={action('blur')}
        onComplete={action('complete')}
      />
    ),
    { info: 'Lookup component (defaultOpened = true) in loading candidates' }
  )
  .add(
    'defaultOpened - Active',
    () => (
      <div style={{ height: 350 }}>
        <Lookup
          label='Lookup Label'
          searchText='A'
          defaultOpened
          data={COMPANY_DATA}
          selected={null}
          onSearchTextChange={action('searchTextChange')}
          onLookupRequest={action('lookupRequest')}
          onSelect={action('select')}
          onBlur={action('blur')}
          onComplete={action('complete')}
        />
      </div>
    ),
    {
      info:
        'Lookup component (defaultOpened = true) with candidates in dropdown',
    }
  )
  .add(
    'defaultOpened - With list header/footer',
    () => (
      <div style={{ height: 420 }}>
        <Lookup
          label='Lookup Label'
          searchText='A'
          defaultOpened
          data={COMPANY_DATA}
          selected={null}
          listHeader={
            <Button icon='search' iconAlign='left'>
              &quot;A&quot; in Account
            </Button>
          }
          listFooter={
            <Button icon='add' iconAlign='left'>
              Add new Account
            </Button>
          }
          onSearchTextChange={action('searchTextChange')}
          onLookupRequest={action('lookupRequest')}
          onSelect={action('select')}
          onBlur={action('blur')}
          onComplete={action('complete')}
        />
      </div>
    ),
    {
      info:
        'Lookup component (defaultOpened = true) with header/footer component in the candidate list',
    }
  )
  .add(
    'Multi Scope',
    () => (
      <Lookup
        label='Lookup (multiple scope)'
        opened={false}
        selected={null}
        searchText='A'
        scopes={LOOKUP_SCOPES}
        onScopeMenuClick={action('scopeMenuClick')}
        onScopeSelect={action('scopeSelect')}
        onSearchTextChange={action('searchTextChange')}
        onLookupRequest={action('lookupRequest')}
        onSelect={action('select')}
        onBlur={action('blur')}
        onComplete={action('complete')}
      />
    ),
    {
      info:
        'Lookup component which allows multiples scopes to select as lookup datasource',
    }
  )
  .add(
    'Multi Scope - Required',
    () => (
      <Lookup
        label='Lookup (multiple scope, required)'
        opened={false}
        selected={null}
        required
        scopes={LOOKUP_SCOPES}
        onScopeMenuClick={action('scopeMenuClick')}
        onScopeSelect={action('scopeSelect')}
        onSearchTextChange={action('searchTextChange')}
        onLookupRequest={action('lookupRequest')}
        onSelect={action('select')}
        onBlur={action('blur')}
        onComplete={action('complete')}
      />
    ),
    {
      info:
        'Lookup component which allows multiples scopes selection, with required attribute',
    }
  )
  .add(
    'Multi Scope - Error',
    () => (
      <Lookup
        label='Lookup (multiple scope, error)'
        opened={false}
        selected={null}
        required
        error='This field is required'
        scopes={LOOKUP_SCOPES}
        onScopeMenuClick={action('scopeMenuClick')}
        onScopeSelect={action('scopeSelect')}
        onSearchTextChange={action('searchTextChange')}
        onLookupRequest={action('lookupRequest')}
        onSelect={action('select')}
        onBlur={action('blur')}
        onComplete={action('complete')}
      />
    ),
    {
      info:
        'Lookup component which allows multiples scopes selection, with error message',
    }
  )
  .add(
    'Multi Scope - Disabled',
    () => (
      <Lookup
        label='Lookup (multiple scope, disabled)'
        opened={false}
        selected={null}
        disabled
        scopes={LOOKUP_SCOPES}
        onScopeMenuClick={action('scopeMenuClick')}
        onScopeSelect={action('scopeSelect')}
        onSearchTextChange={action('searchTextChange')}
        onLookupRequest={action('lookupRequest')}
        onSelect={action('select')}
        onBlur={action('blur')}
        onComplete={action('complete')}
      />
    ),
    {
      info:
        'Lookup component which allows multiples scopes selection, but in disabled status',
    }
  )
  .add(
    'Controlled',
    () => (
      <LookupControlled
        label='Lookup (Controlled)'
        onSearchTextChange={action('searchTextChange')}
        onLookupRequest={action('lookupRequest')}
        onSelect={action('select')}
        onComplete={action('complete')}
      />
    ),
    { info: 'Lookup component whose state is controlled from outside' }
  )
  .add(
    'Uncontrolled',

    () => (
      <Lookup
        label='Lookup (Uncontrolled)'
        defaultSearchText='A'
        data={COMPANY_DATA}
        lookupFilter={(entry, searchText) =>
          searchText !== undefined &&
          entry.label.toUpperCase().indexOf(searchText.toUpperCase()) === 0
        }
        onSearchTextChange={action('searchTextChange')}
        onLookupRequest={action('lookupRequest')}
        onSelect={action('select')}
        onComplete={action('complete')}
      />
    ),

    { info: 'Lookup component whose state is managed inside of the component' }
  )
  .add(
    'Controlled with Multi Scope',
    () => (
      <LookupControlled
        label='Lookup (Controlled, Multi Scope)'
        scopes={LOOKUP_SCOPES}
        onScopeMenuClick={action('scopeMenuClick')}
        onScopeSelect={action('scopeSelect')}
        onSearchTextChange={action('searchTextChange')}
        onLookupRequest={action('lookupRequest')}
        onSelect={action('select')}
        onComplete={action('complete')}
      />
    ),
    {
      info:
        'Lookup component whose state is controlled from outside, search scope is selectable from multiple scope',
    }
  )
  .add(
    'Uncontrolled with Multi Scope',
    () => (
      <Lookup
        label='Lookup (Uncontrolled, Multi Scope)'
        scopes={LOOKUP_SCOPES}
        defaultTargetScope='Opportunity'
        defaultSearchText='A'
        data={LOOKUP_DATASET}
        lookupFilter={(entry, searchText, scope) =>
          entry.scope === scope &&
          searchText !== undefined &&
          entry.label.toUpperCase().indexOf(searchText.toUpperCase()) === 0
        }
        onScopeMenuClick={action('scopeMenuClick')}
        onScopeSelect={action('scopeSelect')}
        onSearchTextChange={action('searchTextChange')}
        onLookupRequest={action('lookupRequest')}
        onSelect={action('select')}
        onComplete={action('complete')}
      />
    ),
    {
      info:
        'Lookup component whose state is managed inside of the component, search scope is selectable from multiple scope',
    }
  );
