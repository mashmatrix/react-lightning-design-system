import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { withKnobs } from '@kadira/storybook-addon-knobs';
import { Card } from '../src/scripts';

const { Header, Body, Footer } = Card;

storiesOf('Card', module)
  .addDecorator(withKnobs)
  .addWithInfo('Narrow', 'Default Card base narrow', () => (
    <Card size='narrow'>
      <Header cardIconCategory='doctype' cardIcon='excel' closeButton>
        sample_file_name.csv
      </Header>
      <Body textAlign='center'>Card Body</Body>
      <Footer>Card Footer</Footer>
    </Card>
  ))
  .addWithInfo('Narrow Empty', 'Default Card base narrow', () => (
    <Card size='narrow'>
      <Header cardIconCategory='doctype' cardIcon='excel' closeButton>
        sample_file_name.csv
      </Header>
    </Card>
  ))
;
