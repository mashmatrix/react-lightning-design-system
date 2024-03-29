import React, { FC, ReactNode } from 'react';
import { Grid, Row, Col } from '../src/scripts';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

/**
 *
 */
const Box: FC<{ children?: ReactNode }> = ({ children }) => {
  const styles = {
    padding: '12px',
    backgroundColor: '#33f',
    color: '#fff',
    border: '1px solid #aaf',
  };
  return <div style={styles}>{children}</div>;
};

/**
 *
 */
const meta: ComponentMeta<typeof Grid> = {
  title: 'Grid',
  component: Grid,
};
export default meta;

/**
 *
 */
export const Weighted: ComponentStoryObj<typeof Grid> = {
  render: (args) => (
    <Grid {...args}>
      <Row cols={4}>
        <Col cols={1}>
          <Box>A: w=1</Box>
        </Col>
        <Col cols={2}>
          <Box>B: w=2</Box>
        </Col>
        <Col cols={1}>
          <Box>C: w=1</Box>
        </Col>
      </Row>
    </Grid>
  ),
  parameters: {
    docs: {
      storyDescription: 'columns with weighted width',
    },
  },
};

/**
 *
 */
export const EquallyWeighted: ComponentStoryObj<typeof Grid> = {
  render: (args) => (
    <Grid {...args}>
      <Row>
        <Col>
          <Box>A</Box>
        </Col>
        <Col>
          <Box>B</Box>
        </Col>
        <Col>
          <Box>C</Box>
        </Col>
      </Row>
    </Grid>
  ),
  parameters: {
    docs: {
      storyDescription: 'columns with equally weighted',
    },
  },
};

/**
 *
 */
export const WeightedNoFlex: ComponentStoryObj<typeof Grid> = {
  render: (args) => (
    <Grid {...args}>
      <Row>
        <Col cols={1} noFlex>
          <Box>A: w=1</Box>
        </Col>
        <Col cols={1} noFlex>
          <Box>B: w=1</Box>
        </Col>
        <Col cols={2} noFlex>
          <Box>C: w=2</Box>
        </Col>
        <Col cols={3} noFlex>
          <Box>D: w=3</Box>
        </Col>
        <Col cols={3} noFlex>
          <Box>E: w=3</Box>
        </Col>
      </Row>
    </Grid>
  ),
  name: 'Weighted, no-flex',
  parameters: {
    docs: {
      storyDescription: 'columns with weighted, flex is disabled',
    },
  },
};
