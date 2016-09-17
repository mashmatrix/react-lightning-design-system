import React, { Component } from 'react';
import moment from 'moment';
import { Datepicker } from 'react-lightning-design-system';

export default class DatepickerExamples extends Component {
  constructor() {
    super();
    this.state = { selectedDate: moment().format('YYYY-MM-DD') };
  }

  onSelectDate(selectedDate) {
    this.setState({ selectedDate });
  }

  render() {
    const styles = { padding: '12px' };
    return (
      <div>
        <h2 className='slds-m-vertical--medium'>Datepicker min date</h2>
        <div style={ styles }>
          <div style={ { width: '20rem' } }>
            <Datepicker
              minDate={moment('2016-07-10', 'YYYY-MM-DD').format('YYYY-MM-DD')}
              selectedDate={ moment('2016-07-11', 'YYYY-MM-DD').format('YYYY-MM-DD') }
              onSelect={ this.onSelectDate.bind(this) }
            />
          </div>
        </div>

      </div>
    );
  }
}
