import React, { Component } from 'react';
import moment from 'moment';
import { Datepicker, Button } from 'react-lightning-design-system';

const TodayButtonExtensionRenderer = (props) => {
  const { onSelect } = props; // eslint-disable-line react/prop-types
  const today = moment().format('YYYY-MM-DD');
  return (
    <div style={{ padding: '4px', textAlign: 'center' }}>
      <Button
        className='slds-size--1-of-2'
        onClick={ () => onSelect(today) }
      >
        Today
      </Button>
    </div>
  );
};

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
        <h2 className='slds-m-vertical--medium'>Datepicker with Today button extension</h2>
        <div style={ styles }>
          <div style={ { width: '20rem' } }>
            <Datepicker
              selectedDate={ this.state.selectedDate }
              onSelect={ this.onSelectDate.bind(this) }
              extensionRenderer={ TodayButtonExtensionRenderer }
            />
          </div>
        </div>
      </div>
    );
  }
}
