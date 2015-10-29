import React, { PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import Button from './Button';
import { default as Picklist, PicklistItem } from './Picklist';

function createCalendarObject(date) {
  const d = moment(date);
  const year = d.year();
  const month = d.month();
  const first = moment(date).startOf('month').startOf('week');
  const last = moment(date).endOf('month').endOf('week');
  let weeks = [];
  let days = [];
  for (let dd = first; dd.isBefore(last); dd = dd.add(1, 'd')) {
    days.push({ year: dd.year(), month: dd.month(), date: dd.date(), value: dd.format('YYYY-MM-DD') });
    if (days.length === 7) {
      weeks.push(days);
      days = [];
    }
  }
  return { year, month, weeks };
}

export default class Datepicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    if (this.state.targetDate) {
      let el = React.findDOMNode(this.refs.month);
      let dateEl = el.querySelector(`.slds-day[data-date-value="${this.state.targetDate}"]`);
      if (dateEl) {
        dateEl.focus();
      }
    }
  }

  onKeyDown(date, e) {
    let targetDate = this.state.targetDate || this.props.selectedDate;
    if (e.keyCode === 13 || e.keyCode === 32) { // return / space
      this.onClickDate(date);
    } else if (e.keyCode === 37) { // left arrow key
      console.log(e.keyCode, e.shiftKey);
      targetDate = moment(targetDate).add(-1, e.shiftKey ? 'months' : 'days').format('YYYY-MM-DD');
      this.setState({ targetDate });
    } else if (e.keyCode === 39) { // right arrow key
      targetDate = moment(targetDate).add(1, e.shiftKey ? 'months' : 'days').format('YYYY-MM-DD');
      this.setState({ targetDate });
    } else if (e.keyCode === 38) { // up arrow key
      targetDate = moment(targetDate).add(-1, e.shiftKey ? 'years' : 'weeks').format('YYYY-MM-DD');
      this.setState({ targetDate });
    } else if (e.keyCode === 40) {
      targetDate = moment(targetDate).add(1, e.shiftKey ? 'years' : 'weeks').format('YYYY-MM-DD');
      this.setState({ targetDate });
    }
  }

  onFocus(date, e) {
    if (this.state.targetDate !== date) {
      this.setState({ targetDate: date });
    }
  }

  onChangeYear(item) {
    let targetDate = this.state.targetDate || this.props.selectedDate;
    targetDate = moment(targetDate).year(item.value).format('YYYY-MM-DD');
    this.setState({ targetDate });
  }

  onChangeMonth(month) {
    let targetDate = this.state.targetDate || this.props.selectedDate;
    targetDate = moment(targetDate).add(month, 'months').format('YYYY-MM-DD');
    this.setState({ targetDate });
  }

  onClickDate(date) {
    if (this.props.onSelect) {
      this.props.onSelect(date);
    }
  }

  render() {
    const today = moment().format('YYYY-MM-DD');
    const selectedDate = this.props.selectedDate;
    const targetDate = this.state.targetDate || selectedDate;
    const cal = createCalendarObject(moment(targetDate));
    const { className, ...props } = this.props;
    const datepickerClassNames = classnames('slds-datepicker', className);
    return (
      <div className={ datepickerClassNames } aria-hidden={ false }>
        { this.renderFilter(cal) }
        { this.renderMonth(cal, selectedDate, today) }
      </div>
    );
  }

  renderFilter(cal) {
    return (
      <div className='slds-datepicker__filter slds-grid'>
        <div className='slds-datepicker__filter--month slds-grid slds-grid--align-spread slds-size--2-of-3'>
          <div className='slds-align-middle'>
            <Button className='slds-align-middle' type='icon-container' icon='left' size='small' alt='Previous Month'
              onClick={ this.onChangeMonth.bind(this, -1) }
            />
          </div>
          <h2 className='slds-align-middle'>{ moment.monthsShort()[cal.month] }</h2>
          <div className='slds-align-middle'>
            <Button className='slds-align-middle' type='icon-container' icon='right' size='small' alt='Next Month'
              onClick={ this.onChangeMonth.bind(this, 1) }
            />
          </div>
        </div>
        <Picklist className='slds-picklist--fluid slds-shrink-none' value={ cal.year }
          onSelect={ this.onChangeYear.bind(this) }
        >
          {
            new Array(11).join('_').split('_').map((a, i) => {
              const year = cal.year + i - 5;
              return <PicklistItem label={ year } value={ year } />;
            })
          }
        </Picklist>
      </div>
    );
  }

  renderMonth(cal, selectedDate, today) {
    return (
      <table className='datepicker__month' role='grid' aria-labelledby='month' ref='month'>
        <thead>
          <tr>
            {
              moment.weekdaysMin().map((wd, i) => {
                return (
                  <th>
                    <abbr title={ moment.weekdays(i) }>{ wd }</abbr>
                  </th>
                );
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            cal.weeks.map((days) => {
              return <tr>{ days.map(this.renderDate.bind(this, cal, selectedDate, today)) }</tr>;
            })
          }
        </tbody>
      </table>
    );
  }

  renderDate(cal, selectedDate, today, d, i) {
    const enabled = d.year === cal.year && d.month === cal.month;
    const selected = d.value === selectedDate;
    const isToday = d.value === today;
    const dateClassName = classnames({
      'slds-disabled-text': !enabled,
      'slds-is-selected': selected,
      'slds-is-today': isToday,
    });
    return (
      <td className={ dateClassName } key={ d.value } headers={ moment.weekdays(i) }
        role='gridcell' aria-disabled={ !enabled } aria-selected={ selected }
      >
        <span className='slds-day' tabIndex={ enabled ? 0 : null }
          key={ d.value }
          onClick={ enabled ? this.onClickDate.bind(this, d.value) : null }
          onKeyDown={ this.onKeyDown.bind(this, d.value) }
          onFocus={ this.onFocus.bind(this, d.value) }
          data-date-value={ d.value }
        >{ d.date }</span>
      </td>
    );
  }

}


Datepicker.propTypes = {
  className: PropTypes.string,
  onDateSelect: PropTypes.func,
};
