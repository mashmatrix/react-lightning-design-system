import React, { PropTypes } from 'react';

import { Grid, Row, Col } from 'react-lightning-design-system';


class Box extends React.Component {
  render() {
    const styles = {
      padding: '12px',
      backgroundColor: '#33f',
      color: '#fff',
      border: '1px solid #aaf',
    };
    return <div style={ styles }>{ this.props.children }</div>;
  }
}

Box.propTypes = {
  children: PropTypes.node,
};

export default class GridExamples extends React.Component {

  render() {
    const styles = { padding: '12px' };
    return (
      <div>
        <h2 className='slds-m-vertical--medium'>Grid</h2>
        <div style={ styles }>
          <Grid>
            <Row cols={4}>
              <Col cols={1}><Box>A1</Box></Col>
              <Col cols={2}><Box>B1</Box></Col>
              <Col cols={1}><Box>C1</Box></Col>
            </Row>
            <Row>
              <Col><Box>A2</Box></Col>
              <Col><Box>B2</Box></Col>
              <Col><Box>C2</Box></Col>
            </Row>
            <Row>
              <Col cols={1} noFlex><Box>A3</Box></Col>
              <Col cols={1} noFlex><Box>B3</Box></Col>
              <Col cols={2} noFlex><Box>C3</Box></Col>
              <Col cols={3} noFlex><Box>D3</Box></Col>
              <Col cols={3} noFlex><Box>E3</Box></Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}
