import React from 'react';
import { Form, FieldSet, Lookup, Button } from 'react-lightning-design-system';

import COMPANIES from './data/COMPANIES';
import OPPORTUNITIES from './data/OPPORTUNITIES';
import CAMPAIGNS from './data/CAMPAIGNS';
import CASES from './data/CASES';
import SCOPES from './data/SCOPES';

const Row = FieldSet.Row;

const COMPANY_DATA = COMPANIES.map((label, i) => ({
  icon: 'standard:account',
  label,
  value: `10000${i}`,
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

const LOOKUP_TREE_DATA = [
  {
    label: 'Parent-1',
    value: 'parent1',
    items: [
      {
        label: 'Son-1',
        value: 'son1',
      },
      {
        label: 'Son-2',
        value: 'son2',
        items: [
          {
            label: 'Son-2-1',
            value: 'son21',
          },
          {
            label: 'Son-2-2',
            value: 'son22',
          },
        ],
      },
      {
        label: 'Son-3',
        value: 'son3',
      },
    ],
  },
  {
    label: 'Parent-2',
    value: 'parent2',
    items: [
      {
        label: 'Son-4',
        value: 'son4',
      },
      {
        label: 'Son-5',
        value: 'son5',
      },
      {
        label: 'Son-6',
        value: 'son6',
        items: [
          {
            label: 'Son-6-1',
            value: 'son61',
          },
          {
            label: 'Son-6-2',
            value: 'son62',
          },
        ],
      },
    ],
  },
];

const LOOKUP_TREE_SPLITTER_DATA = LOOKUP_TREE_DATA.map((item) => {
  const result = item;
  if (item.items) {
    result.splitter = true;
  }
  return result;
});

const LOOKUP_DATASET = [
  ...COMPANY_DATA,
  ...OPP_DATA,
  ...CAMPAIGN_DATA,
  ...CASE_DATA,
];

function queryData(searchText, callback) {
  setTimeout(() => {
    const data = COMPANY_DATA.filter(
      entry => entry.label.toUpperCase().indexOf(searchText.toUpperCase()) === 0
    );
    callback(data);
  }, 1000);
}

export default class LookupExamples extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      searchText: '',
      selected: null,
      loading: false,
      opened: false,
    };
  }

  onSearchTextChange(searchText) {
    this.setState({ searchText });
  }

  onLookupRequest(searchText = '') {
    this.setState({ data: [], loading: true, opened: true });
    queryData(searchText, (data) => {
      this.setState({ data, loading: false });
    });
  }


  render() {
    const styles = { padding: '12px' };
    /* eslint-disable max-len, react/jsx-first-prop-new-line */
    return (
      <div>
        <Lookup label='Lookup (list open)' opened data={ COMPANY_DATA } selected={ null } searchText='A' />
        <h2 className='slds-m-vertical--medium'>Lookup</h2>
        <div style={ { ...styles, margin: '0 0 300px 0' } }>
          <Form type='compound'>
            <FieldSet>
              <Row>
                <Lookup label='Lookup (selected)' opened={ false } data={ COMPANY_DATA } selected={ COMPANY_DATA[0].value } />
                <Lookup label='Lookup (input)' iconAlign='left' opened={ false } selected={ null } />
                <Lookup label='Lookup (search text input)' opened={ false } selected={ null } searchText='A' />
              </Row>
              <Row>
                <Lookup label='Lookup (multiple scope)' opened={ false } selected={ null } searchText='A' scopes={ LOOKUP_SCOPES } />
                <div />
                <div />
              </Row>
              <Row>
                <Lookup label='Lookup (loading)' opened loading selected={ null } searchText='A' />
                <Lookup label='Lookup (list open)' opened data={ COMPANY_DATA } selected={ null } searchText='A' />
                <Lookup label='Lookup (with button)' opened data={ COMPANY_DATA } searchText='A' selected={ null }
                  listHeader={ <Button icon='search' iconAlign='left'>{'"A" in Account'}</Button> }
                  listFooter={ <Button icon='add' iconAlign='left'>{'Add new Account'}</Button> }
                />
              </Row>
            </FieldSet>
          </Form>
        </div>

        <h2 className='slds-m-vertical--medium'>Lookup (Controlled / Uncontrolled)</h2>
        <div style={ { ...styles, margin: '0 0 300px 0' } }>
          <Form type='compound'>
            <FieldSet>
              <Row>
                <Lookup label='Lookup (Controlled)'
                  opened={ this.state.opened }
                  searchText={ this.state.searchText }
                  selected={ this.state.selected }
                  data={ this.state.data }
                  loading={ this.state.loading }
                  onSearchTextChange={ this.onSearchTextChange.bind(this) }
                  onLookupRequest={ this.onLookupRequest.bind(this) }
                  onSelect={ selected => this.setState({ selected }) }
                  onComplete={ () => this.setState({ opened: false }) }
                />
                <Lookup label='Lookup (Uncontrolled)'
                  defaultSearchText='A'
                  data={ COMPANY_DATA }
                />
              </Row>
            </FieldSet>
          </Form>
        </div>

        <h2 className='slds-m-vertical--medium'>Lookup (Multi Scope)</h2>
        <div style={ { ...styles, margin: '0 0 300px 0' } }>
          <Form type='compound'>
            <FieldSet>
              <Row>
                <Lookup label='Lookup (Multi Scope)'
                  scopes={ LOOKUP_SCOPES }
                  defaultTargetScope='Opportunity'
                  defaultSearchText='A'
                  data={ LOOKUP_DATASET }
                />
              </Row>
            </FieldSet>
          </Form>
        </div>

        <h2 className='slds-m-vertical--medium'>Lookup (Tree Structure)</h2>
        <div style={ { ...styles, margin: '0 0 300px 0' } }>
          <Form type='compound'>
            <FieldSet>
              <Row>
                <Lookup label='Lookup (Tree Structure)'
                  defaultSearchText='so'
                  data={ LOOKUP_TREE_DATA }
                />
              </Row>
            </FieldSet>
          </Form>
        </div>

        <h2 className='slds-m-vertical--medium'>Lookup (Tree Structure with Splitter)</h2>
        <div style={ { ...styles, margin: '0 0 300px 0' } }>
          <Form type='compound'>
            <FieldSet>
              <Row>
                <Lookup label='Lookup (Tree Structure with Splitter)'
                  defaultSearchText='so'
                  data={ LOOKUP_TREE_SPLITTER_DATA }
                />
              </Row>
            </FieldSet>
          </Form>
        </div>

      </div>
    );
  }
}
