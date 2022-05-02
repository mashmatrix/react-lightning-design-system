import React, { ComponentProps } from 'react';
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
import { Meta, StoryObj } from '@storybook/react';

/**
 *
 */
type StoryProps = ComponentProps<typeof Table> & {
  hasActions?: boolean;
};

/**
 *
 */
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

/**
 *
 */
const meta: Meta<StoryProps> = {
  title: 'Table',
  component: Table,
  subcomponents: {
    TableHeader,
    TableHeaderColumn,
    TableBody,
    TableRow,
    TableRowColumn,
    TableRowColumnActions,
  },
};
export default meta;

/**
 *
 */
export const ControlledWithKnobs: StoryObj<StoryProps> = {
  render: ({ hasActions, ...args }) => (
    <Table {...args}>
      <TableHeader hasActions={hasActions}>
        <TableRow>
          {headerNames.map((name, i) => (
            <TableHeaderColumn
              key={name}
              sortable={args.sortable ? i !== 1 : undefined}
            >
              {name}
            </TableHeaderColumn>
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
  ),
  name: 'Controlled with knobs',
  args: {
    hasActions: true,
  },
  argTypes: {
    hasActions: { type: 'boolean' },
  },
  parameters: {
    info: 'Table controlled with knobs',
  },
};

/**
 *
 */
export const Default: StoryObj<StoryProps> = {
  ...ControlledWithKnobs,
  name: 'Default',
  args: {
    bordered: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default Table component',
      },
    },
  },
};

/**
 *
 */
export const WithStripedRow: StoryObj<StoryProps> = {
  ...Default,
  name: 'With Striped Row',
  args: {
    bordered: true,
    striped: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table component with striped row',
      },
    },
  },
};

/**
 *
 */
export const WithNoRowBorder: StoryObj<StoryProps> = {
  ...Default,
  name: 'With No Row Border',
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Table component with no row borders',
      },
    },
  },
};

/**
 *
 */
export const WithNoRowHover: StoryObj<StoryProps> = {
  ...Default,
  name: 'With No Row Hover',
  args: {
    bordered: true,
    noRowHover: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table component with row hovering highlight is disabled',
      },
    },
  },
};

/**
 *
 */
export const WithVerticalBorders: StoryObj<StoryProps> = {
  ...Default,
  name: 'With Vertical Borders',
  args: {
    bordered: true,
    verticalBorders: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table component with vertical borders enabled',
      },
    },
  },
};

/**
 *
 */
export const WithFixedLayout: StoryObj<StoryProps> = {
  ...Default,
  name: 'With Fixed Layout',
  args: {
    bordered: true,
    fixedLayout: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table component with fixed layout',
      },
    },
  },
};

/**
 *
 */
export const WithSortEnabled: StoryObj<StoryProps> = {
  ...Default,
  name: 'With Sort Enabled',
  args: {
    bordered: true,
    sortable: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Table component with sort feature enabled ("Account Name" column is disabled)',
      },
    },
  },
};
