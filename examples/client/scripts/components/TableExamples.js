import React from 'react';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderColumn,
  TableRowColumn,
  TableRowColumnActions,
  DropdownButton,
  MenuItem,
} from 'react-lightning-design-system';

export default () => (
  <div>
    <h2 className='slds-m-vertical--medium'>Base</h2>
    <Table
      bordered
      sortable
    >
      <TableHeader hasActions>
        <TableRow>
          <TableHeaderColumn>OPPORTUNITY NAME</TableHeaderColumn>
          <TableHeaderColumn>ACCOUNT NAME</TableHeaderColumn>
          <TableHeaderColumn>CLOSE DATE</TableHeaderColumn>
          <TableHeaderColumn>STAGE</TableHeaderColumn>
          <TableHeaderColumn>CONFIDENCE</TableHeaderColumn>
          <TableHeaderColumn>AMOUNT</TableHeaderColumn>
          <TableHeaderColumn>CONTACT</TableHeaderColumn>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableRowColumnActions>
            <DropdownButton type='icon-border' icon='down' size='x-small'>
              <MenuItem>Menu Item #1</MenuItem>
              <MenuItem>Menu Item #2</MenuItem>
              <MenuItem>Menu Item #3</MenuItem>
            </DropdownButton>
          </TableRowColumnActions>
          <TableRowColumn>Cloudhub</TableRowColumn>
          <TableRowColumn>Cloudhub</TableRowColumn>
          <TableRowColumn>4/14/2015</TableRowColumn>
          <TableRowColumn>Prospecting</TableRowColumn>
          <TableRowColumn>20%</TableRowColumn>
          <TableRowColumn>$25k</TableRowColumn>
          <TableRowColumn><a>jrogers@cloudhub.com</a></TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumnActions>
            <DropdownButton type='icon-border' icon='down' size='x-small'>
              <MenuItem>Menu Item #1</MenuItem>
              <MenuItem>Menu Item #2</MenuItem>
              <MenuItem>Menu Item #3</MenuItem>
            </DropdownButton>
          </TableRowColumnActions>
          <TableRowColumn>Cloudhub</TableRowColumn>
          <TableRowColumn>Cloudhub</TableRowColumn>
          <TableRowColumn>4/14/2015</TableRowColumn>
          <TableRowColumn>Prospecting</TableRowColumn>
          <TableRowColumn>20%</TableRowColumn>
          <TableRowColumn>$25k</TableRowColumn>
          <TableRowColumn><a>jrogers@cloudhub.com</a></TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  </div>
);
