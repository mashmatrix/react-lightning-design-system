import React, { Component } from 'react';
import moment from 'moment';
import { Datepicker } from 'react-lightning-design-system';
import { DateInput } from 'react-lightning-design-system';

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
        <h2 className='slds-m-vertical--medium'>Datepicker min max date</h2>
        <div style={ styles }>
          <div style={ { width: '20rem' } }>
            <Datepicker
              minDate={moment('2016-07-05', 'YYYY-MM-DD').format('YYYY-MM-DD')}
              maxDate={moment('2016-07-25', 'YYYY-MM-DD').format('YYYY-MM-DD')}
              selectedDate={ this.state.selectedDate }
              onSelect={ this.onSelectDate.bind(this) }
            />
          </div>
        </div>
        <h2 className='slds-m-vertical--medium'>Datepicker min date</h2>
        <div style={ styles }>
          <div style={ { width: '20rem' } }>
            <Datepicker
              minDate={moment('2016-07-10', 'YYYY-MM-DD').format('YYYY-MM-DD')}
              selectedDate={ this.state.selectedDate }
              onSelect={ this.onSelectDate.bind(this) }
            />
          </div>
        </div>
        <h2 className='slds-m-vertical--medium'>Datepicker max date</h2>
        <div style={ styles }>
          <div style={ { width: '20rem' } }>
            <Datepicker
              maxDate={moment('2016-07-28', 'YYYY-MM-DD').format('YYYY-MM-DD')}
              selectedDate={ this.state.selectedDate }
              onSelect={ this.onSelectDate.bind(this) }
            />
          </div>
        </div>
        <h2 className='slds-m-vertical--medium'>DateInput</h2>
        <div style={ styles }>
          <div style={ { width: '20rem' } }>
            <DateInput/>
          </div>
        </div>
      </div>
    );
  }
}
