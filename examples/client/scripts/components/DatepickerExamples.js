import React, { Component } from 'react';
import moment from 'moment';
import { Datepicker } from 'react-lightning-design-system';

export default class DatepickerExamples extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedDate: moment().format('YYYY-MM-DD') };
  }

  onSelectDate(selectedDate) {
    this.setState({ selectedDate });
  }

  render() {
    const styles = { padding: '12px' };
    return (
      <div>
        <h2 className='slds-m-vertical--medium'>Datepicker</h2>
        <div style={ styles }>
          <div style={ { width: '20rem' } }>
            <Datepicker
              selectedDate={ this.state.selectedDate }
              onSelect={ this.onSelectDate.bind(this) }
            />
          </div>
        </div>
      </div>
    );
  }
}
