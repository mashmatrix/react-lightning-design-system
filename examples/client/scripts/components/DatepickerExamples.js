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
              minDate={ moment().subtract(5, 'days').format('YYYY-MM-DD') }
              maxDate={ moment().add(5, 'days').format('YYYY-MM-DD') }
              selectedDate={ this.state.selectedDate }
              onSelect={ this.onSelectDate.bind(this) }
            />
          </div>
        </div>
        <h2 className='slds-m-vertical--medium'>Datepicker min date</h2>
        <div style={ styles }>
          <div style={ { width: '20rem' } }>
            <Datepicker
              minDate={ moment().subtract(5, 'days').format('YYYY-MM-DD') }
              selectedDate={ this.state.selectedDate }
              onSelect={ this.onSelectDate.bind(this) }
            />
          </div>
        </div>
        <h2 className='slds-m-vertical--medium'>Datepicker max date</h2>
        <div style={ styles }>
          <div style={ { width: '20rem' } }>
            <Datepicker
              maxDate={ moment().add(5, 'days').format('YYYY-MM-DD') }
              selectedDate={ this.state.selectedDate }
              onSelect={ this.onSelectDate.bind(this) }
            />
          </div>
        </div>
      </div>
    );
  }
}
