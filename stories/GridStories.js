import React from 'react';
import { PropTypes } from 'prop-types';
import { storiesOf } from '@storybook/react';
import { Grid, Row, Col } from '../src/scripts';

const Box = ({ children }) => {
  const styles = {
    padding: '12px',
    backgroundColor: '#33f',
    color: '#fff',
    border: '1px solid #aaf',
  };
  return <div style={ styles }>{ children }</div>;
};

Box.propTypes = {
  children: PropTypes.node,
};

storiesOf('Grid', module)
  .add('Weighted', () => (
    <Grid>
      <Row cols={4}>
        <Col cols={1}><Box>A: w=1</Box></Col>
        <Col cols={2}><Box>B: w=2</Box></Col>
        <Col cols={1}><Box>C: w=1</Box></Col>
      </Row>
    </Grid>
  ), {
  info: 'columns with weighted width'
})
  .add('Equally Weighted', () => (
    <Grid>
      <Row>
        <Col><Box>A</Box></Col>
        <Col><Box>B</Box></Col>
        <Col><Box>C</Box></Col>
      </Row>
    </Grid>
  ), {
  info: 'columns with equally weighted'
})
  .add('Weighted, no-flex', () => (
    <Grid>
      <Row>
        <Col cols={1} noFlex><Box>A: w=1</Box></Col>
        <Col cols={1} noFlex><Box>B: w=1</Box></Col>
        <Col cols={2} noFlex><Box>C: w=2</Box></Col>
        <Col cols={3} noFlex><Box>D: w=3</Box></Col>
        <Col cols={3} noFlex><Box>E: w=3</Box></Col>
      </Row>
    </Grid>
  ), {
  info: 'columns with weighted, flex is disabled'
})
;
