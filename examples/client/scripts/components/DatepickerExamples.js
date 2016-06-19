import React, { Component } from 'react';
import moment from 'moment';
import { Datepicker, TimeInput } from 'react-lightning-design-system';

export default class DatepickerExamples extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedDate: moment().format('YYYY-MM-DD') };
  }

  onSelectDate(selectedDate) {
    this.setState({ selectedDate });
  }

  onTimeSelect(data) {
    alert(`Selected Time: ${data}`);
  }

  render() {
    const styles = { padding: '12px' };
    return (
      <div>
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

        <div>
          <h2 className='slds-m-vertical--medium'>Timepicker</h2>
          <div style={ styles }>
            <div
              style={ { width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around' } }
            >
              <div style={ { display: 'inline-block' } }>
                <TimeInput
                  label='Time picker 12 format'
                  onValueChange={this.onTimeSelect.bind(this)}
                  maxHeight={5}
                  inputValue={'12:30 AM'}
                  required={false} resolution={30} format={12}
                />
              </div>
              <div style={ { display: 'inline-block' } }>
                <TimeInput
                  label='Time picker 24 format - 10 min step'
                  onValueChange={this.onTimeSelect.bind(this)}
                  maxHeight={7}
                  inputValue={'14:00'}
                  resolution={10}
                  format={24}
                />
              </div>
              <div style={ { display: 'inline-block' } }>
                <TimeInput
                  label='Time picker 24 format - 20 min step'
                  onValueChange={this.onTimeSelect.bind(this)}
                  maxHeight={10}
                  inputValue={'13:00'}
                  resolution={20}
                  format={24}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
