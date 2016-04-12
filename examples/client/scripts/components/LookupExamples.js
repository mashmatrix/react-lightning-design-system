import React from 'react';
import { Form, FieldSet, Lookup, Button } from 'react-lightning-design-system';
const Row = FieldSet.Row;

import COMPANIES from './data/COMPANIES';

const COMPANY_DATA = COMPANIES.map((label, i) => ({
  category: 'standard',
  icon: 'account',
  label,
  value: '10000' + i,
}));

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
                <Lookup label='Lookup (loading)' opened loading selected={ null } searchText='A' />
                <Lookup label='Lookup (list open)' opened data={ COMPANY_DATA } selected={ null } searchText='A' />
                <Lookup label='Lookup (with button)' opened data={ COMPANY_DATA } searchText='A' selected={ null }
                  listHeader={ <Button icon='search'>"A" in Account</Button> }
                  listFooter={ <Button icon='add'>Add new Account</Button> }
                />
              </Row>
            </FieldSet>
          </Form>
        </div>

        <h2 className='slds-m-vertical--medium'>Lookup (Controlled / Uncontrolled)</h2>
        <div style={ styles }>
          <Form type='compount'>
            <FieldSet>
              <Row>
                <Lookup label='Lookup (Controlled)'
                  opened={ this.state.opened }
                  searchText={ this.state.searchText }
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

      </div>
    );
  }
}
