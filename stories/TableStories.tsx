import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn,
  TableRowColumnActions,
  DropdownButton,
  MenuItem,
} from '../src/scripts';

const headerNames =
  'Opportunity Name,Account Name,Close Date,Stage,Confidence,Amount,Contact'.split(
    ','
  );

const records = new Array(6)
  .join('_')
  .split('')
  .map((_, i) => [
    `Cloudhub ${i + 1}`,
    'Cloudhub',
    '4/14/2015',
    'Prospecting',
    '20%',
    '$25k',
    'jrogers@cloudhub.com',
  ]);

export default {
  title: 'Table',
};

export const ControlledWithKnobs = () => {
  const bordered = boolean('bordered', false);
  const sortable = boolean('sortable', false);
  const striped = boolean('striped', false);
  const noRowHover = boolean('noRowHover', false);
  const verticalBorders = boolean('verticalBorders', false);
  const fixedLayout = boolean('fixedLayout', false);
  const hasActions = boolean('hasActions', true);
  return (
    <Table
      bordered={bordered}
      sortable={sortable}
      striped={striped}
      noRowHover={noRowHover}
      verticalBorders={verticalBorders}
      fixedLayout={fixedLayout}
    >
      <TableHeader hasActions={hasActions}>
        <TableRow>
          {headerNames.map((name) => (
            <TableHeaderColumn key={name}>{name}</TableHeaderColumn>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((record) => (
          <TableRow key={record[0]}>
            {hasActions ? (
              <TableRowColumnActions>
                <DropdownButton type='icon-border' icon='down' size='x-small'>
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </DropdownButton>
              </TableRowColumnActions>
            ) : undefined}
            {headerNames.map((name, i) => (
              <TableRowColumn key={name}>{record[i]}</TableRowColumn>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

ControlledWithKnobs.story = {
  name: 'Controlled with knobs',
  parameters: { info: 'Table controlled with knobs' },
};

export const Default = () => (
  <Table bordered>
    <TableHeader>
      <TableRow>
        {headerNames.map((name) => (
          <TableHeaderColumn key={name}>{name}</TableHeaderColumn>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {records.map((record) => (
        <TableRow key={record[0]}>
          {headerNames.map((name, i) => (
            <TableRowColumn key={name}>{record[i]}</TableRowColumn>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

Default.story = {
  parameters: { info: 'Default Table component' },
};

export const WithStripedRow = () => (
  <Table bordered striped>
    <TableHeader>
      <TableRow>
        {headerNames.map((name) => (
          <TableHeaderColumn key={name}>{name}</TableHeaderColumn>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {records.map((record) => (
        <TableRow key={record[0]}>
          {headerNames.map((name, i) => (
            <TableRowColumn key={name}>{record[i]}</TableRowColumn>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

WithStripedRow.story = {
  parameters: { info: 'Table component with striped row' },
};

export const WithNoRowBorder = () => (
  <Table>
    <TableHeader>
      <TableRow>
        {headerNames.map((name) => (
          <TableHeaderColumn key={name}>{name}</TableHeaderColumn>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {records.map((record) => (
        <TableRow key={record[0]}>
          {headerNames.map((name, i) => (
            <TableRowColumn key={name}>{record[i]}</TableRowColumn>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

WithNoRowBorder.story = {
  parameters: { info: 'Table component with no row borders' },
};

export const WithNoRowHover = () => (
  <Table bordered noRowHover>
    <TableHeader>
      <TableRow>
        {headerNames.map((name) => (
          <TableHeaderColumn key={name}>{name}</TableHeaderColumn>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {records.map((record) => (
        <TableRow key={record[0]}>
          {headerNames.map((name, i) => (
            <TableRowColumn key={name}>{record[i]}</TableRowColumn>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

WithNoRowHover.story = {
  parameters: {
    info: 'Table component with row hovering highlight is disabled',
  },
};

export const WithVerticalBorders = () => (
  <Table bordered verticalBorders>
    <TableHeader>
      <TableRow>
        {headerNames.map((name) => (
          <TableHeaderColumn key={name}>{name}</TableHeaderColumn>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {records.map((record) => (
        <TableRow key={record[0]}>
          {headerNames.map((name, i) => (
            <TableRowColumn key={name}>{record[i]}</TableRowColumn>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

WithVerticalBorders.story = {
  parameters: { info: 'Table component with vertical borders enabled' },
};

export const WithFixedLayout = () => (
  <Table bordered fixedLayout>
    <TableHeader>
      <TableRow>
        {headerNames.map((name) => (
          <TableHeaderColumn key={name}>{name}</TableHeaderColumn>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {records.map((record) => (
        <TableRow key={record[0]}>
          {headerNames.map((name, i) => (
            <TableRowColumn key={name}>{record[i]}</TableRowColumn>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

WithFixedLayout.story = {
  parameters: { info: 'Table component with fixed layout' },
};

export const WithSortEnabled = () => (
  <Table bordered sortable>
    <TableHeader>
      <TableRow>
        {headerNames.map((name, i) => (
          <TableHeaderColumn key={name} sortable={i !== 1}>
            {name}
          </TableHeaderColumn>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {records.map((record) => (
        <TableRow key={record[0]}>
          {headerNames.map((name, i) => (
            <TableRowColumn key={name}>{record[i]}</TableRowColumn>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

WithSortEnabled.story = {
  parameters: {
    info: 'Table component with sort feature enabled ("Account Name" column is disabled)',
  },
};
