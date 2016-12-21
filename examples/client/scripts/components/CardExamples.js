import React from 'react';
import { Card } from 'react-lightning-design-system';

const { Header, Body, Footer } = Card;

const CardExamples = () => {
  const styles = {
    maxWidth: '360px',
  };

  return (
    <div>
      <h2 className='slds-m-vertical--medium'>Card base narrow</h2>
      <div style={ styles }>
        <Card size='narrow'>
          <Header
            cardIconCategory='doctype'
            cardIcon='excel'
            closeButton
          >
            sample_file_name.csv
          </Header>
          <Body textAlign='center'>Card Body</Body>
          <Footer>Card Footer</Footer>
        </Card>
      </div>
      <h2 className='slds-m-vertical--medium'>Card base narrow empty</h2>
      <div style={ styles }>
        <Card size='narrow'>
          <Header
            cardIconCategory='doctype'
            cardIcon='excel'
            closeButton
          >
            sample_file_name.csv
          </Header>
        </Card>
      </div>
    </div>
  );
};

export default CardExamples;
