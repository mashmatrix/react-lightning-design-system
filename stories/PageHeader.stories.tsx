import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import React from 'react';
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderHeadingTitle,
  PageHeaderDetail,
  PageHeaderDetailItem,
  PageHeaderDetailBody,
  PageHeaderDetailLabel,
  PageHeaderMeta,
  Icon,
  Crumb,
  Button,
  ButtonGroup,
  DropdownButton,
  MenuItem,
} from '../src/scripts';

/**
 *
 */
const meta: ComponentMeta<typeof PageHeader> = {
  title: 'PageHeader',
  component: PageHeader,
  subcomponents: {
    PageHeader,
    PageHeaderHeadingTitle,
    PageHeaderDetail,
    PageHeaderDetailBody,
    PageHeaderDetailLabel,
  },
};
export default meta;

/**
 *
 */
export const Base: ComponentStoryObj<typeof PageHeader> = {
  render: (args) => (
    <PageHeader {...args}>
      <PageHeaderHeading
        title='Rohde Corp - 80,000 Widgets'
        info='Mark Jaeckal • Unlimited Customer • 11/13/15'
        figure={<Icon category='standard' icon='opportunity' />}
      />
    </PageHeader>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default Page Header',
      },
    },
  },
};

/**
 *
 */
export const RecordHome: ComponentStoryObj<typeof PageHeader> = {
  render: (args) => (
    <PageHeader variant='record-home' {...args}>
      <PageHeaderHeading
        legend='Record Type'
        title='Record Title'
        figure={<Icon category='standard' icon='user' />}
        rightActions={[
          <Button key={0} type='neutral' icon='add' iconAlign='left'>
            Follow
          </Button>,
          <ButtonGroup key={1}>
            <Button type='neutral'>Edit</Button>
            <Button type='neutral'>Delete</Button>
            <Button type='neutral'>Clone</Button>
            <DropdownButton type='icon-border-filled' menuAlign='right'>
              <MenuItem>Menu Item #1</MenuItem>
              <MenuItem>Menu Item #2</MenuItem>
              <MenuItem>Menu Item #3</MenuItem>
            </DropdownButton>
          </ButtonGroup>,
        ]}
      />
      <PageHeaderDetail>
        <PageHeaderDetailItem label='Field 1'>
          Description that demonstrates truncation with a long text field.
        </PageHeaderDetailItem>
        <PageHeaderDetailItem>
          <PageHeaderDetailLabel>
            Field 2 (3)
            <DropdownButton type='icon' iconSize='small' icon='down'>
              <MenuItem>Menu Item #1</MenuItem>
              <MenuItem>Menu Item #2</MenuItem>
              <MenuItem>Menu Item #3</MenuItem>
            </DropdownButton>
          </PageHeaderDetailLabel>
          <PageHeaderDetailBody>Multiple Values</PageHeaderDetailBody>
        </PageHeaderDetailItem>
        <PageHeaderDetailItem label='Field 3'>
          <a href='#'>Hyperlink</a>
        </PageHeaderDetailItem>
        <PageHeaderDetailItem label='Field 4'>
          Description (2-line truncati...
        </PageHeaderDetailItem>
      </PageHeaderDetail>
    </PageHeader>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Page Header of Record Home',
      },
    },
  },
};

/**
 *
 */
export const ObjectHome: ComponentStoryObj<typeof PageHeader> = {
  render: (args) => (
    <PageHeader {...args}>
      <PageHeaderHeading
        legend='Leads'
        title='Recently Viewed'
        leftActions={
          <DropdownButton type='icon' icon='down'>
            <MenuItem>Menu Item #1</MenuItem>
            <MenuItem>Menu Item #2</MenuItem>
            <MenuItem>Menu Item #3</MenuItem>
          </DropdownButton>
        }
        rightActions={
          <ButtonGroup>
            <Button type='neutral'>New</Button>
            <DropdownButton type='icon-border-filled' menuAlign='right'>
              <MenuItem>Menu Item #1</MenuItem>
              <MenuItem>Menu Item #2</MenuItem>
              <MenuItem>Menu Item #3</MenuItem>
            </DropdownButton>
          </ButtonGroup>
        }
      />
      <PageHeaderMeta
        info='10 items • Sorted by Name'
        rightActions={[
          <DropdownButton key={0} type='icon-more' icon='settings'>
            <MenuItem>Menu Item #1</MenuItem>
            <MenuItem>Menu Item #2</MenuItem>
            <MenuItem>Menu Item #3</MenuItem>
          </DropdownButton>,
          <DropdownButton key={1} type='icon-more' icon='table'>
            <MenuItem>Menu Item #1</MenuItem>
            <MenuItem>Menu Item #2</MenuItem>
            <MenuItem>Menu Item #3</MenuItem>
          </DropdownButton>,
          <Button key={2} type='icon-border-filled' icon='edit' />,
          <Button key={3} type='icon-border-filled' icon='refresh' />,
          <ButtonGroup key={4}>
            <Button type='icon-border-filled' icon='chart' />
            <Button type='icon-border-filled' icon='filterList' />
          </ButtonGroup>,
        ]}
      />
    </PageHeader>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Page Header of Object Home',
      },
    },
  },
};

/**
 *
 */
export const RelatedList: ComponentStoryObj<typeof PageHeader> = {
  render: (args) => (
    <PageHeader variant='related-list' {...args}>
      <PageHeaderHeading
        breadCrumbs={[
          <Crumb key={0} href='#'>
            Accounts
          </Crumb>,
          <Crumb key={1} href='#'>
            Company One
          </Crumb>,
        ]}
        title='Contacts (will truncate)'
        rightActions={
          <ButtonGroup>
            <Button type='neutral'>Add Contact</Button>
            <DropdownButton type='icon-border-filled' menuAlign='right'>
              <MenuItem>Menu Item #1</MenuItem>
              <MenuItem>Menu Item #2</MenuItem>
              <MenuItem>Menu Item #3</MenuItem>
            </DropdownButton>
          </ButtonGroup>
        }
      />
      <PageHeaderMeta
        info='10 items • sorted by name'
        rightActions={[
          <DropdownButton key={0} type='icon-more' icon='table'>
            <MenuItem>Menu Item #1</MenuItem>
            <MenuItem>Menu Item #2</MenuItem>
            <MenuItem>Menu Item #3</MenuItem>
          </DropdownButton>,
          <ButtonGroup key={1}>
            <Button type='icon-border' icon='chart' />
            <Button type='icon-border' icon='filterList' />
            <DropdownButton type='icon-more' icon='sort' menuAlign='right'>
              <MenuItem>Menu Item #1</MenuItem>
              <MenuItem>Menu Item #2</MenuItem>
              <MenuItem>Menu Item #3</MenuItem>
            </DropdownButton>
          </ButtonGroup>,
        ]}
      />
    </PageHeader>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Page Header of Related List',
      },
    },
  },
};
