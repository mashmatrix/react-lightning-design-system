import React from 'react';
import { Form, FieldSet, Lookup } from 'react-lightning-design-system';
const Row = FieldSet.Row;


const customIcon = React.createClass({
  render: () => {
    return (
      <div>
        <div className='SmallContact__contactObject___eARTC' >
          <span >
            <span className='slds-avatar slds-avatar--circle slds-avatar--x-small' >
             <img src='https://c.na30.content.force.com/profilephoto/729360000008UUE/T' alt='Alex Nudelman' className=''/>
            </span>
          </span>
        <div className='slds-text-body--regular SmallContact__details___1Xkkt SmallContact__withPadding___6Tef1'>
          <a href='/sObject/00536000000c8VFAAY/view' className='ExternalLink__link___i4haT' >Alex Nudelman</a>
            <span>test test </span>
          </div>
        </div>
    </div>);
  },
});

import COMPANIES from './data/COMPANIES';
import OPPORTUNITIES from './data/OPPORTUNITIES';
import CAMPAIGNS from './data/CAMPAIGNS';
import CASES from './data/CASES';
import SCOPES from './data/SCOPES';

const COMPANY_DATA = COMPANIES.map((label, i) => ({
  icon: 'standard:account',
  externalIcon: customIcon,
  label,
  value: '10000' + i,
  scope: 'Account',
}));

const OPP_DATA = COMPANIES.map((label, i) => ({
  icon: 'standard:opportunity',
  externalIcon: customIcon,
  label: label + ' - ' + OPPORTUNITIES[i % OPPORTUNITIES.length],
  value: '20000' + i,
  scope: 'Opportunity',
}));

const CAMPAIGN_DATA = CAMPAIGNS.map((label, i) => ({
  icon: 'standard:campaign',
  externalIcon: customIcon,
  label,
  value: '30000' + i,
  scope: 'Campaign',
}));

const CASE_DATA = CASES.map((label, i) => ({
  icon: 'standard:case',
  externalIcon: customIcon,
  label,
  value: '40000' + i,
  scope: 'Case',
}));

const LOOKUP_SCOPES = SCOPES.map((label) => ({
  label,
  externalIcon: customIcon,
  value: label,
  icon: `standard:${label.toLowerCase()}`,
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
                <div></div>
                <div></div>
              </Row>
              <Row>
                <div></div>
                <div></div>
              </Row>
              <Row>
                <Lookup label='Lookup (list open)' opened data={ COMPANY_DATA } selected={ null } searchText='A' />
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

      </div>
    );
  }
}
