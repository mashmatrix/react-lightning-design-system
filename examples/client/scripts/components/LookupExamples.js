import React from 'react';
import { Form, FieldSet, Lookup, Button } from 'react-lightning-design-system';
const Row = FieldSet.Row;

import COMPANIES from './data/COMPANIES';
import OPPORTUNITIES from './data/OPPORTUNITIES';
import CAMPAIGNS from './data/CAMPAIGNS';
import CASES from './data/CASES';
import SCOPES from './data/SCOPES';

const customIcon = React.createClass({
  render: () => {
    return (
      <div className='ss' >
          <div style={ { 'display': 'inline-block' } }>
            <span className='slds-avatar slds-avatar--circle slds-avatar--medium' >
             <img src='https://avatars1.githubusercontent.com/u/2046035?v=3&s=460' alt='Alex Nudelman' className=''/>
            </span>
          </div>
          <div className='slds-text-body--regular ' style={{ 'verticalAlign': 'middle', 'display': 'inline-block', 'paddingLeft': '10px' }} >
            <div style={{ color: '#0270d2' }} >Alex Nudelman</div>
            <div className='slds-text-body--small'>test account </div>
          </div>
      </div>
    );
  },
});


const COMPANY_DATA = COMPANIES.map((label, i) => ({
  icon: 'standard:account',
  label,
  value: '10000' + i,
  scope: 'Account',
}));

const OPP_DATA = COMPANIES.map((label, i) => ({
  icon: 'standard:opportunity',
  label: label + ' - ' + OPPORTUNITIES[i % OPPORTUNITIES.length],
  value: '20000' + i,
  scope: 'Opportunity',
}));

const CAMPAIGN_DATA = CAMPAIGNS.map((label, i) => ({
  icon: 'standard:campaign',
  label,
  value: '30000' + i,
  scope: 'Campaign',
}));

const CASE_DATA = CASES.map((label, i) => ({
  icon: 'standard:case',
  label,
  value: '40000' + i,
  scope: 'Case',
}));

const LOOKUP_SCOPES = SCOPES.map((label) => ({
  label,
  value: label,
  icon: `standard:${label.toLowerCase()}`,
}));

const CUSTOM_DATA = ['1', '2', '3', '4', '5'].map((label) => ({
  label,
  value: 'data_' + label,
  externalIcon: customIcon,
}));

const LOOKUP_DATASET = [
  ...COMPANY_DATA,
  ...OPP_DATA,
  ...CAMPAIGN_DATA,
  ...CASE_DATA,
];

function queryData(searchText, callback) {
  setTimeout(() => {
    const data = COMPANY_DATA.filter(
      (entry) => entry.label.toUpperCase().indexOf(searchText.toUpperCase()) === 0
    );
    callback(data);
  }, 1000);
}

export default class LookupExamples extends React.Component {
  constructor(props) {
    super(props);
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
    return (
      <div>
        <h2 className='slds-m-vertical--medium'>Lookup</h2>
        <div style={ { ...styles, margin: '0 0 300px 0' } }>
          <Form type='compound'>
            <FieldSet>
              <Row>
                <Lookup label='Lookup (selected)' opened={ false } selected={ COMPANY_DATA[0] } />
                <Lookup label='Lookup (input)' opened={ false } selected={ null } />
                <Lookup label='Lookup (search text input)' opened={ false } selected={ null } searchText='A' />
              </Row>
              <Row>
                <Lookup label='Lookup (multiple scope)' opened={ false } selected={ null } searchText='A' scopes={ LOOKUP_SCOPES } />
                <div></div>
                <div></div>
              </Row>
              <Row>
                <Lookup label='Lookup (loading)' opened loading selected={ null } searchText='A' />
                <Lookup label='Lookup (list open)' opened data={ COMPANY_DATA } selected={ null } searchText='A' />
                <Lookup label='Lookup (with button)' opened data={ COMPANY_DATA } searchText='A' selected={ null }
                  listHeader={ <Button icon='search' iconAlign='left'>"A" in Account</Button> }
                  listFooter={ <Button icon='add' iconAlign='left'>Add new Account</Button> }
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
                  onSelect={ (selected) => this.setState({ selected }) }
                  onComplete={ () => this.setState({ opened: false }) }
                />
                <Lookup label='Lookup (Uncontrolled)'
                  defaultSearchText='A'
                  data={ COMPANY_DATA }
                  lookupFilter={ (entry, text) => entry.label.toUpperCase().indexOf(text.toUpperCase()) === 0 }
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
                  lookupFilter={ (entry, text, scope) => {
                    return (
                      entry.scope === scope &&
                      entry.label.toUpperCase().indexOf(text.toUpperCase()) === 0
                    );
                  } }
                />
              </Row>
            </FieldSet>
          </Form>
        </div>

        <h2 className='slds-m-vertical--medium'>Lookup (custom icons)</h2>
        <div style={ { ...styles, margin: '0 0 300px 0' } }>
          <Form type='compound'>
            <FieldSet>
              <Row>
                <Lookup label='Lookup (list open)' hideLabel opened data={ CUSTOM_DATA } selected={ null } searchText='A' />
              </Row>
            </FieldSet>
          </Form>
        </div>

      </div>
    );
  }
}
