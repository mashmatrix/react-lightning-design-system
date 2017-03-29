import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { withKnobs, boolean } from '@kadira/storybook-addon-knobs';
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn,
  TableRowColumnActions,
  DropdownButton, MenuItem,
} from '../src/scripts';

const headerNames = 'Opportunity Name,Account Name,Close Date,Stage,Confidence,Amount,Contact'.split(',');

const records = new Array(6).join('_').split('').map((_, i) => [
  `Cloudhub ${i + 1}`, 'Cloudhub', '4/14/2015', 'Prospecting', '20%', '$25k', 'jrogers@cloudhub.com',
]);

storiesOf('Table', module)
  .addDecorator(withKnobs)
  .addWithInfo('Controlled with knobs', 'Table controlled with knobs', () => {
    const bordered = boolean('bordered');
    const sortable = boolean('sortable');
    const striped = boolean('striped');
    const noRowHover = boolean('noRowHover');
    const verticalBorders = boolean('verticalBorders');
    const fixedLayout = boolean('fixedLayout');
    const hasActions = boolean('hasActions', true);
    return (
      <Table
        bordered={ bordered } sortable={ sortable } striped={ striped } noRowHover={ noRowHover }
        verticalBorders={ verticalBorders } fixedLayout={ fixedLayout }
      >
        <TableHeader hasActions={ hasActions }>
          <TableRow>
            { headerNames.map(name => <TableHeaderColumn>{ name }</TableHeaderColumn>) }
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            records.map(record => (
              <TableRow>
                {
                  hasActions ?
                    <TableRowColumnActions>
                      <DropdownButton type='icon-border' icon='down' size='x-small'>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>Delete</MenuItem>
                      </DropdownButton>
                    </TableRowColumnActions> :
                    undefined
                }
                { headerNames.map((_, i) => <TableRowColumn>{ record[i] }</TableRowColumn>) }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    );
  })
  .addWithInfo('Default', 'Default Table component', () => (
    <Table bordered>
      <TableHeader>
        <TableRow>
          { headerNames.map(name => <TableHeaderColumn>{ name }</TableHeaderColumn>) }
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          records.map(record => (
            <TableRow>
              { headerNames.map((_, i) => <TableRowColumn>{ record[i] }</TableRowColumn>) }
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  ))
  .addWithInfo('With Striped Row', 'Table component with striped row', () => (
    <Table bordered striped>
      <TableHeader>
        <TableRow>
          { headerNames.map(name => <TableHeaderColumn>{ name }</TableHeaderColumn>) }
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          records.map(record => (
            <TableRow>
              { headerNames.map((_, i) => <TableRowColumn>{ record[i] }</TableRowColumn>) }
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  ))
  .addWithInfo('With No Row Hover', 'Table component with row hovering highlight is disabled', () => (
    <Table bordered noRowHover>
      <TableHeader>
        <TableRow>
          { headerNames.map(name => <TableHeaderColumn>{ name }</TableHeaderColumn>) }
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          records.map(record => (
            <TableRow>
              { headerNames.map((_, i) => <TableRowColumn>{ record[i] }</TableRowColumn>) }
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  ))
  .addWithInfo('With Vertical Borders', 'Table component with vertical borders enabled', () => (
    <Table bordered verticalBorders>
      <TableHeader>
        <TableRow>
          { headerNames.map(name => <TableHeaderColumn>{ name }</TableHeaderColumn>) }
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          records.map(record => (
            <TableRow>
              { headerNames.map((_, i) => <TableRowColumn>{ record[i] }</TableRowColumn>) }
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  ))
  .addWithInfo('With Fixed Layout', 'Table component with fixed layout', () => (
    <Table bordered fixedLayout>
      <TableHeader>
        <TableRow>
          { headerNames.map(name => <TableHeaderColumn>{ name }</TableHeaderColumn>) }
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          records.map(record => (
            <TableRow>
              { headerNames.map((_, i) => <TableRowColumn>{ record[i] }</TableRowColumn>) }
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  ))
  .addWithInfo('With Sort Enabled', 'Table component with sort feature enabled ("Account Name" column is disabled)', () => (
    <Table bordered sortable>
      <TableHeader>
        <TableRow>
          {
            headerNames.map((name, i) => (
              <TableHeaderColumn sortable={ i !== 1 }>{ name }</TableHeaderColumn>
            ))
          }
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          records.map(record => (
            <TableRow>
              { headerNames.map((_, i) => <TableRowColumn>{ record[i] }</TableRowColumn>) }
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  ))

;
