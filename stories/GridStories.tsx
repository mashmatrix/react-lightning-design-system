import React from 'react';
import { Grid, Row, Col } from '../src/scripts';

const Box: React.FC = ({ children }) => {
  const styles = {
    padding: '12px',
    backgroundColor: '#33f',
    color: '#fff',
    border: '1px solid #aaf',
  };
  return <div style={styles}>{children}</div>;
};

export default {
  title: 'Grid',
};

export const Weighted = () => (
  <Grid>
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
);

Weighted.story = {
  parameters: { info: 'columns with weighted width' },
};

export const EquallyWeighted = () => (
  <Grid>
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
);

EquallyWeighted.story = {
  parameters: { info: 'columns with equally weighted' },
};

export const WeightedNoFlex = () => (
  <Grid>
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
);

WeightedNoFlex.story = {
  name: 'Weighted, no-flex',
  parameters: { info: 'columns with weighted, flex is disabled' },
};
