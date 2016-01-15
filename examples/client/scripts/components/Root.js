import React from 'react';

import ModalExamples from './ModalExamples';
import ButtonExamples from './ButtonExamples';

import { Grid, Row, Col } from 'react-lightning-design-system';

export default class Root extends React.Component {
  render() {
    return (
      <Grid frame>
        <Row>
          <Col className='slds-page-header'>
            <h1>Lightning Design System for React (Examples)</h1>
          </Col>
        </Row>
        <Row>
          <Col className='slds-col--padded'>
            <ButtonExamples />
            <ModalExamples />
          </Col>
        </Row>
      </Grid>
    );
  }
}
