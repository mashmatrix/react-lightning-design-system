import React from 'react';
import moment from 'moment';
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

  onLookupRequest(searchText='') {
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
          <Form>
            <FieldSet>
              <Row>
                <Lookup label='Lookup (selected)' opened={ false } selected={ COMPANY_DATA[0] } />
                <Lookup label='Lookup (input)' opened={ false } selected={ null } />
                <Lookup label='Lookup (search text input)' opened={ false } selected={ null } searchText='A' />
              </Row>
              <Row>
                <Lookup label='Lookup (loading)' opened={ true } loading={ true } selected={ null } searchText='A' />
                <Lookup label='Lookup (list open)' opened={ true } data={ COMPANY_DATA } selected={ null } searchText='A' />
                <Lookup label='Lookup (with button)' opened={ true } data={ COMPANY_DATA } searchText='A' selected={ null }>
                  <Button icon='search'>"A" in Account</Button>
                </Lookup>
              </Row>
            </FieldSet>
          </Form>
        </div>

        <h2 className='slds-m-vertical--medium'>Lookup (Controlled / Uncontrolled)</h2>
        <div style={ styles }>
          <Form>
            <FieldSet>
              <Row>
                <Lookup label='Lookup (controlled)'
                  opened={ this.state.opened }
                  searchText={ this.state.searchText }
                  data={ this.state.data }
                  loading={ this.state.loading }
                  onChange={ this.onSearchTextChange.bind(this) }
                  onLookupRequest={ this.onLookupRequest.bind(this) }
                  onLookupCancel={ () => this.setState({ opened: false }) }
                  onSelect={ (selected) => this.setState({ selected }) }
                  onClose={ () => this.setState({ opened: false }) }
                />
                <Lookup label='Lookup (uncontrolled)'
                  defaultOpened={ true }
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
