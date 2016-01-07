import React from 'react';
import moment from 'moment';
import { Form, FieldSet, Lookup, Button } from 'react-lightning-design-system';
const Row = FieldSet.Row;

export default class LookupExamples extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = { padding: '12px', margin: '0 0 300px 0' };
    const data = [
      { category: 'standard', icon: 'account', label: 'Account #1', value: '10000001' },
      { category: 'standard', icon: 'account', label: 'Account #2', value: '10000002' },
      { category: 'standard', icon: 'account', label: 'Account #3', value: '10000003' },
      { category: 'standard', icon: 'account', label: 'Account #4', value: '10000004' },
    ];
    return (
      <div>
        <h2 className='slds-m-vertical--medium'>Lookup (Controlled)</h2>
        <div style={ styles }>
          <Form>
            <FieldSet>
              <Row>
                <Lookup label='Lookup (loading)' opened={ true } loading={ true } selected={ null } />
                <Lookup label='Lookup (list open)' opened={ true } data={ data } selected={ null } />
                <Lookup label='Lookup (with button)' opened={ true } data={ data } displayText='AAA' selected={ null }>
                  <Button icon='search'>"AAA" in Account</Button>
                </Lookup>
              </Row>
            </FieldSet>
          </Form>
        </div>

        <h2 className='slds-m-vertical--medium'>Lookup (Uncontrolled)</h2>
        <div style={ styles }>
          <Form>
            <FieldSet>
              <Row>
                <Lookup label='Lookup (loading)' defaultOpened={ true } defaultSearchText='Acc' data={ data } />
              </Row>
            </FieldSet>
          </Form>
        </div>

      </div>
    );
  }
}
