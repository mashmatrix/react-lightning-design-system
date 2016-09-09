/* eslint-disable jsx-quotes */

import React from 'react';

import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderHeadingTitle,
  PageHeaderDetail,
  PageHeaderDetailItem,
  PageHeaderDetailBody,
  PageHeaderDetailLabel,
  Icon, Crumb, Button, ButtonGroup, DropdownButton, MenuItem,
  Text, Grid,
} from 'react-lightning-design-system';

export default () => (
  <div>
    <h2 className="slds-m-vertical--medium">Base</h2>
    <PageHeader>
      <PageHeaderHeading
        title="Rohde Corp - 80,000 Widgets"
        info="Mark Jaeckal • Unlimited Customer • 11/13/15"
        figure={
          <Icon
            category="standard"
            size="large"
            icon="opportunity"
          />
        }
      />
    </PageHeader>

    <h2 className="slds-m-vertical--medium">Record Home</h2>
    <PageHeader>
      <PageHeaderHeading
        legend="RECORD TYPE"
        title="Record Title"
        figure={
          <Icon
            category="standard"
            size="large"
            icon="user"
          />
        }
        leftActions={(
          <Button
            type="neutral"
            icon="add"
            iconAlign="left"
          >
            Follow
          </Button>
        )}
        rightActions={(
          <ButtonGroup>
            <Button type="neutral">Edit</Button>
            <Button type="neutral">Delete</Button>
            <Button type="neutral">Clone</Button>
            <DropdownButton
              type="icon-border-filled"
              menuAlign="right"
              menuSize="large"
            >
              <MenuItem>Menu Item #1</MenuItem>
              <MenuItem>Menu Item #2</MenuItem>
              <MenuItem>Menu Item #3</MenuItem>
            </DropdownButton>
          </ButtonGroup>
        )}
      />
      <PageHeaderDetail>
        <PageHeaderDetailItem label="FIELD 1">
          <Text
            category="body"
            type="regular"
            truncate
            title="Description that demonstrates truncation with a long text field"
          >
            Description that demonstrates truncation with a long text field
          </Text>
        </PageHeaderDetailItem>
        <PageHeaderDetailItem>
          <PageHeaderDetailLabel>
            <Text tag="div" trancate category="heading" type="label">
              FIELD 2 (3)
              <DropdownButton type="icon-bare" iconSize="small" icon="down">
                <MenuItem>Menu Item #1</MenuItem>
                <MenuItem>Menu Item #2</MenuItem>
                <MenuItem>Menu Item #3</MenuItem>
              </DropdownButton>
            </Text>
          </PageHeaderDetailLabel>
          <PageHeaderDetailBody>
            <Text
              category="body"
              type="regular"
              trancate
              title="Multiple Values"
            >
              Multiple Values
            </Text>
          </PageHeaderDetailBody>
        </PageHeaderDetailItem>
        <PageHeaderDetailItem label="FIELD 3">
          <a>Hyperlink</a>
        </PageHeaderDetailItem>
        <PageHeaderDetailItem label="FIELD 4">
          <span>Description (2-line truncat...</span>
        </PageHeaderDetailItem>
      </PageHeaderDetail>
    </PageHeader>

    <h2 className="slds-m-vertical--medium">Object Home</h2>
    <PageHeader>
      <PageHeaderHeading
        legend="LEADS"
        title={(
          <Grid vertical={false}>
            <PageHeaderHeadingTitle>
              My Leads (truncates)
            </PageHeaderHeadingTitle>
            <DropdownButton type="icon-bare" icon="down" className="slds-align-middle">
              <MenuItem>Menu Item #1</MenuItem>
              <MenuItem>Menu Item #2</MenuItem>
              <MenuItem>Menu Item #3</MenuItem>
            </DropdownButton>
          </Grid>
        )}
        info="10 items • Sorted by Name"
        leftActions={(
          <DropdownButton type="icon-more" icon="settings" className="slds-m-left--large">
            <MenuItem>Menu Item #1</MenuItem>
            <MenuItem>Menu Item #2</MenuItem>
            <MenuItem>Menu Item #3</MenuItem>
          </DropdownButton>
        )}
        rightActions={[
          <DropdownButton key={0} type="icon-more" icon="table" menuAlign="right">
            <MenuItem>Menu Item #1</MenuItem>
            <MenuItem>Menu Item #2</MenuItem>
            <MenuItem>Menu Item #3</MenuItem>
          </DropdownButton>,
          <ButtonGroup key={1} className="slds-button-space-left">
            <Button type="icon-border" icon="chart" />
            <Button type="icon-border" icon="filterList" />
            <DropdownButton type="icon-more" icon="sort" menuAlign="right">
              <MenuItem>Menu Item #1</MenuItem>
              <MenuItem>Menu Item #2</MenuItem>
              <MenuItem>Menu Item #3</MenuItem>
            </DropdownButton>
          </ButtonGroup>,
          <ButtonGroup key={2}>
            <Button type="neutral">New Lead</Button>
            <DropdownButton
              type="icon-border-filled"
              menuAlign="right"
              menuSize="large"
            >
              <MenuItem>Menu Item #1</MenuItem>
              <MenuItem>Menu Item #2</MenuItem>
              <MenuItem>Menu Item #3</MenuItem>
            </DropdownButton>
          </ButtonGroup>,
        ]}
      />
    </PageHeader>


    <h2 className="slds-m-vertical--medium">Related List</h2>
    <PageHeader>
      <PageHeaderHeading
        breadCrumbs={[
          <Crumb key={0} href="#">ACCOUNTS</Crumb>,
          <Crumb key={1} href="#">COMPANY ONE</Crumb>,
        ]}
        title="Contacts (will truncate)"
        info="10 items, sorted by name"
        rightActions={[
          <DropdownButton key={0} type="icon-more" icon="table" menuAlign="right">
            <MenuItem>Menu Item #1</MenuItem>
            <MenuItem>Menu Item #2</MenuItem>
            <MenuItem>Menu Item #3</MenuItem>
          </DropdownButton>,
          <ButtonGroup key={1} className="slds-button-space-left">
            <Button type="icon-border" icon="chart" />
            <Button type="icon-border" icon="filterList" />
            <DropdownButton type="icon-more" icon="sort" menuAlign="right">
              <MenuItem>Menu Item #1</MenuItem>
              <MenuItem>Menu Item #2</MenuItem>
              <MenuItem>Menu Item #3</MenuItem>
            </DropdownButton>
          </ButtonGroup>,
          <ButtonGroup key={2}>
            <Button type="neutral">Add Contact</Button>
            <DropdownButton
              type="icon-border-filled"
              menuAlign="right"
              menuSize="large"
            >
              <MenuItem>Menu Item #1</MenuItem>
              <MenuItem>Menu Item #2</MenuItem>
              <MenuItem>Menu Item #3</MenuItem>
            </DropdownButton>
          </ButtonGroup>,
        ]}
      />
    </PageHeader>
  </div>
);
